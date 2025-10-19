// src/pages/Deals.jsx — Deal of the Week (NZ-aware), countdown, CTA gating
import React from "react";

/* ----------------------------- Tiny helpers ------------------------------ */
const cx = (...cs) => cs.filter(Boolean).join(" ");

// Interpret a naive "YYYY-MM-DDTHH:mm:ss" as Pacific/Auckland, return a UTC Date
const nzLocalStringToUtcDate = (naive) => {
  if (!naive) return null;
  const local = new Date(naive.replace(" ", "T"));
  if (Number.isNaN(local.getTime())) return null;
  const inNZLocal = new Date(
    local.toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })
  );
  const diff = local.getTime() - inNZLocal.getTime();
  return new Date(local.getTime() - diff);
};

// Parse value that can be ISO with offset or NZ-naive (no offset)
const parseMaybeNZ = (value) => {
  if (!value) return null;
  const hasOffset = /[zZ]|[+\-]\d{2}:\d{2}$/.test(value);
  return hasOffset ? new Date(value) : nzLocalStringToUtcDate(value);
};

// Given weekOf "YYYY-MM-DD", build NZ window [start 00:00:00, end +6d 23:59:59]
const nzWeekWindowFromWeekOf = (weekOf) => {
  if (!weekOf) return { startAt: null, endAt: null };
  const startAt = parseMaybeNZ(`${weekOf}T00:00:00`);
  if (!startAt) return { startAt: null, endAt: null };
  const endAt = new Date(startAt.getTime() + 6 * 24 * 60 * 60 * 1000 + (23 * 60 * 60 + 59 * 60 + 59) * 1000);
  return { startAt, endAt };
};

const fmtDuration = (ms) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d >= 1) return `${d}d ${h}h ${m}m`;
  if (h >= 1) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
};

/* ----------------------------- UI Primitives ----------------------------- */
const Badge = ({ children, tone = "yellow" }) => {
  const toneClasses =
    tone === "yellow"
      ? "bg-yellow text-black"
      : tone === "purple"
      ? "bg-purple text-white"
      : tone === "red"
      ? "bg-red text-white"
      : tone === "blue"
      ? "bg-blue-500 text-white"
      : tone === "gray"
      ? "bg-gray-300 text-black"
      : "bg-gray-300 text-black";
  return (
    <span
      className={cx(
        "rounded-full border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]",
        toneClasses
      )}
    >
      {children}
    </span>
  );
};

const Ribbon = ({ text, tone = "red" }) => {
  const toneClasses =
    tone === "red"
      ? "bg-red-500 text-white"
      : tone === "blue"
      ? "bg-blue-500 text-white"
      : tone === "yellow"
      ? "bg-yellow text-black"
      : tone === "pink"
      ? "bg-pink-100 text-black"
      : tone === "gray"
      ? "bg-gray-300 text-black"
      : tone === "purple"
      ? "bg-purple text-white"
      : "";
  return (
    <div
      className={cx(
        "absolute left-[-8px] top-3 rotate-[-6deg] border-[3px] border-black px-3 py-1 text-xs lg:text-sm font-black uppercase shadow-[3px_3px_0_#000]",
        toneClasses
      )}
    >
      {text}
    </div>
  );
};

