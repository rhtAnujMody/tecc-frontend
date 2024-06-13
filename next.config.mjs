/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1gt2w0mc3uw79.cloudfront.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
