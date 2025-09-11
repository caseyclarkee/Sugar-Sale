import React from 'react';

export default function Merch() {
  return (
    <section className="px-8 py-12">
      <h3 className="text-3xl font-black mb-6">Merch</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="rounded-xl border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
            <div className="aspect-square rounded-lg border-[3px] border-black bg-gray-100 grid place-items-center">
              <span className="text-gray-500">Item {i}</span>
            </div>
            <button className="mt-4 w-full rounded-lg border-[3px] border-black bg-yellow-300 px-3 py-2 font-black uppercase shadow-[3px_3px_0_#000]">Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
