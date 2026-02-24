"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  net: string;
  statusAbbrev: string;
}

function formatCountdown(deltaMs: number): string {
  const totalSeconds = Math.floor(Math.abs(deltaMs) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const prefix = deltaMs > 0 ? "T-" : "T+";
  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  parts.push(`${String(hours).padStart(2, "0")}h`);
  parts.push(`${String(minutes).padStart(2, "0")}m`);
  parts.push(`${String(seconds).padStart(2, "0")}s`);

  return `${prefix} ${parts.join(" ")}`;
}

function formatNetDate(isoDate: string): string {
  const date = new Date(isoDate);
  return `NET: ${date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  })}`;
}

export default function CountdownTimer({
  net,
  statusAbbrev,
}: CountdownTimerProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

    if (statusAbbrev !== "Go") return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [statusAbbrev]);

  if (statusAbbrev !== "Go") {
    return (
      <div className="mt-auto border-t border-border pt-2.5">
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-muted">
          No Earlier Than
        </div>
        <div className="mt-1 font-mono text-sm text-text-muted">
          {formatNetDate(net)}
        </div>
      </div>
    );
  }

  const launchTime = new Date(net).getTime();
  const deltaMs = now !== null ? launchTime - now : launchTime - Date.now();

  return (
    <div className="mt-auto border-t border-border pt-2.5">
      <div className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-muted">
        Countdown
      </div>
      <div className="mt-1 font-mono text-sm font-bold tracking-wider text-accent">
        {formatCountdown(deltaMs)}
      </div>
      <div className="mt-0.5 font-mono text-xs text-text-secondary">
        {formatNetDate(net)}
      </div>
    </div>
  );
}
