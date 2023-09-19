import Link from "next/link";
import React from "react";
import TriggerLogo from "./TriggerLogo";
import { GithubIcon } from "lucide-react";

function Header() {
  return (
    <header className="w-screen h-20">
      <div className="flex items-center justify-between h-full px-12">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold tracking-tighter">AutoChangelog</h1>
          <div className="text-xs flex items-center gap-1">
            by
            <Link href="https://trigger.dev" target="_blank">
              <TriggerLogo className="h-4" />
            </Link>
          </div>
        </div>
        <Link
          href="https://github.com/rubriclab/trigger-ai-changelog"
          target="_blank"
        >
          <GithubIcon className="w-6 h-6" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
