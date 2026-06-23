interface VmLogoProps {
  height?: number;
  width?: number;
  className?: string;
  /** Versão monocromática: sobrescreve a cor de todo o logo (ex. "#ffffff"). */
  mono?: string;
}

export default function VmLogo({ height = 48, width = 160, className = "", mono }: VmLogoProps) {
  const scale = height / 48;
  const markFill = mono ?? "#D99A1E";
  const textFill = mono ?? "#FFFFFF";
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vendas Mais"
      role="img"
    >
      <text
        x="4"
        y={Math.round(34 * scale)}
        fontFamily="Montserrat, sans-serif"
        fontSize={Math.round(32 * scale)}
        fontWeight="900"
        fill={markFill}
        letterSpacing="-1"
      >
        vm+
      </text>
      <text
        x={Math.round(76 * scale)}
        y={Math.round(22 * scale)}
        fontFamily="Montserrat, sans-serif"
        fontSize={Math.round(8 * scale)}
        fontWeight="700"
        fill={textFill}
        letterSpacing="2"
        opacity="0.9"
      >
        VENDAS
      </text>
      <text
        x={Math.round(76 * scale)}
        y={Math.round(34 * scale)}
        fontFamily="Montserrat, sans-serif"
        fontSize={Math.round(8 * scale)}
        fontWeight="700"
        fill={textFill}
        letterSpacing="2"
        opacity="0.9"
      >
        MAIS
      </text>
    </svg>
  );
}
