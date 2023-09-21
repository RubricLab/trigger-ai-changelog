"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { jobRun } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import toast from "react-hot-toast";
import { DatePicker } from "./DatePicker";
import { daysAgo, now } from "@/lib/utils";
import { Markdown } from "./Markdown";
import { githubUrl } from "../constants";
import { Button } from "@/components/ui/button";
import DeployButton from "./DeployButton";
import { ChangelogActions } from "./ChangelogActions";

export const Dashboard = () => {
  const [eventId, setEventId] = useState<string>();

  const [startDate, setStartDate] = useState<Date | undefined>(daysAgo(7));
  const [endDate, setEndDate] = useState<Date | undefined>(now());
  const [seconds, setSeconds] = useState(1);

  const { data } = useEventRunDetails(eventId);

  const submit = async (data: FormData) => {
    toast.loading("Starting up...");

    const repoUrl = data.get("repoUrl") as string;

    const run = await jobRun({
      repoUrl,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });

    setEventId(run.id);
  };

  useEffect(() => {
    if (!data?.tasks) return;

    data.tasks.forEach((task) => {
      if (task.status === "RUNNING")
        // toast(`${task.displayKey} ${seconds}/24...`);
        setSeconds((s) => s + 1);
      else if (task.status === "COMPLETED") setSeconds(1);
    });

    if (data.output?.id) setEventId(data.output.id);
  }, [data]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      <form
        action={submit}
        className="col-span-1 space-y-8 sticky top-0 h-fit p-4 border border-slate-750 bg-slate-900 rounded-md"
      >
        <Input
          label="Enter a public repo URL"
          name="repoUrl"
          placeholder={githubUrl}
          type="url"
          required
        />
        <div className="flex gap-4">
          <DatePicker label="From" date={startDate} setDate={setStartDate} />
          <DatePicker label="To" date={endDate} setDate={setEndDate} />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Generate Changelog
        </Button>
      </form>
      <div className="col-span-1 md:col-span-2 z-10 max-w-full">
        <div className="px-12 py-8 rounded-lg border border-dashed h-full border-slate-700 space-y-4">
          <ChangelogActions
            markdown={"abc"}
            repoOwner={"triggerdotdev"}
            repoName={"trigger.dev"}
            changelogId={20230921}
          />
          {data?.output?.markdown ? (
            <div className="w-full flex flex-col items-center space-y-8">
              <Markdown markdown={data.output.markdown} />
              <DeployButton />
            </div>
          ) : (
            <div className="flex flex-col text-center items-center justify-center h-full space-y-4">
              <div className="text-xl">✨</div>
              <span className="text-dimmed w-64">
                Enter a public repo URL to generate your changelog.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
