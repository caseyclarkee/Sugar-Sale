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
        <iframe
          src="https://vimeo.com/1129405293/a946fa6fc4?share=copy&fl=sv&fe=ci"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Hero Video"
        ></iframe>


  {/* BURST — slightly above the media */}
  <img
    src="/images/saleonnow.png"
    alt="On Now"
    className="absolute -right-8 -top-8 sm:-right-10 sm:-top-10 pointer-events-none block w-[clamp(80px,12vw,140px)] h-auto drop-shadow-[4px_4px_0_#000]"
    aria-hidden
  />
</div>
    
{/* Social Icons */}
<style>
{`
@keyframes floaty {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-3px) rotate(-2deg) scale(1.05); }
  50% { transform: translateY(2px) rotate(2deg) scale(0.98); }
  75% { transform: translateY(-1px) rotate(-1deg) scale(1.03); }
}
@keyframes bounceWiggle {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  20% { transform: translateY(-4px) rotate(-5deg) scale(1.1); }
  40% { transform: translateY(-2px) rotate(5deg) scale(1.05); }
  60% { transform: translateY(-6px) rotate(-3deg) scale(1.15); }
  80% { transform: translateY(2px) rotate(3deg) scale(1.1); }
}
.icon-float {
  animation: floaty 3s ease-in-out infinite;
  transition: transform 0.3s ease-out;
}
.icon-float:hover {
  animation: bounceWiggle 0.8s ease-in-out;
}
.icon-delay-1 { animation-delay: 0s; }
.icon-delay-2 { animation-delay: 0.8s; }
.icon-delay-3 { animation-delay: 1.6s; }
`}
</style>

<div className="mt-12 flex justify-center gap-10">
  <a
    href="https://www.tiktok.com/@longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/tiktok.png"
      alt="TikTok"
      className="w-16 h-16 icon-float icon-delay-1"
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
      className="w-16 h-16 icon-float icon-delay-2"
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
      className="w-16 h-16 icon-float icon-delay-3"
    />
  </a>
</div>


    </div>
  </section>
);



export default Home;
