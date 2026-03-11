document.addEventListener('DOMContentLoaded', () => {

  // ------ Slider Init -------
  function initSlider(section) {
    const viewport = section.querySelector('.slider-viewport');
    const track    = section.querySelector('.grid-layout');
    const prevBtn  = section.querySelector('.prev-btn');
    const nextBtn  = section.querySelector('.next-btn');
    const cards    = Array.from(track ? track.querySelectorAll('.music-card') : []);

    if (!viewport || !track || cards.length === 0) return;

    let currentIndex = 0;

    function getVisibleCount() {
      const w = viewport.clientWidth;
      if (w < 480) return 2;
      if (w < 768) return 2;
      if (w < 992) return 3;
      //** */ Desktop: always 6
      return 6;
    }

    function positionArrows() {
      // ** Align arrow vertically to the image area, not the full card (image is square = card width / visibleCount)
      const visible   = getVisibleCount();
      const cardWidth = viewport.clientWidth / visible;
      const imgHeight = cardWidth; // square images
      const arrowTop  = imgHeight / 2;
      if (prevBtn) prevBtn.style.top = arrowTop + 'px';
      if (nextBtn) nextBtn.style.top = arrowTop + 'px';
    }

    function update() {
      const visible   = getVisibleCount();
      const cardWidth = viewport.clientWidth / visible;
      const maxIndex  = Math.max(0, cards.length - visible);

      currentIndex = Math.min(currentIndex, maxIndex);

      cards.forEach(c => { c.style.width = cardWidth + 'px'; });
      track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

      positionArrows();
    }

    prevBtn?.addEventListener('click', () => {
      const visible = getVisibleCount();
      currentIndex = Math.max(0, currentIndex - visible);
      update();
    });

    nextBtn?.addEventListener('click', () => {
      const visible  = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = Math.min(maxIndex, currentIndex + visible);
      update();
    });

    update();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 80);
    });
  }

  document.querySelectorAll('.content-section').forEach(initSlider);


  // ------------ Play / Pause toggle ------------
  const playButtons = document.querySelectorAll('.play-btn-card');

  playButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const icon = btn.querySelector('i');
      const isPlaying = icon.classList.contains('bi-pause-fill');

      playButtons.forEach(other => {
        if (other !== btn) {
          other.querySelector('i').classList.replace('bi-pause-fill', 'bi-play-fill');
          other.classList.remove('active');
        }
      });

      if (isPlaying) {
        icon.classList.replace('bi-pause-fill', 'bi-play-fill');
        btn.classList.remove('active');
      } else {
        icon.classList.replace('bi-play-fill', 'bi-pause-fill');
        btn.classList.add('active');
      }
    });
  });


  // --- Card Click -------------------
  document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('click', () => {
      console.log('Card clicked:', card.dataset.title || card.querySelector('.card-info h5')?.textContent);
    });
  });


  // ---- Mobile Search Overlay -------------------------------
  const overlay      = document.getElementById('mobileSearchOverlay');
  const mobSearchBtn = document.getElementById('mobSearchBtn');
  const mobClose     = document.getElementById('mobSearchClose');
  const mobCancel    = document.getElementById('mobSearchCancel');
  const mobInput     = document.getElementById('mobSearchInput');

  const openSearch  = () => { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; setTimeout(() => mobInput?.focus(), 100); };
  const closeSearch = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; if (mobInput) mobInput.value = ''; };

  mobSearchBtn?.addEventListener('click', e => { e.preventDefault(); openSearch(); });
  mobClose?.addEventListener('click', closeSearch);
  mobCancel?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeSearch(); });


  // ------ Mobile Bottom Nav ------------------------------
  document.querySelectorAll('.mob-nav-item').forEach(item => {
    item.addEventListener('click', e => {
      if (item.id === 'mobSearchBtn') return;
      e.preventDefault();
      document.querySelectorAll('.mob-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


  // ----- Desktop Search Focus ----------------------------
  const desktopSearch = document.querySelector('.search-input');
  desktopSearch?.addEventListener('focus', () => document.querySelector('.search-icon')?.classList.add('text-white'));
  desktopSearch?.addEventListener('blur',  () => document.querySelector('.search-icon')?.classList.remove('text-white'));

});