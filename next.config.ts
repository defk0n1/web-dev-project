import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging:{
    fetches:{
      fullUrl: true,
    },
  },
   images: {
    domains: ['res.cloudinary.com', "m.media-amazon.com"], // Add Cloudinary's domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
},
  /* config options here */
};

export default nextConfig;
