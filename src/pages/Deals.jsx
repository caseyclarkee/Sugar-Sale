// src/pages/Deals.jsx
import React from "react";

/* ----------------------------- helpers ----------------------------- */
const cx = (...cs) => cs.filter(Boolean).join(" ");

// parse "YYYY-MM-DDTHH:mm:ss" (no tz)
const parseNaiveParts = (str) => {
  const m = String(str || "").match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):?(\d{2}):?(\d{2})?)?$/
  );
  if (!m) return null;
  const [, y, M, d, h = "00", mnt = "00", s = "00"] = m;
  return { year: +y, month: +M, day: +d, hour: +h, minute: +mnt, second: +s };
};

// convert a naive NZ time to UTC Date by reversing the zone offset
const zonedTimeToUtc = (parts, timeZone) => {
  const desiredUtcMs = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  const desiredUtc = new Date(desiredUtcMs);

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const zoneParts = Object.fromEntries(
    fmt
      .formatToParts(desiredUtc)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value])
  );

  const zoneMs = Date.UTC(
    +zoneParts.year,
    +zoneParts.month - 1,
    +zoneParts.day,
    +zoneParts.hour,
    +zoneParts.minute,
    +zoneParts.second
  );
  const offset = zoneMs - desiredUtcMs;
  return new Date(desiredUtcMs - offset);
};

const parseMaybeNZ = (value) => {
  if (!value) return null;
  const hasOffset = /[zZ]|[+\-]\d{2}:\d{2}$/.test(value);
  if (hasOffset) return new Date(value);
  const parts = parseNaiveParts(value);
  return parts ? zonedTimeToUtc(parts, "Pacific/Auckland") : null;
};

const nzFormatNaive = (utcDate) => {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Pacific/Auckland",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    fmt
      .formatToParts(utcDate)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
};

const addWeeksNZ = (baseNZNaiveStr, weeks) => {
  const baseUtc = parseMaybeNZ(baseNZNaiveStr);
  const shiftedUtc = new Date(baseUtc.getTime() + weeks * 7 * 86400000);
  return nzFormatNaive(shiftedUtc);
};

const weekEndFromStartNZ = (startNZNaiveStr) => {
  const startUtc = parseMaybeNZ(startNZNaiveStr);
  const endUtc = new Date(
    startUtc.getTime() + 6 * 86400000 + (23 * 3600000 + 59 * 60000 + 59 * 1000)
  );
  return nzFormatNaive(endUtc);
};

const isLiveNowNZ = (start, end) => {
  const s = parseMaybeNZ(start);
  const e = parseMaybeNZ(end);
  const now = new Date();
  return !!(s && e && now >= s && now <= e);
};

/* ----------------------------- UI bits ----------------------------- */
const MediaFrame = ({ children, dotw }) => (
  <div
    className={cx(
      "relative overflow-hidden border-[4px] border-black rounded-xl bg-white shadow-[6px_6px_0_#000]",
      dotw ? "aspect-[9/16]" : "aspect-[4/5]"
    )}
  >
    {children}
  </div>
);

const DealCard = ({ deal }) => {
  const isVideo = !!deal.vimeoId;
  return (
    <div className="flex flex-col gap-3">
      <MediaFrame dotw={deal.dotw}>
        {deal.placeholder ? (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <span className="font-black uppercase tracking-wide text-black/60">
              Coming soon…
            </span>
          </div>
        ) : isVideo ? (
          <iframe
            src={`https://player.vimeo.com/video/${deal.vimeoId}${
              deal.vimeoHash ? `?h=${deal.vimeoHash}` : ""
            }`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            className="absolute inset-0 w-full h-full"
            title={deal.title}
          />
        ) : (
          <img
            src={deal.image}
            alt={deal.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </MediaFrame>

      <div>
        <h3 className="font-black text-[clamp(1rem,2vw,1.5rem)] leading-tight">
          {deal.title}
        </h3>

        {deal.disabled ? (
          <button
            disabled
            className="mt-2 w-full cursor-not-allowed border-[3px] border-black bg-gray-300 px-3 py-2 font-black shadow-[3px_3px_0_#000]"
          >
            {deal.disabledLabel || "Sold Out"}
          </button>
        ) : deal.waitlist ? (
          <button className="mt-2 w-full border-[3px] border-black bg-gray-300 px-3 py-2 font-black shadow-[3px_3px_0_#000] text-black/70">
            Join Waitlist
          </button>
        ) : (
          <button className="mt-2 w-full border-[3px] border-black bg-yellow px-3 py-2 font-black shadow-[3px_3px_0_#000] hover:bg-purple hover:text-white transition">
            Enter Draw
          </button>
        )}
      </div>
    </div>
  );
};

/* ----------------------------- page ----------------------------- */
export default function Deals() {
  // ⏱️ Set the FIRST go-live (NZ) and it will roll weekly
  // e.g. 9:00am Wed 29 Oct NZ time
  const baseStartNZ = "2025-10-29T09:00:00";

  const [staticDeals, setStatic] = React.useState([]);
  const [dotwData, setDotw] = React.useState([]);

  // load content (no dates in JSON needed)
  React.useEffect(() => {
    fetch("/data/deals.json")
      .then((r) => (r.ok ? r.json() : { static: [], dotw: [] }))
      .then((json) => {
        setStatic(json.static || []);
        setDotw(json.dotw || []);
      })
      .catch(() => {});
  }, []);

  // build the 4 weekly DOTWs with NZ live windows
  const weekly = React.useMemo(() => {
    // exactly 4 weekly windows based on baseStartNZ
    const templates = Array.from({ length: 4 }).map((_, i) => {
      const start = addWeeksNZ(baseStartNZ, i);
      const end = weekEndFromStartNZ(start);
      const src = dotwData[i] || {}; // content from JSON aligned by index
      const live = isLiveNowNZ(start, end);

      return {
        id: src.id || `dotw-${i + 1}`,
        dotw: true,
        start,
        end,
        // while not live → keep placeholder title
        title: live ? src.title || `Deal of the Week #${i + 1}` : "Deal of the Week",
        // media swaps only when live
        placeholder: !live,
        vimeoId: live ? src.vimeoId : undefined,
        vimeoHash: live ? src.vimeoHash : undefined,
        image: live ? undefined : src.poster || "/images/deals/placeholder-9x16.jpg",
      };
    });
    return templates;
  }, [dotwData, baseStartNZ]);

  return (
    <section className="bg-yellow min-h-screen px-4 sm:px-8 py-12">
      <h1 className="text-6xl sm:text-8xl font-black text-center mb-12 text-black">
        Gary’s Sweet Deals
      </h1>

      {/* four paired rows: static + dotw */}
      <div className="grid gap-12">
        {Array.from({ length: 4 }).map((_, i) =>
          weekly[i] && staticDeals[i] ? (
            <div key={i} className="grid md:grid-cols-2 gap-8 items-stretch">
              <DealCard deal={staticDeals[i]} />
              <DealCard deal={weekly[i]} />
            </div>
          ) : null
        )}
      </div>

      {/* remaining two statics below */}
      {staticDeals.length > 4 && (
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {staticDeals.slice(4, 6).map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      )}
    </section>
  );
}

