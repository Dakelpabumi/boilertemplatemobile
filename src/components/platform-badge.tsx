"use client";

import { useEffect, useState } from "react";

type Platform = "web" | "android" | "ios";

export function PlatformBadge() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    let active = true;

    import("@capacitor/core").then(({ Capacitor }) => {
      if (active) {
        setPlatform(Capacitor.getPlatform() as Platform);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const isNative = platform === "android" || platform === "ios";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      <span
        className={`size-1.5 rounded-full ${isNative ? "bg-accent" : "bg-muted"}`}
      />
      {platform ?? "detecting"}
    </span>
  );
}
