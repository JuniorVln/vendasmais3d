import type { CSSProperties, ReactNode } from "react";
import {
  vmTitleAccentStyle,
  vmTitleHeadingClass,
  vmTitleLineBase,
  vmTitleOnLightStyle,
  vmTitleWhiteStyle,
  VM_TITLE_ON_LIGHT,
  VM_TITLE_WHITE,
} from "@/lib/vmTitleStyles";

type VmTitleProps = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  /** Duas linhas: primeira branca (ou escura em fundo claro), segunda azul. */
  lines?: readonly [string, string];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  center?: boolean;
  onLight?: boolean;
};

export default function VmTitle({
  as: Tag = "h2",
  id,
  lines,
  children,
  className = "",
  style,
  center = false,
  onLight = false,
}: VmTitleProps) {
  const align = center ? "text-center" : "";
  const classes = [vmTitleHeadingClass, align, className].filter(Boolean).join(" ");

  if (lines) {
    const firstLineStyle = onLight ? vmTitleOnLightStyle : vmTitleWhiteStyle;
    return (
      <Tag id={id} className={classes} style={style}>
        <span className="block" style={firstLineStyle}>
          {lines[0]}
        </span>
        <span className="block" style={vmTitleAccentStyle}>
          {lines[1]}
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={classes}
      style={{
        ...vmTitleLineBase,
        color: onLight ? VM_TITLE_ON_LIGHT : VM_TITLE_WHITE,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/** Destaque inline dentro de um título (mesma família, só a cor azul). */
export function VmTitleAccent({ children }: { children: ReactNode }) {
  return <span style={{ color: vmTitleAccentStyle.color }}>{children}</span>;
}
