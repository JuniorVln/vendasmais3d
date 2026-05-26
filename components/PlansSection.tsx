import { plansData } from "@/data/vmData";

export default function PlansSection() {
  return (
    <section
      className="py-24 px-8"
      style={{ backgroundColor: "#050A14" }}
      aria-labelledby="plans-heading"
    >
      <div className="max-w-[1440px] mx-auto">
      <h2
        id="plans-heading"
        className="text-3xl font-black text-center mb-4 text-white"
      >
        {plansData.heading}
      </h2>
      <p
        className="text-center mb-16"
        style={{ color: "rgba(255,255,255,0.50)" }}
      >
        {plansData.sub}
      </p>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {plansData.plans.map((plan) => (
          <div
            key={plan.name}
            className="backdrop-blur-md rounded-2xl p-8 flex-1 flex flex-col relative"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: plan.highlight
                ? "1px solid rgba(200,148,26,0.60)"
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {"badge" in plan && plan.badge && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "#C8941A", color: "#050A14" }}
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
                  <span style={{ color: "#C8941A" }} aria-hidden="true">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              aria-label={`${plan.cta} — Plano ${plan.name}`}
              className="w-full text-center font-black uppercase tracking-widest py-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vm-gold"
              style={
                plan.highlight
                  ? {
                      backgroundColor: "#C8941A",
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
                    "#E8A820";
                } else {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(200,148,26,0.60)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C8941A";
                }
              }}
              onMouseLeave={(e) => {
                if (plan.highlight) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#C8941A";
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
