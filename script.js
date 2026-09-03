/* ==========================================================================
   HAPPY BIRTHDAY DAKSHITA (BEBE) - COMPLETE INTERACTIVE MASTER JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 0. LUXURY FULL-SCREEN LOCK CONTROLLER (PASSCODE: 0802 ONLY)
  // ------------------------------------------------------------------------
  const lockOverlay = document.getElementById('lock-screen-overlay');
  const lockDays = document.getElementById('lock-days');
  const lockHours = document.getElementById('lock-hours');
  const lockMinutes = document.getElementById('lock-minutes');
  const lockSeconds = document.getElementById('lock-seconds');

  // Inline Passcode Elements
  const lockIconTrigger = document.getElementById('lock-icon-trigger');
  const togglePasscodeBtn = document.getElementById('toggle-passcode-box-btn');
  const inlinePasscodeBox = document.getElementById('inline-passcode-box');
  const passcodeInput = document.getElementById('passcode-input');
  const passcodeSubmitBtn = document.getElementById('submit-passcode-btn');
  const passcodeErrorMsg = document.getElementById('passcode-error-msg');
  const previewBanner = document.getElementById('preview-active-banner');
  const relockBtn = document.getElementById('relock-website-btn');

  let isBypassed = false;

  // Target unlock timestamp: September 5, 2026 at 00:00:00 IST
  const now = new Date();
  let targetYear = 2026;
  if (now.getFullYear() < 2026) {
    targetYear = now.getFullYear();
  }
  const TARGET_UNLOCK_TIME = new Date(targetYear, 8, 5, 0, 0, 0).getTime();

  function updateLockCountdown() {
    if (isBypassed) return;

    const currentTime = new Date().getTime();
    const diff = TARGET_UNLOCK_TIME - currentTime;

    // Automatic midnight unlock on Sept 5th
    if (diff <= 0) {
      if (document.body.classList.contains('is-locked')) {
        document.body.classList.remove('is-locked');
        if (lockOverlay) lockOverlay.style.display = 'none';
        goToPage(1);
        launchConfetti(250);
        playChime(880, 0.6);
      }
      return;
    }

    // Keep strictly locked until midnight
    document.body.classList.add('is-locked');

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (lockDays) lockDays.textContent = String(days).padStart(2, '0');
    if (lockHours) lockHours.textContent = String(hours).padStart(2, '0');
    if (lockMinutes) lockMinutes.textContent = String(minutes).padStart(2, '0');
    if (lockSeconds) lockSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateLockCountdown();
  setInterval(updateLockCountdown, 1000);

  // Toggle Inline Passcode Box
  function togglePasscodeBox() {
    if (!inlinePasscodeBox) return;
    if (inlinePasscodeBox.style.display === 'none' || !inlinePasscodeBox.style.display) {
      inlinePasscodeBox.style.display = 'block';
      if (passcodeInput) {
        passcodeInput.value = '';
        passcodeInput.focus();
      }
      if (passcodeErrorMsg) passcodeErrorMsg.textContent = '';
    } else {
      inlinePasscodeBox.style.display = 'none';
    }
  }

  if (togglePasscodeBtn) togglePasscodeBtn.addEventListener('click', togglePasscodeBox);
  if (lockIconTrigger) lockIconTrigger.addEventListener('click', togglePasscodeBox);

  // Strictly verify 0802 ONLY
  function verifyPasscode() {
    if (!passcodeInput) return;
    const entered = passcodeInput.value.trim();

    if (entered === '0802') {
      isBypassed = true;
      document.body.classList.remove('is-locked');
      if (inlinePasscodeBox) inlinePasscodeBox.style.display = 'none';
      if (previewBanner) previewBanner.style.display = 'flex';
      goToPage(1);
      launchConfetti(150);
      playChime(783.99, 0.4);
    } else {
      if (passcodeErrorMsg) passcodeErrorMsg.textContent = '❌ Incorrect passcode! Try again.';
      passcodeInput.style.borderColor = '#ff4d6d';
      playChime(250, 0.25);
    }
  }

  if (passcodeSubmitBtn) passcodeSubmitBtn.addEventListener('click', verifyPasscode);
  if (passcodeInput) {
    passcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') verifyPasscode();
    });
  }

  // Relock Button
  if (relockBtn) {
    relockBtn.addEventListener('click', () => {
      isBypassed = false;
      document.body.classList.add('is-locked');
      if (previewBanner) previewBanner.style.display = 'none';
      playChime(440, 0.2);
      updateLockCountdown();
    });
  }

  
  // ------------------------------------------------------------------------
  // WAITING LOUNGE INTERACTIVE PLAY BUTTONS FOR DAKSHITA
  // ------------------------------------------------------------------------
  const btnPopConfetti = document.getElementById('btn-pop-confetti');
  const btnDropTeaser = document.getElementById('btn-drop-teaser');
  const btnSendHugs = document.getElementById('btn-send-hugs');
  const btnFortune = document.getElementById('btn-fortune-cookie');
  const btnPlayMelody = document.getElementById('btn-play-melody');
  const btnPleadUnlock = document.getElementById('btn-plead-unlock');

  const loungeFeedbackBox = document.getElementById('lounge-feedback-box');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackText = document.getElementById('feedback-text');
  const hugsCountSpan = document.getElementById('hugs-count');

  let hugsSent = 0;
  let teaserIndex = 0;
  let fortuneIndex = 0;
  let pleadIndex = 0;

  const secretTeasers = [
    { icon: "🎂", text: "Hint #1: There's an interactive 3-tier birthday cake inside where you can literally blow out the candles!" },
    { icon: "🚆", text: "Hint #2: 5 photo albums with 50 pictures... including our chaotic daily local train rides together!" },
    { icon: "💍", text: "Hint #3: A secret letter from your soon-to-be groom that will make your heart flutter!" },
    { icon: "🎟️", text: "Hint #4: 6 golden VIP coupons (massages, return trip to Lonavala, argument-pass) that Ratnesh cannot refuse!" },
    { icon: "🛋️", text: "Hint #5: The untold memories of our legendary all-nighter on the office couch until dawn..." },
    { icon: "🎬", text: "Hint #6: 3 video albums with 12 video clips dedicated entirely to you!" }
  ];

  const loveFortunes = [
    { icon: "🥠", text: "Fortune: You are turning 24, but your timeless smile makes the whole world stop and stare." },
    { icon: "🥠", text: "Fortune: Ratnesh is looking at your pictures right now smiling like the happiest man alive." },
    { icon: "🥠", text: "Fortune: You are 100% hot, 100% sweet, and 1000% loyal." },
    { icon: "🥠", text: "Fortune: Hearing you say 'Bebe' is Ratnesh's absolute favorite sound in the universe." },
    { icon: "🥠", text: "Fortune: A massive wave of birthday blessings and happiness is heading straight towards you at midnight!" }
  ];

  const pleadResponses = [
    { icon: "😜", text: "Nope! Ratnesh said strictly no peeking until 00:00! Good things come to those who wait!" },
    { icon: "🥺", text: "Even with those adorable puppy eyes, the vault stays sealed! Only a little time left, Bebe!" },
    { icon: "🎁", text: "The surprises inside are still being wrapped with extra love and kisses! Hold on, queen!" },
    { icon: "⏳", text: "Patience, gorgeous! Midnight is going to be so worth the wait, promise!" },
    { icon: "💕", text: "Bribe detected! But Ratnesh made me swear on his heart to keep it a secret until midnight!" }
  ];

  function showLoungeFeedback(icon, text) {
    if (!loungeFeedbackBox) return;
    loungeFeedbackBox.style.display = 'flex';
    feedbackIcon.textContent = icon;
    feedbackText.textContent = text;
  }

  // 1. Pop Confetti
  if (btnPopConfetti) {
    btnPopConfetti.addEventListener('click', () => {
      launchConfetti(120);
      playChime(700, 0.25);
      showLoungeFeedback("🎉", "Pop! Sending early birthday sparkle vibes to my favorite girl in the world!");
    });
  }

  // 2. Secret Teaser Hint
  if (btnDropTeaser) {
    btnDropTeaser.addEventListener('click', () => {
      const item = secretTeasers[teaserIndex % secretTeasers.length];
      teaserIndex++;
      playChime(600, 0.2);
      showLoungeFeedback(item.icon, item.text);
    });
  }

  // 3. Send Virtual Hugs
  if (btnSendHugs) {
    btnSendHugs.addEventListener('click', () => {
      hugsSent++;
      if (hugsCountSpan) hugsCountSpan.textContent = hugsSent;
      playChime(550, 0.15);
      for (let i = 0; i < 6; i++) {
        setTimeout(spawnFloatingHeart, i * 80);
      }
      showLoungeFeedback("🫂", `You just sent hug #${hugsSent} to Ratnesh! He felt it in his chest right this second! 💕`);
    });
  }

  // 4. Love Fortune Cookie
  if (btnFortune) {
    btnFortune.addEventListener('click', () => {
      const item = loveFortunes[fortuneIndex % loveFortunes.length];
      fortuneIndex++;
      playChime(750, 0.25);
      showLoungeFeedback(item.icon, item.text);
    });
  }

  // 5. Play Sweet Melody
  if (btnPlayMelody) {
    btnPlayMelody.addEventListener('click', () => {
      initAudio();
      if (isPlayingMusic) {
        isPlayingMusic = false;
        clearTimeout(musicTimer);
        btnPlayMelody.textContent = '🎶 Play Sweet Melody';
        showLoungeFeedback("⏸️", "Music paused. Tap again to play our sweet music box!");
      } else {
        isPlayingMusic = true;
        btnPlayMelody.textContent = '⏸️ Pause Melody';
        loopMelody();
        showLoungeFeedback("🎶", "Playing sweet music box melody... Relax and enjoy the countdown, Bebe!");
      }
    });
  }

  // 6. Plead to open early
  if (btnPleadUnlock) {
    btnPleadUnlock.addEventListener('click', () => {
      const item = pleadResponses[pleadIndex % pleadResponses.length];
      pleadIndex++;
      playChime(400, 0.2);
      showLoungeFeedback(item.icon, item.text);
    });
  }

  // 1. PAGE NAVIGATION CONTROLLER (10 Pages)
  // ------------------------------------------------------------------------
  const totalPages = 10;
  let currentPage = 1;

  const currentPageNumEl = document.getElementById('current-page-num');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const footerPrevBtn = document.getElementById('footer-prev-btn');
  const footerNextBtn = document.getElementById('footer-next-btn');
  const pageDotsBar = document.getElementById('page-dots-bar');
  const pagePillBtn = document.getElementById('page-pill-btn');
  const quickMenu = document.getElementById('quick-menu');
  const quickMenuItems = document.querySelectorAll('.quick-menu-item');

  // Build dots
  for (let i = 1; i <= totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = `page-dot ${i === 1 ? 'active' : ''}`;
    dot.title = `Go to Page ${i}`;
    dot.addEventListener('click', () => goToPage(i));
    pageDotsBar.appendChild(dot);
  }

  function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(`page-${pageNum}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    currentPage = pageNum;
    if (currentPageNumEl) currentPageNumEl.textContent = currentPage;

    const dots = document.querySelectorAll('.page-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentPage);
    });

    quickMenuItems.forEach(item => {
      const p = parseInt(item.getAttribute('data-page'));
      item.classList.toggle('active', p === currentPage);
    });

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (footerPrevBtn) footerPrevBtn.disabled = currentPage === 1;
    if (prevBtn) prevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';
    if (footerPrevBtn) footerPrevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    playChime(440 + currentPage * 40, 0.1);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  if (footerPrevBtn) footerPrevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  if (footerNextBtn) footerNextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  if (pagePillBtn) {
    pagePillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quickMenu.classList.toggle('show');
    });
  }

  document.addEventListener('click', (e) => {
    if (quickMenu && !quickMenu.contains(e.target) && e.target !== pagePillBtn) {
      quickMenu.classList.remove('show');
    }
  });

  quickMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      const p = parseInt(item.getAttribute('data-page'));
      goToPage(p);
      quickMenu.classList.remove('show');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToPage(currentPage - 1);
    }
  });

  // Touch swipe gesture navigation
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 70) {
      if (diff > 0) goToPage(currentPage + 1);
      else goToPage(currentPage - 1);
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 2. ROMANTIC AMBIENT SYNTHESIZER (Web Audio API)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicTimer = null;
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playChime(freq, duration = 0.2, type = 'sine') {
    try {
      initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {}
  }

  const romanticMelody = [
    523.25, 659.25, 783.99, 987.77, 1046.50,
    587.33, 698.46, 880.00, 1046.50,
    659.25, 783.99, 987.77, 1174.66,
    440.00, 523.25, 659.25, 783.99
  ];
  let noteIndex = 0;

  function loopMelody() {
    if (!isPlayingMusic) return;
    const freq = romanticMelody[noteIndex % romanticMelody.length];
    playChime(freq, 0.45, 'triangle');
    noteIndex++;
    musicTimer = setTimeout(loopMelody, 360);
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      initAudio();
      if (isPlayingMusic) {
        isPlayingMusic = false;
        clearTimeout(musicTimer);
        musicIcon.textContent = '🎵';
        musicToggleBtn.classList.remove('active');
      } else {
        isPlayingMusic = true;
        musicIcon.textContent = '🎶';
        musicToggleBtn.classList.add('active');
        loopMelody();
        launchConfetti(25);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. CONFETTI & PARTICLES ENGINE
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const confettiColors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#06d6a0', '#118ab2', '#e05780', '#c9184a'];

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 9 + 5;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 + 3;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 8 - 4;
      this.shape = Math.random() > 0.4 ? 'circle' : 'rect';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }
      ctx.restore();
    }
  }

  function launchConfetti(count = 90) {
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new ConfettiPiece());
    }
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const piece = confettiPieces[i];
      piece.update();
      piece.draw();
      if (piece.y > canvas.height + 20) {
        confettiPieces.splice(i, 1);
      }
    }
    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();

  const floatingHeartsBox = document.getElementById('floating-hearts-container');
  const heartSymbols = ['💖', '💕', '✨', '🌸', '❤️', '🌹', '🥰', '💐'];
  function spawnFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    heart.style.fontSize = (Math.random() * 16 + 18) + 'px';
    floatingHeartsBox.appendChild(heart);
    setTimeout(() => heart.remove(), 11000);
  }
  setInterval(spawnFloatingHeart, 800);

  const sparkleStormBtn = document.getElementById('sparkle-storm-btn');
  if (sparkleStormBtn) {
    sparkleStormBtn.addEventListener('click', () => {
      launchConfetti(80);
      playChime(659.25, 0.3);
      for (let i = 0; i < 15; i++) {
        setTimeout(spawnFloatingHeart, i * 80);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. PAGE 1: HERO
  // ------------------------------------------------------------------------
  const startJourneyBtn = document.getElementById('start-journey-btn');
  const confettiBlastBtn = document.getElementById('confetti-blast-btn');

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', () => {
      launchConfetti(100);
      goToPage(2);
    });
  }

  if (confettiBlastBtn) {
    confettiBlastBtn.addEventListener('click', () => {
      launchConfetti(90);
      playChime(523.25, 0.25);
    });
  }

  // ------------------------------------------------------------------------
  // 5. PAGE 2: CAKE & CANDLE CEREMONY
  // ------------------------------------------------------------------------
  const candles = document.querySelectorAll('.candle');
  const blowCandlesBtn = document.getElementById('blow-candles-btn');
  const relightCandlesBtn = document.getElementById('relight-candles-btn');
  const wishRevealBox = document.getElementById('wish-reveal-box');
  const secretWishBtn = document.getElementById('secret-wish-btn');
  const wishModal = document.getElementById('wish-modal');
  const wishCloseBtn = document.getElementById('wish-close-btn');
  const wishBackdrop = document.getElementById('wish-modal-backdrop');
  const submitWishBtn = document.getElementById('submit-wish-btn');
  const secretWishInput = document.getElementById('secret-wish-input');

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      candle.classList.toggle('blown');
      playChime(350, 0.15);
      const allBlown = Array.from(candles).every(c => c.classList.contains('blown'));
      if (allBlown) {
        wishRevealBox.classList.add('show');
        launchConfetti(120);
        playChime(880, 0.4);
      }
    });
  });

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      candles.forEach(c => c.classList.add('blown'));
      wishRevealBox.classList.add('show');
      launchConfetti(150);
      playChime(783.99, 0.4, 'triangle');
    });
  }

  if (relightCandlesBtn) {
    relightCandlesBtn.addEventListener('click', () => {
      candles.forEach(c => c.classList.remove('blown'));
      wishRevealBox.classList.remove('show');
      playChime(523.25, 0.2);
    });
  }

  if (secretWishBtn) {
    secretWishBtn.addEventListener('click', () => wishModal.classList.add('show'));
  }
  if (wishCloseBtn) wishCloseBtn.addEventListener('click', () => wishModal.classList.remove('show'));
  if (wishBackdrop) wishBackdrop.addEventListener('click', () => wishModal.classList.remove('show'));

  if (submitWishBtn) {
    submitWishBtn.addEventListener('click', () => {
      const text = secretWishInput.value.trim();
      if (!text) {
        alert("Please write your sweet wish first, Dakshita! 🌟");
        return;
      }
      wishModal.classList.remove('show');
      launchConfetti(100);
      alert("✨ Your wish has been safely locked into the stars! It will come true, promise! 💕");
      secretWishInput.value = '';
    });
  }

  // ------------------------------------------------------------------------
  // 6. PAGE 3: 10 REASONS FLIP CARDS & LOVE METER
  // ------------------------------------------------------------------------
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playChime(587.33, 0.15);
    });
  });

  const boostLoveBtn = document.getElementById('boost-love-btn');
  const loveMeterFill = document.getElementById('love-meter-fill');
  const lovePercentage = document.getElementById('love-percentage');
  let currentLove = 100;

  if (boostLoveBtn) {
    boostLoveBtn.addEventListener('click', () => {
      currentLove += 150;
      lovePercentage.textContent = `${currentLove}%`;
      launchConfetti(60);
      playChime(659.25 + (currentLove % 400), 0.2);
      if (currentLove >= 1000) {
        lovePercentage.textContent = `${currentLove}% (INFINITE OVERLOAD!) 💖`;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. PAGE 4: TIMELINE REACTIONS & MEMORY NOTE
  // ------------------------------------------------------------------------
  const reactionBtns = document.querySelectorAll('.reaction-btn');
  reactionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let count = parseInt(btn.getAttribute('data-reactions')) || 0;
      count++;
      btn.setAttribute('data-reactions', count);
      const span = btn.querySelector('span');
      if (span) span.textContent = count;
      launchConfetti(25);
      playChime(700, 0.15);
    });
  });

  const addMemoryNoteBtn = document.getElementById('add-memory-note-btn');
  if (addMemoryNoteBtn) {
    addMemoryNoteBtn.addEventListener('click', () => {
      const userMemory = prompt("What's another sweet memory with Dakshita you'd like to cherish? ✍️");
      if (userMemory) {
        alert("✨ Added to our permanent memory chest! Cherishing every moment with you! 💕");
        launchConfetti(40);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. PAGE 5: 5 PHOTO ALBUMS (10 PICTURES EACH = 50 PHOTOS TOTAL)
  // ------------------------------------------------------------------------
  const albumData = {
    album1: {
      name: "Daily Train Commutes",
      desc: "Our daily local train rides between office and home.",
      count: 10,
      captions: [
        "Waiting on the platform for our train 🚆",
        "Sharing earphones and listening to our playlist 🎵",
        "Squeezing together in the rush hour rush 💕",
        "Evening city lights passing by the window ✨",
        "Laughing about our crazy workday 😂",
        "That cute tired smile on the train seat 🥺",
        "Holding hands as the train speeds ahead 🤝",
        "Stealing glances in the crowded compartment 👀",
        "Our favorite commuting spot 🚉",
        "Making every commute feel like a date ❤️"
      ]
    },
    album2: {
      name: "Our Lonavala Getaway",
      desc: "Scenic train ride, misty hills, and waterfalls in Lonavala.",
      count: 10,
      captions: [
        "Boarding the scenic train to Lonavala 🚂",
        "Watching the Western Ghats roll by the glass 🌿",
        "Cool mountain breeze in your hair ⛰️",
        "Holding hands in the misty rain 🌧️",
        "Standing beside the gushing waterfalls 💦",
        "Hot chai and cozy moments in the hills ☕",
        "You looking breathtaking against the green valleys 🌲",
        "Golden hour sunset behind the clouds 🌅",
        "Unforgettable laughter in the quiet hills 😂",
        "Forever grateful for our Lonavala trip 💖"
      ]
    },
    album3: {
      name: "Office Couch All-Nighter",
      desc: "The legendary night we spent talking on the office couch.",
      count: 10,
      captions: [
        "Late evening when the office went completely quiet 🤫",
        "Settling into the cozy office couch 🛋️",
        "Midnight snacks and deep conversations 🍕",
        "Talking about our wildest dreams at 2 AM 🌟",
        "Your contagious giggles echoing in the empty hall 😂",
        "Sharing secrets that brought us so close 🤍",
        "3 AM sleepy eyes and cute yawns 🥺",
        "Watching the dark sky slowly turn to dawn 🌅",
        "The moment I knew you were my forever 💍",
        "A night that changed everything between us 💕"
      ]
    },
    album4: {
      name: "Match Day at My Place",
      desc: "When you came over 'just to check the match results'!",
      count: 10,
      captions: [
        "The first time you walked through my door 🚪",
        "Pretending it was strictly 'about the match' 😉",
        "Cheering and yelling at the screen together 🏏",
        "Sharing snacks and stealing cute glances 👀",
        "Butterflies that refused to go away 🦋",
        "Laughing at how little we actually watched the game 😂",
        "Making my room feel like home for the first time 🏡",
        "That unforgettable smile on my couch 🥰",
        "The best excuse we ever came up with 💖",
        "The beginning of so many cozy home moments ✨"
      ]
    },
    album5: {
      name: "Hot, Gorgeous & Loyal Dakshita",
      desc: "Celebrating my queen—radiant, stunning, and fiercely loyal.",
      count: 10,
      captions: [
        "Undeniably hot—turning heads effortlessly 🔥",
        "The most stunning smile in the universe ☀️",
        "Elegance and grace in every single frame 👑",
        "That radiant glow that lights up my world ✨",
        "Fiercely loyal and deeply caring heart 🤍",
        "My favorite person to stare at forever 😍",
        "Perfection without even trying 🌸",
        "Beauty, intelligence, and unmatched charm 💎",
        "My queen, my inspiration, my Bebe 🌹",
        "I am so blessed to be your soon-to-be groom 💍"
      ]
    }
  };

  const albumDisplayArea = document.getElementById('album-display-area');
  const albumTabBtns = document.querySelectorAll('.album-tab-btn');

  // Lightbox Modal Elements
  const photoModal = document.getElementById('photo-modal');
  const photoModalBackdrop = document.getElementById('photo-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCaptionTitle = document.getElementById('modal-caption-title');
  const modalCaptionText = document.getElementById('modal-caption-text');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let currentAlbumKey = 'album1';
  let activeLightboxIndex = 0;

  function renderAlbum(albumKey) {
    currentAlbumKey = albumKey;
    const album = albumData[albumKey];
    if (!album) return;

    let html = `<div class="album-grid">`;
    for (let i = 1; i <= album.count; i++) {
      const caption = album.captions[i - 1] || `Photo #${i}`;
      // Check real jpg with svg fallback
      const imgSrc = `assets/photos/${albumKey}/photo${i}.jpg`;
      const fallbackSvg = `assets/photos/${albumKey}/photo${i}.svg`;

      html += `
        <div class="album-photo-card" data-index="${i - 1}">
          <div class="album-img-wrap">
            <img src="${imgSrc}" onerror="this.onerror=null; this.src='${fallbackSvg}';" alt="${caption}">
          </div>
          <div class="album-caption">${caption}</div>
        </div>
      `;
    }
    html += `</div>`;
    albumDisplayArea.innerHTML = html;

    // Attach click listeners to cards
    const cards = albumDisplayArea.querySelectorAll('.album-photo-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'));
        openAlbumLightbox(idx);
      });
    });
  }

  function openAlbumLightbox(index) {
    activeLightboxIndex = index;
    const album = albumData[currentAlbumKey];
    const itemCaption = album.captions[activeLightboxIndex] || `Photo #${activeLightboxIndex + 1}`;
    const imgSrc = `assets/photos/${currentAlbumKey}/photo${activeLightboxIndex + 1}.jpg`;
    const fallbackSvg = `assets/photos/${currentAlbumKey}/photo${activeLightboxIndex + 1}.svg`;

    modalImg.src = imgSrc;
    modalImg.onerror = function() {
      this.onerror = null;
      this.src = fallbackSvg;
    };
    modalCaptionTitle.textContent = `${album.name} (#${activeLightboxIndex + 1}/10)`;
    modalCaptionText.textContent = itemCaption;
    photoModal.classList.add('show');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => photoModal.classList.remove('show'));
  if (photoModalBackdrop) photoModalBackdrop.addEventListener('click', () => photoModal.classList.remove('show'));

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex - 1 + 10) % 10;
      openAlbumLightbox(activeLightboxIndex);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex + 1) % 10;
      openAlbumLightbox(activeLightboxIndex);
    });
  }

  albumTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      albumTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const albumKey = btn.getAttribute('data-album');
      renderAlbum(albumKey);
    });
  });

  renderAlbum('album1');

  // ------------------------------------------------------------------------
  // 9. PAGE 6: DAKSHITA & RATNESH QUIZ
  // ------------------------------------------------------------------------
  const quizData = [
    {
      question: "1. What legendary miracle occurred on 5th September 2002?",
      options: [
        "The world was blessed with Dakshita's birth 👼",
        "The sweetest, prettiest angel landed on Earth ✨",
        "The universe created Ratnesh's favorite human 💕",
        "All of the above (100% indisputable facts!) 👑"
      ],
      correct: 3,
      note: "All of the above! Sept 5, 2002 is the best day in history! 💖"
    },
    {
      question: "2. What is Dakshita's absolute superpower?",
      options: [
        "Looking ridiculously hot without even trying 🔥",
        "Her fierce, unconditional loyalty & giant heart 🛡️",
        "Making the hardest day peaceful just by smiling ☀️",
        "All of the above (and infinitely more!) 👑"
      ],
      correct: 3,
      note: "All of the above! You are truly magical, Dakshita. ✨"
    },
    {
      question: "3. What is our special mutual pet name for each other?",
      options: [
        "Bebe (I call her Bebe, and she calls me Bebe!) 💕",
        "Babu / Shona",
        "Cutie pie",
        "Partner in crime"
      ],
      correct: 0,
      note: "Bebe! It's our own sweet language of love! 🥰"
    },
    {
      question: "4. Where did we debate 'Who will be the best groom for you'?",
      options: [
        "During late-night phone calls... leading to Ratnesh being the groom! 💍",
        "At a cafe",
        "In an email",
        "We never talked about it"
      ],
      correct: 0,
      note: "Those late-night phone calls sealed our destiny! Soon-to-be your groom! 💍"
    }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const quizScoreBoard = document.getElementById('quiz-score-board');
  const retryQuizBtn = document.getElementById('retry-quiz-btn');
  let currentQuizStep = 0;

  function renderQuizQuestion(step) {
    if (!quizContainer) return;
    quizContainer.innerHTML = '';
    if (step >= quizData.length) {
      quizScoreBoard.classList.add('show');
      launchConfetti(100);
      playChime(880, 0.4);
      return;
    }

    quizScoreBoard.classList.remove('show');
    const q = quizData[step];

    const qBox = document.createElement('div');
    qBox.className = 'quiz-question-box';

    const qTitle = document.createElement('div');
    qTitle.className = 'quiz-q-title';
    qTitle.textContent = q.question;
    qBox.appendChild(qTitle);

    const optsBox = document.createElement('div');
    optsBox.className = 'quiz-options';

    q.options.forEach((optText) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;

      btn.addEventListener('click', () => {
        btn.classList.add('correct');
        playChime(659.25, 0.25);
        launchConfetti(30);

        setTimeout(() => {
          currentQuizStep++;
          renderQuizQuestion(currentQuizStep);
        }, 600);
      });

      optsBox.appendChild(btn);
    });

    qBox.appendChild(optsBox);
    quizContainer.appendChild(qBox);
  }

  renderQuizQuestion(0);

  if (retryQuizBtn) {
    retryQuizBtn.addEventListener('click', () => {
      currentQuizStep = 0;
      renderQuizQuestion(0);
    });
  }

  // ------------------------------------------------------------------------
  // 10. PAGE 7: INFINITE LOVE REASON GENERATOR
  // ------------------------------------------------------------------------
  const loveReasons = [
    { text: "Because your smile has the power to fix my worst days instantly.", emoji: "☀️" },
    { text: "Because you make our daily local train rides feel like romantic movie scenes.", emoji: "🚆" },
    { text: "Because our all-nighter on the office couch showed me my forever.", emoji: "🛋️" },
    { text: "Because you came over 'just for match results'—my favorite excuse in history!", emoji: "🏏" },
    { text: "Because you looked unimaginably gorgeous standing in the misty hills of Lonavala.", emoji: "⛰️" },
    { text: "Because after wondering who your groom would be... I get to be your groom!", emoji: "💍" },
    { text: "Because you are fiercely loyal, deeply caring, and undeniably hot.", emoji: "🔥" },
    { text: "Because the sweetest sound in the world is hearing you call me 'Bebe'.", emoji: "🥰" },
    { text: "Because you give the warmest, safest, and most comforting hugs on earth.", emoji: "🫂" },
    { text: "Because loving you is the easiest, most natural thing I have ever done.", emoji: "💖" }
  ];

  const slotSpinBtn = document.getElementById('slot-spin-btn');
  const copyReasonBtn = document.getElementById('copy-reason-btn');
  const slotEmoji = document.getElementById('slot-emoji');
  const slotReason = document.getElementById('slot-reason');
  const slotSpinCount = document.getElementById('slot-spin-count');
  let spinTally = 1;

  if (slotSpinBtn) {
    slotSpinBtn.addEventListener('click', () => {
      spinTally++;
      if (slotSpinCount) slotSpinCount.textContent = spinTally;

      let count = 0;
      const interval = setInterval(() => {
        const rand = loveReasons[Math.floor(Math.random() * loveReasons.length)];
        slotEmoji.textContent = rand.emoji;
        slotReason.textContent = `"${rand.text}"`;
        playChime(500 + Math.random() * 300, 0.05);
        count++;
        if (count > 8) {
          clearInterval(interval);
          const finalItem = loveReasons[Math.floor(Math.random() * loveReasons.length)];
          slotEmoji.textContent = finalItem.emoji;
          slotReason.textContent = `"${finalItem.text}"`;
          launchConfetti(45);
          playChime(880, 0.25);
        }
      }, 60);
    });
  }

  if (copyReasonBtn) {
    copyReasonBtn.addEventListener('click', () => {
      const textToCopy = `${slotEmoji.textContent} ${slotReason.textContent}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("📋 Copied to clipboard! Share it with Ratnesh anytime! 💕");
      }).catch(() => {
        alert("Copied: " + textToCopy);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 11. PAGE 8: "OPEN WHEN..." LETTERS
  // ------------------------------------------------------------------------
  const letterContents = {
    "1": {
      title: "Open When You Miss Our Train Commutes 🚆",
      body: "My dearest Dakshita (my Bebe),<br><br>Whenever you're on a journey and miss our chats, close your eyes. Remember how we rushed to catch the same compartment, how we shared earphones with our favorite songs, and how we stood close in the crowd. Those rides were pure heaven because I was with you.<br><br>Can't wait for our next trip together, my love."
    },
    "2": {
      title: "Open When You're Stressed From Work 🌸",
      body: "Hey my hard-working Dakshita,<br><br>Take a deep breath right now. Drop your shoulders, unclench your jaw, and let go. You have handled so much, and you do it with so much grace. It is okay to rest. The world can wait—your peace comes first.<br><br>I am so proud of you, always."
    },
    "3": {
      title: "Open When You Miss The Office Couch Talks 🌙",
      body: "To my favorite human,<br><br>Do you remember when the office went dark and quiet, and it was just you and me on that couch? We didn't sleep a single minute, and we didn't care. That night was one of the happiest nights of my life because I got to know the real, raw, beautiful soul of Dakshita.<br><br>I will stay up talking to you for the rest of my life."
    },
    "4": {
      title: "Open When You're Mad at Me 🥺",
      body: "My beautiful Bebe,<br><br>First: I am sorry. Whatever silly thing I said or did to upset you, your happiness means more to me than being right. You are my priority, and I never want to be the cause of your frown.<br><br>I'm ready with snacks, a tight apology hug, and unlimited listening whenever you're ready."
    },
    "5": {
      title: "Open When You Need a Reminder of How Hot You Are 👑",
      body: "Look in the mirror right now, Dakshita.<br><br>You are looking at the most breathtakingly hot and gorgeous woman in this world. From your stunning eyes to your radiant smile and effortless poise, you make my jaw drop every single day.<br><br>Never forget how utterly irresistible you are!"
    },
    "6": {
      title: "Open For A Note From Your Soon-To-Be Groom 💍",
      body: "My soon-to-be bride, Dakshita,<br><br>Remember when we used to discuss who would be the best fit to be your groom on those late-night calls? Every time we talked about it, deep down my heart was screaming: 'Please let it be me.'<br><br>And God answered my prayers. I promise to be the best groom, partner, best friend, and protector for you every single day of our lives. Happy 24th Birthday, my queen!"
    }
  };

  const letterModal = document.getElementById('letter-modal');
  const letterModalTitle = document.getElementById('letter-modal-title');
  const letterModalBody = document.getElementById('letter-modal-body');
  const letterCloseBtn = document.getElementById('letter-close-btn');
  const letterBackdrop = document.getElementById('letter-modal-backdrop');

  document.querySelectorAll('.envelope-item').forEach(env => {
    env.addEventListener('click', () => {
      const letterId = env.getAttribute('data-letter');
      const letter = letterContents[letterId];
      if (letter) {
        letterModalTitle.innerHTML = letter.title;
        letterModalBody.innerHTML = letter.body;
        letterModal.classList.add('show');
        launchConfetti(35);
        playChime(659.25, 0.25);
      }
    });
  });

  if (letterCloseBtn) letterCloseBtn.addEventListener('click', () => letterModal.classList.remove('show'));
  if (letterBackdrop) letterBackdrop.addEventListener('click', () => letterModal.classList.remove('show'));

  // ------------------------------------------------------------------------
  // 12. PAGE 9: DAKSHITA'S VIP LOVE COUPONS
  // ------------------------------------------------------------------------
  window.redeemCoupon = function(couponId) {
    const card = document.getElementById(couponId);
    if (!card || card.classList.contains('redeemed')) return;

    card.classList.add('redeemed');
    const btn = card.querySelector('.claim-btn');
    if (btn) btn.textContent = 'Claimed by Dakshita! 💖';

    localStorage.setItem(`coupon_${couponId}`, 'redeemed');
    launchConfetti(80);
    playChime(783.99, 0.3);
    alert("🎉 Coupon claimed! Show this to Ratnesh to redeem your treat! 💕");
  };

  for (let i = 1; i <= 6; i++) {
    const id = `coupon-${i}`;
    if (localStorage.getItem(`coupon_${id}`) === 'redeemed') {
      const card = document.getElementById(id);
      if (card) {
        card.classList.add('redeemed');
        const btn = card.querySelector('.claim-btn');
        if (btn) btn.textContent = 'Claimed by Dakshita! 💖';
      }
    }
  }

  // ------------------------------------------------------------------------
  // 13. PAGE 10: 3 VIDEO ALBUMS (12 VIDEOS TOTAL) & FINALE ACTIONS
  // ------------------------------------------------------------------------
  const videoAlbumData = {
    album1: {
      name: "Goofy & Cute Clips",
      videos: [
        { title: "Video 1: Unfiltered Laughter & Giggles", src: "assets/videos/album1/video1.mp4" },
        { title: "Video 2: Goofy Moments Together", src: "assets/videos/album1/video2.mp4" },
        { title: "Video 3: The Cutest Expressions", src: "assets/videos/album1/video3.mp4" },
        { title: "Video 4: Pure Chaos & Fun", src: "assets/videos/album1/video4.mp4" }
      ]
    },
    album2: {
      name: "Lonavala & Trains",
      videos: [
        { title: "Video 1: The Local Train Commute Ride", src: "assets/videos/album2/video1.mp4" },
        { title: "Video 2: Scenic Train into Lonavala", src: "assets/videos/album2/video2.mp4" },
        { title: "Video 3: Misty Hills & Waterfalls", src: "assets/videos/album2/video3.mp4" },
        { title: "Video 4: Holding Hands in the Mountains", src: "assets/videos/album2/video4.mp4" }
      ]
    },
    album3: {
      name: "Birthday Montages",
      videos: [
        { title: "Video 1: Celebrating 24 Years of Dakshita", src: "assets/videos/album3/video1.mp4" },
        { title: "Video 2: Memories We Built This Year", src: "assets/videos/album3/video2.mp4" },
        { title: "Video 3: A Message from Your Soon-To-Be Groom", src: "assets/videos/album3/video3.mp4" },
        { title: "Video 4: Forever and Always With You", src: "assets/videos/album3/video4.mp4" }
      ]
    }
  };

  const mainVideoPlayer = document.getElementById('main-video-player');
  const mainVideoSource = document.getElementById('main-video-source');
  const currentVideoTitle = document.getElementById('current-video-title');
  const videoPlaylistGrid = document.getElementById('video-playlist-grid');
  const videoTabBtns = document.querySelectorAll('.video-tab-btn');

  let currentVideoAlbumKey = 'album1';

  function renderVideoAlbum(albumKey) {
    currentVideoAlbumKey = albumKey;
    const vAlbum = videoAlbumData[albumKey];
    if (!vAlbum || !videoPlaylistGrid) return;

    let html = '';
    vAlbum.videos.forEach((v, idx) => {
      html += `
        <div class="video-card-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <div class="video-card-icon">▶️</div>
          <div class="video-card-title">${v.title}</div>
        </div>
      `;
    });
    videoPlaylistGrid.innerHTML = html;

    // Load first video of the album
    playSelectedVideo(0);

    // Attach click listeners to cards
    const cards = videoPlaylistGrid.querySelectorAll('.video-card-item');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const idx = parseInt(card.getAttribute('data-index'));
        playSelectedVideo(idx);
      });
    });
  }

  function playSelectedVideo(index) {
    const vAlbum = videoAlbumData[currentVideoAlbumKey];
    const target = vAlbum.videos[index];
    if (!target) return;

    currentVideoTitle.textContent = `Playing: ${target.title}`;
    mainVideoSource.src = target.src;
    mainVideoPlayer.load();
  }

  videoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const albumKey = btn.getAttribute('data-valbum');
      renderVideoAlbum(albumKey);
    });
  });

  renderVideoAlbum('album1');

  // Finale Actions
  const showerHeartsBtn = document.getElementById('shower-hearts-btn');
  const sendReplyBtn = document.getElementById('send-reply-btn');
  const restartJourneyBtn = document.getElementById('restart-journey-btn');

  if (showerHeartsBtn) {
    showerHeartsBtn.addEventListener('click', () => {
      launchConfetti(200);
      playChime(880, 0.5);
      for (let i = 0; i < 40; i++) {
        setTimeout(spawnFloatingHeart, i * 50);
      }
    });
  }

  if (sendReplyBtn) {
    sendReplyBtn.addEventListener('click', () => {
      const msg = encodeURIComponent("Hey Bebe (Ratnesh)! 💕 I just saw my 24th birthday website and I LOVE IT SO MUCH! Best birthday surprise ever! 🥰✨ — Your Bebe, Dakshita");
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    });
  }

  if (restartJourneyBtn) {
    restartJourneyBtn.addEventListener('click', () => {
      goToPage(1);
      launchConfetti(70);
    });
  }

});
