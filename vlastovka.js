// Papírová vlaštovka — sdílené pro index.html (lísteček odletí) a letak.html (přiletí s letákem).
// Bez knihovny: SVG polygony + requestAnimationFrame. API: window.kmPlane.flyAway(rect, done), window.kmPlane.flyIn(sheetEl)
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  // Tvar vlaštovky (nos doprava): nos, křídlo, přehyb, ocas
  const PL = { N: [46, 0], W: [-34, -24], F: [-16, 4], T: [-29, 17] };

  function layer() {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "plane-layer");
    svg.setAttribute("aria-hidden", "true");
    const g = document.createElementNS(NS, "g");
    const b = document.createElementNS(NS, "polygon");
    b.setAttribute("class", "plane-b");
    const a = document.createElementNS(NS, "polygon");
    a.setAttribute("class", "plane-a");
    const f = document.createElementNS(NS, "path");
    f.setAttribute("class", "plane-fold");
    const tx = document.createElementNS(NS, "text");
    tx.setAttribute("class", "plane-txt");
    tx.textContent = "katerinamlsnova.cz";
    g.append(b, a, f, tx);
    svg.append(g);
    document.body.append(svg);
    return { svg, g, a, b, f, tx };
  }

  // k = 0 → obdélník lísteček, k = 1 → vlaštovka (dva trojúhelníky sdílí přehyb)
  function shape(L, k, w, h) {
    const TL = [-w / 2, -h / 2], TR = [w / 2, -h / 2], BR = [w / 2, h / 2], BL = [-w / 2, h / 2];
    const P = (s, p) => [lerp(s[0], p[0], k), lerp(s[1], p[1], k)];
    const pts = (arr) => arr.map((p) => p.join(",")).join(" ");
    const f1 = P(TL, PL.F), n = P(BR, PL.N);
    L.a.setAttribute("points", pts([f1, P(TR, PL.W), n]));
    L.b.setAttribute("points", pts([f1, n, P(BL, PL.T)]));
    L.f.setAttribute("d", `M${f1.join(",")} L${n.join(",")}`);
    L.f.style.opacity = k;
    L.tx.setAttribute("transform", `rotate(90) translate(${-h / 2 + 6},-${w * 0.15})`);
    L.tx.style.opacity = Math.max(0, 1 - k * 2.2);
  }

  const place = (L, x, y, deg, s) => L.g.setAttribute("transform", `translate(${x},${y}) rotate(${deg}) scale(${s})`);
  const bez = (p, u) => { const m = 1 - u; return [0, 1].map((i) => m * m * m * p[0][i] + 3 * m * m * u * p[1][i] + 3 * m * u * u * p[2][i] + u * u * u * p[3][i]); };
  const bezD = (p, u) => { const m = 1 - u; return [0, 1].map((i) => 3 * m * m * (p[1][i] - p[0][i]) + 6 * m * u * (p[2][i] - p[1][i]) + 3 * u * u * (p[3][i] - p[2][i])); };
  const angOf = (d) => (Math.atan2(d[1], d[0]) * 180) / Math.PI;

  // Lísteček se utrhne (0–160 ms), složí do vlaštovky (–520 ms) a odletí obloukem (–1350 ms)
  function flyAway(rect, done) {
    const L = layer();
    const w = rect.width, h = rect.height, cx = rect.left + w / 2, cy = rect.top + h / 2;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const path = [[cx, cy - 40], [cx + dir * 170, cy - 210], [cx - dir * 90, cy - 400], [window.innerWidth + 160, Math.min(cy - 520, -80)]];
    let a0 = angOf(bezD(path, 0));
    if (a0 - dir * 4 > 180) a0 -= 360;
    const t0 = performance.now();
    function frame(now) {
      const t = now - t0;
      if (t < 160) {
        const e = easeOut(t / 160);
        shape(L, 0, w, h);
        place(L, cx, cy + 6 * e, dir * 4 * e, 1);
      } else if (t < 520) {
        const m = easeIO((t - 160) / 360);
        shape(L, m, w, h);
        place(L, cx, cy + 6 - 46 * m, lerp(dir * 4, a0, m), 1);
      } else if (t < 1350) {
        const u = Math.pow((t - 520) / 830, 1.6);
        const p = bez(path, u);
        shape(L, 1, w, h);
        place(L, p[0], p[1], angOf(bezD(path, Math.max(u, 0.001))), lerp(1, 1.6, u));
      } else {
        L.svg.remove();
        done();
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Vlaštovka přeletí přes horní okraj a leták pod ní dosedne
  function flyIn(sheetEl) {
    const L = layer();
    shape(L, 1, 0, 0);
    const W = window.innerWidth;
    const path = [[-90, 170], [W * 0.32, 30], [W * 0.62, 250], [W + 110, 70]];
    sheetEl?.animate(
      [{ opacity: 0, transform: "translateY(-60px) rotate(-1.6deg)" }, { opacity: 1, transform: "none" }],
      { duration: 560, delay: 380, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" }
    );
    const t0 = performance.now();
    function frame(now) {
      const k = (now - t0) / 1100;
      if (k >= 1) { L.svg.remove(); return; }
      const u = easeIO(k), p = bez(path, u);
      place(L, p[0], p[1], angOf(bezD(path, Math.max(u, 0.001))), 1.35);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  window.kmPlane = { flyAway, flyIn };
})();
