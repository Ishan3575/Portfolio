// ==========================================================================
// OSAMU DAZAI PORTFOLIO - Interactive App Controller
// Handles Hover Triggers, Holographic Art Previews, Web Audio & Dynamic Cosmos
// ==========================================================================

(function () {
  'use strict';

  // State Management
  let isAudioEnabled = false;
  let audioCtx = null;
  let ambientDroneGain = null;
  let previewTimeout = null;
  let typewriterTimeouts = [];

  // User Space & Galaxy Curated Image Collections (from images/)
  const USER_BLACK_HOLE_IMAGES = [
    'images/black_hole_1.jpeg',
    'images/black_hole_2.jpeg',
    'images/black_hole_3.jpeg',
    'images/black_hole_4.jpeg',
    'images/black_hole_5.jpeg'
  ];

  const USER_GALAXY_IMAGES = [
    'images/galaxy_1.jpeg',
    'images/galaxy_2.jpeg',
    'images/galaxy_3.jpeg',
    'images/galaxy_4.jpeg',
    'images/galaxy_5.jpeg',
    'images/galaxy_6.jpeg',
    'images/galaxy_7.jpeg',
    'images/galaxy_8.jpeg'
  ];

  const USER_SPACE_IMAGES = [
    'images/space_1.jpeg',
    'images/space_2.jpeg',
    'images/space_3.jpeg',
    'images/space_4.jpeg',
    'images/space_5.jpeg'
  ];

  // Helper: Get random items from array
  function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Curated Literature Dataset (with dynamic random novel art & quotes)
  const NOVEL_DATA_POOL = [
    {
      title: 'No Longer Human',
      kanji: '人間失格',
      author: 'Osamu Dazai',
      img: 'assets/novel-no-longer-human.svg',
      quote: '“Mine has been a life of much shame. I can’t even guess what it must be to live the life of a human being.”',
      theme: 'Existential Isolation & Vulnerability'
    },
    {
      title: 'The Setting Sun',
      kanji: '斜陽',
      author: 'Osamu Dazai',
      img: 'assets/novel-setting-sun.svg',
      quote: '“Victims. A victim of a transitional period of morality. That is what we both certainly are.”',
      theme: 'Decline of Aristocracy & Passion'
    },
    {
      title: 'Rashomon',
      kanji: '羅生門',
      author: 'Ryunosuke Akutagawa',
      img: 'assets/novel-rashomon.svg',
      quote: '“Beyond good and evil under the desolate Kyoto twilight.”',
      theme: 'Psychological Duality & Survival'
    },
    {
      title: 'Crime & Punishment',
      kanji: '罪と罰',
      author: 'Fyodor Dostoevsky',
      img: 'assets/novel-crime-punishment.svg',
      quote: '“Pain and suffering are always inevitable for a large intelligence and a deep heart.”',
      theme: 'Guilt, Redemption & Rationality'
    },
    {
      title: 'Run, Melos!',
      kanji: '走れメロス',
      author: 'Osamu Dazai',
      img: 'assets/novel-setting-sun.svg',
      quote: '“True friendship is sworn not in words, but through unbreakable resolve.”',
      theme: 'Loyalty & Human Faith'
    },
    {
      title: 'The Schoolgirl',
      kanji: '女生徒',
      author: 'Osamu Dazai',
      img: 'assets/novel-no-longer-human.svg',
      quote: '“Tomorrow will probably be another day like today. Happiness will never come.”',
      theme: 'Poignant Melancholy & Consciousness'
    }
  ];

  // Curated Dazai Anime Art & Scene Dataset (incorporating your selected Dazai image + arts)
  const ANIME_DATA_POOL = [
    {
      title: 'Osamu Dazai Portrait',
      sub: 'Official Armed Detective Agency Art',
      img: 'images/dazai%20fanart.jpg',
      desc: 'Enigmatic senior strategist gazing across Yokohama.',
      tag: 'Strategic Enigma'
    },
    {
      title: 'No Longer Human (人間失格)',
      sub: 'Ability Nullification',
      img: 'assets/dazai-fanart-1.svg',
      desc: 'Azure nullification aura shattering enemy abilities on contact.',
      tag: 'Combat & Nullification'
    },
    {
      title: 'Bar Lupin (Dark Era)',
      sub: 'Age 18 • Port Mafia',
      img: 'assets/dazai-fanart-2.svg',
      desc: 'A quiet toast with Odasaku and Ango in the Yokohama underground.',
      tag: 'Memory & Loyalty'
    },
    {
      title: 'Yokohama Twilight Harbor',
      sub: 'Agency HQ Rooftop',
      img: 'assets/dazai-fanart-3.svg',
      desc: 'Watching over the city after preventing the fall of the Moby Dick.',
      tag: 'Guardian of the Harbor'
    },
    {
      title: 'Double Suicide Reverie',
      sub: 'River Seine & Tsurumi Stream',
      img: 'images/dazai%20fanart.jpg',
      desc: 'Floating peacefully downstream while contemplating life and eternity.',
      tag: 'Philosophical Musings'
    }
  ];

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicCosmicBackgrounds();
    initProfileHoverInteractions();
    initHobbyInteractions();
    initCosmicModeButtons();
    initAbilityButton();
    initAudioController();
  });

  // --------------------------------------------------------------------------
  // High-Resolution Space Imagery & Dynamic 50+ Randomized Universe Pool
  // Default permanent background: Ultra-high quality dark deep space
  // --------------------------------------------------------------------------
  const PERMANENT_DARK_SPACE = 'images/cosmic_deep_dark.jpg';

  const SECTION_COSMIC_THEMES = {
    novel: 'images/cosmic_galaxy_4k.jpg',
    anime: 'images/cosmic_supernova_4k.jpg',
    suicide: 'images/cosmic_blackhole_4k.jpg',
    chess: 'images/cosmic_nebula_4k.jpg',
    profile: 'images/cosmic_deep_dark.jpg',
    default: 'images/cosmic_deep_dark.jpg'
  };

  // Grand 50+ High-Resolution Dark Cosmic Library
  const GRAND_UNIVERSE_POOL = [
    'images/cosmic_deep_dark.jpg',
    'images/cosmic_galaxy_4k.jpg',
    'images/cosmic_nebula_4k.jpg',
    'images/cosmic_supernova_4k.jpg',
    'images/cosmic_blackhole_4k.jpg',
    'images/universe_pool/space_dark_01.jpg',
    'images/universe_pool/space_dark_02.jpg',
    'images/universe_pool/space_dark_03.jpg',
    'images/universe_pool/space_dark_04.jpg',
    'images/universe_pool/space_dark_05.jpg',
    'images/universe_pool/space_dark_06.jpg',
    'images/universe_pool/space_dark_07.jpg',
    'images/universe_pool/space_dark_08.jpg',
    'images/universe_pool/space_dark_09.jpg',
    'images/universe_pool/space_dark_10.jpg',
    'images/universe_pool/space_dark_11.jpg',
    'images/universe_pool/space_dark_12.jpg',
    'images/universe_pool/space_dark_13.jpg',
    'images/universe_pool/space_dark_14.jpg',
    'images/universe_pool/space_dark_15.jpg',
    'images/universe_pool/space_dark_16.jpg',
    'images/universe_pool/space_dark_17.jpg',
    'images/universe_pool/space_dark_19.jpg',
    'images/universe_pool/space_dark_20.jpg',
    'images/universe_pool/space_dark_21.jpg',
    'images/universe_pool/space_dark_22.jpg',
    'images/universe_pool/space_dark_23.jpg',
    'images/universe_pool/space_dark_24.jpg',
    'images/universe_pool/space_dark_25.jpg',
    'images/universe_pool/space_dark_26.jpg',
    'images/universe_pool/space_dark_27.jpg',
    'images/universe_pool/space_dark_28.jpg',
    'images/universe_pool/space_dark_29.jpg',
    'images/universe_pool/space_dark_30.jpg',
    'images/black_hole_1.jpeg',
    'images/black_hole_2.jpeg',
    'images/black_hole_3.jpeg',
    'images/black_hole_4.jpeg',
    'images/black_hole_5.jpeg',
    'images/galaxy_1.jpeg',
    'images/galaxy_2.jpeg',
    'images/galaxy_3.jpeg',
    'images/galaxy_4.jpeg',
    'images/galaxy_5.jpeg',
    'images/galaxy_6.jpeg',
    'images/galaxy_7.jpeg',
    'images/galaxy_8.jpeg',
    'images/space_1.jpeg',
    'images/space_2.jpeg',
    'images/space_3.jpeg',
    'images/space_4.jpeg',
    'images/space_5.jpeg'
  ];

  // Shuffled randomized queue to prevent consecutive repeats
  let shuffledBackgroundSequence = [];
  let shuffleSequencePointer = 0;

  function getNextRandomizedUniverseImage() {
    if (shuffledBackgroundSequence.length === 0 || shuffleSequencePointer >= shuffledBackgroundSequence.length) {
      shuffledBackgroundSequence = [...GRAND_UNIVERSE_POOL].sort(() => Math.random() - 0.5);
      shuffleSequencePointer = 0;
    }
    const selected = shuffledBackgroundSequence[shuffleSequencePointer];
    shuffleSequencePointer++;
    return selected;
  }

  let activeSlide = 'a';

  function initDynamicCosmicBackgrounds() {
    const slideA = document.querySelector('.cosmic-bg-slide.slide-a');
    const slideB = document.querySelector('.cosmic-bg-slide.slide-b');
    if (!slideA || !slideB) return;

    // Set permanent high-resolution deep space dark image by default
    slideA.style.backgroundImage = `url("${PERMANENT_DARK_SPACE}")`;
    slideA.classList.add('active');

    // Subtle automatic slow rotation between random images every 16 seconds
    setInterval(() => {
      const nextRandomCosmos = getNextRandomizedUniverseImage();
      rotateCosmicBackground(nextRandomCosmos);
    }, 16000);
  }

  function rotateCosmicBackground(specificImg = null) {
    const slideA = document.querySelector('.cosmic-bg-slide.slide-a');
    const slideB = document.querySelector('.cosmic-bg-slide.slide-b');
    if (!slideA || !slideB) return;

    const nextImg = specificImg || getNextRandomizedUniverseImage();

    if (activeSlide === 'a') {
      slideB.style.backgroundImage = `url("${nextImg}")`;
      slideB.classList.add('active');
      slideA.classList.remove('active');
      activeSlide = 'b';
    } else {
      slideA.style.backgroundImage = `url("${nextImg}")`;
      slideA.classList.add('active');
      slideB.classList.remove('active');
      activeSlide = 'a';
    }
  }

  // --------------------------------------------------------------------------
  // Procedural Web Audio API: Typewriter Key Clack Sound Synthesizer
  // Creates an authentic mechanical typewriter keystroke clack with subtle variation
  // --------------------------------------------------------------------------
  function playTypewriterKeyClick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // Realistic mechanical key-clack: short burst of filtered noise + rapid acoustic click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Slightly randomize frequency to mimic different mechanical key heights
      const baseFreq = 1600 + Math.random() * 800;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Audio permission graceful fallback
    }
  }

  // --------------------------------------------------------------------------
  // 1. Left Profile Box Pop-Out & Typewriter Effect on Hover
  // --------------------------------------------------------------------------
  function triggerTypewriterEffect() {
    clearTypewriterEffect();
    const typeElements = document.querySelectorAll('.type-field');

    typeElements.forEach(el => {
      const fullText = el.getAttribute('data-type-text') || el.innerText;
      el.innerHTML = '<span class="typing-cursor"></span>';
      let currentIdx = 0;

      const typeChar = () => {
        if (currentIdx <= fullText.length) {
          el.innerHTML = fullText.slice(0, currentIdx) + '<span class="typing-cursor"></span>';
          
          // Play mechanical typewriter click sound on each typed letter
          if (currentIdx > 0 && currentIdx % 2 === 0) {
            playTypewriterKeyClick();
          }

          currentIdx++;
          const timeout = setTimeout(typeChar, 20 + Math.random() * 22);
          typewriterTimeouts.push(timeout);
        } else {
          el.innerHTML = fullText;
        }
      };

      const delayTimeout = setTimeout(typeChar, 70 + Math.random() * 90);
      typewriterTimeouts.push(delayTimeout);
    });
  }

  function clearTypewriterEffect() {
    typewriterTimeouts.forEach(t => clearTimeout(t));
    typewriterTimeouts = [];
    const typeElements = document.querySelectorAll('.type-field');
    typeElements.forEach(el => {
      const fullText = el.getAttribute('data-type-text');
      if (fullText) el.innerText = fullText;
    });
  }

  let profileHoverCount = 0;
  function initProfileHoverInteractions() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;

    // Hover triggers: horizontal landscape expansion + typewriter reveal + cosmic zoom & shift!
    profileCard.addEventListener('mouseenter', () => {
      profileHoverCount++;
      triggerTypewriterEffect();

      // Trigger profile cosmic background change
      rotateCosmicBackground(SECTION_COSMIC_THEMES.profile);

      if (window.cosmosEngine) {
        window.cosmosEngine.zoomIn(180);

        // Morph cosmic background seamlessly through universe anomalies!
        const phenomena = ['galaxy', 'blackhole', 'supernova', 'nebula'];
        const selected = phenomena[profileHoverCount % phenomena.length];
        window.cosmosEngine.setMode(selected);
      }
      playChimeSound(660); // Ethereal high note
    });

    profileCard.addEventListener('mouseleave', () => {
      clearTypewriterEffect();
      rotateCosmicBackground(PERMANENT_DARK_SPACE);
      if (window.cosmosEngine) {
        window.cosmosEngine.zoomOut();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Hobbies & Dynamic Random Space Hologram Popups
  // --------------------------------------------------------------------------
  function initHobbyInteractions() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const previewDock = document.getElementById('hologram-preview-dock');
    const dockTitle = document.getElementById('preview-dock-title-text');
    const dockSub = document.getElementById('preview-dock-sub-text');
    const cardsGrid = document.getElementById('preview-grid-cards');

    if (!previewDock || !cardsGrid) return;

    hobbyCards.forEach(card => {
      const type = card.dataset.hobbyType;

      card.addEventListener('mouseenter', () => {
        clearTimeout(previewTimeout);

        if (type === 'novel') {
          rotateCosmicBackground(SECTION_COSMIC_THEMES.novel);
          renderNovelPreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(300);
            window.cosmosEngine.setMode('galaxy');
          }
          playChimeSound(523.25); // C5
        } else if (type === 'anime') {
          rotateCosmicBackground(SECTION_COSMIC_THEMES.anime);
          renderAnimePreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(240);
            window.cosmosEngine.setMode('supernova');
          }
          playChimeSound(587.33); // D5
        } else if (type === 'suicide') {
          rotateCosmicBackground(SECTION_COSMIC_THEMES.suicide);
          renderSuicidePhilosophyPreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(220);
            window.cosmosEngine.setMode('blackhole');
          }
          playChimeSound(392.00); // G4
        } else if (type === 'chess') {
          rotateCosmicBackground(SECTION_COSMIC_THEMES.chess);
          renderChessDeductionPreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(280);
            window.cosmosEngine.setMode('nebula');
          }
          playChimeSound(440.00); // A4
        }
      });

      card.addEventListener('mouseleave', () => {
        previewTimeout = setTimeout(() => {
          previewDock.classList.remove('visible');
          rotateCosmicBackground(PERMANENT_DARK_SPACE);
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomOut();
          }
        }, 1200);
      });
    });

    // Keep preview open if user hovers directly over the preview dock
    previewDock.addEventListener('mouseenter', () => {
      clearTimeout(previewTimeout);
    });

    previewDock.addEventListener('mouseleave', () => {
      previewTimeout = setTimeout(() => {
        previewDock.classList.remove('visible');
        if (window.cosmosEngine) {
          window.cosmosEngine.zoomOut();
        }
      }, 400);
    });
  }

  // 1. Novel Literature Preview (Randomized each hover)
  function renderNovelPreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `📚 Famous Literature &amp; Influences`;
    subElem.innerText = `OSAMU DAZAI • RYUNOSUKE AKUTAGAWA • FYODOR DOSTOEVSKY`;
    
    const randomNovels = getRandomItems(NOVEL_DATA_POOL, 4);

    gridElem.innerHTML = randomNovels.map(novel => `
      <div class="preview-art-card">
        <div class="preview-art-img-wrap">
          <img src="${novel.img}" alt="${novel.title}" loading="lazy">
        </div>
        <div class="preview-art-details">
          <div class="preview-art-title">${novel.title}</div>
          <div class="preview-art-meta">${novel.author}</div>
          <div style="font-size: 0.68rem; color: #94a3b8; margin-top: 0.35rem; font-style: italic;">
            ${novel.quote}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Anime & Dazai Fanart Preview (Randomized each hover with your Dazai artwork)
  function renderAnimePreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `✨ Bungo Stray Dogs &amp; Dazai Fanart Archive`;
    subElem.innerText = `OFFICIAL ART • ABILITY RENDER • YOKOHAMA CHRONICLES`;

    const randomAnime = getRandomItems(ANIME_DATA_POOL, 4);

    gridElem.innerHTML = randomAnime.map(item => `
      <div class="preview-art-card">
        <div class="preview-art-img-wrap">
          <img src="${item.img}" alt="${item.title}" loading="lazy">
        </div>
        <div class="preview-art-details">
          <div class="preview-art-title">${item.title}</div>
          <div class="preview-art-meta">${item.sub}</div>
          <div style="font-size: 0.68rem; color: #94a3b8; margin-top: 0.35rem;">
            ${item.desc}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 3. Suicide Philosophy Info Dossier (Data & Lore instead of generic images)
  function renderSuicidePhilosophyPreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `🌊 Suicide Philosophy • Dossier &amp; Lore`;
    subElem.innerText = `OSAMU DAZAI • THE SEARCH FOR A POETIC DEPARTURE`;

    const suicideData = [
      {
        badge: 'Core Ideology',
        title: 'The Guide to Suicide',
        desc: 'Relentlessly researching the iconic red-covered handbook for painless and poetic ways to exit existence.',
        meta: 'Favorite Reading Material'
      },
      {
        badge: 'Prerequisite',
        title: 'Lover’s Double Suicide',
        desc: 'Adamantly refusing single suicide: “A double suicide is impossible alone! It must be with an alluring partner.”',
        meta: 'Shinjuu (心中) Custom'
      },
      {
        badge: 'Underlying Pain',
        title: 'Existential Emptiness',
        desc: 'A profound psychological alienation from mankind: feeling too deeply the suffering and hypocrisy of mortals.',
        meta: 'No Longer Human Core'
      },
      {
        badge: 'Paradox of Life',
        title: 'Survival Instinct',
        desc: 'Despite eccentric suicidal attempts, constantly saving allies and orchestrating brilliant survival masterplans.',
        meta: 'Armed Agency Guardian'
      }
    ];

    gridElem.innerHTML = suicideData.map(item => `
      <div class="feature-info-card">
        <div class="feature-info-badge">${item.badge}</div>
        <div class="feature-info-title">${item.title}</div>
        <div class="feature-info-desc">${item.desc}</div>
        <div class="feature-info-meta">${item.meta}</div>
      </div>
    `).join('');
  }

  // 4. Tactical Chess & Grandmaster Deduction (Data & Lore instead of generic images)
  function renderChessDeductionPreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `♟️ Tactical Chess &amp; Strategic Supremacy`;
    subElem.innerText = `YOKOHAMA STRATEGIC DOSSIER • MIND GAMES &amp; DEDUCTION`;

    const chessData = [
      {
        badge: 'Grandmaster Foresight',
        title: '50 Moves Ahead',
        desc: 'Anticipates opponent moves weeks in advance, engineering traps that adversaries walk into voluntarily.',
        meta: 'Predicted Guild War Outcome'
      },
      {
        badge: 'Meursault Mental Duel',
        title: 'Heartbeat Cryptography',
        desc: 'Communicated across maximum-security isolation cells with Ango using coded pulse rhythms to defeat Fyodor.',
        meta: 'Vs. Fyodor Dostoevsky'
      },
      {
        badge: 'Dual Alignment',
        title: 'Tripartite Strategy',
        desc: 'Masterminded the secret alliance between the Special Ability Division, Armed Agency, and Port Mafia.',
        meta: 'Yokohama Tripartite Pact'
      },
      {
        badge: 'Human Chess Pieces',
        title: 'Mentorship & Synergy',
        desc: 'Unleashed the legendary Soukoku (Double Black) with Chuya and shaped the New Soukoku (Atsushi & Akutagawa).',
        meta: 'Twin Dark Architecture'
      }
    ];

    gridElem.innerHTML = chessData.map(item => `
      <div class="feature-info-card">
        <div class="feature-info-badge">${item.badge}</div>
        <div class="feature-info-title">${item.title}</div>
        <div class="feature-info-desc">${item.desc}</div>
        <div class="feature-info-meta">${item.meta}</div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // 3. Cosmic Mode Pill Buttons
  // --------------------------------------------------------------------------
  function initCosmicModeButtons() {
    const buttons = document.querySelectorAll('[data-cosmic-mode]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.cosmicMode;
        if (window.cosmosEngine) {
          window.cosmosEngine.setMode(mode);
        }
        playChimeSound(600);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Ability Activation Button: "No Longer Human" (人間失格)
  // --------------------------------------------------------------------------
  function initAbilityButton() {
    const abilityBtns = document.querySelectorAll('.trigger-ability');
    abilityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.cosmosEngine) {
          window.cosmosEngine.pulseAbility();
        }
        playAbilityNullificationSound();
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Procedural Web Audio API Ambient Cosmos Soundscape & Chimes
  // Zero external audio files required! Synthesized in-browser!
  // --------------------------------------------------------------------------
  function initAudioController() {
    const audioBtn = document.getElementById('toggle-audio-btn');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setupAmbientDrone();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isAudioEnabled = !isAudioEnabled;

      if (isAudioEnabled) {
        audioBtn.innerHTML = `🔊 Cosmos Ambient: ON`;
        audioBtn.classList.add('active');
        if (ambientDroneGain) {
          ambientDroneGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 1.5);
        }
        playChimeSound(440);
      } else {
        audioBtn.innerHTML = `🔇 Cosmos Ambient: OFF`;
        audioBtn.classList.remove('active');
        if (ambientDroneGain) {
          ambientDroneGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
        }
      }
    });
  }

  function setupAmbientDrone() {
    if (!audioCtx) return;

    // Dual Detuned Sine Oscillators for Ethereal Deep Space Drone
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    ambientDroneGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note (55 Hz deep space hum)

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.5, audioCtx.currentTime); // A2 slight detune for shimmering harmonic beat

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    ambientDroneGain.gain.setValueAtTime(0, audioCtx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(ambientDroneGain);
    ambientDroneGain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
  }

  function playChimeSound(freq = 520) {
    if (!isAudioEnabled || !audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.25);
  }

  function playAbilityNullificationSound() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Resonant sweep sound for ability nullification
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(120, now + 1.0);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(5.0, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.25);
  }

})();
