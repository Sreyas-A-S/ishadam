

document.addEventListener('DOMContentLoaded', () => {

  initSmoothScroll();

  // Orchestrated Preloader Lifecycle:
  // Guarantees the authentic paint stroke drawing (1.55s) + inner bloom + golden flourish fully completes
  const preloader = document.getElementById('preloader');
  const preloaderStartTime = performance.now();
  const MIN_STROKE_ANIMATION_TIME = 2100; // 0.25s delay + 1.55s draw + 0.3s flourish

  let isWindowLoaded = (document.readyState === 'complete');
  let isPreloaderDismissed = false;

  function dismissPreloader() {
    if (!preloader || isPreloaderDismissed) return;
    isPreloaderDismissed = true;

    // Trigger golden completion bloom on the emblem
    preloader.classList.add('stroke-finished');

    // Hold the completed sacred emblem for 400ms before dissolving into homepage
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(triggerWindLeaves, 300);
    }, 420);
  }

  function handlePreloaderReady() {
    const elapsed = performance.now() - preloaderStartTime;
    const remaining = Math.max(0, MIN_STROKE_ANIMATION_TIME - elapsed);

    setTimeout(() => {
      dismissPreloader();
    }, remaining);
  }

  if (isWindowLoaded) {
    handlePreloaderReady();
  } else {
    window.addEventListener('load', () => {
      isWindowLoaded = true;
      handlePreloaderReady();
    });
  }

  // Safety fallback so user is never trapped if a slow external resource hangs
  setTimeout(() => {
    if (!isPreloaderDismissed) {
      dismissPreloader();
    }
  }, 4500);

  if (window.lucide) {
    lucide.createIcons();
  }

  const sacredSpins = document.querySelectorAll('.sacred-swastik-spin');
  if (sacredSpins.length > 0 && ('IntersectionObserver' in window)) {
    const swastikObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -20px 0px'
    });

    sacredSpins.forEach(el => swastikObserver.observe(el));
  }

  // Snappy Blur-in animations for Service cards and Section Headings
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
      gsap.fromTo(serviceCards,
        { filter: 'blur(8px)', opacity: 0, y: 20 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'filter',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    const blurHeadings = document.querySelectorAll('.blur-in-heading');
    blurHeadings.forEach(heading => {
      gsap.fromTo(heading,
        { filter: 'blur(8px)', opacity: 0, y: 16 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'filter',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }

  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    const cornerLeaves = servicesSection.querySelectorAll('.services-corner-leaf');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cornerLeaves.forEach(leaf => leaf.classList.add('is-visible'));
        } else {
          cornerLeaves.forEach(leaf => leaf.classList.remove('is-visible'));
        }
      });
    }, {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.12
    });
    observer.observe(servicesSection);
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const mainNav = document.getElementById('mainNav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (!mainNav) return;
    const currentScrollY = window.scrollY;

    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      return;
    }

    if (currentScrollY > 60 && currentScrollY > lastScrollY) {
      mainNav.style.transform = 'translateY(-100%)';
    } else {
      mainNav.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  const productModal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBuyBtn = document.getElementById('modalBuyBtn');

  window.openProductModal = function(title, subtitle, imgSrc, desc) {
    if (!productModal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalSubtitle) modalSubtitle.textContent = subtitle;
    if (modalImg) modalImg.src = imgSrc;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalBuyBtn) {
      modalBuyBtn.href = `https://wa.me/918138881308?text=Hello%20Ishadam,%20I%20am%20interested%20in%20purchasing%20the%20${encodeURIComponent(title)}%20(${encodeURIComponent(subtitle)})`;
    }
    productModal.classList.remove('hidden');
  };

  window.closeProductModal = function() {
    if (productModal) {
      productModal.classList.add('hidden');
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && !productModal.classList.contains('hidden')) {
      window.closeProductModal();
    }
  });

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        window.closeProductModal();
      }
    });
  }

  // Mobile 3D Services Carousel
  initServices3DCarousel();

  // Interactive Foliage Ripple & Falling Leaves
  initFoliageHoverParticles();

  initWildRollercoasterVine();
});

