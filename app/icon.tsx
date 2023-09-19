import { ImageResponse } from "next/server";
import React from "react";

// Route segment config
export const runtime = "edge";

// Image metadata
export const contentType = "image/svg+xml";
export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        viewBox="0 0 32 28"
        width="32"
        height="28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.54389 11.1808L16 0L32 27.71H0L6.4561 16.5289L11.023 19.1653L9.13419 22.4367H22.8658L16 10.5464L14.1112 13.8177L9.54389 11.1808Z"
          fill="url(#paint11_linear_228_1439)"
        />
        <defs>
          <linearGradient
            id="paint11_linear_228_1439"
            x1="95.8593"
            y1="103.194"
            x2="94.7607"
            y2="31.2381"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#41FF54" />
            <stop offset="1" stopColor="#E7FF52" />
          </linearGradient>
        </defs>
      </svg>
    ),
    { ...size }
  );
}
