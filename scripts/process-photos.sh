#!/usr/bin/env bash
# One-time pipeline: resize/compress/rename the source photos in public/photos/
# into two size tiers, verify no GPS/location metadata survives, and print a
# Photo[] literal to paste into content/photos.data.ts. Re-running after the
# first run is a no-op for already-processed photos (the source *.jpg files
# no longer exist).
#
# Metadata: `sips`'s JPEG re-encode (below) drops EXIF as a side effect of how
# it writes the file, not via an explicit strip flag — sips has none. Given
# these are personal phone/camera photos going into a public repo, that's
# verified rather than assumed: the check at the end parses each output
# file's raw EXIF IFD0 and fails the whole script if a GPS IFD pointer
# (tag 0x8825) is found anywhere, so a future macOS/sips version behaving
# differently is caught here instead of shipping quietly.
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

python3 - "$GRID_DIR" "$FULL_DIR" <<'PYEOF'
# Fails (exit 1) if any processed file still carries a GPS IFD pointer (EXIF tag
# 0x8825) in its IFD0 — see the header comment for why this is a check, not an
# assumption.
import glob
import os
import struct
import sys

GPS_IFD_POINTER_TAG = 0x8825


def has_gps_ifd(path: str) -> bool:
    with open(path, "rb") as f:
        data = f.read(65536)
    idx = data.find(b"Exif\x00\x00")
    if idx == -1:
        return False
    tiff_start = idx + 6
    endian = ">" if data[tiff_start : tiff_start + 2] == b"MM" else "<"
    ifd0_offset = struct.unpack(endian + "I", data[tiff_start + 4 : tiff_start + 8])[0]
    ifd_pos = tiff_start + ifd0_offset
    num_entries = struct.unpack(endian + "H", data[ifd_pos : ifd_pos + 2])[0]
    tags = [
        struct.unpack(endian + "H", data[ifd_pos + 2 + i * 12 : ifd_pos + 4 + i * 12])[0]
        for i in range(num_entries)
    ]
    return GPS_IFD_POINTER_TAG in tags


checked = 0
offenders = []
for directory in sys.argv[1:]:
    for path in sorted(glob.glob(os.path.join(directory, "*.jpg"))):
        checked += 1
        if has_gps_ifd(path):
            offenders.append(path)

if offenders:
    print(f"GPS metadata found in {len(offenders)} file(s): {offenders}", file=sys.stderr)
    sys.exit(1)

print(f"Metadata check passed: no GPS IFD in any of {checked} processed files.", file=sys.stderr)
PYEOF

echo >&2
echo "export const PHOTOS: Photo[] = ["
for id in "${ids[@]}"; do
  w=$(sips -g pixelWidth "$GRID_DIR/$id.jpg" | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$GRID_DIR/$id.jpg" | awk '/pixelHeight/{print $2}')
  echo "  { id: '$id', gridSrc: '/photos/grid/$id.jpg', fullSrc: '/photos/full/$id.jpg', width: $w, height: $h },"
done
echo "];"