function initServices3DCarousel() {
  const container = document.getElementById('services3dCarousel');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.services-3d-card'));
  const dots = Array.from(container.querySelectorAll('.services-dot'));
  if (cards.length === 0) return;

  let currentIndex = 0;
  const total = cards.length;

  function updateCarousel(newIndex) {
    currentIndex = (newIndex + total) % total;

    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next', 'hidden-card');
      if (i === currentIndex) {
        card.classList.add('active');
      } else if (i === (currentIndex - 1 + total) % total) {
        card.classList.add('prev');
      } else if (i === (currentIndex + 1) % total) {
        card.classList.add('next');
      } else {
        card.classList.add('hidden-card');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.remove('bg-stone-300');
        dot.classList.add('bg-[#966D1B]', 'w-6');
      } else {
        dot.classList.remove('bg-[#966D1B]', 'w-6');
        dot.classList.add('bg-stone-300', 'w-2.5');
      }
    });
  }

  // Click on cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index, 10);
      if (idx !== currentIndex) {
        updateCarousel(idx);
      }
    });
  });

  // Click on dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide, 10);
      updateCarousel(idx);
    });
  });

  // Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        updateCarousel(currentIndex + 1); // Swipe left -> next
      } else {
        updateCarousel(currentIndex - 1); // Swipe right -> prev
      }
    }
  }, { passive: true });

  updateCarousel(0);
}

function initFoliageHoverParticles() {
  const foliageLeaves = document.querySelectorAll('.corner-leaf-tl, .corner-leaf-tr, .corner-leaf-bl, .corner-leaf-br, .services-corner-leaf');
  if (foliageLeaves.length === 0) return;

  const leafSprites = [
    'assets/images/leaf-single-green-1-thumb.webp',
    'assets/images/leaf-single-green-2-thumb.webp',
    'assets/images/leaf-single-green-3-thumb.webp',
    'assets/images/leaf-single-green-4-thumb.webp'
  ];

  foliageLeaves.forEach(leaf => {
    leaf.classList.add('interactive-foliage');

    let isCooldown = false;

    const triggerLeaf = (e) => {
      if (isCooldown) return;
      isCooldown = true;
      setTimeout(() => { isCooldown = false; }, 400);

      const rect = leaf.getBoundingClientRect();
      const spawnX = e.clientX || (rect.left + rect.width * 0.5);
      const spawnY = e.clientY || (rect.top + rect.height * 0.4);

      const p = document.createElement('img');
      const randomSprite = leafSprites[Math.floor(Math.random() * leafSprites.length)];
      p.src = randomSprite;
      p.className = 'falling-leaf-particle';
      const size = Math.floor(Math.random() * 12) + 20; // 20px - 32px
      p.style.width = `${size}px`;
      p.style.height = 'auto';
      p.style.left = `${spawnX}px`;
      p.style.top = `${spawnY}px`;

      document.body.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      }, 2500);
    };

    leaf.addEventListener('mouseenter', (e) => {
      leaf.classList.remove('foliage-rustling');
      void leaf.offsetWidth; // re-trigger single impulse animation
      leaf.classList.add('foliage-rustling');
      triggerLeaf(e);
    });

    leaf.addEventListener('animationend', () => {
      leaf.classList.remove('foliage-rustling');
    });

    leaf.addEventListener('click', triggerLeaf);
  });
}

