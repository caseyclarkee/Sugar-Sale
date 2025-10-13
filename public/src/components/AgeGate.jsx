import { useEffect } from "react";
export default function AgeGate() {
  useEffect(() => {
    try {
      const LEGACY_KEY = "ageVerifiedUntil";
      const TEASER_KEY = "ageGatePass";
      const legacyUntil = localStorage.getItem(LEGACY_KEY);
      if (legacyUntil && Date.now() < Number(legacyUntil)) {
        localStorage.setItem(TEASER_KEY, JSON.stringify({ ts: Date.now() }));
      }
    } catch {}
  }, []);
  return null; // HTML overlay in index.html now handles gating
}
