import type { Metadata, Viewport } from "next";
import { Merriweather, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1F3A5F",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title:
    "Hammock Property Inspections | Florida's Space Coast Home Inspections",
  description:
    "Hammock Property Inspections provides clear, professional home inspections in Florida, combining thorough reporting, drone-assisted capability, and an analytical approach clients can trust.",
  metadataBase: new URL("https://hammockpropertyinspections.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <body className="font-body bg-background text-charcoal antialiased">
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
