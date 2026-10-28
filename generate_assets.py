import os

os.makedirs("assets", exist_ok=True)

# 1. Main Dazai Profile Picture (Detailed Anime Illustration)
dazai_pfp_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e2238"/>
      <stop offset="70%" stop-color="#0c0d17"/>
      <stop offset="100%" stop-color="#05060b"/>
    </radialGradient>
    <radialGradient id="auraGlow" cx="50%" cy="60%" r="55%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#6366f1" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d221e"/>
      <stop offset="45%" stop-color="#1f1815"/>
      <stop offset="100%" stop-color="#140f0d"/>
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff1e8"/>
      <stop offset="75%" stop-color="#f8dfd0"/>
      <stop offset="100%" stop-color="#ecc6b1"/>
    </linearGradient>
    <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d6b896"/>
      <stop offset="40%" stop-color="#bfa07e"/>
      <stop offset="100%" stop-color="#8a6e50"/>
    </linearGradient>
    <linearGradient id="vestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#27272a"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="400" height="400" rx="30" fill="url(#bgGlow)"/>
  <circle cx="200" cy="200" r="180" fill="url(#auraGlow)"/>

  <!-- Mystic Kanji in background -->
  <text x="320" y="90" font-family="'Cinzel', serif, monospace" font-size="28" font-weight="bold" fill="#38bdf8" fill-opacity="0.25" text-anchor="middle">人間失格</text>
  <text x="70" y="320" font-family="'Cinzel', serif, monospace" font-size="16" fill="#818cf8" fill-opacity="0.3" text-anchor="middle">No Longer Human</text>

  <!-- Back coat collar & shoulders -->
  <path d="M 60 400 L 95 310 L 150 280 L 250 280 L 305 310 L 340 400 Z" fill="url(#coatGrad)"/>
  
  <!-- White Dress Shirt & Bandages under shirt -->
  <path d="M 150 280 L 175 350 L 225 350 L 250 280 Z" fill="#e2e8f0"/>
  <!-- Vest V-neck -->
  <path d="M 125 315 L 170 400 L 230 400 L 275 315 L 250 280 L 150 280 Z" fill="url(#vestGrad)"/>
  
  <!-- Bolo Tie Ribbon & Turquoise Jewel -->
  <path d="M 197 295 L 197 390 M 203 295 L 203 390" stroke="#3f3f46" stroke-width="3" stroke-linecap="round"/>
  <circle cx="200" cy="295" r="9" fill="url(#gemGrad)" filter="url(#softGlow)"/>
  <circle cx="198" cy="293" r="3" fill="#ffffff" opacity="0.8"/>
  <rect x="194" y="286" width="12" height="18" rx="2" fill="none" stroke="#e0f2fe" stroke-width="1.5"/>

  <!-- Trench Coat Lapels -->
  <path d="M 95 310 L 165 375 L 185 300 L 150 280 Z" fill="#caba9e"/>
  <path d="M 305 310 L 235 375 L 215 300 L 250 280 Z" fill="#b09b7c"/>

  <!-- Neck & Bandages on Neck -->
  <path d="M 170 230 L 170 285 L 230 285 L 230 230 Z" fill="url(#skinGrad)"/>
  <!-- Bandage Wraps on Neck -->
  <path d="M 169 240 Q 200 248 231 240 L 231 250 Q 200 258 169 250 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
  <path d="M 169 252 Q 200 260 231 252 L 231 262 Q 200 270 169 262 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
  <path d="M 169 264 Q 200 272 231 264 L 231 274 Q 200 282 169 274 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>

  <!-- Face Shape -->
  <path d="M 135 155 Q 130 220 190 252 Q 200 256 210 252 Q 270 220 265 155 Q 260 110 200 110 Q 140 110 135 155 Z" fill="url(#skinGrad)"/>
  
  <!-- Chin Shadow -->
  <path d="M 185 248 Q 200 256 215 248 Q 200 240 185 248 Z" fill="#dfb398"/>

  <!-- Bandage on Right Cheek / Forehead (Iconic Dazai look) -->
  <path d="M 230 150 L 260 170 L 252 188 L 222 168 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.8" opacity="0.9"/>
  <line x1="225" y1="162" x2="256" y2="182" stroke="#cbd5e1" stroke-width="0.8"/>

  <!-- Eyes: Characteristic Dark Amber / Introspective -->
  <!-- Left Eye -->
  <ellipse cx="170" cy="175" rx="14" ry="9" fill="#1e1816"/>
  <ellipse cx="170" cy="175" rx="8" ry="8" fill="#78350f"/>
  <ellipse cx="170" cy="175" rx="5" ry="5" fill="#b45309"/>
  <circle cx="167" cy="172" r="2.5" fill="#ffffff"/>
  <path d="M 155 168 Q 170 160 185 167" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Left Eyebrow -->
  <path d="M 153 154 Q 170 148 186 156" stroke="#261b17" stroke-width="2.2" fill="none" stroke-linecap="round"/>

  <!-- Right Eye (Slightly narrower, enigmatic) -->
  <ellipse cx="228" cy="175" rx="14" ry="9" fill="#1e1816"/>
  <ellipse cx="228" cy="175" rx="8" ry="8" fill="#78350f"/>
  <ellipse cx="228" cy="175" rx="5" ry="5" fill="#b45309"/>
  <circle cx="225" cy="172" r="2.5" fill="#ffffff"/>
  <path d="M 213 167 Q 228 160 243 168" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Right Eyebrow -->
  <path d="M 214 156 Q 229 148 245 154" stroke="#261b17" stroke-width="2.2" fill="none" stroke-linecap="round"/>

  <!-- Nose -->
  <path d="M 198 180 L 195 204 L 202 205" stroke="#cca48b" stroke-width="1.8" fill="none" stroke-linecap="round"/>

  <!-- Enigmatic Gentle Smile -->
  <path d="M 188 223 Q 200 230 214 222" stroke="#99583d" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 197 228 Q 200 230 205 228" stroke="#d4927b" stroke-width="1.5" fill="none"/>

  <!-- Hair Base & Dynamic Strands (Messy, Wavy Anime Style) -->
  <path d="M 130 160 C 110 110 140 70 200 65 C 270 70 290 110 270 160 C 290 180 295 230 280 240 C 270 220 268 200 265 180 C 255 130 240 100 200 95 C 160 100 145 130 135 180 C 132 200 130 220 120 240 C 105 230 110 180 130 160 Z" fill="url(#hairGrad)"/>
  
  <!-- Front Bangs falling over forehead and framing eyes -->
  <!-- Middle Bang -->
  <path d="M 195 85 Q 200 145 198 178 Q 205 145 210 95 Z" fill="#2d221e"/>
  <!-- Left-center Bang -->
  <path d="M 175 90 Q 180 135 183 165 Q 186 130 190 92 Z" fill="#1f1815"/>
  <!-- Right-center Bang -->
  <path d="M 215 92 Q 212 135 216 168 Q 225 135 228 95 Z" fill="#1f1815"/>
  <!-- Left Side Forelock -->
  <path d="M 150 100 Q 140 145 145 195 Q 155 155 165 115 Z" fill="#2d221e"/>
  <!-- Right Side Forelock -->
  <path d="M 250 100 Q 260 145 255 195 Q 245 155 235 115 Z" fill="#2d221e"/>
  <!-- Top Fluffy Strands -->
  <path d="M 190 68 Q 180 48 202 52 Q 205 65 198 70" fill="#382924"/>
  <path d="M 215 70 Q 235 50 225 65" fill="#382924"/>

  <!-- Ethereal ability particles (Blue & Violet Sparks) -->
  <circle cx="120" cy="140" r="3" fill="#38bdf8" filter="url(#softGlow)"/>
  <circle cx="280" cy="130" r="2.5" fill="#818cf8" filter="url(#softGlow)"/>
  <circle cx="95" cy="260" r="2" fill="#38bdf8" opacity="0.8"/>
  <circle cx="310" cy="270" r="3.5" fill="#38bdf8" filter="url(#softGlow)"/>
