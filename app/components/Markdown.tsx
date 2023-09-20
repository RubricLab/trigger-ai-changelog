import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

type Props = {
  markdown: string;
  copiable?: boolean;
};

export const Markdown = ({ markdown, copiable }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  if (!markdown) return <></>;

  return (
    <div className="space-y-4 relative group">
      {copiable && (
        <Button
          variant="secondary"
          type="button"
          className="absolute -top-4 -right-8 space-x-2 group-hover:opacity-100 opacity-20 transition-opacity"
          onClick={() => {
            copyToClipboard(markdown);
            setCopied(true);
          }}
        >
          <span>{copied ? "Copied!" : "Copy markdown"}</span>
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
      )}
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
