import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    turbo: {
      root: process.cwd(), // Îi forțează pe Turbopack să folosească folderul principal (app0-artur-main)
    }
  }
};

export default nextConfig;