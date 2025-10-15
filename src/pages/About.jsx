import React from "react";
import Gary from "/images/about/PhotoGary.png";
import Can from "/images/about/CanCallOuts.png";
import UnXpected from "/images/gary.gif";

const About = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about/clouds.jpg')" }}
    >
      <section className="px-6 sm:px-12 py-10 lg:py-16 text-lg">
        {/* Updated header + body copy */}
        <div className="text-center md:text-left mb-10">
          <h1 className="font-black tracking-tight leading-tight text-[clamp(38px,6.4vw,88px)]">
            Introducing
          </h1>
          <p className="font-black tracking-tight leading-none text-[clamp(28px,4.6vw,56px)] -mt-1">
            X by Long White
          </p>
        </div>

        {/* 3-column layout: Gary | Text | Cans */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          {/* LEFT: Gary (bottom aligned) */}
          <div className="col-span-12 md:col-span-4 order-last md:order-1 relative flex justify-center md:justify-end">
            <img
              src={Gary}
              alt="Gary holding a can of X"
              className="block w-auto max-h-[500px] md:max-h-[560px] object-contain md:absolute md:bottom-0 md:left-0"
            />
          </div>

          {/* MIDDLE: Text + GIF */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex flex-col items-center text-center md:items-center gap-5 md:gap-8">
            <p className="max-w-md leading-snug">
              Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
              <br />
              <b>“X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can.”</b>
            </p>

            <img
              src={UnXpected}
              alt="THAT’S UNXPECTED"
              className="block max-h-[160px] w-auto object-contain mt-2 md:mt-4"
            />
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-3 flex justify-center md:justify-start">
            <img
              src={Can}
              alt="X by Long White cans"
              className="block w-auto max-h-[620px] md:max-h-[700px] object-contain md:translate-y-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
