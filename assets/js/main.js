

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
        }
      });
    }, {
      rootMargin: '120px 0px 50px 0px',
      threshold: 0
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

  initCreepingVine();
});

function initCreepingVine() {
  const vineStem = document.getElementById('vineStem');
  const leavesGroup = document.getElementById('vineLeavesGroup');
  if (!vineStem || !leavesGroup) return;

  const stemLength = vineStem.getTotalLength();
  vineStem.style.strokeDasharray = stemLength;
  vineStem.style.strokeDashoffset = stemLength;

  const leafConfigs = [
    { pos: 0.08, type: 'green-leaf', angle: 45, scale: 1.1 },
    { pos: 0.16, type: 'gold-leaf', angle: -50, scale: 0.95 },
    { pos: 0.24, type: 'lime-leaf', angle: 40, scale: 1.0 },
    { pos: 0.33, type: 'green-leaf', angle: -55, scale: 1.15 },
    { pos: 0.42, type: 'gold-leaf', angle: 48, scale: 1.0 },
    { pos: 0.51, type: 'lime-leaf', angle: -45, scale: 1.05 },
    { pos: 0.60, type: 'green-leaf', angle: 52, scale: 1.2 },
    { pos: 0.69, type: 'gold-leaf', angle: -50, scale: 0.95 },
    { pos: 0.78, type: 'green-leaf', angle: 45, scale: 1.1 },
    { pos: 0.88, type: 'lime-leaf', angle: -48, scale: 1.05 },
    { pos: 0.96, type: 'gold-leaf', angle: 40, scale: 1.0 }
  ];

  const leafElements = [];
  leafConfigs.forEach(cfg => {
    const pt = vineStem.getPointAtLength(cfg.pos * stemLength);
    const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leaf.setAttribute('d', 'M0,0 C12,-10 24,-8 28,0 C24,8 12,10 0,0 Z');
    leaf.setAttribute('class', `vine-leaf ${cfg.type}`);
    leaf.style.transformOrigin = `${pt.x}px ${pt.y}px`;
    leaf.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${cfg.angle}) scale(${cfg.scale})`);
    leavesGroup.appendChild(leaf);
    leafElements.push({ el: leaf, triggerAt: cfg.pos * 0.95 });
  });

  function updateVine() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

    const drawLength = stemLength * progress * 1.08;
    vineStem.style.strokeDashoffset = Math.max(0, stemLength - drawLength);

    leafElements.forEach(item => {
      if (progress >= item.triggerAt && progress > 0.02) {
        item.el.classList.add('bloomed');
      } else {
        item.el.classList.remove('bloomed');
      }
    });
  }

  window.addEventListener('scroll', updateVine, { passive: true });
  updateVine();
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
