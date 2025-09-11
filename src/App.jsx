import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";

const Page = ({ title }) => (
  <section className="p-8">
    <h2 className="text-4xl font-black">{title}</h2>
    <p className="mt-2 text-gray-700">Content coming soon.</p>
  </section>
);

export default function SugarSaleSite() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-yellow-100">
        <header className="sticky top-0 z-10 flex flex-wrap gap-2 border-b-4 border-black bg-yellow-300 p-4">
          {[
            { to: "/", label: "Home" },
            { to: "/merch", label: "Merch" },
            { to: "/about", label: "About X" },
            { to: "/sugar-sale", label: "Sugar Sale" },
            { to: "/events", label: "Events" },
            { to: "/deals", label: "Deals" }
          ].map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.to === "/"}
              className="rounded-lg border-2 border-black bg-white px-4 py-2 font-bold"
            >
              {i.label}
            </NavLink>
          ))}
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Page title="Home" />} />
            <Route path="/merch" element={<Page title="Merch" />} />
            <Route path="/about" element={<Page title="About X" />} />
            <Route path="/sugar-sale" element={<Page title="Sugar Sale" />} />
            <Route path="/events" element={<Page title="Events" />} />
            <Route path="/deals" element={<Deals />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
