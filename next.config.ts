import type { NextConfig } from "next";

const apiUrl = process.env.FAKE_STORE_API_URL?.trim();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: apiUrl ? [new URL("/img/**", apiUrl)] : [],
  },
};

export default nextConfig;
