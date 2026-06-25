import React from "react";
import { createPortal } from "react-dom";

const formNameForItem = (item) => `merch-draw-${item.id}`;

const teeSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const hasSizeOptions = (item) => item?.id?.startsWith("tee-");

const imageViewFor = (item, view) =>
  [item.image, item.image2].find((image) => image?.includes(`-${view}.`));

const encode = (data) =>
  Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
    )
    .join("&");

export default function Merch() {
  const imagePaneRef = React.useRef(null);
  const panStateRef = React.useRef({
    isDragging: false,
    didDrag: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [items, setItems] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(null);
  const [activeImage, setActiveImage] = React.useState(null);
  const [imageZoom, setImageZoom] = React.useState(1);
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
    setImageZoom(1);
    setDone(false);
  };

  const closeItem = () => {
    setActiveItem(null);
    setActiveImage(null);
    setImageZoom(1);
    setSubmitting(false);
    setDone(false);
  };

  const showImage = (image) => {
    setActiveImage(image);
    setImageZoom(1);
    imagePaneRef.current?.scrollTo({ left: 0, top: 0 });
  };

  const resetZoom = () => {
    setImageZoom(1);
    imagePaneRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const focusImagePoint = (e, nextZoom = imageZoom) => {
    if (panStateRef.current.didDrag) return;

    const pane = imagePaneRef.current;
    if (!pane) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    setImageZoom(nextZoom);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        pane.scrollTo({
          left: pane.scrollWidth * xRatio - pane.clientWidth / 2,
          top: pane.scrollHeight * yRatio - pane.clientHeight / 2,
          behavior: "smooth",
        });
      });
    });
  };

  const zoomImage = (nextZoom) => {
    setImageZoom(nextZoom);
    window.requestAnimationFrame(() => {
      const pane = imagePaneRef.current;
      if (!pane) return;
      pane.scrollTo({
        left: (pane.scrollWidth - pane.clientWidth) / 2,
        top: pane.scrollTop,
        behavior: "smooth",
      });
    });
  };

  const startImagePan = (e) => {
    if (imageZoom === 1) return;

    const pane = imagePaneRef.current;
    if (!pane) return;

    panStateRef.current = {
      isDragging: true,
      didDrag: false,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: pane.scrollLeft,
      scrollTop: pane.scrollTop,
    };
    pane.setPointerCapture?.(e.pointerId);
  };

  const moveImagePan = (e) => {
    const pane = imagePaneRef.current;
    const pan = panStateRef.current;
    if (!pane || !pan.isDragging) return;

    const deltaX = e.clientX - pan.startX;
    const deltaY = e.clientY - pan.startY;
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      pan.didDrag = true;
    }

    pane.scrollLeft = pan.scrollLeft - deltaX;
    pane.scrollTop = pan.scrollTop - deltaY;
  };

  const stopImagePan = (e) => {
    const pane = imagePaneRef.current;
    const didDrag = panStateRef.current.didDrag;

    panStateRef.current.isDragging = false;
    pane?.releasePointerCapture?.(e.pointerId);

    if (didDrag) {
      window.setTimeout(() => {
        panStateRef.current.didDrag = false;
      }, 0);
    }
  };

  const onSubmitNetlify = async (e) => {
    e.preventDefault();
    if (!activeItem) return;
    setSubmitting(true);

    try {
      const formName = formNameForItem(activeItem);
      const form = e.currentTarget;
      const data = new FormData(form);
      if (!data.get("form-name")) data.set("form-name", formName);

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

  const activeFormName = activeItem ? formNameForItem(activeItem) : "merch-draw";
  const activeFrontImage = activeItem ? imageViewFor(activeItem, "front") : null;
  const activeBackImage = activeItem ? imageViewFor(activeItem, "back") : null;

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
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 p-2 sm:p-4"
            onClick={closeItem}
          >
            <div
              className="mx-auto my-4 w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000] sm:my-8 sm:max-h-[90vh] sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {!done ? (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                  <div>
                    <div
                      ref={imagePaneRef}
                      onPointerDown={startImagePan}
                      onPointerMove={moveImagePan}
                      onPointerUp={stopImagePan}
                      onPointerCancel={stopImagePan}
                      className={`max-h-[48vh] overflow-auto border-[3px] border-black bg-white p-2 sm:max-h-[56vh] lg:max-h-[70vh] ${
                        imageZoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
                      }`}
                      style={{ touchAction: imageZoom > 1 ? "none" : "auto" }}
                    >
                      <img
                        src={activeImage}
                        alt={activeItem.title}
                        draggable="false"
                        onClick={(e) => focusImagePoint(e, imageZoom === 1 ? 2 : imageZoom)}
                        className={`mx-auto h-auto max-h-[44vh] max-w-full object-contain transition-all sm:max-h-[52vh] lg:max-h-[66vh] ${
                          imageZoom === 1 ? "cursor-zoom-in" : ""
                        }`}
                        style={{
                          maxHeight: imageZoom === 1 ? undefined : "none",
                          maxWidth: imageZoom === 1 ? "100%" : "none",
                          width: imageZoom === 1 ? "auto" : `${imageZoom * 100}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {activeItem.image2 && activeFrontImage && (
                        <button
                          type="button"
                          onClick={() => showImage(activeFrontImage)}
                          className={`rounded-lg border-[2px] border-black px-3 py-1 font-black shadow-[2px_2px_0_#000] ${
                            activeImage === activeFrontImage ? "bg-yellow" : "bg-white"
                          }`}
                        >
                          Front
                        </button>
                      )}

                      {activeItem.image2 && activeBackImage && (
                        <button
                          type="button"
                          onClick={() => showImage(activeBackImage)}
                          className={`rounded-lg border-[2px] border-black px-3 py-1 font-black shadow-[2px_2px_0_#000] ${
                            activeImage === activeBackImage ? "bg-yellow" : "bg-white"
                          }`}
                        >
                          Back
                        </button>
                      )}

                      <div className="ml-auto flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Zoom out"
                          onClick={() => zoomImage(Math.max(1, imageZoom - 0.25))}
                          className="h-9 w-9 rounded-lg border-[2px] border-black bg-white font-black shadow-[2px_2px_0_#000]"
                        >
                          -
                        </button>

                        <button
                          type="button"
                          aria-label="Reset zoom"
                          onClick={resetZoom}
                          className="min-w-16 rounded-lg border-[2px] border-black bg-white px-2 py-1 font-black shadow-[2px_2px_0_#000]"
                        >
                          {Math.round(imageZoom * 100)}%
                        </button>

                        <button
                          type="button"
                          aria-label="Zoom in"
                          onClick={() => zoomImage(Math.min(3, imageZoom + 0.25))}
                          className="h-9 w-9 rounded-lg border-[2px] border-black bg-white font-black shadow-[2px_2px_0_#000]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-black">{activeItem.title}</h3>

                    <form
                      name={activeFormName}
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      className="grid gap-3"
                      onSubmit={onSubmitNetlify}
                    >
                      <input type="hidden" name="form-name" value={activeFormName} />
                      <input type="hidden" name="deal" value={activeItem.title} />
                      <input type="hidden" name="deal_id" value={activeItem.id} />
                      <input type="hidden" name="kind" value="merch-draw" />
                      <input type="hidden" name="collection" value="merch" />

                      {hasSizeOptions(activeItem) && (
                        <label className="font-black">
                          Size
                          <select
                            name="size"
                            required
                            defaultValue=""
                            className="mt-1 w-full border-[3px] border-black bg-white p-2"
                          >
                            <option value="" disabled>
                              Select size
                            </option>
                            {teeSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}

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
