import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "../styles/globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "HyperPerfect: Your AI Financial Analyst in Excel",
  description: "AI-powered financial modeling and Excel automation. Build auditable models, automate data analysis, and eliminate spreadsheet errors without lifting a finger.",
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
      <body className={`${workSans.variable} ${GeistMono.variable} font-sans`}>
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