/* ------------------------------- Countdown ------------------------------- */
/* Switches between UPCOMING / LIVE (this week) / EXPIRED, NZ-aware.         */
/* Accepts either explicit start/end or a weekOf date.                        */
const WeekCountdown = ({ start, end, weekOf }) => {
  const [state, setState] = React.useState("upcoming");
  const [left, setLeft] = React.useState("");

  React.useEffect(() => {
    // Resolve window
    let startAt = parseMaybeNZ(start);
    let endAt = parseMaybeNZ(end);

    if (!startAt && !endAt && weekOf) {
      const win = nzWeekWindowFromWeekOf(weekOf);
      startAt = win.startAt;
      endAt = win.endAt;
    }

    const tick = () => {
      const now = new Date();

      if (startAt && now < startAt) {
        setState("upcoming");
        setLeft(fmtDuration(startAt - now));
        return;
      }
      if (endAt && now > endAt) {
        setState("expired");
        setLeft("");
        return;
      }
      setState("live");
      if (endAt) setLeft(fmtDuration(endAt - now));
      else setLeft("");
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start, end, weekOf]);

  if (state === "upcoming") return <Badge tone="yellow">Goes live in {left}</Badge>;
  if (state === "live")     return <Badge tone="red">LIVE THIS WEEK 🔥{left && ` • Ends in ${left}`}</Badge>;
  if (state === "expired")  return <Badge tone="gray">Expired</Badge>;
  return null;
};

/* ------------------------------ Card Frame ------------------------------ */
const MediaFrame = ({ children, dotw = false }) => (
  <div
    className={cx(
      "mb-4 rounded-lg border-[3px] border-black bg-gray-50 p-2 relative",
      dotw && "shadow-[8px_8px_0_#000]"
    )}
  >
    {dotw && (
      <div className="pointer-events-none absolute inset-0 -z-0 rounded-md mix-blend-screen">
        <div className="absolute inset-[-8%] rounded-xl opacity-60 blur-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,0,0.6),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.6),transparent_45%)] animate-pulse" />
      </div>
    )}
    <div
      className={cx(
        "relative w-full overflow-hidden rounded-md border-[3px] border-black bg-gray-200",
        dotw && "bg-[repeating-linear-gradient(45deg,#fff_0_12px,#fcd34d_12px_24px)]"
      )}
    >
      <div className="pt-[125%]" />
      <div className="absolute inset-0">{children}</div>
    </div>
  </div>
);

const ImageWithFallback = ({ src, alt, className }) => {
  const [source, setSource] = React.useState(
    /\.[a-zA-Z0-9]{3,4}$/.test(src || "") ? src : `${src}.png`
  );
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      onError={() => {
        if (source.endsWith(".png")) setSource(source.replace(/\.png$/, ".jpg"));
      }}
    />
  );
};

