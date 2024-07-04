/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1rckynvzvnkn3.cloudfront.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
