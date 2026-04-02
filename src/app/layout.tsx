import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// Triggering redeploy with env variables update
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "UmarCraft — Complete Digital & Automation Solutions",
  description:
    "UmarCraft is a full-service technology company providing end-to-end web development, mobile apps, AI/ML, DevOps, and automation solutions for modern businesses.",
  keywords:
    "web development, mobile apps, AI, machine learning, DevOps, automation, cloud, UmarCraft",
  openGraph: {
    title: "UmarCraft — Complete Digital & Automation Solutions",
    description:
      "We build scalable web, mobile, AI, and DevOps systems for modern businesses.",
    type: "website",
  },
};

import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} bg-[#020408] text-white antialiased`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
