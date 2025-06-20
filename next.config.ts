import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   reactStrictMode: true,
   rules: {
  '@typescript-eslint/ban-ts-comment': 'off',
},

};

export default nextConfig;
