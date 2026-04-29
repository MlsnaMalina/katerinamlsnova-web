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

  // -------------------- Theme --------------------
  function isDark() {
    if (document.documentElement.classList.contains('dark')) return true;
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // -------------------- Sizing --------------------
  let cssW = 0;
  let cssH = 0;
  let groundY = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = canvas.offsetWidth;
    cssH = canvas.offsetHeight;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    groundY = cssH - 50;
  }

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      resize();
      if (state !== STATE.RUNNING) {
        player.y = groundY - PLAYER_H;
      }
    });
    ro.observe(canvas);
  } else {
    window.addEventListener('resize', resize);
  }

  // -------------------- Constants --------------------
  const STATE = { IDLE: 'idle', RUNNING: 'running', BLOWING: 'blowing', OVER: 'over' };
  const PLAYER_W = 70;
  const PLAYER_H = 77;
  const OBSTACLE_W = 55;
  const OBSTACLE_H = 55;
  const OBSTACLE_GAP = 10;
  const WIND_W = 100;
  const WIND_H = 65;
  const gravity = 0.6;
  const jumpForce = -12;

  // -------------------- State --------------------
  let state = STATE.IDLE;
  let score = 0;
  let highScore = parseInt(localStorage.getItem(HS_KEY) || '0', 10) || 0;
  let speed = 4;
  let frameCount = 0;
  let startTime = 0;
  let firstSpawnDone = false;

  const player = {
    x: 60,
    y: 0,
    vy: 0,
    onGround: true,
    blowFrames: 0,
    blowOffsetX: 0,
    blowOffsetY: 0,
    blowRotation: 0,
    blowScale: 1,
    blowAlpha: 1,
  };

  let groups = [];
  let distSinceSpawn = 0;
  let nextSpawnDist = 0;

  // -------------------- Image loading --------------------
  function loadSVG(path) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load ' + path));
      img.src = path;
    });
  }

  function loadSVGRecolored(path, replacements) {
    return fetch(path)
      .then(r => r.text())
      .then(text => {
        let out = text;
        for (const [from, to] of replacements) {
          out = out.split(from).join(to);
        }
        const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(out);
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load recolored ' + path));
          img.src = url;
        });
      });
  }

  let images = {};
  let imagesReady = false;

  // -------------------- Reset / start --------------------
  function reset() {
    score = 0;
    speed = 4;
    groups = [];
    distSinceSpawn = 0;
    nextSpawnDist = Infinity; // first spawn gated by 2s timer
    firstSpawnDone = false;
    startTime = performance.now();
    player.vy = 0;
    player.onGround = true;
    player.y = groundY - PLAYER_H;
    player.blowFrames = 0;
    player.blowOffsetX = 0;
    player.blowOffsetY = 0;
    player.blowRotation = 0;
    player.blowScale = 1;
    player.blowAlpha = 1;
  }

  function startGame() {
    if (!imagesReady) return;
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

  function startBlowAway() {
    state = STATE.BLOWING;
    player.blowFrames = 0;
    player.blowOffsetX = 0;
    player.blowOffsetY = 0;
    player.blowRotation = 0;
    player.blowScale = 1;
    player.blowAlpha = 1;
    hud.classList.add('hidden');
  }

  function gameOver(byWind) {
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

  // -------------------- Spawning --------------------
  function generateGroup() {
    const rand = Math.random();
    let type, count;

    if (rand < 0.35) type = 'ant';
    else if (rand < 0.70) type = 'beetle';
    else type = 'wind';

    if (type === 'wind') {
      count = 1;
    } else {
      const r = Math.random();
      if (r < 0.55) count = 1;
      else if (r < 0.85) count = 2;
      else count = 3;
    }
    return { type, count };
  }

  function spawnGroup() {
    const g = generateGroup();
    const ob = { type: g.type, count: g.count, x: cssW + 20 };
    if (g.type === 'wind') {
      ob.w = WIND_W;
      ob.h = WIND_H;
      const low = Math.random() < 0.3;
      const centerY = low ? groundY - 20 : groundY - 90;
      ob.y = centerY - WIND_H / 2;
    } else {
      ob.w = g.count * OBSTACLE_W + (g.count - 1) * OBSTACLE_GAP;
      ob.h = OBSTACLE_H;
      ob.y = groundY - OBSTACLE_H;
    }
    groups.push(ob);
  }

  function getGap(currentSpeed) {
    // At speed 4 → 600–800px (~2.5–3.3s). Tightens as speed grows.
    const base = Math.max(600 - (currentSpeed - 4) * 40, 280);
    return base + Math.random() * 200;
  }

  // -------------------- Drawing --------------------
  function drawImageThemed(img, x, y, w, h) {
    ctx.filter = 'none';
    ctx.drawImage(img, x, y, w, h);
  }

  function drawInvertibleImage(img, x, y, w, h) {
    // Dark-stroke SVG (wind, ant, beetle) — invert in dark mode for visibility.
    if (isDark()) {
      ctx.save();
      ctx.filter = 'invert(1)';
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();
    } else {
      ctx.filter = 'none';
      ctx.drawImage(img, x, y, w, h);
    }
  }

  function drawGround() {
    const ink = isDark() ? '#f0f0f0' : '#1a1a1a';
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(cssW, groundY);
    ctx.stroke();
  }

  function drawPlayer() {
    const malinaImg = isDark() ? images.malinaDark : images.malina;
    let bob = 0;
    if (state === STATE.RUNNING && player.onGround) {
      bob = Math.sin(frameCount * 0.15) * 2;
    }
    if (state === STATE.BLOWING) {
      const cx = player.x + PLAYER_W / 2 + player.blowOffsetX;
      const cy = player.y + PLAYER_H / 2 + player.blowOffsetY;
      ctx.save();
      ctx.globalAlpha = player.blowAlpha;
      ctx.translate(cx, cy);
      ctx.rotate(player.blowRotation);
      ctx.scale(player.blowScale, player.blowScale);
      ctx.drawImage(malinaImg, -PLAYER_W / 2, -PLAYER_H / 2, PLAYER_W, PLAYER_H);
      ctx.restore();
    } else {
      drawImageThemed(malinaImg, player.x, player.y + bob, PLAYER_W, PLAYER_H);
    }
  }

  function drawObstacle(ob) {
    if (ob.type === 'wind') {
      drawInvertibleImage(images.wind, ob.x, ob.y, ob.w, ob.h);
    } else {
      const img = ob.type === 'ant' ? images.ant : images.beetle;
      for (let i = 0; i < ob.count; i++) {
        const ix = ob.x + i * (OBSTACLE_W + OBSTACLE_GAP);
        drawInvertibleImage(img, ix, ob.y, OBSTACLE_W, OBSTACLE_H);
      }
    }
  }

  function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  // -------------------- Loop --------------------
  let lastTime = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!lastTime) lastTime = now;
    const dt = Math.min(50, now - lastTime);
    lastTime = now;
    const frames = dt / (1000 / 60);

    ctx.clearRect(0, 0, cssW, cssH);
    frameCount += frames;

    if (state === STATE.RUNNING) {
      // Physics
      player.vy += gravity * frames;
      player.y += player.vy * frames;
      if (player.y + PLAYER_H >= groundY) {
        player.y = groundY - PLAYER_H;
        player.vy = 0;
        player.onGround = true;
      }

      // First-spawn 2s gate
      if (!firstSpawnDone && now - startTime >= 1500) {
        spawnGroup();
        firstSpawnDone = true;
        distSinceSpawn = 0;
        nextSpawnDist = getGap(speed);
      }

      // Movement & spawn
      const move = speed * frames;
      for (const ob of groups) ob.x -= move;
      groups = groups.filter(ob => ob.x + ob.w > -20);

      if (firstSpawnDone) {
        distSinceSpawn += move;
        if (distSinceSpawn >= nextSpawnDist) {
          spawnGroup();
          distSinceSpawn = 0;
          nextSpawnDist = getGap(speed);
        }
      }

      // Score & speed
      score += frames;
      speed = Math.min(13, 4 + Math.floor(score / 300) * 0.5);

      // Collisions — 25% tolerance
      const tol = 0.25;
      const px = player.x + PLAYER_W * tol;
      const py = player.y + PLAYER_H * tol;
      const pw = PLAYER_W * (1 - 2 * tol);
      const ph = PLAYER_H * (1 - 2 * tol);
      for (const ob of groups) {
        const ox = ob.x + ob.w * tol;
        const oy = ob.y + ob.h * tol;
        const ow = ob.w * (1 - 2 * tol);
        const oh = ob.h * (1 - 2 * tol);
        if (rectsOverlap(px, py, pw, ph, ox, oy, ow, oh)) {
          if (ob.type === 'wind') {
            startBlowAway();
          } else {
            gameOver(false);
          }
          break;
        }
      }
      updateHud();
    } else if (state === STATE.BLOWING) {
      // ~45 frames (≈0.75s) blow-away animation, then game over
      player.blowFrames += frames;
      const total = 45;
      const t = Math.min(1, player.blowFrames / total);
      player.blowOffsetX = t * (cssW * 0.9);
      player.blowOffsetY = -t * (cssH * 0.9) - Math.sin(t * Math.PI) * 30;
      player.blowRotation = t * Math.PI * 1.5;
      player.blowScale = 1 + t * 0.4;
      player.blowAlpha = Math.max(0, 1 - t);
      // keep obstacles drifting for ambience
      const move = speed * frames;
      for (const ob of groups) ob.x -= move;
      if (t >= 1) {
        gameOver(true);
      }
    }

    // Draw
    drawGround();
    if (imagesReady) {
      for (const ob of groups) drawObstacle(ob);
      drawPlayer();
    }
  }

  // -------------------- Input --------------------
  function onAction() {
    if (state === STATE.IDLE || state === STATE.OVER) {
      startGame();
    } else if (state === STATE.RUNNING) {
      jump();
    }
    // BLOWING: ignore input until animation finishes
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      const rect = wrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      e.preventDefault();
      onAction();
    }
  });

  wrapper.addEventListener('click', (e) => {
    if (e.target === restartBtn) return;
    onAction();
  });

  wrapper.addEventListener('touchstart', (e) => {
    if (e.target === restartBtn) return;
    e.preventDefault();
    onAction();
  }, { passive: false });

  restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
  });

  // -------------------- Init --------------------
  resize();
  player.y = groundY - PLAYER_H;

  Promise.all([
    loadSVG('assets/malina-game.svg'),
    loadSVGRecolored('assets/malina-game.svg', [['#1a1a1a', '#f0f0f0']]),
    loadSVG('assets/mravenec-game.svg'),
    loadSVG('assets/brouk-game.svg'),
    loadSVG('assets/wind-game.svg'),
  ]).then(([malina, malinaDark, ant, beetle, wind]) => {
    images = { malina, malinaDark, ant, beetle, wind };
    imagesReady = true;
    requestAnimationFrame(loop);
  }).catch((err) => {
    console.error('Game asset load failed:', err);
  });
})();
