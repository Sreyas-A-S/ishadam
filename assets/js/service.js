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
          title: 'കളമെഴുത്ത് • Kalamezhuthu',
          eyebrow: 'Kalamezhuthu – Traditional Ritual Art of Kerala',
          subtitle: 'കേരളത്തിന്റെ പൈതൃകത്തിലും ക്ഷേത്രാനുഷ്ഠാനങ്ങളിലും വേരൂന്നിയ മനോഹരമായ ഒരു പരമ്പരാഗത കലയാണ് കളമെഴുത്ത്. അരിപ്പൊടി, മഞ്ഞൾപ്പൊടി, കരിപ്പൊടി, ഇലകളിൽ നിന്നുള്ള പച്ചപ്പൊടി തുടങ്ങിയ പ്രകൃതിദത്ത വർണ്ണങ്ങൾ ഉപയോഗിച്ച് ക്ഷേത്രങ്ങളിലെ പവിത്രമായ ഇടങ്ങളിൽ തറയിൽ ദേവതാരൂപങ്ങൾ വരയ്ക്കുന്ന സവിശേഷമായ അനുഷ്ഠാനകലയാണിത്. ഓരോ കളത്തിനും അതിന്റേതായ രൂപഭംഗിയും ആചാരപരമായ പ്രാധാന്യവുമുണ്ട്. ചിത്രകലയും ഭക്തിയും പാരമ്പര്യവും ഒത്തുചേരുന്ന ഈ കലാരൂപം കേരളത്തിന്റെ സാംസ്കാരിക പൈതൃകത്തിന്റെ അമൂല്യമായ ഭാഗമാണ്.',
          ctaTitle: 'അന്വേഷണങ്ങൾക്കും ബുക്കിംഗുകൾക്കും',
          ctaDesc: 'ക്ഷേത്രങ്ങൾ, ഉത്സവങ്ങൾ, മറ്റ് പരമ്പരാഗത ചടങ്ങുകൾ എന്നിവയ്ക്കായി കളമെഴുത്ത് സേവനങ്ങൾ ക്രമീകരിക്കുന്നതിന് ഞങ്ങളുമായി ബന്ധപ്പെടുക.',
          ctaBtn: 'WhatsApp വഴി ബന്ധപ്പെടുക',
          waText: 'Hello Ishadam, I would like to inquire about Kalamezhuthu',
          cards: [
            { tag: 'പരമ്പരാഗത സേവനങ്ങൾ', image: 'assets/images/kalam-panchavarnam.webp', title: 'പരമ്പരാഗത കളമെഴുത്ത് സേവനങ്ങൾ', body: 'Ishadam വഴി പരമ്പരാഗത രീതിയിലുള്ള കളമെഴുത്ത് സേവനങ്ങൾ ലഭ്യമാണ് — വിവിധ ദേവതാരൂപങ്ങളിലും, ക്ഷേത്രോത്സവങ്ങളോടനുബന്ധിച്ചും, പ്രത്യേക വഴിപാടുകളുടെയും ആചാരങ്ങളുടെയും ഭാഗമായും.' },
            { tag: 'ദേവതാരൂപങ്ങൾ & ഏകോപനം', image: 'assets/images/kalam-ritual-art.webp', title: 'ഭദ്രകാളി, അയ്യപ്പൻ & നാഗദേവത കളങ്ങൾ', body: 'ഭദ്രകാളി, അയ്യപ്പൻ, നാഗദേവത തുടങ്ങിയ ദേവതകളുടെ കളങ്ങൾ, കൂടാതെ ആവശ്യാനുസരണം കളമെഴുത്തുപാട്ടും അനുബന്ധ അനുഷ്ഠാനകലകളുടെ ഏകോപനവും.' },
            { tag: 'Ishadam ദൗത്യം', image: 'assets/images/kalam-sopana.webp', title: 'നമ്മുടെ പാരമ്പര്യം, നമ്മുടെ അഭിമാനം', body: 'കേരളത്തിന്റെ തനതായ ക്ഷേത്രകലകളെയും അനുഷ്ഠാനപാരമ്പര്യങ്ങളെയും ആദരവോടും ഉത്തരവാദിത്തത്തോടും അടുത്ത തലമുറയിലേക്ക് എത്തിക്കുക എന്നതാണ് Ishadam-ന്റെ ലക്ഷ്യം.' }
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
      if (key === 'kalam-varaykkal') {
        document.body.classList.add("font-['Noto_Sans_Malayalam',sans-serif]");
        const sTitle = document.querySelector('h1');
        const sSub = document.querySelector('h1 + p');
        if (sTitle) {
          sTitle.className = "font-['Noto_Sans_Malayalam',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#173722] leading-snug";
        }
        if (sSub) {
          sSub.className = "font-['Noto_Sans_Malayalam',sans-serif] text-[13px] sm:text-[16.5px] text-stone-700 max-w-2xl mx-auto leading-relaxed sm:leading-loose";
        }
        const ctaTitle = document.getElementById('svcCtaTitle');
        const ctaDesc = document.getElementById('svcCtaDesc');
        if (ctaTitle) {
          ctaTitle.className = "font-['Noto_Sans_Malayalam',sans-serif] text-2xl sm:text-3xl font-bold text-[#173722] leading-snug";
        }
        if (ctaDesc) {
          ctaDesc.className = "font-['Noto_Sans_Malayalam',sans-serif] text-stone-700 text-sm sm:text-base max-w-xl mx-auto leading-loose";
        }
      }

      document.title = data.title + ' — Ishadam | From the House of Niyyati';
      document.getElementById('svcEyebrow').textContent = data.eyebrow;
      document.getElementById('svcTitle').textContent = data.title;
      document.getElementById('svcSubtitle').textContent = data.subtitle;
      document.getElementById('svcCtaTitle').textContent = data.ctaTitle;
      document.getElementById('svcCtaDesc').textContent = data.ctaDesc;
      document.getElementById('svcCtaBtnText').textContent = data.ctaBtn;
      document.getElementById('svcCtaBtn').href = 'https://wa.me/918138881308?text=' + encodeURIComponent(data.waText);

      const grid = document.getElementById('svcCards');
      if (key === 'kalam-varaykkal') {
        grid.className = 'space-y-12 sm:space-y-16';
        grid.innerHTML = `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div class="lg:col-span-7 space-y-4">
              <span class="text-[11px] font-serif uppercase tracking-[0.2em] text-[#966D1B] font-semibold">പരമ്പരാഗത സേവനങ്ങൾ</span>
              <h2 class="font-['Noto_Sans_Malayalam',sans-serif] text-2xl sm:text-3xl font-bold text-[#173722] leading-snug">പരമ്പരാഗത കളമെഴുത്ത് സേവനങ്ങൾ</h2>
              <p class="font-['Noto_Sans_Malayalam',sans-serif] text-sm sm:text-[16px] text-stone-700 leading-relaxed">Ishadam വഴി പരമ്പരാഗത രീതിയിലുള്ള കളമെഴുത്ത് സേവനങ്ങൾ ലഭ്യമാണ്.</p>
              <ul class="font-['Noto_Sans_Malayalam',sans-serif] space-y-2.5 text-sm sm:text-[15.5px] text-stone-700 leading-relaxed pt-1">
                <li class="flex items-start gap-2.5"><span class="text-[#9E731B] mt-0.5">•</span><span>വിവിധ ദേവതാരൂപങ്ങളിലുള്ള കളമെഴുത്ത്</span></li>
                <li class="flex items-start gap-2.5"><span class="text-[#9E731B] mt-0.5">•</span><span>ക്ഷേത്രോത്സവങ്ങളോടനുബന്ധിച്ചുള്ള കളമെഴുത്ത്</span></li>
                <li class="flex items-start gap-2.5"><span class="text-[#9E731B] mt-0.5">•</span><span>പ്രത്യേക വഴിപാടുകളുടെയും ആചാരങ്ങളുടെയും ഭാഗമായുള്ള കളമെഴുത്ത്</span></li>
                <li class="flex items-start gap-2.5"><span class="text-[#9E731B] mt-0.5">•</span><span>ഭദ്രകാളി, അയ്യപ്പൻ, നാഗദേവത തുടങ്ങിയ ദേവതകളുടെ കളങ്ങൾ</span></li>
                <li class="flex items-start gap-2.5"><span class="text-[#9E731B] mt-0.5">•</span><span>കളമെഴുത്തുപാട്ട്, അനുബന്ധ അനുഷ്ഠാനകലകൾ എന്നിവയുടെ ഏകോപനം (ആവശ്യാനുസരണം)</span></li>
              </ul>
            </div>
            <div class="lg:col-span-5 flex items-center justify-center">
              <img src="assets/images/kalam-panchavarnam.webp" alt="Panchavarnam" class="w-full max-w-sm rounded-2xl object-contain mix-blend-multiply">
            </div>
          </div>

          <div class="border-t border-[#EADFC7] pt-10 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div class="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
              <img src="assets/images/kalam-ritual-art.webp" alt="Kalamezhuthu" class="w-full max-w-sm rounded-2xl object-contain mix-blend-multiply">
            </div>
            <div class="lg:col-span-7 order-1 lg:order-2 space-y-3">
              <span class="text-[11px] font-serif uppercase tracking-[0.2em] text-[#966D1B] font-semibold">Ishadam ദൗത്യം</span>
              <h2 class="font-['Noto_Sans_Malayalam',sans-serif] text-2xl sm:text-3xl font-bold text-[#173722] leading-snug">നമ്മുടെ പാരമ്പര്യം, നമ്മുടെ അഭിമാനം</h2>
              <p class="font-['Noto_Sans_Malayalam',sans-serif] text-sm sm:text-[16px] text-stone-700 leading-loose">കേരളത്തിന്റെ തനതായ ക്ഷേത്രകലകളെയും അനുഷ്ഠാനപാരമ്പര്യങ്ങളെയും ആദരവോടും ഉത്തരവാദിത്തത്തോടും അടുത്ത തലമുറയിലേക്ക് എത്തിക്കുക എന്നതാണ് Ishadam-ന്റെ ലക്ഷ്യം.</p>
            </div>
          </div>
        `;
      } else {
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
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    })();
