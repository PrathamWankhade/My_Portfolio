import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The résumé page was rebuilt as a detailed CV.
      { source: "/resume", destination: "/cv", permanent: true },
      // The phishing project is named after its repository: PhishGuard.
      {
        source: "/projects/phishing-detection",
        destination: "/projects/phishguard",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
