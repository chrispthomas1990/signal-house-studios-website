"""Create responsive WebP assets from full-resolution originals in a supplied directory.
Usage: python3 scripts/optimise-page-images.py /path/to/original-images
Originals use the same paths relative to src/assets/images/pages.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path('src/assets/images/pages')
source = Path(sys.argv[1])
names = [
 'audio/audio-production-equipment.webp',
 'audio/recording-studio-mixing-session.webp',
 'audio/recording-studio-drum-kit.webp',
 'live/live-streaming-event-production.webp',
 'live/live-streaming-approach-camera.webp',
 'live/live-streaming-studio-production.webp',
 'live/live-streaming-interview-production.webp',
 'live/live-streaming-multiview-monitor.webp',
 'video/video-production-camera-rig.webp',
 'video/signal-house-studios-team.webp',
]
imports = []
entries = []
for i, name in enumerate(names):
 original = ImageOps.exif_transpose(Image.open(source / name)).convert('RGB')
 width = min(1920, original.width)
 sizes = sorted(set([min(n, width) for n in (640, 960, 1440, 1920)]))
 for w in sizes:
  image = original.resize((w, round(original.height * w / original.width)), Image.Resampling.LANCZOS)
  target = root / name if w == width else root / Path(name).with_name(f'{Path(name).stem}-{w}w.webp')
  image.save(target, 'WEBP', quality=84, method=6)
  symbol = f'image{i}_{w}'
  imports.append(f'import {symbol} from "../assets/images/pages/{target.relative_to(root)}";')
 entries.append(f'  [image{i}_{width}, '+ '[' + ', '.join(f'[{w}, image{i}_{w}]' for w in sizes) + ']],')
 print(f'{name}: {width}px, {(root / name).stat().st_size / 1024:.0f} KB')
Path('src/lib/responsiveImages.ts').write_text('\n'.join(imports) + '''

const sources = new Map<string, [number, string][]>([
''' + '\n'.join(entries) + '''
]);

// Section images stack below 992px; desktop columns share the 1344px page container.
export const sectionImageSizes = "(max-width: 991.98px) calc(100vw - 36px), 720px";
export const cardImageSizes = "(max-width: 575.98px) calc(100vw - 24px), (max-width: 1344px) calc((100vw - 52px) / 2), 646px";

export function responsiveImageSrcSet(src: string) {
  return sources.get(src)?.map(([width, url]) => `${url} ${width}w`).join(", ");
}
''')
