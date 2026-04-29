(function () {
  'use strict';

  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const wrapper = canvas.parentElement;
  const startScreen = document.getElementById('game-start-screen');
  const overScreen = document.getElementById('game-over-screen');
  const hud = document.getElementById('game-hud');
  const hudScore = document.getElementById('hud-score');
  const hudHigh = document.getElementById('hud-highscore');
  const msgEl = document.getElementById('game-message');
  const scoreEl = document.getElementById('game-score-display');
  const highEl = document.getElementById('game-highscore-display');
  const restartBtn = document.getElementById('game-restart-btn');

  const HS_KEY = 'katerina-game-highscore';
  const RASPBERRY_LIGHT = '#B83066';
  const RASPBERRY_DARK = '#a31f4f';
  const ERROR_RED = '#cc0000';

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cssW = 0;
  let cssH = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    cssW = rect.width;
    cssH = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function isDark() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getInk() {
    return isDark() ? '#F7F4EE' : '#1A1714';
  }
  function getBerry() {
    return isDark() ? RASPBERRY_LIGHT : RASPBERRY_DARK;
  }

  // Game state
  const STATE = { IDLE: 'idle', RUNNING: 'running', OVER: 'over', BLOWING: 'blowing' };
  let state = STATE.IDLE;
  let score = 0;
  let highScore = parseInt(localStorage.getItem(HS_KEY) || '0', 10) || 0;
  let speed = 4;
  const gravity = 0.6;
  const jumpForce = -11;

  // Player
  const player = {
    x: 60,
    y: 0,
    w: 36,
    h: 40,
    vy: 0,
    onGround: true,
    blowOffset: 0,
    blowAlpha: 1,
  };

  let groundY = 0;

  let obstacles = [];
  let nextSpawnDist = 0;
  let distSinceSpawn = 0;

  function reset() {
    score = 0;
    speed = 4;
    obstacles = [];
    distSinceSpawn = 0;
    nextSpawnDist = 280;
    player.vy = 0;
    player.onGround = true;
    player.blowOffset = 0;
    player.blowAlpha = 1;
    groundY = cssH - 28;
    player.y = groundY - player.h;
  }

  function startGame() {
    if (state === STATE.RUNNING) return;
    reset();
    state = STATE.RUNNING;
    startScreen.classList.add('hidden');
    overScreen.classList.add('hidden');
    hud.classList.remove('hidden');
    updateHud();
  }

  function updateHud() {
    hudScore.textContent = String(Math.floor(score));
    hudHigh.textContent = highScore > 0 ? 'rekord ' + highScore : '';
  }

  function jump() {
    if (state === STATE.RUNNING && player.onGround) {
      player.vy = jumpForce;
      player.onGround = false;
    }
  }

  function gameOver(byWind) {
    if (state === STATE.OVER) return;
    if (byWind) {
      state = STATE.BLOWING;
      player.blowStart = performance.now();
      return;
    }
    finishGameOver(false);
  }

  function finishGameOver(byWind) {
    state = STATE.OVER;
    const final = Math.floor(score);
    if (final > highScore) {
      highScore = final;
      try { localStorage.setItem(HS_KEY, String(highScore)); } catch (e) {}
    }
    let msg;
    if (byWind) msg = 'Vítr tě odnesl!';
    else if (final < 100) msg = 'Ještě to chce trénink.';
    else if (final <= 500) msg = 'Dobrý začátek! Zkusíte to znovu?';
    else msg = 'Tak to bylo skvělý!';
    msgEl.textContent = msg;
    scoreEl.textContent = 'Skóre: ' + final;
    highEl.textContent = 'Rekord: ' + highScore;
    overScreen.classList.remove('hidden');
    hud.classList.add('hidden');
  }

  // Obstacles ----------------------------------------------------
  function spawnObstacle() {
    const r = Math.random();
    let type;
    if (r < 0.20) type = 'wave';
    else if (r < 0.47) type = 'dollar';
    else if (r < 0.74) type = 'euro';
    else type = 'error';

    const ob = { type, x: cssW + 20 };
    if (type === 'wave') {
      ob.w = 60; ob.h = 18;
      ob.y = groundY - 70;
    } else if (type === 'error') {
      ob.w = 56; ob.h = 22;
      ob.y = groundY - ob.h;
    } else {
      ob.w = 26; ob.h = 36;
      ob.y = groundY - ob.h;
    }
    obstacles.push(ob);
  }

  function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  // Drawing ------------------------------------------------------
  function drawGround() {
    const ink = getInk();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    // doodle ground line
    let x = 0;
    ctx.moveTo(0, groundY);
    while (x < cssW) {
      const nx = x + 30;
      const wobble = (Math.random() - 0.5) * 0.6;
      ctx.lineTo(nx, groundY + wobble);
      x = nx;
    }
    ctx.stroke();
  }

  function drawPlayer() {
    const ink = getInk();
    const berry = getBerry();
    const cx = player.x + player.w / 2 + player.blowOffset;
    const cy = player.y + player.h / 2;
    ctx.save();
    ctx.globalAlpha = player.blowAlpha;

    // Body — raspberry blob (slightly lumpy circle)
    ctx.fillStyle = berry;
    ctx.strokeStyle = berry;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    const rb = 16;
    const lumps = 10;
    for (let i = 0; i <= lumps; i++) {
      const a = (i / lumps) * Math.PI * 2;
      const rr = rb + Math.sin(a * 3) * 1.5;
      const px = cx + Math.cos(a) * rr;
      const py = cy + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Tiny stem (leaf)
    ctx.strokeStyle = ink;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - rb);
    ctx.lineTo(cx + 2, cy - rb - 5);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + rb - 2);
    ctx.lineTo(cx - 7, cy + rb + 8);
    ctx.moveTo(cx + 6, cy + rb - 2);
    ctx.lineTo(cx + 7, cy + rb + 8);
    ctx.stroke();
    // feet
    ctx.beginPath();
    ctx.moveTo(cx - 11, cy + rb + 8);
    ctx.lineTo(cx - 4, cy + rb + 8);
    ctx.moveTo(cx + 4, cy + rb + 8);
    ctx.lineTo(cx + 11, cy + rb + 8);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(cx - rb + 2, cy - 2);
    ctx.lineTo(cx - rb - 6, cy + 4);
    ctx.moveTo(cx + rb - 2, cy - 2);
    ctx.lineTo(cx + rb + 6, cy + 4);
    ctx.stroke();

    // Glasses — two circles + bridge + temples
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 3, 3.5, 0, Math.PI * 2);
    ctx.moveTo(cx + 8.5, cy - 3);
    ctx.arc(cx + 5, cy - 3, 3.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 1.5, cy - 3);
    ctx.lineTo(cx + 1.5, cy - 3);
    // temples
    ctx.moveTo(cx - 8.5, cy - 3);
    ctx.lineTo(cx - 11, cy - 4);
    ctx.moveTo(cx + 8.5, cy - 3);
    ctx.lineTo(cx + 11, cy - 4);
    ctx.stroke();

    // Eyes (dots)
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 3, 0.9, 0, Math.PI * 2);
    ctx.arc(cx + 5, cy - 3, 0.9, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawDollar(ob) {
    const ink = getInk();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const x = ob.x, y = ob.y, w = ob.w, h = ob.h;
    // Vertical bar
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y - 3);
    ctx.lineTo(x + w / 2, y + h + 3);
    ctx.stroke();
    // S shape
    ctx.beginPath();
    ctx.moveTo(x + w - 3, y + 4);
    ctx.bezierCurveTo(x + w - 5, y, x + 3, y, x + 3, y + h * 0.3);
    ctx.bezierCurveTo(x + 3, y + h * 0.5, x + w - 3, y + h * 0.5, x + w - 3, y + h * 0.7);
    ctx.bezierCurveTo(x + w - 3, y + h, x + 3, y + h, x + 3, y + h - 4);
    ctx.stroke();
  }

  function drawEuro(ob) {
    const ink = getInk();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const x = ob.x, y = ob.y, w = ob.w, h = ob.h;
    const cx = x + w * 0.6;
    const cy = y + h / 2;
    const r = h / 2;
    // C arc
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.25, Math.PI * 1.75, true);
    ctx.stroke();
    // two horizontal bars
    ctx.beginPath();
    ctx.moveTo(x, cy - 3);
    ctx.lineTo(cx + 2, cy - 3);
    ctx.moveTo(x, cy + 3);
    ctx.lineTo(cx + 2, cy + 3);
    ctx.stroke();
  }

  function drawError(ob) {
    ctx.fillStyle = ERROR_RED;
    ctx.strokeStyle = ERROR_RED;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.font = "600 16px 'IBM Plex Mono', monospace";
    ctx.textBaseline = 'top';
    ctx.fillText('error', ob.x, ob.y);
    // strike-through line
    ctx.beginPath();
    ctx.moveTo(ob.x - 2, ob.y + ob.h - 2);
    ctx.lineTo(ob.x + ob.w + 2, ob.y + ob.h - 4);
    ctx.stroke();
  }

  function drawWave(ob) {
    const ink = getInk();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const x = ob.x, y = ob.y + ob.h / 2, w = ob.w;
    ctx.beginPath();
    const segs = 30;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const px = x + t * w;
      const py = y + Math.sin(t * Math.PI * 3) * 7;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // small trailing puff
    ctx.beginPath();
    ctx.moveTo(x - 4, y);
    ctx.lineTo(x - 10, y - 2);
    ctx.moveTo(x - 4, y + 4);
    ctx.lineTo(x - 9, y + 5);
    ctx.stroke();
  }

  function drawObstacle(ob) {
    if (ob.type === 'dollar') drawDollar(ob);
    else if (ob.type === 'euro') drawEuro(ob);
    else if (ob.type === 'error') drawError(ob);
    else if (ob.type === 'wave') drawWave(ob);
  }

  // Loop ---------------------------------------------------------
  let lastTime = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!lastTime) lastTime = now;
    const dt = Math.min(50, now - lastTime);
    lastTime = now;
    // normalize to ~60fps frames
    const frames = dt / (1000 / 60);

    ctx.clearRect(0, 0, cssW, cssH);

    if (state === STATE.RUNNING || state === STATE.BLOWING) {
      // Physics
      if (state === STATE.RUNNING) {
        player.vy += gravity * frames;
        player.y += player.vy * frames;
        if (player.y + player.h >= groundY) {
          player.y = groundY - player.h;
          player.vy = 0;
          player.onGround = true;
        }
      } else if (state === STATE.BLOWING) {
        const elapsed = now - player.blowStart;
        player.blowOffset = (elapsed / 500) * (cssW - player.x);
        player.blowAlpha = Math.max(0, 1 - elapsed / 500);
        if (elapsed >= 500) {
          finishGameOver(true);
        }
      }

      // Move obstacles + spawn (only while running)
      if (state === STATE.RUNNING) {
        const move = speed * frames;
        distSinceSpawn += move;
        for (const ob of obstacles) ob.x -= move;
        obstacles = obstacles.filter(ob => ob.x + ob.w > -10);

        if (distSinceSpawn >= nextSpawnDist) {
          spawnObstacle();
          distSinceSpawn = 0;
          nextSpawnDist = 600 + Math.random() * 600;
        }

        // Score & speed
        score += frames;
        if (score > 0 && Math.floor(score) % 300 === 0) {
          // smooth speed up via score buckets
        }
        speed = Math.min(12, 4 + Math.floor(score / 300) * 0.5);

        // Collisions (20% tolerance)
        const tol = 0.2;
        const px = player.x + player.w * tol;
        const py = player.y + player.h * tol;
        const pw = player.w * (1 - 2 * tol);
        const ph = player.h * (1 - 2 * tol);
        for (const ob of obstacles) {
          const ox = ob.x + ob.w * tol;
          const oy = ob.y + ob.h * tol;
          const ow = ob.w * (1 - 2 * tol);
          const oh = ob.h * (1 - 2 * tol);
          if (rectsOverlap(px, py, pw, ph, ox, oy, ow, oh)) {
            if (ob.type === 'wave') gameOver(true);
            else gameOver(false);
            break;
          }
        }
        updateHud();
      }

      // Draw
      drawGround();
      for (const ob of obstacles) drawObstacle(ob);
      drawPlayer();
    } else if (state === STATE.IDLE) {
      drawGround();
      drawPlayer();
    } else if (state === STATE.OVER) {
      drawGround();
      for (const ob of obstacles) drawObstacle(ob);
    }
  }

  // Input --------------------------------------------------------
  function onAction(e) {
    if (state === STATE.IDLE) {
      startGame();
    } else if (state === STATE.RUNNING) {
      jump();
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      // Only handle if game section is in viewport-ish or has been interacted
      const rect = wrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      e.preventDefault();
      onAction(e);
    }
  });

  wrapper.addEventListener('click', (e) => {
    if (e.target === restartBtn) return;
    onAction(e);
  });

  wrapper.addEventListener('touchstart', (e) => {
    if (e.target === restartBtn) return;
    e.preventDefault();
    onAction(e);
  }, { passive: false });

  restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
  });

  // Resize handling
  window.addEventListener('resize', () => {
    resize();
    groundY = cssH - 28;
    if (state !== STATE.RUNNING && state !== STATE.BLOWING) {
      player.y = groundY - player.h;
    }
  });

  // Init
  resize();
  groundY = cssH - 28;
  player.y = groundY - player.h;
  requestAnimationFrame(loop);
})();
