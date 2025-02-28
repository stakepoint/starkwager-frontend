/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.multiavatar.com",
      },
    ],
  },
};

export default nextConfig;
