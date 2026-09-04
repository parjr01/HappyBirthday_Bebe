/* ==========================================================================
   HAPPY BIRTHDAY DAKSHITA (BEBE) - CONTINUOUS ROTATING MEDIA SHOWCASE SCRIPT
   ========================================================================== */

// ==========================================================================
// 📁 YOUR MEDIA STREAM FILES (PUT ALL PHOTOS & VIDEOS IN assets/ FOLDER)
// --------------------------------------------------------------------------
// You can use ANY filenames and ANY extensions (.heic, .jpg, .png, .mp4, .mov)!
// Simply list your filenames below.
// If left empty, it will automatically load 16 aesthetic sample cards!
// ==========================================================================
window.MEDIA_STREAM_FILES = [
"IMG_1739.HEIC",
"IMG_1778.HEIC",
"IMG_1824.HEIC",
"IMG_1836.HEIC",
"IMG_1853.HEIC",
"IMG_1858.HEIC",
"IMG_1863.HEIC",
"IMG_1891.HEIC",
"IMG_1894.HEIC",
"IMG_1905.HEIC",
"IMG_1922.HEIC",
"IMG_1925.HEIC",
"IMG_1926.HEIC",
"IMG_1998.HEIC",
"IMG_3260.heic",
"IMG_3323.JPG",
"IMG_3328.HEIC",
"IMG_3361.HEIC",
"IMG_3368.JPG",
"IMG_3385.HEIC",
"IMG_3452.HEIC",
"IMG_3545.JPG",
"IMG_3557.HEIC",
"IMG_3566.JPG",
"IMG_3648.HEIC",
"IMG_3666.HEIC",
"IMG_3691.HEIC",
"IMG_3699.HEIC",
"IMG_3725.JPG",
"IMG_3941.HEIC",
"IMG_3968.HEIC",
"IMG_3979.PNG",
"IMG_3990.HEIC",
"IMG_3991.HEIC",
"IMG_3995.HEIC",
"WhatsApp Image 2026-06-30 at 17.10.03.jpeg",
"WhatsApp Image 2026-07-08 at 12.04.50 (1).jpeg",
"WhatsApp Image 2026-07-08 at 12.04.50.jpeg",
"WhatsApp Image 2026-07-08 at 12.27.01.jpeg",
"WhatsApp Image 2026-08-22 at 13.01.56.jpeg",
"WhatsApp Image 2026-09-04 at 01.54.56.jpeg",
"WhatsApp Image 2026-09-04 at 10.57.45.jpeg",
"WhatsApp Image 2026-09-04 at 10.58.49.jpeg",
"WhatsApp Image 2026-09-04 at 10.59.59.jpeg",
"WhatsApp Image 2026-09-04 at 11.00.15.jpeg",
"WhatsApp Image 2026-09-04 at 14.11.11.jpeg",
"WhatsApp Image 2026-09-04 at 14.11.12.jpeg",
"WhatsApp Image 2026-09-04 at 14.24.56.jpeg",
"photo1.HEIC"
];

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 0. LUXURY FULL-SCREEN LOCK CONTROLLER (PASSCODE: 0802 ONLY)
  // ------------------------------------------------------------------------
  const lockOverlay = document.getElementById('lock-screen-overlay');
  const lockDays = document.getElementById('lock-days');
  const lockHours = document.getElementById('lock-hours');
  const lockMinutes = document.getElementById('lock-minutes');
  const lockSeconds = document.getElementById('lock-seconds');

  const lockIconTrigger = document.getElementById('lock-icon-trigger');
  const togglePasscodeBtn = document.getElementById('toggle-passcode-box-btn');
  const inlinePasscodeBox = document.getElementById('inline-passcode-box');
  const passcodeInput = document.getElementById('passcode-input');
  const passcodeSubmitBtn = document.getElementById('submit-passcode-btn');
  const passcodeErrorMsg = document.getElementById('passcode-error-msg');
  const previewBanner = document.getElementById('preview-active-banner');
  const relockBtn = document.getElementById('relock-website-btn');

  let isBypassed = false;

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
      if (passcodeErrorMsg) passcodeErrorMsg.textContent = '❌ Incorrect passcode! Access denied.';
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
    { icon: "🎂", text: "Hint #1: There's an interactive 3-tier cake where you can literally blow out the candles with real wind!" },
    { icon: "🎞️", text: "Hint #2: An infinite auto-scrolling media reel rotating all our favorite photos & video clips!" },
    { icon: "💍", text: "Hint #3: A private love letter from your soon-to-be groom that will definitely make you blush..." },
    { icon: "🎟️", text: "Hint #4: 6 VIP Golden Coupons (head massage, zero chores, argument passes) Ratnesh cannot refuse!" },
    { icon: "🛋️", text: "Hint #5: The untold memories of our legendary all-nighter on the office couch until dawn..." },
    { icon: "✨", text: "Hint #6: An entire 10-page birthday universe built just for you!" }
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

  if (btnPopConfetti) {
    btnPopConfetti.addEventListener('click', () => {
      launchConfetti(120);
      playChime(700, 0.25);
      showLoungeFeedback("🎉", "Pop! Sending early birthday sparkle vibes to my favorite girl in the world!");
    });
  }

  if (btnDropTeaser) {
    btnDropTeaser.addEventListener('click', () => {
      const item = secretTeasers[teaserIndex % secretTeasers.length];
      teaserIndex++;
      playChime(600, 0.2);
      showLoungeFeedback(item.icon, item.text);
    });
  }

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

  if (btnFortune) {
    btnFortune.addEventListener('click', () => {
      const item = loveFortunes[fortuneIndex % loveFortunes.length];
      fortuneIndex++;
      playChime(750, 0.25);
      showLoungeFeedback(item.icon, item.text);
    });
  }

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

  if (btnPleadUnlock) {
    btnPleadUnlock.addEventListener('click', () => {
      const item = pleadResponses[pleadIndex % pleadResponses.length];
      pleadIndex++;
      playChime(400, 0.2);
      showLoungeFeedback(item.icon, item.text);
    });
  }

  // ------------------------------------------------------------------------
  // TV / PROJECTOR FULLSCREEN TOGGLE
  // ------------------------------------------------------------------------
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
        fullscreenBtn.innerHTML = '⛶ <span class="btn-label">Exit Fullscreen</span>';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        fullscreenBtn.innerHTML = '📺 <span class="btn-label">TV / Fullscreen</span>';
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fullscreenBtn.innerHTML = '📺 <span class="btn-label">TV / Fullscreen</span>';
      } else {
        fullscreenBtn.innerHTML = '⛶ <span class="btn-label">Exit Fullscreen</span>';
      }
    });
  }

  // ------------------------------------------------------------------------
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
  // 2. ROMANTIC AMBIENT SYNTHESIZER & WIND AUDIO (Web Audio API)
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

  function playWindBlowSound() {
    try {
      initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const bufferSize = Math.floor(audioCtx.sampleRate * 0.85);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.75);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
      noise.stop(audioCtx.currentTime + 0.85);
    } catch (e) {}
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
  // 5. PAGE 2: REALISTIC CANDLE BLOWING & SMOKE CEREMONY
  // ------------------------------------------------------------------------
  const candles = document.querySelectorAll('.candle');
  const blowCandlesBtn = document.getElementById('blow-candles-btn');
  const relightCandlesBtn = document.getElementById('relight-candles-btn');
  const wishRevealBox = document.getElementById('wish-reveal-box');
  const windGust = document.getElementById('wind-gust');
  const secretWishBtn = document.getElementById('secret-wish-btn');
  const wishModal = document.getElementById('wish-modal');
  const wishCloseBtn = document.getElementById('wish-close-btn');
  const wishBackdrop = document.getElementById('wish-modal-backdrop');
  const submitWishBtn = document.getElementById('submit-wish-btn');
  const secretWishInput = document.getElementById('secret-wish-input');

  function blowSingleCandle(candle, delay = 0) {
    setTimeout(() => {
      if (candle.classList.contains('blown')) return;
      candle.classList.remove('blown');
      candle.classList.add('blowing');
      playChime(320, 0.12);

      setTimeout(() => {
        candle.classList.remove('blowing');
        candle.classList.add('blown');
        checkAllCandlesBlown();
      }, 480);
    }, delay);
  }

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      if (!candle.classList.contains('blown')) {
        playWindBlowSound();
        blowSingleCandle(candle, 0);
      } else {
        candle.classList.remove('blown');
        candle.classList.remove('blowing');
        playChime(523.25, 0.15);
      }
    });
  });

  function checkAllCandlesBlown() {
    const allBlown = Array.from(candles).every(c => c.classList.contains('blown'));
    if (allBlown) {
      setTimeout(() => {
        if (wishRevealBox) wishRevealBox.classList.add('show');
        launchConfetti(150);
        playChime(880, 0.5, 'triangle');
        setTimeout(() => playChime(1046.50, 0.6, 'sine'), 220);
      }, 300);
    }
  }

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      playWindBlowSound();
      if (windGust) {
        windGust.classList.remove('active');
        void windGust.offsetWidth;
        windGust.classList.add('active');
      }
      candles.forEach((candle, idx) => {
        blowSingleCandle(candle, idx * 110);
      });
    });
  }

  if (relightCandlesBtn) {
    relightCandlesBtn.addEventListener('click', () => {
      candles.forEach(c => {
        c.classList.remove('blown');
        c.classList.remove('blowing');
      });
      if (wishRevealBox) wishRevealBox.classList.remove('show');
      playChime(587.33, 0.25);
      launchConfetti(30);
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
  // 6. PAGE 3: 10 NUANCES FLIP CARDS & LOVE METER
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
  // 8. PAGE 5: CONTINUOUS AUTO-ROTATING MEDIA SHOWCASE (PHOTOS & VIDEOS)
  // ------------------------------------------------------------------------
  const track1 = document.getElementById('stream-track-1');
  const track2 = document.getElementById('stream-track-2');
  const showcaseWrapper = document.getElementById('infinite-showcase-wrapper');
  const toggleStreamBtn = document.getElementById('toggle-stream-btn');
  const speedPills = document.querySelectorAll('.speed-pill');

  // Maximizer Modal Elements
  const maximizerModal = document.getElementById('media-maximizer-modal');
  const maximizerBackdrop = document.getElementById('maximizer-backdrop');
  const maximizerCloseBtn = document.getElementById('maximizer-close-btn');
  const maximizerStage = document.getElementById('maximizer-stage');
  const maximizerCounter = document.getElementById('maximizer-counter');
  const maximizerPrevBtn = document.getElementById('maximizer-prev-btn');
  const maximizerNextBtn = document.getElementById('maximizer-next-btn');

  let activeMediaIndex = 0;
  let allMediaItems = [];

  // Determine media list: custom or default 16 samples
  let userFiles = window.MEDIA_STREAM_FILES || [];
  if (userFiles.length === 0) {
    // Default 16 samples (mix of photos and sample videos)
    for (let i = 1; i <= 16; i++) {
      userFiles.push(`sample_${i}.svg`);
    }
  }

  // Build items metadata (supports local files, HEIC, Google Drive, and YouTube links!)
  allMediaItems = userFiles.map((filename, idx) => {
    let src = filename;
    let isVideo = false;
    let isHeic = false;
    let isYouTube = false;
    let isGDrive = false;
    let thumbUrl = '';
    let embedUrl = '';

    const ytMatch = filename.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      isYouTube = true;
      isVideo = true;
      const ytId = ytMatch[1];
      thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
      src = embedUrl;
    } else if (filename.includes('drive.google.com')) {
      isGDrive = true;
      isVideo = true;
      const gMatch = filename.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (gMatch) {
        const gId = gMatch[1];
        thumbUrl = `https://lh3.googleusercontent.com/d/${gId}`;
        embedUrl = `https://drive.google.com/file/d/${gId}/preview`;
        src = embedUrl;
      }
    } else {
      if (!src.startsWith('assets/') && !src.startsWith('http')) {
        src = `assets/${filename}`;
      }
      const ext = filename.split('.').pop().toLowerCase().split('?')[0];
      isVideo = ['mp4', 'mov', 'webm', 'm4v', 'ogv'].includes(ext);
      isHeic = ['heic', 'heif'].includes(ext);
    }

    return { id: idx, filename, src, isVideo, isHeic, isYouTube, isGDrive, thumbUrl, embedUrl };
  });

  // Convert HEIC file via heic2any if supported, else return direct src
  async function handleHeicSource(src, imgElement) {
    if (window.heic2any) {
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const conversionResult = await heic2any({ blob, toType: 'image/jpeg', quality: 0.88 });
        const url = URL.createObjectURL(conversionResult);
        imgElement.src = url;
      } catch (e) {
        imgElement.src = src;
      }
    } else {
      imgElement.src = src;
    }
  }

  function createMediaCard(item) {
    const card = document.createElement('div');
    card.className = `stream-card ${item.isVideo ? 'is-video' : ''}`;
    card.setAttribute('data-idx', item.id);

    if (item.isYouTube || item.isGDrive) {
      const img = document.createElement('img');
      img.src = item.thumbUrl;
      img.alt = `Media ${item.id + 1}`;
      img.onerror = function() {
        this.onerror = null;
        this.src = `assets/sample_${(item.id % 16) + 1}.svg`;
      };
      card.appendChild(img);
    } else if (item.isVideo) {
      const vid = document.createElement('video');
      vid.src = item.src;
      vid.muted = true;
      vid.loop = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      card.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.alt = `Media ${item.id + 1}`;
      if (item.isHeic) {
        handleHeicSource(item.src, img);
      } else {
        img.src = item.src;
        img.onerror = function() {
          this.onerror = null;
          this.src = `assets/sample_${(item.id % 16) + 1}.svg`;
        };
      }
      card.appendChild(img);
    }

    card.addEventListener('click', () => openMaximizer(item.id));
    return card;
  }

  // Populate Track 1 (First half) and Track 2 (Second half) with duplicates for seamless infinite scroll
  function buildTracks() {
    if (!track1 || !track2) return;
    track1.innerHTML = '';
    track2.innerHTML = '';

    const mid = Math.ceil(allMediaItems.length / 2);
    const set1 = allMediaItems.slice(0, mid);
    const set2 = allMediaItems.slice(mid);

    // Track 1
    const items1 = set1.length > 0 ? set1 : allMediaItems;
    items1.forEach(item => track1.appendChild(createMediaCard(item)));
    items1.forEach(item => track1.appendChild(createMediaCard(item))); // duplicate for infinite loop

    // Track 2
    const items2 = set2.length > 0 ? set2 : allMediaItems;
    items2.forEach(item => track2.appendChild(createMediaCard(item)));
    items2.forEach(item => track2.appendChild(createMediaCard(item))); // duplicate for infinite loop
  }
  buildTracks();

  // Stream controls: Pause / Play toggle
  let isStreamPaused = false;
  if (toggleStreamBtn) {
    toggleStreamBtn.addEventListener('click', () => {
      isStreamPaused = !isStreamPaused;
      if (showcaseWrapper) showcaseWrapper.classList.toggle('paused', isStreamPaused);
      toggleStreamBtn.textContent = isStreamPaused ? '▶️ Resume Stream' : '⏸️ Pause Stream';
      playChime(500, 0.15);
    });
  }

  // Speed controls
  speedPills.forEach(pill => {
    pill.addEventListener('click', () => {
      speedPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const speed = pill.getAttribute('data-speed');
      let duration = '30s';
      if (speed === 'slow') duration = '48s';
      if (speed === 'fast') duration = '18s';

      if (track1) track1.style.animationDuration = duration;
      if (track2) track2.style.animationDuration = duration;
      playChime(600, 0.15);
    });
  });

  // Maximizer Modal
  function openMaximizer(index) {
    activeMediaIndex = index;
    const item = allMediaItems[activeMediaIndex];
    if (!item) return;

    if (maximizerCounter) {
      maximizerCounter.textContent = `${activeMediaIndex + 1} / ${allMediaItems.length}`;
    }

    if (maximizerStage) {
      maximizerStage.innerHTML = '';
      if (item.isYouTube || item.isGDrive) {
        const iframe = document.createElement('iframe');
        iframe.src = item.embedUrl;
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        maximizerStage.appendChild(iframe);
      } else if (item.isVideo) {
        const vid = document.createElement('video');
        vid.src = item.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        maximizerStage.appendChild(vid);
      } else {
        const img = document.createElement('img');
        if (item.isHeic) {
          handleHeicSource(item.src, img);
        } else {
          img.src = item.src;
          img.onerror = function() {
            this.onerror = null;
            this.src = `assets/sample_${(item.id % 16) + 1}.svg`;
          };
        }
        maximizerStage.appendChild(img);
      }
    }

    if (maximizerModal) maximizerModal.classList.add('show');
    playChime(650, 0.2);
  }

  function closeMaximizer() {
    if (maximizerModal) maximizerModal.classList.remove('show');
    if (maximizerStage) {
      const vid = maximizerStage.querySelector('video');
      if (vid) vid.pause();
      maximizerStage.innerHTML = '';
    }
  }

  if (maximizerCloseBtn) maximizerCloseBtn.addEventListener('click', closeMaximizer);
  if (maximizerBackdrop) maximizerBackdrop.addEventListener('click', closeMaximizer);

  if (maximizerPrevBtn) {
    maximizerPrevBtn.addEventListener('click', () => {
      activeMediaIndex = (activeMediaIndex - 1 + allMediaItems.length) % allMediaItems.length;
      openMaximizer(activeMediaIndex);
    });
  }

  if (maximizerNextBtn) {
    maximizerNextBtn.addEventListener('click', () => {
      activeMediaIndex = (activeMediaIndex + 1) % allMediaItems.length;
      openMaximizer(activeMediaIndex);
    });
  }

  // Keyboard navigation for maximizer
  document.addEventListener('keydown', (e) => {
    if (maximizerModal && maximizerModal.classList.contains('show')) {
      if (e.key === 'ArrowRight') {
        activeMediaIndex = (activeMediaIndex + 1) % allMediaItems.length;
        openMaximizer(activeMediaIndex);
      } else if (e.key === 'ArrowLeft') {
        activeMediaIndex = (activeMediaIndex - 1 + allMediaItems.length) % allMediaItems.length;
        openMaximizer(activeMediaIndex);
      } else if (e.key === 'Escape') {
        closeMaximizer();
      }
    }
  });

  // ------------------------------------------------------------------------
  // 9. PAGE 6: DAKSHITA & RATNESH QUIZ (FRESH & WITTY)
  // ------------------------------------------------------------------------
  const quizData = [
    {
      question: "1. What miraculous event took place on 5th September 2002?",
      options: [
        "The world was blessed with Dakshita's arrival 👼",
        "The prettiest girl in history landed on Earth ✨",
        "The beginning of Ratnesh's future happiness 💕",
        "All of the above (100% indisputable facts!) 👑"
      ],
      correct: 3,
      note: "All of the above! Sept 5, 2002 changed the universe forever! 💖"
    },
    {
      question: "2. When Dakshita says 'I don't care, you pick what to eat', what does it mean?",
      options: [
        "She genuinely doesn't care (a total myth!)",
        "She will reject your first 4 suggestions until you guess her secret craving 🍔",
        "She wants you to order pizza immediately",
        "She will just eat half of your plate anyway"
      ],
      correct: 1,
      note: "The classic guessing game! We all know it's a sacred ritual! 😂"
    },
    {
      question: "3. What is our exclusive mutual pet name for each other?",
      options: [
        "Bebe (I call her Bebe, and she calls me Bebe!) 💕",
        "Babu / Shona",
        "Cutie pie",
        "Partner in crime"
      ],
      correct: 0,
      note: "Bebe! Our own sweet language that belongs only to us! 🥰"
    },
    {
      question: "4. Who ended up being your groom after all those late-night consultations?",
      options: [
        "Some random guy we debated on the phone",
        "Ratnesh—the luckiest, happiest soon-to-be groom on earth! 💍",
        "The search is still going on (impossible!)",
        "A movie actor"
      ],
      correct: 1,
      note: "The search was always meant to lead right to me! Forever your groom! 💍"
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
  // 10. PAGE 7: APPRECIATION MACHINE (FRESH MICRO-COMPLIMENTS)
  // ------------------------------------------------------------------------
  const loveReasons = [
    { text: "Because you are turning 24, yet your radiant heart and timeless beauty only get more mesmerizing every single year.", emoji: "☀️" },
    { text: "Because your sharp mind and ambitious goals inspire me to be a better man every day.", emoji: "🎯" },
    { text: "Because you look like an absolute dream whether dressed up in a saree or in cozy sweatpants.", emoji: "👑" },
    { text: "Because the genuine kindness you show to strangers and animals reveals how pure your soul is.", emoji: "🤍" },
    { text: "Because you make the most mundane errands feel like the most thrilling adventures.", emoji: "🚗" },
    { text: "Because you understand what I'm feeling without me having to speak a single sentence.", emoji: "🧠" },
    { text: "Because your laugh is infectious—it can light up an entire crowded room in seconds.", emoji: "😂" },
    { text: "Because you are fiercely protective and loyal to the people who matter to you.", emoji: "🛡️" },
    { text: "Because no matter how chaotic the outside world is, resting in your hug is pure peace.", emoji: "🫂" },
    { text: "Because out of 8 billion people on Earth, God chose me to be your Bebe and future groom.", emoji: "💍" },
    { text: "Because you are unapologetically yourself around me, and that is my greatest treasure.", emoji: "✨" },
    { text: "Because simply seeing your name flash on my phone still gives me butterflies.", emoji: "📱" }
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
  // 11. PAGE 8: "OPEN WHEN..." LETTERS (REAL LIFE SUPPORT)
  // ------------------------------------------------------------------------
  const letterContents = {
    "1": {
      title: "Open When You're Exhausted by Work & Routine 💼",
      body: "Hey my resilient, hard-working Dakshita,<br><br>Take a long, deep breath right now. Drop your shoulders, unclench your jaw, and let go of the pressure. You carry so much with such quiet strength, but remember: you don't have to be a superhero every single second. The emails can wait, the tasks can pause. Your peace comes before everything else in this world.<br><br>Close your laptop, take a hot shower, and know that I am so endlessly proud of how hard you strive. I've got your back, always."
    },
    "2": {
      title: "Open When Self-Doubt Creeps In 🪞",
      body: "Look in the mirror right this second, my queen.<br><br>I wish you could see yourself through my eyes just for ten seconds. You would see a woman of breathtaking grace, unmatched sharp intellect, a golden heart of empathy, and a rare fierce loyalty that anyone would be blessed to have in their corner. You are capable of moving mountains, and no temporary setback can ever diminish the powerhouse you are.<br><br>Hold your chin up high, Bebe. You are extraordinary."
    },
    "3": {
      title: "Open When Your Mind Won't Let You Sleep at 2 AM 🌙",
      body: "Sweet dreams, my favorite human,<br><br>If overthinking is keeping you awake tonight, let your thoughts gently rest on the happiness we've built. Think of our silliest laughs, the warmth of holding hands, and all the incredible sunrises we are going to watch together in the years ahead. You are safe, you are cherished beyond measure, and tomorrow is a fresh page.<br><br>I'll be waiting for you in our dreams tonight."
    },
    "4": {
      title: "Open When We Had a Disagreement ⚡",
      body: "To my forever partner,<br><br>First and foremost: I love you. Even when we disagree, even when we are stubborn or words come out clumsy, my love for you does not waver for a single millisecond. Our bond is bigger and deeper than any argument. Your feelings matter to me, and your happiness is my priority.<br><br>Whenever you're ready, come into my arms. No ego, no pride—just you, me, and an apology hug waiting for you."
    },
    "5": {
      title: "Open When You Need a Deep Hug From Afar 🫂",
      body: "My dearest Bebe,<br><br>Distance might put physical miles between us right now, but you carry a giant piece of my heart wherever you walk. Close your eyes, wrap your arms around yourself, and feel this: I am sending you the warmest, tightest, most comforting hug imaginable. You are never alone in this world.<br><br>I am just one thought, one call, and one heartbeat away."
    },
    "6": {
      title: "Open on the Morning of Your 24th Birthday! 🎂✨",
      body: "HAPPY 24TH BIRTHDAY, DAKSHITA!<br><br>As you wake up today to enter your 24th year, I hope you feel the boundless warmth of how adored you are. You bring so much light into every room you enter, and you have turned my life into a beautiful dream. This year is going to bring you career triumphs, peace, deep happiness, and unforgettable adventures.<br><br>Let's celebrate you today, tomorrow, and every day for the rest of our lives!"
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
    alert("🎉 Coupon claimed! Show this to Ratnesh to redeem your royal treat! 💕");
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
  // 13. PAGE 10: FINALE ACTIONS
  // ------------------------------------------------------------------------
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
