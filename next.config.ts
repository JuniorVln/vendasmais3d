import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // gera site estático em /out para hospedagem em cPanel/Apache
  images: { unoptimized: true }, // next/image sem servidor de otimização
  devIndicators: false,
};

export default nextConfig;
