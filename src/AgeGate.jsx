import React from "react";

/**
 * AgeGate
 * - Blocks the site until age is verified
 * - Two modes:
 *    - toggle `requireDob` to true for strict DOB check (>= minAge)
 *    - false for a simple "Yes, I'm 18+" confirm
 * - Stores a signed marker in localStorage for `rememberDays`
 */

export default function AgeGate({
  minAge = 18,          // legal drinking age (NZ is 18)
  rememberDays = 30,    // how long to remember verification
  requireDob = true,    // set to false for a one-click confirm
  brand = "X Zero Sugar"
}) {
  const KEY = "ageVerifiedUntil";

  // check stored verification
  const [open, setOpen] = React.useState(() => {
    try {
      const until = localStorage.getItem(KEY);
      if (!until) return true;
      return Date.now() > Number(until); // expired -> open
    } catch { return true; }
  });

  React.useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const remember = () => {
    const ms = rememberDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(KEY, String(Date.now() + ms));
  };

  const verifyYesNo = (ok) => {
    if (ok) {
      remember();
      setOpen(false);
    } else {
      // Send underage away (or show message)
      window.location.href = "https://www.alcohol.org.nz/"; // change to your policy page
    }
  };

  const onSubmitDob = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const y = Number(fd.get("year"));
    const m = Number(fd.get("month")) - 1; // 0-based
    const d = Number(fd.get("day"));
    const dob = new Date(y, m, d);
    if (Number.isNaN(dob.getTime())) return;

    // Compute age
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const beforeBirthday =
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
    if (beforeBirthday) age--;

    if (age >= minAge) {
      remember();
      setOpen(false);
    } else {
      window.location.href = "https://www.alcohol.org.nz/"; // or a custom underage page
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border-[6px] border-black bg-white shadow-[10px_10px_0_#000]">
        <div className="border-b-[6px] border-black bg-yellow-300 px-6 py-4">
          <h2 className="text-2xl font-black uppercase">
            Are you of legal drinking age?
          </h2>
        </div>

        <div className="px-6 py-6 space-y-4">
          <p className="font-medium">
            This site for <span className="font-black">{brand}</span> contains
            promotions for alcohol. Please confirm you are at least{" "}
            <span className="font-black">{minAge}</span> years old.
          </p>

          {requireDob ? (
            <form onSubmit={onSubmitDob} className="grid grid-cols-3 gap-3">
              <label className="font-black text-sm">
                Day
                <input
                  name="day"
                  type="number"
                  min="1"
                  max="31"
                  required
                  className="mt-1 w-full rounded-lg border-[3px] border-black p-2"
                />
              </label>
              <label className="font-black text-sm">
                Month
                <input
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  required
                  className="mt-1 w-full rounded-lg border-[3px] border-black p-2"
                />
              </label>
              <label className="font-black text-sm">
                Year
                <input
                  name="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                  className="mt-1 w-full rounded-lg border-[3px] border-black p-2"
                />
              </label>

              <div className="col-span-3 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => verifyYesNo(false)}
                  className="rounded-xl border-[4px] border-black bg-gray-200 px-4 py-2 font-black uppercase"
                >
                  Exit
                </button>
                <button
                  type="submit"
                  className="rounded-xl border-[4px] border-black bg-purple-500 px-4 py-2 font-black uppercase text-white shadow-[5px_5px_0_#000]"
                >
                  Enter
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => verifyYesNo(false)}
                className="rounded-xl border-[4px] border-black bg-gray-200 px-4 py-2 font-black uppercase"
              >
                No
              </button>
              <button
                onClick={() => verifyYesNo(true)}
                className="rounded-xl border-[4px] border-black bg-purple-500 px-4 py-2 font-black uppercase text-white shadow-[5px_5px_0_#000]"
              >
                Yes, I’m {minAge}+
              </button>
            </div>
          )}

          <p className="text-xs text-black/60">
            We store a simple “age verified” marker in your browser for {rememberDays} days.
            No personal data is kept on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
