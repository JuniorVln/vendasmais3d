"use client";

import { MotionValue, motion, AnimatePresence, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Clock3,
  Briefcase,
  Camera,
  Database,
  FolderOpen,
  Globe,
  KanbanSquare,
  Mail,
  Megaphone,
  PhoneCall,
  RefreshCw,
  Search,
  Share2,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import VmTitle, { VmTitleAccent } from "@/components/VmTitle";
import {
  easeInExpo,
  easeOutExpo,
  phaseEnter,
  phaseExit,
  phaseVisible,
  vmTransition,
} from "@/lib/motionVariants";
import {
  vmTitleAccentStyle,
  vmTitleLineBase,
  vmTitleWhiteStyle,
} from "@/lib/vmTitleStyles";

interface VMExperienceProps {
  scrollYProgress: MotionValue<number>;
}

type Phase = 1 | 2 | 3 | 4 | 5;

function useActivePhase(scrollYProgress: MotionValue<number>): Phase {
  const [phase, setPhase] = useState<Phase>(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.14) setPhase(1);
    else if (v < 0.28) setPhase(2);
    else if (v < 0.52) setPhase(3);
    else if (v < 0.85) setPhase(4);
    else setPhase(5);
  });
  return phase;
}

const tx = vmTransition;
const vmGold = "#FFD245";
const vmGoldLight = "#FFE57A";
/** Ciano da marca (mesmo azul do título) — usado no botão ENTRAR. */
const vmCyan = "#2D9CFF";
const vmCyanLight = "#5CB4FF";

/** CTAs do scroll — mesma altura; largura proporcional ao texto (hero = referência). */
const vmCtaButtonStyle: React.CSSProperties = {
  backgroundColor: vmGold,
  color: "#050A14",
  boxShadow: "0 0 32px rgba(255,210,69,0.46), 0 0 0 1px rgba(255,210,69,0.40)",
  fontSize: 11,
  letterSpacing: "0.06em",
  padding: "10px 26px",
  lineHeight: 1.2,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

function VmCtaLink({
  label,
  href = "#contato",
  className = "",
  big = false,
  xl = false,
  pulse = false,
  variant = "gold",
}: {
  label: string;
  href?: string;
  className?: string;
  /** Versão maior do botão (págs. 1 e 5). */
  big?: boolean;
  /** Versão extra-larga (~3 cards) p/ o CTA da 1ª rolagem. */
  xl?: boolean;
  /** Efeito pulsante contínuo (pág. 1). */
  pulse?: boolean;
  /** Esquema de cor: dourado (padrão) ou ciano (ENTRAR). */
  variant?: "gold" | "cyan";
}) {
  const isCyan = variant === "cyan";
  const baseStyle: React.CSSProperties = isCyan
    ? {
        ...vmCtaButtonStyle,
        backgroundColor: vmCyan,
        color: "#ffffff",
        boxShadow: "0 0 32px rgba(45,156,255,0.46), 0 0 0 1px rgba(45,156,255,0.40)",
      }
    : vmCtaButtonStyle;

  const style: React.CSSProperties = xl
    ? {
        ...baseStyle,
        fontSize: 17,
        padding: "18px 44px",
        letterSpacing: "0.05em",
        // ~3 cards de largura (card = clamp(118,10.2vw,158) + 2 gaps de 10px)
        minWidth: "calc(3 * clamp(118px, 10.2vw, 158px) + 20px)",
        textAlign: "center",
      }
    : big
    ? { ...baseStyle, fontSize: 14, padding: "14px 36px", letterSpacing: "0.05em" }
    : baseStyle;

  const hoverColor = isCyan ? vmCyanLight : vmGoldLight;
  const restColor = isCyan ? vmCyan : vmGold;

  return (
    <a
      href={href}
      className={`cta-interactive pointer-events-auto rounded-full font-semibold tracking-wide hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pulse ? "cta-pulse" : ""} ${className}`}
      style={style}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = restColor)}
      aria-label={label}
    >
      {label}
    </a>
  );
}

// Shared text shadow for readability on raw video
const ts: React.CSSProperties = {
  textShadow: "0 2px 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.95)",
};

