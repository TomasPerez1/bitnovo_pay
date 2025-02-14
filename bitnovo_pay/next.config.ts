import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['payments.pre-bnvo.com'],
  },
};

export default nextConfig;
