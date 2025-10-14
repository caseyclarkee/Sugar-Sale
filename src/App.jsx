import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";

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

/* Header — stacks on mobile, wraps on desktop, no clipping */
const Header = () => (
  <header className="sticky top-0 z-50 grid gap-4 border-b-[4px] border-grey bg-white/95 backdrop-blur py-4 w-full overflow-visible">
    {/* Logo + button row */}
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

    {/* Nav */}
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

/* Fixed side rails (lg+) */
/**
 * Fixed left rail that proportionally fits N images into the rail height.
 * - Rail stays fixed at left, width 200px (change if you want)
 * - No scroll; images keep aspect ratio
 * - Each slice gets height = (its ratio / sum of ratios) * railHeight
 */
const LeftRail = () => {
  const railRef = React.useRef(null);
  const [heights, setHeights] = React.useState([]); // pixel heights per panel
  const ratiosRef = React.useRef([]);               // naturalHeight / naturalWidth

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
    const H = rail.clientHeight; // total height to fill
    const ratios = ratiosRef.current;
    if (ratios.length !== panels.length || ratios.some((r) => !r)) return;

    const total = ratios.reduce((a, b) => a + b, 0);
    if (total <= 0) return;

    const newHeights = ratios.map((r) => (r / total) * H);
    setHeights(newHeights);
  }, [panels.length]);

  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
            className="relative border-b-[4px] border-black last:border-b-0 overflow-hidden bg-yellow"
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

/* Pages (inline versions) */
const Home = () => (
  <section className="py-10 px-4 sm:px-8">
    <div className="relative w-full rounded-2xl border-[4px] border-grey bg-purple-300 shadow-[6px_6px_0_#000] p-6 sm:p-8 text-center text-yellow">
      <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
        Sugar Liquidation! Sale!
      </h2>
      <div className="absolute right-3 top-3 sm:right-6 sm:top-6">
        <Burst className="h-24 w-24 sm:h-28 sm:w-28">
          <span className="text-lg sm:text-xl font-black">ON NOW!</span>
        </Burst>
      </div>
      <div className="mx-auto mt-6 aspect-video w-full max-w-4xl overflow-hidden rounded-xl border-[4px] border-grey shadow-[4px_4px_0_#000]">
        <iframe
          src="https://player.vimeo.com/video/843809307?h=6a8b6a8a9a&title=0&byline=0&portrait=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Hero Video"
        ></iframe>
      </div>
    </div>
  </section>
);

const Merch = () => (
  <section className="px-4 sm:px-8 py-12">
    <h3 className="text-3xl font-black mb-6">Merch</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl border-[4px] border-grey bg-white p-4 shadow-[4px_4px_0_#000]"
        >
          <div className="aspect-square rounded-lg border-[3px] border-grey bg-gray-100 grid place-items-center">
            <span className="text-gray-500">Item {i}</span>
          </div>
          <button className="mt-4 w-full rounded-lg border-[3px] border-grey bg-yellow px-3 py-2 font-black uppercase shadow-[3px_3px_0_#000]">
            Register interest
          </button>
        </div>
      ))}
    </div>
  </section>
);

