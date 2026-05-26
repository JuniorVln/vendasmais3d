"use client";

import { MotionValue, motion, AnimatePresence, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Clock3,
  Database,
  FolderOpen,
  KanbanSquare,
  Link2,
  PhoneCall,
  RefreshCw,
  Smartphone,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

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
    else if (v < 0.80) setPhase(4);
    else setPhase(5);
  });
  return phase;
}

const enter = { opacity: 0, y: 20 } as const;
const center = { opacity: 1, y: 0 } as const;
const exitUp = { opacity: 0, y: -16, transition: { duration: 0.35 } };
const tx = { duration: 0.5, ease: [0, 0, 0.2, 1] as const };
const ctaButtonStyle: React.CSSProperties = {
  backgroundColor: "#C8941A",
  color: "#050A14",
  boxShadow: "0 0 32px rgba(200,148,26,0.45), 0 0 0 1px rgba(200,148,26,0.40)",
  fontSize: 12,
  letterSpacing: "0.16em",
  padding: "15px 48px",
  textTransform: "uppercase",
};

// Shared text shadow for readability on raw video
const ts: React.CSSProperties = {
  textShadow: "0 2px 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.95)",
};

// ─── Marquee ─────────────────────────────────────────────────────
function Marquee({ pills, bottom = 64 }: { pills: string[]; bottom?: number }) {
  const doubled = [...pills, ...pills];
  return (
    <div className="absolute left-0 right-0 overflow-hidden pointer-events-none" style={{ bottom }}>
      <div className="flex animate-marquee whitespace-nowrap gap-2 px-0">
        {doubled.map((p, i) => (
          <span
            key={i}
            className="rounded-full text-[10px] font-bold uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 24,
              padding: "6px 16px",
              lineHeight: 1,
              color: "rgba(255,255,255,0.92)",
              background:
                "linear-gradient(180deg, rgba(111,91,64,0.90) 0%, rgba(65,54,42,0.92) 100%)",
              border: "1px solid rgba(219,185,115,0.92)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.26), 0 0 8px rgba(210,174,103,0.30)",
              letterSpacing: "0.01em",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Gold CTA button (bottom-center) ─────────────────────────────
function BottomCTA({
  label,
  note,
  compact = false,
  placement = "bottom",
}: {
  label: string;
  note?: string;
  compact?: boolean;
  placement?: "bottom" | "heroTopRight" | "painCardsRight";
}) {
  const isHeroTopRight = placement === "heroTopRight";
  const isPainCardsRight = placement === "painCardsRight";

  return (
    <div
      className="absolute flex flex-col items-center gap-2 pointer-events-none"
      style={
        isHeroTopRight
          ? { top: "12.2%", right: "5.8%" }
          : isPainCardsRight
            ? { top: "79%", right: "5.3%" }
          : { bottom: compact ? 14 : 24, left: 0, right: 0 }
      }
    >
      <a
        href="#cta"
        className="pointer-events-auto font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          ...ctaButtonStyle,
          padding: isHeroTopRight ? "15px 36px" : ctaButtonStyle.padding,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8A820")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8941A")}
        aria-label={label}
      >
        {label.toUpperCase()} ↗
      </a>
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
            style={{ backgroundColor: "#DCA832", color: "#050A14" }}
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
const heroCards: Array<ChipCard & { position: React.CSSProperties; opacity?: number }> = [
  {
    Icon: Database,
    title: "CRM Inteligente",
    body: "Leads, histórico e oportunidades organizados em um só lugar.",
    position: { top: "46.2%", left: "18.8%" },
    opacity: 0.9,
  },
  {
    Icon: Clock3,
    title: "Resposta Rápida",
    body: "Reduza o tempo entre o primeiro contato e a próxima ação.",
    position: { top: "59.2%", left: "13.4%" },
    opacity: 0.96,
  },
  {
    Icon: Bot,
    title: "IA Comercial",
    body: "Sugestões de abordagem com base no perfil e etapa do lead.",
    position: { top: "71.8%", left: "24.2%" },
    opacity: 0.92,
  },
  {
    Icon: RefreshCw,
    title: "Follow-up Automático",
    body: "Lembretes e ações para nenhuma oportunidade esfriar.",
    position: { top: "25.2%", left: "59.4%" },
    opacity: 0.95,
  },
  {
    Icon: KanbanSquare,
    title: "Pipeline Visual",
    body: "Acompanhe cada negociação do primeiro contato ao fechamento.",
    position: { top: "38.8%", left: "65.4%" },
    opacity: 0.9,
  },
  {
    Icon: CalendarDays,
    title: "Agenda Integrada",
    body: "Reuniões, retornos e compromissos comerciais sempre no radar.",
    position: { top: "52.4%", left: "67.5%" },
    opacity: 0.9,
  },
  {
    Icon: BarChart3,
    title: "Dashboard de Gestão",
    body: "Metas, performance e oportunidades em uma visão simples.",
    position: { top: "66.2%", left: "61.8%" },
    opacity: 0.95,
  },
];

const heroMarquee = [
  "INTEGRAÇÃO CRM",
  "PONTUAÇÃO DE LEADS",
  "ROTEIROS DE VENDAS",
  "PAINEL DE PERFORMANCE",
  "AUTOMAÇÃO DE EMAIL",
  "ACADEMIA VENDAS MAIS",
  "INTELIGÊNCIA DE MERCADO",
  "CHATBOT IA",
  "TÉCNICAS DE NEGOCIAÇÃO",
];

function PhaseHero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const e = tx.ease;

  // Scroll-driven exit: Phase 1 exits from scroll 0.13 → 0.20
  const exitP = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);

  // Text block exits upward
  const textExitY  = useTransform(exitP, [0, 1],    [0, -44]);
  const textExitOp = useTransform(exitP, [0, 0.72], [1, 0]);

  // CTA fades slightly behind
  const ctaExitOp  = useTransform(exitP, [0.08, 0.76], [1, 0]);

  // Left cards slide further left
  const leftExitX  = useTransform(exitP, [0.06, 0.9],  [0, -52]);
  const leftExitOp = useTransform(exitP, [0.06, 0.84], [1, 0]);

  // Right cards slide further right
  const rightExitX  = useTransform(exitP, [0,    0.84], [0, 52]);
  const rightExitOp = useTransform(exitP, [0,    0.78], [1, 0]);

  // Marquee fades first
  const marqExitOp = useTransform(exitP, [0, 0.42], [1, 0]);

  return (
    <motion.div
      key="phase-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.08 } }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0"
    >
      {/* ── TEXT BLOCK — exits upward ── */}
      <motion.div
        className="absolute"
        style={{ top: "8.5%", left: "6%", maxWidth: "min(38vw, 470px)", y: textExitY, opacity: textExitOp }}
      >
        {/* Logo oficial */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0, ease: e }}
          style={{ marginBottom: 20 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-vendas-mais-oficial-colorido.png"
            alt="Vendas Mais"
            style={{ height: "clamp(32px, 2.8vw, 46px)", width: "auto" }}
          />
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: 52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: e }}
          >
            <span className="font-black block" style={{ color: "#ffffff", fontSize: "clamp(30px, 2.9vw, 54px)", lineHeight: 1.02, letterSpacing: "-0.025em", whiteSpace: "nowrap", ...ts }}>
              Mais vendas.
            </span>
          </motion.div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: 52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: e }}
          >
            <span className="font-black block" style={{ color: "#2D9CFF", fontSize: "clamp(30px, 2.9vw, 54px)", lineHeight: 1.02, letterSpacing: "-0.025em", whiteSpace: "nowrap", ...ts }}>
              Menos improviso.
            </span>
          </motion.div>
        </div>
        <motion.p
          className="mt-5 text-sm font-medium leading-relaxed"
          style={{ maxWidth: "min(35vw, 480px)", color: "rgba(255,255,255,0.78)", ...ts }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: e }}
        >
          CRM, IA e automação comercial para organizar leads, acelerar respostas e transformar oportunidades em vendas reais.
        </motion.p>
      </motion.div>

      {/* ── CTA BUTTON — scroll exit + timed entrance ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: ctaExitOp }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.22, ease: e }}
        >
          <BottomCTA label="Quero fazer parte" placement="heroTopRight" />
        </motion.div>
      </motion.div>

      {/* ── FEATURE CARDS — entrance from edges, exit back to edges ── */}
      {heroCards.map(({ position, opacity: cardOpacity, ...feature }, index) => {
        const leftPct = parseFloat((position.left as string) ?? "50");
        const isLeft = leftPct < 50;
        return (
          // outer: absolute position + scroll-driven exit
          <motion.div
            key={feature.title}
            className="absolute pointer-events-none"
            style={{ ...position, x: isLeft ? leftExitX : rightExitX, opacity: isLeft ? leftExitOp : rightExitOp }}
          >
            {/* inner: timed entrance only */}
            <motion.div
              initial={{ opacity: 0, x: isLeft ? -36 : 36, y: 8 }}
              animate={{ opacity: cardOpacity ?? 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 + index * 0.09, ease: e }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── MARQUEE — scroll exit (fades first) + timed entrance ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: marqExitOp }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.94 }}
        >
          <Marquee pills={heroMarquee} bottom={56} />
        </motion.div>
      </motion.div>
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
  { Icon: UsersRound, title: "EQUIPE SOBRECARREGADA", body: "Vendedores gastam tempo organizando em vez de vender.", bold: "Libere-os." },
];

function PhasePain({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const e = tx.ease;

  // Scroll-driven exit: starts fading at 0.20, fully gone by 0.28
  const exitP = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);

  const headlineExitY  = useTransform(exitP, [0, 1],    [0, -44]);
  const headlineExitOp = useTransform(exitP, [0, 0.72], [1, 0]);
  const cardsExitY     = useTransform(exitP, [0.05, 1], [0, -28]);
  const cardsExitOp    = useTransform(exitP, [0.05, 0.88], [1, 0]);
  const ctaExitOp      = useTransform(exitP, [0, 0.55], [1, 0]);

  return (
    <motion.div
      key="phase-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={exitUp}
      transition={{ duration: 0.2 }}
      className="absolute inset-0"
    >
      {/* Headline — scroll-driven exit wrapper + entrance animation */}
      <motion.div
        className="absolute"
        style={{ top: "6.3%", right: "4%", maxWidth: "59%", textAlign: "right", y: headlineExitY, opacity: headlineExitOp }}
      >
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: e }}
        >
          <h2
            className="font-black"
            style={{ color: "#ffffff", fontSize: "clamp(34px, 3.45vw, 62px)", lineHeight: 1.08, letterSpacing: "-0.02em", ...ts }}
          >
            Quantos <span style={{ color: "#C8941A" }}>leads</span> sua empresa
            <br />
            deixa de <span style={{ color: "#C8941A" }}>aproveitar</span> todos os
            <br />
            dias?
          </h2>
        </motion.div>
      </motion.div>

      {/* Pain cards — scroll-driven exit wrapper + stagger entrance */}
      <motion.div
        className="absolute grid grid-cols-5 gap-3"
        style={{ top: "39.2%", left: "43.8%", right: "3.2%", y: cardsExitY, opacity: cardsExitOp }}
      >
        {painPoints.map((p, index) => (
          <motion.div
            key={p.title}
            className="flex min-h-[196px] flex-col items-center gap-3 rounded-2xl"
            style={{
              padding: "24px 18px 22px",
              backgroundColor: "rgba(5,10,20,0.68)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(200,148,26,0.58)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.36)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 + index * 0.1, ease: e }}
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
              <p.Icon size={24} strokeWidth={1.8} color="#DCA832" />
            </div>
            <p className="text-center text-[13px] font-black uppercase leading-tight tracking-wide" style={{ color: "#ffffff", ...ts }}>
              {p.title}
            </p>
            <p className="text-center text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.78)" }}>
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
          <BottomCTA label="QUERO MAIS RESULTADOS" placement="painCardsRight" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── PHASE 3: SOLUTION ────────────────────────────────────────────
// Cena 03: dashboard left + AURA phone right (3D renders). Text left only.
function PhaseSolution() {
  return (
    <motion.div
      key="phase-3"
      initial={enter} animate={center}
      exit={exitUp} transition={tx}
      className="absolute inset-0"
    >
      {/* Text — left side. Video shows dashboard+AURA on right. */}
      <div className="absolute flex flex-col gap-4" style={{ top: "7.5%", left: "6.5%", maxWidth: "44%" }}>
        <h2
          className="font-black"
          style={{
            color: "#C8941A",
            fontSize: "clamp(34px, 3.05vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            ...ts,
          }}
        >
          Foi pensando nisso que criamos a
          <br />
          <span style={{ color: "#ffffff" }}>inteligência comercial</span>
          <br />
          do Vendas Mais.
        </h2>
        <p
          className="text-base font-medium leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)", maxWidth: 690, ...ts }}
        >
          Uma plataforma completa que une alta tecnologia com um processo
          comercial eficiente para transformar o dia a dia das suas vendas.
        </p>
      </div>

    </motion.div>
  );
}

// ─── PHASE 4: AUTHORITY — STACKED CARDS ───────────────────────────
const authorityCards = [
  {
    title: "IA especializada",
    body: "Sugestões comerciais pensadas para vendas, não respostas genéricas.",
  },
  {
    title: "CRM estruturado",
    body: "Leads, histórico e etapas do funil organizados em uma rotina clara.",
  },
  {
    title: "Follow-up consistente",
    body: "Acompanhamento no tempo certo para nenhuma oportunidade esfriar.",
  },
  {
    title: "Pipeline visual",
    body: "Visão simples do avanço de cada negociação até o fechamento.",
  },
  {
    title: "Gestão em tempo real",
    body: "Metas, performance e oportunidades sempre visíveis para a equipe.",
  },
  {
    title: "Uso simples no celular",
    body: "Interface pensada para vendedores agirem rápido, inclusive no mobile.",
  },
  {
    title: "Academy e mentorias",
    body: "Conteúdo prático para elevar abordagem, negociação e fechamento.",
  },
  {
    title: "Processo escalável",
    body: "Menos improviso e mais previsibilidade para vender todos os dias.",
  },
];

function AuthorityStackCard({
  index,
  total,
  phaseProgress,
  title,
  body,
}: {
  index: number;
  total: number;
  phaseProgress: MotionValue<number>;
  title: string;
  body: string;
}) {
  const N = total;
  const compactGap = 32;  // px entre cards empilhados
  const cardH = 112;       // min-height do card
  const readingPad = 20;   // gap entre a pilha e o card em leitura

  // Cada card tem um "slot" de scroll para entrar e ser lido
  const slotSize = 0.88 / N;                         // ~0.11 por card
  const enterStart = index * slotSize;
  const readingStart = enterStart + slotSize * 0.4;  // card chega na posição de leitura
  const exitStart = index < N - 1 ? (index + 1) * slotSize : 0.88; // próximo card entra
  const exitDone = Math.min(exitStart + slotSize * 0.4, 0.94);      // card está empilhado

  // Posição de leitura: card 0 fica no topo; demais ficam logo abaixo da pilha atual
  const compactY = index * compactGap;
  const readingY = index === 0
    ? 0
    : (index - 1) * compactGap + cardH + readingPad;

  // Card entra vindo de baixo → posição de leitura → sobe para a pilha
  const y = useTransform(
    phaseProgress,
    [enterStart, readingStart, exitStart, exitDone, 1],
    [readingY + 68, readingY, readingY, compactY, compactY],
  );

  const opacity = useTransform(
    phaseProgress,
    [Math.max(0, enterStart - 0.01), readingStart, 1],
    [0, 1, 1],
  );

  const scale = useTransform(
    phaseProgress,
    [0, exitStart, exitDone, 1],
    [1, 1, 1 - index * 0.010, 1 - index * 0.010],
  );

  const x = useTransform(
    phaseProgress,
    [0, exitStart, exitDone, 1],
    [0, 0, index * 2, index * 2],
  );

  return (
    <motion.div
      className="absolute left-0 right-0 rounded-2xl"
      style={{
        y,
        x,
        scale,
        opacity,
        zIndex: index + 1,
        minHeight: 112,
        padding: "22px 26px 22px 104px",
        backgroundColor: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.20)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 18px 42px rgba(0,0,0,0.28)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute left-8 top-1/2 -translate-y-1/2 font-black italic leading-none"
        style={{ color: "rgba(45,156,255,0.16)", fontSize: 78 }}
      >
        {index + 1}
      </span>
      <h3 className="text-xl font-black leading-tight" style={{ color: "#ffffff", ...ts }}>
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
        {body}
      </p>
    </motion.div>
  );
}

function PhaseAuthority({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const phaseProgress = useTransform(scrollYProgress, [0.53, 0.80], [0, 1]);

  return (
    <motion.div
      key="phase-4"
      initial={enter} animate={center}
      exit={exitUp} transition={tx}
      className="absolute inset-0"
    >
      <div className="absolute" style={{ top: "7%", right: "6%", width: "44%" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2D9CFF", ...ts }}>
          AUTORIDADE
        </p>
        <h2
          className="font-black leading-tight"
          style={{
            color: "#ffffff",
            fontSize: "clamp(36px, 3.2vw, 58px)",
            letterSpacing: "-0.02em",
            ...ts,
          }}
        >
          Processo para <span style={{ color: "#C8941A" }}>vender mais.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", ...ts }}>
          IA, CRM e acompanhamento em uma rotina simples para tirar vendas do improviso.
        </p>
      </div>

      <div className="absolute" style={{ top: "34%", right: "6%", width: "44%", height: "62%" }}>
        {authorityCards.map((card, index) => (
          <AuthorityStackCard
            key={card.title}
            index={index}
            total={authorityCards.length}
            phaseProgress={phaseProgress}
            title={card.title}
            body={card.body}
          />
        ))}
      </div>

    </motion.div>
  );
}

const phase5Features: Array<{
  Icon: LucideIcon;
  before?: string;
  highlight: string;
  after?: string;
  side: "left" | "right";
  position: React.CSSProperties;
}> = [
  {
    Icon: Bot,
    highlight: "IA especializada",
    after: " para vendas, não uma IA genérica.",
    side: "left",
    position: { top: "31%", left: "5.4%", width: "32%" },
  },
  {
    Icon: Database,
    highlight: "CRM estruturado",
    after: " para a rotina comercial real.",
    side: "left",
    position: { top: "43.5%", left: "8.4%", width: "29%" },
  },
  {
    Icon: Link2,
    before: "Processo de ",
    highlight: "acompanhamento",
    after: " integrado.",
    side: "left",
    position: { top: "57%", left: "11.3%", width: "26%" },
  },
  {
    Icon: BarChart3,
    highlight: "Visão de gestão",
    after: " para equipes, metas e performance.",
    side: "right",
    position: { top: "35%", right: "7.5%", width: "30%" },
  },
  {
    Icon: Smartphone,
    before: "Plataforma pensada para ",
    highlight: "uso simples",
    after: ", inclusive no celular.",
    side: "right",
    position: { top: "49.5%", right: "7.5%", width: "30%" },
  },
];

// ─── Phase 5 feature item ─────────────────────────────────────────
function Phase5Feature({
  Icon,
  before,
  highlight,
  after,
  side,
}: {
  Icon: LucideIcon;
  before?: string;
  highlight: string;
  after?: string;
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  return (
    <div
      className="flex items-center gap-5"
      style={{ flexDirection: isLeft ? "row-reverse" : "row" }}
    >
      <span
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          background: "rgba(74,61,43,0.72)",
          border: "1px solid rgba(221,184,112,0.62)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 0 24px rgba(200,148,26,0.24)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <Icon size={24} strokeWidth={1.65} color="#D8B06B" />
      </span>
      <p
        className="font-semibold leading-tight"
        style={{
          color: "rgba(255,255,255,0.86)",
          textAlign: isLeft ? "right" : "left",
          fontSize: "clamp(14px, 1.08vw, 20px)",
          maxWidth: isLeft ? 360 : 390,
          ...ts,
        }}
      >
        {before}
        <span style={{ color: "#9DBBDF" }}>{highlight}</span>
        {after}
      </p>
    </div>
  );
}

// ─── PHASE 5: TECHNOLOGY / AUTHORITY ─────────────────────────────
// Cena 05: phone centered, features left + right
function PhaseCTA() {
  const e = tx.ease;

  return (
    <motion.div
      key="phase-5"
      initial={enter} animate={center}
      exit={exitUp} transition={tx}
      className="absolute inset-0"
      id="cta"
    >
      {/* ── TOP: labels + headline + subtitle ── */}
      <motion.div
        className="absolute"
        style={{ top: "5.8%", left: "5%", right: "5%" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: e }}
      >
        <h2
          className="font-black text-center"
          style={{
            color: "#ffffff",
            fontSize: "clamp(30px, 2.75vw, 50px)",
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            maxWidth: "1120px",
            marginLeft: "auto",
            marginRight: "auto",
            ...ts,
          }}
        >
          Tecnologia aplicada ao que realmente faz uma empresa{" "}
          <span style={{ color: "#C8941A" }}>vender mais.</span>
        </h2>
      </motion.div>

      {phase5Features.map((feature, i) => (
          <motion.div
            key={feature.highlight}
            className="absolute"
            style={feature.position}
            initial={{ opacity: 0, x: feature.side === "left" ? -28 : 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.18 + i * 0.11, ease: e }}
          >
            <Phase5Feature
              Icon={feature.Icon}
              before={feature.before}
              highlight={feature.highlight}
              after={feature.after}
              side={feature.side}
            />
          </motion.div>
      ))}

      <motion.p
        className="absolute left-[5%] right-[5%] text-center font-medium leading-relaxed"
        style={{
          bottom: "5.4%",
          color: "rgba(255,255,255,0.68)",
          fontSize: "clamp(13px, 0.95vw, 16px)",
          ...ts,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: e }}
      >
        Vender não é sorte. É processo, consistência e acompanhamento.
        <br />O Vendas Mais transforma esses três pilares em sistema.
      </motion.p>
    </motion.div>
  );
}

// ─── ORCHESTRATOR ─────────────────────────────────────────────────
export default function VMExperience({ scrollYProgress }: VMExperienceProps) {
  const activePhase = useActivePhase(scrollYProgress);

  return (
    <div
      className="absolute inset-0 z-10"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {activePhase === 1 && <PhaseHero scrollYProgress={scrollYProgress} />}
        {activePhase === 2 && <PhasePain scrollYProgress={scrollYProgress} />}
        {activePhase === 3 && <PhaseSolution />}
        {activePhase === 4 && <PhaseAuthority scrollYProgress={scrollYProgress} />}
        {activePhase === 5 && <PhaseCTA />}
      </AnimatePresence>
    </div>
  );
}
