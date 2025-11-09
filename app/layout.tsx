import type { Metadata } from "next";
import { Inter, Creepster } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StickyNavbar from "@/components/StickyNavbar";
import CrawlingHand from "@/components/CrawlingHand";
import FloatingGhosts from "@/components/FloatingGhosts";
import SpookySounds from "@/components/SpookySounds";
import SpookyCursorTrail from "@/components/SpookyCursorTrail";
import { SpookyModeProvider, SpookyModeToggle } from "@/components/SpookyModeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-creepster",
  
});

export const metadata: Metadata = {
  title: "Trick or Treat Map",
  description: "An interactive Halloween map experience!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.variable} ${creepster.variable} h-full`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SpookyModeProvider>
            <StickyNavbar />
            
            {/* Spooky Features */}
            <CrawlingHand />
            {/* <FloatingGhosts /> */}
            {/* <SpookyCursorTrail /> */}
            {/* <SpookySounds /> */}
            {/* <SpookyModeToggle /> */}
            
            <main className="pt-16">
              {children}
            </main>
          </SpookyModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}