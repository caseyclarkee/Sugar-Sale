import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/About.jsx";
import Merch from "./pages/Merch.jsx";

/* Little round badge */
const Burst = ({ children, className = "" }) => (
  <div
    className={
      "grid place-items-center rounded-full bg-yellow text-grey border-[4px] border-grey shadow-[4px_4px_0_#000] " +
      className
    }
  >
    <div className="px-4 py-2 text-center font-black uppercase tracking-wide">
      {children}
    </div>
  </div>
);

/* Slow, smooth marquee */
const Marquee = ({ text }) => (
  <div className="border-y-[4px] border-grey bg-purple/50 text-grey overflow-hidden w-full">
    <div className="marquee flex whitespace-nowrap py-2 text-sm font-black uppercase tracking-widest">
      <div className="marquee__track flex shrink-0" style={{ animationDuration: "80s" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={`a-${i}`} className="mx-6">
            ✦ {text} ✦
          </span>
        ))}
      </div>
      <div
        className="marquee__track flex shrink-0"
        aria-hidden
        style={{ animationDuration: "80s" }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={`b-${i}`} className="mx-6">
            ✦ {text} ✦
          </span>
        ))}
      </div>
    </div>
    <style>{`
      .marquee__track { will-change: transform; animation: marquee linear infinite; }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @media (prefers-reduced-motion: reduce) {
        .marquee__track { animation-duration: 0s !important; animation-play-state: paused !important; transform: translateX(0) !important; }
      }
    `}</style>
  </div>
);

/* Header */
const Header = () => (
  <header className="sticky top-0 z-50 grid gap-4 border-b-[4px] border-grey bg-white/95 backdrop-blur py-4 w-full overflow-visible">
    <div className="flex items-center justify-between w-full px-4 sm:px-8">
      <img
        src="/images/sugar-lockup.png"
        alt="Sugar Liquidation Sale"
        className="h-28 sm:h-36 w-auto"
      />
      <button
        onClick={() => {
          const urls = [
            "https://media3.giphy.com/media/VFZDuY0nePXry/giphy.gif",
            "https://media4.giphy.com/media/gjgWQA5QBuBmUZahOP/giphy.gif",
            "https://media1.giphy.com/media/8cEFp9dQCcE8M/giphy.gif",
          ];
          const randomUrl = urls[Math.floor(Math.random() * urls.length)];
          window.open(randomUrl, "_blank");
        }}
        className="ml-6 inline-block rounded-full border-[4px] border-grey bg-purple px-3 sm:px-4 py-2 text-white font-black uppercase shadow-[6px_6px_0px_black] hover:scale-105 transition-transform"
      >
        THAT’S UNXPECTED
      </button>
    </div>

    <nav className="w-full relative z-[60] py-2">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-3 min-h-[48px]">
          {[
            { to: "/", label: "Home", tone: "bg-yellow" },
            { to: "/deals", label: "Deals", tone: "bg-purple text-white" },
            { to: "/about", label: "About X", tone: "bg-yellow" },
            { to: "/merch", label: "Merch", tone: "bg-purple text-white" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-2xl border-[4px] border-grey px-5 py-2 text-center leading-none",
                  "text-base font-black uppercase",
                  "shadow-[4px_4px_0_#000] hover:shadow-[5px_5px_0_#000] transition-shadow",
                  "active:translate-y-[1px]",
                  item.tone,
                  isActive ? "ring-2 ring-grey ring-offset-2 ring-offset-white" : "",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  </header>
);

/* Fixed Left Rail */
const LeftRail = () => {
  const railRef = React.useRef(null);
  const [heights, setHeights] = React.useState([]);
  const ratiosRef = React.useRef([]);

  const panels = [
    { src: "/images/left-rail/Left01.png", alt: "X can" },
    { src: "/images/left-rail/Left02.gif", alt: "Sale on now" },
    { src: "/images/left-rail/Left03.png", alt: "All sugar must go" },
    { src: "/images/left-rail/Left04.gif", alt: "All Sugar badge" },
    { src: "/images/left-rail/Left05.png", alt: "Gary’s sugar hotline" },
  ];

  const recalc = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const H = rail.clientHeight;
    const ratios = ratiosRef.current;

    if (ratios.length !== panels.length || ratios.some((r) => !r)) {
      const even = Array(panels.length).fill(H / panels.length);
      setHeights(even);
      return;
    }

    const total = ratios.reduce((a, b) => a + b, 0) || 1;
    setHeights(ratios.map((r) => (r / total) * H));
  }, [panels.length]);

  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  React.useEffect(() => {
    window.addEventListener("load", recalc);
    return () => window.removeEventListener("load", recalc);
  }, [recalc]);

  const onImgLoad = (idx, e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    ratiosRef.current[idx] = h / Math.max(1, w);
    recalc();
  };

  return (
    <aside
      ref={railRef}
      className="hidden lg:flex fixed left-0 top-0 h-full w-[200px] border-r-[4px] border-black bg-yellow p-0 z-40"
    >
      <div className="h-full w-full flex flex-col">
        {panels.map((p, i) => (
          <div
            key={i}
            style={{ height: heights[i] ?? 0, transition: "height 200ms ease" }}
            className="relative border-b-[0px] border-black last:border-b-0 overflow-hidden bg-yellow"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-contain block select-none pointer-events-none"
              draggable="false"
              onLoad={(e) => onImgLoad(i, e)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

/* Fixed Right Rail */
const RightRail = () => (
  <aside className="hidden lg:flex fixed right-0 top-0 h-full w-[200px] flex-col justify-between border-l-[4px] border-grey bg-purple p-4 text-center text-white z-40">
    <div className="mt-20">
      <Burst className="mx-auto mb-6 h-24 w-24">
        <span className="text-lg">Sale On Now!</span>
      </Burst>
      <div className="aspect-[1/1] overflow-hidden rounded-xl mb-6">
        <img src="/images/gary.gif" alt="Gary" className="h-full w-full object-cover" />
      </div>
      <p className="font-black uppercase bg-yellow text-grey border-[4px] border-grey px-2 py-1 shadow-[3px_3px_0_#000]">
        Liquidate responsibly
      </p>
    </div>
  </aside>
);

/* ===== MAIN APP ===== */
export default function SugarSaleSite() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white bg-repeat scroll-smooth overflow-x-hidden">
        {/* Background overlay behind rails */}
        <div className="fixed inset-0 bg-white/90 -z-10" />
        <LeftRail />
        <RightRail />

        <div className="min-h-screen flex flex-col w-auto lg:ml-[200px] lg:mr-[200px] relative z-10">
          <Header />
          <div className="mt-2">
            <Marquee text="All Sugar Must Go — Liquidate Responsibly" />
          </div>

          <main className="flex flex-col w-full">
            <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/deals" element={<Deals />} />
  <Route path="/deals" element={<Deals />} />
  <Route path="/about" element={<About />} />
  <Route path="/merch" element={<Merch />} />
  <Route path="*" element={<Home />} />
</Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
