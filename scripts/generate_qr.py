#!/usr/bin/env python3
"""
Generate high-resolution PNG and SVG QR codes for the wedding table lookup app.
Encodes target URL directly with error correction level H and embeds a "T & L" design mark.
"""

import os
import qrcode
from qrcode.image.svg import SvgPathImage
from PIL import Image, ImageDraw, ImageFont

GITHUB_PAGES_URL = "https://tomkennon.github.io/table_lookup/"
OUTPUT_DIR = "public"

def generate_qr():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 1. Generate high-resolution PNG with centered T & L badge
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction (up to 30% recovery)
        box_size=20,  # High resolution output
        border=4,
    )
    qr.add_data(GITHUB_PAGES_URL)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#1a202c", back_color="#ffffff").convert("RGBA")

    # Create center logo overlay with "T & L"
    width, height = img.size
    badge_size = int(width * 0.22)  # Occupy ~22% of central area (well within 30% error correction)

    badge = Image.new("RGBA", (badge_size, badge_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)

    # White background with dark border
    draw.rounded_rectangle(
        [(0, 0), (badge_size - 1, badge_size - 1)],
        radius=int(badge_size * 0.2),
        fill="#ffffff",
        outline="#1a202c",
        width=4
    )

    font_size = int(badge_size * 0.3)
    font = None
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, font_size)
                break
            except Exception:
                pass

    text = "T & L"
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        text_x = (badge_size - text_w) / 2 - bbox[0]
        text_y = (badge_size - text_h) / 2 - bbox[1]
        draw.text((text_x, text_y), text, fill="#1a202c", font=font)
    else:
        draw.text((int(badge_size * 0.2), int(badge_size * 0.35)), text, fill="#1a202c")

    pos = ((width - badge_size) // 2, (height - badge_size) // 2)
    img.paste(badge, pos, badge)

    png_path = os.path.join(OUTPUT_DIR, "qr_code.png")
    img.save(png_path)
    print(f"Generated PNG QR Code: {png_path} ({width}x{height} px)")

    # 2. Generate clean SVG QR Code
    qr_svg = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
        image_factory=SvgPathImage
    )
    qr_svg.add_data(GITHUB_PAGES_URL)
    qr_svg.make(fit=True)

    svg_img = qr_svg.make_image(fill_color="#1a202c")
    svg_path = os.path.join(OUTPUT_DIR, "qr_code.svg")
    svg_img.save(svg_path)
    print(f"Generated SVG QR Code: {svg_path}")

if __name__ == "__main__":
    generate_qr()
