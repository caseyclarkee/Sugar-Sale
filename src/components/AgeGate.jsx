import React, { useState } from "react";

const MINIMUM_AGE = 18;

function isValidDate(year, month, day) {
  const parsedYear = Number(year);
  const parsedMonth = Number(month);
  const parsedDay = Number(day);

  if (
    Number.isNaN(parsedYear) ||
    Number.isNaN(parsedMonth) ||
    Number.isNaN(parsedDay) ||
    parsedYear < 1900 ||
    parsedYear > new Date().getFullYear() ||
    parsedMonth < 1 ||
    parsedMonth > 12 ||
    parsedDay < 1 ||
    parsedDay > 31
  ) {
    return false;
  }

  const candidate = new Date(parsedYear, parsedMonth - 1, parsedDay);
  return (
    candidate.getFullYear() === parsedYear &&
    candidate.getMonth() === parsedMonth - 1 &&
    candidate.getDate() === parsedDay
  );
}

function isOldEnough(year, month, day) {
  const today = new Date();
  const adultCutoff = new Date(
    today.getFullYear() - MINIMUM_AGE,
    today.getMonth(),
    today.getDate()
  );

  const dob = new Date(Number(year), Number(month) - 1, Number(day));
  return dob <= adultCutoff;
}

export default function AgeGate({ onVerified }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!day || !month || !year) {
      setError("Please enter your full date of birth.");
      return;
    }

    if (!isValidDate(year, month, day)) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (!isOldEnough(year, month, day)) {
      setError("Sorry, you must be 18 or older to enter.");
      return;
    }

    setError("");
    onVerified();
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl shadow-[8px_8px_0_#000] p-8">
        <h1 className="text-3xl sm:text-4xl font-black text-purple-700 drop-shadow-[3px_3px_0_#000] uppercase">
          Are you 18 or older?
        </h1>
        <p className="mt-4 text-base sm:text-lg font-semibold text-black/80">
          Please confirm your date of birth to continue. This site contains alcohol-related content intended for adults in Aotearoa New Zealand.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 text-left">
            <label className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/70">Day</span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="31"
                value={day}
                onChange={(event) => setDay(event.target.value)}
                className="mt-2 rounded-lg border-2 border-black bg-white px-3 py-2 text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-purple-300"
                placeholder="DD"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/70">Month</span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="12"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                className="mt-2 rounded-lg border-2 border-black bg-white px-3 py-2 text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-purple-300"
                placeholder="MM"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/70">Year</span>
              <input
                type="number"
                inputMode="numeric"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="mt-2 rounded-lg border-2 border-black bg-white px-3 py-2 text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-purple-300"
                placeholder="YYYY"
                required
              />
            </label>
          </div>

          {error ? (
            <p className="text-sm font-semibold text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-purple-700 py-3 text-lg font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#000] transition hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]"
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
}
