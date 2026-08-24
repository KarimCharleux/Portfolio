#!/usr/bin/env bash
# One-time pipeline: resize/compress/rename the source photos in public/photos/
# into two size tiers, strip metadata, and print a Photo[] literal to paste
# into content/photos.data.ts. Re-running after the first run is a no-op for
# already-processed photos (the source *.jpg files no longer exist).
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_DIR="public/photos"
GRID_DIR="$SRC_DIR/grid"
FULL_DIR="$SRC_DIR/full"

mkdir -p "$GRID_DIR" "$FULL_DIR"

shopt -s nullglob
files=("$SRC_DIR"/*.jpg)
shopt -u nullglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No source .jpg files in $SRC_DIR — already processed?" >&2
  exit 1
fi

i=1
ids=()
for f in "${files[@]}"; do
  n=$(printf "%02d" "$i")
  id="photo-$n"
  ids+=("$id")
  sips -Z 900 -s format jpeg -s formatOptions 78 "$f" --out "$GRID_DIR/$id.jpg" >/dev/null
  sips -Z 1800 -s format jpeg -s formatOptions 85 "$f" --out "$FULL_DIR/$id.jpg" >/dev/null
  i=$((i + 1))
done

for f in "${files[@]}"; do
  rm "$f"
done

echo "Processed ${#ids[@]} photos into $GRID_DIR and $FULL_DIR." >&2
echo >&2
echo "export const PHOTOS: Photo[] = ["
for id in "${ids[@]}"; do
  w=$(sips -g pixelWidth "$GRID_DIR/$id.jpg" | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$GRID_DIR/$id.jpg" | awk '/pixelHeight/{print $2}')
  echo "  { id: '$id', gridSrc: '/photos/grid/$id.jpg', fullSrc: '/photos/full/$id.jpg', width: $w, height: $h },"
done
echo "];"
