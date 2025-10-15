// src/pages/Deals.jsx — restore media + ribbons; waitlist success copy
import React from "react";

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
      : "bg-gray-300 text-black";
  return (
    <span
      className={
        "rounded-full border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000] " +
        toneClasses
      }
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
      : "bg-gray-300 text-black";
  return (
    <div className={`absolute left-[-8px] top-3 rotate-[-6deg] ${toneClasses} border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]`}>
      {text}
    </div>
  );
};

/* 4:5 media frame wrapper */
const MediaFrame = ({ children }) => (
  <div className="mb-4 rounded-lg border-[3px] border-black bg-gray-50 p-2">
    <div className="relative w-full overflow-hidden rounded-md border-[3px] border-black bg-gray-200">
      <div className="pt-[125%]" />
      <div className="absolute inset-0">{children}</div>
    </div>
  </div>
);

/* Image with simple extension fallback (.png -> .jpg) if none provided */
const ImageWithFallback = ({ src, alt, className }) => {
  const [source, setSource] = React.useState(() => {
    if (!src) return "";
    const hasExt = /\.[a-zA-Z0-9]{3,4}$/.test(src);
    return hasExt ? src : `${src}.png`;
  });
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      onError={() => {
        if (source.endsWith('.png')) setSource((s) => s.replace(/\.png$/, '.jpg'));
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
    if (open) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const canEnter = !deal.disabled || deal.waitlist;
  const formName = deal.waitlist ? "waitlist-entry" : "deal-entry";
  const submitCta = deal.waitlist ? "Join" : "Submit";

  return (
    <div className="flex h-full flex-col rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000]">
      <MediaFrame>
        {/* Ribbon banner (e.g., Sold Out / Replenishing soon) */}
        {deal.ribbon && <Ribbon text={deal.ribbon.text} tone={deal.ribbon.tone} />}

        {/* Media / Placeholder (kept at strict 4:5) */}
        {deal.placeholder ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-300">
            <span className="select-none text-lg font-black uppercase tracking-wide text-black/60">
              Coming soon…
            </span>
          </div>
        ) : deal.image ? (
          <ImageWithFallback
            src={deal.image}
            alt={deal.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-gray-500">No media</div>
        )}
      </MediaFrame>

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-black">{deal.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {deal.badges?.map((b, i) => (
            <Badge key={i} tone={b.tone}>{b.text}</Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {deal.waitlist ? (
            <button
              onClick={() => {
                setOpen(true);
                setDone(false);
              }}
              className="rounded-xl border-[4px] border-black bg-yellow px-4 py-2 font-black uppercase text-black shadow-[4px_4px_0_#000]"
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
                setOpen(true);
                setDone(false);
              }}
              className="rounded-xl border-[4px] border-black bg-purple px-4 py-2 font-black uppercase text-white shadow-[4px_4px_0_#000]"
            >
              Enter Draw
            </button>
          )}
        </div>
      </div>

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
                    <label>Don’t fill this out: <input name="bot-field" /></label>
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
                    <button type="button" onClick={() => setOpen(false)} className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold" disabled={submitting}>
                      Cancel
                    </button>
                    <button type="submit" className="rounded-xl border-[3px] border-black bg-yellow px-3 py-1 font-bold shadow-[3px_3px_0_#000]" disabled={submitting}>
                      {submitting ? "Submitting…" : submitCta}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid gap-4 text-center">
                {deal.waitlist ? (
                  <>
                    <div className="text-2xl font-black">You're on the waitlist! 🎉</div>
                    <p className="text-sm text-gray-700">We'll email you when it's back in stock.</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Page Component ------------------------------ */
function Deals() {
  // Hard-coded tiles
  const deals = [
    { id: 3, title: "Deal of the Day", placeholder: true, badges: [{ text: "FREE!", tone: "gray" }] },
    { id: 4, title: "Deal of the Day", placeholder: true, badges: [{ text: "Now $0.00", tone: "gray" }] },
    { id: 5, title: "Deal of the Day", placeholder: true, badges: [{ text: "WIN FOR FREEEEE!", tone: "gray" }] },
    { id: 6, title: "Deal of the Day", placeholder: true, badges: [{ text: "100% OFF", tone: "gray" }] },
    { id: 1, title: "Sugar Dentures", image: "/images/dentures", ribbon: { text: "Sold Out", tone: "red" }, disabled: true, disabledLabel: "Sold Out" },
    { id: 2, title: "10kg of Sugar", image: "/images/10kg", ribbon: { text: "Replenishing soon", tone: "blue" }, waitlist: true },
  ];

  return (
    <section className="space-y-8 px-4 py-12 sm:px-8">
      <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
       Gary's Sweet Deals
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((d) => (
          <DealCard key={d.id} deal={d} />
        ))}
      </div>
    </section>
  );
}

export default Deals;
