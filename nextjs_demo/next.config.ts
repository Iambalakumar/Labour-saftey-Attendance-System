// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... (rest of the code remains the same)

  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default nextConfig;