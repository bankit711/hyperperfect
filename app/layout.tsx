import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
        <script async src="https://tally.so/widgets/embed.js"></script>
        <script src="https://cdn.brevo.com/js/sdk-loader.js" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Version: 2.0
              window.Brevo = window.Brevo || [];
              Brevo.push([
                "init",
                {
                  client_key: "834d6ouos53ws47l1a1btz8l"
                }
              ]);
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BYW8TCVBDR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BYW8TCVBDR');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
} 