// ─── Gold CTA button (bottom-center) ─────────────────────────────
function BottomCTA({
  label,
  note,
  compact = false,
  placement = "bottom",
  href = "#contato",
  big = false,
  xl = false,
  pulse = false,
}: {
  label: string;
  note?: string;
  compact?: boolean;
  placement?: "bottom" | "heroTopRight" | "painCardsRight";
  href?: string;
  big?: boolean;
  xl?: boolean;
  pulse?: boolean;
}) {
  const isHeroTopRight = placement === "heroTopRight";
  const isPainCardsRight = placement === "painCardsRight";

  return (
    <div
      className={`absolute flex flex-col gap-2 pointer-events-none ${
        isPainCardsRight ? "items-end" : "items-center"
      }`}
      style={
        isHeroTopRight
          ? { top: "12.2%", right: "5.8%" }
          : isPainCardsRight
            ? { top: "79%", left: "58%", right: "3.2%" }
          : { bottom: compact ? 14 : 24, left: 0, right: 0 }
      }
    >
      {isHeroTopRight ? (
        <div className="flex items-center gap-5">
          <VmCtaLink
            label="Entrar"
            href="https://app.iavendasmais.com"
            variant="cyan"
          />
          <VmCtaLink label={label} href={href} xl={xl} pulse={pulse} />
        </div>
      ) : (
        <VmCtaLink label={label} href={href} big={big} xl={xl} pulse={pulse} />
      )}
      {note && (
        <p className="text-xs font-medium pointer-events-none" style={{ color: "rgba(255,255,255,0.35)", ...ts }}>
          {note}
        </p>
      )}
    </div>
  );
}

