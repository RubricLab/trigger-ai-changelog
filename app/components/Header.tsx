import Link from "next/link";
import React from "react";
import { TriggerLogo } from "./logos/Trigger";
import { GitHub } from "./logos/GitHub";

export const Header = () => {
  return (
    <header className="w-screen h-14 border-b">
      <div className="flex items-center justify-between h-full px-4 md:px-12">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold tracking-tighter">
            <Link href="/">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                AutoChangelog
              </span>
            </Link>
          </h1>
          <div className="text-xs text-dimmed flex items-center gap-1">
            powered by
            <Link
              href="https://trigger.dev"
              className="text-bright"
              target="_blank"
            >
              <TriggerLogo className="h-4" />
            </Link>
          </div>
        </div>
        <Link
          href="https://github.com/rubriclab/trigger-ai-changelog"
          target="_blank"
          className="flex items-center gap-2"
        >
          <GitHub className="w-5 h-5" />
          <div>GitHub</div>
        </Link>
      </div>
    </header>
  );
};
