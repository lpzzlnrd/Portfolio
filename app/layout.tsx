import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-lpzzlnrd.vercel.app"),
  title: {
    default: "leoco · backend / full-stack",
    template: "%s · leoco",
  },
  description: "Backends que no se rompen a las 3 AM.",
  openGraph: {
    title: "leoco · backend / full-stack",
    description: "Backends que no se rompen a las 3 AM.",
    type: "website",
    url: "https://portfolio-lpzzlnrd.vercel.app",
    siteName: "leoco",
  },
  twitter: {
    card: "summary_large_image",
    title: "leoco · backend / full-stack",
    description: "Backends que no se rompen a las 3 AM.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <LangProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-bg focus:px-3 focus:py-1.5"
          >
            Skip to content
          </a>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