// ─── Feature chip card ────────────────────────────────────────────
interface ChipCard {
  Icon: LucideIcon;
  title: string;
  body: string;
  badge?: string;
}
function FeatureCard({ Icon, title, body, badge, minHeight }: ChipCard & { minHeight?: number }) {
  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        width: "clamp(240px, 22vw, 300px)",
        minHeight,
        padding: "13px 16px",
        gap: 8,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        // Fumê com borda amarela (mesmo padrão dos cards da Fase 2)
        backgroundColor: "rgba(5,10,20,0.68)",
        border: "1px solid rgba(217,154,30,0.58)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.40), 0 0 18px rgba(220,168,50,0.06)",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={15} strokeWidth={2} color="#2D9CFF" className="flex-shrink-0" />
        <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: "#ffffff" }}>
          {title}
        </span>
        {badge && (
          <span
            className="text-[8px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: vmGold, color: "#050A14" }}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        className="text-[11px] font-medium"
        style={{
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ─── PHASE 1: HERO ────────────────────────────────────────────────
// Cena 01: phone centered-right, dark space bg
const heroCardsGridTop = "33%"; // desce a grade p/ o 1º card esquerdo não tocar o subtítulo
const heroCardsGridBottom = "4%"; // span mantido (~63%) → mesmo respiro vertical entre cards
const heroLeftAlignRight = "30%"; // borda direita dos cards — afastada do celular
const heroRightAlignLeft = "70%"; // borda esquerda dos cards — afastada do celular

type HeroCard = ChipCard & { opacity?: number };

// Ordem do cliente (doc): IA Especializada, CRM Inteligente, Resposta rápida,
// Follow-up, Agenda, Pipeline Visual, Dashboard.
const heroCardsLeft: HeroCard[] = [
  {
    Icon: Bot,
    title: "IA Especializada",
    body: "Uma IA especializada no seu segmento, pronta para auxiliar sua equipe com cada oportunidade.",
    opacity: 0.95,
  },
  {
    Icon: Database,
    title: "CRM Inteligente",
    body: "Leads, histórico e oportunidades organizados em um só lugar.",
    opacity: 0.9,
  },
  {
    Icon: Clock3,
    title: "Resposta Rápida",
    body: "Reduza o tempo entre o primeiro contato e a próxima ação.",
    opacity: 0.96,
  },
];

const heroCardsRight: HeroCard[] = [
  {
    Icon: RefreshCw,
    title: "Follow-up Automático",
    body: "Lembretes e ações para nenhuma oportunidade esfriar.",
    opacity: 0.95,
  },
  {
    Icon: CalendarDays,
    title: "Agenda Integrada",
    body: "Agenda sincronizada com o Google para organizar reuniões, retornos e compromissos sem perder oportunidades.",
    opacity: 0.9,
  },
  {
    Icon: KanbanSquare,
    title: "Pipeline Visual",
    body: "Acompanhe cada negociação do primeiro contato ao fechamento.",
    opacity: 0.9,
  },
  {
    Icon: BarChart3,
    title: "Dashboard",
    body: "Tenha uma visão completa das metas, performance da equipe e das oportunidades em andamento, tudo em tempo real.",
    opacity: 0.95,
  },
];

const heroCardRows: Array<{ left?: HeroCard; right?: HeroCard }> = [
  { right: heroCardsRight[0] },
  { left: heroCardsLeft[0], right: heroCardsRight[1] },
  { left: heroCardsLeft[1], right: heroCardsRight[2] },
  { left: heroCardsLeft[2], right: heroCardsRight[3] },
];

function PhaseHero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const e = easeOutExpo;

  // Scroll-driven exit: Phase 1 exits from scroll 0.13 → 0.20
  const exitP = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);

  // Text block exits upward
  const textExitY  = useTransform(exitP, [0, 1],    [0, -60]);
  const textExitOp = useTransform(exitP, [0, 0.72], [1, 0]);

  // CTA fades slightly behind
  const ctaExitOp  = useTransform(exitP, [0.08, 0.76], [1, 0]);

  // Left cards slide further left
  const leftExitX  = useTransform(exitP, [0.06, 0.9],  [0, -72]);
  const leftExitOp = useTransform(exitP, [0.06, 0.84], [1, 0]);

  // Right cards slide further right
  const rightExitX  = useTransform(exitP, [0,    0.84], [0, 72]);
  const rightExitOp = useTransform(exitP, [0,    0.78], [1, 0]);

  return (
    <motion.div
      key="phase-1"
      initial={phaseEnter}
      animate={phaseVisible}
      exit={phaseExit}
      transition={vmTransition}
      className="absolute inset-0"
    >
      {/* ── TEXT BLOCK — exits upward ── */}
      <motion.div
        className="absolute"
        style={{ top: "4%", left: "6%", maxWidth: "min(38vw, 470px)", y: textExitY, opacity: textExitOp }}
      >
        {/* Logo oficial */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0, ease: e }}
          style={{ marginBottom: 22 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-vendas-mais-oficial-colorido.png"
            alt="Vendas Mais"
            style={{ width: 162, height: "auto", overflow: "hidden" }}
          />
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: 72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.72, delay: 0.08, ease: e }}
          >
            <span className="font-black block" style={{ ...vmTitleWhiteStyle, whiteSpace: "nowrap", ...ts }}>
              Mais vendas
            </span>
          </motion.div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: 72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.72, delay: 0.18, ease: e }}
          >
            <span className="font-black block" style={{ ...vmTitleAccentStyle, whiteSpace: "nowrap", ...ts }}>
              Menos improviso
            </span>
          </motion.div>
        </div>
        <motion.p
          className="mt-5 text-[17px] font-medium leading-relaxed"
          style={{ maxWidth: "min(38vw, 520px)", color: "rgba(255,255,255,0.78)", ...ts }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: e }}
        >
          Uma IA especializada no seu negócio, treinada
          <br />
          para orientar sua equipe, acelerar decisões e
          <br />
          transformar oportunidades em vendas reais.
        </motion.p>
      </motion.div>

      {/* ── ENTRAR BUTTON — top right corner ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "4%", right: "5.8%", opacity: ctaExitOp }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.62, delay: 0.22, ease: e }}
      >
        <VmCtaLink
          label="Entrar"
          href="https://app.iavendasmais.com"
          variant="cyan"
          className="pointer-events-auto"
        />
      </motion.div>

      {/* ── CTA BUTTON — above Follow-up Automático card (col. direita, row 1) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          opacity: ctaExitOp,
          // Alinha com a borda esquerda dos cards da coluna direita
          left: heroRightAlignLeft,
          // A grade de cards vai de top 33% a bottom 4%
          // A primeira row ocupa ~25% da altura da grade → centro ≈ 33% + 0.25*63%/2 ≈ 41%
          // Botão fica acima disso com o mesmo gap dos cards (~10px)
          top: "23%",
          x: rightExitX,
        }}
      >
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0, x: 56, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.62, delay: 0.34, ease: e }}
        >
          <a
            href="#contato"
            className={`cta-interactive cta-pulse rounded-full font-semibold tracking-wide hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(240px, 22vw, 300px)",
              padding: "12px 16px",
              backgroundColor: vmGold,
              color: "#050A14",
              fontSize: 12,
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              boxShadow: "0 0 32px rgba(255,210,69,0.46), 0 0 0 1px rgba(255,210,69,0.40)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = vmGoldLight)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = vmGold)}
            aria-label="Quero vender mais"
          >
            Quero vender mais
          </a>
        </motion.div>
      </motion.div>

      {/* ── FEATURE CARDS — grade 4 linhas (esq. alinha à direita; dir. alinha à esquerda) ── */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: heroCardsGridTop,
          bottom: heroCardsGridBottom,
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
        }}
      >
        {(() => {
          let animIndex = 0;
          return heroCardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              {row.left && (() => {
                const delay = 0.38 + animIndex++ * 0.09;
                return (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      right: `calc(100% - ${heroLeftAlignRight})`,
                      x: leftExitX,
                      opacity: leftExitOp,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -56, y: 20 }}
                      animate={{ opacity: row.left!.opacity ?? 1, x: 0, y: 0 }}
                      transition={{ duration: 0.62, delay, ease: e }}
                    >
                      <FeatureCard {...row.left!} minHeight={104} />
                    </motion.div>
                  </motion.div>
                );
              })()}
              {row.right && (() => {
                const delay = 0.38 + animIndex++ * 0.09;
                return (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: heroRightAlignLeft,
                      x: rightExitX,
                      opacity: rightExitOp,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 56, y: 20 }}
                      animate={{ opacity: row.right!.opacity ?? 1, x: 0, y: 0 }}
                      transition={{ duration: 0.62, delay, ease: e }}
                    >
                      <FeatureCard {...row.right!} minHeight={104} />
                    </motion.div>
                  </motion.div>
                );
              })()}
            </div>
          ));
        })()}
      </div>
    </motion.div>
  );
}

