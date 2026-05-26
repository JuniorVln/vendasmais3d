import VmLogo from "./VmLogo";
import { footerData } from "@/data/vmData";

export default function Footer() {
  return (
    <footer
      className="py-12 px-8"
      style={{
        backgroundColor: "#050A14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <VmLogo height={32} width={106} />
            <span
              className="text-xs ml-3"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              {footerData.tagline}
            </span>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="flex gap-8">
              {footerData.links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-vm-gold rounded"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.80)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.40)")
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.20)" }}>
            {footerData.copyright}
          </p>
          <div className="flex gap-6">
            {footerData.legal.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-vm-gold rounded"
                style={{ color: "rgba(255,255,255,0.20)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.50)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.20)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
