import type { Transition } from "framer-motion";

/** Saída rápida com desaceleração forte — sensação mais “cinemática”. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInExpo = [0.7, 0, 0.84, 0] as const;

export const vmTransition: Transition = {
  duration: 0.62,
  ease: easeOutExpo,
};

export const vmTransitionStagger: Transition = {
  duration: 0.55,
  ease: easeOutExpo,
};

/** Entrada / saída de fase inteira (AnimatePresence). */
export const phaseEnter = {
  opacity: 0,
  y: 56,
  scale: 0.94,
} as const;

export const phaseVisible = {
  opacity: 1,
  y: 0,
  scale: 1,
} as const;

export const phaseExit = {
  opacity: 0,
  y: -48,
  scale: 0.96,
  transition: {
    duration: 0.44,
    ease: easeInExpo,
  },
} as const;

/** Blocos ao rolar a página (pós-scroll). */
export const inViewFadeUp = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.28 },
  transition: vmTransition,
} as const;

export const inViewFromLeft = {
  initial: { opacity: 0, x: -48, scale: 0.98 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: vmTransitionStagger,
} as const;

export const inViewFromRight = {
  initial: { opacity: 0, x: 48, scale: 0.98 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: vmTransitionStagger,
} as const;

export const inViewScale = {
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.7, ease: easeOutExpo },
} as const;
