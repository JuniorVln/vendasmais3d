"use client";

import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import VmTitle, { VmTitleAccent } from "@/components/VmTitle";
import {
  inViewFadeUp,
  inViewFromLeft,
  inViewFromRight,
  inViewScale,
} from "@/lib/motionVariants";
import { VM_TITLE_ACCENT, VM_TITLE_ON_LIGHT } from "@/lib/vmTitleStyles";
import { useLeadModal } from "@/components/LeadModals";
import {
  CONTACT_EMAIL,
  WHATSAPP_LEAD_MSG,
  WHATSAPP_NUMBER,
  whatsappUrl,
} from "@/lib/contact";

/** Ícone do WhatsApp (lucide não tem o ícone da marca). */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

/** Botão verde de WhatsApp reutilizável (itens 5/7/8). */
function WhatsAppCta({ label, message = WHATSAPP_LEAD_MSG }: { label: string; message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-interactive cta-whatsapp inline-flex items-center justify-center gap-2.5 rounded-full font-black uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundColor: "#25D366",
        color: "#ffffff",
        fontSize: 14,
        padding: "16px 40px",
        boxShadow: "0 0 36px rgba(37,211,102,0.40), 0 0 0 1px rgba(37,211,102,0.40), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1FBF5B")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366")}
    >
      <WhatsAppIcon size={20} />
      {label}
    </a>
  );
}

const beforeCopy = [
  {
    title: "Leads espalhados",
    body: "Informações perdidas entre WhatsApp, planilhas e anotações.",
  },
  {
    title: "Follow-up esquecido",
    body: "Oportunidades esfriam por falta de acompanhamento.",
  },
  {
    title: "Atendimento lento",
    body: "Leads aguardam resposta e fecham com concorrentes.",
  },
  {
    title: "Falta de previsibilidade",
    body: "Sem clareza sobre resultados, gargalos e próximos passos.",
  },
  {
    title: "Equipe sobrecarregada",
    body: "Muito trabalho operacional e pouco foco em vendas.",
  },
];

const afterCopy = [
  {
    title: "Leads centralizados",
    body: "Todos os contatos, históricos e oportunidades em um só lugar.",
  },
  {
    title: "Follow-up inteligente",
    body: "Acompanhamentos automáticos para nenhuma oportunidade esfriar.",
  },
  {
    title: "IA Comercial Especializada",
    body: "Sugestões estratégicas e abordagens personalizadas para cada lead.",
  },
  {
    title: "Gestão em tempo real",
    body: "Metas, performance e oportunidades monitoradas em um dashboard completo.",
  },
  {
    title: "Mais vendas, menos esforço",
    body: "Processos organizados para sua equipe focar no que realmente importa: vender.",
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
          src="/smartphone-ia-vendas-mais-v2-gpt.png"
          alt="Vendas Mais — inteligência comercial no celular"
          width={1024}
          height={1536}
          className="before-after-phone-pulse block h-full w-auto max-h-[min(72vh,700px)] object-contain object-center"
          style={{
            animation: "beforeAfterPhonePulse 2.8s ease-in-out infinite",
            transform: "scale(1.12)",
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
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    linkLabel: null,
  },
  {
    Icon: Mail,
    prefix: "ATENDIMENTO POR",
    highlight: "EMAIL",
    sub: "Mande um e-mail agora para",
    href: `mailto:${CONTACT_EMAIL}`,
    linkLabel: CONTACT_EMAIL,
  },
];

// ─── Dot-grid background SVG as data URL ────────────────────────
const dotGrid =
  "radial-gradient(circle, rgba(255,255,255,0.038) 1px, transparent 1px)";

// Vídeo de apresentação (seção "Ainda está em dúvida?"). Trocar aqui caso o
// arquivo seja substituído.
const DOUBT_VIDEO_SRC = "/videos/video-duvida.mp4";

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
        <motion.div {...inViewFadeUp} style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
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
            lines={["Do caos comercial ao", "controle total das vendas"]}
          />
          <p
            className="mx-auto mt-5 text-center font-medium"
            style={{
              maxWidth: 760,
              fontSize: "clamp(18px, 1.3vw, 21px)",
              lineHeight: 1.5,
              color: "rgba(99,122,155,0.85)",
            }}
          >
            Veja como a IA do Vendas Mais transforma operações comerciais
            desorganizadas em processos previsíveis, inteligentes e focados em
            conversão.
          </p>
        </motion.div>

        <div className="mx-auto grid w-full max-w-[1180px] items-stretch justify-center gap-12 overflow-visible lg:grid-cols-[380px_minmax(200px,320px)_380px]">
          <motion.div
            className="flex w-full flex-col gap-5 text-left lg:text-right"
            {...inViewFromLeft}
            transition={{ ...inViewFromLeft.transition, delay: 0.08 }}
          >
            {/* Rótulo só no mobile — o celular central (desktop) some aqui e
                as duas listas precisam de um marcador de "antes". */}
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] lg:hidden"
              style={{
                color: "#C0492B",
                background: "rgba(192,73,43,0.08)",
                border: "1px solid rgba(192,73,43,0.24)",
              }}
            >
              Antes
            </span>
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
            {/* Rótulo só no mobile — marca o "depois" (soluções). */}
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] lg:hidden"
              style={{
                color: VM_TITLE_ACCENT,
                background: "rgba(45,156,255,0.10)",
                border: "1px solid rgba(45,156,255,0.30)",
              }}
            >
              Depois
            </span>
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

        <motion.div
          className="mt-14 flex justify-center"
          {...inViewFadeUp}
          transition={{ ...inViewFadeUp.transition, delay: 0.1 }}
        >
          <WhatsAppCta label="Quero sair do caos" />
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const { openAgendar, openPlans } = useLeadModal();
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
              <div style={{ marginBottom: 40 }}>
                <Image
                  src="/logo-vendas-mais-oficial-colorido.png"
                  alt="Vendas Mais"
                  width={160}
                  height={86}
                  priority={false}
                  style={{ height: "auto", width: 160 }}
                />
              </div>

              <VmTitle
                as="h2"
                id="final-cta-heading"
                lines={["Venda com previsibilidade", "Cresça com inteligência"]}
                style={{ maxWidth: 480 }}
              />

              <p
                className="font-medium leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.68)",
                  fontSize: "clamp(18px, 1.3vw, 20px)",
                  maxWidth: 500,
                  marginTop: 28,
                }}
              >
                Agende uma demonstração e descubra onde sua empresa está
                perdendo oportunidades — e como transformar isso em mais vendas.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openAgendar}
                  className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "#FFD245",
                    color: "#050A14",
                    fontSize: 13,
                    padding: "17px 44px",
                    boxShadow:
                      "0 0 40px rgba(255,210,69,0.40), 0 0 0 1px rgba(255,210,69,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFE57A")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFD245")
                  }
                >
                  Agendar demonstração
                </button>
                <button
                  type="button"
                  onClick={openPlans}
                  className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    fontSize: 13,
                    padding: "17px 44px",
                    border: "1px solid rgba(255,255,255,0.28)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(45,156,255,0.6)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.28)")
                  }
                >
                  Ver planos
                </button>
              </div>
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
          className="mt-12 flex justify-center"
          style={{ opacity: 0.5 }}
        >
          <p className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
            © 2026 Vendas Mais® - Desenvolvido por ArteOne Marketing Digital - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}

function DoubtVideoSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050A14 0%, #040811 50%, #050A14 100%)",
        backgroundImage: dotGrid,
        backgroundSize: "30px 30px",
        padding: "clamp(72px, 9vw, 120px) 24px",
      }}
      aria-labelledby="doubt-video-heading"
    >
      <div className="mx-auto w-full" style={{ maxWidth: 920 }}>
        <motion.div {...inViewFadeUp} className="text-center">
          <VmTitle as="h2" id="doubt-video-heading" center>
            Ainda está em <VmTitleAccent>dúvida?</VmTitleAccent>
          </VmTitle>
          <p
            className="mx-auto mt-5 font-medium"
            style={{
              maxWidth: 780,
              fontSize: "clamp(18px, 1.3vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            Veja por que a Inteligência Comercial está se tornando indispensável
            para empresas que desejam crescer. Uma explicação clara e objetiva
            sobre como a IA do Vendas Mais pode transformar sua operação
            comercial.
          </p>
        </motion.div>

        {/* Vídeo de apresentação (vertical 9:16) */}
        <motion.div
          {...inViewScale}
          transition={{ ...inViewScale.transition, delay: 0.1 }}
          className="relative mx-auto mt-12 flex items-center justify-center overflow-hidden rounded-3xl"
          style={{
            aspectRatio: "9 / 16",
            width: "100%",
            maxWidth: 380,
            maxHeight: "min(76vh, 680px)",
            background:
              "linear-gradient(135deg, rgba(8,28,52,0.92) 0%, rgba(5,10,20,0.96) 60%, rgba(32,22,8,0.9) 100%)",
            border: "1px solid rgba(217,154,30,0.32)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <video
            controls
            playsInline
            preload="metadata"
            className="h-full w-full"
            style={{ objectFit: "cover" }}
          >
            <source src={DOUBT_VIDEO_SRC} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          {...inViewFadeUp}
          transition={{ ...inViewFadeUp.transition, delay: 0.18 }}
        >
          <WhatsAppCta label="Quero vender mais todos os meses" />
        </motion.div>
      </div>
    </section>
  );
}

export default function PostScrollSections() {
  return (
    <>
      <BeforeAfterSection />
      <DoubtVideoSection />
      <FinalCTASection />
    </>
  );
}
