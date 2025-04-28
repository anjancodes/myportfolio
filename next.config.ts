import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this to improve handling of browser-only code
  reactStrictMode: true,
  // Optionally disable SSR for problematic pages
  experimental: {
    // This is optional and might not be needed
    // appDir: true,
  },
};

export default nextConfig;
