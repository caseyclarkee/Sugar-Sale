import React, { useEffect, useState } from "react";
import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed";

const Badge = ({ children, tone = "yellow" }) => {
  const toneClasses =
    tone === "yellow"
      ? "bg-yellow-300 text-black"
      : tone === "purple"
      ? "bg-purple-500 text-white"
      : "bg-gray-300 text-black";
  return (
    <span className={"rounded-full border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000] " + toneClasses}>
      {children}
    </span>
  );
};

const Card = ({ deal }) => {
  const now = new Date();
  const exp = deal.expires ? new Date(deal.expires) : null;
  const isExpired = exp ? now > exp : false;
  return (
    <div className="p-4 border-4 border-black bg-white shadow-xl mb-4">
      <h3 className="text-xl font-bold">{deal.title}</h3>
      <p>${deal.price}</p>
      {isExpired ? <Badge tone="gray">Expired</Badge> : <Badge>Today’s Deal</Badge>}
      <div className="mt-3">
        {deal.platform === "instagram" ? (
          <InstagramEmbed url={deal.postUrl} width={328} />
        ) : deal.platform === "tiktok" ? (
          <TikTokEmbed url={deal.postUrl} width={325} />
        ) : null}
      </div>
    </div>
  );
};

export default function Deals(){
  const [deals,setDeals] = useState([]);
  useEffect(()=>{ fetch("/deals.json", {cache:'no-store'}).then(r=>r.json()).then(setDeals)},[]);
  return <section className="p-8"><h2 className="text-3xl font-black mb-4">Daily Deals</h2>{deals.map(d=><Card key={d.id} deal={d}/>)}</section>
}
