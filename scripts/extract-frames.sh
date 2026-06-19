#!/bin/bash
set -e

# Extrai os frames do vídeo de fundo da Fase 1 para uma sequência de imagens.
# O VMScrollCanvas usa essa sequência (pré-carregada) + lerp para um scroll suave.
# Fonte: "video final.mp4" na raiz do workspace (4K 30fps). Saída: 1920w, índice 0000+.
INPUT="../video final.mp4"
OUTPUT_DIR="public/frames"
QUALITY=4

if [ ! -f "$INPUT" ]; then
  echo "ERROR: $INPUT not found. Add the video before running."
  exit 1
fi

EXISTING=$(ls "$OUTPUT_DIR"/*.jpg 2>/dev/null | wc -l)
if [ "$EXISTING" -gt 0 ]; then
  echo "Frames already exist ($EXISTING files). Delete $OUTPUT_DIR/*.jpg to re-extract."
  exit 0
fi

mkdir -p "$OUTPUT_DIR"
echo "Extracting frames (scale 1920w, q:v ${QUALITY})..."

ffmpeg -i "$INPUT" \
  -vf "scale=1920:-2:flags=lanczos" \
  -q:v "$QUALITY" \
  -start_number 0 \
  "${OUTPUT_DIR}/%04d.jpg"

TOTAL=$(ls "$OUTPUT_DIR"/*.jpg | wc -l)
echo "Done. $TOTAL frames (0000–$(printf '%04d' $((TOTAL-1)))) in $OUTPUT_DIR/"
echo "Update TOTAL_FRAMES=$TOTAL in data/vmData.ts"
