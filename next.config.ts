import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/whitepaper.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },
  async rewrites() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return [
      {
        source: "/whitepaper.pdf",
        destination: `${supabaseUrl}/storage/v1/object/public/documentation/whitepaper.pdf`,
      },
    ];
  },
};

export default nextConfig;