</svg>'''

# 2. Anime Fanart 1: Ability Activation "No Longer Human" (人間失格)
dazai_art1_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <radialGradient id="burst" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#2563eb" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#0f172a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#burst)"/>
  <!-- Dynamic Nullification Rays -->
  <path d="M 300 200 L 50 20 M 300 200 L 550 50 M 300 200 L 580 350 M 300 200 L 30 370 M 300 200 L 300 10 M 300 200 L 300 390" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="8 4" opacity="0.6"/>
  
  <!-- Silhouette of Dazai with raised hand nullifying an ability -->
  <circle cx="300" cy="180" r="140" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.7"/>
  <circle cx="300" cy="180" r="90" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.8"/>

  <!-- Character silhouette standing proudly in the light -->
  <path d="M 285 110 Q 300 95 315 110 Q 320 140 315 160 Q 300 170 285 160 Z" fill="#0f172a"/>
  <!-- Coat flowing outwards dramatically -->
  <path d="M 285 160 L 220 380 L 380 380 L 315 160 Z" fill="#090d16"/>
  <path d="M 220 380 Q 170 330 190 240 Q 250 210 285 160 Z" fill="#0f172a" opacity="0.9"/>
  <path d="M 380 380 Q 430 330 410 240 Q 350 210 315 160 Z" fill="#0f172a" opacity="0.9"/>
  
  <!-- Raised hand with glowing touch -->
  <path d="M 315 170 L 370 140 L 385 130" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
  <circle cx="385" cy="130" r="18" fill="#38bdf8" opacity="0.9"/>
  <circle cx="385" cy="130" r="6" fill="#ffffff"/>
  
  <!-- Massive Kanji Watermark -->
  <text x="300" y="270" font-family="'Cinzel', serif, sans-serif" font-size="44" font-weight="900" fill="#e0f2fe" text-anchor="middle" letter-spacing="12" opacity="0.9">人間失格</text>
  <text x="300" y="310" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#7dd3fc" text-anchor="middle" letter-spacing="4">NO LONGER HUMAN • ABILITY NULLIFICATION</text>
</svg>'''