// ─── PHASE 2: PAIN POINTS ─────────────────────────────────────────
// Cena 02: phone tilted left with gold swirl/dashboard. Cards right.
const painPoints: Array<{
  Icon: LucideIcon;
  title: string;
  body: string;
  bold: string;
}> = [
  { Icon: Clock3, title: "ATENDIMENTO LENTO", body: "O lead esfria e fecha com quem respondeu primeiro.", bold: "Tempo de resposta é crucial." },
  { Icon: PhoneCall, title: "FALTA DE FOLLOW-UP", body: "Muitas vendas acontecem no segundo, terceiro ou quinto contato.", bold: "Não desista." },
  { Icon: FolderOpen, title: "FALTA DE ORGANIZAÇÃO", body: "Oportunidades se perdem entre planilhas, WhatsApp e anotações.", bold: "Centralize tudo." },
  { Icon: Target, title: "LEADS NÃO QUALIFICADOS", body: "Abordagem genérica reduz conexão e conversão.", bold: "Qualifique com precisão." },
];

/** Faixa horizontal dos 4 pain cards (fase 2) — título/CTA alinham sem mover os boxes. */
const painCardsBand = { left: "58%", right: "3.2%" } as const;
const painCardsGridStyle = {
  ...painCardsBand,
  gridTemplateColumns: "repeat(4, clamp(118px, 10.2vw, 158px))",
  columnGap: "0.625rem", // gap-2.5
  justifyContent: "end",
} as const;

