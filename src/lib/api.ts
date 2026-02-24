const LL2_API_BASE_URL =
  process.env.LL2_API_BASE_URL ?? "https://ll.thespacedevs.com/2.2.0/";

export interface Launch {
  id: string;
  name: string;
  net: string;
  status: {
    id: number;
    name: string;
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
