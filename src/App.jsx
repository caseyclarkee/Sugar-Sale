import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Merch from "./pages/Merch.jsx";
import About from "./pages/About.jsx";
import SugarSale from "./pages/SugarSale.jsx";
import Events from "./pages/Events.jsx";

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

const Marquee = ({ text }) => (
  <div className="border-y-[4px] border-black bg-pink-300 text-black overflow-hidden w-full">
    <div className="whitespace-nowrap py-2 text-center text-sm font-black uppercase tracking-widest animate-[marquee_14s_linear_infinite]">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="mx-6">✦ {text} ✦</span>
      ))}
    </div>
    <style>
      {
        "@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }"
      }
    </style>
  </div>
);

const Header = () => (
  <header className="sticky top-0 z-30 grid gap-4 border-b-[4px] border-black bg-white/95 backdrop-blur py-6 w-full">
    <div className="flex items-center justify-between w-full px-8">
      <h1 className="relative text-6xl font-black leading-[0.9] text-purple-700 drop-shadow-[3px_3px_0_#000]">
        <span className="absolute -left-10 -top-12 -z-10 rotate-12 text-[140px] leading-none text-yellow-300 select-none">X</span>
        <
