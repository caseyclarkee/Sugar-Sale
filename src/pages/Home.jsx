import React from "react";

const Burst = ({ children, className = "" }) => (
  <div
    className={
      "grid place-items-center rounded-full bg-yellow text-black border-[4px] border-black shadow-[4px_4px_0_#000] " +
      className
    }
  >
    <div className="px-4 py-2 text-center font-black uppercase tracking-wide">{children}</div>
  </div>
);

/* Pages */
const Home = () => (
  <section className="py-10 px-4 sm:px-8">
    <div className="relative w-full rounded-2xl border-[4px] border-grey bg-purple-300 shadow-[6px_6px_0_#000] p-6 sm:p-8 text-center text-yellow">
      <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
        Sugar Liquidation! Sale!
      </h2>
      <div className="absolute right-3 top-3 sm:right-6 sm:top-6">
        <Burst className="h-24 w-24 sm:h-28 sm:w-28">
          <span className="text-lg sm:text-xl font-black">ON NOW!</span>
        </Burst>
      </div>
      <div className="mx-auto mt-6 aspect-video w-full max-w-4xl overflow-hidden rounded-xl border-[4px] border-grey shadow-[4px_4px_0_#000]">
        <iframe
          src="https://player.vimeo.com/video/843809307?h=6a8b6a8a9a&title=0&byline=0&portrait=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Hero Video"
        ></iframe>
      </div>
    </div>
  </section>
);

export default Home() {
