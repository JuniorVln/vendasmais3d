"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";

interface VMScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  framesPath: string;
}

// Fase de autoridade: segura o mesmo frame enquanto os cards animam.
const AUTHORITY_PHASE_START = 0.52;
const AUTHORITY_PHASE_END = 0.8;
const AUTHORITY_HOLD_PROGRESS = 0.739;

// Ponto do scroll em que o vídeo chega ao ÚLTIMO frame (celular totalmente de
// frente). Depois disso o frame final é segurado até liberar a próxima seção,
// pra dar tempo de ver o vídeo terminar antes da transição.
const VIDEO_FINISH_PROGRESS = 0.92;

// Suavização do scrub: quanto menor, mais "pesado/suave" (0–1).
const EASE = 0.12;

export default function VMScrollCanvas({
  scrollYProgress,
  totalFrames,
  framesPath,
}: VMScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameSrc = useCallback(
    (i: number) => `${framesPath}/${String(i).padStart(4, "0")}.jpg`,
    [framesPath],
  );

  // ── Desenha um frame específico no canvas (cover-fit + DPR) ──
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cssW / iw, cssH / ih);
    const x = (cssW - iw * scale) / 2;
    const y = (cssH - ih * scale) / 2;
    ctx.drawImage(img, x, y, iw * scale, ih * scale);
  }, []);

  // ── Pré-carrega todos os frames ──
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(totalFrames);

    const onOne = () => {
      if (cancelled) return;
      loaded += 1;
      setLoadProgress(loaded / totalFrames);
      // Desenha o primeiro frame assim que disponível
      if (loaded === 1) drawFrame(0);
      if (loaded >= totalFrames) setIsReady(true);
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = onOne;
      img.onerror = onOne; // não trava o loader se um frame falhar
      img.src = frameSrc(i);
      imgs[i] = img;
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [totalFrames, frameSrc, drawFrame]);

  // ── Loop de animação: interpola o frame atual em direção ao alvo (lerp) ──
  useEffect(() => {
    if (!isReady) return;
    const maxFrame = totalFrames - 1;

    const tick = () => {
      const target = targetFrameRef.current;
      const cur = currentFrameRef.current;
      const diff = target - cur;
      // Aproxima suavemente; "snap" quando muito perto pra parar de desenhar.
      const next = Math.abs(diff) < 0.25 ? target : cur + diff * EASE;
      currentFrameRef.current = next;

      const idx = Math.max(0, Math.min(maxFrame, Math.round(next)));
      if (idx !== lastDrawnRef.current) {
        drawFrame(idx);
        lastDrawnRef.current = idx;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isReady, totalFrames, drawFrame]);

  // ── Scroll → frame alvo (com o "hold" da fase de autoridade) ──
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let p: number;
    if (latest < AUTHORITY_PHASE_START) {
      p = latest * (AUTHORITY_HOLD_PROGRESS / AUTHORITY_PHASE_START);
    } else if (latest < AUTHORITY_PHASE_END) {
      p = AUTHORITY_HOLD_PROGRESS;
    } else if (latest < VIDEO_FINISH_PROGRESS) {
      // Reta final: roda do frame de autoridade até o último frame do vídeo.
      p =
        AUTHORITY_HOLD_PROGRESS +
        (latest - AUTHORITY_PHASE_END) *
          ((1 - AUTHORITY_HOLD_PROGRESS) /
            (VIDEO_FINISH_PROGRESS - AUTHORITY_PHASE_END));
    } else {
      // Segura o último frame (celular de frente) até a próxima seção entrar.
      p = 1;
    }
    p = Math.max(0, Math.min(1, p));
    targetFrameRef.current = p * (totalFrames - 1);
  });

  // ── Redesenha no resize ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(() => {
      lastDrawnRef.current = -1; // força redraw
      drawFrame(Math.round(currentFrameRef.current));
    });
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [drawFrame]);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: "#050A14" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-vendas-mais-oficial.png"
              alt="Vendas Mais"
              style={{ height: 48, width: "auto" }}
            />
            <div
              className="w-64 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(0,116,189,0.20)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${loadProgress * 100}%`, backgroundColor: "#D99A1E" }}
              />
            </div>
            <p
              className="text-sm font-medium tracking-widest"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              CARREGANDO EXPERIÊNCIA... {Math.round(loadProgress * 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
