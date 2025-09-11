import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Deals from "./pages/Deals.jsx";

const Home = () => <div className='p-8'><h2 className='text-3xl font-bold'>Home</h2></div>;
const Merch = () => <div className='p-8'><h2 className='text-3xl font-bold'>Merch</h2></div>;
const About = () => <div className='p-8'><h2 className='text-3xl font-bold'>About X</h2></div>;
const SugarSale = () => <div className='p-8'><h2 className='text-3xl font-bold'>Sugar Sale</h2></div>;
const Events = () => <div className='p-8'><h2 className='text-3xl font-bold'>Events</h2></div>;

export default function SugarSaleSite() {
  return (
    <HashRouter>
      <div>
        <header className="p-4 border-b-4 border-black bg-yellow-200 flex gap-4">
          {[
            {to:"/",label:"Home"},
            {to:"/merch",label:"Merch"},
            {to:"/about",label:"About X"},
            {to:"/sugar-sale",label:"Sugar Sale"},
            {to:"/events",label:"Events"},
            {to:"/deals",label:"Deals"}
          ].map(i=>(
            <NavLink key={i.to} to={i.to} end={i.to==="/"} className="px-4 py-2 font-bold border-2 border-black bg-white">{i.label}</NavLink>
          ))}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/merch" element={<Merch/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/sugar-sale" element={<SugarSale/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/deals" element={<Deals/>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
