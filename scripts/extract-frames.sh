#!/bin/bash
set -e

INPUT="public/videos/vm-sequence.mp4"
OUTPUT_DIR="public/frames"
TARGET_FPS=30
QUALITY=3

if [ ! -f "$INPUT" ]; then
  echo "ERROR: $INPUT not found. Add the video before running."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

EXISTING=$(ls "$OUTPUT_DIR"/*.jpg 2>/dev/null | wc -l)
if [ "$EXISTING" -gt 0 ]; then
  echo "Frames already exist ($EXISTING files). Delete $OUTPUT_DIR to re-extract."
  exit 0
fi

echo "Extracting frames at ${TARGET_FPS}fps..."

ffmpeg -i "$INPUT" \
  -vf "fps=${TARGET_FPS},scale=1920:-2:flags=lanczos" \
  -q:v "$QUALITY" \
  -frame_pts 1 \
  "${OUTPUT_DIR}/%04d.jpg"

TOTAL=$(ls "$OUTPUT_DIR"/*.jpg | wc -l)
echo "Done. $TOTAL frames extracted to $OUTPUT_DIR/"
echo "Update TOTAL_FRAMES=$TOTAL in data/vmData.ts"
