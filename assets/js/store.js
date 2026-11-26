(function () {
      const PER_PAGE = 4;
      const FAV_KEY = 'ishadam_store_favorites';
      const grid = document.getElementById('storeGrid');
      const favCountEl = document.getElementById('storeFavCount');

      function loadFavs() {
        try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
        catch { return new Set(); }
      }
      function saveFavs(set) {
        try { localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(set))); } catch {}
      }
      const favs = loadFavs();

      const allCards = Array.from(document.querySelectorAll('.store-card')).map((el, idx) => {
        const title = (el.querySelector('h2')?.textContent || '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const imgWrap = el.querySelector('.h-48');
        let favBtn = null;
        if (imgWrap) {
          imgWrap.classList.add('relative');
          favBtn = document.createElement('button');
          favBtn.type = 'button';
          favBtn.setAttribute('aria-label', 'Toggle Favorite');
          favBtn.className = 'store-fav-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FFFDF9]/90 border border-[#DFC789]/80 flex items-center justify-center shadow-sm hover:scale-105 transition';
          favBtn.innerHTML = '<svg class="w-4 h-4 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
          imgWrap.appendChild(favBtn);
        }
        return {
          el,
          id,
          idx,
          title,
          favBtn,
          text: (el.textContent || '').toLowerCase(),
          cat: el.dataset.cat || '',
          inStock: (el.textContent || '').includes('In Stock') ? 1 : 0
        };
      });

      function syncFavUI() {
        allCards.forEach((c) => {
          if (!c.favBtn) return;
          const isFav = favs.has(c.id);
          c.favBtn.classList.toggle('bg-[#FDF3DC]', isFav);
          c.favBtn.classList.toggle('border-[#9E731B]', isFav);
          c.favBtn.classList.toggle('bg-[#FFFDF9]/90', !isFav);
          c.favBtn.classList.toggle('border-[#DFC789]/80', !isFav);
          const svg = c.favBtn.querySelector('svg');
          if (svg) {
            svg.setAttribute('fill', isFav ? '#9E731B' : 'none');
            svg.style.fill = isFav ? '#9E731B' : 'none';
            svg.style.color = isFav ? '#9E731B' : '#78716C';
          }
        });
        if (favCountEl) favCountEl.textContent = `(${favs.size})`;
      }

      function animateAddToFav(btnEl) {
        if (!btnEl) return;
        const rect = btnEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // 1. Mini burst of hearts around the button
        for (let i = 0; i < 7; i++) {
          const h = document.createElement('span');
          h.textContent = '♥';
          h.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;pointer-events:none;z-index:90;font-size:${10 + (i % 3) * 4}px;color:${i % 2 === 0 ? '#9E731B' : '#C59A3F'};transform:translate(-50%,-50%) scale(0.5);opacity:1;transition:transform 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.55s ease-out;`;
          document.body.appendChild(h);
          const angle = (Math.PI * 2 * i) / 7 + (Math.random() - 0.5) * 0.4;
          const dist = 26 + Math.random() * 22;
          requestAnimationFrame(() => {
            h.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(1.1)`;
            h.style.opacity = '0';
          });
          setTimeout(() => h.remove(), 600);
        }

        // 2. Flying heart gliding to header Favorites icon
        const targetBtn = document.getElementById('headerFavBtn');
        if (!targetBtn) return;
        const tRect = targetBtn.getBoundingClientRect();
        const tx = tRect.left + tRect.width / 2;
        const ty = tRect.top + tRect.height / 2;

        const flyer = document.createElement('span');
        flyer.textContent = '♥';
        flyer.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;pointer-events:none;z-index:95;font-size:20px;color:#9E731B;transform:translate(-50%,-50%) scale(1.2);opacity:1;transition:left 0.65s cubic-bezier(0.22,1,0.36,1),top 0.65s cubic-bezier(0.45,0,0.55,1),transform 0.65s ease-in,opacity 0.2s ease 0.5s;`;
        document.body.appendChild(flyer);
        requestAnimationFrame(() => {
          flyer.style.left = tx + 'px';
          flyer.style.top = ty + 'px';
          flyer.style.transform = 'translate(-50%,-50%) scale(0.6)';
          flyer.style.opacity = '0';
        });
        setTimeout(() => {
          flyer.remove();
          targetBtn.classList.add('scale-125');
          setTimeout(() => targetBtn.classList.remove('scale-125'), 180);
        }, 680);
      }

      allCards.forEach((c) => {
        if (c.favBtn) {
          c.favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isAdding = !favs.has(c.id);
            if (isAdding) {
              favs.add(c.id);
              animateAddToFav(c.favBtn);
            } else {
              favs.delete(c.id);
            }
            saveFavs(favs);
            syncFavUI();
            if (window.refreshIshadamFavs) window.refreshIshadamFavs();
            if (activeFilter === 'favorites') apply();
          });
        }
      });

      window.addEventListener('ishadam-favs-updated', () => {
        const latest = loadFavs();
        favs.clear();
        latest.forEach((x) => favs.add(x));
        syncFavUI();
        if (activeFilter === 'favorites') apply();
      });
      const catBtn = document.getElementById('storeCatBtn');
      const catMenu = document.getElementById('storeCatMenu');
      const catLabel = document.getElementById('storeCatLabel');
      const catChevron = document.getElementById('storeCatChevron');
      const catOpts = document.querySelectorAll('.store-cat-opt');
      const favFilterBtn = document.getElementById('storeFavFilterBtn');
      const searchInput = document.getElementById('storeSearchInput');
      const sortBtn = document.getElementById('storeSortBtn');
      const sortMenu = document.getElementById('storeSortMenu');
      const sortLabel = document.getElementById('storeSortLabel');
      const sortChevron = document.getElementById('storeSortChevron');
      const sortOpts = document.querySelectorAll('.store-sort-opt');
      const countLabel = document.getElementById('storeCountLabel');
      const emptyState = document.getElementById('storeEmptyState');
      const pagination = document.getElementById('storePagination');

      const params = new URLSearchParams(window.location.search);
      const urlCat = params.get('category');
      let activeFilter = params.get('filter') || 'all';
      let activeSort = 'default';
      let currentPage = 1;

      function syncFilterPills() {
        const isFavActive = activeFilter === 'favorites';
        if (favFilterBtn) {
          favFilterBtn.classList.toggle('bg-[#173722]', isFavActive);
          favFilterBtn.classList.toggle('text-white', isFavActive);
          favFilterBtn.classList.toggle('border-[#173722]', isFavActive);
          favFilterBtn.classList.toggle('bg-[#FAF6EE]', !isFavActive);
          favFilterBtn.classList.toggle('text-[#173722]', !isFavActive);
          favFilterBtn.classList.toggle('border-[#DFC789]', !isFavActive);
        }
        catOpts.forEach((o) => {
          const isSel = o.dataset.filter === activeFilter;
          o.classList.toggle('text-[#173722]', isSel);
          o.classList.toggle('font-semibold', isSel);
          o.classList.toggle('text-stone-800', !isSel);
          o.classList.toggle('font-medium', !isSel);
          if (isSel && catLabel) {
            catLabel.textContent = o.dataset.filter === 'all' && urlCat === 'instruments'
              ? 'Category: Instruments'
              : 'Category: ' + o.textContent.trim();
          }
        });
        if (isFavActive && catLabel) catLabel.textContent = 'Category: Favorites';
      }

      function apply() {
        const q = (searchInput?.value || '').trim().toLowerCase();
        const sort = activeSort;

        let filtered = allCards.filter((c) => {
          const matchCat = activeFilter === 'all'
            ? true
            : activeFilter === 'favorites'
              ? favs.has(c.id)
              : c.cat === activeFilter;
          const matchQ = !q || c.text.includes(q);
          return matchCat && matchQ;
        });

        filtered.sort((a, b) => {
          if (sort === 'az') return a.title.localeCompare(b.title);
          if (sort === 'za') return b.title.localeCompare(a.title);
          if (sort === 'stock') return b.inStock - a.inStock || a.idx - b.idx;
          return a.idx - b.idx;
        });

        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * PER_PAGE;
        const end = start + PER_PAGE;
        const visibleSet = new Set(filtered.slice(start, end).map((c) => c.el));

        allCards.forEach((c) => c.el.classList.add('hidden'));
        filtered.slice(start, end).forEach((c) => {
          c.el.classList.remove('hidden');
          grid.appendChild(c.el);
        });

        if (emptyState) emptyState.classList.toggle('hidden', total > 0);
        if (countLabel) {
          countLabel.textContent = total === 0
            ? '0 items'
            : `Showing ${start + 1}–${Math.min(end, total)} of ${total}`;
        }

        if (pagination) {
          if (total <= PER_PAGE) {
            pagination.innerHTML = '';
            return;
          }
          let html = `<button data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} class="px-3.5 py-1.5 rounded-full border border-[#DFC789] text-xs font-serif font-semibold text-[#173722] disabled:opacity-40 hover:bg-amber-50 transition">&larr; Prev</button>`;
          for (let p = 1; p <= totalPages; p++) {
            const active = p === currentPage;
            html += `<button data-page="${p}" class="w-8 h-8 rounded-full text-xs font-serif font-semibold border transition ${active ? 'bg-[#173722] text-white border-[#173722]' : 'bg-[#FAF6EE] text-[#173722] border-[#DFC789] hover:bg-amber-50'}">${p}</button>`;
          }
          html += `<button data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} class="px-3.5 py-1.5 rounded-full border border-[#DFC789] text-xs font-serif font-semibold text-[#173722] disabled:opacity-40 hover:bg-amber-50 transition">Next &rarr;</button>`;
          pagination.innerHTML = html;
          pagination.querySelectorAll('button[data-page]').forEach((b) => {
            b.addEventListener('click', () => {
              const p = Number(b.dataset.page);
              if (p >= 1 && p <= totalPages) {
                currentPage = p;
                apply();
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            });
          });
        }
      }

      function setFilter(val) {
        activeFilter = val;
        currentPage = 1;
        const nextUrl = new URL(window.location.href);
        if (activeFilter === 'all') nextUrl.searchParams.delete('filter');
        else nextUrl.searchParams.set('filter', activeFilter);
        window.history.replaceState({}, '', nextUrl);
        syncFilterPills();
        apply();
      }

      if (catBtn && catMenu) {
        catBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = !catMenu.classList.contains('hidden');
          catMenu.classList.toggle('hidden', open);
          if (catChevron) catChevron.classList.toggle('rotate-180', !open);
          if (sortMenu) sortMenu.classList.add('hidden');
          if (sortChevron) sortChevron.classList.remove('rotate-180');
        });
      }
      catOpts.forEach((opt) => {
        opt.addEventListener('click', () => {
          setFilter(opt.dataset.filter);
          if (catMenu) catMenu.classList.add('hidden');
          if (catChevron) catChevron.classList.remove('rotate-180');
        });
      });
      if (favFilterBtn) {
        favFilterBtn.addEventListener('click', () => {
          setFilter(activeFilter === 'favorites' ? 'all' : 'favorites');
        });
      }

      if (sortBtn && sortMenu) {
        sortBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = !sortMenu.classList.contains('hidden');
          sortMenu.classList.toggle('hidden', open);
          if (sortChevron) sortChevron.classList.toggle('rotate-180', !open);
          if (catMenu) catMenu.classList.add('hidden');
          if (catChevron) catChevron.classList.remove('rotate-180');
        });
        document.addEventListener('click', () => {
          sortMenu.classList.add('hidden');
          if (sortChevron) sortChevron.classList.remove('rotate-180');
          if (catMenu) catMenu.classList.add('hidden');
          if (catChevron) catChevron.classList.remove('rotate-180');
        });
      }

      sortOpts.forEach((opt) => {
        opt.addEventListener('click', () => {
          activeSort = opt.dataset.sort;
          if (sortLabel) sortLabel.textContent = opt.textContent;
          sortOpts.forEach((o) => {
            const isSel = o === opt;
            o.classList.toggle('text-[#173722]', isSel);
            o.classList.toggle('font-semibold', isSel);
            o.classList.toggle('text-stone-800', !isSel);
            o.classList.toggle('font-medium', !isSel);
          });
          if (sortMenu) sortMenu.classList.add('hidden');
          if (sortChevron) sortChevron.classList.remove('rotate-180');
          currentPage = 1;
          apply();
        });
      });

      if (searchInput) searchInput.addEventListener('input', () => { currentPage = 1; apply(); });
      syncFavUI();
      syncFilterPills();
      apply();
    })();
