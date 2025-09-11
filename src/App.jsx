import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Merch from './pages/Merch.jsx';
import About from './pages/About.jsx';
import SugarSale from './pages/SugarSale.jsx';
import Events from './pages/Events.jsx';

const Burst = ({ children, className = "" }) => (
  <div className={\`grid place-items-center rounded-full bg-yellow-300 text-black border-[4px] border-black shadow-[4px_4px_0_#000] \${className}\`}>
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
    <style>{\`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }\`}</style>
  </div>
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
      <Link to="/merch" className="rounded-xl border-[4px] border-black bg-purple-500 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000] text-white">Merch</Link>
      <Link to="/about" className="rounded-xl border-[4px] border-black bg-yellow-300 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000]">About X</Link>
      <Link to="/sugar-sale" className="rounded-xl border-[4px] border-black bg-purple-500 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000] text-white">Sugar Sale</Link>
      <Link to="/events" className="rounded-xl border-[4px] border-black bg-yellow-300 px-6 py-2 text-lg font-black uppercase shadow-[4px_4px_0_#000]">Events</Link>
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

export default function App() {
  return (
    <div className="min-h-screen bg-[url('https://placehold.co/40x40/png?text=*')] bg-repeat scroll-smooth">
      <div className="min-h-screen bg-white/90">
        <LeftRail />
        <RightRail />
        <div className="min-h-screen ml-[200px] mr-[200px] flex flex-col w-auto">
          <Header />
          <main className="flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/about" element={<About />} />
              <Route path="/sugar-sale" element={<SugarSale />} />
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="border-t-[4px] border-black bg-gray-100 py-8 w-full px-8">
            <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
              <p className="text-center text-sm font-medium md:text-left">© {new Date().getFullYear()} Long White — X Zero Sugar.</p>
              <div className="flex items-center gap-3">
                <a href="#" className="rounded-lg border-[4px] border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]">Terms</a>
                <a href="#" className="rounded-lg border-[4px] border-black bg-purple-500 px-3 py-1 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
