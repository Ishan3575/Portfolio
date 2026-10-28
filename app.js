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

  // Novel Data Set
  const NOVEL_DATA = [
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
    }
  ];

  // Anime Fanart & Scene Data Set
  const ANIME_DATA = [
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
      sub: 'Armed Detective Agency HQ',
      img: 'assets/dazai-fanart-3.svg',
      desc: 'Watching over the city after preventing the fall of the Moby Dick.',
      tag: 'Guardian of the Harbor'
    },
    {
      title: 'Osamu Dazai Official Portrait',
      sub: 'Senior Detective',
      img: 'assets/dazai-pfp.svg',
      desc: 'Armed Detective Agency problem solver and underworld chess master.',
      tag: 'Strategic Enigma'
    }
  ];

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initProfileHoverInteractions();
    initHobbyInteractions();
    initCosmicModeButtons();
    initAbilityButton();
    initAudioController();
  });

  // --------------------------------------------------------------------------
  // 1. Left Profile Box Pop-Out & Cosmic Zoom Connection
  // --------------------------------------------------------------------------
  function initProfileProfileTilt() {
    const card = document.querySelector('.profile-card');
    if (!card) return;

    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s ease';
      card.style.transform = `scale(1.48) translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = '';
    });
  }

  let profileHoverCount = 0;
  function initProfileHoverInteractions() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;

    initProfileProfileTilt();

    // Hover triggers: Pop out 1.5X + Zoom into Galaxy Core / Alternating Cosmic Shift!
    profileCard.addEventListener('mouseenter', () => {
      profileHoverCount++;
      if (window.cosmosEngine) {
        window.cosmosEngine.zoomIn(180);

        // Every few hovers, morph cosmic background into different phenomena!
        const phenomena = ['galaxy', 'blackhole', 'supernova', 'nebula'];
        const selected = phenomena[profileHoverCount % phenomena.length];
        window.cosmosEngine.setMode(selected);
      }
      playChimeSound(660); // Ethereal high note
    });

    profileCard.addEventListener('mouseleave', () => {
      if (window.cosmosEngine) {
        window.cosmosEngine.zoomOut();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Hobbies & Dynamic Hologram Popups
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
          renderNovelPreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(300);
            window.cosmosEngine.setMode('galaxy');
          }
          playChimeSound(523.25); // C5
        } else if (type === 'anime') {
          renderAnimePreview(dockTitle, dockSub, cardsGrid);
          previewDock.classList.add('visible');
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(240);
            window.cosmosEngine.setMode('supernova');
          }
          playChimeSound(587.33); // D5
        } else if (type === 'suicide') {
          if (window.cosmosEngine) {
            window.cosmosEngine.zoomIn(220);
            window.cosmosEngine.setMode('blackhole');
          }
          playChimeSound(392.00); // G4
        } else if (type === 'chess') {
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

  function renderNovelPreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `📚 Famous Literature &amp; Influences`;
    subElem.innerText = `OSAMU DAZAI • RYUNOSUKE AKUTAGAWA • FYODOR DOSTOEVSKY`;
    
    gridElem.innerHTML = NOVEL_DATA.map(novel => `
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

  function renderAnimePreview(titleElem, subElem, gridElem) {
    titleElem.innerHTML = `✨ Bungo Stray Dogs &amp; Dazai Fanart Archive`;
    subElem.innerText = `OFFICIAL ART • ABILITY RENDER • YOKOHAMA CHRONICLES`;

    gridElem.innerHTML = ANIME_DATA.map(item => `
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
