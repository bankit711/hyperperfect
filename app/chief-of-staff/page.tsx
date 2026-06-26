import type { Metadata } from "next"
import ChiefOfStaffPage from "../../components/chief-of-staff-page"

export const metadata: Metadata = {
  title: "Patricia, by HyperPerfect — Your Chief of Staff",
  description: "Patricia starts as your assistant and grows into your chief of staff. She turns customer feedback into scored, build-ready product decisions across your team's tools. Join the waitlist for founding access.",
  icons: {
    icon: [
      { url: "/patricia/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/patricia/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/patricia/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.hyperperfect.ai/chief-of-staff/",
    siteName: "Patricia, by HyperPerfect",
    title: "Patricia, by HyperPerfect — Your Chief of Staff",
    description: "She turns customer feedback into scored, build-ready product decisions across your team's tools. Join the waitlist for founding access.",
    images: [
      { url: "/patricia/og-image.png", width: 1200, height: 630, alt: "Patricia, a chief of staff by HyperPerfect" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patricia, by HyperPerfect — Your Chief of Staff",
    description: "She turns customer feedback into scored, build-ready product decisions across your team's tools. Join the waitlist for founding access.",
    images: ["/patricia/og-image.png"],
  },
}

export default function Page() {
  return <ChiefOfStaffPage />
}
