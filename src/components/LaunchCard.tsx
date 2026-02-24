import type { Launch } from "@/lib/api";
import CountdownTimer from "./CountdownTimer";

function getStatusBadgeClasses(abbrev: string): string {
  switch (abbrev) {
    case "Go":
      return "text-success bg-success/10 border-success/30";
    case "TBD":
    case "TBC":
      return "text-text-muted bg-text-muted/15 border-text-muted/25";
    case "Hold":
      return "text-amber bg-amber/10 border-amber/30";
    case "Failure":
    case "Partial Failure":
      return "text-red bg-red/10 border-red/30";
    default:
      return "text-text-muted bg-text-muted/15 border-text-muted/25";
  }
}

export default function LaunchCard({ launch }: { launch: Launch }) {
  const locationName = launch.pad.location?.name;
  const launchSite = locationName
    ? `${launch.pad.name}, ${locationName}`
    : launch.pad.name;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-bg-card shadow-[0_1px_3px_rgba(0,0,0,0.35),0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:border-border-bright hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_10px_28px_rgba(0,0,0,0.3)]">
      {/* Image strip */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-bg-image">
        {launch.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={launch.image}
            alt={launch.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              className="h-10 w-10 opacity-[0.18]"
            >
              <path d="M12 2L8 8H4l4 4-1.5 6L12 15l5.5 3L16 12l4-4h-4L12 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2.5 p-3.5 pb-4">
        {/* Status + agency row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider ${getStatusBadgeClasses(launch.status.abbrev)}`}
          >
            {launch.status.abbrev}
          </span>
          <span className="truncate text-xs font-medium text-text-secondary">
            {launch.launch_service_provider.name}
          </span>
        </div>

        {/* Identity block */}
        <div className="flex flex-col gap-0.5">
          <div className="truncate text-sm font-bold text-text-primary">
            {launch.rocket.configuration.name}
          </div>
          {launch.mission?.name && (
            <div className="truncate text-xs text-text-secondary">
              {launch.mission.name}
            </div>
          )}
          <div className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 opacity-60"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{launchSite}</span>
          </div>
        </div>

        {/* Countdown block */}
        <CountdownTimer net={launch.net} statusAbbrev={launch.status.abbrev} />
      </div>
    </div>
  );
}
