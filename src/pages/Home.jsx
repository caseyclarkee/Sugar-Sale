import React from "react";

/* Keeping Burst around in case it's used elsewhere */
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

/* Page */
const Home = () => (
  <section className="py-10 px-4 sm:px-8">
    <div className="relative w-full rounded-2xl border-[4px] border-grey bg-purple-300 shadow-[6px_6px_0_#000] p-6 sm:p-8 items-center text-center text-yellow">
      <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
        <img src="/images/x_website_header.gif"
          alt="Sugar Liquidation Sale!"
          className="w-3/4 lg:w-1/2 center"></img>
      </h2>

      {/* Replaced Burst badge with a responsive PNG that stays attached to the card */}
      <div className="absolute right-3 top-3 sm:right-6 sm:top-6 pointer-events-none">
        <img
          src="/images/saleonnow.png"
          alt="On Now"
          className="block w-[clamp(76px,12vw,132px)] h-auto drop-shadow-[4px_4px_0_#000]"
        />
      </div>

      <div className="mx-auto mt-6 aspect-video w-full max-w-6xl overflow-hidden rounded-xl border-[4px] border-grey shadow-[4px_4px_0_#000]">
  {/* TEMP: show GIF instead of Vimeo */}
  <img
    src="/images/home/homepage.gif"
    alt="Temporary Hero GIF"
    className="w-full h-full object-cover"
  />

       {/* delete the bit here and at the end to get back
      <div className="mx-auto mt-6 aspect-video w-full max-w-6xl overflow-hidden rounded-xl border-[4px] border-grey shadow-[4px_4px_0_#000]">
        <iframe
          src="vimeolinkgoeshere"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Hero Video"
        ></iframe>
        */}
      </div>
    </div>
  </section>
);

export default Home;
