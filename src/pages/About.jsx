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
      <section className="px-0 sm:px-0 py-0 text-lg backdrop-blur-sm">
        <h3 className="mt-5 text-4xl sm:text-5xl font-black mb-5">About X</h3>

        {/* 3-column responsive layout */}
        <div className="grid grid-cols-12 gap-0 items-center">

{/* LEFT: Gary (bottom on mobile) */}
<div className="col-span-12 md:col-span-4 order-last md:order-1 flex justify-center md:justify-start items-end md:pb-0 pb-0">
  <img
    src={Gary}
    alt="Gary holding a can of X"
    className="block max-h-[450px] w-auto object-contain align-bottom"
  />
</div>


          {/* MIDDLE: Text + GIF */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex flex-col items-center text-center gap-4">
            <p className="max-w-md">
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
              className="block max-h-[180px] w-auto object-contain"
            />
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-3 flex justify-center">
            <img
              src={Can}
              alt="X by Long White cans"
              className="block h-auto w-auto object-contain"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
