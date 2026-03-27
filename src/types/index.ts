export type TicketStatus =
  | "SUBMITTED"
  | "VERIFYING"
  | "VERIFIED"
  | "EDITING"
  | "SENT_TO_CYBERSAFE"
  | "SIGNED_RETURNED"
  | "DELIVERED"
  | "REJECTED";

export type TicketPurpose =
  | "SCHOOL_ADMISSION"
  | "JOB_APPLICATION"
  | "OTHER";

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  SUBMITTED: "Submitted",
  VERIFYING: "Under Review",
  VERIFIED: "Verified",
  EDITING: "Being Edited",
  SENT_TO_CYBERSAFE: "Sent to CyberSafe",
  SIGNED_RETURNED: "Signed & Returned",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
};

export const TICKET_STATUS_ORDER: TicketStatus[] = [
  "SUBMITTED",
  "VERIFYING",
  "VERIFIED",
  "EDITING",
  "SENT_TO_CYBERSAFE",
  "SIGNED_RETURNED",
  "DELIVERED",
];

export const TICKET_PURPOSE_LABELS: Record<TicketPurpose, string> = {
  SCHOOL_ADMISSION: "School / University Admission",
  JOB_APPLICATION: "Job Application",
  OTHER: "Other",
};

export const TICKET_STATUS_COLORS: Record<TicketStatus, string> = {
  SUBMITTED: "bg-blue-100 text-blue-800",
  VERIFYING: "bg-yellow-100 text-yellow-800",
  VERIFIED: "bg-green-100 text-green-800",
  EDITING: "bg-purple-100 text-purple-800",
  SENT_TO_CYBERSAFE: "bg-orange-100 text-orange-800",
  SIGNED_RETURNED: "bg-teal-100 text-teal-800",
  DELIVERED: "bg-gray-100 text-gray-800",
  REJECTED: "bg-red-100 text-red-800",
};
