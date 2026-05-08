import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Disable PWA in development to avoid service worker caching old code
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Fix for the WebSocket HMR error
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // This forces the HMR client to connect to the correct host/port
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['cdn.pixabay.com'],
  },
};

// Export using the PWA wrapper
module.exports = withPWA(nextConfig);