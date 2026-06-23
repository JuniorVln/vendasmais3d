import VmTitle from "@/components/VmTitle";
import { plansData } from "@/data/vmData";

export default function PlansSection() {
  return (
    <section
      className="px-5 py-20 md:px-8 md:py-24"
      style={{ backgroundColor: "#050A14" }}
      aria-labelledby="plans-heading"
      id="planos"
    >
      <div className="max-w-[1440px] mx-auto">
      <VmTitle
        as="h2"
        id="plans-heading"
        center
        className="mb-4"
        lines={["Planos para cada", "momento comercial"]}
      />
      <p
        className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed md:mb-16 md:text-lg"
        style={{ color: "rgba(255,255,255,0.50)" }}
      >
        {plansData.sub}
      </p>

      <div className="mx-auto flex max-w-5xl flex-col gap-5 md:flex-row md:gap-6">
        {plansData.plans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-1 flex-col rounded-2xl p-6 backdrop-blur-md md:p-8"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: plan.highlight
                ? "1px solid rgba(217,154,30,0.64)"
                : "1px solid rgba(255,255,255,0.10)",
              boxShadow: plan.highlight
                ? "0 24px 70px rgba(217,154,30,0.10), inset 0 1px 0 rgba(255,255,255,0.10)"
                : "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {"badge" in plan && plan.badge && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "#D99A1E", color: "#050A14" }}
              >
                {plan.badge}
              </span>
            )}

            <p className="text-lg font-black tracking-widest text-white mb-2">
              {plan.name}
            </p>
            <p
              className="text-sm font-medium mb-6"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {plan.price}
            </p>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                  <span style={{ color: "#D99A1E" }} aria-hidden="true">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              aria-label={`${plan.cta} — Plano ${plan.name}`}
              className="w-full text-center font-black uppercase tracking-widest py-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vm-gold"
              style={
                plan.highlight
                  ? {
                      backgroundColor: "#FFD245",
                      color: "#050A14",
                      fontSize: 12,
                      letterSpacing: "0.16em",
                    }
                  : {
                      border: "1px solid rgba(255,255,255,0.20)",
                      color: "rgba(255,255,255,0.70)",
                      fontSize: 12,
                      letterSpacing: "0.16em",
                    }
              }
              onMouseEnter={(e) => {
                if (plan.highlight) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#FFE57A";
                } else {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,210,69,0.60)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFD245";
                }
              }}
              onMouseLeave={(e) => {
                if (plan.highlight) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#FFD245";
                } else {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.20)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.70)";
                }
              }}
            >
              {plan.cta.toUpperCase()}
            </a>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