const About = () => (
  <section className="px-4 sm:px-8 py-12">
    <h3 className="text-3xl font-black mb-4">About X</h3>
    <p className="max-w-2xl">
      I’m Gary.
      I used to handle the sugar orders for Long White. Good job, steady hours, sweet perks (literally).
      Then one morning, marketing strolls in all excited saying the delicious new RTD is “going to be zero sugar!”
      Zero. Sugar.
      <br /><br />
      Now I’ve got tonnes of the stuff sitting in storage, and not a single drink that needs it. I tried mixing it into my coffee, then my cereal, then my compost. Nothing made a dent.
      <br /><br />
      So I decided to take matters into my own sticky hands. Welcome to the Sugar Liquidation Sale, the clearance event powered entirely by panic and desperation. Everything must go: bagged sugar, boxed sugar, sculpted sugar, mystery sugar. If I can make it out of sugar, I’ll sell it.
      <br /><br />
      Meanwhile, X by Long White’s out there bragging about being zero sugar and “light and refreshing.” Good for them. I’m here, knee-deep in syrup, trying to keep the ants off the forklift.
      <br /><br />
      Buy some sugar, will <i>you?</i> You’ll make a grown man sleep better tonight.
    </p>
    <p className="mt-4 max-w-2xl">
      P.S. Yes, the RTD tastes good. Yes, you should buy it at your local liquor store. But please take my sugar first.
    </p>
    <p className="mt-2 max-w-2xl">P.P.S. I was the ninth runner up in the central Auckland salesman of the year awards in 2004.</p>

    {/* FAQ */}
    <div className="mt-6">
      <h2 className="font-black uppercase text-xl mb-3">FAQ (Frequently Asked Quibbles)</h2>
      <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000] mb-3">
        <summary className="cursor-pointer font-black">Is any of this sugar used in the drink?</summary>
        <div className="mt-2 text-sm">Absolutely not. X by Long White is zero sugar. Hence… this website.</div>
      </details>
      <details className="rounded-xl border-[4px] border-grey bg-purple p-4 shadow-[4px_4px_0_#000] mb-3 text-white">
        <summary className="cursor-pointer font-black">Is the sugar good quality?</summary>
        <div className="mt-2 text-sm">Yes. It’s the good stuff. Please do not build furniture out of it. (I (Gary) will.)</div>
      </details>
      <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000]">
        <summary className="cursor-pointer font-black">Can I haggle?</summary>
        <div className="mt-2 text-sm">If you bring a wheelbarrow, we’ll talk.</div>
      </details>
    </div>
  </section>
);

const SugarSale = () => (
  <section className="px-4 sm:px-8 py-12">
    <h3 className="text-3xl font-black mb-4">Sugar Sale</h3>
    <div className="rounded-2xl border-[4px] border-grey bg-yellow-200 p-6 shadow-[4px_4px_0_#000]">
      <p className="text-grey">Buy a 10-pack and get the sugar free—limited time only.</p>
    </div>
  </section>
);

const Events = () => (
  <section className="px-4 sm:px-8 py-12">
    <h3 className="text-3xl font-black mb-4">Events</h3>
    <ul className="space-y-3">
      {["Pop-up tasting — Sat 2pm", "Demo day — Sun 12pm", "Warehouse tour — Next Fri"].map(
        (t, i) => (
          <li
            key={i}
            className="rounded-lg border-[4px] border-grey bg-white px-4 py-3 shadow-[3px_3px_0_#000]"
          >
            {t}
          </li>
        )
      )}
    </ul>
  </section>
);

/* ===== MAIN APP (exported) ===== */
export default function SugarSaleSite() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[url('https://placehold.co/40x40/png?text=*')] bg-repeat scroll-smooth overflow-x-hidden">
        <div className="min-h-screen bg-white/90">
          <LeftRail />
          <RightRail />

          {/* Content gets side spacing only at lg+ so rails don’t overlap */}
          <div className="min-h-screen flex flex-col w-auto lg:ml-[200px] lg:mr-[200px]">
            <Header />

            {/* Marquee below the sticky header so it can’t overlap nav */}
            <div className="mt-2">
              <Marquee text="All Sugar Must Go — Liquidate Responsibly" />
            </div>

            <main className="flex flex-col w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/about" element={<About />} />
                <Route path="/sugar-sale" element={<SugarSale />} />
                <Route path="/events" element={<Events />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            <footer className="border-t-[4px] border-grey bg-gray-100 py-8 w-full px-4 sm:px-8">
              <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
                <p className="text-center text-sm font-medium md:text-left">
                  © {new Date().getFullYear()} Long White X Zero Sugar.
                </p>
                <div className="flex items-center gap-3">
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
      </div>
    </HashRouter>
  );
}

