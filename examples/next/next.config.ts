import type { NextConfig } from "next";

export default {
  images: { remotePatterns: [new URL("https://logo.svgcdn.com/**")] },
  reactStrictMode: true,
} satisfies NextConfig;
