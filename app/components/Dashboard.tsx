"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./Input";
import { generateChangelog } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import { DatePicker } from "./DatePicker";
import { daysAgo, now } from "@/lib/utils";
import { Markdown } from "./Markdown";
import { githubUrl } from "../constants";
import { Button } from "@/components/ui/button";
import { ChangelogActions } from "./ChangelogActions";
import { CheckCircleIcon, Loader2, XCircleIcon } from "lucide-react";
import { Form } from "./Form";

export const Dashboard = () => {
  const { data } = useEventRunDetails(eventId);

  // Pull owner and repo from repoUrl
  const [owner, repo] = useMemo(
    () => repoUrl?.split("/").slice(-2) || [],
    [repoUrl]
  );

  // Call a server action to trigger the job run
  const submit = useCallback(async () => {
    if (!repoUrl) return;

    setSubmitted(true);
    setLoading(true);
    setRunLogs([]);

    const event = await generateChangelog({
      repoUrl,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });

    setEventId(event.id);
  }, [repoUrl, startDate, endDate]);

  // Track the job run status
  useEffect(() => {
    data?.tasks?.forEach((task) => {
      setRunLogs((logs) => [...logs, task]);
    });

    if (data?.output?.id) setEventId(data.output.id);
    if (data?.output?.markdown) setLoading(false);
  }, [data]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
      <Form />
      <div className="col-span-1 lg:col-span-7 xl:col-span-8 max-w-full space-y-4 pb-40 sm:pb-20">
        {!submitted ? (
          <div className="flex flex-col text-center items-center justify-center h-full py-16 space-y-4 rounded-lg border border-dashed border-slate-700">
            <p className="text-4xl">✨</p>
            <span className="text-dimmed w-64">
              Enter a public repo URL to generate your changelog.
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-4">
            <ChangelogActions
              markdown={data?.output?.markdown}
              owner={owner}
              repo={repo}
              date={endDate}
            />
            {data?.output?.markdown ? (
              <Markdown markdown={data?.output?.markdown} />
            ) : (
              <div className="text-dimmed">
                {runLogs.map((task, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    {task.status === "RUNNING" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : task.status === "COMPLETED" ? (
                      <CheckCircleIcon className="text-green-500 w-4 h-4" />
                    ) : (
                      <XCircleIcon className="text-red-500 w-4 h-4" />
                    )}
                    <span>{task.displayKey || "..."}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