# 3. Anime Fanart 2: Dark Era - Bar Lupin
dazai_art2_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="barGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c130d"/>
      <stop offset="50%" stop-color="#2a1708"/>
      <stop offset="100%" stop-color="#0d0906"/>
    </linearGradient>
    <radialGradient id="lampLight" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#barGlow)"/>
  <rect width="600" height="400" fill="url(#lampLight)"/>

  <!-- Wooden Bar Counter -->
  <path d="M 0 280 L 600 280 L 600 400 L 0 400 Z" fill="#3e2312"/>
  <line x1="0" y1="282" x2="600" y2="282" stroke="#d97706" stroke-width="3" opacity="0.6"/>

  <!-- Whiskey Glass with Sphere Ice (Bar Lupin signature) -->
  <path d="M 380 230 L 440 230 L 430 310 L 390 310 Z" fill="#ca8a04" opacity="0.6" stroke="#fef08a" stroke-width="2"/>
  <circle cx="410" cy="270" r="22" fill="#fef9c3" opacity="0.75"/>
  <ellipse cx="410" cy="230" rx="30" ry="8" fill="#fef08a" opacity="0.8"/>

  <!-- Three Coasters representing Oda, Dazai, Ango -->
  <ellipse cx="220" cy="315" rx="35" ry="10" fill="#78350f" stroke="#d97706" stroke-width="1.5"/>
  <ellipse cx="410" cy="315" rx="35" ry="10" fill="#78350f" stroke="#d97706" stroke-width="1.5"/>
  <ellipse cx="530" cy="315" rx="35" ry="10" fill="#78350f" stroke="#d97706" stroke-width="1.5"/>

  <!-- Dazai Dark Era Silhouette (Eyepatch/Bandage over right eye, Black Executive coat) -->
  <path d="M 120 180 Q 150 140 200 160 Q 230 190 220 280 L 80 280 Z" fill="#17120e"/>
  <path d="M 160 140 Q 180 110 200 140 Q 210 170 190 190 Z" fill="#241b14"/>
  <!-- White Eyepatch bandage ribbon -->
  <line x1="168" y1="145" x2="202" y2="168" stroke="#f1f5f9" stroke-width="4"/>

  <text x="50" y="80" font-family="'Cinzel', serif" font-size="28" fill="#f59e0b" font-weight="bold">BAR LUPIN</text>
  <text x="50" y="110" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#d97706">"To the stray dogs..." • Dark Era 18 y/o</text>
  <text x="50" y="130" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#a1a1aa">Odasaku • Dazai • Ango</text>
