import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vendas Mais — Plataforma de Inteligência Comercial com IA",
  description:
    "Transforme suas vendas com inteligência artificial. CRM integrado, AURA IA e processos comerciais eficientes para empresas brasileiras.",
  keywords: "CRM, vendas, inteligência artificial, IA, leads, pipeline, Brasil",
  authors: [{ name: "Vendas Mais" }],
  openGraph: {
    title: "Vendas Mais — IA para vendas",
    description: "Seu assistente de vendas inteligente.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-vm-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
