// Cover variants for Firmy.cz — 1200×800 each.
// Each component renders one full cover at its native size; the design canvas
// hosts them as DCArtboards (1200×800).
//
// Brand:
//   #a31f4f  malinová (dominant accent)
//   #0a0a0a  near-black
//   #ffffff  white
//   #f5f0e8  beige (sparingly)
//
// Fonts (loaded via Google Fonts in index.html):
//   Syne 800 — display
//   Space Grotesk 400/500/700 — body
//   IBM Plex Mono 400/500 — terminal/code

const MALINOVA = '#a31f4f';
const INK = '#0a0a0a';
const BEIGE = '#f5f0e8';

const FONT_DISPLAY = '"Syne", "Space Grotesk", sans-serif';
const FONT_BODY = '"Space Grotesk", system-ui, sans-serif';
const FONT_MONO = '"IBM Plex Mono", ui-monospace, monospace';

// Blinking cursor — vertical malinová bar, the visual signature of the brand.
function Cursor({ height = '0.85em', color = MALINOVA, ml = '0.05em' }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.13em',
        height,
        background: color,
        marginLeft: ml,
        verticalAlign: '-0.05em',
        animation: 'km-blink 1.1s steps(1) infinite',
      }}
    ></span>
  );
}

// ── Shared screenshot frame ────────────────────────────────────────────────
// A faux browser/window chrome around an <image-slot>. Keeps screenshots
// looking like real product shots rather than naked images.
function WindowChrome({ children, label, dark = false, style = {} }) {
  const bg = dark ? '#161616' : '#ffffff';
  const fg = dark ? '#888' : '#888';
  const border = dark ? '#262626' : '#e8e4dc';
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 24px 60px -20px rgba(0,0,0,0.45), 0 6px 16px -8px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          height: 28,
          background: dark ? '#1f1f1f' : '#f7f4ef',
          borderBottom: `1px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 6,
          flex: '0 0 auto',
        }}
      >
        {/* Brand cursor mark — replaces the macOS traffic lights. Keeps the
            "this is a window" affordance without the Apple connotation. */}
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: 12,
            background: MALINOVA,
            marginRight: 4,
          }}
        ></span>
        {label && (
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: fg,
              letterSpacing: '0.04em',
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div style={{ flex: '1 1 auto', minHeight: 0, position: 'relative' }}>{children}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// VARIANT A — TERMINAL HERO
// Dark, brand-forward. Plays directly into the "vibe coderka" identity.
// Big typographic statement on the left + 3 stacked product window-cards on
// the right at slight rotations.
// ════════════════════════════════════════════════════════════════════════════
function VariantTerminal() {
  return (
    <div
      style={{
        width: 1200,
        height: 800,
        position: 'relative',
        background: '#0a0a0a',
        overflow: 'hidden',
        fontFamily: FONT_BODY,
        color: '#fff',
      }}
    >
      {/* Soft malinová glow behind the type — gives the black field depth without
          using a gradient as the "design". */}
      <div
        style={{
          position: 'absolute',
          left: -200,
          top: -200,
          width: 900,
          height: 900,
          background: `radial-gradient(circle at center, ${MALINOVA}55 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      ></div>

      {/* Subtle mono grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Top mono bar — looks like an IDE status line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 48px',
          fontFamily: FONT_MONO,
          fontSize: 13,
          color: '#888',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>~ / portfolio</span>
        <span style={{ color: MALINOVA }}>● ready</span>
      </div>

      {/* Headline block */}
      <div
        style={{
          position: 'absolute',
          left: 48,
          top: 130,
          width: 720,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: '#888',
            marginBottom: 14,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: MALINOVA }}>$</span> katerina --vyrob
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 132,
            lineHeight: 0.88,
            letterSpacing: '-0.035em',
          }}
        >
          KATEŘINA
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 132,
            lineHeight: 0.88,
            letterSpacing: '-0.035em',
            marginTop: 4,
            color: '#fff',
          }}
        >
          MLSNOVÁ
          <Cursor height="0.78em" />
        </div>

        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_BODY,
            fontSize: 20,
            color: '#cfcfcf',
            maxWidth: 560,
            lineHeight: 1.4,
          }}
        >
          Weby, interaktivní hry, kalkulačky a digitální materiály{' '}
          <span style={{ color: '#fff', fontWeight: 500 }}>na míru</span> — pro živnostníky,
          lektory a malé projekty.
        </div>
      </div>

      {/* Right column — three stacked product windows at slight tilts */}
      <div style={{ position: 'absolute', right: -30, top: 110, width: 480, height: 620 }}>
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: 0,
            width: 380,
            height: 260,
            transform: 'rotate(-4deg)',
          }}
        >
          <WindowChrome label="hangman.tsx" dark={true} style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="terminal-shot-1"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Šibenice pro právníky"
            ></image-slot>
          </WindowChrome>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 200,
            width: 400,
            height: 270,
            transform: 'rotate(3deg)',
          }}
        >
          <WindowChrome label="kalkulacka.html" style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="terminal-shot-2"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Kalkulačka ceny"
            ></image-slot>
          </WindowChrome>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 400,
            width: 360,
            height: 220,
            transform: 'rotate(-2deg)',
          }}
        >
          <WindowChrome label="mlsne_zviratko.app" style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="terminal-shot-3"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Nakrm mlsné zvířátko"
            ></image-slot>
          </WindowChrome>
        </div>
      </div>

      {/* Bottom mono footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 48,
          right: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: FONT_MONO,
          fontSize: 13,
          color: '#888',
          letterSpacing: '0.04em',
          borderTop: '1px solid #222',
          paddingTop: 18,
        }}
      >
        <span>
          <span style={{ color: '#fff' }}>katerinamlsnova.cz</span>
          <span style={{ margin: '0 12px', color: '#444' }}>/</span>
          weby · hry · kalkulačky · materiály
        </span>
        <span style={{ color: MALINOVA }}>// vibe coding</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// VARIANT B — EDITORIAL
// Clean white surface, magazine-cover composition. Big type on the left,
// curated 4-up grid on the right. The most "professional" of the three —
// reads cleanly at thumbnail size because it leans on typographic mass.
// ════════════════════════════════════════════════════════════════════════════
function VariantEditorial() {
  return (
    <div
      style={{
        width: 1200,
        height: 800,
        position: 'relative',
        background: '#fafaf7',
        overflow: 'hidden',
        fontFamily: FONT_BODY,
        color: INK,
      }}
    >
      {/* Top bar — small monogram + filed-under label, like a magazine masthead */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '28px 56px 0 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          KM
          <Cursor height="0.8em" ml="0.08em" />
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: '#666',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Vibe coderka · od 2025
        </div>
      </div>

      {/* Left column — headline */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 130,
          width: 560,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 13,
            color: MALINOVA,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          ── Portfolio
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 120,
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
          }}
        >
          KATEŘINA
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 120,
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            color: MALINOVA,
            marginTop: 6,
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          MLSNOVÁ
          <Cursor height="0.74em" color={MALINOVA} />
        </div>

        <div
          style={{
            marginTop: 36,
            fontFamily: FONT_BODY,
            fontSize: 22,
            lineHeight: 1.4,
            color: '#333',
            maxWidth: 480,
            fontWeight: 400,
          }}
        >
          Weby, hry a interaktivní nástroje na míru —{' '}
          <span style={{ fontWeight: 600 }}>pro lidi, kterým šablona nestačí.</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -570,
            left: 0,
            fontFamily: FONT_MONO,
            fontSize: 13,
            color: '#666',
            letterSpacing: '0.04em',
          }}
        >
          → katerinamlsnova.cz
        </div>
      </div>

      {/* Right column — 4-up grid, asymmetric (one tall, three regular) */}
      <div
        style={{
          position: 'absolute',
          right: 56,
          top: 130,
          width: 480,
          height: 560,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: 14,
        }}
      >
        {/* Tall hero shot left, spans 2 rows */}
        <div style={{ gridRow: 'span 2', position: 'relative' }}>
          <WindowChrome label="katerinamlsnova.cz" style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="editorial-shot-1"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Hero — landing page"
            ></image-slot>
          </WindowChrome>
        </div>

        <div style={{ position: 'relative' }}>
          <WindowChrome label="kalkulacka" style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="editorial-shot-2"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Kalkulačka ceny"
            ></image-slot>
          </WindowChrome>
        </div>

        <div style={{ position: 'relative' }}>
          <WindowChrome label="šibenice" dark={true} style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="editorial-shot-3"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Šibenice"
            ></image-slot>
          </WindowChrome>
        </div>

        {/* Bottom row — full width screenshot */}
        <div style={{ gridColumn: 'span 2', position: 'relative' }}>
          <WindowChrome label="mlsne_zviratko" style={{ width: '100%', height: '100%' }}>
            <image-slot
              id="editorial-shot-4"
              shape="rect"
              style={{ width: '100%', height: '100%', display: 'block' }}
              placeholder="Nakrm mlsné zvířátko"
            ></image-slot>
          </WindowChrome>
        </div>
      </div>

      {/* Bottom-right — service chips in mono */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 56,
          display: 'flex',
          gap: 8,
          fontFamily: FONT_MONO,
          fontSize: 12,
          color: '#555',
          letterSpacing: '0.02em',
        }}
      >
        <span style={{ padding: '5px 10px', background: '#fff', border: '1px solid #e6e0d4' }}>
          weby
        </span>
        <span style={{ padding: '5px 10px', background: '#fff', border: '1px solid #e6e0d4' }}>
          hry
        </span>
        <span style={{ padding: '5px 10px', background: '#fff', border: '1px solid #e6e0d4' }}>
          kalkulačky
        </span>
        <span style={{ padding: '5px 10px', background: '#fff', border: '1px solid #e6e0d4' }}>
          materiály
        </span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// VARIANT C — POSTER (malinová dominant)