</svg>'''

# 4. Anime Fanart 3: Yokohama Harbor Sunset
dazai_art3_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="40%" stop-color="#4c1d95"/>
      <stop offset="70%" stop-color="#c026d3"/>
      <stop offset="90%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#skyGrad)"/>
  
  <!-- Yokohama Landmark Tower & Ferris Wheel Silhouette -->
  <!-- Ferris Wheel (Cosmo Clock 21) -->
  <circle cx="480" cy="240" r="70" fill="none" stroke="#1e1b4b" stroke-width="4"/>
  <circle cx="480" cy="240" r="10" fill="#1e1b4b"/>
  <!-- Harbor Skyline -->
  <path d="M 0 350 L 120 350 L 150 260 L 190 260 L 210 350 L 280 350 L 310 180 L 360 180 L 380 350 L 600 350 L 600 400 L 0 400 Z" fill="#0f0d24"/>
  <path d="M 325 180 L 345 90 L 350 180 Z" fill="#0f0d24"/> <!-- Landmark Tower Spire -->

  <!-- Ocean Reflection -->
  <rect x="0" y="350" width="600" height="50" fill="#1a103c"/>
  <line x1="100" y1="365" x2="500" y2="365" stroke="#f97316" stroke-width="2" opacity="0.7"/>
  <line x1="200" y1="380" x2="450" y2="380" stroke="#fde047" stroke-width="1.5" opacity="0.5"/>

  <!-- Dazai Standing on Agency Rooftop in foreground -->
  <path d="M 90 250 Q 110 200 130 250 L 140 370 L 80 370 Z" fill="#030712"/>
  <path d="M 125 240 Q 170 280 210 250 Q 160 320 125 350 Z" fill="#030712"/> <!-- Trench coat catching harbor breeze -->

  <text x="40" y="60" font-family="'Cinzel', serif" font-size="26" font-weight="bold" fill="#f8fafc">YOKOHAMA TWILIGHT</text>
  <text x="40" y="85" font-family="'Space Grotesk', sans-serif" font-size="13" fill="#cbd5e1">Armed Detective Agency HQ Rooftop</text>
</svg>'''

# 5. Famous Novel 1: No Longer Human (Ningen Shikkaku)
novel1_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bookCover1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="60%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>
  <rect width="300" height="450" rx="12" fill="url(#bookCover1)" stroke="#3f3f46" stroke-width="3"/>
  
  <!-- Spine line -->
  <line x1="24" y1="0" x2="24" y2="450" stroke="#27272a" stroke-width="4"/>

  <!-- Aesthetic Japanese Typography -->
  <rect x="50" y="40" width="200" height="370" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-opacity="0.6"/>
  <rect x="56" y="46" width="188" height="358" fill="none" stroke="#ef4444" stroke-width="0.75" stroke-opacity="0.3"/>

  <text x="150" y="110" font-family="'Cinzel', serif" font-size="16" fill="#a1a1aa" letter-spacing="6" text-anchor="middle">OSAMU DAZAI</text>
  <text x="150" y="180" font-family="'Cinzel', serif" font-size="34" font-weight="900" fill="#f43f5e" letter-spacing="4" text-anchor="middle">人間失格</text>
  <text x="150" y="215" font-family="'Cinzel', serif" font-size="19" font-weight="bold" fill="#f8fafc" letter-spacing="2" text-anchor="middle">NO LONGER HUMAN</text>

  <line x1="80" y1="240" x2="220" y2="240" stroke="#e11d48" stroke-width="2"/>

  <!-- Iconic Quote excerpt -->
  <text x="150" y="280" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">"Mine has been a life of</text>
  <text x="150" y="300" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">much shame."</text>
  <text x="150" y="335" font-family="'Space Grotesk', sans-serif" font-size="10" fill="#71717a" text-anchor="middle">恥の多い生涯を送って来ました。</text>

  <!-- Stamp Seal -->
  <rect x="130" y="360" width="40" height="40" fill="none" stroke="#ef4444" stroke-width="2"/>
  <text x="150" y="385" font-family="'Cinzel', serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">太宰</text>
</svg>'''

# 6. Famous Novel 2: The Setting Sun (Shayo)
novel2_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bookCover2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
  </defs>
  <rect width="300" height="450" rx="12" fill="url(#bookCover2)" stroke="#d97706" stroke-width="2"/>
  <line x1="24" y1="0" x2="24" y2="450" stroke="#92400e" stroke-width="4"/>

  <!-- Sun Graphic -->
  <circle cx="150" cy="180" r="60" fill="#ea580c" opacity="0.8"/>
  <line x1="60" y1="210" x2="240" y2="210" stroke="#fef08a" stroke-width="2"/>

  <text x="150" y="90" font-family="'Cinzel', serif" font-size="15" fill="#fde68a" letter-spacing="4" text-anchor="middle">OSAMU DAZAI</text>
  <text x="150" y="150" font-family="'Cinzel', serif" font-size="34" font-weight="900" fill="#fef08a" text-anchor="middle">斜陽</text>
  <text x="150" y="260" font-family="'Cinzel', serif" font-size="21" font-weight="bold" fill="#ffffff" letter-spacing="3" text-anchor="middle">THE SETTING SUN</text>

  <text x="150" y="310" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">"Victims. A victim of a transitional</text>
  <text x="150" y="330" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">period of morality."</text>
  
  <rect x="135" y="365" width="30" height="30" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="150" y="386" font-family="'Cinzel', serif" font-size="12" fill="#f59e0b" text-anchor="middle">名作</text>
</svg>'''

