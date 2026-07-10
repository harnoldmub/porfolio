import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: "#0d1117",
                    900: "#151821",
                    800: "#1f2430",
                },
                accent: "#356dff",
                "off-white": "#f7f1e8",
                navy: "#0d1117",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
            },
        },
    },
    plugins: [],
};
export default config;
