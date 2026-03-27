import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const admissionNumber = req.nextUrl.searchParams.get("admissionNumber");
  if (!admissionNumber?.trim()) {
    return NextResponse.json({ error: "admissionNumber is required" }, { status: 400 });
  }

  // Only return the minimum fields needed — no PII exposed publicly
  const tickets = await prisma.ticket.findMany({
    where: { admissionNumber: admissionNumber.trim() },
    orderBy: { createdAt: "desc" },
    select: {
      ticketRef: true,
      status: true,
      createdAt: true,
      submissionDeadline: true,
      rejectionReason: true,
    },
  });

  return NextResponse.json({ tickets });
}
