"use client";

import { useState, useMemo } from "react";
import type { Launch } from "@/lib/api";
import LaunchCard from "./LaunchCard";

export default function LaunchFilterGrid({
  launches,
}: {
  launches: Launch[];
}) {
  const [locationFilter, setLocationFilter] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("");

  const locationOptions = useMemo(() => {
    const names = launches
      .map((l) => l.pad.location?.name)
      .filter((name): name is string => name != null);
    return [...new Set(names)].sort();
  }, [launches]);

  const agencyOptions = useMemo(() => {
    const names = launches.map((l) => l.launch_service_provider.name);
    return [...new Set(names)].sort();
  }, [launches]);

  const filteredLaunches = useMemo(() => {
    return launches.filter(
      (l) =>
        (locationFilter === "" ||
          l.pad.location?.name === locationFilter) &&
        (agencyFilter === "" ||
          l.launch_service_provider.name === agencyFilter)
    );
  }, [launches, locationFilter, agencyFilter]);

  const hasActiveFilter = locationFilter !== "" || agencyFilter !== "";

  function clearFilters() {
    setLocationFilter("");
    setAgencyFilter("");
  }

  const selectBase =
    "appearance-none rounded-lg bg-bg-card px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:ring-2 focus:ring-accent/50 cursor-pointer";

  return (
    <>
      {/* Page title */}
      <div className="mb-5 flex items-baseline gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Upcoming Launches
        </h1>
        <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {filteredLaunches.length} missions
        </span>
      </div>

      {/* Filter bar */}
      <div className="mb-7 flex flex-col gap-3 sm:flex-row">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className={`${selectBase} border ${
            locationFilter !== ""
              ? "border-border-bright"
              : "border-border"
          } w-full sm:w-auto`}
        >
          <option value="">All Locations</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          className={`${selectBase} border ${
            agencyFilter !== ""
              ? "border-border-bright"
              : "border-border"
          } w-full sm:w-auto`}
        >
          <option value="">All Agencies</option>
          {agencyOptions.map((agency) => (
            <option key={agency} value={agency}>
              {agency}
            </option>
          ))}
        </select>
      </div>

      {/* Zero-results state */}
      {filteredLaunches.length === 0 && hasActiveFilter && (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <p className="text-base text-text-secondary">
            No launches match your filters.
          </p>
          <button
            onClick={clearFilters}
            className="text-sm text-accent underline underline-offset-2 transition-colors hover:text-accent-dim"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Card grid */}
      {filteredLaunches.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLaunches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>
      )}
    </>
  );
}
