import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import type { ReactNode } from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Atomic Bet",
    template: "%s | Atomic Bet",
  },
  description: "Betting on the atomic level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${heebo.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SpeedInsights />
          <Analytics />
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
