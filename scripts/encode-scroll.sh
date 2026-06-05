#!/bin/bash
set -e

INPUT="public/videos/vm-sequence.mp4"
OUTPUT="public/videos/vm-scroll.mp4"

if [ ! -f "$INPUT" ]; then
  echo "ERROR: $INPUT not found."
  exit 1
fi

if [ -f "$OUTPUT" ]; then
  echo "vm-scroll.mp4 already exists. Delete it to re-encode."
  exit 0
fi

echo "Encoding scroll-optimized video..."
echo "  keyint=1  → every frame is independently seekable (instant seek)"
echo "  crf=18    → near-lossless quality"
echo "  scale=2560 → QHD output (sharp on 4K/Retina, reasonable file size)"
echo ""

ffmpeg -i "$INPUT" \
  -vf "scale=2560:-2:flags=lanczos" \
  -c:v libx264 \
  -profile:v high \
  -x264-params "keyint=1:min-keyint=1:scenecut=0:bframes=0" \
  -crf 18 \
  -preset fast \
  -an \
  -movflags +faststart \
  "$OUTPUT"

SIZE=$(du -sh "$OUTPUT" | cut -f1)
echo ""
echo "Done! $OUTPUT ($SIZE)"
echo "The video is now ready for smooth scroll-driven playback."
