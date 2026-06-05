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

const AUTHORITY_PHASE_START = 0.52;
const AUTHORITY_PHASE_END = 0.8;
const AUTHORITY_HOLD_PROGRESS = 0.739;

type VideoWithVFC = HTMLVideoElement & {
  requestVideoFrameCallback: (cb: () => void) => number;
  cancelVideoFrameCallback: (handle: number) => void;
};

export default function VMScrollCanvas({ scrollYProgress }: VMScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameHandleRef = useRef<number>(0);

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

  // Continuous frame loop: requestVideoFrameCallback (Chrome/Safari) → rAF fallback
  // Fires whenever the video has a new decoded frame ready — zero wasted draws
  const startFrameLoop = useCallback((video: HTMLVideoElement) => {
    const vfc = video as VideoWithVFC;
    const hasVFC = typeof vfc.requestVideoFrameCallback === "function";

    if (hasVFC) {
      const onVFC = () => {
        drawFrame();
        frameHandleRef.current = vfc.requestVideoFrameCallback(onVFC);
      };
      frameHandleRef.current = vfc.requestVideoFrameCallback(onVFC);
      return () => vfc.cancelVideoFrameCallback(frameHandleRef.current);
    }

    // rAF fallback: draw every animation frame
    const onRaf = () => {
      drawFrame();
      frameHandleRef.current = requestAnimationFrame(onRaf);
    };
    frameHandleRef.current = requestAnimationFrame(onRaf);
    return () => cancelAnimationFrame(frameHandleRef.current);
  }, [drawFrame]);

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

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 3) onCanPlay();

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [drawFrame]);

  // Start the frame loop once ready
  useEffect(() => {
    const video = videoRef.current;
    if (!isReady || !video) return;
    return startFrameLoop(video);
  }, [isReady, startFrameLoop]);

  // Redraw on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(drawFrame);
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [drawFrame]);

  // On scroll: just set currentTime — the frame loop draws when decoded (fire and forget)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    let effectiveProgress: number;
    if (latest < AUTHORITY_PHASE_START) {
      effectiveProgress = latest * (AUTHORITY_HOLD_PROGRESS / AUTHORITY_PHASE_START);
    } else if (latest < AUTHORITY_PHASE_END) {
      effectiveProgress = AUTHORITY_HOLD_PROGRESS;
    } else {
      effectiveProgress = AUTHORITY_HOLD_PROGRESS + (latest - AUTHORITY_PHASE_END);
    }

    video.currentTime = effectiveProgress * video.duration;
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
                  backgroundColor: "#D99A1E",
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

      {/* Hidden video — decode source only; canvas renders the frames */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hidden"
      >
        {/* vm-scroll.mp4: keyint=1 — every frame is an independent keyframe */}
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
