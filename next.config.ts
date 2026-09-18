import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/war-room",
        destination: "/services/election-war-room",
        permanent: true,
      },
      {
        source: "/services/voter-data",
        destination: "/services/election-data-research",
        permanent: true,
      },
      {
        source: "/services/survey",
        destination: "/services/election-data-research",
        permanent: true,
      },
      {
        source: "/services/cadre-booth",
        destination: "/services/booth-ground-management",
        permanent: true,
      },
      {
        source: "/services/digital-media",
        destination: "/services/social-media-management",
        permanent: true,
      },
      {
        source: "/services/ground-campaign",
        destination: "/services/booth-ground-management",
        permanent: true,
      },
      {
        source: "/services/telecalling",
        destination: "/services/voter-communication",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
