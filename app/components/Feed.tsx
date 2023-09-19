/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Button } from "./Button";
import { runGenerateJob } from "../actions";
import { useEventRunDetails } from "@trigger.dev/react";
import toast from "react-hot-toast";

const Feed = () => {
  const [runId, setRunId] = useState();

  const submit = async (data: FormData) => {
    toast.loading("Generating changelog...");

    const repoUrl = data.get("repoUrl") as string;

    const run = await runGenerateJob({
      repoUrl,
      endDate: "2023-09-19T00:00:00Z",
      startDate: "2021-09-17T00:00:00Z",
    });

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
    <div className="w-full">
      <form action={submit} className="flex items-end gap-4">
        <Input
          label="Enter your repo URL:"
          name="repoUrl"
          placeholder="https://github.com/triggerdotdev/trigger.dev"
          type="url"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Feed;
