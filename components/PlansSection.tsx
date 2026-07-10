"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import VmTitle from "@/components/VmTitle";
import {
  billingPeriods,
  getPlanPricing,
  plansData,
  type BillingPeriod,
} from "@/data/vmData";

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

export default function PlansSection() {
  const [period, setPeriod] = useState<BillingPeriod>("semestral");

  return (
    <section
      className="px-5 py-20 md:px-8 md:py-24"
      style={{ backgroundColor: "#050A14" }}
      aria-labelledby="plans-heading"
      id="planos"
    >
      <div className="mx-auto max-w-[1180px]">
        <VmTitle
          as="h2"
          id="plans-heading"
          center
          className="mb-4"
          lines={["Planos pensados para", "vender mais"]}
        />
        <p
          className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          {plansData.sub}
        </p>

        <div className="mb-10 flex justify-center">
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

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {plansData.plans.map((plan) => {
            const pricing = getPlanPricing(plan.key, period);
            const note = periodNote(period, pricing.discountPercent);

            return (
              <div
                key={plan.key}
                className="relative flex flex-col rounded-2xl p-6 backdrop-blur-md md:p-7"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: plan.highlight
                    ? "1.5px solid rgba(168,85,247,0.85)"
                    : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: plan.highlight
                    ? "0 0 40px rgba(168,85,247,0.16), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : `inset 1.5px 0 0 ${plan.accent}, inset 0 1px 0 rgba(255,255,255,0.06)`,
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

                <p className="pr-16 text-lg font-black tracking-wide text-white">
                  {plan.name}
                </p>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {plan.tagline}
                </p>

                <div className="mt-5 mb-5">
                  {pricing.showStrike && (
                    <p
                      className="text-sm font-medium line-through"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {pricing.baseLabel} /mês
                    </p>
                  )}
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-[28px] font-black leading-none text-white">
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
                  aria-label={`${plan.cta} — Plano ${plan.name}`}
                  className="mb-4 w-full rounded-full py-3 text-center text-sm font-black transition-all duration-300 hover:scale-[1.02]"
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
                    className="mb-4 text-center text-[11px] font-medium leading-snug"
                    style={{ color: "rgba(255,255,255,0.42)" }}
                  >
                    {note}
                  </p>
                )}

                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.slice(0, 8).map((feat) => (
                    <li
                      key={feat.text}
                      className="flex items-start gap-2 text-[12.5px] font-medium leading-snug"
                      style={{
                        color: feat.included
                          ? "rgba(255,255,255,0.70)"
                          : "rgba(255,255,255,0.35)",
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
      </div>
    </section>
  );
}
