import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "rocketLaunchpad",
  description:
    "Track upcoming rocket launches worldwide — filter by location and agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
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

          {/* Header */}
          <header className="relative z-10 flex items-center justify-between border-b border-border bg-bg-deep/90 px-10 py-4.5 backdrop-blur-sm max-sm:px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-accent text-base shadow-[0_0_14px_hsla(190,90%,55%,0.18)]">
                🚀
              </div>
              <span className="text-lg font-bold tracking-tight text-text-primary">
                rocket<span className="text-accent">Launchpad</span>
              </span>
            </div>
            <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 font-mono text-[0.72rem] tracking-wider text-success">
              ● LIVE DATA
            </span>
          </header>

          {/* Main content */}
          <main className="relative z-10 flex-1">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 flex items-center justify-center gap-1.5 border-t border-border px-10 py-4 text-xs text-text-muted max-sm:px-4">
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
      </body>
    </html>
  );
}
