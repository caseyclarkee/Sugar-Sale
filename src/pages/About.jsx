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
          <h3 className="text-6xl sm:text-8xl font-black text-white mb-4">Meet Gary</h3>
          <p className="max-w-4xl text-white text-sm">
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

          <p className="max-w-2xl mt-4 text-white">
            <b>P.S.</b> Yes, the RTD tastes good. 
          </p>

          <p className="max-w-2xl mt-2 text-white">
            <b>P.P.S.</b> Yes, you should buy it at your local
            liquor store. But please take my sugar first.
          </p>
        </div>

        {/* Right column: image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/placeholder.png"
            alt="Gary"
            className="max-w-full md:max-w-md rounded-2xl border-[4px] border-grey shadow-[6px_6px_0_#fff]"
          />
        </div>
      </div>

      {/* FAQ below both columns */}
      <div className="mt-12">
        <h2 className="font-black text-white uppercase text-xl mb-3">
          FAQ (Frequently Asked Quibbles)
        </h2>

        <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">
            Is any of this sugar used in the drink?
          </summary>
          <div className="mt-2 text-m">
            Absolutely not. X by Long White is zero sugar. Hence… this website.
          </div>
        </details>

        <details className="rounded-xl border-[4px] border-grey text-white bg-purple p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">
            Is the sugar good quality?
          </summary>
          <div className="mt-2 text-m">
            Yes. It’s the good stuff. Please do not build furniture out of it. (I, Gary,
            will build it for you.)
          </div>
        </details>

        <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">Can I haggle?</summary>
          <div className="mt-2 text-m">If you bring a wheelbarrow, we’ll talk.</div>
        </details>

         <details className="rounded-xl border-[4px] border-grey text-white bg-purple p-4 shadow-[4px_4px_0_#000] mb-3">
          <summary className="cursor-pointer font-black">
           Got a page with more stuff?
          </summary>
          <div className="mt-2 text-m">I've got three!
<style>
{`
@keyframes floaty {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-3px) rotate(-2deg) scale(1.05); }
  50% { transform: translateY(2px) rotate(2deg) scale(0.98); }
  75% { transform: translateY(-1px) rotate(-1deg) scale(1.03); }
}
@keyframes bounceWiggle {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  20% { transform: translateY(-4px) rotate(-5deg) scale(1.1); }
  40% { transform: translateY(-2px) rotate(5deg) scale(1.05); }
  60% { transform: translateY(-6px) rotate(-3deg) scale(1.15); }
  80% { transform: translateY(2px) rotate(3deg) scale(1.1); }
}
.icon-float {
  animation: floaty 3s ease-in-out infinite;
  transition: transform 0.3s ease-out;
}
.icon-float:hover {
  animation: bounceWiggle 0.8s ease-in-out;
}
.icon-delay-1 { animation-delay: 0s; }
.icon-delay-2 { animation-delay: 0.8s; }
.icon-delay-3 { animation-delay: 1.6s; }
`}
</style>

<div className="mt-6 flex justify-center gap-10">
  <a
    href="https://www.tiktok.com/@longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/tiktok.png"
      alt="TikTok"
      className="w-16 h-16 icon-float icon-delay-1"
    />
  </a>

  <a
    href="https://www.instagram.com/longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/yellowinstagram.png"
      alt="Instagram"
      className="w-16 h-16 icon-float icon-delay-2"
    />
  </a>

  <a
    href="https://www.facebook.com/longwhite.nz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/icons/facebook.png"
      alt="Facebook"
      className="w-16 h-16 icon-float icon-delay-3"
    />
  </a>
</div>
            </div>
        </details>




        
      </div>
    </section>
  </div>
);

export default About;


