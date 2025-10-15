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
        <h3 className="text-4xl sm:text-5xl font-black mb-10 text-center md:text-left">
          About X
        </h3>

        {/* 2-column layout: Gary + Text | Cans */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          {/* LEFT: Gary + Text + GIF */}
          <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <img
              src={Gary}
              alt="Gary holding a can of X"
              className="block w-auto max-h-[520px] md:self-start"
            />

            <div className="max-w-md">
              <p className="leading-relaxed">
                <b>X skipped the sugar, but Gary’s got a plan. Grab a sweet deal, crack open a can.</b>
                <br />
                Forget everything you know about Long White. Introducing X by Long White.
                A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD.
                <br />
                Expect the unXpected.
              </p>
              <img
                src={UnXpected}
                alt="THAT’S UNXPECTED"
                className="block max-h-[160px] w-auto object-contain mt-4"
              />
            </div>
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 md:col-span-6 order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={Can}
              alt="X by Long White cans"
              className="block w-auto max-h-[500px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
