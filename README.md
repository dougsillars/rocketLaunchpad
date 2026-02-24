# rocketLaunchpad

Track upcoming rocket launches worldwide — filter by location and agency. Real-time data from [TheSpaceDevs](https://thespacedevs.com).

## Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS v4** for styling
- **Launch Library 2 API** for launch data

## Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dougsillars/rocketLaunchpad.git
   cd rocketLaunchpad
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   ```

   The default `LL2_API_BASE_URL` points to the free tier of Launch Library 2. No API key is required.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

| Variable           | Description                  | Default                                |
| ------------------ | ---------------------------- | -------------------------------------- |
| `LL2_API_BASE_URL` | Launch Library 2 API base URL | `https://ll.thespacedevs.com/2.2.0/` |

## Deploy to Vercel

1. Push your repository to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Add the `LL2_API_BASE_URL` environment variable in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and handles the rest

## API Attribution

Launch data provided by [TheSpaceDevs](https://thespacedevs.com) via the [Launch Library 2 API](https://ll.thespacedevs.com/2.2.0/).
