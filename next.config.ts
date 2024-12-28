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
  /* config options here */
};

export default nextConfig;
