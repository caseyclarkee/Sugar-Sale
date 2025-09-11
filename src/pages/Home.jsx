import React from 'react';

const Burst = ({ children, className = "" }) => (
  <div className={`grid place-items-center rounded-full bg-yellow-300 text-black border-[4px] border-black shadow-[4px_4px_0_#000] ${className}`}>
    <div className="px-4 py-2 text-center font-black uppercase tracking-wide">{children}</div>
  </div>
);

export default function Home() {
  return (
    <section className="py-10 px-8">
      <div className="relative w-full rounded-2xl border-[4px] border-black bg-purple-300 shadow-[6px_6px_0_#000] p-8 text-center text-yellow-300">
        <h2 className="text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">Sugar Liquidation! Sale!</h2>
        <div className="absolute right-6 top-6">
          <Burst className="h-28 w-28"><span className="text-xl font-black">ON NOW!</span></Burst>
        </div>
        <img src="https://placehold.co/800x400/png?text=Gary+Hero" alt="Hero" className="mx-auto mt-6 rounded-xl border-[4px] border-black shadow-[4px_4px_0_#000]" />
      </div>
    </section>
  );
}