function PhasePain({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const e = easeOutExpo;

  // Scroll-driven exit: starts fading at 0.20, fully gone by 0.28
  const exitP = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);

  const headlineExitY  = useTransform(exitP, [0, 1],    [0, -60]);
  const headlineExitOp = useTransform(exitP, [0, 0.72], [1, 0]);
  const cardsExitY     = useTransform(exitP, [0.05, 1], [0, -44]);
  const cardsExitOp    = useTransform(exitP, [0.05, 0.88], [1, 0]);
  const ctaExitOp      = useTransform(exitP, [0, 0.55], [1, 0]);

  return (
    <motion.div
      key="phase-2"
      initial={phaseEnter}
      animate={phaseVisible}
      exit={phaseExit}
      transition={vmTransition}
      className="absolute inset-0"
    >
      {/* Headline — grid igual à fileira dos cards: borda esq. = 1º box */}
      <motion.div
        className="absolute grid"
        style={{
          top: "6.3%",
          ...painCardsGridStyle,
          // Alarga a caixa do título p/ a esquerda (cards seguem em 58%) e usa
          // coluna única — evita a quebra em 4 linhas em telas de notebook.
          left: "46%",
          gridTemplateColumns: "1fr",
          y: headlineExitY,
          opacity: headlineExitOp,
        }}
      >
        <motion.h2
          className="font-black text-right"
          style={{
            gridColumn: "1 / -1",
            justifySelf: "end",
            ...vmTitleLineBase,
            fontSize: "clamp(22px, 2.05vw, 40px)",
            color: "#ffffff",
          }}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.68, delay: 0.05, ease: e }}
        >
          Quantos leads sua empresa
          <br />
          deixa de aproveitar
          <br />
          <VmTitleAccent>todos os dias?</VmTitleAccent>
        </motion.h2>
        <motion.p
          className="text-right font-medium"
          style={{
            gridColumn: "1 / -1",
            justifySelf: "end",
            maxWidth: 460,
            marginTop: 16,
            fontSize: "clamp(16px, 1.25vw, 18px)",
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.80)",
            ...ts,
          }}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.68, delay: 0.16, ease: e }}
        >
          Sua empresa pode estar deixando oportunidades valiosas escaparem por
          não contar com um processo estruturado de gestão comercial.
        </motion.p>
      </motion.div>

      {/* Pain cards — 4 boxes estreitos, alinhados à direita (fora do celular) */}
      <motion.div
        className="absolute flex justify-end gap-2.5"
        style={{ top: "39.2%", ...painCardsBand, y: cardsExitY, opacity: cardsExitOp }}
      >
        {painPoints.map((p, index) => (
          <motion.div
            key={p.title}
            className="flex min-h-[194px] flex-[0_0_clamp(118px,10.2vw,158px)] flex-col items-center gap-3 rounded-2xl"
            style={{
              padding: "22px 15px 20px",
              backgroundColor: "rgba(5,10,20,0.68)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(217,154,30,0.58)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.36)",
            }}
            initial={{ opacity: 0, y: 52 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.18 + index * 0.1, ease: e }}
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
              <p.Icon size={23} strokeWidth={1.8} color={vmGold} />
            </div>
            <p className="text-center text-[12px] font-black uppercase leading-tight tracking-wide" style={{ color: "#ffffff", ...ts }}>
              {p.title}
            </p>
            <p className="text-center text-[11.5px] leading-snug" style={{ color: "rgba(255,255,255,0.78)" }}>
              {p.body}{" "}
              <span className="font-bold text-white">{p.bold}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA — scroll-driven exit */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: ctaExitOp }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22, ease: e }}
        >
          <BottomCTA label="Quero converter mais leads" placement="painCardsRight" xl />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── PHASE 3: SOLUTION ────────────────────────────────────────────
// Cena 03: dashboard left + AURA phone right (3D renders). Text left only.
function PhaseSolution({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Scroll-driven exit: fully gone by ~0.39 — well before the video hold at 0.52
  const exitP = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);

  const textExitY  = useTransform(exitP, [0, 1],    [0, -60]);
  const textExitOp = useTransform(exitP, [0, 0.72], [1, 0]);

  return (
    <motion.div
      key="phase-3"
      initial={phaseEnter}
      animate={phaseVisible}
      exit={phaseExit}
      transition={vmTransition}
      className="absolute inset-0"
    >
      {/* Text — left side. Video shows dashboard+AURA on right. */}
      <motion.div className="absolute flex flex-col gap-4" style={{ top: "11%", left: "6.5%", maxWidth: "48%", y: textExitY, opacity: textExitOp }}>
        <h2 className="font-black" style={{ ...vmTitleLineBase, color: "#ffffff" }}>
          <span className="block">Transforme oportunidades</span>
          <span className="block">em vendas com uma</span>
          <span className="block">
            <VmTitleAccent>IA especializada no seu negócio</VmTitleAccent>
          </span>
        </h2>
        <p
          className="text-[18px] font-medium leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)", maxWidth: 690, ...ts }}
        >
          Uma inteligência comercial que aprende o seu mercado, orienta sua
          equipe e organiza todo o processo de vendas em um único lugar.
        </p>
      </motion.div>

    </motion.div>
  );
}

