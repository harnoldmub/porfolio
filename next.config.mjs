/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1440, 1920],
  },
  async redirects() {
    // The previous site's routes, kept alive so existing links and indexed
    // pages land on their replacement rather than on a 404.
    return [
      { source: "/projets", destination: "/work", permanent: true },
      { source: "/parcours", destination: "/about", permanent: true },
      { source: "/projets/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
