"use client";

import {
  CalendarClock,
  Mail,
  Phone,
  PlayCircle,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import VmTitle, { VmTitleAccent } from "@/components/VmTitle";
import {
  inViewFadeUp,
  inViewFromLeft,
  inViewFromRight,
  inViewScale,
} from "@/lib/motionVariants";
import { VM_TITLE_ACCENT, VM_TITLE_ON_LIGHT } from "@/lib/vmTitleStyles";

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
          <a
            href="#contato"
            className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.12em] hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "#FFD245",
              color: "#050A14",
              fontSize: 14,
              padding: "16px 44px",
              boxShadow:
                "0 0 36px rgba(255,210,69,0.40), 0 0 0 1px rgba(255,210,69,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFE57A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFD245")
            }
          >
            Quero sair do caos
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Popup de conversão (Agendar / Comprar) ─────────────────────
const WHATSAPP_NUMBER = "5551991387792";
const WHATSAPP_BASE_MSG =
  "Olá, gostaria de agendar uma apresentação do sistema IA do Vendas Mais!";
// Link de destino do botão "Começar agora" (abre em nova aba).
const BUY_LINK = "https://www.iavendasmais.com/";

function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAgendar() {
    // Simulação de gravação do lead (integrar com backend/CRM futuramente).
    console.log("[lead] agendar", form);

    const extras = [
      form.nome && `Nome: ${form.nome}`,
      form.telefone && `Telefone: ${form.telefone}`,
      form.email && `E-mail: ${form.email}`,
    ]
      .filter(Boolean)
      .join("\n");
    const msg = extras ? `${WHATSAPP_BASE_MSG}\n\n${extras}` : WHATSAPP_BASE_MSG;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  function handleComprar() {
    // Simulação de gravação do lead (integrar com backend/CRM futuramente).
    console.log("[lead] comprar", form);

    window.open(BUY_LINK, "_blank", "noopener,noreferrer");
    onClose();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#ffffff",
    fontSize: 15,
    outline: "none",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(2,5,12,0.78)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <motion.div
            className="relative w-full overflow-hidden rounded-3xl"
            style={{
              maxWidth: 460,
              background:
                "linear-gradient(135deg, rgba(8,28,52,0.98) 0%, rgba(5,10,20,0.99) 60%, rgba(32,22,8,0.96) 100%)",
              border: "1px solid rgba(217,154,30,0.32)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              padding: "clamp(28px, 5vw, 40px)",
            }}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <X size={20} />
            </button>

            <h3
              id="lead-modal-title"
              className="font-black"
              style={{ color: "#ffffff", fontSize: "clamp(20px, 2.4vw, 26px)" }}
            >
              Vamos começar?
            </h3>
            <p
              className="mt-2 font-medium"
              style={{ color: "rgba(255,255,255,0.62)", fontSize: 14, lineHeight: 1.5 }}
            >
              Preencha seus dados e escolha como deseja seguir.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                style={inputStyle}
                aria-label="Nome"
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                style={inputStyle}
                aria-label="Telefone"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                style={inputStyle}
                aria-label="E-mail"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAgendar}
                className="inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.03]"
                style={{
                  backgroundColor: "#FFD245",
                  color: "#050A14",
                  fontSize: 13,
                  padding: "15px 28px",
                  boxShadow: "0 0 32px rgba(255,210,69,0.36), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                <CalendarClock size={17} strokeWidth={2.2} />
                Agendar horário
              </button>
              <button
                type="button"
                onClick={handleComprar}
                className="inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "transparent",
                  color: "#2D9CFF",
                  fontSize: 13,
                  padding: "15px 28px",
                  border: "1px solid rgba(45,156,255,0.5)",
                }}
              >
                <ShoppingCart size={17} strokeWidth={2.2} />
                Começar agora
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FinalCTASection() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
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
                  onClick={() => setLeadModalOpen(true)}
                  className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.14em] hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                  onClick={() => setLeadModalOpen(true)}
                  className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.14em] hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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

      <LeadModal open={leadModalOpen} onClose={() => setLeadModalOpen(false)} />
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

        {/* Vídeo do Everaldo — placeholder até a gravação ser entregue */}
        <motion.div
          {...inViewScale}
          transition={{ ...inViewScale.transition, delay: 0.1 }}
          className="relative mx-auto mt-12 flex items-center justify-center overflow-hidden rounded-3xl"
          style={{
            aspectRatio: "16 / 9",
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(8,28,52,0.92) 0%, rgba(5,10,20,0.96) 60%, rgba(32,22,8,0.9) 100%)",
            border: "1px solid rgba(217,154,30,0.32)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* TODO: substituir por <video>/embed quando o vídeo do Everaldo for entregue */}
          <div className="flex flex-col items-center gap-4 text-center">
            <PlayCircle size={72} strokeWidth={1.3} color="#FFD245" />
            <p
              className="text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Vídeo em breve
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          {...inViewFadeUp}
          transition={{ ...inViewFadeUp.transition, delay: 0.18 }}
        >
          <a
            href="#contato"
            className="cta-interactive inline-flex items-center justify-center rounded-full font-black uppercase tracking-[0.12em] hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "#FFD245",
              color: "#050A14",
              fontSize: 14,
              padding: "16px 44px",
              boxShadow:
                "0 0 36px rgba(255,210,69,0.40), 0 0 0 1px rgba(255,210,69,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFE57A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFD245")
            }
          >
            Quero vender mais todos os meses
          </a>
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