// ─── PHASE 4: PESQUISA / INTELIGÊNCIA DE LEADS ───────────────────
const authorityCards: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  {
    Icon: Globe,
    title: "Pesquisa WEB",
    body: "Encontre informações relevantes sobre empresas, pessoas e serviços para iniciar conversas mais qualificadas.",
  },
  {
    Icon: Camera,
    title: "Pesquisa Instagram",
    body: "Nossa IA analisa o perfil da empresa ou pessoa, identifica posicionamento, conteúdo, diferenciais e oportunidades para personalizar sua abordagem comercial.",
  },
  {
    Icon: Briefcase,
    title: "Pesquisa LinkedIn",
    body: "Descubra tomadores de decisão, conheça a estrutura da empresa e obtenha insights estratégicos para prospectar com mais eficiência.",
  },
];

function AuthorityCompactCard({
  Icon,
  title,
  body,
  index,
  phaseProgress,
}: {
  Icon: LucideIcon;
  title: string;
  body: string;
  index: number;
  phaseProgress: MotionValue<number>;
}) {
  const N = authorityCards.length;
  const t0 = (index / N) * 0.72;
  const t1 = t0 + 0.14;

  const opacity = useTransform(phaseProgress, [t0, t1], [0, 1]);
  const y       = useTransform(phaseProgress, [t0, t1], [28, 0]);

  return (
    <motion.div
      className="flex items-start gap-3 rounded-xl"
      style={{
        opacity,
        y,
        padding: "14px 16px",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        // Fumê com borda amarela (padrão da Fase 2)
        backgroundColor: "rgba(5,10,20,0.68)",
        border: "1px solid rgba(217,154,30,0.58)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.40)",
      }}
    >
      <span
        className="flex flex-shrink-0 items-center justify-center rounded-lg"
        style={{
          width: 34,
          height: 34,
          background: "rgba(45,156,255,0.12)",
          border: "1px solid rgba(45,156,255,0.22)",
        }}
      >
        <Icon size={17} strokeWidth={1.8} color="#2D9CFF" />
      </span>
      <div>
        <p className="text-[13px] font-black leading-tight" style={{ color: "#ffffff" }}>
          {title}
        </p>
        <p className="mt-1 text-[11px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.78)" }}>
          {body}
        </p>
      </div>
    </motion.div>
  );
}

function PhaseAuthority({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const phaseProgress = useTransform(scrollYProgress, [0.53, 0.80], [0, 1]);

  return (
    <motion.div
      key="phase-4"
      initial={phaseEnter}
      animate={phaseVisible}
      exit={phaseExit}
      transition={vmTransition}
      className="absolute inset-0"
    >
      <div className="absolute" style={{ top: "12%", right: "6%", width: "44%" }}>
        <VmTitle as="h2" style={ts}>
          Conheça seus leads antes
          <br />
          mesmo do <VmTitleAccent>primeiro contato</VmTitleAccent>
        </VmTitle>
        <p className="mt-3 max-w-xl text-[17px] font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", ...ts }}>
          Pesquise empresas e pessoas, encontre informações estratégicas e deixe
          nossa IA analisar os dados para gerar abordagens personalizadas e mais
          assertivas, aumentando suas chances de conversão.
        </p>
      </div>

      <div
        className="absolute flex flex-col gap-3"
        style={{ top: "47%", right: "6%", width: "44%" }}
      >
        {authorityCards.map((card, index) => (
          <AuthorityCompactCard
            key={card.title}
            Icon={card.Icon}
            title={card.title}
            body={card.body}
            index={index}
            phaseProgress={phaseProgress}
          />
        ))}
      </div>

    </motion.div>
  );
}

/** Fase 5 — cards mais próximos do celular central (hero = 34% / 65,4%). */
const phase5LeftAlignRight = "39.5%";
const phase5RightAlignLeft = "59.8%";

const phase5Features: Array<
  ChipCard & {
    side: "left" | "right";
    top: string;
  }
