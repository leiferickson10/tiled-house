import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server (http://<this PC's IP>:3000).
  allowedDevOrigins: ["10.0.0.11", "10.*.*.*", "192.168.*.*"],
};

export default nextConfig;
