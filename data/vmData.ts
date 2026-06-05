// Update TOTAL_FRAMES after running: npm run extract-frames
export const TOTAL_FRAMES = 575;
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

export const plansData = {
  heading: "Planos para cada momento comercial",
  sub: "Compare os caminhos e fale com um especialista para montar a melhor configuração.",
  plans: [
    {
      name: "STARTER",
      price: "Para começar com processo",
      features: ["Acesso à plataforma", "CRM integrado", "Rotina básica de follow-up"],
      cta: "Consultar plano",
      highlight: false,
    },
    {
      name: "PRO",
      price: "Para acelerar vendas com IA",
      features: [
        "Tudo do Starter",
        "IA comercial avançada",
        "Workflows de acompanhamento",
        "VM+ Academy",
        "Suporte prioritário",
      ],
      cta: "Conhecer o Pro",
      highlight: true,
      badge: "MAIS INDICADO",
    },
    {
      name: "ENTERPRISE",
      price: "Para operações com múltiplas equipes",
      features: [
        "Tudo do Pro",
        "Multi-equipe",
        "Onboarding dedicado",
        "Integrações customizadas",
        "SLA garantido",
      ],
      cta: "Falar com especialista",
      highlight: false,
    },
  ],
};

export const footerData = {
  tagline: "ia · vendas mais",
  links: ["Sobre", "Planos", "Academy", "Contato"],
  legal: ["Política de Privacidade", "Termos de Uso"],
  copyright: "© 2025 Vendas Mais. Todos os direitos reservados.",
};