> = [
  {
    Icon: Mail,
    title: "Disparo de e-mail e WhatsApp",
    body: "Envie campanhas e comunique-se com clientes de forma rápida e profissional.",
    side: "left",
    top: "22%",
  },
  {
    Icon: Search,
    title: "Buscador de empresas",
    body: "Encontre empresas por região, segmento e atividade em poucos segundos.",
    side: "left",
    top: "38.5%",
  },
  {
    Icon: Users,
    title: "Gestão de equipes",
    body: "Defina metas, acompanhe resultados e gerencie sua equipe com facilidade.",
    side: "left",
    top: "55%",
  },
  {
    Icon: Database,
    title: "CRM Profissional",
    body: "Organize clientes e oportunidades sem perder negociações importantes.",
    side: "left",
    top: "71.5%",
  },
  {
    Icon: Bot,
    title: "IA inteligente",
    body: "IA treinada para o seu negócio com sugestões e estratégias personalizadas.",
    side: "right",
    top: "30%",
  },
  {
    Icon: Megaphone,
    title: "Campanhas de pré-vendas",
    body: "Crie campanhas segmentadas para prospectar com mais eficiência.",
    side: "right",
    top: "46.5%",
  },
  {
    Icon: Share2,
    title: "Redes Sociais",
    body: "Pesquise empresas e obtenha dados estratégicos a partir do Instagram e LinkedIn.",
    side: "right",
    top: "63%",
  },
];

