/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
