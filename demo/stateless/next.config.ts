import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["reign-auth", "@reign-auth/core"],
};

export default nextConfig;
