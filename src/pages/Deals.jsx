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

const DealCard = ({ deal }) => {
  const now = new Date();
  const exp = deal.expires ? new Date(deal.expires) : null;
  const isExpired = exp ? now > exp : false;

  return (
    <div className="grid gap-4 rounded-2xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000] md:grid-cols-2">
      <div className="rounded-xl border-[3px] border-black bg-gray-50 p-2">
        {deal.platform === "instagram" && deal.postUrl ? (
          <InstagramEmbed url={deal.postUrl} width={"100%"} />
        ) : deal.platform === "tiktok" && deal.postUrl ? (
          <TikTokEmbed url={deal.postUrl} width={325} />
        ) : (
          <div className="grid h-48 place-items-center text-gray-500">No media</div>
        )}
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black drop-shadow-[2px_2px_0_#000] text-yellow-400">{deal.title}</h3>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
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

const ComingSoonCard = ({ title = "Coming Soon" }) => (
  <div className="grid place-items-center rounded-2xl border-[4px] border-black bg-yellow-200 p-10 text-center shadow-[6px_6px_0_#000]">
    <span className="text-2xl font-black uppercase">{title}</span>
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
        const live = data.filter((d) => !d.comingSoon);
        const soon = data.filter((d) => d.comingSoon);
        setDeals(live);
        setComing(soon);
      })
      .catch(() => setErr("Could not load deals.json"));
  }, []);

  return (
    <section className="px-8 py-12 space-y-8">
      <h2 className="text-4xl font-black uppercase drop-shadow-[3px_3px_0_#000] text-yellow-400">Daily Deals</h2>
      {err && <div className="rounded-lg border-[3px] border-black bg-red-100 p-3 text-sm">{err}</div>}

      {/* Top: 3 duplicated deals */}
      <div className="grid gap-6">
        {deals.slice(0, 3).map((d) => (
          <DealCard key={d.id} deal={d} />
        ))}
      </div>

      {/* Bottom: 3 Coming Soon boxes */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {coming.slice(0, 3).map((c) => (
          <ComingSoonCard key={c.id} title={c.title} />
        ))}
      </div>
    </section>
  );
}

