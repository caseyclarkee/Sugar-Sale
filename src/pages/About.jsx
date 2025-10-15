import React from "react";
import Gary from "/images/about/PhotoGary.png";
import Can from "/images/about/CanCallouts.png";

const About = () => {
  return (
    <section className="px-4 sm:px-8 py-12 text-lg">
      <h3 className="text-4xl sm:text-5xl font-black mb-8">About X</h3>

      {/* 3-column responsive layout */}
      <div className="grid grid-cols-12 gap-8 items-center">
        {/* LEFT: Text */}
        <div className="col-span-12 md:col-span-4 order-1 md:order-1">
          <p className="max-w-md">
            I’m Gary.<br />
            I used to handle the sugar orders for Long White. Good job, steady hours, sweet perks (literally).
            Then one morning, marketing strolls in all excited saying the delicious new RTD is “going to be zero sugar!”
            <br /><br />
            Zero. Sugar.
            <br /><br />
            Now I’ve got tonnes of the stuff sitting in storage, and not a single drink that needs it.
            So I decided to take matters into my own sticky hands.
            <br /><br />
            Welcome to the Sugar Liquidation Sale, the clearance event powered entirely by panic and desperation.
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
  );
};

export default About;

