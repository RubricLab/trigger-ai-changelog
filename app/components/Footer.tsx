import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen h-14 border-t bg-background">
      <div className="flex items-center justify-between h-full px-4 text-dimmed text-sm">
        <div className="flex gap-2">
          <div className="text-primary font-semibold">How does it work?</div>{" "}
          <div className="text-sm">
            This site is powered by{" "}
            <Link href="https://trigger.dev" target="_blank">
              Trigger.dev
            </Link>{" "}
            , an open source background jobs framework.
          </div>
        </div>
        <Link
          href="https://github.com/rubriclab/trigger-ai-changelog"
          target="_blank"
        >
          <Button
            variant="secondary"
            size="sm"
            className="text-dimmed space-x-1"
          >
            <span>Explore the code</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </footer>
  );
};
