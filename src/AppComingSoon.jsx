import React, { useState } from "react";
import AgeGate from "./components/AgeGate.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

export default function AppComingSoon() {
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <AgeGate onVerified={() => setIsVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-6xl sm:text-7xl font-black text-purple-700 drop-shadow-[4px_4px_0_#000] leading-tight">
          X<br />
          <span className="italic text-black">Sugar Liquidation</span><br />
          <span className="text-purple-700">Sale</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl font-black uppercase text-black drop-shadow-[2px_2px_0_#fff]">
          The craziest sale to ever hit NZ is almost here.
        </p>
      </div>

      <div className="my-8 h-[6px] w-32 bg-black rounded-full"></div>

      <RegisterForm />

      <p className="mt-12 text-sm font-medium text-black/70">
        © {new Date().getFullYear()} Long White — X Zero Sugar.
      </p>
    </div>
  );
}