function initWildRollercoasterVine() {
  const container = document.getElementById('rollercoasterVine');
  if (container) {
    container.classList.remove('hidden');
    container.style.display = 'block';
  }

  const spine = document.getElementById('vineSpine');
  const spineShadow = document.getElementById('vineSpineShadow');
  const leavesGroup = document.getElementById('vineLeavesSvgGroup');
  const sproutsGroup = document.getElementById('vineSproutsGroup');
  if (!spine || !leavesGroup || !container) return;

  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 420 : 1440;

  const rollerSvg = document.getElementById('rollerSvg');
  if (rollerSvg) {
    rollerSvg.setAttribute('viewBox', `0 0 ${width} 2400`);
  }

  const pathD = isMobile ? `
    M -20,-30
    C 80,60 180,120 210,240
    C 240,360 140,480 80,580
    C 30,680 50,780 120,890
    C 190,1000 280,1080 320,1200
    C 360,1320 300,1460 210,1580
    C 120,1700 80,1820 160,1940
    C 240,2060 290,2150 200,2260
    C 120,2340 30,2380 -20,2420
  ` : `
    M -40,-40
    C 160,80 320,160 380,260
    C 440,360 310,480 180,560
    C 40,650 20,740 90,850
    C 170,970 360,1040 560,1120
    C 840,1230 1150,1180 1260,1320
    C 1380,1470 1280,1640 1080,1740
    C 840,1860 520,1880 340,1980
    C 180,2070 80,2140 -30,2240
  `;

  spine.setAttribute('d', pathD);
  if (spineShadow) spineShadow.setAttribute('d', pathD);

  const totalLen = spine.getTotalLength();
  spine.style.strokeDasharray = totalLen;
  spine.style.strokeDashoffset = totalLen;
  if (spineShadow) {
    spineShadow.style.strokeDasharray = totalLen;
    spineShadow.style.strokeDashoffset = totalLen;
  }

  const leafAssets = [
    'assets/images/vine-leaf-1.webp',
    'assets/images/vine-leaf-2.webp',
    'assets/images/vine-leaf-3.webp',
    'assets/images/vine-leaf-4.webp'
  ];

  const scaleFactor = isMobile ? 0.65 : 1.0;

  const nodeDistributions = [
    { pct: 0.05, asset: 0, normalSide: 1,  size: Math.round(75 * scaleFactor) },
    { pct: 0.11, asset: 1, normalSide: -1, size: Math.round(70 * scaleFactor) },
    { pct: 0.17, asset: 2, normalSide: 1,  size: Math.round(85 * scaleFactor) },
    { pct: 0.23, asset: 3, normalSide: -1, size: Math.round(80 * scaleFactor) },
    { pct: 0.29, asset: 0, normalSide: 1,  size: Math.round(75 * scaleFactor) },
    { pct: 0.35, asset: 1, normalSide: -1, size: Math.round(88 * scaleFactor) },
    { pct: 0.42, asset: 2, normalSide: 1,  size: Math.round(78 * scaleFactor) },
    { pct: 0.49, asset: 3, normalSide: -1, size: Math.round(82 * scaleFactor) },
    { pct: 0.56, asset: 0, normalSide: 1,  size: Math.round(90 * scaleFactor) },
    { pct: 0.63, asset: 1, normalSide: -1, size: Math.round(76 * scaleFactor) },
    { pct: 0.70, asset: 2, normalSide: 1,  size: Math.round(84 * scaleFactor) },
    { pct: 0.78, asset: 3, normalSide: -1, size: Math.round(80 * scaleFactor) },
    { pct: 0.86, asset: 0, normalSide: 1,  size: Math.round(85 * scaleFactor) },
    { pct: 0.94, asset: 1, normalSide: -1, size: Math.round(75 * scaleFactor) }
  ];

  const leafItems = [];

  nodeDistributions.forEach((n, idx) => {
    const distanceAlongPath = n.pct * totalLen;
    const pt = spine.getPointAtLength(distanceAlongPath);

    const delta = 4;
    const ptPrev = spine.getPointAtLength(Math.max(0, distanceAlongPath - delta));
    const ptNext = spine.getPointAtLength(Math.min(totalLen, distanceAlongPath + delta));
    const tangentAngle = Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x) * (180 / Math.PI);
    const finalAngle = tangentAngle + (n.normalSide * 65);

    if (sproutsGroup && (idx % 2 === 1)) {
      const curl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const offset = (n.normalSide > 0 ? 30 : -30) * (isMobile ? 0.6 : 1.0);
      curl.setAttribute('d', `M ${pt.x} ${pt.y} Q ${pt.x + offset} ${pt.y - 15} ${pt.x + offset*1.3} ${pt.y - 35} T ${pt.x + offset*1.1} ${pt.y - 50}`);
      curl.setAttribute('class', 'vine-curly-tendril');
      const curlLen = 100;
      curl.style.strokeDasharray = curlLen;
      curl.style.strokeDashoffset = curlLen;
      sproutsGroup.appendChild(curl);
      n.tendrilEl = curl;
    }

    const leafG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    leafG.setAttribute('class', 'authentic-vine-leaf');

    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', leafAssets[n.asset]);
    img.setAttribute('href', leafAssets[n.asset]);
    img.setAttribute('width', n.size);
    img.setAttribute('height', n.size);
    img.setAttribute('x', '0');
    img.setAttribute('y', `-${n.size / 2}`);

    leafG.appendChild(img);
    leavesGroup.appendChild(leafG);

    if (window.gsap) {
      gsap.set(leafG, {
        x: pt.x,
        y: pt.y,
        rotation: finalAngle,
        transformOrigin: '0px 0px',
        scale: 0,
        opacity: 0
      });
    }

    leafItems.push({
      el: leafG,
      tendrilEl: n.tendrilEl,
      triggerPct: n.pct
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#services',
        endTrigger: '#classes',
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1.2
      }
    });

    tl.to(spine, {
      strokeDashoffset: 0,
      ease: 'none',
      duration: 1
    }, 0);

    if (spineShadow) {
      tl.to(spineShadow, {
        strokeDashoffset: 0,
        ease: 'none',
        duration: 1
      }, 0);
    }

    leafItems.forEach(item => {
      tl.to(item.el, 
        { 
          opacity: 1, 
          scale: 1,
          ease: 'back.out(1.6)',
          duration: 0.08
        }, 
        item.triggerPct
      );

      if (item.tendrilEl) {
        tl.to(item.tendrilEl, {
          opacity: 0.85,
          strokeDashoffset: 0,
          duration: 0.08,
          ease: 'power1.out'
        }, item.triggerPct + 0.01);
      }
    });
  }
}

