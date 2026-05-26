import {
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import VmLogo from "./VmLogo";

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
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 760,
          padding: "72px max(32px, calc((100vw - 1180px) / 2)) 80px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,249,255,0.98) 100%)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
        }}
      >
        <div className="mb-10 flex justify-center">
          <span
            className="inline-flex items-center gap-2 text-xs font-black uppercase"
            style={{
              letterSpacing: "0.22em",
              padding: "10px 24px",
              borderRadius: 999,
              border: "1px solid rgba(45,156,255,0.18)",
              background: "rgba(255,255,255,0.78)",
              color: "#2D9CFF",
              boxShadow: "0 12px 32px rgba(45,156,255,0.12)",
            }}
          >
            Antes e Depois
          </span>
        </div>

        <h2
          id="before-after-heading"
          className="w-full text-center font-black leading-[1.06] tracking-[-0.035em]"
          style={{
            fontSize: "clamp(28px, 2.65vw, 42px)",
            color: "#0A1628",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "clamp(48px, 6vw, 96px)",
          }}
        >
          Do improviso para uma
          <br />
          <span style={{ color: "#2D9CFF" }}>operação comercial previsível.</span>
        </h2>

        <div className="mx-auto grid w-full max-w-[1180px] items-center justify-center gap-12 lg:grid-cols-[380px_260px_380px]">
          <div className="flex w-full flex-col gap-5 text-right">
            {beforeCopy.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-black leading-tight" style={{ color: "#637A9B" }}>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(99,122,155,0.66)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="relative hidden w-full items-center justify-center lg:flex">
            <style>{`
              @keyframes logoPulse {
                0%, 100% {
                  box-shadow: 0 24px 70px rgba(45,156,255,0.14),
                              0 0 0 0px rgba(45,156,255,0.10);
                }
                50% {
                  box-shadow: 0 24px 70px rgba(45,156,255,0.24),
                              0 0 0 18px rgba(45,156,255,0.06);
                }
              }
            `}</style>
            <div
              className="relative flex h-56 w-56 items-center justify-center rounded-full"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(45,156,255,0.16)",
                animation: "logoPulse 2.8s ease-in-out infinite",
              }}
            >
              <Image
                src="/logo-vendas-mais-oficial.png"
                alt="Vendas Mais"
                width={138}
                height={72}
                className="h-auto w-[138px]"
                priority={false}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 text-left">
            {afterCopy.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-black leading-tight" style={{ color: "#2D9CFF" }}>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(99,122,155,0.72)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
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
            "linear-gradient(90deg, transparent 0%, rgba(200,148,26,0.30) 30%, rgba(200,148,26,0.30) 70%, transparent 100%)",
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
            "radial-gradient(ellipse at center, rgba(200,148,26,0.06) 0%, rgba(45,156,255,0.04) 50%, transparent 80%)",
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
            border: "1px solid rgba(200,148,26,0.32)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(200,148,26,0.05)",
            padding: "clamp(40px, 6vw, 72px)",
          }}
        >
          {/* Inner top gold line */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(200,148,26,0.48) 40%, rgba(200,148,26,0.48) 60%, transparent 95%)",
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

              <h2
                id="final-cta-heading"
                className="font-black leading-[1.08] tracking-[-0.03em]"
                style={{ fontSize: "clamp(28px, 3vw, 48px)", maxWidth: 480 }}
              >
                <span className="text-white">Aumente sua conversão.</span>
                <br />
                <span style={{ color: "#C8941A" }}>Reduza seus custos.</span>
              </h2>

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
                  backgroundColor: "#C8941A",
                  color: "#050A14",
                  fontSize: 13,
                  padding: "17px 52px",
                  boxShadow:
                    "0 0 40px rgba(200,148,26,0.40), 0 0 0 1px rgba(200,148,26,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#E8A820")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#C8941A")
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
      <FinalCTASection />
    </>
  );
}
