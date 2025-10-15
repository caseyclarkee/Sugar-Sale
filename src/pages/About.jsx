import React from "react";

const About = () => (
  <div
    className="bg-cover bg-center"
    style={{ backgroundImage: "url('/images/about/clouds.jpg')" }}
  >
    <section className="px-4 sm:px-8 py-12 text-lg backdrop-blur-sm">
      {/* 2-column layout for text + image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left column: text */}
        <div>
          <h3 className="text-4xl sm:text-5xl font-black mb-4">Meet Gary</h3>
          <p className="max-w-2xl">
            I’m Gary. You might know me as the ninth runner-up in Central Auckland’s
            Salesman of the Year Awards, 2004. I’m also the guy who sells sugar. Steady
            hours, sweet perks, it’s a pretty good gig. Well, it was until the Long White
            marketing team strolled in all excited, saying the delicious new RTD was
            “going to be zero sugar.” Zero. Sugar. Good for them. Meanwhile, I’m here
            knee-deep in unused sugar, trying to keep the ants off the forklift while I
            figure out what to do with it. I tried mixing it into my coffee, then my
            cereal, then my compost. Nothing made a dent. So I decided to take matters
            into my own sticky hands with the Sugar Liquidation Sale. The clearance event
            powered entirely by panic and desperation. Everything must go. Bagged sugar,
            boxed sugar, sculpted sugar, mystery sugar. Sugar in all shapes and forms. If
            something can be made out of sugar, I’ll sell it. Buy a bag, will you? You’ll
            help a grown man sleep better tonight.
          </p>

          <p className="max-w-2xl mt-4">
            <b>P.S.</b> Yes, the RTD tastes good. Yes, you should buy it at your local
            liquor store. But please take my sugar first.
          </p>

          <p className="max-w-2xl mt-2">
            <b>P.P.S.</b> I was the ninth runner up in central Auckland&apos;s salesman of
            the year awards in 2004.
          </p>
        </div>

        {/* Right column: image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/placeholder.png"
            alt="Gary"
            className="max-w-full md:max-w-md rounded-2xl border-[4px] border-grey shadow-[6px_6px_0_#000]"
          />
        </div>
      </div>

      {/* FAQ below both columns */}
      <div className="mt-12">
        <h2 className="font-black uppercase text-xl mb-3">
          FAQ (Frequently Asked Quibbles)
        </h2>

        <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">
            Is any of this sugar used in the drink?
          </summary>
          <div className="mt-2 text-sm">
            Absolutely not. X by Long White is zero sugar. Hence… this website.
          </div>
        </details>

        <details className="rounded-xl border-[4px] border-grey bg-purple p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">
            Is the sugar good quality?
          </summary>
          <div className="mt-2 text-sm">
            Yes. It’s the good stuff. Please do not build furniture out of it. (I (Gary)
            will.)
          </div>
        </details>

        <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000]">
          <summary className="cursor-pointer font-black">Can I haggle?</summary>
          <div className="mt-2 text-sm">If you bring a wheelbarrow, we’ll talk.</div>
        </details>
      </div>
    </section>
  </div>
);

export default About;


