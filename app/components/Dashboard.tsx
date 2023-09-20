/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { jobRun } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import toast from "react-hot-toast";
import { DatePicker } from "./DatePicker";
import { cn, daysAgo, now } from "@/lib/utils";
import { Markdown } from "./Markdown";
import { githubUrl } from "../constants";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeployButton from "./DeployButton";

export const Dashboard = () => {
  const [runId, setRunId] = useState<string>();

  const [startDate, setStartDate] = useState<Date | undefined>(daysAgo(7));
  const [endDate, setEndDate] = useState<Date | undefined>(now());
  const [seconds, setSeconds] = useState(1);

  const { data } = useEventRunDetails(runId);

  const submit = async (data: FormData) => {
    toast.loading("Starting up...");

    const repoUrl = data.get("repoUrl") as string;

    const run = await jobRun({
      repoUrl,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });

    setRunId(run.id);
  };

  useEffect(() => {
    if (!data?.tasks) return;

    data.tasks.forEach((task) => {
      switch (task.status) {
        case "ERRORED":
          toast.error(task.displayKey);
          break;
        case "RUNNING":
          toast.dismiss();
          toast(`${task.displayKey} ${seconds}/24...`);
          setSeconds((s) => s + 1);
          break;
        case "COMPLETED":
          toast.dismiss();
          toast.success(task.displayKey);
          setSeconds(1);
          break;
      }
    });

    if (data.output?.id) setRunId(data.output.id);
  }, [data]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <form
        action={submit}
        className="col-span-1 space-y-8 sticky top-0 h-fit pt-8"
      >
        <Input
          label="Repo URL"
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
          <span>Get started</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
      <div className="col-span-1 z-10 pt-8 max-w-full">
        <label htmlFor="changelog">Changelog</label>
        <div
          id="changelog"
          className={cn("px-12 py-8 rounded-lg bg-midnight-850 space-y-4", {
            "animate-pulse": !data?.output,
          })}
        >
          {data?.output?.markdown ? (
            <div className="w-full flex flex-col items-center space-y-8">
              <Markdown copiable markdown={data.output.markdown} />
              <DeployButton />
            </div>
          ) : (
            <div className="text-dimmed text-sm animate pulse">
              Waiting for your first changelog...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
