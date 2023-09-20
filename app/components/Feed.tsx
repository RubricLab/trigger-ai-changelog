/* eslint-disable react-hooks/exhaustive-deps */
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
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeployButton from "./DeployButton";

const Feed = () => {
  const [runId, setRunId] = useState<string>();

  const [startDate, setStartDate] = useState<Date | undefined>(daysAgo(7));
  const [endDate, setEndDate] = useState<Date | undefined>(now());

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
        case "WAITING":
          toast.loading(task.displayKey);
          break;
        case "COMPLETED":
          toast.dismiss();
          toast.success(task.displayKey);
          break;
      }
    });

    if (data.output?.id) setRunId(data.output.id);
  }, [data]);

  return (
    <form action={submit} className="space-y-8 flex flex-col items-center">
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
      {data?.output?.markdown && (
        <div className="px-12 py-8 !mt-12 rounded-lg bg-midnight-850 space-y-4">
          <Markdown copiable markdown={data.output.markdown} />
          <div className="w-full flex justify-center pt-8">
            <DeployButton />
          </div>
        </div>
      )}
    </form>
  );
};

export default Feed;
