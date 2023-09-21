import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  markdown: string;
  changelogId: number;
  repoOwner: string;
  repoName: string;
};

export const ChangelogActions = ({
  markdown,
  changelogId,
  repoOwner,
  repoName,
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
    <div className="w-full flex items-center justify-between">
      <h3>Changelog</h3>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          className="space-x-2"
          onClick={() => {
            copyToClipboard(markdown);
            setCopied("text");
          }}
        >
          <span>{copied === "text" ? "Copied!" : "Copy as text"}</span>
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
          onClick={() => {
            copyToClipboard(markdown);
            setCopied("markdown");
          }}
        >
          <span>{copied === "markdown" ? "Copied!" : "Copy as markdown"}</span>
          {copied === "markdown" ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
        <Link
          href={`${repoOwner}.${window.location.host}/${repoName}/${changelogId}`}
        >
          <Button size="sm" variant="default" className="space-x-2">
            <span>View page</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
