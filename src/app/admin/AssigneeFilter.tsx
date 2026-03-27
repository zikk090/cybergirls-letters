"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  members: { id: string; name: string }[];
}

export default function AssigneeFilter({ members }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentAssignee = searchParams.get("assignee") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("assignee", e.target.value);
    } else {
      params.delete("assignee");
    }
    params.delete("page");
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <select
      value={currentAssignee}
      onChange={handleChange}
      className="text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All assignees</option>
      <option value="unassigned">Unassigned</option>
      {members.map((m) => (
        <option key={m.id} value={m.id}>
          {m.name}
        </option>
      ))}
    </select>
  );
}
