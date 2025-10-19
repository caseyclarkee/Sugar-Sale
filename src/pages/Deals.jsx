// src/pages/Deals.jsx — DOTW auto-schedule weekly from 9am Mon 27 Oct (NZ time)
import React from "react";

/* ----------------------------- Tiny helpers ------------------------------ */
const cx = (...cs) => cs.filter(Boolean).join(" ");

/* Robust parsing/formatting for Pacific/Auckland (handles DST) */

// Parse "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss" into numeric parts
const parseNaiveParts = (str) => {
  if (!str) return null;
  const m = String(str).match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):?(\d{2}):?(\d{2})?)?$/
  );
  if (!m) return null;
  const [, y, M, d, h = "00", mnt = "00", s = "00"] = m;
  return { year: +y, month: +M, day: +d, hour: +h, minute: +mnt, second: +s };
};

// Convert a "wall clock" time in a given IANA zone into the correct UTC Date
const zonedTimeToUtc = (parts, timeZone) => {
  const { year, month, day, hour, minute, second } = parts;
  // As-if UTC for the desired wall time:
  const desiredUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  const desiredUtc = new Date(desiredUtcMs);
  // How does that instant read in the target tz?
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
  const zoneMsForDesiredUtc = Date.UTC(
    +zoneParts.year,
    +zoneParts.month - 1,
    +zoneParts.day,
    +zoneParts.hour,
    +zoneParts.minute,
    +zoneParts.second
  );
  const offset = zoneMsForDesiredUtc - desiredUtcMs;
  return new Date(desiredUtcMs - offset);
};

// Interpret strings with offset/Z as-is; otherwise treat as Pacific/Auckland
const parseMaybeNZ = (value) => {
  if (!value) return null;
  const hasOffset = /[zZ]|[+\-]\d{2}:\d{2}$/.test(value);
  if (hasOffset) return new Date(value);
  const parts = parseNaiveParts(value);
  if (!parts) return null;
  return zonedTimeToUtc(parts, "Pacific/Auckland");
};

// Format a UTC Date into a NZ "naive" wall-clock string "YYYY-MM-DDTHH:mm:ss"
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

// Auto: add N weeks to a NZ naive start and return NZ naive string
const addWeeksNZ = (baseNZNaiveStr, weeks) => {
  const baseUtc = parseMaybeNZ(baseNZNaiveStr);
  const shiftedUtc = new Date(baseUtc.getTime() + weeks * 7 * 86400000);
  return nzFormatNaive(shiftedUtc);
};

// Given a start (NZ naive), compute end = Sunday 23:59:59 of that week (NZ naive)
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
const WeekCountdown = ({ start, end }) => {
  const [state, setState] = React.useState("upcoming"); // upcoming | live | expired
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
      else setLeft("");
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start, end]);

  if (state === "upcoming") return <Badge tone="yellow">Goes live in {left}</Badge>;
  if (state === "live") return <Badge tone="red">LIVE THIS WEEK 🔥{left && ` • Ends in ${left}`}</Badge>;
  if (state === "expired") return <Badge tone="gray">Expired</Badge>;
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

  const isLiveNow = React.useMemo(() => {
    const startAt = parseMaybeNZ(deal.start);
    const endAt = parseMaybeNZ(deal.end);
    const now = new Date();
    if (startAt && now < startAt) return false;
    if (endAt && now > endAt) return false;
    return true;
  }, [deal.start, deal.end]);

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
          {deal.dotw && <WeekCountdown start={deal.start} end={deal.end} />}
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
                    <input type="email" name="email" required className="mt-1
