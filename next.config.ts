import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bookcabin.com',
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      '@tanstack/react-virtual',
      'lucide-react',
      'react-redux',
      '@reduxjs/toolkit'
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,
};

export default nextConfig;
