import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen h-10">
      <div className="flex items-center justify-between h-full px-4 md:px-12 text-dimmed text-sm">
        <div>
          Built on{" "}
          <Link href="https://trigger.dev" target="_blank">
            Trigger.dev
          </Link>{" "}
          by{" "}
          <Link href="https://rubric.sh" target="_blank">
            Rubric Labs
          </Link>
          .
        </div>
        <p>Copyright 2023.</p>
      </div>
    </footer>
  );
};