// ─── PHASE 5: TECHNOLOGY / AUTHORITY ─────────────────────────────
// Cena 05: phone centered, features left + right
function PhaseCTA() {
  const e = easeOutExpo;

  return (
    <motion.div
      key="phase-5"
      initial={phaseEnter}
      animate={phaseVisible}
      exit={phaseExit}
      transition={vmTransition}
      className="absolute inset-0"
      id="cta"
    >
      {/* ── TOP: título + subtítulo ── */}
      <motion.div
        className="absolute text-center"
        style={{ top: "3%", left: "5%", right: "5%" }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.05, ease: e }}
      >
        <VmTitle
          as="h2"
          center
          style={{
            maxWidth: "1120px",
            marginLeft: "auto",
            marginRight: "auto",
            ...ts,
          }}
        >
          Mais que um <VmTitleAccent>CRM</VmTitleAccent>
        </VmTitle>
        <p
          className="mx-auto mt-2 text-center font-medium"
          style={{
            maxWidth: 860,
            color: "rgba(255,255,255,0.68)",
            fontSize: "clamp(18px, 1.35vw, 22px)",
            lineHeight: 1.4,
            ...ts,
          }}
        >
          <span className="block">Uma Inteligência Artificial personalizada para o seu segmento,</span>
          <span className="block">capaz de organizar, orientar e impulsionar todo o seu processo de vendas.</span>
        </p>
      </motion.div>

      {phase5Features.map((feature, i) => (
        <motion.div
          key={feature.title}
          className="absolute"
          style={
            feature.side === "left"
              ? {
                  top: feature.top,
                  right: `calc(100% - ${phase5LeftAlignRight})`,
                }
              : {
                  top: feature.top,
                  left: phase5RightAlignLeft,
                }
          }
          initial={{ opacity: 0, x: feature.side === "left" ? -48 : 48, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.62, delay: 0.18 + i * 0.11, ease: e }}
        >
          <FeatureCard Icon={feature.Icon} title={feature.title} body={feature.body} />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: "4.8%" }}
        initial={{ opacity: 0, y: 32, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.46, ease: e }}
      >
        <VmCtaLink label="Agendar demonstração" className="cta-phone-glow" big />
      </motion.div>
    </motion.div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

const mobilePhaseCopy: Record<Phase, {
  tag: string;
  title: string;
  highlight?: string;
  body: string;
  bullets: string[];
  cta?: string;
}> = {
  1: {
    tag: "VENDAS MAIS",
    title: "Mais vendas. Menos improviso",
    body: "CRM, IA e automação comercial para organizar leads, acelerar respostas e transformar oportunidades em vendas reais.",
    bullets: ["CRM inteligente", "IA comercial", "Follow-up automático"],
    cta: "Quero vender mais",
  },
  2: {
    tag: "Diagnóstico",
    title: "Leads bons não podem esfriar",
    highlight: "Resposta rápida",
    body: "O Vendas Mais ajuda sua equipe a priorizar atendimento, follow-up e organização antes que a oportunidade se perca.",
    bullets: ["Atendimento lento", "Falta de follow-up", "Leads sem contexto"],
    cta: "Quero mais vendas",
  },
  3: {
    tag: "Solução",
    title: "Transforme oportunidades em vendas",
    highlight: "IA especializada no seu negócio",
    body: "Uma inteligência comercial que aprende o seu mercado, orienta sua equipe e organiza todo o processo de vendas em um único lugar.",
    bullets: ["Aprende seu mercado", "Orienta a equipe", "Processo único"],
  },
  4: {
    tag: "Pesquisa",
    title: "Conheça seus leads antes do primeiro contato",
    body: "Pesquise empresas e pessoas, encontre informações estratégicas e deixe a IA gerar abordagens personalizadas e mais assertivas.",
    bullets: ["Pesquisa WEB", "Pesquisa Instagram", "Pesquisa LinkedIn"],
  },
  5: {
    tag: "Plataforma",
    title: "Mais que um CRM",
    highlight: "Agende uma demonstração",
    body: "Uma Inteligência Artificial personalizada para o seu segmento, capaz de organizar, orientar e impulsionar todo o seu processo de vendas.",
    bullets: ["IA inteligente", "CRM Profissional", "Campanhas de pré-vendas"],
    cta: "Agendar demonstração",
  },
};

function MobileVMExperience({ scrollYProgress }: VMExperienceProps) {
  const activePhase = useActivePhase(scrollYProgress);
  const copy = mobilePhaseCopy[activePhase];

  return (
    <div className="absolute inset-0 z-10 flex items-end px-5 pb-8 pt-8" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          className="w-full rounded-2xl"
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -36, scale: 0.97, transition: { duration: 0.38, ease: easeInExpo } }}
          transition={vmTransition}
          style={{
            padding: "22px 20px",
            background:
              "linear-gradient(180deg, rgba(5,10,20,0.42) 0%, rgba(5,10,20,0.82) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 22px 58px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <p
            className="text-[11px] font-black uppercase"
            style={{ color: vmGold, letterSpacing: "0.22em", ...ts }}
          >
            {copy.tag}
          </p>
          {activePhase === 1 ? (
            <VmTitle as="h1" className="mt-3" lines={["Mais vendas", "Menos improviso"]} style={ts} />
          ) : (
            <VmTitle as="h1" className="mt-3" style={ts}>
              {copy.title}
            </VmTitle>
          )}
          {copy.highlight && activePhase !== 1 && (
            <p className="mt-2 font-black" style={{ ...vmTitleAccentStyle, fontSize: "clamp(22px, 5vw, 30px)", ...ts }}>
              {copy.highlight}
            </p>
          )}
          <p
            className="mt-4 text-base font-medium leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)", ...ts }}
          >
            {copy.body}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {copy.bullets.map((bullet) => (
              <span
                key={bullet}
                className="rounded-full px-3 py-2 text-[10px] font-black uppercase"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  background: "rgba(255,255,255,0.09)",
                  border: "1px solid rgba(217,154,30,0.30)",
                  letterSpacing: "0.06em",
                }}
              >
                {bullet}
              </span>
            ))}
          </div>
          {copy.cta && (
            <div className="mt-6 flex justify-center">
              <VmCtaLink label={copy.cta} className="max-w-full" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── ORCHESTRATOR ─────────────────────────────────────────────────
export default function VMExperience({ scrollYProgress }: VMExperienceProps) {
  const activePhase = useActivePhase(scrollYProgress);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileVMExperience scrollYProgress={scrollYProgress} />;
  }

  return (
    <div
      className="absolute inset-0 z-10"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {activePhase === 1 && <PhaseHero scrollYProgress={scrollYProgress} />}
        {activePhase === 2 && <PhasePain scrollYProgress={scrollYProgress} />}
        {activePhase === 3 && <PhaseSolution scrollYProgress={scrollYProgress} />}
        {activePhase === 4 && <PhaseAuthority scrollYProgress={scrollYProgress} />}
        {activePhase === 5 && <PhaseCTA />}
      </AnimatePresence>
    </div>
  );
}
