import React from "react";
import { createPortal } from "react-dom";

const FORM_NAME = "merch-draw";

const encode = (data) =>
  Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
    )
    .join("&");

export default function Merch() {
  const [items, setItems] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(null);
  const [activeImage, setActiveImage] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    fetch("/merch.json")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = activeItem ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const openItem = (item) => {
    setActiveItem(item);
    setActiveImage(item.image);
    setDone(false);
  };

  const closeItem = () => {
    setActiveItem(null);
    setActiveImage(null);
    setSubmitting(false);
    setDone(false);
  };

  const onSubmitNetlify = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      if (!data.get("form-name")) data.set("form-name", FORM_NAME);

      const payload = {};
      for (const [key, value] of data.entries()) payload[key] = value;

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      setDone(true);
    } catch (err) {
      console.error("Netlify merch form submit failed:", err);
      alert("Sorry — something went wrong submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="space-y-8 px-4 py-12 sm:px-8">
        <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
          Gary&apos;s Merch Draw
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#000]"
            >
              <button type="button" onClick={() => openItem(item)} className="w-full">
                <div className="relative mb-3 overflow-hidden border-[3px] border-black">
                  <div className="pt-[125%]" />

                  <img
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      item.image2 ? "group-hover:opacity-0" : ""
                    }`}
                  />

                  {item.image2 && (
                    <img
                      src={item.image2}
                      alt={`${item.title} back`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}

                  {item.image2 && (
                    <div className="absolute right-2 top-2 rotate-3 border-[2px] border-black bg-yellow px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0_#000]">
                      View Back
                    </div>
                  )}
                </div>
              </button>

              <h3 className="text-lg font-black">{item.title}</h3>

              <button
                type="button"
                onClick={() => openItem(item)}
                className="mt-4 w-full border-[3px] border-black bg-purple px-3 py-2 font-black uppercase text-white shadow-[3px_3px_0_#000]"
              >
                Enter Draw
              </button>
            </div>
          ))}
        </div>
      </section>

      {activeItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-2 sm:p-4"
            onClick={closeItem}
          >
            <div
              className="w-full max-w-4xl rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000] sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {!done ? (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                  <div>
                    <div className="flex max-h-[48vh] items-center justify-center border-[3px] border-black bg-white p-2 sm:max-h-[56vh] lg:max-h-[70vh]">
                      <img
                        src={activeImage}
                        alt={activeItem.title}
                        className="max-h-[44vh] w-auto max-w-full object-contain sm:max-h-[52vh] lg:max-h-[66vh]"
                      />
                    </div>

                    {activeItem.image2 && (
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveImage(activeItem.image)}
                          className={`rounded-lg border-[2px] border-black px-3 py-1 font-black shadow-[2px_2px_0_#000] ${
                            activeImage === activeItem.image ? "bg-yellow" : "bg-white"
                          }`}
                        >
                          Front
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveImage(activeItem.image2)}
                          className={`rounded-lg border-[2px] border-black px-3 py-1 font-black shadow-[2px_2px_0_#000] ${
                            activeImage === activeItem.image2 ? "bg-yellow" : "bg-white"
                          }`}
                        >
                          Back
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-black">{activeItem.title}</h3>

                    <form
                      name={FORM_NAME}
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      className="grid gap-3"
                      onSubmit={onSubmitNetlify}
                    >
                      <input type="hidden" name="form-name" value={FORM_NAME} />
                      <input type="hidden" name="deal" value={activeItem.title} />
                      <input type="hidden" name="deal_id" value={activeItem.id} />
                      <input type="hidden" name="kind" value="merch-draw" />
                      <input type="hidden" name="collection" value="merch" />

                      <p className="hidden">
                        <label>
                          Don&apos;t fill this out: <input name="bot-field" />
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
                          placeholder="e.g. 021 234 5678"
                          className="mt-1 w-full border-[3px] border-black p-2"
                        />
                      </label>

                      <label className="font-black">
                        Post code
                        <input
                          type="text"
                          name="postcode"
                          placeholder="e.g. 1011"
                          className="mt-1 w-full border-[3px] border-black p-2"
                        />
                      </label>

                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={closeItem}
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
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 text-center">
                  <div className="text-2xl font-black">You&apos;re in the draw! 🎉</div>
                  <p className="text-sm text-gray-700">
                    Gary has your entry. Emotionally, he is handling this well.
                  </p>
                  <button
                    type="button"
                    onClick={closeItem}
                    className="mx-auto rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
