"use client";

import {
  CalendarClock,
  Check,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  billingPeriods,
  getPlanPricing,
  plansData,
  type BillingPeriod,
} from "@/data/vmData";
import {
  WHATSAPP_BASE_MSG,
  WHATSAPP_NUMBER,
} from "@/lib/contact";

// ─── Contexto global dos popups ─────────────────────────────────
type LeadMode = "agendar" | "planos";

interface LeadModalContextValue {
  /** Abre o popup de captação no modo "Agendar horário" (→ WhatsApp). */
  openAgendar: () => void;
  /** Abre o popup de captação no modo "Começar agora" (→ popup de planos). */
  openPlans: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal precisa estar dentro de <LeadModalProvider>");
  }
  return ctx;
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [leadMode, setLeadMode] = useState<LeadMode | null>(null);
  const [plansOpen, setPlansOpen] = useState(false);

  const openAgendar = useCallback(() => setLeadMode("agendar"), []);
  const openPlans = useCallback(() => setLeadMode("planos"), []);

  const value = useMemo<LeadModalContextValue>(
    () => ({ openAgendar, openPlans }),
    [openAgendar, openPlans],
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal
        mode={leadMode}
        onClose={() => setLeadMode(null)}
        onComecar={() => {
          setLeadMode(null);
          setPlansOpen(true);
        }}
      />
      <PlansModal open={plansOpen} onClose={() => setPlansOpen(false)} />
    </LeadModalContext.Provider>
  );
}

// ─── Popup de captação (Agendar / Começar) ──────────────────────
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

const modalCardStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(8,28,52,0.98) 0%, rgba(5,10,20,0.99) 60%, rgba(32,22,8,0.96) 100%)",
  border: "1px solid rgba(217,154,30,0.32)",
  boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
};

