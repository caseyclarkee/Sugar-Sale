import React, { useEffect, useState } from "react";
import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed";

// Small utility badge (same chunky feel)
const Badge = ({ children, tone = "yellow" }) => {
  const toneClasses =
    tone === "yellow"
      ? "bg-yellow-300 text-black"
      : tone === "purple"
      ? "bg-purple-500 text-white"
      : "bg-gray-300 text-black";
  return (
    <span className={
      "rounded-full border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000] " +
      toneClasses
    }>
      {children}
    </span>
  );
};

// One merch-style card for a deal
const DealCard = ({ deal }) => {
  const now = new Date();
  const exp = deal.expires ? new Date(deal.expires) : null;
  const isExpired = exp ? now > exp : false;

  return (
    <div className="flex h-full flex-col rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000]">
      {/* Media zone (merch-like framed box) */}
      <div className="rounded-lg border-[3px] border-black bg-gray-50 p-2 mb-4">
        <div className="w-full overflow-hidden rounded-md">
          {deal.platform === "instagram" && deal.postUrl ? (
            <InstagramEmbed url={deal.postUrl} width={"100%"} />
          ) : deal.platform === "tiktok" && deal.postUrl ? (
            <TikTokEmbed url={deal.postUrl} width={325} />
          ) : deal.image ? (
            <img src={deal.image} alt={deal.title} className="w-full rounded-md" />
          ) : (
            <div className="grid h-48 place-items-center text-gray-500">No media</div>
          )}
        </div>
      </div>

      {/* Text + actions */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-black">{deal.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          {isExpired ? <Badge tone="gray">Expired</Badge> : <Badge>Today’s Deal</Badge>}
          {deal.platform && <Badge tone="purple">{deal.platform}</Badge>}
        </div>
        <div className="mt-3 text-lg font-bold">${Number(deal.price).toFixed(2)}</div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {deal.postUrl && (
            <a
              href={deal.postUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-[4px] border-black bg-yellow-300 px-4 py-2 font-black uppercase shadow-[4px_4px_0_#000]"
            >
              View Post
            </a>
          )}
          <button
            onClick={() => alert("Pretend checkout 🤘 (mock only).")}
            className="rounded-xl border-[4px] border-black bg-purple-500 px-4 py-2 font-black uppercase text-white shadow-[4px_4px_0_#000]"
          >
            Buy (Mock)
          </button>
        </div>
      </div>
    </div>
  );
};

// “Coming Soon” in the same merch-card visual language
const ComingSoonCard = ({ title = "Coming Soon" }) => (
  <div className="flex h-full flex-col rounded-xl border-[4px] border-black bg-yellow-200 p-6 text-center shadow-[6px_6px_0_#000]">
    <div className="flex flex-1 items-center justify-center">
      <span className="text-2xl font-black uppercase">{title}</span>
    </div>
    <div className="mt-4 text-sm text-black/70">New deal drops soon</div>
  </div>
);

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [coming, setComing] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/deals.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data) => {
        const live = data.filter((d) => !d.comingSoon).slice(0, 3);
        const soon = data.filter((d) => d.comingSoon).slice(0, 3);
        setDeals(live);
        setComing(soon);
      })
      .catch(() => setErr("Could not load deals.json"));
  }, []);

  return (
    <section className="px-8 py-12 space-y-8">
      <h2 className="text-4xl font-black uppercase drop-shadow-[3px_3px_0_#000] text-yellow-400">
        Daily Deals
      </h2>
      {err && (
        <div className="rounded-lg border-[3px] border-black bg-red-100 p-3 text-sm">
          {err}
        </div>
      )}

      {/* Top: 3 deal cards in merch-style grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((d) => (
          <DealCard key={d.id} deal={d} />
        ))}
      </div>

      {/* Bottom: 3 Coming Soon boxes in the same grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coming.map((c) => (
          <ComingSoonCard key={c.id} title={c.title} />
        ))}
      </div>
    </section>
  );
}
