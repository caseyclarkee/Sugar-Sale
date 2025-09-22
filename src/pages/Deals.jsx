// src/components/DealCard.jsx
import React, { useState } from "react";

export default function DealCard({ deal }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-xl border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
      <div className="aspect-square overflow-hidden rounded-lg border-[3px] border-black bg-gray-100 grid place-items-center mb-4">
        <span className="text-gray-500">{deal.title}</span>
      </div>
      <button
        onClick={() => {
          setOpen(true);
          setDone(false); // reset form when re-opened
        }}
        className="w-full rounded-lg border-[3px] border-black bg-yellow-300 px-3 py-2 font-black uppercase shadow-[3px_3px_0_#000]"
      >
        Enter Draw
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            {!done ? (
              <>
                <h3 className="mb-4 text-xl font-black">{deal.title}</h3>
                <form
                  name="deal-entry"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault(); // prevent reload
                    setSubmitting(true);

                    // Fake async delay before success
                    setTimeout(() => {
                      setSubmitting(false);
                      setDone(true);
                    }, 800);
                  }}
                >
                  <input type="hidden" name="form-name" value="deal-entry" />
                  <input type="hidden" name="deal" value={deal.title} />

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

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl border-[3px] border-black bg-yellow-300 px-3 py-1 font-bold shadow-[3px_3px_0_#000]"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid gap-4 text-center">
                <div className="text-2xl font-black">You’re in the draw! 🎉</div>
                <button
                  onClick={() => setOpen(false)}
                  className="mx-auto rounded-xl border-[3px] border-black bg-yellow-300 px-4 py-2 font-black shadow-[3px_3px_0_#000]"
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
}
