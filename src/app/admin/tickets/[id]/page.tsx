import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  TicketStatus,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
  TICKET_STATUS_ORDER,
  TICKET_PURPOSE_LABELS,
  TicketPurpose,
} from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import TicketActions from "./TicketActions";

export const dynamic = "force-dynamic";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;

  const ticket = await prisma.ticket.findFirst({
    where: { OR: [{ ticketRef: id }, { id }] },
    include: {
      assignedAdmin: { select: { id: true, name: true, email: true } },
      statusHistory: {
        orderBy: { createdAt: "asc" },
        include: { changedBy: { select: { name: true } } },
      },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      },
    },
  });

  if (!ticket) notFound();

  const teamMembers = await prisma.adminUser.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const currentStatusIndex = TICKET_STATUS_ORDER.indexOf(
    ticket.status as TicketStatus
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-6">
        <Link href="/admin" className="hover:text-gray-900 dark:hover:text-white">
          Tickets
        </Link>
        <span>/</span>
        <span className="font-mono font-medium text-gray-900 dark:text-slate-100">{ticket.ticketRef}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Ticket details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-slate-100 font-mono">
                  {ticket.ticketRef}
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                  Submitted {formatDateTime(ticket.createdAt)}
                </p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  TICKET_STATUS_COLORS[ticket.status as TicketStatus] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {TICKET_STATUS_LABELS[ticket.status as TicketStatus] ??
                  ticket.status}
              </span>
            </div>

            {/* Progress bar */}
            {ticket.status !== "REJECTED" && (
              <div className="flex items-center gap-1 mt-4">
                {TICKET_STATUS_ORDER.map((s, i) => (
                  <div
                    key={s}
                    className={`flex-1 h-1.5 rounded-full ${
                      i <= currentStatusIndex ? "bg-blue-500" : "bg-gray-200 dark:bg-slate-700"
                    }`}
                    title={TICKET_STATUS_LABELS[s]}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Candidate info */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <h2 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Candidate Information</h2>
            <dl className="grid sm:grid-cols-2 gap-3 text-sm">
              <DetailRow label="Admission Number" value={ticket.admissionNumber} />
              <DetailRow label="Full Name" value={ticket.candidateName} />
              <DetailRow
                label="Email"
                value={
                  <a
                    href={`mailto:${ticket.candidateEmail}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {ticket.candidateEmail}
                  </a>
                }
              />
              {ticket.phoneNumber && (
                <DetailRow label="Phone" value={ticket.phoneNumber} />
              )}
            </dl>
          </div>

          {/* Request details */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <h2 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Request Details</h2>
            <dl className="grid sm:grid-cols-2 gap-3 text-sm">
              <DetailRow
                label="Purpose"
                value={
                  TICKET_PURPOSE_LABELS[ticket.purpose as TicketPurpose] ??
                  ticket.purpose
                }
              />
              <DetailRow label="Organisation" value={ticket.organizationName} />
              {ticket.submissionDeadline && (
                <DetailRow
                  label="Deadline"
                  value={formatDate(ticket.submissionDeadline)}
                />
              )}
              {ticket.additionalInfo && (
                <div className="sm:col-span-2">
                  <dt className="text-gray-500 dark:text-slate-400 mb-1">Additional Info</dt>
                  <dd className="text-gray-900 dark:text-slate-200 whitespace-pre-wrap">
                    {ticket.additionalInfo}
                  </dd>
                </div>
              )}
            </dl>
            {ticket.orgFormUrl && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Organisation Portal Link</p>
                <a
                  href={ticket.orgFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {ticket.orgFormUrl}
                </a>
              </div>
            )}
            {ticket.letterFileUrl && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <a
                  href={ticket.letterFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View Uploaded Letter →
                </a>
              </div>
            )}
          </div>

          {ticket.status === "REJECTED" && ticket.rejectionReason && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
              <h2 className="font-semibold text-red-800 dark:text-red-400 mb-2">Rejection Reason</h2>
              <p className="text-sm text-red-700 dark:text-red-300">{ticket.rejectionReason}</p>
            </div>
          )}

          {/* Activity history */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <h2 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Activity History</h2>
            {ticket.statusHistory.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-slate-400">No status changes yet.</p>
            ) : (
              <ol className="space-y-3">
                {ticket.statusHistory.map((h) => (
                  <li key={h.id} className="flex gap-3 text-sm">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      <p className="text-gray-900 dark:text-slate-200">
                        {h.fromStatus ? (
                          <>
                            <span className="font-medium">
                              {TICKET_STATUS_LABELS[h.fromStatus as TicketStatus] ??
                                h.fromStatus}
                            </span>{" "}
                            →{" "}
                            <span className="font-medium">
                              {TICKET_STATUS_LABELS[h.toStatus as TicketStatus] ??
                                h.toStatus}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium">
                            Created as {TICKET_STATUS_LABELS[h.toStatus as TicketStatus] ?? h.toStatus}
                          </span>
                        )}
                      </p>
                      <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">
                        By {h.changedBy.name} · {formatDateTime(h.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Right: Actions + Notes */}
        <div className="space-y-5">
          <TicketActions
            ticketId={ticket.ticketRef}
            currentStatus={ticket.status as TicketStatus}
            currentAssigneeId={ticket.assignedAdmin?.id ?? null}
            teamMembers={teamMembers}
            notes={ticket.notes.map((n) => ({
              id: n.id,
              body: n.body,
              authorName: n.author.name,
              createdAt: n.createdAt.toISOString(),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-gray-500 dark:text-slate-400 text-xs mb-0.5">{label}</dt>
      <dd className="text-gray-900 dark:text-slate-200">{value ?? "—"}</dd>
    </div>
  );
}
