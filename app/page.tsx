import type { Metadata } from "next"
import LandingPage from "../components/landing-page"

export const metadata: Metadata = {
  title: "Patricia, by HyperPerfect — Your Personal Assistant",
  description: "Patricia is a personal assistant for business owners and executives. Inbox, calendar, prep, and follow-ups handled 24/7. Join the waitlist for founding access.",
  // Patricia favicon for the landing page (overrides the site-wide default in layout.tsx).
  icons: {
    icon: [
      { url: "/patricia/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/patricia/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/patricia/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.hyperperfect.ai/",
    siteName: "Patricia, by HyperPerfect",
    title: "Patricia, by HyperPerfect — Your Personal Assistant",
    description: "A personal assistant for business owners and executives. Inbox, calendar, prep, and follow-ups handled 24/7. Join the waitlist for founding access.",
    images: [
      { url: "/patricia/og-image.png", width: 1200, height: 630, alt: "Patricia, a personal assistant by HyperPerfect" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patricia, by HyperPerfect — Your Personal Assistant",
    description: "A personal assistant for business owners and executives. Inbox, calendar, prep, and follow-ups handled 24/7. Join the waitlist for founding access.",
    images: ["/patricia/og-image.png"],
  },
}

export default function Home() {
  return <LandingPage />
}
