/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Button } from "./Button";
import { runGenerateJob } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import toast from "react-hot-toast";
import { DatePicker } from "./DatePicker";
import { daysAgo, now } from "@/lib/utils";

const Feed = () => {
  const [runId, setRunId] = useState<string>();

  const [startDate, setStartDate] = useState<Date | undefined>(daysAgo(7));
  const [endDate, setEndDate] = useState<Date | undefined>(now());

  const submit = async (data: FormData) => {
    toast.loading("Generating changelog...");

    const repoUrl = data.get("repoUrl") as string;

    const run = await runGenerateJob({ repoUrl, startDate, endDate });

    setRunId(run.id);
  };

  const { data } = useEventRunDetails(runId);

  useEffect(() => {
    if (!data) return;
    toast.dismiss();

    if (data.status === "SUCCESS") {
      toast.success("Success!");
    } else if (data.status === "FAILURE") {
      console.error(data.output?.message || data);
      toast.error("Oops. See the console for details.");
    }
  }, [data?.status]);

  useEffect(() => {
    if (data?.output?.length) toast(`Found ${data.output.length} commits.`);
  }, [data?.output]);

  return (
    <form action={submit} className="space-y-8 flex flex-col items-end">
      <Input
        label="Repo URL"
        name="repoUrl"
        placeholder="https://github.com/triggerdotdev/trigger.dev"
        type="url"
        required
      />
      <div className="flex gap-4">
        <DatePicker label="From" date={startDate} setDate={setStartDate} />
        <DatePicker label="To" date={endDate} setDate={setEndDate} />
      </div>
      <Button type="submit">Get started</Button>
    </form>
  );
};

export default Feed;
