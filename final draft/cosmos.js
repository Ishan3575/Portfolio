// ============================================================================
// COSMOS 3D ENGINE - Interactive Live Universe with Dynamic Galaxies & Celestial Phenomena
// Powered by Three.js & Custom Particle Physics
// ============================================================================

(function () {
  'use strict';

  let scene, camera, renderer;
  let galaxyPoints, blackHoleGroup, supernovaGroup, nebulaGroup, backgroundStars;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let currentMode = 'galaxy'; // 'galaxy', 'blackhole', 'supernova', 'nebula'
  let isZoomed = false;
  let clock = new THREE.Clock();

  // Color Palettes
  const GALAXY_COLORS = [
    new THREE.Color('#38bdf8'), // Azure cyan
    new THREE.Color('#818cf8'), // Indigo violet
    new THREE.Color('#c084fc'), // Purple nebula
    new THREE.Color('#f472b6'), // Rose star
    new THREE.Color('#fef08a')  // Stellar gold core
  ];

  function initCosmos() {
    const container = document.getElementById('cosmos-canvas-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      console.warn("THREE library loading, retrying in 50ms...");
      setTimeout(initCosmos, 50);
      return;
    }

    try {
      // Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05060f, 0.0008);

      // Camera
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.set(0, 300, 700);
      camera.lookAt(0, 0, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // Build Universe Layers
      createBackgroundStarfield();
      createSpiralGalaxy();
      createBlackHole();
      createSupernova();
      createNebulaClouds();

      // Event Listeners
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('touchmove', onTouchMove, { passive: true });

      // Expose Global Engine Controller
      window.cosmosEngine = {
        setMode: switchCosmicMode,
        zoomIn: zoomIntoGalaxy,
        zoomOut: resetCosmicZoom,
        pulseAbility: triggerNullificationPulse,
        getMode: () => currentMode
      };

      animate();
    } catch (err) {
      console.error("WebGL unavailable, activating 2D Canvas Cosmos fallback:", err);
      init2DCanvasFallback(container);
    }
  }

  function init2DCanvasFallback(container) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const stars = Array.from({ length: 400 }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
      radius: Math.random() * 2.2 + 0.5,
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * (window.innerWidth * 0.5),
      speed: 0.002 + Math.random() * 0.004,
      color: ['#38bdf8', '#818cf8', '#fef08a', '#c084fc'][Math.floor(Math.random() * 4)]
    }));

    let zoomScale = 1.0;
    let targetZoom = 1.0;

    window.cosmosEngine = {
      setMode: (mode) => { currentMode = mode; },
      zoomIn: () => { targetZoom = 1.6; },
      zoomOut: () => { targetZoom = 1.0; },
      pulseAbility: () => {},
      getMode: () => currentMode
    };

    function render2D() {
      ctx.fillStyle = 'rgba(4, 6, 12, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      zoomScale += (targetZoom - zoomScale) * 0.05;

      stars.forEach(s => {
        s.angle += s.speed;
        const x = cx + Math.cos(s.angle) * s.dist * zoomScale;
        const y = cy + Math.sin(s.angle) * (s.dist * 0.5) * zoomScale;

        ctx.beginPath();
        ctx.arc(x, y, s.radius * zoomScale, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
      });

      requestAnimationFrame(render2D);
    }
    render2D();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // --------------------------------------------------------------------------
  // 1. Distant Background Starfield (Deep Universe)
  // --------------------------------------------------------------------------
  function createBackgroundStarfield() {
    const starCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const colorA = new THREE.Color('#93c5fd');
    const colorB = new THREE.Color('#fbcfe8');
    const colorC = new THREE.Color('#ffffff');

    for (let i = 0; i < starCount; i++) {
      const radius = 1000 + Math.random() * 1800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? colorA : (Math.random() > 0.5 ? colorB : colorC);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      sizes[i] = Math.random() * 2.5 + 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    backgroundStars = new THREE.Points(geometry, material);
    scene.add(backgroundStars);
  }

  // --------------------------------------------------------------------------
  // 2. High-Fidelity Spiral Galaxy (16,000 Stellar Nodes)
  // --------------------------------------------------------------------------
  function createSpiralGalaxy() {
    const params = {
      count: 18000,
      size: 3.2,
      radius: 650,
      branches: 4,
      spin: 1.4,
      randomness: 0.42,
      power: 3.5,
      insideColor: '#fef08a', // Core golden white
      midColor: '#38bdf8',    // Ethereal azure
      outsideColor: '#a855f7' // Deep purple edges
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(params.count * 3);
    const colors = new Float32Array(params.count * 3);

    const colorInside = new THREE.Color(params.insideColor);
    const colorMid = new THREE.Color(params.midColor);
    const colorOutside = new THREE.Color(params.outsideColor);

    for (let i = 0; i < params.count; i++) {
      // Position along branches
      const r = Math.random() * params.radius;
      const spinAngle = r * params.spin * 0.003;
      const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

      // Random dispersion
      const randomX = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * r;
      const randomY = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * (r * 0.4);
      const randomZ = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * r;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation
      const mixedColor = colorInside.clone();
      const ratio = r / params.radius;
      if (ratio < 0.45) {
        mixedColor.lerp(colorMid, ratio / 0.45);
      } else {
        mixedColor.lerp(colorOutside, (ratio - 0.45) / 0.55);
      }

      // Bright core variation
      if (r < 70) {
        mixedColor.addScalar(0.4);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture for soft glow
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(180,220,255,0.7)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: params.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.95
    });

    galaxyPoints = new THREE.Points(geometry, material);
    galaxyPoints.rotation.x = 0.55; // Tilt for aesthetic angle
    galaxyPoints.rotation.z = -0.2;
    scene.add(galaxyPoints);
  }

  // --------------------------------------------------------------------------
  // 3. Gargantua Relativistic Black Hole with Accretion Disk
  // --------------------------------------------------------------------------
  function createBlackHole() {
    blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.set(0, 0, -50);
    blackHoleGroup.visible = false;

    // Event Horizon Sphere (Pure absorbing black void)
    const sphereGeo = new THREE.SphereGeometry(65, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x010204 });
    const eventHorizon = new THREE.Mesh(sphereGeo, sphereMat);
    blackHoleGroup.add(eventHorizon);

    // Glowing Photon Ring
    const photonRingGeo = new THREE.RingGeometry(66, 73, 64);
    const photonRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
    photonRing.rotation.x = Math.PI / 2;
    blackHoleGroup.add(photonRing);

    // Relativistic Glowing Accretion Disk (Particles)
    const diskParticleCount = 8000;
    const diskGeo = new THREE.BufferGeometry();
    const diskPositions = new Float32Array(diskParticleCount * 3);
    const diskColors = new Float32Array(diskParticleCount * 3);

    const innerColor = new THREE.Color('#f59e0b'); // Golden orange
    const outerColor = new THREE.Color('#38bdf8'); // High energy blue
    const hotWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < diskParticleCount; i++) {
      const radius = 75 + Math.pow(Math.random(), 1.5) * 260;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (14 * (radius / 180));

      diskPositions[i * 3] = Math.cos(angle) * radius;
      diskPositions[i * 3 + 1] = height;
      diskPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const norm = (radius - 75) / 260;
      const c = innerColor.clone().lerp(outerColor, norm);
      if (radius < 110) c.lerp(hotWhite, 0.45);

      diskColors[i * 3] = c.r;
      diskColors[i * 3 + 1] = c.g;
      diskColors[i * 3 + 2] = c.b;
    }

    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const accretionDisk = new THREE.Points(diskGeo, diskMat);
    accretionDisk.name = 'accretionDisk';
    blackHoleGroup.add(accretionDisk);

    // Gravitational Lensing Arc (Upper warped ring)
    const upperHaloGeo = new THREE.RingGeometry(80, 160, 64);
    const upperHaloMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const upperHalo = new THREE.Mesh(upperHaloGeo, upperHaloMat);
    upperHalo.rotation.x = Math.PI / 3.8;
    blackHoleGroup.add(upperHalo);

    scene.add(blackHoleGroup);
  }

  // --------------------------------------------------------------------------
  // 4. Stellar Supernova Explosion
  // --------------------------------------------------------------------------
  function createSupernova() {
    supernovaGroup = new THREE.Group();
    supernovaGroup.visible = false;

    const particleCount = 7500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const coreColor = new THREE.Color('#38bdf8'); // Azure shockwave
    const burstColor = new THREE.Color('#ec4899'); // Crimson magenta
    const sparkColor = new THREE.Color('#fbbf24'); // Golden embers

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 25 + Math.random() * 220;

      const dirX = Math.sin(phi) * Math.cos(theta);
      const dirY = Math.sin(phi) * Math.sin(theta);
      const dirZ = Math.cos(phi);

      positions[i * 3] = dirX * (speed * 0.8);
      positions[i * 3 + 1] = dirY * (speed * 0.8);
      positions[i * 3 + 2] = dirZ * (speed * 0.8);

      velocities[i * 3] = dirX * speed;
      velocities[i * 3 + 1] = dirY * speed;
      velocities[i * 3 + 2] = dirZ * speed;

      const rand = Math.random();
      const c = rand < 0.4 ? coreColor : (rand < 0.75 ? burstColor : sparkColor);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    supernovaGroup.userData.velocities = velocities;
    supernovaGroup.userData.originPositions = new Float32Array(positions);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const supernovaPoints = new THREE.Points(geometry, material);
    supernovaGroup.add(supernovaPoints);

    // Glowing shockwave rings
    const ringGeo = new THREE.RingGeometry(10, 18, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const shockRing = new THREE.Mesh(ringGeo, ringMat);
    shockRing.name = 'shockRing';
    supernovaGroup.add(shockRing);

    scene.add(supernovaGroup);
  }

  // --------------------------------------------------------------------------
  // 5. Volumetric Cosmic Nebula Clouds
  // --------------------------------------------------------------------------
  function createNebulaClouds() {
    nebulaGroup = new THREE.Group();
    nebulaGroup.visible = false;

    const cloudCount = 5500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(cloudCount * 3);
    const colors = new Float32Array(cloudCount * 3);

    const color1 = new THREE.Color('#818cf8');
    const color2 = new THREE.Color('#38bdf8');
    const color3 = new THREE.Color('#f43f5e');

    for (let i = 0; i < cloudCount; i++) {
      const radius = 100 + Math.random() * 400;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * 150;

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = ySpread;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 80;

      const pick = Math.random();
      const col = pick < 0.4 ? color1 : (pick < 0.8 ? color2 : color3);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const nebulaPoints = new THREE.Points(geometry, material);
    nebulaGroup.add(nebulaPoints);
    scene.add(nebulaGroup);
  }

  // --------------------------------------------------------------------------
  // Event Handlers & Interactivity
  // --------------------------------------------------------------------------
  function onMouseMove(event) {
    mouse.targetX = (event.clientX - windowHalfX) * 0.45;
    mouse.targetY = (event.clientY - windowHalfY) * 0.45;
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      mouse.targetX = (event.touches[0].clientX - windowHalfX) * 0.35;
      mouse.targetY = (event.touches[0].clientY - windowHalfY) * 0.35;
    }
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // --------------------------------------------------------------------------
  // Cosmic Mode Switching & Dynamic Animations
  // --------------------------------------------------------------------------
  function switchCosmicMode(mode) {
    currentMode = mode;

    // Reset visibility smoothly
    if (window.gsap) {
      gsap.to([galaxyPoints.material, blackHoleGroup, supernovaGroup, nebulaGroup], {
        duration: 0.5,
        onComplete: () => {
          galaxyPoints.visible = (mode === 'galaxy');
          blackHoleGroup.visible = (mode === 'blackhole');
          supernovaGroup.visible = (mode === 'supernova');
          nebulaGroup.visible = (mode === 'nebula');

          if (mode === 'supernova') resetSupernovaParticles();
        }
      });
    } else {
      galaxyPoints.visible = (mode === 'galaxy');
      blackHoleGroup.visible = (mode === 'blackhole');
      supernovaGroup.visible = (mode === 'supernova');
      nebulaGroup.visible = (mode === 'nebula');
      if (mode === 'supernova') resetSupernovaParticles();
    }

    // Update active badge in UI if present
    document.querySelectorAll('[data-cosmic-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cosmicMode === mode);
    });
  }

  function resetSupernovaParticles() {
    const geo = supernovaGroup.children[0].geometry;
    const pos = geo.attributes.position.array;
    const origin = supernovaGroup.userData.originPositions;
    for (let i = 0; i < pos.length; i++) {
      pos[i] = origin[i];
    }
    geo.attributes.position.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // Dynamic Zoom Effect (Triggered on Profile Card / Hobbies Hover)
  // --------------------------------------------------------------------------
  function zoomIntoGalaxy(customTargetZ = 220) {
    isZoomed = true;
    if (window.gsap) {
      gsap.to(camera.position, {
        x: -80,
        y: 60,
        z: customTargetZ,
        duration: 1.4,
        ease: 'power3.out'
      });
      // Accelerate spin effect
      gsap.to(galaxyPoints.rotation, {
        y: galaxyPoints.rotation.y + 0.8,
        duration: 1.2
      });
    } else {
      camera.position.z = customTargetZ;
    }
  }

  function resetCosmicZoom() {
    isZoomed = false;
    if (window.gsap) {
      gsap.to(camera.position, {
        x: 0,
        y: 300,
        z: 700,
        duration: 1.6,
        ease: 'power2.inOut'
      });
    } else {
      camera.position.set(0, 300, 700);
    }
  }

  // --------------------------------------------------------------------------
  // Special Ability "No Longer Human" (人間失格) Particle Ripple Pulse
  // --------------------------------------------------------------------------
  function triggerNullificationPulse() {
    if (!window.gsap) return;

    // Flash background in radiant ethereal azure
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'ability-nullification-flash';
    document.body.appendChild(flashOverlay);

    setTimeout(() => {
      flashOverlay.remove();
    }, 1200);

    // Rapid camera shake and galactic spin
    const currentZ = camera.position.z;
    gsap.timeline()
      .to(camera.position, { z: currentZ - 180, duration: 0.35, ease: 'power2.out' })
      .to(camera.position, { z: currentZ, duration: 0.7, ease: 'elastic.out(1, 0.4)' });

    // Rotate Galaxy rapidly
    gsap.to(galaxyPoints.rotation, {
      y: galaxyPoints.rotation.y + Math.PI,
      duration: 1.8,
      ease: 'power3.out'
    });
  }

  // --------------------------------------------------------------------------
  // Main Render Loop (Smooth Ambient Rotation & Cursor Parallax)
  // --------------------------------------------------------------------------
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Inertial Mouse Parallax Interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    camera.position.x += (mouse.x - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y + (isZoomed ? 60 : 300) - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // 1. Galaxy Ambient Slow Spin
    if (galaxyPoints && galaxyPoints.visible) {
      galaxyPoints.rotation.y += 0.0018 + (isZoomed ? 0.003 : 0);
      galaxyPoints.rotation.x = 0.55 + Math.sin(elapsedTime * 0.4) * 0.03;
    }

    // 2. Black Hole Rotation & Lensing pulse
    if (blackHoleGroup && blackHoleGroup.visible) {
      const disk = blackHoleGroup.getObjectByName('accretionDisk');
      if (disk) {
        disk.rotation.y += 0.012; // Fast relativistic swirl
      }
      blackHoleGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.15;
    }

    // 3. Supernova Expansion Animation
    if (supernovaGroup && supernovaGroup.visible) {
      const geo = supernovaGroup.children[0].geometry;
      const pos = geo.attributes.position.array;
      const vel = supernovaGroup.userData.velocities;
      const shockRing = supernovaGroup.getObjectByName('shockRing');

      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += vel[i] * delta * 0.5;
        pos[i + 1] += vel[i + 1] * delta * 0.5;
        pos[i + 2] += vel[i + 2] * delta * 0.5;

        // Reset if reached outer perimeter
        const dist = Math.sqrt(pos[i] ** 2 + pos[i + 1] ** 2 + pos[i + 2] ** 2);
        if (dist > 480) {
          pos[i] = (Math.random() - 0.5) * 10;
          pos[i + 1] = (Math.random() - 0.5) * 10;
          pos[i + 2] = (Math.random() - 0.5) * 10;
        }
      }
      geo.attributes.position.needsUpdate = true;

      if (shockRing) {
        const ringScale = 1 + (Math.sin(elapsedTime * 3) + 1) * 6;
        shockRing.scale.set(ringScale, ringScale, ringScale);
        shockRing.material.opacity = Math.max(0, 0.9 - ringScale * 0.08);
      }
    }

    // 4. Nebula Clouds Breathing
    if (nebulaGroup && nebulaGroup.visible) {
      nebulaGroup.rotation.y += 0.0012;
      nebulaGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05;
    }

    // 5. Starfield twinkle drift
    if (backgroundStars) {
      backgroundStars.rotation.y -= 0.0003;
    }

    renderer.render(scene, camera);
  }

  // Auto-boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmos);
  } else {
    initCosmos();
  }
})();
