
import React from "react";

/** Sticky header + fixed side rails landing page */
const Burst = ({ children, className = "" }) => (
  <div className={`grid place-items-center rounded-full bg-yellow-300 text-black border-[4px] border-black shadow-[4px_4px_0_#000] ${className}`}>
    <div className="px-4 py-2 text-center font-black uppercase tracking-wide">{children}</div>
  </div>
);

const Marquee = ({ text }) => (
  <div className="border-y-[4px] border-black bg-pink-300 text-black overflow-hidden w-full">
    <div className="whitespace-nowrap py-2 text-center text-sm font-black uppercase tracking-widest animate-[marquee_14s_linear_infinite]">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="mx-6">✦ {text} ✦</span>
      ))}
    </div>
    <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </div>
);

const NavLink = ({ target, children, className = "" }) => (
  <a
    href={`#${target}`}
    onClick={(e) => {
      e.preventDefault();
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }}
    className={className}
  >
    {children}
  </a>
);

const Header = () => (
  <header className="sticky top-0 z-30 grid gap-4 border-b-[4px] border-black bg-white/95 backdrop-blur py-6 w-full">
    <div className="flex items-center justify-between w-full px-8">
      <h1 className="relative text-6xl font-black leading-[0.9] text-purple-700 drop-shadow-[3px_3px_0_#000]">
        <span className="absolute -left-10 -top-12 -z-10 rotate-12 text-[140px] leading-none text-yellow-300 select-none">X</span>
        <span className="block">Sugar</span>
        <span className="italic">Liquidation</span>
        <span className="block">Sale</span>
      </h1>
      <div className="ml-6 inline-block rounded-full border-[4px] border-black bg-purple-500 px-4 py-2 text-white font-black uppercase shadow-[4px_4px_0_#000]">
        That’s UnXpected
      </div>
    </div>
    <nav className="mx-auto flex flex-wrap items-center justify-center gap-4 px-8">
      <NavLink target="merch" className="rounded-xl border-[4px] border-black bg-purple-500 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000] text-white">Merch</NavLink>
      <NavLink target="about" className="rounded-xl border-[4px] border-black bg-yellow-300 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000]">About X</NavLink>
      <NavLink target="sugar-sale" className="rounded-xl border-[4px] border-black bg-purple-500 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000] text-white">Sugar Sale</NavLink>
      <NavLink target="events" className="rounded-xl border-[4px] border-black bg-yellow-300 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000]">Events</NavLink>
    </nav>
    <Marquee text="All Sugar Must Go — Liquidate Responsibly — 2000s Style" />
  </header>
);

const LeftRail = () => (
  <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[200px] flex-col justify-between border-r-[4px] border-black bg-yellow-300 p-4 text-center z-40">
    <div className="mt-20">
      <p className="font-black uppercase mb-4">We didn't use any sugar in</p>
      <div className="aspect-square w-full overflow-hidden rounded-full border-[4px] border-black shadow-[4px_4px_0_#000] mb-4">
        <img src="https://placehold.co/300x300/png?text=Can" alt="X Can" className="h-full w-full object-cover" />
      </div>
      <p className="font-black uppercase">So Gary needs to sell the sugar</p>
    </div>
  </aside>
);

const RightRail = () => (
  <aside className="hidden lg:flex fixed right-0 top-0 h-full w-[200px] flex-col justify-between border-l-[4px] border-black bg-purple-500 p-4 text-center text-white z-40">
    <div className="mt-20">
      <Burst className="mx-auto mb-6 h-24 w-24"><span className="text-lg">Sale On Now!</span></Burst>
      <div className="aspect-[3/4] overflow-hidden rounded-xl border-[4px] border-black shadow-[4px_4px_0_#000] mb-6">
        <img src="https://placehold.co/300x400/png?text=Gary" alt="Gary" className="h-full w-full object-cover" />
      </div>
      <p className="font-black uppercase bg-yellow-300 text-black border-[4px] border-black px-2 py-1 shadow-[3px_3px_0_#000]">Liquidate responsibly</p>
    </div>
  </aside>
);

const HeroRow = () => (
  <section id="sugar-sale" className="py-10 px-8">
    <div className="relative w-full rounded-2xl border-[4px] border-black bg-purple-300 shadow-[6px_6px_0_#000] p-8 text-center text-yellow-300">
      <h2 className="text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">Sugar Liquidation! Sale!</h2>
      <div className="absolute right-6 top-6">
        <Burst className="h-28 w-28"><span className="text-xl font-black">ON NOW!</span></Burst>
      </div>
      <img src="https://placehold.co/800x400/png?text=Gary+Hero" alt="Hero" className="mx-auto mt-6 rounded-xl border-[4px] border-black shadow-[4px_4px_0_#000]" />
    </div>
  </section>
);

const MerchGrid = () => (
  <section id="merch" className="px-8 py-12">
    <h3 className="text-3xl font-black mb-6">Merch</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="rounded-xl border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
          <div className="aspect-square rounded-lg border-[3px] border-black bg-gray-100 grid place-items-center">
            <span className="text-gray-500">Item {i}</span>
          </div>
          <button className="mt-4 w-full rounded-lg border-[3px] border-black bg-yellow-300 px-3 py-2 font-black uppercase shadow-[3px_3px_0_#000]">Add to cart</button>
        </div>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="px-8 py-12">
    <h3 className="text-3xl font-black mb-4">About X</h3>
    <p className="max-w-2xl">X Zero Sugar brings you bold flavor with no sugar. This landing page is a playful homage to early-2000s web design with thick borders, bright colors, and chunky buttons.</p>
  </section>
);

const SugarSaleSection = () => (
  <section id="sugar-sale-info" className="px-8 py-12">
    <h3 className="text-3xl font-black mb-4">Sugar Sale</h3>
    <div className="rounded-2xl border-[4px] border-black bg-yellow-200 p-6 shadow-[4px_4px_0_#000]">
      <p className="text-black">Buy a 10-pack and get the sugar free—limited time only.</p>
    </div>
  </section>
);

const EventsSection = () => (
  <section id="events" className="px-8 py-12">
    <h3 className="text-3xl font-black mb-4">Events</h3>
    <ul className="space-y-3">
      {["Pop-up tasting — Sat 2pm","Demo day — Sun 12pm","Warehouse tour — Next Fri"].map((t,i) => (
        <li key={i} className="rounded-lg border-[4px] border-black bg-white px-4 py-3 shadow-[3px_3px_0_#000]">{t}</li>
      ))}
    </ul>
  </section>
);

const Footer = () => (
  <footer className="border-t-[4px] border-black bg-gray-100 py-8 w-full px-8">
    <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
      <p className="text-center text-sm font-medium md:text-left">© {new Date().getFullYear()} Long White — X Zero Sugar.</p>
      <div className="flex items-center gap-3">
        <a href="#" className="rounded-lg border-[4px] border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]">Terms</a>
        <a href="#" className="rounded-lg border-[4px] border-black bg-purple-500 px-3 py-1 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]">Privacy</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[url('https://placehold.co/40x40/png?text=*')] bg-repeat scroll-smooth">
      <div className="min-h-screen bg-white/90">
        <LeftRail />
        <RightRail />
        <div className="min-h-screen ml-[200px] mr-[200px] flex flex-col w-auto">
          <main className="flex flex-col w-full">
            <Header />
            <HeroRow />
            <MerchGrid />
            <AboutSection />
            <SugarSaleSection />
            <EventsSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
