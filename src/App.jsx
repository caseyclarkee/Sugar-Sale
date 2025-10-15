import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import X from "./pages/X.jsx";
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
  <div className="border-b-[4px] border-grey bg-purple/50 text-grey overflow-hidden w-full">
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
const Header = () => {
  const unxpectedClasses =
    "hover:scale-105 transition-transform cursor-pointer object-contain h-auto " +
    "w-24 sm:w-24 md:w-28 lg:w-32";

  const lockupClasses =
    "object-contain h-auto " +
    "w-40 sm:w-56 md:w-64 lg:w-72";

  const lwClasses =
    "object-contain h-auto " +
    "w-24 sm:w-24 md:w-28 lg:w-32";

  return (
    <header className="sticky top-0 z-50 grid gap-4 border-b-[4px] border-grey bg-white/95 backdrop-blur py-4 w-full overflow-visible">
      <div className="flex items-center justify-evenly w-full px-4 sm:px-4"> 
        <img
          src="/images/unxpectedcan.gif"
          alt="THAT’S UNXPECTED"
          onClick={() => {
            const urls = [
              "https://media3.giphy.com/media/VFZDuY0nePXry/giphy.gif",
              "https://media4.giphy.com/media/gjgWQA5QBuBmUZahOP/giphy.gif",
              "https://media1.giphy.com/media/8cEFp9dQCcE8M/giphy.gif",
            ];
            const randomUrl = urls[Math.floor(Math.random() * urls.length)];
            window.open(randomUrl, "_blank");
          }}
          className={unxpectedClasses}
        />

        <img
          src="/images/lockup.gif"
          alt="Sugar Liquidation Sale"
          className={lockupClasses}
        />

        <img
          src="/images/lwlogo.gif"
          alt="X by Long White"
          className={lwClasses}
        />
      </div>

      <nav className="w-full relative z-[60] py-2">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-3 min-h-[48px]">
            {[
              { to: "/", label: "Home", tone: "bg-yellow" },
              { to: "/about", label: "About", tone: "bg-purple text-white" },
              { to: "/X", label: "X by Long White", tone: "bg-yellow" },
              { to: "/deals", label: "Sweet Deals", tone: "bg-purple text-white" },
              { to: "/merch", label: "Merch", tone: "bg-yellow" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-center min-h-[48px]",
                    "rounded-2xl border-[4px] border-grey px-5 py-2 text-center leading-none",
                    "text-xl font-black uppercase",
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
};

/* Utility: safe ResizeObserver */
function useResizeObserver(targetRef, handler) {
  React.useEffect(() => {
    if (!targetRef.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => handler());
    ro.observe(targetRef.current);
    return () => ro.disconnect();
  }, [targetRef, handler]);
}

/* Fixed Left Rail */
const LeftRail = () => {
  const railRef = React.useRef(null);
  const [heights, setHeights] = React.useState([]);
  const ratiosRef = React.useRef([]);

  const panels = [
    { src: "/images/left-rail/Left01.gif", alt: "saleonnow" },
    { src: "/images/left-rail/Left02.gif", alt: "phone" },
    { src: "/images/left-rail/Left03.png", alt: "All sugar must go" },
  ];

  const recalc = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const H = rail.clientHeight || window.innerHeight;
    const ratios = ratiosRef.current;

    if (ratios.length !== panels.length || ratios.some((r) => !r)) {
      // Fallback: show immediately with equal slices so it doesn't look empty
      setHeights(Array(panels.length).fill(H / panels.length));
      return;
    }

    const total = ratios.reduce((a, b) => a + b, 0) || 1;
    setHeights(ratios.map((r) => (r / total) * H));
  }, [panels.length]);

  // 1) Run immediately on mount so rails are visible on first paint
  React.useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  // 2) Recalc on viewport resize and rail size changes
  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  useResizeObserver(railRef, recalc);

  // 3) Record image aspect ratios as they load, then recalc
  const onImgLoad = (idx, e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    ratiosRef.current[idx] = h / Math.max(1, w);
    recalc();
  };

  return (
<aside
  ref={railRef}
  className="hidden md:flex fixed left-0 top-0 h-screen w-[140px] lg:w-[200px] border-r-[4px] border-grey bg-purple p-0 z-40"
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
              className="w-full h-full object-contain block select-none"
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
const RightRail = () => {
  const railRef = React.useRef(null);
  const [heights, setHeights] = React.useState([]);
  const ratiosRef = React.useRef([]);

  const panels = [
    { src: "/images/right-rail/Right01.gif", alt: "Sale On Now!" },
    { src: "/images/right-rail/Right02.gif", alt: "That’s Unexpected" },
    { src: "/images/right-rail/Right03.gif", alt: "Liquidate Responsibly" },
    { src: "/images/right-rail/Right04.png", alt: "Sugar Badge" },
  ];

  const recalc = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const H = rail.clientHeight || window.innerHeight;
    const ratios = ratiosRef.current;

    if (ratios.length !== panels.length || ratios.some((r) => !r)) {
      setHeights(Array(panels.length).fill(H / panels.length));
      return;
    }

    const total = ratios.reduce((a, b) => a + b, 0) || 1;
    setHeights(ratios.map((r) => (r / total) * H));
  }, [panels.length]);

  React.useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  useResizeObserver(railRef, recalc);

  const onImgLoad = (idx, e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    ratiosRef.current[idx] = h / Math.max(1, w);
    recalc();
  };

  return (
    <aside
  ref={railRef}
  className="hidden md:flex fixed right-0 top-0 h-screen w-[140px] lg:w-[200px] border-l-[4px] border-grey bg-purple p-0 z-40"
>
      <div className="h-full w-full flex flex-col">
        {panels.map((p, i) => (
          <div
            key={i}
            style={{ height: heights[i] ?? 0, transition: "height 200ms ease" }}
            className="relative border-b-[0px] border-grey last:border-b-0 overflow-hidden bg-purple"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-contain block select-none"
              draggable="false"
              onLoad={(e) => onImgLoad(i, e)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

const MobileImageMarquee = ({ speedSec = 60, itemHeight = "h-20" }) => {
  const images = [
    // Left rail
    { src: "/images/left-rail/Left01.gif", alt: "Sale On Now badge" },
    { src: "/images/left-rail/Left02.gif", alt: "Customer support phone" },
    { src: "/images/right-rail/Right01.gif", alt: "Sale On Now!" },
    { src: "/images/right-rail/Right02.gif", alt: "That’s Unexpected" },
    { src: "/images/right-rail/Right03.gif", alt: "Liquidate Responsibly" },
    { src: "/images/right-rail/Right04.png", alt: "Sugar Badge" },
  ];

  const Track = ({ ariaHidden = false }) => (
    <div
      className="marquee-images__track flex shrink-0 gap-4 pr-4"
      aria-hidden={ariaHidden || undefined}
      style={{ animationDuration: `${speedSec}s` }}
    >
      {images.map((p, i) => (
        <div key={`${ariaHidden ? "b" : "a"}-${i}`} className={`${itemHeight} min-w-[80px] flex items-center`}>
          <img
            src={p.src}
            alt={ariaHidden ? "" : p.alt}
            className="h-full w-auto object-contain select-none"
            draggable="false"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="md:hidden border-y-[4px] border-grey bg-yellow overflow-hidden w-full">
      <div className="marquee-images flex items-center py-2">
        <Track />
        <Track ariaHidden />
      </div>

      <style>{`
        .marquee-images__track { will-change: transform; animation: marquee-x linear infinite; }
        @keyframes marquee-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-images__track { animation-duration: 0s !important; animation-play-state: paused !important; transform: translateX(0) !important; }
        }
      `}</style>
    </div>
  );
};

export default function SugarSaleSite() {
  React.useEffect(() => {
    // Nudge layout for any early Tailwind/scroll calculations
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white bg-repeat scroll-smooth overflow-x-hidden">
        {/* Background overlay behind rails */}
        <div className="fixed inset-0 bg-white/90 -z-10" />
        <LeftRail />
        <RightRail />

        <div className="min-h-screen flex flex-col w-auto md:mr-[140px] md:ml-[140px] lg:ml-[200px] lg:mr-[200px] relative z-10">
          <Header />
          <div className="mt-0">
            <Marquee text="All Sugar Must Go — Liquidate Responsibly" />
          </div>

          <main className="flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/x" element={<X />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Mobile-only image marquee below all page content */}
<MobileImageMarquee />
            
          <footer className="border-t-[4px] border-grey bg-gray-100 py-8 w-full px-4 sm:px-8">
            <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
              <p className="text-center text-sm font-medium md:text-left">
                © {new Date().getFullYear()} Long White X Zero Sugar.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.asahibeverages.com/nz-promotional-terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-[4px] border-grey bg-yellow px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
                >
                  NZ Promotional Terms and Conditions
                </a>
                <a
                  href="https://www.asahibeverages.com/website-terms-of-use-new-zealand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-[4px] border-grey bg-purple px-3 py-1 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]"
                >
                  Website Terms of Use
                </a>
                <a
                  href="https://www.asahibeverages.com/privacy-collection-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-[4px] border-grey bg-yellow px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
                >
                  Privacy Collection Notice
                </a>
                <a
                  href="https://www.asahibeverages.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-[4px] border-grey bg-purple px-3 py-1 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </HashRouter>
  );
}

