import React from "react";

const cx = (...cs) => cs.filter(Boolean).join(" ");

const encode = (data) =>
  Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
    )
    .join("&");

const DRAW_FORM_NAME = "deal-entry";

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
        "rounded-full border-[2px] border-black px-3 py-1 text-[12px] sm:text-[13px] font-black uppercase shadow-[2px_2px_0_#000]",
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
        "absolute left-[-6px] top-2 rotate-[-6deg] border-[2px] border-black px-3 py-1 text-[12px] sm:text-[13px] md:text-[14px] font-black uppercase shadow-[2px_2px_0_#000]",
        toneClasses
      )}
    >
      {text}
    </div>
  );
};

const MediaFrame = ({ children }) => (
  <div className="relative mb-3 rounded-lg border-[3px] border-black bg-gray-50 p-1.5 transition-shadow">
    <div className="relative w-full overflow-hidden rounded-md border-[3px] border-black bg-gray-200">
      <div className="pt-[125%]" />
      <div className="absolute inset-0 min-h-0 min-w-0">{children}</div>
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

const MerchCard = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const onSubmitNetlify = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      if (!data.get("form-name")) data.set("form-name", DRAW_FORM_NAME);

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
      <MediaFrame>
        {item.ribbon && <Ribbon text={item.ribbon.text} tone={item.ribbon.tone} />}
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </MediaFrame>

      <div className="flex flex-1 flex-col gap-2 min-h-[140px]">
        <h3 className="text-lg font-black leading-tight max-h-[3.2rem] overflow-hidden">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
          {item.badges?.map((b, i) => (
            <Badge key={i} tone={b.tone}>
              {b.text}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2 pb-1">
          <button
            onClick={() => {
              setOpen(true);
              setDone(false);
            }}
            className="rounded-xl border-[3px] border-black bg-purple px-3 py-1 font-black uppercase text-white shadow-[3px_3px_0_#000]"
          >
            Enter Draw
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            {!done ? (
              <>
                <h3 className="mb-4 text-xl font-black">{item.title}</h3>

                <form
                  name={DRAW_FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="grid gap-3"
                  onSubmit={onSubmitNetlify}
                >
                  <input type="hidden" name="form-name" value={DRAW_FORM_NAME} />
                  <input type="hidden" name="deal" value={item.title} />
                  <input type="hidden" name="deal_id" value={item.id} />
                  <input type="hidden" name="kind" value="merch-draw" />
                  <input type="hidden" name="collection" value="merch" />

                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <label className="font-black">
                    Full Name
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

                  <label className="font-black">
                    Phone
                    <input
                      type="text"
                      name="phone"
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <label className="font-black">
                    Post code
                    <input
                      type="text"
                      name="postcode"
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
                      {submitting ? "Submitting…" : "Enter Draw"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid gap-4 text-center">
                <div className="text-2xl font-black">You’re in the draw! 🎉</div>
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

export default function Merch() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("/merch.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((json) => setItems(json || []))
      .catch(() => {});
  }, []);

  return (
    <section className="space-y-8 px-4 py-12 sm:px-8">
      <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
        Gary's Merch Draws
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <MerchCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
