import type { NextConfig } from "next";
import { getApiUrl } from "./src/lib/api/config";

const apiUrl = getApiUrl();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("/img/**", apiUrl)],
  },
};

export default nextConfig;
