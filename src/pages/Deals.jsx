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

/* ----------------------------- layout bits ----------------------------- */
/** AspectBox: safe aspect without Tailwind aspect plugin */
const AspectBox = ({ ratio = 1, children }) => {
  const pt = `${ratio * 100}%`; // ratio = height/width
  return (
    <div className="relative w-full overflow-hidden rounded-xl border-[4px] border-black bg-white shadow-[6px_6px_0_#000]">
      <div style={{ paddingTop: pt }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

const MediaFrame = ({ dotw, children }) => {
  // 9:16 (height/width = 16/9 ≈ 1.7778) for DOTW, 4:5 (1.25) for static
  return <AspectBox ratio={dotw ? 16 / 9 : 5 / 4}>{children}</AspectBox>;
};

const DealCard = ({ deal }) => {
  const isVideo = !!deal.vimeoId;
  return (
    <div className="flex flex-col gap-3">
      <MediaFrame dotw={!!deal.dotw}>
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
            className="absolute inset-0 h-full w-full"
            title={deal.title}
          />
        ) : (
          <img
            src={deal.image}
            alt={deal.title}
            className="absolute inset-0 h-full w-full object-cover"
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
          <button className="mt-2 w-full border-[3px] border-black bg-gray-300 px-3 py-2 font-black text-black/70 shadow-[3px_3px_0_#000]">
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

/* ------------------------------ page ------------------------------ */
export default function Deals() {
  // Set the FIRST go-live (NZ). Rolls weekly.
  const baseStartNZ = "2025-10-29T09:00:00";

  const [staticDeals, setStaticDeals] = React.useState([]);
  const [dotwData, setDotwData] = React.useState([]);

  // super-safe default data so nothing crashes if JSON missing/invalid
  const DEFAULT_STATIC = React.useMemo(
    () => [
      {
        id: "dentures",
        title: "Sugar Dentures",
        image: "/images/deals/Sugar-Dentures.jpg",
        disabled: true,
        disabledLabel: "Sold Out",
      },
      {
        id: "bag10kg",
        title: "10kg of Sugar",
        image: "/images/deals/Bag-of-Sugar.jpg",
        waitlist: true,
      },
      {
        id: "officechair",
        title: "Office Chair (Lightly Used)",
        image: "/images/deals/Chair.jpg",
        disabled: true,
        disabledLabel: "Sold Out",
      },
      {
        id: "sugarcup",
        title: "Cup of Sugar",
        image: "/images/deals/Cup.jpg",
        disabled: true,
        disabledLabel: "Sold Out",
      },
      {
        id: "fridge",
        title: "Fridge (With Magnets)",
        image: "/images/deals/Fridge.jpg",
        disabled: true,
        disabledLabel: "Sold Out",
      },
      {
        id: "whiteboard",
        title: "Sales Whiteboard",
        image: "/images/deals/Whiteboard.jpg",
        disabled: true,
        disabledLabel: "Sold Out",
      },
    ],
    []
  );

  const DEFAULT_DOTW = React.useMemo(
    () => [
      {
        id: "dotw-1",
        title: "Deal of the Week #1 — Sugar Sculpture of Grandma",
        vimeoId: "1131590662",
        vimeoHash: "95b90608b7",
        poster: "/images/deals/dotw1-poster.jpg",
      },
      {
        id: "dotw-2",
        title: "Deal of the Week #2 — 10kg of Sugar (Free!)",
        vimeoId: "987654321",
        poster: "/images/deals/dotw-2.jpg",
      },
      {
        id: "dotw-3",
        title: "Deal of the Week #3 — Office Chair (Lightly Used)",
        vimeoId: "192837465",
        poster: "/images/deals/dotw-3.jpg",
      },
      {
        id: "dotw-4",
        title: "Deal of the Week #4 — Cup of Sugar",
        vimeoId: "564738291",
        poster: "/images/deals/dotw-4.jpg",
      },
    ],
    []
  );

  // load JSON content, but never crash if it 404s or is invalid
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/deals.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setStaticDeals(Array.isArray(json.static) ? json.static : DEFAULT_STATIC);
        setDotwData(Array.isArray(json.dotw) ? json.dotw : DEFAULT_DOTW);
      } catch (e) {
        console.warn("[deals] using defaults:", e?.message || e);
        setStaticDeals(DEFAULT_STATIC);
        setDotwData(DEFAULT_DOTW);
      }
    })();
  }, [DEFAULT_STATIC, DEFAULT_DOTW]);

  // build 4 weekly DOTWs with NZ live windows
  const weekly = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => {
      const start = addWeeksNZ(baseStartNZ, i);
      const end = weekEndFromStartNZ(start);
      const src = dotwData[i] || {};
      const live = isLiveNowNZ(start, end);

      return {
        id: src.id || `dotw-${i + 1}`,
        dotw: true,
        start,
        end,
        title: live ? src.title || `Deal of the Week #${i + 1}` : "Deal of the Week",
        placeholder: !live,
        vimeoId: live ? src.vimeoId : undefined,
        vimeoHash: live ? src.vimeoHash : undefined,
        image: live ? undefined : src.poster || "/images/deals/placeholder-9x16.jpg",
      };
    });
  }, [dotwData, baseStartNZ]);

  return (
    <section className="bg-yellow min-h-screen px-4 sm:px-8 py-12">
      <h1 className="mb-12 text-center text-6xl sm:text-8xl font-black text-black">
        Gary’s Sweet Deals
      </h1>

      {/* four paired rows: static + dotw */}
      <div className="grid gap-12">
        {Array.from({ length: 4 }).map((_, i) =>
          weekly[i] && staticDeals[i] ? (
            <div key={i} className="grid items-stretch gap-8 md:grid-cols-2">
              <DealCard deal={staticDeals[i]} />
              <DealCard deal={weekly[i]} />
            </div>
          ) : null
        )}
      </div>

      {/* remaining two statics below */}
      {staticDeals.length > 4 && (
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {staticDeals.slice(4, 6).map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      )}
    </section>
  );
}

