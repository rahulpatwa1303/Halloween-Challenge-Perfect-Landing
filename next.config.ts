import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Halloween-Challenge-Perfect-Landing",
  assetPrefix: "/Halloween-Challenge-Perfect-Landing/",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
