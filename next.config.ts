import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  typescript: {
    // Skip type checking during the build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['schoolresources.clevers.co.ke'], // Note: Remove 'https://' from domain
  }
};

module.exports = nextConfig;