import React from "react";

// ASSETS (exact filenames you provided)
import Clouds from "/images/about/clouds.jpg";
import Gary from "/images/about/PhotoGary.png";
import CanPassion from "/images/about/X_Website_Product_Page-07.png"; // purple X can
import CanLemon from "/images/about/X_Website_Product_Page-08.png";   // yellow X can
import BurstVodkaLemon from "/images/about/X_Website_Product_Page-01.png"; // Vodka & Lemon (yellow)
import BurstVodkaLemonPassion from "/images/about/X_Website_Product_Page-02.png"; // Vodka Lemon & Passionfruit (purple)
import BurstZeroSugar from "/images/about/X_Website_Product_Page-03.png"; // ZERO SUGAR
import BurstZeroCarb from "/images/about/X_Website_Product_Page-04.png";  // ZERO CARB
import BurstCals from "/images/about/X_Website_Product_Page-05.png";      // 92 CALORIES
import BurstIceCold from "/images/about/X_Website_Product_Page-06.png";   // ICE COLD
import ThatsUnxpected from "/images/gary.gif"; // round sticker gif

const About = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Clouds})` }}
    >
      <section className="px-4 sm:px-8 lg:px-14 py-10 lg:py-16 text-lg">
        {/* HEADLINE */}
        <div className="text-center">
          <h3 className="font-black leading-tight tracking-tight text-[clamp(36px,6vw,72px)]">
            Introducing
          </h3>
          <p className="font-black leading-none tracking-tight text-[clamp(28px,4.2vw,48px)] -mt-1">
            X by Long White
          </p>
        </div>

        {/* BODY COPY - skinny measure */}
        <p className="mx-auto mt-6 max-w-[640px] text-center leading-relaxed text-[clamp(14px,1.4vw,18px)]">
          Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
        </p>

        {/* MAIN STAGE */}
        <div className="relative mt-8 grid grid-cols-12 gap-6 md:gap-8 items-end">
          {/* LEFT: Gary anchored bottom-left */}
          <div className="col-span-12 md:col-span-5 relative order-last md:order-1">
            <img
              src={Gary}
              alt="Gary holding a can of X"
              className="block mx-auto md:mx-0 md:absolute md:bottom-0 md:left-0 w-auto max-h-[clamp(360px,58vh,760px)] object-contain drop-shadow-[8px_8px_0_rgba(0,0,0,0.25)]"
            />
            {/* THAT'S UNXPECTED sticker */}
            <img
              src={ThatsUnxpected}
              alt="That's UnXpected"
              className="hidden md:block absolute -top-8 left-[6%] w-[120px] rotate-[-12deg] drop-shadow-[6px_6px_0_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* MIDDLE: Quote card with chunky shadow */}
          <div className="col-span-12 md:col-span-3 order-1 md:order-2 relative">
            <div className="mx-auto md:mx-0 max-w-[560px] md:max-w-none">
              <div className="relative rounded-2xl border-[4px] border-black bg-white/85 backdrop-blur shadow-[8px_8px_0_#000] px-6 py-6 md:px-8 md:py-8 -mb-2 md:mb-0 md:translate-y-8">
                <p className="text-center font-black leading-snug text-[clamp(16px,2.2vw,24px)]">
                  “X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can”
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Oversized cans + bursts composed absolutely */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-3 relative min-h-[440px]">
            {/* Top can (yellow) */}
            <img
              src={CanLemon}
              alt="Vodka & Lemon can"
              className="absolute right-[8%] -top-6 w-[min(46vw,430px)] md:w-[min(32vw,430px)] rotate-[-12deg] object-contain drop-shadow-[10px_10px_0_#000]"
            />
            {/* Bottom can (purple) */}
            <img
              src={CanPassion}
              alt="Vodka, Lemon & Passionfruit can"
              className="absolute right-0 bottom-0 w-[min(44vw,410px)] md:w-[min(30vw,410px)] rotate-[8deg] object-contain drop-shadow-[10px_10px_0_#000]"
            />

            {/* Bursts (positions tuned to your mock) */}
            <img
              src={BurstVodkaLemon}
              alt="Vodka & Lemon"
              className="absolute right-[38%] top-[-10px] w-[120px] rotate-[6deg] drop-shadow-[6px_6px_0_#000]"
            />
            <img
              src={BurstVodkaLemonPassion}
              alt="Vodka Lemon & Passionfruit"
              className="absolute right-[35%] top-[42%] w-[160px] rotate-[-8deg] drop-shadow-[6px_6px_0_#000]"
            />
            <img
              src={BurstZeroSugar}
              alt="Zero Sugar"
              className="absolute right-[2%] top-[26%] w-[120px] rotate-[8deg] drop-shadow-[6px_6px_0_#000]"
            />
            <img
              src={BurstZeroCarb}
              alt="Zero Carb"
              className="absolute right-[4%] top-[40%] w-[150px] rotate-[2deg] drop-shadow-[6px_6px_0_#000]"
            />
            <img
              src={BurstCals}
              alt="92 Calories"
              className="absolute right-[24%] bottom-[12%] w-[120px] rotate-[-10deg] drop-shadow-[6px_6px_0_#000]"
            />
            <img
              src={BurstIceCold}
              alt="Ice Cold"
              className="absolute right-[6%] bottom-[2%] w-[120px] rotate-[4deg] drop-shadow-[6px_6px_0_#000]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


