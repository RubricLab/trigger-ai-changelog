import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-screen h-10">
      <div className="flex items-center justify-between h-full px-12 text-dimmed text-sm">
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
}

export default Footer;
