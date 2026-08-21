/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 240, 320, 480, 640],
  },
  // Using App Router
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "soft-lff2.vercel.app" }],
        destination: "https://orasoft.vercel.app/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
