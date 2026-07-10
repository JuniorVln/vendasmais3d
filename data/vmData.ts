// Update TOTAL_FRAMES after running: npm run extract-frames
// Frames extraídos de "video final.mp4" (3840x2160 → escala 1920w), 30fps, 604 frames (0000–0603).
export const TOTAL_FRAMES = 604;
export const FRAMES_PATH = "/frames";
// Use the checked-in video by default. Run npm run encode-scroll if a keyframe-per-frame file is needed later.
export const VIDEO_SCROLL_PATH = "/videos/vm-scroll.mp4";
// Original video — fallback when vm-scroll.mp4 hasn't been encoded yet
export const VIDEO_FALLBACK_PATH = "/videos/vm-sequence.mp4";

export interface PainPoint {
  icon: string;
  title: string;
  body: string;
  bold: string;
}

export interface Feature {
  icon: string;
  text: string;
}

export const heroData = {
  tag: "PLATAFORMA COMPLETA",
  headline: "Mais vendas",
  headlineHighlight: "Menos improviso",
  subline:
    "CRM, IA e automação comercial para organizar leads, acelerar respostas e transformar oportunidades em vendas reais.",
  cta: "Quero fazer parte →",
};

export const painPointsData: PainPoint[] = [
  {
    icon: "⏱",
    title: "ATENDIMENTO LENTO",
    body: "O lead esfria e fecha com quem respondeu primeiro.",
    bold: "Tempo de resposta é crucial.",
  },
  {
    icon: "📞",
    title: "FALTA DE FOLLOW-UP",
    body: "Muitas vendas acontecem no segundo, terceiro ou quinto contato.",
    bold: "Não desista.",
  },
  {
    icon: "📁",
    title: "FALTA DE ORGANIZAÇÃO",
    body: "Oportunidades se perdem entre planilhas, WhatsApp e anotações.",
    bold: "Centralize tudo.",
  },
  {
    icon: "🎯",
    title: "LEADS NÃO QUALIFICADOS",
    body: "Abordagem genérica reduz conexão e conversão.",
    bold: "Qualifique com precisão.",
  },
];

export const solutionData = {
  headline: "Foi pensando nisso que criamos a ",
  headlineHighlight: "inteligência comercial",
  headlineSuffix: " do Vendas Mais",
  sub: "Uma plataforma completa que une alta tecnologia com um processo comercial eficiente para transformar o dia a dia das suas vendas.",
  aura: {
    headerLabel: "AURA — Inteligência Comercial",
    subLabel: "Alí — Inteligência Comercial",
    sectionTitle: "PRÓXIMA AÇÃO SUGERIDA PARA O LEAD:",
    action1:
      "1. Enviar mensagem de follow-up via WhatsApp sobre o orçamento de ontem (Serial 5).",
    action1Btn: "Enviar",
    action2:
      "2. Atualizar status para 'Em Negociação' e definir lembrete para 48h.",
    action2Btn: "Executar",
    insight:
      "AI Insights: Alta probabilidade de conversão se respondido rápido.",
  },
};

export const authorityData = {
  tag: "AUTORIDADE",
  headline: "Tecnologia aplicada ao que realmente faz uma empresa ",
  headlineHighlight: "vender mais",
  sub: "Vender não é sorte. É processo, consistência e acompanhamento. O Vendas Mais transforma esses três pilares em sistema.",
  features: [
    { icon: "🤖", text: "IA especializada para vendas, não uma IA genérica." },
    { icon: "🗄", text: "CRM estruturado para a rotina comercial real." },
    { icon: "🔗", text: "Processo de acompanhamento integrado." },
    { icon: "📊", text: "Visão de gestão para equipes, metas e performance." },
    { icon: "📱", text: "Plataforma pensada para uso simples, inclusive no celular." },
    { icon: "🎓", text: "VM+ Academy — treinamentos e mentorias exclusivas." },
  ] as Feature[],
};

export const ctaData = {
  headline: "Pronto para transformar suas vendas?",
  sub: "Junte-se a centenas de empresas que já vendem mais com inteligência artificial.",
  primaryCta: "QUERO FAZER PARTE →",
  secondaryCta: "Falar com um especialista",
};

export const navData = {
  cta: "QUERO FAZER PARTE",
};

export const socialProofData = {
  heading: "Resultados que falam por si",
  stats: [
    { stat: "+130", label: "Estratégias validadas" },
    { stat: "24/7", label: "AURA IA disponível" },
    { stat: "CRM", label: "Integrado ao seu processo" },
  ],
  sub: "Empresas que usam o Vendas Mais fecham mais rápido.",
};

export type BillingPeriod = "mensal" | "trimestral" | "semestral" | "anual";

export const billingPeriods: Array<{ id: BillingPeriod; label: string }> = [
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral" },
  { id: "semestral", label: "Semestral" },
  { id: "anual", label: "Anual" },
];

/** Preços base mensais (sem desconto). */
const PLAN_BASE_PRICES = {
  basico: 97,
  essencial: 297,
  profissional: 497,
} as const;

/** Desconto aplicado sobre o valor mensal por período. */
const PERIOD_DISCOUNT: Record<BillingPeriod, number> = {
  mensal: 0,
  trimestral: 0.2,
  semestral: 0.3,
  anual: 0.4,
};

