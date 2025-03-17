import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

// Initialize the Inter font with swap display and optional subset
// This helps with font loading on GitHub Pages
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "HyperPerfect - Accelerate Insights, Eliminate Mistakes",
  description: "Automate data cleaning, revenue waterfalls, cohort analyses, and pivot tables—all seamlessly built with auditable formulas directly in Excel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
} 