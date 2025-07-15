import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ← ahora deberia mostrar las imagenes
  },
};

export default nextConfig;