// Most distinctive. Malinová field, big white type, doodle accents, screenshots
// arranged like polaroids/stickers. Reads instantly as "her" — leans hard into
// brand color.
// ════════════════════════════════════════════════════════════════════════════
function VariantPoster() {
  return (
    <div
      style={{
        width: 1200,
        height: 800,
        position: 'relative',
        background: MALINOVA,
        overflow: 'hidden',
        fontFamily: FONT_BODY,
        color: '#fff',
      }}
    >
      {/* Background doodles — hand-drawn marks in slightly darker malinová */}
      <svg
        viewBox="0 0 1200 800"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <g stroke="#7d1438" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {/* squiggle top-right */}
          <path d="M 1080 80 q 20 -20 40 0 t 40 0 t 40 0" />
          {/* asterisk bottom-left */}
          <g transform="translate(80 720)">
            <line x1="-14" y1="0" x2="14" y2="0" />
            <line x1="0" y1="-14" x2="0" y2="14" />
            <line x1="-10" y1="-10" x2="10" y2="10" />
            <line x1="-10" y1="10" x2="10" y2="-10" />
          </g>
          {/* small dots cluster */}
          <circle cx="1140" cy="420" r="3" fill="#7d1438" />
          <circle cx="1160" cy="450" r="3" fill="#7d1438" />
          <circle cx="1120" cy="460" r="3" fill="#7d1438" />
          {/* arrow */}
          <g transform="translate(40 380)">
            <path d="M 0 0 q 30 -40 60 -20 t 60 -10" />
            <path d="M 110 -20 l 10 -10 l -2 18" />
          </g>
          {/* star */}
          <g transform="translate(580 60)" stroke="#fff" strokeWidth="2">
            <path d="M 0 -16 l 4 12 l 12 0 l -10 8 l 4 12 l -10 -8 l -10 8 l 4 -12 l -10 -8 l 12 0 z" />
          </g>
        </g>
      </svg>

      {/* Top mono bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '28px 56px 0 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: FONT_MONO,
          fontSize: 13,
          color: '#fbd5e1',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>// freelance · vibe coding</span>
        <span>katerinamlsnova.cz</span>
      </div>

      {/* Big headline — left aligned, dominates the field */}
      <div style={{ position: 'absolute', left: 56, top: 110 }}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 168,
            lineHeight: 0.84,
            letterSpacing: '-0.045em',
            color: '#fff',
          }}
        >
          KATEŘINA
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 168,
            lineHeight: 0.84,
            letterSpacing: '-0.045em',
            color: '#fff',
            display: 'flex',
            alignItems: 'baseline',
            marginTop: 4,
          }}
        >
          MLSNOVÁ
          <Cursor height="0.74em" color="#fff" />
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: '#fff',
            maxWidth: 620,
            lineHeight: 1.35,
          }}
        >
          Vyrobím vám web, hru nebo kalkulačku{' '}
          <span style={{ fontWeight: 700, textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 6, textDecorationColor: '#fbd5e1' }}>
            na míru
          </span>
          .
        </div>
      </div>

      {/* Polaroid cluster — bottom right, taped to the malinová field */}
      <div style={{ position: 'absolute', right: 40, bottom: 30, width: 540, height: 360 }}>
        {/* Polaroid 1 — back */}
        <div
          style={{
            position: 'absolute',
            right: 280,
            bottom: 40,
            width: 230,
            height: 230,
            background: '#fff',
            padding: 12,
            paddingBottom: 36,
            transform: 'rotate(-7deg)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.3)',
          }}
        >
          <image-slot
            id="poster-shot-1"
            shape="rect"
            style={{ width: '100%', height: '100%', display: 'block', background: '#f0e8de' }}
            placeholder="Hero web"
          ></image-slot>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.04em',
            }}
          >
            hero · web
          </div>
        </div>

        {/* Polaroid 2 — middle, taller */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            bottom: 80,
            width: 230,
            height: 280,
            background: '#fff',
            padding: 12,
            paddingBottom: 36,
            transform: 'rotate(4deg)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.3)',
            zIndex: 2,
          }}
        >
          <image-slot
            id="poster-shot-2"
            shape="rect"
            style={{ width: '100%', height: '100%', display: 'block', background: '#f0e8de' }}
            placeholder="Kalkulačka"
          ></image-slot>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.04em',
            }}
          >
            kalkulačka
          </div>
        </div>

        {/* Polaroid 3 — front right */}
        <div
          style={{
            position: 'absolute',
            right: -10,
            bottom: 20,
            width: 230,
            height: 230,
            background: '#fff',
            padding: 12,
            paddingBottom: 36,
            transform: 'rotate(-3deg)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.3)',
            zIndex: 3,
          }}
        >
          <image-slot
            id="poster-shot-3"
            shape="rect"
            style={{ width: '100%', height: '100%', display: 'block', background: '#f0e8de' }}
            placeholder="Mlsné zvířátko"
          ></image-slot>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.04em',
            }}
          >
            hra pro děti
          </div>
        </div>
      </div>

      {/* Tagline row — sits on a black band at the bottom-left for contrast */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          bottom: 40,
          background: INK,
          color: '#fff',
          padding: '12px 20px',
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        weby <span style={{ color: '#fbd5e1' }}>·</span> hry{' '}
        <span style={{ color: '#fbd5e1' }}>·</span> kalkulačky{' '}
        <span style={{ color: '#fbd5e1' }}>·</span> materiály
      </div>
    </div>
  );
}

// ── Canvas ─────────────────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="covers"
        title="Cover na Firmy.cz — 3 varianty"
        subtitle="1200 × 800 px. Přetáhni screenshoty do prázdných políček — zůstanou uložené. Pak řekni, kterou variantu chceš vyrenderovat jako PNG."
      >
        <DCArtboard id="terminal" label="A · Terminal hero" width={1200} height={800}>
          <VariantTerminal />
        </DCArtboard>
        <DCArtboard id="editorial" label="B · Editorial grid" width={1200} height={800}>
          <VariantEditorial />
        </DCArtboard>
        <DCArtboard id="poster" label="C · Plakát (malinová)" width={1200} height={800}>
          <VariantPoster />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// Expose components so other <script type="text/babel"> blocks (e.g. export.html)
// can mount a single variant on its own. Babel-standalone gives each script
// its own scope, so cross-script sharing has to go through window.
window.VariantTerminal = VariantTerminal;
window.VariantEditorial = VariantEditorial;
window.VariantPoster = VariantPoster;
window.App = App;

// Only auto-mount when the canvas root exists — export.html mounts manually.
const __rootEl = document.getElementById('root');
if (__rootEl) ReactDOM.createRoot(__rootEl).render(<App />);
