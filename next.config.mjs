/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build/.next", // project root এর ভিতরে
  experimental: {
    turbo: false, // Turbopack disable
  },
};

export default nextConfig;
