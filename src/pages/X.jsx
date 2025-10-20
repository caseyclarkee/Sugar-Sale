import React from "react";
import Gary from "/images/about/PhotoGary.png";
import Can from "/images/about/CanCallOuts.png";
import UnXpected from "/images/gary.gif";

const X = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about/clouds.jpg')" }}
    >
      <section className="px-6 sm:px-12 py-0 text-lg">
        {/* 3-column layout: Gary | Text | Cans */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end md:items-stretch">
          {/* LEFT: Gary + GIF stay attached */}
          <div className="col-span-12 lg:col-span-4 order-last lg:order-1 flex justify-center lg:justify-end lg:min-h-[560px] lg:items-end">
            {/* Wrapper keeps the GIF anchored to Gary at all sizes */}
            <div className="relative inline-block">
              <img
                src={Gary}
                alt="Gary holding a can of X"
                loading="lazy"
                className="block w-auto max-h-[460px] sm:max-h-[520px] md:max-h-[560px] object-contain"
              />
              {/* GIF badge anchored inside the same wrapper */}
              <img
                src={UnXpected}
                alt="THAT’S UNXPECTED"
                loading="lazy"
                className="absolute -right-5 bottom-10 md:-right-10 md:bottom-14 w-[84px] md:w-[100px] h-auto object-contain rounded-full z-10 pointer-events-none"
              />
            </div>
          </div>

          {/* MIDDLE: Vertically centered header + text only */}
          <div className="col-span-12 lg:col-span-4 order-2 flex flex-col justify-center items-center text-center gap-4 md:gap-6 md:my-auto">
            <div className="flex flex-col items-center justify-center mb-1">
              <h1 className="font-black tracking-tight leading-tight text-white text-[clamp(56px,6.4vw,88px)]">
                Introducing
              </h1>
              <p className="font-black tracking-tight leading-none text-white text-[clamp(48px,4.6vw,56px)] -mt-1">
                X by Long White
              </p>
            </div>

            <p className="max-w-md leading-snug text-white">
              Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
              <br />
              <b>“X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can.”</b>
            </p>
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 lg:col-span-4 order-1 lg:order-3 flex justify-center md:justify-start">
            <img
              src={Can}
              alt="X by Long White cans"
              loading="lazy"
              className="block w-auto max-h-[520px] sm:max-h-[580px] md:max-h-[700px] object-contain lg:translate-y-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default X;
