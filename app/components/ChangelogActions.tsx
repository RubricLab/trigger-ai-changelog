"use client";

import { Button } from "@/components/ui/button";
import { cn, copyToClipboard, stripMarkdown, today } from "@/lib/utils";
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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const changelogDate = date ? date.toISOString().slice(0, 10) : today();

    await saveToSupabase({
      markdown,
      owner,
      repo,
      date: changelogDate,
    });

    setLoading(false);

    const publicUrl = `http://${owner}.${window.location.host}/${repo}/${changelogDate}`;
    router.push(publicUrl);
  }, [markdown, owner, repo, date, router]);

  return (
    <div className="w-full flex items-center justify-between text-dimmed border-b border-slate-800 pb-4">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            className="space-x-2"
            disabled={!markdown}
            onClick={() => {
              if (!markdown) return;
              const plainText = stripMarkdown(markdown);
              copyToClipboard(plainText);
              setCopied("text");
            }}
          >
            {copied === "text" ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline-block">Copy as text</span>
            <span className="sm:hidden inline-block">Text</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="space-x-2"
            disabled={!markdown}
            onClick={() => {
              if (!markdown) return;
              copyToClipboard(markdown);
              setCopied("markdown");
            }}
          >
            {copied === "markdown" ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline-block">Copy as markdown</span>
            <span className="sm:hidden inline-block">Markdown</span>
          </Button>
        </div>
        <Button
          disabled={!markdown || loading}
          size="sm"
          variant="default"
          className={cn("space-x-2", {
            "animate-pulse": loading,
          })}
          onClick={submit}
        >
          <span className="hidden sm:inline-block">
            {loading ? "Saving..." : "View page"}
          </span>
          <span className="sm:hidden inline-block">
            {loading ? "Saving..." : "View"}
          </span>
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
