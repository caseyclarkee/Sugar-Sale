import React from 'react';

export default function Events() {
  return (
    <section className="px-8 py-12">
      <h3 className="text-3xl font-black mb-4">Events</h3>
      <ul className="space-y-3">
        {["Pop‑up tasting — Sat 2pm","Demo day — Sun 12pm","Warehouse tour — Next Fri"].map((t,i) => (
          <li key={i} className="rounded-lg border-[4px] border-black bg-white px-4 py-3 shadow-[3px_3px_0_#000]">{t}</li>
        ))}
      </ul>
    </section>
  );
}
