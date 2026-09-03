/* ==========================================================================
   HAPPY BIRTHDAY BEBE - INTERACTIVE MASTER JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // LIVE COUNTDOWN TO SEPTEMBER 5TH, 2026 (BEBE'S 24TH BIRTHDAY)
  // ------------------------------------------------------------------------
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');
  const countdownBox = document.getElementById('bday-countdown-box');

  function updateCountdown() {
    const targetDate = new Date('2026-09-05T00:00:00+05:30').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (countdownBox) {
        countdownBox.innerHTML = `
          <div class="countdown-title" style="font-size: 1.15rem; color: #c9184a;">
            👑 IT'S SEPTEMBER 5TH! HAPPY 24TH BIRTHDAY BEBE! 🎂🎉✨
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

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
    
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target page
    const targetSection = document.getElementById(`page-${pageNum}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    currentPage = pageNum;
    currentPageNumEl.textContent = currentPage;

    // Update dots
    const dots = document.querySelectorAll('.page-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentPage);
    });

    // Update quick menu active item
    quickMenuItems.forEach(item => {
      const p = parseInt(item.getAttribute('data-page'));
      item.classList.toggle('active', p === currentPage);
    });

    // Update prev/next button states
    prevBtn.disabled = currentPage === 1;
    footerPrevBtn.disabled = currentPage === 1;
    prevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';
    footerPrevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';

    // Scroll smoothly to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sound effect chime
    playChime(440 + currentPage * 40, 0.1);
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  footerPrevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  footerNextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  // Quick menu toggle
  pagePillBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    quickMenu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!quickMenu.contains(e.target) && e.target !== pagePillBtn) {
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

  // Keyboard navigation
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
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 70) {
      if (diff > 0) {
        // swipe left -> next page
        goToPage(currentPage + 1);
      } else {
        // swipe right -> prev page
        goToPage(currentPage - 1);
      }
    }
  }

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
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
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
    } catch (err) {
      // Audio not permitted yet
    }
  }

  // Dreamy Music Box Arpeggio
  const romanticMelody = [
    523.25, 659.25, 783.99, 987.77, 1046.50, // C E G B C
    587.33, 698.46, 880.00, 1046.50,         // D F A C
    659.25, 783.99, 987.77, 1174.66,         // E G B D
    440.00, 523.25, 659.25, 783.99          // A C E G
  ];
  let noteIndex = 0;

  function loopMelody() {
    if (!isPlayingMusic) return;
    const freq = romanticMelody[noteIndex % romanticMelody.length];
    playChime(freq, 0.45, 'triangle');
    noteIndex++;
    musicTimer = setTimeout(loopMelody, 360);
  }

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

  // Floating Hearts background generator
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

  // Sparkle Storm Top Button
  const sparkleStormBtn = document.getElementById('sparkle-storm-btn');
  sparkleStormBtn.addEventListener('click', () => {
    launchConfetti(80);
    playChime(659.25, 0.3);
    for (let i = 0; i < 15; i++) {
      setTimeout(spawnFloatingHeart, i * 80);
    }
  });

  // ------------------------------------------------------------------------
  // 4. PAGE 1: HERO & WELCOME
  // ------------------------------------------------------------------------
  const startJourneyBtn = document.getElementById('start-journey-btn');
  const confettiBlastBtn = document.getElementById('confetti-blast-btn');

  startJourneyBtn.addEventListener('click', () => {
    launchConfetti(100);
    goToPage(2);
  });

  confettiBlastBtn.addEventListener('click', () => {
    launchConfetti(90);
    playChime(523.25, 0.25);
  });

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

  // Click individual candles
  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      candle.classList.toggle('blown');
      playChime(350, 0.15);
      checkAllCandlesBlown();
    });
  });

  function checkAllCandlesBlown() {
    const allBlown = Array.from(candles).every(c => c.classList.contains('blown'));
    if (allBlown) {
      wishRevealBox.classList.add('show');
      launchConfetti(120);
      playChime(880, 0.4);
    }
  }

  blowCandlesBtn.addEventListener('click', () => {
    candles.forEach(c => c.classList.add('blown'));
    wishRevealBox.classList.add('show');
    launchConfetti(150);
    playChime(783.99, 0.4, 'triangle');
  });

  relightCandlesBtn.addEventListener('click', () => {
    candles.forEach(c => c.classList.remove('blown'));
    wishRevealBox.classList.remove('show');
    playChime(523.25, 0.2);
  });

  // Secret Wish Modal
  secretWishBtn.addEventListener('click', () => {
    wishModal.classList.add('show');
  });
  wishCloseBtn.addEventListener('click', () => wishModal.classList.remove('show'));
  wishBackdrop.addEventListener('click', () => wishModal.classList.remove('show'));

  submitWishBtn.addEventListener('click', () => {
    const text = secretWishInput.value.trim();
    if (!text) {
      alert("Please write your sweet wish first, Bebe! 🌟");
      return;
    }
    wishModal.classList.remove('show');
    launchConfetti(100);
    alert("✨ Your wish has been safely locked into the stars! It will come true, promise! 💕");
    secretWishInput.value = '';
  });

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

  boostLoveBtn.addEventListener('click', () => {
    currentLove += 150;
    lovePercentage.textContent = `${currentLove}%`;
    launchConfetti(60);
    playChime(659.25 + (currentLove % 400), 0.2);
    if (currentLove >= 1000) {
      lovePercentage.textContent = `${currentLove}% (INFINITE OVERLOAD!) 💖`;
    }
  });

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
  addMemoryNoteBtn.addEventListener('click', () => {
    const userMemory = prompt("What's a sweet memory you'd like to add, Bebe? ✍️");
    if (userMemory) {
      alert("✨ Added to our permanent memory chest! I cherish this moment so much! 💕");
      launchConfetti(40);
    }
  });

  // ------------------------------------------------------------------------
  // 8. PAGE 5: POLAROID GALLERY & LIGHTBOX
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const polaroids = document.querySelectorAll('.polaroid-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      polaroids.forEach(card => {
        if (filter === 'all' || card.classList.contains(`filter-${filter}`)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const photoModal = document.getElementById('photo-modal');
  const photoModalBackdrop = document.getElementById('photo-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCaptionTitle = document.getElementById('modal-caption-title');
  const modalCaptionText = document.getElementById('modal-caption-text');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let activePhotoIndex = 0;
  const photoList = Array.from(polaroids).map(p => ({
    imgSrc: p.querySelector('img').src,
    title: p.querySelector('.polaroid-caption').textContent,
    caption: p.getAttribute('data-caption')
  }));

  function openLightbox(index) {
    activePhotoIndex = index;
    const item = photoList[activePhotoIndex];
    modalImg.src = item.imgSrc;
    modalCaptionTitle.textContent = item.title;
    modalCaptionText.textContent = item.caption;
    photoModal.classList.add('show');
  }

  polaroids.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  modalCloseBtn.addEventListener('click', () => photoModal.classList.remove('show'));
  photoModalBackdrop.addEventListener('click', () => photoModal.classList.remove('show'));

  lightboxPrevBtn.addEventListener('click', () => {
    activePhotoIndex = (activePhotoIndex - 1 + photoList.length) % photoList.length;
    openLightbox(activePhotoIndex);
  });

  lightboxNextBtn.addEventListener('click', () => {
    activePhotoIndex = (activePhotoIndex + 1) % photoList.length;
    openLightbox(activePhotoIndex);
  });

  // ------------------------------------------------------------------------
  // 9. PAGE 6: COUPLE QUIZ MINI-GAME
  // ------------------------------------------------------------------------
  const quizData = [
    {
      question: "1. What legendary miracle occurred on 5th September 2002?",
      options: [
        "The world was blessed with Bebe's birth 👼",
        "The sweetest, prettiest angel landed on Earth ✨",
        "The universe created Ratnesh's favorite human 💕",
        "All of the above (100% indisputable facts!) 👑"
      ],
      correct: 3,
      note: "All of the above! Sept 5, 2002 is the best day in history! 💖"
    },
    {
      question: "2. What is Bebe's absolute superpower?",
      options: [
        "Looking ridiculously cute without even trying",
        "Lighting up any room with her smile",
        "Being the sweetest, most caring human alive",
        "All of the above (and infinitely more!)"
      ],
      correct: 3,
      note: "All of the above, obviously! You are truly magical. ✨"
    },
    {
      question: "3. What happens when Bebe gets sleepy or hungry?",
      options: [
        "She turns into an adorable grumpy kitten 🥺",
        "Needs immediate cuddles and snacks 🍕",
        "Both A and B!",
        "Stays totally calm (lies!)"
      ],
      correct: 2,
      note: "Guaranteed grumpy kitten mode activated! 😂"
    },
    {
      question: "4. Where is Ratnesh's absolute favorite place on Earth?",
      options: [
        "A tropical island",
        "Right beside Bebe, wherever she is",
        "A cozy cafe",
        "A mountain peak"
      ],
      correct: 1,
      note: "Any place in the world is heaven as long as you're there. 💍"
    }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const quizScoreBoard = document.getElementById('quiz-score-board');
  const retryQuizBtn = document.getElementById('retry-quiz-btn');
  let currentQuizStep = 0;

  function renderQuizQuestion(step) {
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

    q.options.forEach((optText, optIdx) => {
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

  retryQuizBtn.addEventListener('click', () => {
    currentQuizStep = 0;
    renderQuizQuestion(0);
  });

  // ------------------------------------------------------------------------
  // 10. PAGE 7: INFINITE LOVE REASON GENERATOR / SLOT MACHINE
  // ------------------------------------------------------------------------
  const loveReasons = [
    { text: "Because your smile has the power to fix my worst days instantly.", emoji: "☀️" },
    { text: "Because you make even a boring grocery run feel like the greatest adventure.", emoji: "🛒" },
    { text: "Because the way your nose scrunches when you laugh is the cutest sight on Earth.", emoji: "🥺" },
    { text: "Because you believe in me even when I doubt myself.", emoji: "🌟" },
    { text: "Because you give the warmest, safest, and most comforting hugs.", emoji: "🫂" },
    { text: "Because talking to you at 1 AM makes hours fly by in minutes.", emoji: "🌙" },
    { text: "Because your heart is so pure and full of empathy for everyone.", emoji: "🤍" },
    { text: "Because you are unapologetically yourself around me.", emoji: "💫" },
    { text: "Because listening to you ramble about things you love is my favorite podcast.", emoji: "🎙️" },
    { text: "Because you remember the little details I mention in passing.", emoji: "🧠" },
    { text: "Because you're not just my girlfriend—you're my best friend and soulmate.", emoji: "👑" },
    { text: "Because waking up knowing you're in my life makes every morning brighter.", emoji: "☕" },
    { text: "Because our inside jokes make zero sense to anyone else, and that's perfection.", emoji: "😂" },
    { text: "Because simply seeing your name pop up on my phone makes my heart flutter.", emoji: "📱" },
    { text: "Because you look breathtaking whether you're all dressed up or in cozy pajamas.", emoji: "👗" },
    { text: "Because loving you is the easiest, most natural thing I have ever done.", emoji: "💖" }
  ];

  const slotSpinBtn = document.getElementById('slot-spin-btn');
  const copyReasonBtn = document.getElementById('copy-reason-btn');
  const slotEmoji = document.getElementById('slot-emoji');
  const slotReason = document.getElementById('slot-reason');
  const slotSpinCount = document.getElementById('slot-spin-count');
  let spinTally = 1;

  slotSpinBtn.addEventListener('click', () => {
    spinTally++;
    slotSpinCount.textContent = spinTally;

    // slot reel animation
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

  copyReasonBtn.addEventListener('click', () => {
    const textToCopy = `${slotEmoji.textContent} ${slotReason.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("📋 Copied to clipboard! Share it with me anytime! 💕");
    }).catch(() => {
      alert("Copied: " + textToCopy);
    });
  });

  // ------------------------------------------------------------------------
  // 11. PAGE 8: "OPEN WHEN..." SEALED LETTERS
  // ------------------------------------------------------------------------
  const letterContents = {
    "1": {
      title: "Open When You Miss Me 💌",
      body: "My dearest Bebe,<br><br>Whenever distance feels a little too far, close your eyes and remember: you carry a giant piece of my heart with you wherever you go. I am always just one text, one call, or one thought away. Distance means nothing when you mean everything to me.<br><br>Sending you the tightest virtual hug right this second."
    },
    "2": {
      title: "Open When You're Stressed or Tired 🌸",
      body: "Hey my hard-working girl,<br><br>Take a deep breath right now. Drop your shoulders, unclench your jaw, and let go. You have handled so much, and you do it with so much grace. It is okay to rest. The world can wait—your peace comes first.<br><br>I am so proud of you, always."
    },
    "3": {
      title: "Open When You Can't Sleep 🌙",
      body: "Sweet dreams, my love,<br><br>If sleep is evading you tonight, let your mind drift to our happiest moments: our endless laughs, our long talks, and all the incredible trips we have yet to take. Know that you are safe, cherished, and deeply loved.<br><br>I'll see you in our dreams tonight."
    },
    "4": {
      title: "Open When You're Mad at Me 🥺",
      body: "To my favorite human,<br><br>First: I am sorry. Whatever silly thing I said or did to upset you, your happiness means more to me than being right. You are my priority, and I never want to be the cause of your frown.<br><br>I'm ready with snacks, a tight apology hug, and unlimited listening whenever you're ready."
    },
    "5": {
      title: "Open When You Need a Reminder of How Gorgeous You Are 👑",
      body: "Look in the mirror right now, Bebe.<br><br>You are looking at the most stunning person in the world. From the sparkle in your eyes to your effortless grace and radiant energy, you take my breath away every single day.<br><br>Never let anyone (even yourself!) make you doubt your beauty."
    },
    "6": {
      title: "Open on Your Birthday Night! 🎂✨",
      body: "HAPPY BIRTHDAY AGAIN, MY BEBE!<br><br>Tonight, as another beautiful chapter begins, I hope you feel like the queen you are. This year is going to bring you so much success, joy, and peace. I am honored to celebrate it by your side.<br><br>Let's make this year unforgettable!"
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

  letterCloseBtn.addEventListener('click', () => letterModal.classList.remove('show'));
  letterBackdrop.addEventListener('click', () => letterModal.classList.remove('show'));

  // ------------------------------------------------------------------------
  // 12. PAGE 9: VIP LOVE COUPONS
  // ------------------------------------------------------------------------
  window.redeemCoupon = function(couponId) {
    const card = document.getElementById(couponId);
    if (!card || card.classList.contains('redeemed')) return;

    card.classList.add('redeemed');
    const btn = card.querySelector('.claim-btn');
    if (btn) {
      btn.textContent = 'Claimed by Bebe! 💖';
    }

    // Save in localStorage
    localStorage.setItem(`coupon_${couponId}`, 'redeemed');
    launchConfetti(80);
    playChime(783.99, 0.3);
    alert("🎉 Coupon claimed! Show this to Ratnesh to redeem your treat! 💕");
  };

  // Restore claimed coupons
  for (let i = 1; i <= 6; i++) {
    const id = `coupon-${i}`;
    if (localStorage.getItem(`coupon_${id}`) === 'redeemed') {
      const card = document.getElementById(id);
      if (card) {
        card.classList.add('redeemed');
        const btn = card.querySelector('.claim-btn');
        if (btn) btn.textContent = 'Claimed by Bebe! 💖';
      }
    }
  }

  // ------------------------------------------------------------------------
  // 13. PAGE 10: FINALE VIDEO & ACTIONS
  // ------------------------------------------------------------------------
  const showerHeartsBtn = document.getElementById('shower-hearts-btn');
  const sendReplyBtn = document.getElementById('send-reply-btn');
  const restartJourneyBtn = document.getElementById('restart-journey-btn');

  showerHeartsBtn.addEventListener('click', () => {
    launchConfetti(200);
    playChime(880, 0.5);
    for (let i = 0; i < 40; i++) {
      setTimeout(spawnFloatingHeart, i * 50);
    }
  });

  sendReplyBtn.addEventListener('click', () => {
    const msg = encodeURIComponent("Hey Ratnesh! 💕 I just saw my birthday website and I LOVE IT SO MUCH! Best birthday surprise ever! 🥰✨");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  });

  restartJourneyBtn.addEventListener('click', () => {
    goToPage(1);
    launchConfetti(70);
  });

});
