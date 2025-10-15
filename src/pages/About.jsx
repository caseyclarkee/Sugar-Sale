import React from "react";

// === ASSETS (your filenames) ===
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

/*
Rebalanced layout notes
- Gary anchors left and is larger  (base ~68vh).
- Cans are clustered as a stack on the right with stronger counter-rotations.
- Bursts overlap cans with tuned z-index for depth.
- Quote card sits lower, overlapping baseline a touch.
- Headline/body use clamp + snug leading; cloud bg gets a soft overlay for contrast.
*/

const About = () => {
  return (
    <div className="relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Clouds})` }}
      />
      {/* Soft overlay to keep foreground readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.05),rgba(0,0,0,0.0)_40%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_30%,transparent_60%,rgba(0,0,0,0.05))]" />

      <section className="relative px-4 sm:px-8 lg:px-14 pt-10 lg:pt-14 pb-16 lg:pb-24">
        {/* HEADLINE */}
        <div className="text-center">
          <h1 className="font-black tracking-tight leading-tight text-[clamp(38px,6.4vw,88px)]">Introducing</h1>
          <p className="font-black tracking-tight leading-none text-[clamp(28px,4.6vw,56px)] -mt-1">X by Long White</p>
        </div>

        {/* BODY COPY - skinny measure */}
        <p className="mx-auto mt-5 max-w-[520px] text-center leading-snug text-[clamp(14px,1.3vw,18px)]">
          Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
        </p>

        {/* STAGE: we use a single relatively positioned grid, but the hero pieces are absolutely composed for poster-like control */}
        <div className="relative mt-6 min-h-[520px] md:min-h-[640px] lg:min-h-[720px]">
          {/* GARY */}
          <img
            src={Gary}
            alt="Gary holding a can of X"
            className="absolute bottom-0 left-[4%] w-auto max-h-[68vh] md:max-h-[72vh] object-contain z-[20] drop-shadow-[10px_10px_0_rgba(0,0,0,0.25)]"
          />
          {/* Gary sticker */}
          <img
            src={ThatsUnxpected}
            alt="That's UnXpected"
            className="hidden md:block absolute left-[11%] top-[6%] w-[120px] rotate-[-12deg] z-[30] drop-shadow-[6px_6px_0_#000]"
          />

          {/* CANS CLUSTER (right) */}
          {/* Yellow can (top/front) */}
          <img
            src={CanLemon}
            alt="Vodka & Lemon can"
            className="absolute right-[10%] top-[2%] w-[min(44vw,460px)] md:w-[min(34vw,480px)] rotate-[-18deg] z-[18] object-contain drop-shadow-[12px_12px_0_#000]"
          />
          {/* Purple can (back/lower) */}
          <img
            src={CanPassion}
            alt="Vodka, Lemon & Passionfruit can"
            className="absolute right-[4%] bottom-[4%] w-[min(42vw,440px)] md:w-[min(32vw,460px)] rotate-[10deg] translate-x-[12px] -translate-y-[6px] z-[16] object-contain drop-shadow-[12px_12px_0_#000]"
          />

          {/* BURSTS around cans (depth tuned) */}
          <img src={BurstVodkaLemon} alt="Vodka & Lemon" className="absolute right-[36%] top-[6%] w-[120px] rotate-[8deg] z-[22] drop-shadow-[6px_6px_0_#000]" />
          <img src={BurstVodkaLemonPassion} alt="Vodka Lemon & Passionfruit" className="absolute right-[32%] top-[40%] w-[170px] rotate-[-6deg] z-[22] drop-shadow-[6px_6px_0_#000]" />
          <img src={BurstZeroSugar} alt="Zero Sugar" className="absolute right-[6%] top-[28%] w-[120px] rotate-[10deg] z-[22] drop-shadow-[6px_6px_0_#000]" />
          <img src={BurstZeroCarb} alt="Zero Carb" className="absolute right-[4%] top-[46%] w-[160px] rotate-[2deg] z-[23] drop-shadow-[6px_6px_0_#000]" />
          <img src={BurstCals} alt="92 Calories" className="absolute right-[22%] bottom-[18%] w-[120px] rotate-[-12deg] z-[22] drop-shadow-[6px_6px_0_#000]" />
          <img src={BurstIceCold} alt="Ice Cold" className="absolute right-[6%] bottom-[4%] w-[120px] rotate-[6deg] z-[24] drop-shadow-[6px_6px_0_#000]" />

          {/* QUOTE CARD (lower, overlaps baseline slightly) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] md:bottom-[8%] z-[26]">
            <div className="rounded-2xl border-[4px] border-black bg-white/90 backdrop-blur shadow-[8px_8px_0_#000] px-6 py-6 md:px-8 md:py-8">
              <p className="text-center font-black leading-snug text-[clamp(16px,2.2vw,24px)]">
                “X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
