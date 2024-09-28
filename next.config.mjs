/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
    images: {
      domains: [
        "img.clerk.com",
        "fastly.picsum.photos"
      ]
    },
    basePath: "/resume",
  };

export default nextConfig;