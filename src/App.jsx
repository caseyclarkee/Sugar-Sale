import React from "react";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import DailyDeals from "./components/DailyDeals";

function App() {
  return (
    <div className="bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Header />

          {/* Nav */}
          <nav className="w-full relative z-[60] py-2">
            <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-3 min-h-[48px]">
                <a href="/" className="btn-pill bg-yellow-400">
                  Home
                </a>
                <a href="/merch" className="btn-pill bg-purple-400">
                  Merch
                </a>
                <a href="/about" className="btn-pill bg-yellow-400">
                  About X
                </a>
                <a href="/sugar-sale" className="btn-pill bg-purple-400">
                  Sugar Sale
                </a>
                <a href="/events" className="btn-pill bg-yellow-400">
                  Events
                </a>
                <a href="/deals" className="btn-pill bg-purple-400">
                  Deals
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Marquee sits below the header, no overlap */}
      <div className="mt-2">
        <Marquee text="All Sugar Must Go — Liquidate Responsibly — 2000s Style" />
      </div>

      {/* Page Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailyDeals />
      </main>
    </div>
  );
}

export default App;

