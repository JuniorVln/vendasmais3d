"use client";

import { MotionValue, motion, AnimatePresence, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Clock3,
  Database,
  FolderOpen,
  GraduationCap,
  KanbanSquare,
  Link2,
  PhoneCall,
  RefreshCw,
  Smartphone,
  Target,
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

/** CTAs do scroll — mesma altura; largura proporcional ao texto (hero = referência). */
const vmCtaButtonStyle: React.CSSProperties = {
  backgroundColor: vmGold,
  color: "#050A14",
  boxShadow: "0 0 32px rgba(255,210,69,0.46), 0 0 0 1px rgba(255,210,69,0.40)",
  fontSize: 11,
  letterSpacing: "0.06em",
  padding: "10px 26px",
  lineHeight: 1.2,
  textTransform: "none",
  whiteSpace: "nowrap",
};

function VmCtaLink({
  label,
  href = "#contato",
  className = "",
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`pointer-events-auto rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      style={vmCtaButtonStyle}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = vmGoldLight)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = vmGold)}
      aria-label={label}
    >
      {label} ↗
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
}: {
  label: string;
  note?: string;
  compact?: boolean;
  placement?: "bottom" | "heroTopRight" | "painCardsRight";
  href?: string;
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
      <VmCtaLink label={label} href={href} />
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
function FeatureCard({ Icon, title, body, badge }: ChipCard) {
  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        width: "clamp(220px, 20vw, 270px)",
        padding: "10px 13px",
        gap: 7,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(255,255,255,0.105)",
        border: "1px solid rgba(232,198,126,0.36)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.36), 0 0 18px rgba(220,168,50,0.05)",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={13} strokeWidth={2} color="#2D9CFF" className="flex-shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#ffffff" }}>
          {title}
        </span>
        {badge && (
          <span
            className="text-[7px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: vmGold, color: "#050A14" }}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        className="text-[9px] font-medium"
        style={{
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.25,
          display: "-webkit-box",
          WebkitLineClamp: 2,
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
const heroCardsGridTop = "39.5%";
const heroCardsGridBottom = "13%"; // base dos cards alinhada à parte inferior do celular
const heroLeftAlignRight = "34%"; // borda direita dos cards (linha vermelha)
const heroRightAlignLeft = "65.4%"; // borda esquerda dos cards (Pipeline Visual)

type HeroCard = ChipCard & { opacity?: number };

const heroCardsLeft: HeroCard[] = [
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
  {
    Icon: Bot,
    title: "IA Comercial",
    body: "Sugestões de abordagem com base no perfil e etapa do lead.",
    opacity: 0.92,
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
    Icon: KanbanSquare,
    title: "Pipeline Visual",
    body: "Acompanhe cada negociação do primeiro contato ao fechamento.",
    opacity: 0.9,
  },
  {
    Icon: CalendarDays,
    title: "Agenda Integrada",
    body: "Reuniões, retornos e compromissos comerciais sempre no radar.",
    opacity: 0.9,
  },
  {
    Icon: BarChart3,
    title: "Dashboard de Gestão",
    body: "Metas, performance e oportunidades em uma visão simples.",
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
        style={{ top: "8.5%", left: "6%", maxWidth: "min(38vw, 470px)", y: textExitY, opacity: textExitOp }}
      >
        {/* Logo oficial */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0, ease: e }}
          style={{ marginBottom: 32 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-vendas-mais-oficial-colorido.png"
            alt="Vendas Mais"
            style={{ width: 130, height: "auto", overflow: "hidden" }}
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
          className="mt-5 text-sm font-medium leading-relaxed"
          style={{ maxWidth: "min(35vw, 480px)", color: "rgba(255,255,255,0.78)", ...ts }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: e }}
        >
          CRM, IA e automação comercial para organizar
          <br />
          leads, acelerar respostas e transformar
          <br />
          oportunidades em vendas reais.
        </motion.p>
      </motion.div>

      {/* ── CTA BUTTON — scroll exit + timed entrance ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: ctaExitOp }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.62, delay: 0.22, ease: e }}
        >
          <BottomCTA label="Quero vender mais" placement="heroTopRight" />
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
                      <FeatureCard {...row.left!} />
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
                      <FeatureCard {...row.right!} />
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
          y: headlineExitY,
          opacity: headlineExitOp,
        }}
      >
        <motion.h2
          className="font-black text-left"
          style={{
            gridColumn: "1 / -1",
            justifySelf: "start",
            ...vmTitleLineBase,
            color: "#ffffff",
            ...ts,
          }}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.68, delay: 0.05, ease: e }}
        >
          Quantos leads sua
          <br />
          empresa deixa de
          <br />
          <VmTitleAccent>aproveitar todos os dias?</VmTitleAccent>
        </motion.h2>
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
          <BottomCTA label="Quero mais vendas" placement="painCardsRight" />
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
      <motion.div className="absolute flex flex-col gap-4" style={{ top: "7.5%", left: "6.5%", maxWidth: "44%", y: textExitY, opacity: textExitOp }}>
        <h2 className="font-black" style={{ ...vmTitleLineBase, color: "#ffffff", ...ts }}>
          <span className="block" style={{ whiteSpace: "nowrap" }}>
            Foi pensando nisso que
          </span>
          <span className="block" style={{ whiteSpace: "nowrap" }}>
            criamos a inteligência comercial
          </span>
          <span className="block" style={{ whiteSpace: "nowrap" }}>
            <VmTitleAccent>do Vendas Mais</VmTitleAccent>
          </span>
        </h2>
        <p
          className="text-base font-medium leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)", maxWidth: 690, ...ts }}
        >
          Uma plataforma completa que une alta tecnologia com um processo
          comercial eficiente para transformar o dia a dia das suas vendas.
        </p>
      </motion.div>

    </motion.div>
  );
}

// ─── PHASE 4: AUTHORITY — SEQUENTIAL GRID ────────────────────────
const authorityCards: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  { Icon: Bot,          title: "IA especializada",      body: "Sugestões comerciais pensadas para vendas, não respostas genéricas." },
  { Icon: Database,     title: "CRM estruturado",       body: "Leads, histórico e etapas do funil organizados em uma rotina clara." },
  { Icon: RefreshCw,    title: "Follow-up consistente", body: "Acompanhamento no tempo certo para nenhuma oportunidade esfriar." },
  { Icon: KanbanSquare, title: "Pipeline visual",       body: "Visão simples do avanço de cada negociação até o fechamento." },
  { Icon: BarChart3,    title: "Gestão em tempo real",  body: "Metas, performance e oportunidades sempre visíveis para a equipe." },
  { Icon: Smartphone,   title: "Uso simples no celular",body: "Interface pensada para vendedores agirem rápido, inclusive no mobile." },
  { Icon: GraduationCap,title: "Academy e mentorias",  body: "Conteúdo prático para elevar abordagem, negociação e fechamento." },
  { Icon: Target,       title: "Processo escalável",    body: "Menos improviso e mais previsibilidade para vender todos os dias." },
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
      className="flex items-start gap-2.5 rounded-xl"
      style={{
        opacity,
        y,
        padding: "10px 12px",
        backgroundColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.22)",
      }}
    >
      <span
        className="flex flex-shrink-0 items-center justify-center rounded-lg"
        style={{
          width: 30,
          height: 30,
          background: "rgba(45,156,255,0.12)",
          border: "1px solid rgba(45,156,255,0.22)",
        }}
      >
        <Icon size={14} strokeWidth={1.8} color="#2D9CFF" />
      </span>
      <div>
        <p className="text-[11px] font-black leading-tight" style={{ color: "#ffffff" }}>
          {title}
        </p>
        <p className="mt-0.5 text-[10px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.58)" }}>
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
      <div className="absolute" style={{ top: "13%", right: "6%", width: "44%" }}>
        <VmTitle as="h2" style={ts}>
          Processo para
          <br />
          <VmTitleAccent>vender mais</VmTitleAccent>
        </VmTitle>
        <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", ...ts }}>
          IA, CRM e acompanhamento em uma rotina simples
          <br />
          para tirar vendas do improviso.
        </p>
      </div>

      <div
        className="absolute grid grid-cols-2 gap-2"
        style={{ top: "38%", right: "6%", width: "44%" }}
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
    Icon: Bot,
    title: "IA especializada",
    body: "Para vendas, não uma IA genérica.",
    side: "left",
    top: "31%",
  },
  {
    Icon: Database,
    title: "CRM estruturado",
    body: "Para a rotina comercial real.",
    side: "left",
    top: "43.5%",
  },
  {
    Icon: Link2,
    title: "Acompanhamento integrado",
    body: "Processo conectado na rotina comercial.",
    side: "left",
    top: "57%",
  },
  {
    Icon: BarChart3,
    title: "Visão de gestão",
    body: "Para equipes, metas e performance.",
    side: "right",
    top: "35%",
  },
  {
    Icon: Smartphone,
    title: "Uso simples",
    body: "Plataforma pensada para o celular e o dia a dia.",
    side: "right",
    top: "49.5%",
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
        style={{ top: "5.8%", left: "5%", right: "5%" }}
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
          Tecnologia aplicada para <VmTitleAccent>vender mais</VmTitleAccent>
        </VmTitle>
        <p
          className="mx-auto mt-4 font-medium"
          style={{
            maxWidth: "min(96vw, 1280px)",
            color: "rgba(255,255,255,0.68)",
            fontSize: "clamp(13px, 0.95vw, 16px)",
            whiteSpace: "nowrap",
            ...ts,
          }}
        >
          Vender não é sorte. É processo, consistência e acompanhamento. O Vendas Mais transforma esses três pilares em sistema.
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
        <VmCtaLink label="Agendar demonstração" className="cta-phone-glow" />
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
    title: "Inteligência comercial aplicada à rotina",
    body: "Uma plataforma completa para transformar processo comercial em execução simples no dia a dia.",
    bullets: ["Processo claro", "Dados centralizados", "Ações sugeridas"],
  },
  4: {
    tag: "Autoridade",
    title: "Processo para vender mais",
    body: "IA, CRM, pipeline visual e gestão em tempo real para reduzir improviso e ganhar previsibilidade.",
    bullets: ["Pipeline visual", "Gestão em tempo real", "Academy e mentorias"],
  },
  5: {
    tag: "Demonstração",
    title: "Tecnologia aplicada para vender mais",
    highlight: "Agende uma demonstração",
    body: "Processo, consistência e acompanhamento transformados em sistema comercial.",
    bullets: ["Uso simples no celular", "IA especializada", "CRM estruturado"],
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
            className="mt-4 text-sm font-medium leading-relaxed"
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
