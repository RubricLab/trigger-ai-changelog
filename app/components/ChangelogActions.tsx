"use client";

import { Button } from "@/components/ui/button";
import { cn, copyToClipboard, stripMarkdown } from "@/lib/utils";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  markdown?: string;
};

export const ChangelogActions = ({ markdown }: Props) => {
  const [copied, setCopied] = useState("");

  const path = usePathname();

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
          disabled={!markdown}
          size="sm"
          variant="default"
          className={cn("space-x-2")}
          onClick={() => {
            if (!markdown) return;
            const url =
              typeof window !== "undefined" && window.location.href
                ? window.location.href
                : "";
            copyToClipboard(url);
            setCopied("url");
          }}
        >
          {copied === "url" ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
          <span>Copy link</span>
        </Button>
      </div>
    </div>
  );
};
