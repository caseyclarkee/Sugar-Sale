// src/pages/About.jsx
import React, { useState } from "react";

const About = () => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });
    setDone(true);
  };

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url('/images/about/clouds.jpg')" }}
    >
      <section className="px-4 sm:px-8 py-12 text-lg backdrop-blur-sm">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
          {/* Left column */}
          <div>
            <h3 className="text-6xl sm:text-8xl font-black text-white mb-4">
              Meet Gary
            </h3>
            <p className="max-w-4xl text-white text-lg">
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
              <b>P.P.S.</b> Yes, you should buy it at your local liquor store. But please
              take my sugar first.
            </p>
          </div>

          {/* Right column */}
          <div className="flex justify-center md:justify-center">
            <img
              src="/images/about/Gary_WebsiteImage.jpg"
              alt="Gary"
              className="max-w-full md:max-w-md rounded-2xl border-[4px] border-grey shadow-[6px_6px_0_#fff]"
            />
          </div>
        </div>

        {/* FAQ */}
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
            <div className="mt-2 text-m">
              I've got three!
              <style>{`
                @keyframes floaty {
                  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
                  25% { transform: translateY(-3px) rotate(-2deg) scale(1.05); }
                  50% { transform: translateY(2px) rotate(2deg) scale(0.98); }
                  75% { transform: translateY(-1px) rotate(-1deg) scale(1.03); }
                }
                .icon-float {
                  animation: floaty 3s ease-in-out infinite;
                  transition: transform 0.3s ease-out;
                }
              `}</style>
              <div className="mt-6 flex justify-left gap-10">
                <a href="https://www.tiktok.com/@longwhite.nz" target="_blank">
                  <img src="/icons/tiktok.png" alt="TikTok" className="w-16 h-16 icon-float" />
                </a>
                <a href="https://www.instagram.com/longwhite.nz" target="_blank">
                  <img
                    src="/icons/yellowinstagram.png"
                    alt="Instagram"
                    className="w-16 h-16 icon-float"
                  />
                </a>
                <a href="https://www.facebook.com/longwhite.nz" target="_blank">
                  <img
                    src="/icons/facebook.png"
                    alt="Facebook"
                    className="w-16 h-16 icon-float"
                  />
                </a>
              </div>
            </div>
          </details>

          {/* Fanmail */}
          <details className="rounded-xl border-[4px] border-grey bg-yellow p-4 shadow-[4px_4px_0_#000] mb-3">
            <summary className="cursor-pointer font-black">
              Gary, do you accept fanmail?
            </summary>
            <div className="mt-2 text-m">
               Wow. Aren’t you sweet? Dial 0800-4SUGAR to leave me a voicemail or slide into my electronic mail box {" "}
              <button
                onClick={() => setOpen(true)}
                className="underline font-black hover:text-purple"
              >
                HERE
              </button>
            </div>
          </details>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative bg-white border-[4px] border-black rounded-xl p-6 shadow-[6px_6px_0_#000] w-full max-w-md">
            {/* Close (X) Button */}
            <button
              onClick={() => {
                setOpen(false);
                setDone(false);
              }}
              className="absolute top-2 right-3 text-black text-xl font-black hover:text-purple"
              aria-label="Close"
            >
              ✕
            </button>

            {!done ? (
              <>
                <h3 className="text-xl font-black mb-4">Send Gary a Message</h3>
                <form
                  name="gary-fanmail"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="grid gap-3"
                >
                  <input type="hidden" name="form-name" value="gary-fanmail" />

                  <label className="font-black">
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <label className="font-black">
                    Email
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <label className="font-black">
                    Message
                    <textarea
                      name="message"
                      required
                      rows="4"
                      className="mt-1 w-full border-[3px] border-black p-2"
                    ></textarea>
                  </label>

                  <button
                    type="submit"
                    className="rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]"
                  >
                    Send
                  </button>

                  <p className="text-xs mt-2 text-black">
                    By submitting, you agree to our{" "}
                    <a
                      href="https://www.asahibeverages.com/privacy-collection-notice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold"
                    >
                      privacy collection notice
                    </a>
                    .
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-black mb-4">
                  Message sent! 🎉 Gary thanks you.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setDone(false);
                  }}
                  className="rounded-xl border-[3px] border-black bg-yellow px-4 py-2 font-black shadow-[3px_3px_0_#000]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;

