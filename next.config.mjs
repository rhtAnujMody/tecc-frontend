/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1rckynvzvnkn3.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "d1gt2w0mc3uw79.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "rlms-assets.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
