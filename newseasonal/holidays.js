/*
Holiday Effects - Customizable seasonal overlay for Jellyfin
testing in the web dev console by the following
enable debug output with

window.debugHolidayEffects()


window.setHolidayEffect({ holiday: 'bonfireNight', disableVideoCheck: false });

replace bonfireNight with whatever holidayConfig name you are wanting to test and change false to true if you dont want it to dissapear on playback of a video
*/
(function(window, document) {

  const style = document.createElement('style');
  style.textContent = `
    .wobble {
      animation: wobble 2s ease-in-out infinite;
    }
    @keyframes wobble {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(5px); }
    }
    .walk {
      animation: walk 0.5s ease-in-out infinite !important;
    }
    @keyframes walk {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
    .zombie {
      width: 20px !important;
      height: auto !important;
      position: absolute !important;
      z-index: 100001 !important;
    }
    .firework,
    .firework::before,
    .firework::after {
      --initialSize: 0.5vmin;
      --finalSize: 45vmin;
      --particleSize: 0.2vmin;
      --y: -30vmin;
      --x: -50%;
      --initialY: 60vmin;
      content: "";
      animation: firework 2s infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, var(--y));
      width: var(--initialSize);
      aspect-ratio: 1;
      background: 
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 50% 0%,
        radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
        radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 100%,
        radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 50%,
        radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 80% 90%,
        radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 95% 90%,
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 90% 70%,
        radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 60%,
        radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 55% 80%,
        radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 70% 77%,
        radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 22% 90%,
        radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 45% 90%,
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 33% 70%,
        radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 10% 60%,
        radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 31% 80%,
        radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 28% 77%,
        radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 13% 72%,
        radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 80% 10%,
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 95% 14%,
        radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 90% 23%,
        radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 100% 43%,
        radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 85% 27%,
        radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 77% 37%,
        radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 60% 7%,
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 22% 14%,
        radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 45% 20%,
        radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 33% 34%,
        radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 10% 29%,
        radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 31% 37%,
        radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 28% 7%,
        radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 13% 42%;
      background-size: var(--initialSize) var(--initialSize);
      background-repeat: no-repeat;
    }
    .firework::before {
      --x: -50%;
      --y: -50%;
      --initialY: -50%;
      transform: translate(-50%, -50%) rotate(40deg) scale(1.3) rotateY(40deg);
    }
    .firework::after {
      --x: -50%;
      --y: -50%;
      --initialY: -50%;
      transform: translate(-50%, -50%) rotate(170deg) scale(1.15) rotateY(-30deg);
    }
    @keyframes firework {
      0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
      50% { width: 0.5vmin; opacity: 1; }
      100% { width: var(--finalSize); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Holiday configurations
  const holidayConfigs = {
    christmas: {
      dateRange: { start: { month: 11, day: 11 }, end: { month: 0, day: 2 } },
      symbols: ['•', '❆', '❅'],
      colors: ['#ffffff', '#e0f7fa', '#b3e5fc'],
      maxParticles: 1000,
      fallSpeed: 1 + Math.random(),
      useLedges: true,
      stickProbability: 0.15,
      animation: 'fall'
    },
    valentines: {
      dateRange: { start: { month: 1, day: 1 }, end: { month: 1, day: 15 } },
      symbols: ['♥'],
      colors: ['#ff0000', '#ff69b4', '#ffc1cc'],
      maxParticles: 1000,
      fallSpeed: 1.5,
      useLedges: true,
      stickProbability: 0.15,
      animation: 'fall'
    },
    easter: {
      dateRange: { start: { month: 2, day: 15 }, end: { month: 3, day: 15 } },
      symbols: ['🌸', '🐰'],
      colors: ['#ffb6c1', '#98fb98', '#add8e6'],
      maxParticles: 1000,
      fallSpeed: 0.8,
      useLedges: false,
      stickProbability: 0,
      animation: 'wobble'
    },
    halloween: {
      dateRange: { start: { month: 9, day: 15 }, end: { month: 9, day: 31 } },
      colors: ['#3cb371', '#696969', '#228b22'],
      maxParticles: 1,
      fallSpeed: 2.0,
      useLedges: true,
      stickProbability: 1.0,
      animation: 'fall'
    },
    bonfireNight: {
      dateRange: { start: { month: 10, day: 1 }, end: { month: 10, day: 7 } },
      colors: [
        ['yellow', 'khaki', 'white', 'lime', 'gold', 'mediumseagreen'],
        ['pink', 'violet', 'fuchsia', 'orchid', 'plum', 'lavender'],
        ['cyan', 'lightcyan', 'lightblue', 'PaleTurquoise', 'SkyBlue', 'lavender']
      ],
      maxParticles: 0,
      fireworkFrequency: 0.02
    },
    stPatricks: {
      dateRange: { start: { month: 2, day: 10 }, end: { month: 2, day: 18 } },
      symbols: ['☘️'],
      colors: ['#008000', '#00ff00', '#ffd700'],
      maxParticles: 1000,
      fallSpeed: 1.3,
      useLedges: true,
      stickProbability: 0.15,
      animation: 'fall'
    }
  };

  // Check if current date is within a holiday range
  const now = new Date();
  const year = now.getFullYear();
  let activeHoliday = null;

  function isDateInRange(holiday) {
    const start = new Date(year, holiday.dateRange.start.month, holiday.dateRange.start.day);
    const end = new Date(holiday.dateRange.end.month === 0 ? year + 1 : year, holiday.dateRange.end.month, holiday.dateRange.end.day);
    return now >= start && now <= end;
  }

  for (const [key, config] of Object.entries(holidayConfigs)) {
    if (isDateInRange(config)) {
      activeHoliday = key;
      break;
    }
  }

  // Allow manual holiday override
  let currentConfig = activeHoliday ? holidayConfigs[activeHoliday] : null;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '100000';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);
  console.log('Overlay created:', overlay);

  // Customizable settings
  let intensity = 1.0;
  let customColors = null;
  let customSymbols = null;
  let customAnimation = null;
  let customFireworkFrequency = null;
  let disableVideoCheck = false;
  let animationFrameId = null;

  // Memory management
  const MEMORY_LIMIT = 104857600; // 100MB in bytes
  const MEMORY_THRESHOLD = MEMORY_LIMIT * 0.9; // 90MB
  const ZOMBIE_MEMORY = 500000; // 500KB per zombie
  const FLAKE_MEMORY = 10000; // 10KB per snowflake/firework
  let estimatedMemory = 0;

  function estimateMemoryUsage() {
    if (window.performance && window.performance.memory) {
      return window.performance.memory.usedJSHeapSize;
    }
    return particles.length * (currentConfig === holidayConfigs.halloween ? ZOMBIE_MEMORY : FLAKE_MEMORY) +
           fireworks.length * FLAKE_MEMORY;
  }

  function removeOldestParticles(count) {
    const sortedParticles = particles.slice().sort((a, b) => a.created - b.created);
    for (let i = 0; i < count && sortedParticles.length > 0; i++) {
      const particle = sortedParticles[i];
      if (particle.el && particle.el.parentNode) {
        particle.el.parentNode.removeChild(particle.el);
      }
      particle.el = null;
      if (particle.ledge) {
        const flakeIndex = particle.ledge.flakes.indexOf(particle);
        if (flakeIndex !== -1) particle.ledge.flakes.splice(flakeIndex, 1);
      }
      const particleIndex = particles.indexOf(particle);
      if (particleIndex !== -1) particles.splice(particleIndex, 1);
      estimatedMemory -= currentConfig === holidayConfigs.halloween ? ZOMBIE_MEMORY : FLAKE_MEMORY;
      console.log('Removed oldest particle, Remaining:', particles.length);
    }
    if (currentConfig === holidayConfigs.halloween && particles.length === 0) {
      createParticle();
    }
  }

  // Global control function
  window.setHolidayEffect = (options = {}) => {
    console.log('setHolidayEffect called with:', options);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    particles.forEach(p => {
      if (p.el && p.el.parentNode) p.el.parentNode.removeChild(p.el);
      p.el = null;
    });
    particles.length = 0;
    fireworks.forEach(f => {
      if (f.el && f.el.parentNode) f.el.parentNode.removeChild(f.el);
      f.el = null;
    });
    fireworks.length = 0;
    ledges.forEach(ledge => {
      ledge.flakes.forEach(f => {
        if (f.el && f.el.parentNode) f.el.parentNode.removeChild(f.el);
        f.el = null;
      });
      ledge.flakes.length = 0;
    });
    ledges.length = 0;
    estimatedMemory = 0;

    if (options.holiday && holidayConfigs[options.holiday]) {
      activeHoliday = options.holiday;
      currentConfig = holidayConfigs[activeHoliday];
      console.log('Active holiday set to:', activeHoliday, 'Config:', currentConfig);
      const config = currentConfig || { maxParticles: 1000 };
      if (config === holidayConfigs.halloween) {
        createParticle();
      } else if (config !== holidayConfigs.bonfireNight) {
        for (let i = 0; i < Math.floor(config.maxParticles / 10); i++) {
          createParticle();
        }
      }
      updateParticles();
    }
    intensity = options.intensity ? Math.max(0, Math.min(options.intensity, 5)) : intensity;
    customColors = options.colors || customColors;
    customSymbols = options.symbols || customSymbols;
    customAnimation = options.animation || customAnimation;
    customFireworkFrequency = options.fireworkFrequency !== undefined ? Math.max(0, Math.min(options.fireworkFrequency, 0.1)) : customFireworkFrequency;
    disableVideoCheck = options.disableVideoCheck !== undefined ? options.disableVideoCheck : disableVideoCheck;
  };

  // Debug function
  window.debugHolidayEffects = () => {
    return {
      activeHoliday,
      currentConfig,
      particleCount: particles.length,
      fireworkCount: fireworks.length,
      overlayDisplay: overlay.style.display,
      ledges: ledges.length,
      domParticleCount: overlay.querySelectorAll('*').length + document.querySelectorAll('.card > *, .itemCard > *').length,
      estimatedMemory: estimateMemoryUsage(),
      hasVideos: document.querySelectorAll('video').length,
      fireworkStyles: fireworks[0] ? {
        top: fireworks[0].el?.style.top,
        left: fireworks[0].el?.style.left,
        finalSize: fireworks[0].el?.style.getPropertyValue('--finalSize'),
        colors: [
          fireworks[0].el?.style.getPropertyValue('--color1'),
          fireworks[0].el?.style.getPropertyValue('--color2'),
          fireworks[0].el?.style.getPropertyValue('--color3'),
          fireworks[0].el?.style.getPropertyValue('--color4'),
          fireworks[0].el?.style.getPropertyValue('--color5'),
          fireworks[0].el?.style.getPropertyValue('--color6')
        ]
      } : null,
      sampleParticle: particles[0] ? { 
        y: particles[0].y, 
        x: particles[0].x, 
        top: particles[0].el?.style.top, 
        left: particles[0].el?.style.left, 
        state: particles[0].state,
        direction: particles[0].direction,
        src: particles[0].el?.src,
        stuck: particles[0].stuck,
        hasParent: !!particles[0].el?.parentNode,
        created: particles[0].created
      } : null,
      getParticles: () => particles.map(p => ({
        x: p.x, y: p.y, state: p.state, stuck: p.stuck, hasParent: !!p.el?.parentNode, created: p.created
      }))
    };
  };

  // Check if video is playing
  const isVideoActive = () => {
    if (disableVideoCheck) return false;
    const videos = document.querySelectorAll('video');
    return Array.from(videos).some(video => {
      const style = window.getComputedStyle(video);
      const visible = style.display !== 'none' && style.visibility !== 'hidden';
      return visible && !video.paused && !video.ended;
    });
  };

  // Initialize ledges for Jellyfin
  let lastLedgeUpdate = 0;
  function getLedges() {
    if (!currentConfig?.useLedges) return [];
    const now = Date.now();
    if (now - lastLedgeUpdate < 1000) return ledges;
    lastLedgeUpdate = now;
    const elements = document.querySelectorAll('.card, .itemCard');
    console.log('Ledges found:', elements.length);
    return Array.from(elements).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        y: rect.top + window.scrollY,
        left: rect.left,
        right: rect.left + rect.width,
        width: rect.width,
        flakes: []
      };
    });
  }

  let ledges = getLedges();
  const particles = [];
  const fireworks = [];

  function createParticle() {
    if (!currentConfig) {
      console.log('No particles to create: no config');
      return;
    }
    const config = currentConfig || { maxParticles: 1000, fallSpeed: 1.5, colors: ['#ffffff'], symbols: customSymbols || ['*'], animation: customAnimation || 'fall' };
    if (particles.length >= config.maxParticles) {
      console.log('Particle limit reached:', particles.length);
      return;
    }
    if (estimateMemoryUsage() > MEMORY_THRESHOLD) {
      const toRemove = Math.ceil((estimateMemoryUsage() - MEMORY_THRESHOLD) / (config === holidayConfigs.halloween ? ZOMBIE_MEMORY : FLAKE_MEMORY));
      removeOldestParticles(toRemove);
    }
    let particle;

    if (config === holidayConfigs.halloween) {
      particle = document.createElement('img');
      particle.className = 'zombie';
      particle.src = '/web/zombiewalkright.gif';
      particle.onerror = () => {
        console.error('Failed to load zombie GIF:', particle.src);
        particle.src = '';
        particle.innerHTML = '🧟';
        particle.onerror = null;
      };
    } else {
      if (!config.symbols && !customSymbols) {
        console.log('No symbols for particle creation');
        return;
      }
      particle = document.createElement('div');
      const symbols = customSymbols || config.symbols;
      particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    }

    particle.style.position = 'absolute';
    particle.style.color = customColors ? customColors[Math.floor(Math.random() * customColors.length)] : config.colors[Math.floor(Math.random() * config.colors.length)];
    if (config !== holidayConfigs.halloween) {
      particle.style.fontSize = `${Math.random() * 10 + 10}px`;
    }
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `-${Math.random() * 20}px`;
    particle.style.opacity = config.animation === 'sparkle' ? Math.random() * 0.5 + 0.5 : '1';

    let particleObj = {
      el: particle,
      x: parseFloat(particle.style.left),
      y: parseFloat(particle.style.top),
      speed: config.fallSpeed,
      created: Date.now(),
      stuck: false,
      animation: config.animation
    };

    if (config === holidayConfigs.halloween) {
      particleObj.state = 'falling';
      particleObj.direction = Math.random() < 0.5 ? 'left' : 'right';
      particleObj.walkSpeed = 1.0;
      particleObj.ledge = null;
    } else if (config.animation === 'wobble') {
      particle.classList.add('wobble');
    }

    try {
      overlay.appendChild(particle);
      particles.push(particleObj);
      estimatedMemory += config === holidayConfigs.halloween ? ZOMBIE_MEMORY : FLAKE_MEMORY;
      console.log('Created particle:', config === holidayConfigs.halloween ? particle.src : particle.innerHTML, 'Total particles:', particles.length, 'Estimated memory:', estimatedMemory);
    } catch (e) {
      console.error('Error creating particle:', e);
      particle = null;
    }
  }

  function createFirework() {
    if (!currentConfig || activeHoliday !== 'bonfireNight') {
      console.log('Firework creation skipped: not Bonfire Night');
      return;
    }
    if (fireworks.length >= 10) {
      console.log('Firework limit reached:', fireworks.length);
      return;
    }
    if (estimateMemoryUsage() > MEMORY_THRESHOLD) {
      removeOldestParticles(1);
    }
    const config = currentConfig;
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 100}%`;
    const colorPalettes = customColors || config.colors;
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const finalSize = 35 + Math.random() * 10;
    const delay = -(Math.random() * 0.5);
    firework.style.setProperty('--finalSize', `${finalSize}vmin`);
    firework.style.setProperty('--color1', palette[0]);
    firework.style.setProperty('--color2', palette[1]);
    firework.style.setProperty('--color3', palette[2]);
    firework.style.setProperty('--color4', palette[3]);
    firework.style.setProperty('--color5', palette[4]);
    firework.style.setProperty('--color6', palette[5]);
    firework.style.animationDelay = `${delay}s`;
    try {
      overlay.appendChild(firework);
      fireworks.push({
        el: firework,
        created: Date.now()
      });
      estimatedMemory += FLAKE_MEMORY;
      console.log('Created firework at:', firework.style.left, firework.style.top, 'Total fireworks:', fireworks.length, 'Estimated memory:', estimatedMemory);
    } catch (e) {
      console.error('Error creating firework:', e);
      firework = null;
    }
  }

  function updateParticles() {
    try {
      if (!currentConfig && !customSymbols) {
        console.log('No active holiday or custom symbols, stopping animation');
        return;
      }
      const config = currentConfig || { maxParticles: 1000, fallSpeed: 1.5, colors: ['#ffffff'], symbols: customSymbols || ['*'], animation: customAnimation || 'fall', useLedges: false, stickProbability: 0, fireworkFrequency: 0 };

      if (isVideoActive() || (particles.length === 0 && activeHoliday !== 'bonfireNight')) {
        overlay.style.display = 'none';
        console.log('Overlay hidden due to video or no particles');
        animationFrameId = requestAnimationFrame(updateParticles);
        return;
      } else {
        overlay.style.display = 'block';
        console.log('Overlay visible for:', activeHoliday);
      }

      ledges = getLedges();
      console.log('Ledges count:', ledges.length);

      particles.forEach(particle => {
        if (particle.stuck || !particle.el || !particle.el.parentNode) return;

        if (config === holidayConfigs.halloween) {
          if (particle.state === 'falling') {
            particle.y += particle.speed;
            particle.el.style.top = `${particle.y}px`;

            for (const ledge of ledges) {
              const ledgeTop = ledge.el.getBoundingClientRect().top + window.scrollY;
              const elLeft = ledge.el.getBoundingClientRect().left;
              const elRight = elLeft + ledge.el.offsetWidth;
              if (
                particle.y >= ledgeTop - 10 &&
                particle.y <= ledgeTop + 2 &&
                particle.x >= elLeft &&
                particle.x <= elRight &&
                Math.random() < 0.7
              ) {
                particle.state = 'walking';
                particle.ledge = ledge;
                particle.y = ledgeTop;
                particle.el.style.top = `${particle.y}px`;
                particle.direction = Math.random() < 0.5 ? 'left' : 'right';
                particle.el.src = particle.direction === 'left' ? '/web/zombiewalkleft.gif' : '/web/zombiewalkright.gif';
                particle.el.classList.add('walk');
                ledge.flakes.push(particle);
                particle.el.parentNode.removeChild(particle.el);
                ledge.el.appendChild(particle.el);
                particle.el.style.top = '0px';
                particle.el.style.left = `${particle.x - elLeft}px`;
                console.log('Zombie landed on ledge:', particle.x, ledge.left, ledge.right, 'Direction:', particle.direction);
                break;
              }
            }
          } else if (particle.state === 'walking') {
            particle.x += particle.direction === 'right' ? particle.walkSpeed : -particle.walkSpeed;
            particle.el.style.left = `${particle.x - particle.ledge.el.getBoundingClientRect().left}px`;

            const ledge = particle.ledge;
            const ledgeLeft = ledge.el.getBoundingClientRect().left;
            const ledgeRight = ledgeLeft + ledge.el.offsetWidth;
            if (particle.x < ledgeLeft || particle.x > ledgeRight) {
              particle.state = 'falling';
              const flakeIndex = ledge.flakes.indexOf(particle);
              if (flakeIndex !== -1) ledge.flakes.splice(flakeIndex, 1);
              particle.el.parentNode.removeChild(particle.el);
              overlay.appendChild(particle.el);
              particle.el.style.top = `${particle.y}px`;
              particle.el.style.left = `${particle.x}px`;
              particle.ledge = null;
              particle.el.classList.remove('walk');
              console.log('Zombie fell off ledge:', particle.x, ledgeLeft, ledgeRight);
            }
          }

          if (particle.y > window.innerHeight) {
            console.log('Zombie respawning at top (off-screen)');
            if (particle.el && particle.el.parentNode) particle.el.parentNode.removeChild(particle.el);
            particle.el = null;
            const particleIndex = particles.indexOf(particle);
            if (particleIndex !== -1) particles.splice(particleIndex, 1);
            if (particle.ledge) {
              const flakeIndex = particle.ledge.flakes.indexOf(particle);
              if (flakeIndex !== -1) particle.ledge.flakes.splice(flakeIndex, 1);
            }
            estimatedMemory -= ZOMBIE_MEMORY;
            createParticle();
            console.log('Zombie respawned');
          }
        } else {
          if (config.animation === 'sparkle') {
            particle.opacity = Math.random() * 0.5 + 0.5;
            particle.el.style.opacity = particle.opacity;
            particle.y += particle.speed * (Math.random() * 0.5 + 0.5);
          } else {
            particle.y += particle.speed;
          }
          particle.el.style.top = `${particle.y}px`;
        }

        console.log('Updated particle:', { 
          y: particle.y, 
          x: particle.x, 
          state: particle.state, 
          top: particle.el?.style.top, 
          left: particle.el?.style.left, 
          src: config === holidayConfigs.halloween ? particle.el?.src : null,
          stuck: particle.stuck,
          hasParent: !!particle.el?.parentNode,
          created: particle.created
        });

        if (config.useLedges && config !== holidayConfigs.halloween) {
          ledges.forEach(ledge => {
            const ledgeTop = ledge.el.getBoundingClientRect().top;
            const elLeft = ledge.el.getBoundingClientRect().left;
            const elRight = elLeft + ledge.el.offsetWidth;
            if (
              particle.y >= ledgeTop - 5 &&
              particle.y <= ledgeTop + 2 &&
              particle.x >= elLeft &&
              particle.x <= elRight &&
              Math.random() < config.stickProbability
            ) {
              particle.stuck = true;
              ledge.flakes.push(particle);
              particle.el.parentNode.removeChild(particle.el);
              ledge.el.appendChild(particle.el);
              particle.el.style.top = '0px';
              particle.el.style.left = `${particle.x - elLeft}px`;
              console.log('Particle stuck to ledge');
            }
          });
        }
      });

      ledges.forEach(ledge => {
        for (let i = ledge.flakes.length - 1; i >= 0; i--) {
          const particle = ledge.flakes[i];
          if (Date.now() - particle.created > 60000 || !particle.el) {
            if (particle.el && particle.el.parentNode) particle.el.parentNode.removeChild(particle.el);
            particle.el = null;
            ledge.flakes.splice(i, 1);
            const particleIndex = particles.indexOf(particle);
            if (particleIndex !== -1) particles.splice(particleIndex, 1);
            estimatedMemory -= config === holidayConfigs.halloween ? ZOMBIE_MEMORY : FLAKE_MEMORY;
            if (config === holidayConfigs.halloween) {
              console.log('Zombie expired, respawning');
              createParticle();
            }
            console.log('Removed expired particle');
          }
        }
      });

      const targetParticles = Math.floor(config.maxParticles * intensity);
      const activeParticles = particles.filter(p => !p.stuck).length;
      if (activeParticles < targetParticles && overlay.style.display !== 'none' && config !== holidayConfigs.halloween && config !== holidayConfigs.bonfireNight) {
        if (Math.random() < 0.01 && estimateMemoryUsage() < MEMORY_THRESHOLD) {
          createParticle();
        }
      }

      if (activeHoliday === 'bonfireNight' && overlay.style.display !== 'none') {
        if (Math.random() < (customFireworkFrequency !== null ? customFireworkFrequency : config.fireworkFrequency)) {
          console.log('Attempting to create firework');
          createFirework();
        }
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        if (Date.now() - firework.created > 2000 || !firework.el) {
          if (firework.el && firework.el.parentNode) firework.el.parentNode.removeChild(firework.el);
          firework.el = null;
          fireworks.splice(i, 1);
          estimatedMemory -= FLAKE_MEMORY;
          console.log('Removed expired firework');
        }
      }

      console.log('Active particles:', activeParticles, 'Fireworks:', fireworks.length, 'DOM nodes in overlay:', overlay.querySelectorAll('*').length, 'Estimated memory:', estimateMemoryUsage());
    } catch (e) {
      console.error('Error in updateParticles:', e);
    }
    animationFrameId = requestAnimationFrame(updateParticles);
  }

})(window, document);
