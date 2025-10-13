import React, { useEffect } from "react";

/**
 * AgeGate (Teaser Bridge)
 * - No UI. We now use the HTML overlay in root index.html.
 * - Migrates any legacy React gate pass to the new teaser pass.
 * - If you still mount <AgeGate /> in App.jsx, it renders nothing.
 */
export default function AgeGate() {
  useEffect(() => {
    try {
      const LEGACY_KEY = "ageVerifiedUntil"; // old React gate (ms epoch expiry)
      const TEASER_KEY = "ageGatePass";      // new teaser gate ({ ts })
      const ONE_HOUR = 60 * 60 * 1000;

      // If a valid legacy pass exists, migrate it to a fresh teaser pass
      const legacyUntil = localStorage.getItem(LEGACY_KEY);
      if (legacyUntil && Date.now() < Number(legacyUntil)) {
        localStorage.setItem(TEASER_KEY, JSON.stringify({ ts: Date.now() }));
      }

      // Optional: if someone extended legacy pass far out, ensure teaser pass is present
      const teaser = JSON.parse(localStorage.getItem(TEASER_KEY) || "null");
      if (!teaser || !teaser.ts || (Date.now() - teaser.ts) > ONE_HOUR) {
        // Don’t auto-grant here; the HTML overlay will handle fresh verification.
        // We just ensure there’s no conflicting legacy UI.
      }
    } catch {
      // no-op
    }
  }, []);

  // Render nothing — HTML overlay handles gating now
  return null;
}

