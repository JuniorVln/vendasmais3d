// Dados de contato compartilhados (WhatsApp / e-mail / links de app).
// Centralizado para todos os CTAs usarem a mesma fonte.

export const WHATSAPP_NUMBER = "5551991387792";

export const WHATSAPP_BASE_MSG =
  "Olá, gostaria de agendar uma apresentação do sistema IA do Vendas Mais!";

// Mensagem genérica para os botões verdes de WhatsApp espalhados na página.
export const WHATSAPP_LEAD_MSG =
  "Olá, quero vender mais com a IA do Vendas Mais. Pode me ajudar?";

export const CONTACT_EMAIL = "contato@iavendasmais.com";

// Acesso à plataforma (botão "Entrar" / início de cadastro).
export const APP_AUTH_URL = "https://app.iavendasmais.com/auth";

/** Monta a URL do WhatsApp (wa.me) com uma mensagem opcional. */
export function whatsappUrl(message: string = WHATSAPP_LEAD_MSG): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
