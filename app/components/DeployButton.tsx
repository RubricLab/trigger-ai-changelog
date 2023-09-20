import React from "react";
import { TriggerIcon } from "./TriggerLogo";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

function DeployButton() {
  return (
    <Button
      variant="secondary"
      size="lg"
      type="button"
      className="space-x-2 px-4"
      onClick={() => {
        toast("Coming soon... 👀");
      }}
    >
      <TriggerIcon className="h-4" />
      <div className="h-full w-px bg-midnight-700" />
      <span>Deploy</span>
    </Button>
  );
}

export default DeployButton;
