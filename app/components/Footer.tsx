import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GitHub } from "./logos/GitHub";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen py-4 border-t bg-background">
      <div className="flex flex-col sm:flex-row gap-y-4 items-center sm:items-end lg:items-center justify-between h-full pl-4 pr-3 text-dimmed text-sm">
        <div className="flex flex-col w-full lg:flex-row sm:items-baseline gap-0 sm:gap-2">
          <p className="font-medium text-sm sm:text-base">How does it work?</p>
          <p className="text-xs sm:text-sm">
            This site is powered by{" "}
            <Link
              href="https://trigger.dev"
              target="_blank"
              className="hover:text-indigo-500 text-primary font-normal"
            >
              Trigger.dev
            </Link>
            , an open source background jobs framework.
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between sm:justify-end w-full lg:w-fit">
          <Link
            href="https://dev.to/tedspare/generate-changelogs-with-ai-2c0f-temp-slug-6382472?preview=4c013ec6e1a91076e60d156e8fb09323e70bf3ef5c305018e227115736c572093b6afd041357863bdd0f7f4e5f335d32f956bb566398737a5709d40b"
            className="font-normal text-primary hover:text-indigo-500 whitespace-nowrap"
            target="_blank"
          >
            Read the blog
          </Link>
          <Link
            href="https://github.com/triggerdotdev/ai-changelog"
            target="_blank"
          >
            <Button
              variant="secondary"
              size="sm"
              className="group text-dimmed font-normal space-x-1"
            >
              <GitHub className="w-4 h-4 mr-1" />
              <span className="whitespace-nowrap">Explore the code</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
