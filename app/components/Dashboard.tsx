"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./Input";
import { jobRun } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import { DatePicker } from "./DatePicker";
import { daysAgo, now } from "@/lib/utils";
import { Markdown } from "./Markdown";
import { githubUrl } from "../constants";
import { Button } from "@/components/ui/button";
import { ChangelogActions } from "./ChangelogActions";
import { CheckCircleIcon, Loader2, XCircleIcon } from "lucide-react";

export const Dashboard = () => {
  const [repoUrl, setRepoUrl] = useState<string>();
  const [startDate, setStartDate] = useState<Date>(daysAgo(7));
  const [endDate, setEndDate] = useState<Date>(now());

  const [eventId, setEventId] = useState<string>();
  const [runLogs, setRunLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    const run = await jobRun({
      repoUrl,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });

    setEventId(run.id);
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
      <form className="col-span-1 lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-6 sticky top-8 h-fit p-0 sm:p-4 border-none sm:border border-slate-750 bg-transparent sm:bg-slate-900 rounded-md">
        <Input
          label="Enter a public repo URL"
          placeholder={githubUrl}
          onChange={setRepoUrl}
          type="url"
          required
          fullWidth
        />
        <div className="flex flex-col gap-y-4 sm:flex-row items-end gap-x-4 lg:flex-col lg:gap-y-4 lg:items-start">
          <div className="flex gap-4 w-full">
            <DatePicker label="From" date={startDate} setDate={setStartDate} />
            <DatePicker label="To" date={endDate} setDate={setEndDate} />
          </div>
          <Button
            onClick={submit}
            size="lg"
            className="w-full sm:w-fit lg:w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="whitespace-nowrap">Generate Changelog</span>
            )}
          </Button>
        </div>
      </form>
      <div className="col-span-1 lg:col-span-7 xl:col-span-8 max-w-full space-y-4">
        {!submitted ? (
          <div className="flex flex-col text-center items-center justify-center h-full py-8 space-y-4 rounded-lg border border-dashed border-slate-700">
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
