import type { NextConfig } from "next";
import createMDX from "@next/mdx";
const nextConfig: NextConfig = {
  /* config options here */

  // https://stackoverflow.com/questions/78555820/how-can-i-load-a-glb-model-from-the-assets-folder-in-nextjs
  webpack(config, options) {
    config.module.rules.push({
      test: /.*\.(glb|gltf)$/,
      use: {
        loader: "file-loader"
      }
    });
    return config;
  },
  // typescript: {
  //     ignoreBuildErrors: true
  // }
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  }
};
const withMDX = createMDX({});

export default withMDX(nextConfig);
