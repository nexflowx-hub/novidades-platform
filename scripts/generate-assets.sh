#!/bin/bash
# NOVIDADES.store — geração de assets (pares sequenciais para estabilidade)
set -u
cd /home/z/my-project
IMG="public/images"

gen() { # out prompt size
  local out="$1" prompt="$2" size="$3"
  if [ -s "$out" ]; then echo "[skip] $out"; return 0; fi
  z-ai image -p "$prompt" -o "$out" -s "$size" >/dev/null 2>&1 \
    && echo "[ok] $out" || echo "[FAIL] $out"
}

pair() { # prompts rodam em paralelo
  gen "$1" "$2" "$3" &
  gen "$4" "$5" "$6" &
  wait
  echo "--- pair done ---"
}

# car-mount + backpack
pair "$IMG/products/car-mount.png" "Smartphone snapped onto a magnetic air vent car mount showing a dark navigation map, modern car interior with leather dashboard, soft daylight, clean commercial product photography, high quality, no text" "1024x1024" \
     "$IMG/products/backpack.png" "Premium black hiking backpack with leather straps details standing on a rocky mountain trail at golden hour, cinematic outdoor lifestyle product photography, high quality, detailed, no text" "1024x1024"

# hero
gen "$IMG/hero/signum-hero.png" "Cinematic dark luxury advertising photograph of two ancient bronze medallion pendant necklaces with ornate engraved crosses on black braided cords, draped over dark textured volcanic stone, dramatic warm golden spotlight from the side, deep black moody background with soft smoke, premium editorial jewelry campaign, wide composition with empty dark space on the left side, high quality, detailed, no text" "1440x720"

# promos
pair "$IMG/promo/discovery.png" "Traveler with a backpack walking along a scenic mountain trail at golden hour seen from behind, warm sunlight, adventurous lifestyle photography, vertical composition, high quality, no text" "864x1152" \
     "$IMG/promo/gift.png" "Elegant premium gift box wrapped in kraft paper with a satin ribbon and dried flowers, on a warm beige background, soft studio light, minimal luxury gift photography, vertical composition, high quality, no text" "864x1152"

# banner
gen "$IMG/banner/gift-banner.png" "Collection of beautifully wrapped premium gift boxes with satin ribbons and bows arranged on a warm beige background with soft bokeh lights, festive elegant commercial photography, wide composition with copy space on the left, high quality, no text" "1440x720"

# categorias 1
pair "$IMG/categories/arte.png" "Classical white marble statue head sculpture against a soft warm beige studio background, museum fine art photography, soft shadows, high quality, no text" "1024x1024" \
     "$IMG/categories/casa.png" "Cozy modern living room corner with warm ambient lighting, ceramic vases and wooden shelves, scandinavian interior design photography, high quality, no text" "1024x1024"
pair "$IMG/categories/auto.png" "Detail shot of a modern sport car headlight and dark hood in a dim garage with dramatic orange rim lighting, automotive photography, high quality, no text" "1024x1024" \
     "$IMG/categories/pets.png" "Portrait of a happy golden retriever dog outdoors in warm sunlight with a soft green blurred background, joyful pet photography, high quality, no text" "1024x1024"

# categorias 2
pair "$IMG/categories/saude.png" "Fresh green eucalyptus leaves and natural herbal wellness products arranged on a light neutral background, spa aesthetic, soft daylight, high quality, no text" "1024x1024" \
     "$IMG/categories/viagem.png" "Vintage leather suitcase with a film camera and straw hat near a bright hotel window with ocean view, travel lifestyle photography, warm tones, high quality, no text" "1024x1024"
pair "$IMG/categories/trabalho.png" "Clean minimal desk setup with an open laptop, notebook and a cup of coffee in warm morning light, productivity workspace photography, high quality, no text" "1024x1024" \
     "$IMG/categories/presentes.png" "Beautifully wrapped gift boxes with ribbons and bows on a warm celebration background with soft golden bokeh lights, festive commercial photography, high quality, no text" "1024x1024"

# vídeos
pair "$IMG/videos/signum.png" "Close-up of a hand holding an ancient bronze cross medallion pendant necklace, dark moody background, dramatic cinematic warm light, vertical composition, high quality, no text" "720x1440" \
     "$IMG/videos/pet.png" "Happy golden retriever dog running towards the camera in a sunny green park, tongue out, joyful energetic pet photography, vertical composition, high quality, no text" "720x1440"
pair "$IMG/videos/projector.png" "Mini projector casting a bright cinematic light beam in a dark cozy living room at night, atmospheric home cinema, vertical composition, high quality, no text" "720x1440" \
     "$IMG/videos/mount.png" "Smartphone mounted on a car dashboard magnetic holder displaying a glowing navigation map, night city lights blurred through the windshield, vertical composition, high quality, no text" "720x1440"
gen "$IMG/videos/backpack.png" "Hiker with a black backpack standing on a mountain summit at sunrise overlooking clouds, epic adventurous landscape, vertical composition, high quality, no text" "720x1440"

echo "=== ALL DONE ==="
ls -la "$IMG"/*/ | grep -c png
