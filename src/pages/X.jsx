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
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center min-h-[80vh]">
          {/* LEFT: Gary with minimal GIF lozenge */}
          <div className="col-span-12 md:col-span-4 order-last md:order-1 relative flex justify-center md:justify-end">
            <img
              src={Gary}
              alt="Gary holding a can of X"
              className="block w-auto max-h-[460px] sm:max-h-[520px] md:max-h-[560px] object-contain md:absolute md:bottom-0 md:left-0"
            />

            {/* Small GIF lozenge, no border or shadow */}
            <div className="absolute right-[-10px] bottom-[20px] sm:right-[-20px] sm:bottom-[40px] md:right-[-40px] md:bottom-[60px]">
              <img
                src={UnXpected}
                alt="THAT’S UNXPECTED"
                className="block w-[60px] sm:w-[80px] md:w-[100px] h-auto object-contain rounded-full"
              />
            </div>
          </div>

          {/* MIDDLE: Centered header + text */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex flex-col justify-center items-center text-center gap-4 md:gap-6">
            <div className="flex flex-col items-center justify-center mb-1">
              <h1 className="font-black tracking-tight leading-tight text-[clamp(38px,6.4vw,88px)]">
                Introducing
              </h1>
              <p className="font-black tracking-tight leading-none text-[clamp(28px,4.6vw,56px)] -mt-1">
                X by Long White
              </p>
            </div>

            <p className="max-w-md leading-snug">
              Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
              <br />
              <b>“X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can.”</b>
            </p>
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-3 flex justify-center md:justify-start">
            <img
              src={Can}
              alt="X by Long White cans"
              className="block w-auto max-h-[520px] sm:max-h-[580px] md:max-h-[700px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default X;
