import { getUpcomingLaunches } from "@/lib/api";
import LaunchCard from "@/components/LaunchCard";

export default async function Home() {
  const launches = await getUpcomingLaunches();

  return (
    <div className="px-10 py-9 max-sm:px-4 max-sm:py-6">
      {/* Page title */}
      <div className="mb-7 flex items-baseline gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Upcoming Launches
        </h1>
        {launches && launches.length > 0 && (
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {launches.length} missions
          </span>
        )}
      </div>

      {/* Error state */}
      {launches === null && (
        <div className="flex items-center justify-center py-24 text-base text-text-secondary">
          Unable to load launches. Please try again later.
        </div>
      )}

      {/* Empty state */}
      {launches !== null && launches.length === 0 && (
        <div className="flex items-center justify-center py-24 text-base text-text-muted">
          No upcoming launches found.
        </div>
      )}

      {/* Card grid */}
      {launches && launches.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>
      )}
    </div>
  );
}
