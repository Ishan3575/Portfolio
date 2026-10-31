# Osamu Dazai • Cosmic Portfolio 🌌

An aesthetic, interactive cosmic-themed portfolio built around the persona of **Osamu Dazai** (*Bungo Stray Dogs* — Armed Detective Agency strategist & ex-Port Mafia executive).

---

## What We Built & Implemented

- **Interactive 3D Universe Engine**: Powered by Three.js with floating celestial bodies, orbital particle dust, and real-time mouse parallax.
- **Dynamic 50+ Deep-Space Backgrounds**: Curated high-resolution universe pool (galaxies, nebulae, and black holes) with gentle drift motion and randomized sequence transitions.
- **Horizontal Expanding Profile Box**: Sleek detective card on the left that smoothly expands horizontally (1.38× wider, up to 720px) on hover without twitching or layout shift.
- **Typewriter Effect & Audio Synthesizer**: Realistic character-by-character typing animation with mechanical audio clacks and toggleable cosmic ambient background audio.
- **Contextual Yokohama Case Dossiers**: Hoverable hobby and lore cards (Literature, Anime Art, Suicide Philosophy, Tactical Mind Games) that display live contextual dossier information.
- **Ability Nullification ("No Longer Human")**: Interactive particle shockwave trigger with visual chromatic aberration and audio feedback.
- **Clean Production Assets**: Offline vendor fallbacks for Three.js and GSAP, URL-safe asset paths, and complete snapshot archived in `final draft/`.

---

## Project Structure

```text
├── index.html        # Main HTML structure with semantic sections and glassmorphism UI
├── style.css         # Modern styling, neon glow accents, fluid grid, and animations
├── app.js            # Core interactive logic, typewriter engine, and dynamic background switcher
├── cosmos.js         # Three.js 3D space particle simulation with 2D canvas fallback
├── images/           # Curated space pool, black holes, and Dazai profile art
├── assets/           # Vector icons and novel covers
└── final draft/      # Complete archived snapshot of the final portfolio build
```

---

## Live Demo & Usage

1. Open in any modern web browser or run a simple local HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
2. Navigate to `http://localhost:8080` in your browser.