const PERIOD_MONTHS: Record<BillingPeriod, number> = {
  mensal: 1,
  trimestral: 3,
  semestral: 6,
  anual: 12,
};

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getPlanPricing(
  planKey: keyof typeof PLAN_BASE_PRICES,
  period: BillingPeriod,
) {
  const base = PLAN_BASE_PRICES[planKey];
  const discount = PERIOD_DISCOUNT[period];
  const monthly = Math.round(base * (1 - discount) * 100) / 100;
  const months = PERIOD_MONTHS[period];
  const total = Math.round(monthly * months * 100) / 100;

  return {
    baseMonthly: base,
    monthly,
    total,
    discountPercent: Math.round(discount * 100),
    baseLabel: formatBRL(base),
    monthlyLabel: formatBRL(monthly),
    totalLabel: formatBRL(total),
    showStrike: discount > 0,
    showTotal: period === "semestral" || period === "anual",
  };
}

export type PlanFeature = { text: string; included: boolean };

export const plansData = {
  heading: "Planos pensados para vender mais",
  sub: "Pagamento recorrente no cartão. Você escolhe o que faz sentido agora.",
  guarantees: [
    "Teste grátis por 15 dias",
    "Cancele quando quiser",
    "Sem burocracia",
  ],
  bottomCta: "Comece hoje e leve seu negócio para o próximo nível",
  plans: [
    {
      key: "basico" as const,
      name: "Básico",
      tagline: "Organize suas vendas",
      cta: "Começar grátis",
      highlight: false,
      accent: "#22C55E",
      features: [
        { text: "Quantidade de acessos: 1 usuário", included: true },
        { text: "IA inteligente (treinada para seu negócio) — 300 interações", included: true },
        { text: "Disparos de até 1000 e-mails por mês", included: true },
        { text: "Pesquisas (web, Instagram, LinkedIn) — 50 por mês", included: true },
        { text: "Dashboard, Estoque, IA, CRM, Campanhas, Financeiro", included: true },
        { text: "Prompts prontos", included: true },
        { text: "CRM Básico (120 leads)", included: true },
        { text: "Funil de vendas", included: true },
        { text: "Gestão de leads por Kanban", included: true },
        { text: "Registro de negociações", included: true },
        { text: "Lembretes de follow-up", included: true },
        { text: "IA para Dica do dia", included: true },
        { text: "Acesso via app e web", included: true },
        { text: "Agenda integrada — Google", included: false },
        { text: "Relatórios avançados", included: false },
        { text: "Integração com WhatsApp", included: false },
        { text: "Pesquisas avançadas", included: false },
        { text: "IA para lembretes inteligentes", included: false },
      ] satisfies PlanFeature[],
    },
    {
      key: "essencial" as const,
      name: "Essencial",
      tagline: "Venda mais com inteligência",
      cta: "Testar grátis agora",
      highlight: true,
      badge: "Mais escolhido",
      accent: "#A855F7",
      features: [
        { text: "Quantidade de acessos: 3 usuários", included: true },
        { text: "IA inteligente (treinada para seu negócio) — 900 interações", included: true },
        { text: "Disparos de até 3000 e-mails por mês", included: true },
        { text: "Pesquisas (web, Instagram, LinkedIn) — 80 por mês", included: true },
        { text: "Campanhas, CRM, Dashboard, Estoque, Financeiro, Google Agenda", included: true },
        { text: "Tudo do Básico", included: true },
        { text: "Gestão de equipe (Dashboard/Vendas/Interações)", included: true },
        { text: "CRM avançado ilimitado", included: true },
        { text: "Segmentação de clientes por grupos", included: true },
        { text: "Sugestões de ações de vendas", included: true },
        { text: "Pesquisa avançada nas redes sociais", included: true },
        { text: "Pesquisa avançada em sites — Benchmarking", included: true },
        { text: "Relatórios de desempenho", included: true },
        { text: "Ranking de vendedores", included: true },
        { text: "Automação de follow-ups", included: false },
        { text: "Disparos de mensagens via WhatsApp", included: false },
        { text: "Interação com a IA por comando de voz", included: false },
        { text: "Envio de áudio para a IA", included: false },
      ] satisfies PlanFeature[],
    },
    {
      key: "profissional" as const,
      name: "Profissional",
      tagline: "Escalone suas vendas com IA",
      cta: "Quero vender mais",
      highlight: false,
      accent: "#EF4444",
      features: [
        { text: "Quantidade de acessos: 5 usuários", included: true },
        { text: "IA inteligente (treinada para seu negócio) — 1200 interações", included: true },
        { text: "Disparos de até 5000 e-mails por mês", included: true },
        { text: "Pesquisas (web, Instagram, LinkedIn) — 250 por mês", included: true },
        { text: "Campanhas, CRM, Dashboard, Estoque, Financeiro, Google Agenda", included: true },
        { text: "Tudo do Essencial", included: true },
        { text: "IA avançada (Mkt)", included: true },
        { text: "Automação de follow-ups", included: true },
        { text: "Disparos de mensagens via WhatsApp", included: true },
        { text: "Interação com a IA por comando de voz", included: true },
        { text: "Buscador de empresas", included: true },
        { text: "Relatórios avançados", included: true },
      ] satisfies PlanFeature[],
    },
  ],
};

export const footerData = {
  tagline: "ia · vendas mais",
  links: ["Sobre", "Planos", "Academy", "Contato"],
  legal: ["Política de Privacidade", "Termos de Uso"],
  copyright: "© 2025 Vendas Mais. Todos os direitos reservados.",
};
