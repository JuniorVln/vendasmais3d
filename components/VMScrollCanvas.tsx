"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import VmLogo from "./VmLogo";
import { VIDEO_SCROLL_PATH, VIDEO_FALLBACK_PATH } from "@/data/vmData";

interface VMScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  framesPath: string;
}

const AUTHORITY_PHASE_START = 0.52; // Phase 4 starts here — freeze video frame from this scroll position
const AUTHORITY_PHASE_END = 0.8;
const AUTHORITY_HOLD_PROGRESS = 0.8; // video position frozen during authority (phone-centered frame)

export default function VMScrollCanvas({ scrollYProgress }: VMScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  // Queue pattern: only one seek in-flight at a time, keep latest pending target
  const seekingRef = useRef(false);
  const pendingTimeRef = useRef<number | null>(null);

  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
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

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const scale = Math.max(cssW / vw, cssH / vh);
    const x = (cssW - vw * scale) / 2;
    const y = (cssH - vh * scale) / 2;
    ctx.drawImage(video, x, y, vw * scale, vh * scale);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onProgress = () => {
      if (video.buffered.length && video.duration) {
        const end = video.buffered.end(video.buffered.length - 1);
        setLoadProgress(end / video.duration);
      }
    };

    const onCanPlay = () => {
      drawFrame();
      setIsReady(true);
      setLoadProgress(1);
    };

    // After each seek completes: draw to canvas, then process next queued time
    const onSeeked = () => {
      drawFrame();
      seekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const t = pendingTimeRef.current;
        pendingTimeRef.current = null;
        seekingRef.current = true;
        video.currentTime = t;
      }
    };

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 3) onCanPlay();

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [drawFrame]);

  // Redraw on resize (e.g. window resize, orientation change)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(drawFrame);
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !isReady) return;
    let effectiveProgress: number;
    if (latest < AUTHORITY_PHASE_START) {
      // Remap [0, 0.6] → [0, 0.8]: phases 1-3 advance the video to the authority hold frame
      effectiveProgress = latest * (AUTHORITY_HOLD_PROGRESS / AUTHORITY_PHASE_START);
    } else if (latest < AUTHORITY_PHASE_END) {
      // Freeze at the phone-centered frame — no cut, no jump
      effectiveProgress = AUTHORITY_HOLD_PROGRESS;
    } else {
      // [0.8, 1.0] → [0.8, 1.0]: CTA continues seamlessly
      effectiveProgress = AUTHORITY_HOLD_PROGRESS + (latest - AUTHORITY_PHASE_END);
    }
    const t = effectiveProgress * video.duration;
    if (seekingRef.current) {
      // Overwrite: we only care about the latest scroll position
      pendingTimeRef.current = t;
    } else {
      seekingRef.current = true;
      video.currentTime = t;
    }
  });

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
            <VmLogo height={48} width={160} />
            <div
              className="w-64 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(0,116,189,0.20)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${loadProgress * 100}%`,
                  backgroundColor: "#C8941A",
                }}
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

      {/* Hidden video — used only as decode source for canvas */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hidden"
      >
        {/* vm-scroll.mp4 = keyframe-per-frame (smooth seeking). Run: npm run encode-scroll */}
        <source src={VIDEO_SCROLL_PATH} type="video/mp4" />
        <source src={VIDEO_FALLBACK_PATH} type="video/mp4" />
      </video>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
