"use client";

import { useEventRunStatuses } from "@trigger.dev/react";
import { Loader2, CheckCircleIcon, XCircleIcon } from "lucide-react";

export function ChangelogLoading({ changelogId }: { changelogId: number }) {
  const { fetchStatus, error, statuses, run } = useEventRunStatuses(
    changelogId.toString()
  );

  switch (fetchStatus) {
    case "loading":
      return <TaskStatus state="loading" title="Loading..." />;
    case "success":
      return (
        <div className="flex flex-col gap-2">
          {statuses.map((status, index) => (
            <TaskStatus key={index} state={status.state} title={status.label} />
          ))}
        </div>
      );
    case "error":
      return <TaskStatus state="failure" title={error.message} />;
    default:
      throw new Error("Invalid fetch status");
  }
}

function TaskStatus({
  state = "loading",
  title,
}: {
  state?: "loading" | "success" | "failure";
  title: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      {state === "loading" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : state === "success" ? (
        <CheckCircleIcon className="text-green-500 w-4 h-4" />
      ) : (
        <XCircleIcon className="text-red-500 w-4 h-4" />
      )}
      <span>{title}</span>
    </div>
  );
}
