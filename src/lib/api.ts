const LL2_API_BASE_URL =
  process.env.LL2_API_BASE_URL ?? "https://ll.thespacedevs.com/2.2.0/";

export interface Launch {
  id: string;
  name: string;
  net: string;
  image: string | null;
  status: {
    id: number;
    name: string;
    abbrev: string;
  };
  rocket: {
    configuration: {
      name: string;
    };
  };
  mission: {
    name: string;
    description: string;
  } | null;
  launch_service_provider: {
    name: string;
  };
  pad: {
    name: string;
    location: {
      name: string;
    } | null;
  };
}

export interface LaunchListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}

export async function getNextUpcomingLaunch(): Promise<Launch | null> {
  try {
    const res = await fetch(
      `${LL2_API_BASE_URL}launch/upcoming/?limit=1&mode=list`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return null;
    }

    const data: LaunchListResponse = await res.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results[0];
  } catch {
    return null;
  }
}

export async function getUpcomingLaunches(): Promise<Launch[] | null> {
  try {
    const res = await fetch(
      `${LL2_API_BASE_URL}launch/upcoming/?limit=20&mode=normal`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return null;
    }

    const data: LaunchListResponse = await res.json();

    if (!data.results) {
      return null;
    }

    return data.results;
  } catch {
    return null;
  }
}
