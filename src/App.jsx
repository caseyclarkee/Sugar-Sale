import React from "react";
import { HashRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Deals from "./pages/Deals.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import X from "./pages/X.jsx";
import Merch from "./pages/Merch.jsx";

/* ---------------- GA Listener ---------------- */
function GAListener() {
  const { pathname } = useLocation();
  const [hash, setHash] = React.useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    const gated = document.documentElement.classList.contains("agegate-active");
    if (gated) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname + (hash || ""),
      page_title: document.title,
    });
  }, [pathname, hash]);

  return null;
}

/* -------------- Components (Burst, Marquee, Header, etc.) -------------- */
/* ... (your entire existing code exactly as you pasted it) ... */

/* ---------------------------------------------------------------------- */
/* Exported App */
export default function SugarSaleSite() {
  React.useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <HashRouter>
      {/* GA4 SPA tracker */}
      <GAListener />

      <div className="min-h-screen bg-white bg-repeat scroll-smooth overflow-x-hidden">
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

          <MobileImageMarquee />
          <footer className="border-t-[4px] border-grey bg-gray-100 py-8 w-full px-4 sm:px-8">
            {/* ... your footer unchanged ... */}
          </footer>
        </div>
      </div>
    </HashRouter>
  );
}
