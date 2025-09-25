import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";

/**
 * App shell:
 * - Sticky header (z-50), nav stacks on mobile, wraps on desktop
 * - Marquee sits BELOW the header (so it never overlaps buttons)
 * - Fixed side rails at lg+, content gets side margins only at lg+
 * - overflow-x-hidden on outer wrapper to kill sideways scroll
 */

/* Little round badge */
const Burst = ({ children, className = "" }) => (
  <div
    className={
      "grid place-items-center rounded-full bg-yellow-300 text-black border-[4px] border-black shadow-[4px_4px_0_#000] " +
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
  <div className="border-y-[4px] border-black bg-pink-300 text-black overflow-hidden w-full">
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
  <header className="sticky top-0 z-50 grid gap-4 border-b-[4px] border-black bg-white/95 backdrop-blur py-4 w-full overflow-visible">
    {/* Logo row */}
    <div className="flex items-center justify-between w-full px-4 sm:px-8">
      <h1 className="relative text-4xl sm:text-6xl font-black leading-[0.9] text-purple-700 drop-shadow-[3px_3px_0_#000]">
        <span className="absolute -left-8 -top-10 -z-10 rotate-12 text-[100px] sm:text-[140px] leading-none text-yellow-300 select-none">
          X
        </span>
        <span className="block">Sugar</span>
        <span className="italic">Liquidation</span>
        <span className="block">Sale</span>
      </h1>
      <div className="ml-6 inline-block rounded-full border-[4px] border-black bg-purple-500 px-3 sm:px-4 py-2 text-white font-black uppercase shadow-[4px_4px_0_#000]">
        That’s UnXpected
      </div>
    </div>

    {/* Nav: grid on small, wraps on md+; given its own height & z so it can't be overlapped */}
    <nav className="w-full relative z-[60] py-2">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-3 min-h-[48px]">
          {[
            { to: "/", label: "Home", tone: "bg-yellow-300" },
            { to: "/deals", label: "Deals", tone: "bg-purple-500 text-white" },
            { to: "/about", label: "About X", tone: "bg-yellow-300" },
            { to: "/merch", label: "Merch", tone: "bg-purple-500 text-white" },
            
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-2xl border-[4px] border-black px-5 py-2 text-center leading-none",
                  "text-base font-black uppercase",
                  "shadow-[4px_4px_0_#000] hover:shadow-[5px_5px_0_#000] transition-shadow",
                  "active:translate-y-[1px]",
                  item.tone,
                  isActive ? "ring-2 ring-black ring-offset-2 ring-offset-white" : "",
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
const LeftRail = () => (
  <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[200px] flex-col justify-between border-r-[4px] border-black bg-yellow-300 p-4 text-center z-40">
    <div className="mt-20">
      <p className="font-black uppercase mb-4">We didn't use any sugar in</p>
      <div className="aspect-square w-full overflow-hidden rounded-full border-[4px] border-black shadow-[4px_4px_0_#000] mb-4">
        <img
          src="https://placehold.co/300x300/png?text=Can"
          alt="X Can"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="font-black uppercase">So Gary needs to sell the sugar</p>
    </div>
  </aside>
);

const RightRail = () => (
  <aside className="hidden lg:flex fixed right-0 top-0 h-full w-[200px] flex-col justify-between border-l-[4px] border-black bg-purple-500 p-4 text-center text-white z-40">
    <div className="mt-20">
      <Burst className="mx-auto mb-6 h-24 w-24">
        <span className="text-lg">Sale On Now!</span>
      </Burst>
      <div className="aspect-[3/4] overflow-hidden rounded-xl border-[4px] border-black shadow-[4px_4px_0_#000] mb-6">
        <img
          src="https://placehold.co/300x400/png?text=Gary"
          alt="Gary"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="font-black uppercase bg-yellow-300 text-black border-[4px] border-black px-2 py-1 shadow-[3px_3px_0_#000]">
        Liquidate responsibly
      </p>
    </div>
  </aside>
);

/* Pages */
const Home = () => (
  <section className="py-10 px-4 sm:px-8">
    <div className="relative w-full rounded-2xl border-[4px] border-black bg-purple-300 shadow-[6px_6px_0_#000] p-6 sm:p-8 text-center text-yellow-300">
      <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
        Sugar Liquidation! Sale!
      </h2>
      <div className="absolute right-3 top-3 sm:right-6 sm:top-6">
        <Burst className="h-24 w-24 sm:h-28 sm:w-28">
          <span className="text-lg sm:text-xl font-black">ON NOW!</span>
        </Burst>
      </div>
      <div className="mx-auto mt-6 aspect-video w-full max-w-4xl overflow-hidden rounded-xl border-[4px] border-black shadow-[4px_4px_0_#000]">
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
          className="rounded-xl border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000]"
        >
          <div className="aspect-square rounded-lg border-[3px] border-black bg-gray-100 grid place-items-center">
            <span className="text-gray-500">Item {i}</span>
          </div>
          <button className="mt-4 w-full rounded-lg border-[3px] border-black bg-yellow-300 px-3 py-2 font-black uppercase shadow-[3px_3px_0_#000]">
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
      X Zero Sugar brings you bold flavor with no sugar. 
    </p>
  </section>
);

const SugarSale = () => (
  <section className="px-4 sm:px-8 py-12">
    <h3 className="text-3xl font-black mb-4">Sugar Sale</h3>
    <div className="rounded-2xl border-[4px] border-black bg-yellow-200 p-6 shadow-[4px_4px_0_#000]">
      <p className="text-black">Buy a 10-pack and get the sugar free—limited time only.</p>
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
            className="rounded-lg border-[4px] border-black bg-white px-4 py-3 shadow-[3px_3px_0_#000]"
          >
            {t}
          </li>
        )
      )}
    </ul>
  </section>
);

export default function SugarSaleSite() {
  return (
    <HashRouter>
      {/* OUTER WRAPPER: prevent sideways scroll */}
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

            <footer className="border-t-[4px] border-black bg-gray-100 py-8 w-full px-4 sm:px-8">
              <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
                <p className="text-center text-sm font-medium md:text-left">
                  © {new Date().getFullYear()} Long White — X Zero Sugar.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="rounded-lg border-[4px] border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="rounded-lg border-[4px] border-black bg-purple-500 px-3 py-1 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]"
                  >
                    Privacy
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
