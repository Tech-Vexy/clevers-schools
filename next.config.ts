import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  images: {
    domains: ['https://schoolresources.clevers.co.ke/'], // Add your domain here
  },

};

export default nextConfig;
