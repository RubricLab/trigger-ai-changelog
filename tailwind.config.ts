import type { Config } from "tailwindcss";

import colors from "tailwindcss/colors";

const slate = {
  ...colors.slate,
  450: "#7E8FA6",
  500: "#6B7C95",
  550: "#586981",
  600: "#45566D",
  650: "#3C4B62",
  750: "#293649",
  850: "#1A2434",
  900: "#131B2B",
};

/** Trigger.dev custom palette */
const midnight = {
  ...colors.slate,
  450: slate[850],
  500: slate[650],
  550: slate[700],
  600: slate[750],
  650: slate[800],
  750: slate[850],
  800: slate[900],
  850: "#0E1521",
  900: "#0B1018",
};

/** Text colors */
const bright = colors.slate[200];
const dimmed = colors.slate[400];

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight,
        bright,
        dimmed,
      },
    },
  },
  plugins: [],
};

export default config;
