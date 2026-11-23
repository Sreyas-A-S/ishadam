

document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('loaded');
    setTimeout(triggerWindLeaves, 300);
  });

  if (document.readyState === 'complete') {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('loaded');
    triggerWindLeaves();
  }

  if (window.lucide) {
    lucide.createIcons();
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
  }

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

  initWildRollercoasterVine();
});

function initWildRollercoasterVine() {
  const spine = document.getElementById('vineSpine');
  const spineShadow = document.getElementById('vineSpineShadow');
  const leavesContainer = document.getElementById('vineLeavesDom');
  const sproutsGroup = document.getElementById('vineSproutsGroup');
  const container = document.getElementById('rollercoasterVine');
  if (!spine || !leavesContainer || !container) return;

  const width = 1440;
  const pathD = `
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

  const nodeDistributions = [
    { pct: 0.06, asset: 0, angle: 35,  size: 78, flip: 1 },
    { pct: 0.11, asset: 1, angle: -65, size: 68, flip: -1 },
    { pct: 0.17, asset: 2, angle: 40,  size: 88, flip: 1 },
    { pct: 0.23, asset: 3, angle: -45, size: 84, flip: -1 },
    { pct: 0.29, asset: 0, angle: 55,  size: 74, flip: 1 },
    { pct: 0.36, asset: 1, angle: -50, size: 92, flip: -1 },
    { pct: 0.43, asset: 2, angle: 30,  size: 80, flip: 1 },
    { pct: 0.50, asset: 3, angle: -60, size: 86, flip: -1 },
    { pct: 0.57, asset: 0, angle: 45,  size: 96, flip: 1 },
    { pct: 0.65, asset: 1, angle: -40, size: 76, flip: -1 },
    { pct: 0.72, asset: 2, angle: 50,  size: 88, flip: 1 },
    { pct: 0.80, asset: 3, angle: -55, size: 82, flip: -1 },
    { pct: 0.88, asset: 0, angle: 35,  size: 90, flip: 1 },
    { pct: 0.95, asset: 1, angle: -48, size: 75, flip: -1 }
  ];

  const leafItems = [];

  nodeDistributions.forEach((n, idx) => {
    const pt = spine.getPointAtLength(n.pct * totalLen);

    if (sproutsGroup && (idx % 2 === 1)) {
      const curl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const offset = n.flip > 0 ? 40 : -40;
      curl.setAttribute('d', `M ${pt.x} ${pt.y} Q ${pt.x + offset} ${pt.y - 20} ${pt.x + offset*1.3} ${pt.y - 45} T ${pt.x + offset*1.1} ${pt.y - 65}`);
      curl.setAttribute('class', 'vine-curly-tendril');
      const curlLen = curl.getTotalLength ? 120 : 120;
      curl.style.strokeDasharray = curlLen;
      curl.style.strokeDashoffset = curlLen;
      sproutsGroup.appendChild(curl);
      n.tendrilEl = curl;
    }

    const img = document.createElement('img');
    img.src = leafAssets[n.asset];
    img.className = 'authentic-vine-leaf';
    img.style.width = `${n.size}px`;
    img.style.height = 'auto';

    const pctX = (pt.x / width) * 100;
    img.style.left = `${pctX}%`;
    img.style.top = `${pt.y}px`;

    leavesContainer.appendChild(img);

    leafItems.push({
      el: img,
      tendrilEl: n.tendrilEl,
      targetAngle: n.angle,
      flip: n.flip,
      triggerPct: n.pct
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#services',
        endTrigger: '#classes',
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: true
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
      tl.to(item.el, {
        opacity: 1,
        scale: 1,
        rotation: item.targetAngle,
        ease: 'back.out(1.9)',
        duration: 0.06
      }, item.triggerPct);

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