/* ------------------------------- Deal Card ------------------------------- */
const DealCard = ({ deal }) => {
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // Resolve live window from start/end or weekOf
  const { startAt, endAt } = React.useMemo(() => {
    let s = parseMaybeNZ(deal.start);
    let e = parseMaybeNZ(deal.end);
    if (!s && !e && deal.weekOf) {
      const win = nzWeekWindowFromWeekOf(deal.weekOf);
      s = win.startAt;
      e = win.endAt;
    }
    return { startAt: s, endAt: e };
  }, [deal.start, deal.end, deal.weekOf]);

  const isLiveNow = React.useMemo(() => {
    const now = new Date();
    if (startAt && now < startAt) return false;
    if (endAt && now > endAt) return false;
    return true;
  }, [startAt, endAt]);

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  const formName = deal.waitlist ? "waitlist-entry" : "deal-entry";

  return (
    <div
      className={cx(
        "flex h-full flex-col rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000] transition-transform duration-200",
        deal.dotw && "relative ring-4 ring-yellow hover:rotate-[-0.5deg] hover:scale-[1.01]"
      )}
    >
      {deal.dotw && (
        <div className="pointer-events-none absolute -top-3 -right-3 z-10 rotate-6">
          <div className="rounded-full border-[3px] border-black bg-yellow px-4 py-2 text-xs sm:text-sm font-black uppercase shadow-[4px_4px_0_#000]">
            Deal of the Week
          </div>
        </div>
      )}

      <MediaFrame dotw={!!deal.dotw}>
        {deal.ribbon && <Ribbon text={deal.ribbon.text} tone={deal.ribbon.tone} />}
        {deal.dotw && <Ribbon text="This Week Only" tone="pink" />}

        {deal.placeholder ? (
          <div className="flex h-full w-full items-center justify-center bg-white/60">
            <span className="select-none text-lg font-black uppercase tracking-wide text-black/60">
              Coming soon…
            </span>
          </div>
        ) : deal.image ? (
          <ImageWithFallback src={deal.image} alt={deal.title} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-gray-500">No media</div>
        )}
      </MediaFrame>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className={cx("font-black", deal.dotw ? "text-2xl sm:text-3xl -mb-1" : "text-xl")}>
          {deal.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {deal.badges?.map((b, i) => (
            <Badge key={i} tone={b.tone}>
              {b.text}
            </Badge>
          ))}
          {deal.dotw && (
            <WeekCountdown start={deal.start} end={deal.end} weekOf={deal.weekOf} />
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {deal.waitlist ? (
            <button
              onClick={() => {
                setOpen(true);
                setDone(false);
              }}
              className={cx(
                "rounded-xl border-[4px] border-black px-4 py-2 font-black uppercase shadow-[4px_4px_0_#000]",
                deal.dotw ? "bg-yellow text-black" : "bg-gray-300 text-black"
              )}
            >
              Join Waitlist
            </button>
          ) : deal.disabled ? (
            <button
              disabled
              className="cursor-not-allowed rounded-xl border-[4px] border-black bg-gray-300 px-4 py-2 font-black uppercase text-black/60 shadow-[4px_4px_0_#000]"
            >
              {deal.disabledLabel || "Unavailable"}
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isLiveNow) return;
                setOpen(true);
                setDone(false);
              }}
              disabled={!isLiveNow}
              className={cx(
                "rounded-xl border-[4px] border-black px-4 py-2 font-black uppercase text-white shadow-[4px_4px_0_#000]",
                deal.dotw ? "bg-red" : "bg-purple",
                !isLiveNow && "cursor-not-allowed opacity-60"
              )}
            >
              {isLiveNow ? (deal.dotw ? "Claim This Week" : "Enter Draw") : "Opens Soon"}
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            {!done ? (
              <>
                <h3 className="mb-4 text-xl font-black">
                  {deal.waitlist ? `Join the ${deal.title} Waitlist` : deal.title}
                </h3>
                <form
                  name={formName}
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    setTimeout(() => {
                      setSubmitting(false);
                      setDone(true);
                    }, 800);
                  }}
                >
                  <input type="hidden" name="form-name" value={formName} />
                  <input type="hidden" name="deal" value={deal.title} />
                  <input type="hidden" name="kind" value={deal.waitlist ? "waitlist" : "draw"} />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <label className="font-black">
                    Name
                    <input type="text" name="name" required className="mt-1 w-full border-[3px] border-black p-2" />
                  </label>

                  <label className="font-black">
                    Email
                    <input type="email" name="email" required className="mt-1 w-full border-[3px] border-black p-2" />
                  </label>

                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setOpen(false)} className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="rounded-xl border-[3px] border-black bg-yellow px-3 py-1 font-bold shadow-[3px_3px_0_#000]">
                      {submitting ? "Submitting…" : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid gap-4 text-center">
                <div className="text-2xl font-black">You’re in the draw! 🎉</div>
                <button onClick={() => setOpen(false)} className="mx-auto rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Page Component ------------------------------ */
function Deals() {
  const deals = [
    {
      id: 1,
      title: "Sugar Dentures",
      image: "/images/deals/Sugar Dentures",
      ribbon: { text: "Sold Out", tone: "red" },
      disabled: true,
      disabledLabel: "Sold Out",
    },
    {
      id: 2,
      title: "10kg of Sugar",
      image: "/images/deals/Bag of Sugar",
      ribbon: { text: "Replenishing soon", tone: "purple" },
      waitlist: true,
    },

    // --- Deal of the Week tiles (flagged) ---
    // Option A: explicit start/end (NZ-naive timestamps)
    {
      id: 3,
      title: "Deal of the Week",
      placeholder: true,
      dotw: true,
      start: "2025-10-20T09:00:00",
      end:   "2025-10-26T23:59:59",
      badges: [
        { text: "FREE!", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
    // Option B: use a single 'weekOf' date (NZ midnight that date through +6 days)
    {
      id: 4,
      title: "Deal of the Week",
      placeholder: true,
      dotw: true,
      weekOf: "2025-10-27", // Mon 27 Oct → Sun 2 Nov (NZ time)
      badges: [
        { text: "Now $0.00", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
  ];

  return (
    <section className="space-y-8 px-4 py-12 sm:px-8">
      <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
        Gary's Sweet Deals
      </h2>

      {/* DOTW spans 2 cols on large screens for emphasis */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {deals.map((d) => (
          <div key={d.id} className={cx(d.dotw && "lg:col-span-2")}>
            <DealCard deal={d} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Deals;

