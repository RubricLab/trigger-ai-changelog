import { ImageResponse } from "next/server";
import React from "react";
import { TriggerIcon } from "./components/logos/Trigger";

// Route segment config
export const runtime = "edge";

// Image metadata
export const contentType = "image/svg+xml";
export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
  return new ImageResponse(<TriggerIcon />, { ...size });
}
