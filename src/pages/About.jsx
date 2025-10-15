import React from "react";
import Gary from "/images/about/PhotoGary.png";
import Can from "/images/about/CanCallOuts.png";

const About = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about/clouds.jpg')" }}
    >
      <section className="px-0 sm:px-0 py-0 text-lg backdrop-blur-sm">
        <h3 className="mt-1 text-4xl sm:text-5xl font-black mb-8">About X</h3>

        {/* 3-column responsive layout */}
        <div className="grid grid-cols-12 gap-0 items-center">
          {/* LEFT: Text */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-1 flex justify-center">
            <p className="max-w-md">
              Forget everything you know about Long White. Introducing X by Long White. A refreshing Zero Sugar, Zero Carb, 94 Calories, Lemon Vodka flavoured RTD. Expect the unXpected.
            </p>
          </div>

          {/* RIGHT: Can image */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-3 flex justify-center">
            <img
              src={Can}
              alt="X by Long White cans"
              className="max-h-[400px] w-auto object-contain"
            />
          </div>

          {/* MIDDLE: Gary (bottom on mobile) */}
          <div className="col-span-12 md:col-span-4 order-last md:order-2 flex justify-center">
            <img
              src={Gary}
              alt="Gary holding a can of X"
              className="max-h-[450px] w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

