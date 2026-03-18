import React from "react";

export default function Merch() {
  const [items, setItems] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(null);
  const [activeImage, setActiveImage] = React.useState(null);

  React.useEffect(() => {
    fetch("/merch.json")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  const openItem = (item) => {
    setActiveItem(item);
    setActiveImage(item.image);
  };

  const closeItem = () => {
    setActiveItem(null);
    setActiveImage(null);
  };

  return (
    <section className="space-y-8 px-4 py-12 sm:px-8">
      <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
        Gary&apos;s Merch Draw
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#000]"
          >
            <button type="button" onClick={() => openItem(item)} className="w-full">
              <div className="relative mb-3 overflow-hidden border-[3px] border-black">
                <div className="pt-[125%]" />

                <div className="absolute inset-0">
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
              className="mt-4 w-full rounded-xl border-[3px] border-black bg-purple px-3 py-2 font-black uppercase text-white shadow-[3px_3px_0_#000]"
            >
              Enter Draw
            </button>
          </div>
        ))}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-[92vw] sm:max-w-xl md:max-w-xl lg:max-w-4xl rounded-xl border-[4px] border-black bg-white p-4 md:p-5 lg:p-6 shadow-[6px_6px_0_#000]">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="border-[3px] border-black bg-white p-2">
                  <img
                    src={activeImage}
                    alt={activeItem.title}
                    className="w-full h-auto object-contain"
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
                <h3 className="mb-4 text-lg sm:text-xl font-black">
                  {activeItem.title}
                </h3>

                <form
                  name="merch-draw"
                  method="POST"
                  data-netlify="true"
                  className="grid gap-3"
                >
                  <input type="hidden" name="form-name" value="merch-draw" />
                  <input type="hidden" name="item" value={activeItem.title} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className="border-[3px] border-black p-3"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="border-[3px] border-black p-3"
                  />

                  <button
                    type="submit"
                    className="rounded-xl border-[3px] border-black bg-yellow px-4 py-3 font-black shadow-[3px_3px_0_#000]"
                  >
                    Enter Draw
                  </button>
                </form>

                <button
                  type="button"
                  onClick={closeItem}
                  className="mt-4 text-sm underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
