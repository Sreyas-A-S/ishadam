(function () {
      const TOPICS = {
        'instrument-service': {
          title: 'Instrument Service',
          eyebrow: 'Ishadam Care & Craft • Restoration',
          subtitle: 'Expert tuning, leather-head replacement, cord re-lacing, and traditional restoration for sacred percussion and classical instruments.',
          ctaTitle: 'Book an Instrument Service',
          ctaDesc: 'Share a photo or brief note about your instrument on WhatsApp and our artisans will advise on turnaround time and care.',
          ctaBtn: 'Request Service on WhatsApp',
          waText: 'Hello Ishadam, I would like to inquire about Instrument Service',
          cards: [
            { tag: 'Tuning & Alignment', image: 'assets/images/sacred-idakka.webp', title: 'Idakka & Maddalam Re-heading', body: 'Precision replacement of seasoned leather heads, jiva strings, and cotton tension cords to restore warm, authentic resonance.' },
            { tag: 'Wood & Shell Care', image: 'assets/images/Ornamental Lantern with Crystals and Stones.webp', title: 'Jackwood Polishing & Crack Repair', body: 'Gentle natural-oil conditioning and structural care for heirloom Chenda, Idakka, and Veena shells.' },
            { tag: 'Reeds & Acoustics', image: 'assets/images/sacred-notes-swirl.webp', title: 'Harmonium & Shruti Box Tuning', body: 'Bellows sealing, reed cleaning, and 440Hz pitch calibration for clear, sustained devotional accompaniment.' }
          ]
        },
        'kalam-varaykkal': {
          title: 'Kalam Varaykkal',
          eyebrow: 'Ishadam Sacred Art • Ritual Floor Drawing',
          subtitle: 'Traditional Kerala ritual floor art crafted with natural five-color powders (Panchavarnam) for temples, festivals, and sacred ceremonies.',
          ctaTitle: 'Book a Kalam Varaykkal Offering',
          ctaDesc: 'Share your temple or event date, deity preference, and space details on WhatsApp to coordinate with our traditional Kalam artists.',
          ctaBtn: 'Book on WhatsApp',
          waText: 'Hello Ishadam, I would like to inquire about Kalam Varaykkal',
          cards: [
            { tag: 'Sacred Ritual Art', image: 'assets/images/kalam-panchavarnam.webp', title: 'Panchavarnam Powder Craft', body: 'Hand-drawn deity forms using natural rice flour, turmeric, burnt husk, green leaf powder, and slaked lime with turmeric.' },
            { tag: 'Temple & Home', image: 'assets/images/kalam-ritual-art.webp', title: 'Bhadrakali, Ayyappa & Naga Kalams', body: 'Authentic ritual floor drawings tailored for temple utsavam, sarpa bali, and auspicious housewarming or spiritual ceremonies.' },
            { tag: 'Complete Offering', image: 'assets/images/kalam-sopana.webp', title: 'Kalam & Sopana Accompaniment', body: 'Traditional Kalam Varaykkal paired with Idakka and Sopana Sangeetham offerings for a complete sacred atmosphere.' }
          ]
        },
        'temple-events': {
          title: 'Temple Events',
          eyebrow: 'Ishadam Sacred Gatherings • Announcements',
          subtitle: 'Upcoming Sopana Sangeetham offerings, temple festival ensembles, spiritual gatherings, and community highlights.',
          ctaTitle: 'Invite or Participate in a Temple Event',
          ctaDesc: 'Reach out to coordinate a Sopana Sangeetham recital, devotional ensemble, or sacred gathering at your temple or community space.',
          ctaBtn: 'Coordinate on WhatsApp',
          waText: 'Hello Ishadam, I would like to inquire about Temple Events',
          cards: [
            {
              tag: 'Upcoming • Festival',
              image: 'assets/images/sacred-idakka.webp',
              title: 'Sopana Sangeetham Sandhya',
              dateTime: 'Sat, 14 Dec 2026 • 6:00 PM – 8:00 PM',
              venue: 'Sree Padmanabha Courtyard, Trivandrum',
              body: 'Evening devotional Ashtapadi and Idakka recital offered in traditional temple acoustics. Open to devotees and students.'
            },
            {
              tag: 'Community Gathering',
              image: 'assets/images/Ornamental Lantern with Crystals and Stones.webp',
              title: 'Full Moon Meditation & Chants',
              dateTime: 'Fri, 25 Dec 2026 • 7:00 PM – 8:30 PM',
              venue: 'Ishadam Sanctuary, Trivandrum',
              body: 'Guided group meditation, sacred mantra chanting, and crystal-aligned stillness held monthly.'
            },
            {
              tag: 'Temple Ensemble',
              image: 'assets/images/sacred-notes-swirl.webp',
              title: 'Utsavam & Special Offerings',
              dateTime: 'By Appointment • Morning / Evening',
              venue: 'Temples & Cultural Spaces Across Kerala',
              body: 'Book our trained Sopana Sangeetham and percussion ensemble for annual temple festivals and consecrations.'
            }
          ]
        }
      };

      const params = new URLSearchParams(window.location.search);
      const key = params.get('topic') || 'instrument-service';
      const data = TOPICS[key] || TOPICS['instrument-service'];

      document.title = data.title + ' — Ishadam | From the House of Niyyati';
      document.getElementById('svcEyebrow').textContent = data.eyebrow;
      document.getElementById('svcTitle').textContent = data.title;
      document.getElementById('svcSubtitle').textContent = data.subtitle;
      document.getElementById('svcCtaTitle').textContent = data.ctaTitle;
      document.getElementById('svcCtaDesc').textContent = data.ctaDesc;
      document.getElementById('svcCtaBtnText').textContent = data.ctaBtn;
      document.getElementById('svcCtaBtn').href = 'https://wa.me/918138881308?text=' + encodeURIComponent(data.waText);

      const grid = document.getElementById('svcCards');
      grid.innerHTML = data.cards.map((c) => `
        <article class="bg-[#FFFDF9] border border-[#DFC789] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            ${c.image ? `
              <div class="h-44 rounded-xl bg-[#FAF6EE] border border-[#EADFC7] overflow-hidden flex items-center justify-center p-2">
                <img src="${c.image}" alt="${c.title}" class="w-full h-full object-contain">
              </div>` : ''}
            <span class="inline-block text-[11px] font-serif uppercase tracking-wider text-[#966D1B] font-semibold">${c.tag}</span>
            <h2 class="font-serif text-2xl font-bold text-[#173722]">${c.title}</h2>
            ${(c.dateTime || c.venue) ? `
              <div class="space-y-1.5 text-xs text-[#4A5D4E] font-medium pt-0.5">
                ${c.dateTime ? `<p class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-[#9E731B] shrink-0"></i><span>${c.dateTime}</span></p>` : ''}
                ${c.venue ? `<p class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#9E731B] shrink-0"></i><span>${c.venue}</span></p>` : ''}
              </div>` : ''}
            <p class="text-sm text-stone-700 leading-relaxed">${c.body}</p>
          </div>
          <div class="pt-3 border-t border-[#EADFC7]">
            <a href="https://wa.me/918138881308?text=${encodeURIComponent('Hello Ishadam, I would like to know more about ' + c.title)}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-[#966D1B] hover:text-[#173722] transition">
              <span>Inquire Details</span>
              <span>&rarr;</span>
            </a>
          </div>
        </article>
      `).join('');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    })();
