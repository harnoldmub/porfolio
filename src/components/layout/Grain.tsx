/**
 * Procedural film grain — one inline SVG turbulence, no image request.
 * Sits above the page, below the content, and never intercepts pointer events.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="n">
         <feTurbulence type="fractalNoise" baseFrequency="0.86" numOctaves="3" stitchTiles="stitch"/>
         <feColorMatrix type="saturate" values="0"/>
       </filter>
       <rect width="180" height="180" filter="url(#n)"/>
     </svg>`.replace(/\s+/g, " "),
  );

export default function Grain() {
  return <div className="grain" style={{ ["--grain-src" as string]: `url("${NOISE}")` }} aria-hidden />;
}
