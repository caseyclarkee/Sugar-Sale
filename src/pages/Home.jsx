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
    <div className="relative w-full rounded-2xl border-[4px] border-grey bg-purple-300 shadow-[6px_6px_0_#000] p-6 sm:p-8 text-yellow text-center">
      <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
        <img
          src="/images/x_website_header.gif"
          alt="Sugar Liquidation Sale!"
          className="block mx-auto w-3/4 xl:w-1/2"
        />
      </h2>

      {/* VIDEO/GIF WRAPPER */}
      <div className="relative mx-auto mt-6 aspect-video w-full max-w-6xl overflow-visible rounded-xl border-[4px] border-grey shadow-[4px_4px_0_#000]">
  {/* TEMP GIF delete from here down */}
  <img
    src="/images/home/homepage.gif"
    alt="Temporary Hero GIF"
    className="w-full h-full object-cover"
  />
          {/* delete the bit here and at the end to get back
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

  {/* BURST — slightly above the media */}
  <img
    src="/images/saleonnow.png"
    alt="On Now"
    className="absolute -right-8 -top-8 sm:-right-10 sm:-top-10 pointer-events-none block w-[clamp(80px,12vw,140px)] h-auto drop-shadow-[4px_4px_0_#000]"
    aria-hidden
  />
</div>
    
{/* Social Icons */}
<div className="mt-10 flex justify-center gap-6">
  <a
    href="https://www.tiktok.com/@longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/tiktok.png"
      alt="TikTok"
      className="w-10 h-10 hover:scale-110 transition-transform duration-200"
    />
  </a>

  <a
    href="https://www.instagram.com/longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/instagram.png"
      alt="Instagram"
      className="w-10 h-10 hover:scale-110 transition-transform duration-200"
    />
  </a>

  <a
    href="https://www.facebook.com/longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/facebook.png"
      alt="Facebook"
      className="w-10 h-10 hover:scale-110 transition-transform duration-200"
    />
  </a>
</div>

    </div>
  </section>
);



export default Home;
