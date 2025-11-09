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
  title: "Spooky Trick or Treat Map | Interactive Halloween Experience 🎃",
  description: "Discover the ultimate trick-or-treat locations with our interactive Halloween map! Explore 40+ candy spots across 10+ cities, read spooky stories, watch Halloween movies, and enjoy immersive effects. Perfect for planning your Halloween adventure!",
  keywords: ["halloween", "trick or treat", "halloween map", "candy locations", "halloween stories", "spooky", "interactive map", "halloween 2025"],
  authors: [{ name: "Rahul Patwa", url: "https://github.com/rahulpatwa1303" }],
  creator: "Rahul Patwa",
  publisher: "Rahul Patwa",
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
 
            
            <main className="pt-16">
              {children}
            </main>
          </SpookyModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}