function LeadModal({
  mode,
  onClose,
  onComecar,
}: {
  mode: LeadMode | null;
  onClose: () => void;
  onComecar: () => void;
}) {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });
  const open = mode !== null;

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAgendar() {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
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
            style={{ maxWidth: 460, padding: "clamp(28px, 5vw, 40px)", ...modalCardStyle }}
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
              {mode === "planos"
                ? "Preencha seus dados para conhecer os planos."
                : "Preencha seus dados e nossa equipe agenda seu horário."}
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
              {mode === "planos" ? (
                <button
                  type="button"
                  onClick={onComecar}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: "#FFD245",
                    color: "#050A14",
                    fontSize: 13,
                    padding: "15px 28px",
                    boxShadow:
                      "0 0 32px rgba(255,210,69,0.36), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  <ShoppingCart size={17} strokeWidth={2.2} />
                  Começar agora
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAgendar}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: "#FFD245",
                    color: "#050A14",
                    fontSize: 13,
                    padding: "15px 28px",
                    boxShadow:
                      "0 0 32px rgba(255,210,69,0.36), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  <CalendarClock size={17} strokeWidth={2.2} />
                  Agendar horário
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function periodNote(period: BillingPeriod, discountPercent: number): string | null {
  if (period === "mensal") return null;
  if (period === "semestral") {
    return `${discountPercent}% de desconto no primeiro semestre. Após isso, valor normal com 10% recorrente.`;
  }
  if (period === "trimestral") {
    return `${discountPercent}% de desconto no primeiro trimestre. Após isso, valor normal.`;
  }
  return `${discountPercent}% de desconto no primeiro ano. Após isso, valor normal.`;
}

// ─── Popup de planos (toggle + cards) ───────────────────────────
function PlansModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [period, setPeriod] = useState<BillingPeriod>("semestral");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:items-center"
          style={{ background: "rgba(2,5,12,0.84)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="plans-modal-title"
        >
          <motion.div
            className="relative my-6 w-full overflow-hidden rounded-3xl sm:my-8"
            style={{
              maxWidth: 1120,
              padding: "clamp(24px, 4vw, 40px)",
              background:
                "linear-gradient(180deg, #070D18 0%, #050A14 55%, #0A0612 100%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.65)",
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
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <X size={20} />
            </button>

            <h3
              id="plans-modal-title"
              className="text-center font-black"
              style={{ color: "#ffffff", fontSize: "clamp(22px, 2.8vw, 34px)" }}
            >
              {plansData.heading}
            </h3>
            <p
              className="mx-auto mt-2 max-w-2xl text-center font-medium"
              style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, lineHeight: 1.5 }}
            >
              {plansData.sub}
            </p>

            {/* Toggle de período */}
            <div className="mt-7 flex justify-center">
              <div
                className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full p-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.04)",
                }}
                role="tablist"
                aria-label="Período de cobrança"
              >
                {billingPeriods.map((item) => {
                  const active = period === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPeriod(item.id)}
                      className="rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 sm:px-5"
                      style={
                        active
                          ? { backgroundColor: "#ffffff", color: "#050A14" }
                          : { color: "rgba(255,255,255,0.78)" }
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {plansData.plans.map((plan) => {
                const pricing = getPlanPricing(plan.key, period);
                const note = periodNote(period, pricing.discountPercent);

                return (
                  <div
                    key={plan.key}
                    className="relative flex flex-col rounded-2xl p-5 sm:p-6"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: plan.highlight
                        ? "1.5px solid rgba(168,85,247,0.85)"
                        : "1px solid rgba(255,255,255,0.10)",
                      boxShadow: plan.highlight
                        ? "0 0 40px rgba(168,85,247,0.18), inset 0 1px 0 rgba(255,255,255,0.08)"
                        : `inset 1.5px 0 0 ${plan.accent}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                  >
                    {"badge" in plan && plan.badge && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-bold"
                        style={{
                          backgroundColor: "#A855F7",
                          color: "#ffffff",
                          boxShadow: "0 8px 24px rgba(168,85,247,0.35)",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}

                    {pricing.showStrike && (
                      <span
                        className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold"
                        style={{
                          background: "rgba(168,85,247,0.22)",
                          color: "#E9D5FF",
                          border: "1px solid rgba(168,85,247,0.35)",
                        }}
                      >
                        {pricing.discountPercent}% de desconto
                      </span>
                    )}

                    <p className="pr-20 text-xl font-black text-white">{plan.name}</p>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.52)" }}
                    >
                      {plan.tagline}
                    </p>

                    <div className="mt-5">
                      {pricing.showStrike && (
                        <p
                          className="text-sm font-medium line-through"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          {pricing.baseLabel} /mês
                        </p>
                      )}
                      <p className="flex items-baseline gap-1.5">
                        <span className="text-[28px] font-black leading-none text-white sm:text-[32px]">
                          {pricing.monthlyLabel}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          /mês
                        </span>
                      </p>
                      {pricing.showTotal && (
                        <p
                          className="mt-1.5 text-[11px] font-bold uppercase tracking-wide"
                          style={{ color: "rgba(255,255,255,0.42)" }}
                        >
                          Cobrança única {pricing.totalLabel}
                        </p>
                      )}
                    </div>

                    <a
                      href="#contato"
                      onClick={onClose}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full py-3 text-center text-sm font-black transition-all duration-300 hover:scale-[1.02]"
                      style={
                        plan.highlight
                          ? {
                              background:
                                "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
                              color: "#ffffff",
                              boxShadow: "0 0 28px rgba(168,85,247,0.35)",
                            }
                          : {
                              border: "1px solid rgba(255,255,255,0.22)",
                              color: "#ffffff",
                              background: "rgba(255,255,255,0.03)",
                            }
                      }
                    >
                      {plan.cta}
                    </a>

                    {note && (
                      <p
                        className="mt-3 text-center text-[11px] font-medium leading-snug"
                        style={{ color: "rgba(255,255,255,0.42)" }}
                      >
                        {note}
                      </p>
                    )}

                    <ul className="plans-features-scroll mt-5 flex max-h-[280px] flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
                      {plan.features.map((feat) => (
                        <li
                          key={feat.text}
                          className="flex items-start gap-2 text-[12.5px] font-medium leading-snug"
                          style={{
                            color: feat.included
                              ? "rgba(255,255,255,0.78)"
                              : "rgba(255,255,255,0.38)",
                          }}
                        >
                          {feat.included ? (
                            <Check
                              size={15}
                              strokeWidth={2.6}
                              color="#22C55E"
                              className="mt-0.5 flex-shrink-0"
                              aria-hidden
                            />
                          ) : (
                            <X
                              size={15}
                              strokeWidth={2.6}
                              color="#EF4444"
                              className="mt-0.5 flex-shrink-0"
                              aria-hidden
                            />
                          )}
                          {feat.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
