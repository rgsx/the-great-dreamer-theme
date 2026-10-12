#!/usr/bin/env python3
"""Build the extension icon from the 2048 px master logo.

Usage:
    npm run icons
    python3 scripts/make-icons.py [--src assets/images/dreamer-logo-2048px.png] [--size 256]

Writes assets/images/dreamer-logo.png: a square RGBA PNG at --size (256 by default, the size the
marketplaces recommend; it also serves the README header at 100 px on 2x screens). The master
stays in git but is not packaged (see .vscodeignore).

Needs Python 3 and Pillow (pip3 install --user pillow).
"""
import argparse
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow is required: pip3 install --user pillow')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, 'assets', 'images')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--src', default=os.path.join(IMAGES, 'dreamer-logo-2048px.png'), help='square master logo')
    ap.add_argument('--out', default=os.path.join(IMAGES, 'dreamer-logo.png'), help='icon to write')
    ap.add_argument('--size', type=int, default=256, help='icon width and height in pixels')
    args = ap.parse_args()
    if not os.path.exists(args.src):
        sys.exit(f'no master logo at {args.src}')
    img = Image.open(args.src).convert('RGBA')
    if img.width != img.height:
        sys.exit(f'the master logo must be square, got {img.width}x{img.height}')
    if img.width < args.size:
        sys.exit(f'the master logo ({img.width} px) is smaller than --size {args.size}')
    # Resize with premultiplied alpha so transparent pixels do not bleed dark fringes into the edge.
    icon = img.convert('RGBa').resize((args.size, args.size), Image.LANCZOS, reducing_gap=3.0).convert('RGBA')
    icon.save(args.out, optimize=True)  # sRGB master; the profile and metadata are not copied
    rel = os.path.relpath(args.out, ROOT)
    print(f'wrote {rel} ({args.size}x{args.size}, {os.path.getsize(args.out) // 1024} KB)')


if __name__ == '__main__':
    main()
