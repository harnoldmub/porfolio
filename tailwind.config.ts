import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    // A closed palette: four values, nothing else. Anything that needs to sit
    // between them uses an alpha of paper/ink rather than a new hue.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        DEFAULT: "#050505",
        raised: "#0B0B0C",
        line: "rgba(242,240,234,0.12)",
        soft: "rgba(242,240,234,0.06)",
      },
      paper: {
        DEFAULT: "#F2F0EA",
        line: "rgba(5,5,5,0.14)",
        soft: "rgba(5,5,5,0.05)",
      },
      grey: "#8B8B8B",
      blue: "#245DFF",
      "blue-text": "#3A70FF",
    },
    borderRadius: { none: "0", full: "9999px" },
    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },
    extend: {
      fontSize: {
        // fluid editorial scale — every heading on the site comes from here
        mega: ["clamp(3.1rem, 13.2vw, 13rem)", { lineHeight: "0.84", letterSpacing: "-0.045em" }],
        display: ["clamp(2.6rem, 8.4vw, 7.5rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        title: ["clamp(2rem, 5.4vw, 4.4rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        heading: ["clamp(1.5rem, 3vw, 2.4rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        lead: ["clamp(1.02rem, 1.35vw, 1.28rem)", { lineHeight: "1.62", letterSpacing: "-0.01em" }],
        meta: ["0.7rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 4.2vw, 4.5rem)",
        section: "clamp(5.5rem, 11vw, 11rem)",
      },
      maxWidth: { shell: "1680px", measure: "62ch" },
      transitionTimingFunction: { expo: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};
export default config;
