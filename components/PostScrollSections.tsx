"use client";

import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import VmTitle from "@/components/VmTitle";
import {
  inViewFadeUp,
  inViewFromLeft,
  inViewFromRight,
  inViewScale,
} from "@/lib/motionVariants";
import { VM_TITLE_ACCENT, VM_TITLE_ON_LIGHT } from "@/lib/vmTitleStyles";
import VmLogo from "./VmLogo";
import PlansSection from "./PlansSection";

const beforeCopy = [
  {
    title: "Leads espalhados",
    body: "Contatos ficam perdidos entre planilhas, WhatsApp e anotações, sem uma visão clara do que precisa avançar.",
  },
  {
    title: "Follow-up esquecido",
    body: "Oportunidades esfriam porque não existe uma rotina simples para lembrar, priorizar e retomar conversas.",
  },
  {
    title: "Atendimento lento",
    body: "A equipe demora para responder e o lead acaba fechando com quem chegou primeiro.",
  },
  {
    title: "Falta de visão do funil",
    body: "Gestores não enxergam gargalos, próximos passos e previsibilidade de fechamento.",
  },
  {
    title: "Vendedor sobrecarregado",
    body: "Tempo demais em tarefas manuais e pouco foco no que realmente gera venda.",
  },
];

const afterCopy = [
  {
    title: "Leads centralizados",
    body: "Histórico, dados e oportunidades ficam organizados em uma rotina comercial única.",
  },
  {
    title: "Follow-up automatizado",
    body: "Lembretes e ações ajudam a manter cada oportunidade ativa no momento certo.",
  },
  {
    title: "IA apoiando a abordagem",
    body: "Sugestões comerciais ajudam o time a responder melhor e conduzir cada lead com mais contexto.",
  },
  {
    title: "Dashboard de gestão",
    body: "Metas, performance e oportunidades aparecem em uma visão objetiva para decisão rápida.",
  },
  {
    title: "Mais foco em fechamento",
    body: "Menos improviso operacional e mais energia aplicada nas conversas com chance real de venda.",
  },
];

function BeforeAfterCenterPhone() {
  return (
    <>
      <style>{`
        @keyframes beforeAfterPhonePulse {
          0%, 100% {
            filter: drop-shadow(0 22px 52px rgba(45, 156, 255, 0.18))
              drop-shadow(0 0 0 rgba(45, 156, 255, 0));
          }
          50% {
            filter: drop-shadow(0 30px 70px rgba(45, 156, 255, 0.34))
              drop-shadow(0 0 28px rgba(45, 156, 255, 0.16));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .before-after-phone-pulse {
            animation: none !important;
          }
        }
      `}</style>
      <div className="flex h-full w-full items-center justify-center overflow-visible">
        <Image
          src="/smartphone-ia-vendas-mais.png"
          alt="Vendas Mais — inteligência comercial no celular"
          width={1024}
          height={1536}
          className="before-after-phone-pulse block h-full w-auto max-h-[min(72vh,700px)] object-contain object-center"
          style={{
            animation: "beforeAfterPhonePulse 2.8s ease-in-out infinite",
            transform: "scale(1.22)",
            transformOrigin: "center center",
          }}
          priority={false}
        />
      </div>
    </>
  );
}

const contactCards = [
  {
    Icon: Phone,
    prefix: "ATENDIMENTO POR",
    highlight: "WHATSAPP",
    sub: "Toque aqui para tirar as suas dúvidas",
    href: "https://wa.me/5551991387792",
    linkLabel: null,
  },
  {
    Icon: Mail,
    prefix: "ATENDIMENTO POR",
    highlight: "EMAIL",
    sub: "Mande um e-mail agora para",
    href: "mailto:contato@iavendasmais.com.br",
    linkLabel: "contato@iavendasmais.com.br",
  },
];

// ─── Dot-grid background SVG as data URL ────────────────────────
const dotGrid =
  "radial-gradient(circle, rgba(255,255,255,0.038) 1px, transparent 1px)";

function BeforeAfterSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#F4F9FF",
      }}
      aria-labelledby="before-after-heading"
    >
      <div
        className="relative w-full overflow-visible"
        style={{
          minHeight: 760,
          padding: "clamp(56px, 8vw, 72px) max(20px, calc((100vw - 1180px) / 2)) 80px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,249,255,0.98) 100%)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
        }}
      >
        <motion.div {...inViewFadeUp} style={{ marginBottom: "clamp(48px, 6vw, 96px)" }}>
          <VmTitle
            as="h2"
            id="before-after-heading"
            center
            onLight
            className="w-full"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            lines={["Do improviso para uma", "operação comercial previsível"]}
          />
        </motion.div>

        <div className="mx-auto grid w-full max-w-[1180px] items-stretch justify-center gap-12 overflow-visible lg:grid-cols-[380px_minmax(200px,320px)_380px]">
          <motion.div
            className="flex w-full flex-col gap-5 text-left lg:text-right"
            {...inViewFromLeft}
            transition={{ ...inViewFromLeft.transition, delay: 0.08 }}
          >
            {beforeCopy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -32, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.07 }}
              >
                <h3 className="text-lg font-black leading-tight" style={{ color: VM_TITLE_ON_LIGHT }}>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(99,122,155,0.66)" }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative hidden h-full min-h-0 w-full items-center justify-center self-stretch overflow-visible lg:flex"
            {...inViewScale}
            transition={{ ...inViewScale.transition, delay: 0.15 }}
          >
            <BeforeAfterCenterPhone />
          </motion.div>

          <motion.div
            className="flex w-full flex-col gap-5 text-left"
            {...inViewFromRight}
            transition={{ ...inViewFromRight.transition, delay: 0.08 }}
          >
            {afterCopy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 32, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.07 }}
              >
                <h3 className="text-lg font-black leading-tight" style={{ color: VM_TITLE_ACCENT }}>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(99,122,155,0.72)" }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section
      id="contato"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #050A14 0%, #040811 50%, #050A14 100%)",
        backgroundImage: dotGrid,
        backgroundSize: "30px 30px",
        padding: "120px 24px",
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* Decorative gold line separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(217,154,30,0.30) 30%, rgba(217,154,30,0.30) 70%, transparent 100%)",
        }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 420,
          background:
            "radial-gradient(ellipse at center, rgba(217,154,30,0.06) 0%, rgba(45,156,255,0.04) 50%, transparent 80%)",
          filter: "blur(48px)",
        }}
      />

      <div className="relative w-full" style={{ maxWidth: 1180 }}>
        {/* Main card */}
        <div
          className="overflow-hidden rounded-[28px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,28,52,0.95) 0%, rgba(5,10,20,0.98) 55%, rgba(32,22,8,0.94) 100%)",
            border: "1px solid rgba(217,154,30,0.32)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(217,154,30,0.05)",
            padding: "clamp(40px, 6vw, 72px)",
          }}
        >
          {/* Inner top gold line */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(217,154,30,0.48) 40%, rgba(217,154,30,0.48) 60%, transparent 95%)",
              position: "relative",
              marginBottom: 0,
            }}
          />

          <div className="grid gap-12 lg:grid-cols-[1fr_0.68fr] lg:items-center">
            {/* Left: logo + headline + CTA */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-vendas-mais-branco.png"
                alt="Vendas Mais"
                style={{ height: 44, width: "auto", marginBottom: 40, opacity: 0.92 }}
              />

              <VmTitle
                as="h2"
                id="final-cta-heading"
                lines={["Aumente sua conversão", "Reduza seus custos"]}
                style={{ maxWidth: 480 }}
              />

              <p
                className="font-medium leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.68)",
                  fontSize: "clamp(15px, 1.1vw, 17px)",
                  maxWidth: 480,
                  marginTop: 28,
                }}
              >
                Agende uma demonstração e veja como o Vendas Mais pode
                organizar sua pré-venda, automatizar acompanhamentos e ajudar
                sua equipe a vender mais.
              </p>

              <a
                href="mailto:contato@iavendasmais.com.br?subject=Agendar%20demonstra%C3%A7%C3%A3o%20Vendas%20Mais"
                className="inline-flex items-center justify-center gap-3 rounded-full font-black uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  marginTop: 36,
                  backgroundColor: "#FFD245",
                  color: "#050A14",
                  fontSize: 13,
                  padding: "17px 52px",
                  boxShadow:
                    "0 0 40px rgba(255,210,69,0.40), 0 0 0 1px rgba(255,210,69,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#FFE57A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#FFD245")
                }
              >
                Agendar demonstração
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>

            {/* Right: contacts */}
            <div className="flex flex-col gap-4">
              {contactCards.map(({ Icon, prefix, highlight, sub, href, linkLabel }) => (
                <a
                  key={highlight}
                  href={href}
                  target={highlight === "WHATSAPP" ? "_blank" : undefined}
                  rel={highlight === "WHATSAPP" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 rounded-2xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    padding: "24px 22px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,116,189,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.10)";
                  }}
                >
                  <span
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(0,116,189,0.12)",
                      border: "2px solid rgba(0,116,189,0.40)",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.8} color="#0074BD" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase leading-tight tracking-wide" style={{ color: "#ffffff" }}>
                      {prefix}{" "}
                      <span style={{ color: "#0074BD" }}>{highlight}</span>
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug" style={{ color: "rgba(255,255,255,0.50)" }}>
                      {sub}
                    </p>
                    {linkLabel && (
                      <p className="mt-0.5 text-sm font-bold" style={{ color: "#0074BD" }}>
                        {linkLabel}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          className="mt-12 flex flex-col items-center gap-3 md:flex-row md:justify-between"
          style={{ opacity: 0.38 }}
        >
          <VmLogo height={24} width={80} />
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
            © 2025 Vendas Mais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PostScrollSections() {
  return (
    <>
      <BeforeAfterSection />
      <PlansSection />
      <FinalCTASection />
    </>
  );
}
