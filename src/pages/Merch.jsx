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

  return (
    <section className="space-y-8 px-4 py-12 sm:px-8">
      <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
        Gary's Merch Draw
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform"
          >
            <div className="relative mb-3 rounded-lg border-[3px] border-black bg-gray-50 p-1.5">
              <div className="relative w-full overflow-hidden rounded-md border-[3px] border-black bg-gray-200">
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
                  <div className="absolute right-2 top-2 z-10 rotate-[3deg] border-[2px] border-black bg-yellow px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0_#000]">
                    View Back
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-black">{item.title}</h3>

            <button
              onClick={() => {
                setActiveItem(item);
                setActiveImage(item.image);
              }}
              className="mt-4 w-full rounded-xl border-[3px] border-black bg-purple px-3 py-2 font-black uppercase text-white shadow-[3px_3px_0_#000]"
            >
              Enter Draw
            </button>
          </div>
        ))}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            <h3 className="text-xl font-black mb-4">{activeItem.title}</h3>

            <div className="relative mb-4 border-[3px] border-black">
              <div className="pt-[125%]" />
              <img
                src={activeImage}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {activeItem.image2 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveImage(activeItem.image)}
                  className="rounded-lg border-[2px] border-black bg-yellow px-3 py-1 font-black"
                >
                  Front
                </button>

                <button
                  onClick={() => setActiveImage(activeItem.image2)}
                  className="rounded-lg border-[2px] border-black bg-white px-3 py-1 font-black"
                >
                  Back
                </button>
              </div>
            )}

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
                className="border-[3px] border-black p-2"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border-[3px] border-black p-2"
              />

              <button
                type="submit"
                className="rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]"
              >
                Enter Draw
              </button>
            </form>

            <button
              onClick={() => setActiveItem(null)}
              className="mt-4 text-sm underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