# 7. Famous Novel 3: Rashomon (Ryunosuke Akutagawa)
novel3_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bookCover3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <rect width="300" height="450" rx="12" fill="url(#bookCover3)" stroke="#6366f1" stroke-width="2"/>
  <line x1="24" y1="0" x2="24" y2="450" stroke="#312e81" stroke-width="4"/>

  <!-- Ancient Gate Graphic -->
  <path d="M 90 200 L 210 200 L 200 250 L 100 250 Z" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
  <line x1="70" y1="200" x2="230" y2="200" stroke="#a5b4fc" stroke-width="3"/>
  <line x1="80" y1="188" x2="220" y2="188" stroke="#a5b4fc" stroke-width="4"/>

  <text x="150" y="85" font-family="'Cinzel', serif" font-size="14" fill="#a5b4fc" letter-spacing="3" text-anchor="middle">RYUNOSUKE AKUTAGAWA</text>
  <text x="150" y="145" font-family="'Cinzel', serif" font-size="34" font-weight="900" fill="#818cf8" text-anchor="middle">羅生門</text>
  <text x="150" y="290" font-family="'Cinzel', serif" font-size="22" font-weight="bold" fill="#ffffff" letter-spacing="3" text-anchor="middle">RASHOMON</text>

  <text x="150" y="340" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#c7d2fe" text-anchor="middle">"Beyond good and evil under</text>
  <text x="150" y="360" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#c7d2fe" text-anchor="middle">the torrential Kyoto rain."</text>
</svg>'''

# 8. Famous Novel 4: Crime and Punishment (Fyodor Dostoevsky)
novel4_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bookCover4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#262626"/>
      <stop offset="50%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="300" height="450" rx="12" fill="url(#bookCover4)" stroke="#eab308" stroke-width="2"/>
  <line x1="24" y1="0" x2="24" y2="450" stroke="#713f12" stroke-width="4"/>

  <!-- Scales of Justice -->
  <line x1="150" y1="140" x2="150" y2="230" stroke="#eab308" stroke-width="3"/>
  <line x1="100" y1="160" x2="200" y2="160" stroke="#eab308" stroke-width="3"/>
  <path d="M 85 190 L 115 190 L 100 215 Z" fill="#ca8a04"/>
  <path d="M 185 190 L 215 190 L 200 215 Z" fill="#ca8a04"/>

  <text x="150" y="85" font-family="'Cinzel', serif" font-size="14" fill="#fde047" letter-spacing="3" text-anchor="middle">FYODOR DOSTOEVSKY</text>
  <text x="150" y="125" font-family="'Cinzel', serif" font-size="28" font-weight="900" fill="#facc15" text-anchor="middle">罪と罰</text>
  <text x="150" y="270" font-family="'Cinzel', serif" font-size="18" font-weight="bold" fill="#ffffff" letter-spacing="2" text-anchor="middle">CRIME &amp; PUNISHMENT</text>
  <text x="150" y="325" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#fef08a" text-anchor="middle">"Pain and suffering are always</text>
  <text x="150" y="345" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#fef08a" text-anchor="middle">inevitable for a large intelligence."</text>
</svg>'''

files = {
    "assets/dazai-pfp.svg": dazai_pfp_svg,
    "assets/dazai-fanart-1.svg": dazai_art1_svg,
    "assets/dazai-fanart-2.svg": dazai_art2_svg,
    "assets/dazai-fanart-3.svg": dazai_art3_svg,
    "assets/novel-no-longer-human.svg": novel1_svg,
    "assets/novel-setting-sun.svg": novel2_svg,
    "assets/novel-rashomon.svg": novel3_svg,
    "assets/novel-crime-punishment.svg": novel4_svg,
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
print("Generated all vector illustrations successfully!")
