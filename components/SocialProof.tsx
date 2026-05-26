import { socialProofData } from "@/data/vmData";

export default function SocialProof() {
  return (
    <section
      className="py-24 px-8"
      style={{ backgroundColor: "#050A14" }}
      aria-labelledby="social-proof-heading"
    >
      <div className="max-w-[1440px] mx-auto">
      <h2
        id="social-proof-heading"
        className="text-3xl font-black text-center mb-16 text-white"
      >
        {socialProofData.heading}
      </h2>

      <div className="flex flex-row gap-6 max-w-4xl mx-auto">
        {socialProofData.stats.map((item) => (
          <div
            key={item.label}
            className="backdrop-blur-md border rounded-2xl p-8 flex-1 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(0,116,189,0.20)",
            }}
          >
            <p className="text-5xl font-black" style={{ color: "#C8941A" }}>
              {item.stat}
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p
        className="text-center text-sm mt-12"
        style={{ color: "rgba(255,255,255,0.40)" }}
      >
        {socialProofData.sub}
      </p>
      </div>
    </section>
  );
}
