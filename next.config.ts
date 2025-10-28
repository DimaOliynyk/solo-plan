import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // 308 permanent redirect
      },
    ];
  },

  // Make sure this is here for next/image
  images: {
    domains: ['cdn.pixabay.com'],
  },
};

// Wrap your Next.js config with `withPWA`
// Pass `disable` as a boolean, not a string
export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});
