import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen h-14 border-t bg-background">
      <div className="flex items-center justify-between h-full px-4 text-dimmed text-sm">
        <div className="flex gap-2">
          <Link
            href="https://dev.to/tedspare/generate-changelogs-with-ai-2c0f-temp-slug-6382472?preview=4c013ec6e1a91076e60d156e8fb09323e70bf3ef5c305018e227115736c572093b6afd041357863bdd0f7f4e5f335d32f956bb566398737a5709d40b"
            className="text-primary font-semibold"
          >
            How does it work?
          </Link>{" "}
          <div className="text-sm">
            This site is powered by{" "}
            <Link href="https://trigger.dev" target="_blank">
              Trigger.dev
            </Link>{" "}
            , an open source background jobs framework.
          </div>
        </div>
        <Link
          href="https://github.com/triggerdotdev/autochangelog"
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
