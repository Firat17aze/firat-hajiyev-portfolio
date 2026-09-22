import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Keep Turbopack scoped to this project. A package-lock in a parent directory
  // otherwise makes Next.js choose the wrong filesystem root during local development.
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
