import { getNextUpcomingLaunch } from "@/lib/api";

function formatLaunchDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export default async function Home() {
  const launch = await getNextUpcomingLaunch();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Star field background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 20%, hsla(220,30%,95%,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 8%, hsla(220,30%,95%,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 68% 35%, hsla(220,30%,95%,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 12%, hsla(220,30%,95%,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 55%, hsla(220,30%,95%,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 90% 60%, hsla(220,30%,95%,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 75%, hsla(220,30%,95%,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 85%, hsla(220,30%,95%,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 88%, hsla(220,30%,95%,0.3) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 35% 92%, hsla(220,30%,95%,0.5) 0%, transparent 100%)
          `,
        }}
      />

      {/* Nebula glow */}
      <div
        className="pointer-events-none fixed -right-[10%] -top-[20%] z-0 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse, hsla(190,90%,55%,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-border bg-bg-deep/85 px-10 py-5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-lg shadow-[0_0_16px_hsla(190,90%,55%,0.25)]">
            🚀
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            rocket<span className="text-accent">Launchpad</span>
          </span>
        </div>
        <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 font-mono text-xs tracking-wider text-success">
          ● LIVE DATA
        </span>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <p className="mb-4 animate-fade-up text-sm font-medium uppercase tracking-[0.12em] text-accent">
          Powered by Launch Library 2
        </p>
        <h1 className="mb-3 max-w-[640px] animate-fade-up text-4xl font-bold leading-tight tracking-tight text-text-primary [animation-delay:0.1s]">
          Every rocket launch,
          <br />
          one place.
        </h1>
        <p className="mb-12 max-w-[480px] animate-fade-up text-base leading-relaxed text-text-secondary [animation-delay:0.2s]">
          Track upcoming launches worldwide — filter by location and agency.
          Real-time data from TheSpaceDevs.
        </p>

        {/* Live data card */}
        <div className="w-full max-w-[520px] animate-fade-up rounded-2xl border border-border border-t-[3px] border-t-accent bg-bg-card px-9 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.4),0_12px_32px_rgba(0,0,0,0.3)] [animation-delay:0.35s]">
          <div className="mb-5 flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-success" />
            Next upcoming launch
          </div>

          {launch ? (
            <>
              <div className="mb-2.5 text-2xl font-bold leading-snug tracking-tight text-text-primary">
                {launch.name}
              </div>
              <div className="mb-6 font-mono text-sm text-accent">
                NET: {formatLaunchDate(launch.net)}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/[0.08] px-3 py-1.5 text-xs tracking-wider text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Launch Library 2 API connected
              </span>
            </>
          ) : (
            <p className="text-base text-text-secondary">
              Unable to load launch data
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center gap-1.5 border-t border-border px-10 py-5 text-xs text-text-muted">
        <span>Launch data provided by</span>
        <a
          href="https://thespacedevs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary transition-colors hover:text-accent"
        >
          TheSpaceDevs
        </a>
        <span>·</span>
        <a
          href="https://ll.thespacedevs.com/2.2.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary transition-colors hover:text-accent"
        >
          Launch Library 2 API
        </a>
      </footer>
    </div>
  );
}
