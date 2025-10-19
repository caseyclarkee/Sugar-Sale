// src/pages/Deals.jsx — Deal of the Week (NZ-aware, split grid L/R, Netlify forms)
import React from "react";

/* ----------------------------- Helpers ----------------------------- */
const cx = (...cs) => cs.filter(Boolean).join(" ");

const parseNaiveParts = (str) => {
  const m = String(str || "").match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):?(\d{2}):?(\d{2})?)?$/
  );
  if (!m) return null;
  const [, y, M, d, h = "00", mnt = "00", s = "00"] = m;
  return { year: +y, month: +M, day: +d, hour: +h, minute: +mnt, second: +s };
};

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

const fmtDuration = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (d >= 1) return `${d}d ${h}h`;
  if (h >= 1) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
};

/* -------------------------- Netlify form utils -------------------------- */
const encode = (data) =>
  Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
    )
    .join("&");

// Shared form names parsed at build:
const DRAW_FORM_NAME = "deal-entry";
const WAITLIST_FORM_NAME = "waitlist-entry";

/* ----------------------------- UI ----------------------------- */
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
      : "bg-gray-300 text-black";
  return (
    <span
      className={cx(
        "rounded-full border-[2px] border-black px-2.5 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0_#000]",
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
      : tone === "purple"
      ? "bg-purple text-white"
      : "";
  return (
    <div
      className={cx(
        "absolute left-[-6px] top-2 rotate-[-6deg] border-[2px] border-black px-2.5 py-0.5 text-[10px] lg:text-xs font-black uppercase shadow-[2px_2px_0_#000]",
        toneClasses
      )}
    >
      {text}
    </div>
  );
};

/* ------------------------------- Countdown ------------------------------- */
const WeekCountdown = ({ start, end }) => {
  const [state, setState] = React.useState("upcoming");
  const [left, setLeft] = React.useState("");

  React.useEffect(() => {
    const startAt = parseMaybeNZ(start);
    const endAt = parseMaybeNZ(end);

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
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start, end]);

  if (state === "upcoming") return <Badge tone="yellow">Goes live in {left}</Badge>;
  if (state === "live") return <Badge tone="red">LIVE THIS WEEK 🔥 Ends in {left}</Badge>;
  if (state === "expired") return <Badge tone="gray">Expired</Badge>;
  return null;
};

/* ------------------------------ Frames ------------------------------ */
// Glow on outer frame so it's visible
const MediaFrame = ({ children, dotw = false }) => (
  <div
    className={
      "relative mb-3 rounded-lg border-[3px] border-black bg-gray-50 p-1.5 transition-shadow " +
      (dotw
        ? "ring-4 ring-yellow/70 shadow-[0_0_25px_5px_rgba(250,204,21,0.6)]"
        : "")
    }
  >
    <div className="relative w-full overflow-hidden rounded-md border-[3px] border-black bg-gray-200">
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

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  // Waitlist uses shared form; DOTW draw uses unique form; other draws use shared draw form
  const formName = deal.waitlist
    ? WAITLIST_FORM_NAME
    : (String(deal.id).startsWith("dotw-")
        ? `deal-entry-${deal.id}` // e.g. deal-entry-dotw-1
        : DRAW_FORM_NAME);

  // Submit via AJAX to keep modal UX
  const onSubmitNetlify = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      if (!data.get("form-name")) data.set("form-name", formName);

      const payload = {};
      for (const [k, v] of data.entries()) payload[k] = v;

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      setDone(true);
    } catch (err) {
      console.error("Netlify form submit failed:", err);
      alert("Sorry — something went wrong submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col rounded-xl border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#000]">
      {/* Rotated top-right countdown badge (no extra background wrapper) */}
      {deal.dotw && (
        <div className="absolute -top-3 -right-3 rotate-6 z-10">
          <div className="rotate-[-6deg]">
            <WeekCountdown start={deal.start} end={deal.end} />
          </div>
        </div>
      )}

      <MediaFrame dotw={!!deal.dotw}>
        {deal.ribbon && <Ribbon text={deal.ribbon.text} tone={deal.ribbon.tone} />}
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
        <h3 className="text-lg font-black">{deal.title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          {deal.badges?.map((b, i) => (
            <Badge key={i} tone={b.tone}>
              {b.text}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {deal.waitlist ? (
            // grey but clickable
            <button
              onClick={() => {
                setOpen(true);
                setDone(false);
              }}
              className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-black uppercase text-black/60 shadow-[3px_3px_0_#000]"
            >
              Join Waitlist
            </button>
          ) : deal.disabled ? (
            <button
              disabled
              className="cursor-not-allowed rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-black uppercase text-black/60 shadow-[3px_3px_0_#000]"
            >
              {deal.disabledLabel || "Sold Out"}
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(true);
                setDone(false);
              }}
              className="rounded-xl border-[3px] border-black bg-purple px-3 py-1 font-black uppercase text-white shadow-[3px_3px_0_#000]"
            >
              Enter Draw
            </button>
          )}
        </div>
      </div>

      {/* Modal with Netlify AJAX submit */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            {!done ? (
              <>
                <h3 className="mb-4 text-xl font-black">{deal.title}</h3>
                <form
                  name={formName}
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="grid gap-3"
                  onSubmit={onSubmitNetlify}
                >
                  <input type="hidden" name="form-name" value={formName} />
                  <input type="hidden" name="deal" value={deal.title} />
                  <input
                    type="hidden"
                    name="kind"
                    value={deal.waitlist ? "waitlist" : "draw"}
                  />
                  <input type="hidden" name="deal_id" value={deal.id} />

                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <label className="font-black">
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <label className="font-black">
                    Email
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl border-[3px] border-black bg-yellow px-3 py-1 font-bold shadow-[3px_3px_0_#000]"
                      disabled={submitting}
                    >
                      {submitting
                        ? "Submitting…"
                        : deal.waitlist
                        ? "Join Waitlist"
                        : "Enter Draw"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Success message (waitlist vs draw)
              <div className="grid gap-4 text-center">
                {deal.waitlist ? (
                  <>
                    <div className="text-2xl font-black">You're on the waitlist! 🎉</div>
                    <p className="text-sm text-gray-700">
                      We'll email you when it's back in stock.
                    </p>
                  </>
                ) : (
                  <div className="text-2xl font-black">You’re in the draw! 🎉</div>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="mx-auto rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]"
                >
                  Close
                </button>
              </div>
            )}

            {/* ✅ Promo Terms inside the popup (DOTW only), below form/success */}
            {deal.dotw && (
              <p className="mt-6 text-[11px] text-gray-600 text-center">
                <a
                  href="https://www.asahibeverages.com/nz-promotional-terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Promotional Terms &amp; Conditions
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Page ------------------------------ */
function Deals() {
  // First DOTW goes live 9am 27th NZ, then weekly
  const baseStartNZ = "2025-10-27T09:00:00";

  // DOTW placeholders (coming soon)
  const dotwTemplates = [
    {
      id: "dotw-1",
      title: "Deal of the Week",
      placeholder: true,
      badges: [
        { text: "FREE!", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
    {
      id: "dotw-2",
      title: "Deal of the Week",
      placeholder: true,
      badges: [
        { text: "Now $0.00", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
    {
      id: "dotw-3",
      title: "Deal of the Week",
      placeholder: true,
      badges: [
        { text: "100% OFF", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
    {
      id: "dotw-4",
      title: "Deal of the Week",
      placeholder: true,
      badges: [
        { text: "Win for Free!", tone: "blue" },
        { text: "Giveaway", tone: "yellow" },
      ],
    },
  ];

  // Four static items (left)
  const staticDeals = [
    {
      id: "dentures",
      title: "Sugar Dentures",
      image: "/images/deals/Sugar Dentures",
      ribbon: { text: "Sold Out", tone: "red" },
      disabled: true,
    },
    {
      id: "bag10kg",
      title: "10kg of Sugar",
      image: "/images/deals/Bag of Sugar",
      ribbon: { text: "Replenishing soon", tone: "purple" },
      waitlist: true,
    },
    {
      id: "officechair",
      title: "Office Chair (Lightly Used)",
      image: "/images/deals/Chair",
      ribbon: { text: "Sold Out", tone: "red" },
      disabled: true,
    },
    {
      id: "sugarcup",
      title: "Cup of Sugar",
      image: "/images/deals/Cup",
      ribbon: { text: "Sold Out", tone: "red" },
      disabled: true,
    },
  ];

  // Compute weekly DOTW windows
  const weeklyDeals = dotwTemplates.map((t, i) => {
    const start = addWeeksNZ(baseStartNZ, i);
    const end = weekEndFromStartNZ(start);
    return { ...t, dotw: true, start, end };
  });

  {/* Responsive grid:
    - Mobile: per row => [Static i | DOTW i], then [Static i+1 | DOTW i+1]
    - Large:  per row => [Static i | Static i+1 | DOTW i | DOTW i+1]
*/}
<div className="space-y-6">
  {Array.from({ length: Math.max(staticDeals.length, weeklyDeals.length) })
    .map((_, i) => i)                   // indices 0..max-1
    .filter((i) => i % 2 === 0)         // step by 2: 0,2,4,...
    .map((i) => {
      const s1 = staticDeals[i];
      const s2 = staticDeals[i + 1];
      const d1 = weeklyDeals[i];
      const d2 = weeklyDeals[i + 1];

      return (
        <div key={`row-${i}`} className="w-full">
          {/* Mobile layout (2 columns, two rows) */}
          <div className="grid grid-cols-2 gap-6 lg:hidden">
            {s1 && <DealCard deal={s1} />}
            {d1 && <DealCard deal={d1} />}
            {s2 && <DealCard deal={s2} />}
            {d2 && <DealCard deal={d2} />}
          </div>

          {/* Large layout (one row, 4 columns: 2 static left, 2 DOTW right) */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {s1 && <DealCard deal={s1} />}
            {s2 && <DealCard deal={s2} />}
            {d1 && <DealCard deal={d1} />}
            {d2 && <DealCard deal={d2} />}
          </div>
        </div>
      );
    })}
</div>

    </section>
  );
}

export default Deals;
