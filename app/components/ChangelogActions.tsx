"use client";

import { Button } from "@/components/ui/button";
import { copyToClipboard, today } from "@/lib/utils";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { saveToSupabase } from "../actions";

type Props = {
  markdown?: string;
  owner: string;
  repo: string;
  date?: Date;
};

export const ChangelogActions = ({ markdown, owner, repo, date }: Props) => {
  const [copied, setCopied] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied("");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const submit = useCallback(async () => {
    if (!markdown) return;

    const changelogDate = date ? date.toISOString().slice(0, 10) : today();

    const save = await saveToSupabase({
      markdown,
      owner,
      repo,
      date: changelogDate,
    });

    const publicUrl = `http://${owner}.${window.location.host}/${repo}/${changelogDate}`;
    router.push(publicUrl);
  }, [markdown, owner, repo, date, router]);

  return (
    <form
      action={submit}
      className="w-full flex items-center justify-between text-dimmed border-b border-slate-800 pb-4"
    >
      <h3>Changelog</h3>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          className="space-x-2"
          type="button"
          disabled={!markdown}
          onClick={() => {
            if (!markdown) return;
            copyToClipboard(markdown);
            setCopied("text");
          }}
        >
          <span>Copy as text</span>
          {copied === "text" ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="space-x-2"
          type="button"
          disabled={!markdown}
          onClick={() => {
            if (!markdown) return;
            copyToClipboard(markdown);
            setCopied("markdown");
          }}
        >
          <span>Copy as markdown</span>
          {copied === "markdown" ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
        <Button
          disabled={!markdown}
          size="sm"
          variant="default"
          className="space-x-2"
          type="submit"
        >
          <span>View public page</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
