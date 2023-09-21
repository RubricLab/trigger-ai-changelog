import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  markdown?: string;
  changelogId: number;
  owner: string;
  repo: string;
};

export const ChangelogActions = ({
  markdown,
  changelogId,
  owner,
  repo,
}: Props) => {
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied("");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="w-full flex items-center justify-between text-dimmed border-b border-slate-800 pb-4">
      <h3>Changelog</h3>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          className="space-x-2"
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
        <Link href={`${owner}.${window.location.host}/${repo}/${changelogId}`}>
          <Button
            disabled={!markdown}
            size="sm"
            variant="default"
            className="space-x-2"
          >
            <span>View page</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
