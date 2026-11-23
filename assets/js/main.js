

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
  const tendrilsGroup = document.getElementById('vineTendrilsGroup');
  const budsGroup = document.getElementById('vineBudsGroup');
  if (!vineStem || !leavesGroup) return;

  const stemLength = vineStem.getTotalLength();
  vineStem.style.strokeDasharray = stemLength;
  vineStem.style.strokeDashoffset = stemLength;

  const nodes = [
    { pos: 0.07, side: 1, angle: 35, scale: 1.1, grad: 'url(#emeraldLeafGrad)' },
    { pos: 0.12, side: -1, angle: -40, scale: 0.9, grad: 'url(#goldLeafGrad)' },
    { pos: 0.19, side: 1, angle: 45, scale: 1.25, grad: 'url(#limeLeafGrad)' },
    { pos: 0.26, side: -1, angle: -50, scale: 1.0, grad: 'url(#emeraldLeafGrad)' },
    { pos: 0.33, side: 1, angle: 30, scale: 1.15, grad: 'url(#goldLeafGrad)' },
    { pos: 0.40, side: -1, angle: -45, scale: 1.3, grad: 'url(#limeLeafGrad)' },
    { pos: 0.48, side: 1, angle: 50, scale: 1.05, grad: 'url(#emeraldLeafGrad)' },
    { pos: 0.55, side: -1, angle: -35, scale: 1.2, grad: 'url(#goldLeafGrad)' },
    { pos: 0.63, side: 1, angle: 40, scale: 1.1, grad: 'url(#limeLeafGrad)' },
    { pos: 0.71, side: -1, angle: -55, scale: 1.25, grad: 'url(#emeraldLeafGrad)' },
    { pos: 0.79, side: 1, angle: 35, scale: 1.0, grad: 'url(#goldLeafGrad)' },
    { pos: 0.87, side: -1, angle: -45, scale: 1.15, grad: 'url(#limeLeafGrad)' },
    { pos: 0.94, side: 1, angle: 42, scale: 1.05, grad: 'url(#emeraldLeafGrad)' }
  ];

  const leafItems = [];

  nodes.forEach((n, idx) => {
    const pt = vineStem.getPointAtLength(n.pos * stemLength);

    if (tendrilsGroup && (idx % 2 === 1)) {
      const tendril = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const cur = n.side > 0 ? 30 : -30;
      tendril.setAttribute('d', `M ${pt.x} ${pt.y} Q ${pt.x + cur} ${pt.y - 15} ${pt.x + cur*1.3} ${pt.y - 30} T ${pt.x + cur*1.1} ${pt.y - 45}`);
      tendril.setAttribute('class', 'vine-tendril');
      tendrilsGroup.appendChild(tendril);
    }

    if (budsGroup && (idx % 3 === 0)) {
      const bud = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bud.setAttribute('cx', pt.x + (n.side * 12));
      bud.setAttribute('cy', pt.y - 4);
      bud.setAttribute('r', '2.5');
      bud.setAttribute('class', 'vine-bud');
      budsGroup.appendChild(bud);
    }

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'vine-leaf-node');
    g.style.opacity = '0';
    g.style.transformOrigin = `${pt.x}px ${pt.y}px`;
    g.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${n.angle}) scale(0)`);

    const petiole = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    petiole.setAttribute('d', 'M 0 0 C 4 -2 8 -1 12 0');
    petiole.setAttribute('stroke', '#2D5A36');
    petiole.setAttribute('stroke-width', '1.6');
    petiole.setAttribute('fill', 'none');
    g.appendChild(petiole);

    const leafBody = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leafBody.setAttribute('d', 'M 12 0 C 18 -16 38 -15 50 0 C 38 15 18 16 12 0 Z');
    leafBody.setAttribute('fill', n.grad);
    leafBody.setAttribute('filter', 'url(#vineShadow)');
    g.appendChild(leafBody);

    const midrib = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    midrib.setAttribute('d', 'M 12 0 C 26 -2 38 -1 48 0');
    midrib.setAttribute('stroke', 'rgba(255,255,255,0.4)');
    midrib.setAttribute('stroke-width', '1');
    midrib.setAttribute('fill', 'none');
    g.appendChild(midrib);

    leavesGroup.appendChild(g);
    leafItems.push({
      element: g,
      x: pt.x,
      y: pt.y,
      targetAngle: n.angle,
      targetScale: n.scale,
      triggerPct: n.pos
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const vineTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    vineTl.to(vineStem, {
      strokeDashoffset: 0,
      ease: 'none',
      duration: 1
    }, 0);

    leafItems.forEach(item => {
      vineTl.to(item.element, {
        opacity: 1,
        scale: item.targetScale,
        rotation: item.targetAngle,
        ease: 'back.out(1.8)',
        duration: 0.08
      }, Math.max(0, item.triggerPct - 0.02));
    });
  } else {
    function fallbackUpdate() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      vineStem.style.strokeDashoffset = Math.max(0, stemLength * (1 - progress));

      leafItems.forEach(item => {
        if (progress >= item.triggerPct) {
          item.element.style.opacity = '1';
          item.element.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.targetAngle}deg) scale(${item.targetScale})`;
        } else {
          item.element.style.opacity = '0';
          item.element.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.targetAngle}deg) scale(0)`;
        }
      });
    }
    window.addEventListener('scroll', fallbackUpdate, { passive: true });
    fallbackUpdate();
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
