import type { CSSProperties } from "react";

/** Cor de destaque dos títulos (azul claro da marca). */
export const VM_TITLE_ACCENT = "#2D9CFF";
export const VM_TITLE_WHITE = "#ffffff";
/** Texto principal de título em fundos claros. */
export const VM_TITLE_ON_LIGHT = "#0A1628";

/** Tamanho e ritmo tipográfico do hero (“Mais vendas” / “Menos improviso”). */
export const vmTitleLineBase: CSSProperties = {
  fontSize: "clamp(30px, 2.9vw, 54px)",
  lineHeight: 1.02,
  letterSpacing: "-0.025em",
};

export const vmTitleWhiteStyle: CSSProperties = {
  ...vmTitleLineBase,
  color: VM_TITLE_WHITE,
};

export const vmTitleAccentStyle: CSSProperties = {
  ...vmTitleLineBase,
  color: VM_TITLE_ACCENT,
};

export const vmTitleOnLightStyle: CSSProperties = {
  ...vmTitleLineBase,
  color: VM_TITLE_ON_LIGHT,
};

export const vmTitleAccentInline: CSSProperties = {
  color: VM_TITLE_ACCENT,
};

export const vmTitleHeadingClass = "font-black";
