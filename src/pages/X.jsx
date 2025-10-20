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
        {/* Stretch all columns to the tallest column; bottom-align images; center the text vertically */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
          {/* LEFT: Gary + GIF stay attached, bottom-aligned */}
          <div className="col-span-12 xl:col-span-4 order-last lg:order-1 flex justify-center md:justify-end items-end lg:h-full">
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
          <div className="col-span-12 xl:col-span-4 order-2 flex flex-col justify-center items-center text-center gap-4 md:gap-6 h-full">
            <div className="flex flex-col items-center justify-center mb-1">
              <h1 className="font-black tracking-tight leading-tight text-white text-[36px] sm:text-[44px] md:text-[56px] lg:text-[56px] xl:text-[88px]">
                Introducing
              </h1>
              <p className="font-black tracking-tight leading-none text-white text-[28px] sm:text-[36px] md:text-[44px] lg:text-[44px] xl:text-[56px] -mt-1">
                X by Long White
              </p>
            </div>

            <p className="max-w-md leading-snug text-white">
              Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
              <br />
              <b>“X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can.”</b>
            </p>
          </div>

          {/* RIGHT: Can image, bottom-aligned */}
          <div className="col-span-12 xl:col-span-4 order-1 lg:order-3 flex justify-center md:justify-start items-end lg:h-full">
            <img
              src={Can}
              alt="X by Long White cans"
              loading="lazy"
              className="block w-auto max-h-[520px] sm:max-h-[580px] md:max-h-[700px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default X;

