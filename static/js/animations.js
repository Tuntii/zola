// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS.JS - Anime.js Powered Automatic Animations
// ═══════════════════════════════════════════════════════════════════════════════

(function initAnimations() {
  // Wait for anime.js to load
  if (typeof anime === 'undefined') {
    return setTimeout(initAnimations, 50);
  }

  const page = document.querySelector('[data-page]')?.dataset.page || 'home';

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL ANIMATIONS (All Pages)
  // ═══════════════════════════════════════════════════════════════════════════

  // Gradient orbs floating - smooth, slow movement
  anime({
    targets: '.gradient-orb',
    translateY: function() {
      return anime.random(-30, 30);
    },
    translateX: function() {
      return anime.random(-20, 20);
    },
    scale: [1, 1.05],
    duration: 6000,
    delay: anime.stagger(800),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });

  // Status dot breathing pulse
  anime({
    targets: '.status-dot',
    scale: [1, 1.3, 1],
    opacity: [1, 0.6, 1],
    duration: 2000,
    loop: true,
    easing: 'easeInOutQuad'
  });

  // Logo dot subtle pulse
  anime({
    targets: '.logo-dot',
    scale: [1, 1.2, 1],
    duration: 3000,
    loop: true,
    easing: 'easeInOutSine'
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE-SPECIFIC ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const pageAnimations = {
    // ─────────────────────────────────────────────────────────────────────────
    // HOME PAGE
    // ─────────────────────────────────────────────────────────────────────────
    home: function() {
      // Hero name entrance
      anime({
        targets: '.hero-name',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      });

      // Hero bio fade in
      anime({
        targets: '.hero-bio',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 300,
        easing: 'easeOutQuart'
      });

      // Polaroid card gentle float
      anime({
        targets: '.polaroid-card',
        translateY: [-8, 8],
        rotate: [2, 4],
        duration: 5000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });

      // Bento grid cards staggered entrance
      anime({
        targets: '.bento-grid .info-card, .bento-card',
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.95, 1],
        duration: 700,
        delay: anime.stagger(60, { start: 400 }),
        easing: 'easeOutCubic'
      });

      // Work items subtle hover prep
      anime({
        targets: '.work-item',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        delay: anime.stagger(100, { start: 600 }),
        easing: 'easeOutQuart'
      });
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PROJECTS PAGE
    // ─────────────────────────────────────────────────────────────────────────
    projects: function() {
      // Section header entrance
      anime({
        targets: '.section-header',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuart'
      });

      // Project cards slide in from left
      anime({
        targets: '.project-card, .modern-card',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        delay: anime.stagger(100, { start: 200 }),
        easing: 'easeOutQuart'
      });
    },

    // ─────────────────────────────────────────────────────────────────────────
    // BLOG PAGE
    // ─────────────────────────────────────────────────────────────────────────
    blog: function() {
      // Blog posts fade up
      anime({
        targets: '.modern-card',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 500,
        delay: anime.stagger(75, { start: 150 }),
        easing: 'easeOutCubic'
      });
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ŞİİRLER (POETRY) PAGE - Melankolik, Yavaş, Derin
    // ─────────────────────────────────────────────────────────────────────────
    poetry: function() {
      // Create poetry particles (floating dust motes)
      createPoetryParticles();

      // Slow, melancholic card entrance
      anime({
        targets: '.modern-card',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1200, // Slower for poetry
        delay: anime.stagger(150, { start: 300 }),
        easing: 'easeOutQuart'
      });

      // Shimmer effect on accent elements
      anime({
        targets: '.poetry-shimmer',
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.1, 1],
        duration: 8000,
        loop: true,
        easing: 'easeInOutSine'
      });

      // Section title with gold shimmer
      anime({
        targets: '.section-title',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuart'
      });

      // Orbs move more slowly and dreamily
      anime({
        targets: '[data-page="poetry"] .gradient-orb',
        translateY: function() {
          return anime.random(-20, 20);
        },
        translateX: function() {
          return anime.random(-15, 15);
        },
        duration: 10000, // Much slower
        delay: anime.stagger(1500),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    },

    // ─────────────────────────────────────────────────────────────────────────
    // DÜŞÜNCELER (THOUGHTS) PAGE - Contemplatif, Kozmik, Derin
    // ─────────────────────────────────────────────────────────────────────────
    thoughts: function() {
      // Create twinkling stars
      createThoughtsStars();

      // Thought cards fade in gently
      anime({
        targets: '.modern-card, .thought-card',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: anime.stagger(120, { start: 200 }),
        easing: 'easeOutQuart'
      });

      // Nebula clouds slow rotation
      anime({
        targets: '.thoughts-nebula-cloud',
        rotate: function() {
          return anime.random(-5, 5);
        },
        scale: [1, 1.05, 1],
        opacity: [0.1, 0.2, 0.1],
        duration: 15000,
        delay: anime.stagger(3000),
        loop: true,
        easing: 'easeInOutSine'
      });

      // Moonlight pulse
      anime({
        targets: '[data-page="thoughts"] .atmosphere::before',
        opacity: [0.05, 0.12, 0.05],
        scale: [1, 1.1, 1],
        duration: 12000,
        loop: true,
        easing: 'easeInOutSine'
      });

      // Deep breathing orbs
      anime({
        targets: '[data-page="thoughts"] .gradient-orb',
        scale: [1, 1.08, 1],
        opacity: [0.2, 0.35, 0.2],
        duration: 8000,
        delay: anime.stagger(2000),
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  };

  // Execute page-specific animation
  if (pageAnimations[page]) {
    pageAnimations[page]();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  // Create floating particles for Poetry page
  function createPoetryParticles() {
    const atmosphere = document.querySelector('.atmosphere');
    if (!atmosphere) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'poetry-particles';
    atmosphere.appendChild(particleContainer);

    // Create 12 floating particles
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'poetry-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: radial-gradient(circle, rgba(201, 162, 39, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        pointer-events: none;
      `;
      particleContainer.appendChild(particle);

      // Animate each particle
      anime({
        targets: particle,
        translateY: [0, -window.innerHeight - 100],
        translateX: function() {
          return anime.random(-50, 50);
        },
        rotate: [0, anime.random(90, 270)],
        opacity: [0, 0.6, 0.6, 0],
        duration: 12000 + Math.random() * 8000,
        delay: i * 1200,
        loop: true,
        easing: 'linear'
      });
    }

    // Create shimmer element
    const shimmer = document.createElement('div');
    shimmer.className = 'poetry-shimmer';
    shimmer.style.cssText = `
      position: absolute;
      top: 15%;
      right: 10%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(201, 162, 39, 0.3) 0%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
    `;
    atmosphere.appendChild(shimmer);
  }

  // Create twinkling stars for Thoughts page
  function createThoughtsStars() {
    const atmosphere = document.querySelector('.atmosphere');
    if (!atmosphere) return;

    // Create star container
    const starContainer = document.createElement('div');
    starContainer.className = 'thoughts-stars';
    starContainer.style.cssText = `
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    `;
    atmosphere.appendChild(starContainer);

    // Create 25 stars
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('div');
      const size = 1 + Math.random() * 2;
      star.className = 'thoughts-star';
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(226, 232, 240, 0.8);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
      `;
      starContainer.appendChild(star);

      // Twinkle animation
      anime({
        targets: star,
        opacity: [0.2, 0.9, 0.2],
        scale: [1, 1.3, 1],
        duration: 2000 + Math.random() * 3000,
        delay: Math.random() * 3000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Create 3 bright stars
    for (let i = 0; i < 3; i++) {
      const brightStar = document.createElement('div');
      brightStar.className = 'thoughts-star-bright';
      brightStar.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #E2E8F0;
        border-radius: 50%;
        top: ${10 + Math.random() * 60}%;
        left: ${10 + Math.random() * 80}%;
        box-shadow: 0 0 8px rgba(226, 232, 240, 0.8), 0 0 16px rgba(226, 232, 240, 0.4);
        pointer-events: none;
      `;
      starContainer.appendChild(brightStar);

      // Bright star twinkle
      anime({
        targets: brightStar,
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.5, 1],
        boxShadow: [
          '0 0 8px rgba(226, 232, 240, 0.8), 0 0 16px rgba(226, 232, 240, 0.4)',
          '0 0 16px rgba(226, 232, 240, 1), 0 0 32px rgba(226, 232, 240, 0.6)',
          '0 0 8px rgba(226, 232, 240, 0.8), 0 0 16px rgba(226, 232, 240, 0.4)'
        ],
        duration: 4000 + Math.random() * 2000,
        delay: Math.random() * 2000,
        loop: true,
        easing: 'easeInOutQuad'
      });
    }

    // Create nebula clouds
    for (let i = 0; i < 2; i++) {
      const nebula = document.createElement('div');
      nebula.className = 'thoughts-nebula-cloud';
      nebula.style.cssText = `
        position: absolute;
        width: ${300 + Math.random() * 150}px;
        height: ${200 + Math.random() * 100}px;
        background: linear-gradient(${Math.random() * 360}deg, 
          rgba(100, 116, 139, 0.15) 0%, 
          rgba(26, 54, 93, 0.1) 50%,
          transparent 100%);
        border-radius: 50%;
        filter: blur(80px);
        top: ${i === 0 ? '10%' : '60%'};
        ${i === 0 ? 'left: 15%' : 'right: 10%'};
        pointer-events: none;
      `;
      atmosphere.appendChild(nebula);
    }
  }

})();
