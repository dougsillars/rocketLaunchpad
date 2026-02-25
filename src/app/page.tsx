import { getUpcomingLaunches } from "@/lib/api";
import LaunchFilterGrid from "@/components/LaunchFilterGrid";

export default async function Home() {
  const launches = await getUpcomingLaunches();

  return (
    <div className="px-10 py-9 max-sm:px-4 max-sm:py-6">
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

      {/* Filter grid */}
      {launches && launches.length > 0 && (
        <LaunchFilterGrid launches={launches} />
      )}
    </div>
  );
}