function triggerWindLeaves() {
  const hero = document.getElementById('home');
  if (!hero) return;
  const leafImages = [
    'assets/images/leaf-single-green-1-thumb.webp',
    'assets/images/leaf-single-green-2-thumb.webp',
    'assets/images/leaf-single-green-3-thumb.webp',
    'assets/images/leaf-single-green-4-thumb.webp'
  ];

  const depthLayers = ['depth-bg', 'depth-mid', 'depth-mid', 'depth-fg', 'depth-mid', 'depth-bg', 'depth-fg', 'depth-mid'];

  for (let i = 0; i < depthLayers.length; i++) {
    const leaf = document.createElement('img');
    const depth = depthLayers[i];
    leaf.src = leafImages[i % leafImages.length];
    leaf.className = `wind-leaf ${depth}`;

    const startY = Math.random() * 45 - 10;
    let dur, size;

    if (depth === 'depth-fg') {

      size = 32 + Math.random() * 14;
      dur = 2.8 + Math.random() * 1.0;
    } else if (depth === 'depth-bg') {

      size = 14 + Math.random() * 8;
      dur = 4.8 + Math.random() * 1.8;
    } else {

      size = 22 + Math.random() * 10;
      dur = 3.6 + Math.random() * 1.4;
    }

    const delay = 0.15 + i * 0.35;
    
    leaf.style.top = `${startY}%`;
    leaf.style.left = '0%';
    leaf.style.width = `${size}px`;
    leaf.style.animationDuration = `${dur}s`;
    leaf.style.animationDelay = `${delay}s`;

    hero.appendChild(leaf);

    setTimeout(() => {
      if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
    }, (delay + dur) * 1000 + 500);
  }
}

function initSmoothScroll() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Only run smooth momentum scroller on fine pointer (mouse/trackpad desktop).
  // Touch screens already have native hardware-accelerated momentum.
  if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // Prevent conflicting double-smoothing from CSS
  document.documentElement.style.scrollBehavior = 'auto';

  let currentY = window.pageYOffset || document.documentElement.scrollTop;
  let targetY = currentY;
  let isRunning = false;

  const getMaxScroll = () => Math.max(
    0,
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight
  );

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  function loop() {
    const maxScroll = getMaxScroll();
    targetY = clamp(targetY, 0, maxScroll);
    const diff = targetY - currentY;

    // Snappy responsive smooth interpolation
    currentY += diff * 0.14;

    if (Math.abs(diff) < 0.4) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isRunning = false;
      return;
    }

    window.scrollTo(0, currentY);
    if (window.ScrollTrigger) {
      ScrollTrigger.update();
    }
    requestAnimationFrame(loop);
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(loop);
    }
  }

  window.addEventListener('wheel', (e) => {
    // Never intercept Ctrl+Wheel or Meta+Wheel (browser zoom)
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // If inside a scrollable child element (e.g. modals), let it scroll natively
    let el = e.target;
    while (el && el !== document.body && el !== document.documentElement) {
      const style = window.getComputedStyle(el);
      const oy = style.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) {
        const atTop = el.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
        if (!atTop && !atBottom) return;
      }
      el = el.parentElement;
    }

    e.preventDefault();

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 35; // lines
    if (e.deltaMode === 2) delta *= window.innerHeight; // pages

    targetY = clamp(targetY + delta, 0, getMaxScroll());
    startLoop();
  }, { passive: false });

  // Sync when user drags the native scrollbar
  window.addEventListener('scroll', () => {
    if (!isRunning) {
      currentY = window.pageYOffset || document.documentElement.scrollTop;
      targetY = currentY;
    }
  }, { passive: true });

  // Smooth gliding for anchor links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    const targetElement = document.querySelector(hash);
    if (targetElement) {
      e.preventDefault();
      const rect = targetElement.getBoundingClientRect();
      const headerOffset = 70;
      targetY = clamp(window.pageYOffset + rect.top - headerOffset, 0, getMaxScroll());
      startLoop();
      if (history.pushState) {
        history.pushState(null, null, hash);
      }
    }
  });

  // Keyboard navigation support
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

    let keyDelta = 0;
    const scrollStep = 90;
    const pageStep = window.innerHeight * 0.8;

    switch (e.key) {
      case 'ArrowDown':
        keyDelta = scrollStep;
        break;
      case 'ArrowUp':
        keyDelta = -scrollStep;
        break;
      case 'PageDown':
      case ' ':
        keyDelta = e.shiftKey ? -pageStep : pageStep;
        break;
      case 'PageUp':
        keyDelta = -pageStep;
        break;
      case 'Home':
        e.preventDefault();
        targetY = 0;
        startLoop();
        return;
      case 'End':
        e.preventDefault();
        targetY = getMaxScroll();
        startLoop();
        return;
      default:
        return;
    }

    if (keyDelta !== 0) {
      e.preventDefault();
      targetY = clamp(targetY + keyDelta, 0, getMaxScroll());
      startLoop();
    }
  });
}
