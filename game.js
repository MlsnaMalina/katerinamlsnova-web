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

  // -------------------- Theme & colors --------------------
  function isDark() {
    if (document.documentElement.classList.contains('dark')) return true;
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  let colorText = '#1a1a1a';
  let colorRaspberry = '#a31f4f';
  const colorError = '#cc0000';
  const colorGray = '#888888';
  function refreshColors() {
    if (isDark()) {
      colorText = '#f0f0f0';
      colorRaspberry = '#B83066';
    } else {
      colorText = '#1a1a1a';
      colorRaspberry = '#a31f4f';
    }
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
      if (state !== STATE.RUNNING && state !== STATE.BLOWING) {
        player.y = groundY - player.h;
      }
    });
    ro.observe(canvas);
  } else {
    window.addEventListener('resize', resize);
  }

  // -------------------- Helpers --------------------
  function jitter(v) {
    return v + (Math.random() - 0.5) * 2;
  }

  function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  function setStrokeDefaults(width) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = width || 2;
  }

  // -------------------- State --------------------
  const STATE = { IDLE: 'idle', RUNNING: 'running', OVER: 'over', BLOWING: 'blowing' };
  let state = STATE.IDLE;
  let score = 0;
  let highScore = parseInt(localStorage.getItem(HS_KEY) || '0', 10) || 0;
  let speed = 4;
  let frameCount = 0;
  const gravity = 0.55;
  const jumpForce = -11;

  const player = {
    x: 60,
    y: 0,
    w: 36,
    h: 40,
    vy: 0,
    onGround: true,
    blowOffsetX: 0,
    blowOffsetY: 0,
    blowAlpha: 1,
    blowFrames: 0,
  };

  let obstacles = [];
  let distSinceSpawn = 0;
  let nextSpawnDist = 0;

  function reset() {
    score = 0;
    speed = 4;
    obstacles = [];
    distSinceSpawn = 0;
    nextSpawnDist = 320;
    player.vy = 0;
    player.onGround = true;
    player.blowOffsetX = 0;
    player.blowOffsetY = 0;
    player.blowAlpha = 1;
    player.blowFrames = 0;
    player.y = groundY - player.h;
  }

  function startGame() {
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

  function triggerWindOut() {
    state = STATE.BLOWING;
    player.blowFrames = 0;
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

  // -------------------- Spawning --------------------
  function spawnObstacle() {
    const r = Math.random();
    let type;
    if (r < 0.30) type = 'dollar';
    else if (r < 0.60) type = 'euro';
    else if (r < 0.90) type = 'error';
    else type = 'wind';

    const ob = { type, x: cssW + 20 };
    if (type === 'wind') {
      ob.w = 60; ob.h = 40;
      ob.cy = groundY - 80;
      ob.y = ob.cy - ob.h / 2;
    } else {
      ob.w = 28; ob.h = type === 'error' ? 38 : 40;
      ob.y = groundY - ob.h;
    }
    obstacles.push(ob);
  }

  // -------------------- Drawing: player --------------------
  function drawPlayer() {
    const cx = player.x + player.w / 2 + player.blowOffsetX;
    const cy = player.y + player.h / 2 + player.blowOffsetY;
    ctx.save();
    ctx.globalAlpha = player.blowAlpha;

    // Body — 7 lumps as small arcs around a circle
    const bodyR = 14;
    const lumps = 7;
    const lumpR = 5;
    ctx.fillStyle = colorRaspberry;
    ctx.strokeStyle = colorText;
    setStrokeDefaults(2);
    ctx.beginPath();
    for (let i = 0; i < lumps; i++) {
      const a = (i / lumps) * Math.PI * 2 - Math.PI / 2;
      const lx = cx + Math.cos(a) * bodyR;
      const ly = cy + Math.sin(a) * bodyR;
      if (i === 0) ctx.moveTo(lx + lumpR, ly);
      ctx.arc(lx, ly, lumpR, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();

    // Leaf (small triangle on top)
    ctx.strokeStyle = colorText;
    ctx.fillStyle = 'transparent';
    setStrokeDefaults(2);
    const leafTopX = cx, leafTopY = cy - bodyR - 2;
    ctx.beginPath();
    ctx.moveTo(jitter(leafTopX - 4), jitter(leafTopY));
    ctx.lineTo(jitter(leafTopX + 4), jitter(leafTopY));
    ctx.lineTo(jitter(leafTopX), jitter(leafTopY - 5));
    ctx.closePath();
    ctx.stroke();

    // Stem above leaf
    ctx.beginPath();
    ctx.moveTo(jitter(leafTopX), jitter(leafTopY - 5));
    ctx.lineTo(jitter(leafTopX + 1), jitter(leafTopY - 9));
    ctx.stroke();

    // Glasses — two circles
    setStrokeDefaults(1.6);
    const gLY = cy - 2;
    const gLX = cx - 5;
    const gRX = cx + 5;
    ctx.beginPath();
    ctx.arc(gLX, gLY, 5, 0, Math.PI * 2);
    ctx.moveTo(gRX + 5, gLY);
    ctx.arc(gRX, gLY, 5, 0, Math.PI * 2);
    ctx.stroke();
    // Bridge + temples
    ctx.beginPath();
    ctx.moveTo(gLX + 5, gLY);
    ctx.lineTo(gRX - 5, gLY);
    ctx.moveTo(gLX - 5, gLY);
    ctx.lineTo(gLX - 9, gLY - 1);
    ctx.moveTo(gRX + 5, gLY);
    ctx.lineTo(gRX + 9, gLY - 1);
    ctx.stroke();

    // Eyes (filled dots inside glasses)
    ctx.fillStyle = colorText;
    ctx.beginPath();
    ctx.arc(gLX, gLY, 2, 0, Math.PI * 2);
    ctx.arc(gRX, gLY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Legs — animate with sine
    setStrokeDefaults(2);
    ctx.strokeStyle = colorText;
    const walking = state === STATE.RUNNING && player.onGround;
    const swing = walking ? Math.sin(frameCount * 0.3) * 3 : 0;
    const legTopY = cy + bodyR - 2;
    const legBotY = cy + bodyR + 8;
    // left leg
    ctx.beginPath();
    ctx.moveTo(jitter(cx - 6), jitter(legTopY));
    ctx.lineTo(jitter(cx - 6 + swing), jitter(legBotY));
    ctx.moveTo(jitter(cx - 10 + swing), jitter(legBotY));
    ctx.lineTo(jitter(cx - 2 + swing), jitter(legBotY));
    ctx.stroke();
    // right leg (opposite phase)
    ctx.beginPath();
    ctx.moveTo(jitter(cx + 6), jitter(legTopY));
    ctx.lineTo(jitter(cx + 6 - swing), jitter(legBotY));
    ctx.moveTo(jitter(cx + 2 - swing), jitter(legBotY));
    ctx.lineTo(jitter(cx + 10 - swing), jitter(legBotY));
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(jitter(cx - bodyR + 2), jitter(cy - 1));
    ctx.lineTo(jitter(cx - bodyR - 6), jitter(cy + 5));
    ctx.moveTo(jitter(cx + bodyR - 2), jitter(cy - 1));
    ctx.lineTo(jitter(cx + bodyR + 6), jitter(cy + 5));
    ctx.stroke();

    ctx.restore();
  }

  // -------------------- Drawing: ground --------------------
  function drawGround() {
    ctx.strokeStyle = colorText;
    setStrokeDefaults(2);
    ctx.beginPath();
    ctx.moveTo(0, jitter(groundY));
    let x = 0;
    while (x < cssW) {
      x += 20;
      ctx.lineTo(x, jitter(groundY));
    }
    ctx.stroke();
  }

  // -------------------- Drawing: obstacles --------------------
  function drawCharacterBody(x, y, w, h) {
    // Rounded rectangle body
    const r = 5;
    ctx.beginPath();
    ctx.moveTo(jitter(x + r), jitter(y));
    ctx.lineTo(jitter(x + w - r), jitter(y));
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(jitter(x + w), jitter(y + h - r));
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(jitter(x + r), jitter(y + h));
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(jitter(x), jitter(y + r));
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.stroke();
  }

  function drawSquintEyes(x, y, w) {
    // Two narrow horizontal squint lines
    setStrokeDefaults(2);
    const eyeY = y + 14;
    const left = x + w * 0.3;
    const right = x + w * 0.7;
    ctx.beginPath();
    ctx.moveTo(jitter(left - 3), jitter(eyeY));
    ctx.lineTo(jitter(left + 3), jitter(eyeY));
    ctx.moveTo(jitter(right - 3), jitter(eyeY));
    ctx.lineTo(jitter(right + 3), jitter(eyeY));
    ctx.stroke();
  }

  function drawCollar(x, y, w) {
    // Two small triangles in top corners (suit collar)
    setStrokeDefaults(2);
    ctx.beginPath();
    // left triangle
    ctx.moveTo(jitter(x), jitter(y));
    ctx.lineTo(jitter(x + 7), jitter(y + 8));
    ctx.lineTo(jitter(x + 9), jitter(y));
    // right triangle
    ctx.moveTo(jitter(x + w), jitter(y));
    ctx.lineTo(jitter(x + w - 7), jitter(y + 8));
    ctx.lineTo(jitter(x + w - 9), jitter(y));
    ctx.stroke();
  }

  function drawDollar(ob) {
    ctx.strokeStyle = colorText;
    ctx.fillStyle = 'transparent';
    setStrokeDefaults(2);
    drawCharacterBody(ob.x, ob.y, ob.w, ob.h);
    drawCollar(ob.x, ob.y, ob.w);
    drawSquintEyes(ob.x, ob.y, ob.w);

    // $ symbol — vertical line + S shape (two arcs)
    const cx = ob.x + ob.w / 2;
    const sy = ob.y + 22;
    const sh = 12;
    setStrokeDefaults(2);
    ctx.beginPath();
    ctx.moveTo(jitter(cx), jitter(sy - 2));
    ctx.lineTo(jitter(cx), jitter(sy + sh + 2));
    ctx.stroke();
    // top arc of S
    ctx.beginPath();
    ctx.arc(cx, sy + 3, 4, Math.PI * 0.2, Math.PI * 1.4, false);
    ctx.stroke();
    // bottom arc of S
    ctx.beginPath();
    ctx.arc(cx, sy + sh - 1, 4, Math.PI * 1.2, Math.PI * 0.4, false);
    ctx.stroke();
  }

  function drawEuro(ob) {
    ctx.strokeStyle = colorText;
    ctx.fillStyle = 'transparent';
    setStrokeDefaults(2);
    drawCharacterBody(ob.x, ob.y, ob.w, ob.h);

    // Flat hat on top
    const hatW = 20, hatH = 8;
    const hx = ob.x + (ob.w - hatW) / 2;
    const hy = ob.y - hatH;
    ctx.beginPath();
    ctx.moveTo(jitter(hx), jitter(hy + hatH));
    ctx.lineTo(jitter(hx), jitter(hy));
    ctx.lineTo(jitter(hx + hatW), jitter(hy));
    ctx.lineTo(jitter(hx + hatW), jitter(hy + hatH));
    ctx.stroke();
    // hat brim
    ctx.beginPath();
    ctx.moveTo(jitter(hx - 3), jitter(hy + hatH));
    ctx.lineTo(jitter(hx + hatW + 3), jitter(hy + hatH));
    ctx.stroke();

    drawSquintEyes(ob.x, ob.y, ob.w);

    // € symbol — large left-facing arc + two horizontal bars
    const cx = ob.x + ob.w / 2;
    const cy = ob.y + 28;
    setStrokeDefaults(2);
    ctx.beginPath();
    ctx.arc(cx + 1, cy, 5, Math.PI * 0.25, Math.PI * 1.75, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(jitter(cx - 6), jitter(cy - 2));
    ctx.lineTo(jitter(cx + 3), jitter(cy - 2));
    ctx.moveTo(jitter(cx - 6), jitter(cy + 2));
    ctx.lineTo(jitter(cx + 3), jitter(cy + 2));
    ctx.stroke();
  }

  function drawError(ob) {
    ctx.strokeStyle = colorText;
    ctx.fillStyle = 'transparent';
    setStrokeDefaults(2);
    // Body with bent top-right corner
    const x = ob.x, y = ob.y, w = ob.w, h = ob.h;
    const fold = 6;
    ctx.beginPath();
    ctx.moveTo(jitter(x), jitter(y));
    ctx.lineTo(jitter(x + w - fold), jitter(y));
    ctx.lineTo(jitter(x + w), jitter(y + fold));
    ctx.lineTo(jitter(x + w), jitter(y + h));
    ctx.lineTo(jitter(x), jitter(y + h));
    ctx.closePath();
    ctx.stroke();
    // Folded corner triangle
    ctx.beginPath();
    ctx.moveTo(jitter(x + w - fold), jitter(y));
    ctx.lineTo(jitter(x + w - fold), jitter(y + fold));
    ctx.lineTo(jitter(x + w), jitter(y + fold));
    ctx.stroke();

    // Sad eyes — diagonal short lines toward center
    setStrokeDefaults(2);
    const eyeY = y + 12;
    const left = x + w * 0.3;
    const right = x + w * 0.7;
    ctx.beginPath();
    // left eye: slope from outside-up to inside-down
    ctx.moveTo(jitter(left - 3), jitter(eyeY - 2));
    ctx.lineTo(jitter(left + 3), jitter(eyeY + 1));
    // right eye: mirror
    ctx.moveTo(jitter(right + 3), jitter(eyeY - 2));
    ctx.lineTo(jitter(right - 3), jitter(eyeY + 1));
    ctx.stroke();

    // "err" text
    ctx.fillStyle = colorError;
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('err', x + 6, y + 28);

    // Red strike line under "err"
    ctx.strokeStyle = colorError;
    setStrokeDefaults(2);
    ctx.beginPath();
    ctx.moveTo(jitter(x + 5), jitter(y + 31));
    ctx.lineTo(jitter(x + w - 5), jitter(y + 31));
    ctx.stroke();
  }

  function drawWind(ob) {
    ctx.strokeStyle = colorText;
    ctx.fillStyle = 'transparent';
    setStrokeDefaults(2.5);
    const cx = ob.x;
    const cy = ob.cy;
    // Three curved hooked lines, decreasing length, vertical offsets
    const lines = [
      { y: cy - 10, len: 50 },
      { y: cy,      len: 40 },
      { y: cy + 10, len: 30 },
    ];
    for (const line of lines) {
      const sx = cx;
      const ex = cx + line.len;
      const ey = line.y + 6;
      ctx.beginPath();
      ctx.moveTo(jitter(sx), jitter(line.y));
      // Bezier curving right and down
      ctx.bezierCurveTo(
        sx + line.len * 0.4, line.y,
        sx + line.len * 0.7, line.y,
        ex, ey
      );
      ctx.stroke();
      // Small spiral (semi-circle) at end
      ctx.beginPath();
      ctx.arc(ex - 2, ey + 2, 3, -Math.PI / 2, Math.PI, false);
      ctx.stroke();
    }
  }

  function drawObstacle(ob) {
    if (ob.type === 'dollar') drawDollar(ob);
    else if (ob.type === 'euro') drawEuro(ob);
    else if (ob.type === 'error') drawError(ob);
    else if (ob.type === 'wind') drawWind(ob);
  }

  // -------------------- Loop --------------------
  let lastTime = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!lastTime) lastTime = now;
    const dt = Math.min(50, now - lastTime);
    lastTime = now;
    const frames = dt / (1000 / 60);

    refreshColors();
    ctx.clearRect(0, 0, cssW, cssH);
    frameCount += frames;

    if (state === STATE.RUNNING) {
      // Physics
      player.vy += gravity * frames;
      player.y += player.vy * frames;
      if (player.y + player.h >= groundY) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.onGround = true;
      }

      // Move obstacles
      const move = speed * frames;
      distSinceSpawn += move;
      for (const ob of obstacles) ob.x -= move;
      obstacles = obstacles.filter(ob => ob.x + ob.w > -20);

      if (distSinceSpawn >= nextSpawnDist) {
        spawnObstacle();
        distSinceSpawn = 0;
        nextSpawnDist = 700 + Math.random() * 700;
      }

      // Score & speed
      score += frames;
      speed = Math.min(12, 4 + Math.floor(score / 300) * 0.5);

      // Collisions — 25% tolerance
      const tol = 0.25;
      const px = player.x + player.w * tol;
      const py = player.y + player.h * tol;
      const pw = player.w * (1 - 2 * tol);
      const ph = player.h * (1 - 2 * tol);
      for (const ob of obstacles) {
        let bx, by, bw, bh;
        if (ob.type === 'wind') {
          // wind hitbox approx around its bounding box
          bx = ob.x; by = ob.cy - ob.h / 2; bw = ob.w; bh = ob.h;
        } else {
          bx = ob.x; by = ob.y; bw = ob.w; bh = ob.h;
        }
        const ox = bx + bw * tol;
        const oy = by + bh * tol;
        const ow = bw * (1 - 2 * tol);
        const oh = bh * (1 - 2 * tol);
        if (rectsOverlap(px, py, pw, ph, ox, oy, ow, oh)) {
          if (ob.type === 'wind') {
            triggerWindOut();
          } else {
            finishGameOver(false);
          }
          break;
        }
      }
      updateHud();
    } else if (state === STATE.BLOWING) {
      // Animate blow-out: right + up, fade over 40 frames
      player.blowFrames += frames;
      const t = Math.min(1, player.blowFrames / 40);
      player.blowOffsetX = t * (cssW - player.x);
      player.blowOffsetY = -t * 60;
      player.blowAlpha = 1 - t;
      if (t >= 1) {
        finishGameOver(true);
      }
    }

    // Draw
    if (state === STATE.RUNNING || state === STATE.BLOWING || state === STATE.IDLE) {
      drawGround();
      for (const ob of obstacles) drawObstacle(ob);
      drawPlayer();
    } else if (state === STATE.OVER) {
      drawGround();
      for (const ob of obstacles) drawObstacle(ob);
    }
  }

  // -------------------- Input --------------------
  function onAction() {
    if (state === STATE.IDLE || state === STATE.OVER) {
      startGame();
    } else if (state === STATE.RUNNING) {
      jump();
    }
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
  refreshColors();
  player.y = groundY - player.h;
  requestAnimationFrame(loop);
})();
