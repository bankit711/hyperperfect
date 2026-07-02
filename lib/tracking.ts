// Client-side conversion tracking (Reddit Pixel + GA4), gated to the
// production host so dev servers, preview builds, and local test-build
// serves never report conversions.

const PRODUCTION_HOSTS = ["www.hyperperfect.ai", "hyperperfect.ai"]

// Kill switch for testing on the live site without polluting ad metrics:
// run localStorage.setItem("hp_disable_tracking", "1") in the console.
const DISABLE_KEY = "hp_disable_tracking"

type TrackingWindow = Window & {
  rdt?: (...args: unknown[]) => void
  gtag?: (...args: unknown[]) => void
}

export function isTrackingEnabled(): boolean {
  if (typeof window === "undefined") return false
  if (!PRODUCTION_HOSTS.includes(window.location.hostname)) return false
  try {
    if (window.localStorage.getItem(DISABLE_KEY) === "1") return false
  } catch {
    // localStorage blocked (privacy mode); treat as regular traffic
  }
  return true
}

// One conversion per page load, even with multiple waitlist forms mounted.
let signupTracked = false

export function trackWaitlistSignup(email: string): void {
  if (signupTracked || !isTrackingEnabled()) return
  signupTracked = true

  const w = window as TrackingWindow

  // Reddit: email feeds advanced matching; conversion_id lets Reddit dedupe
  // this conversion if it is ever reported again (e.g. via a future CAPI).
  w.rdt?.("track", "SignUp", { email, conversion_id: crypto.randomUUID() })

  // GA4: mark sign_up as a key event in the GA4 admin UI so it counts as a
  // conversion there too.
  w.gtag?.("event", "sign_up", { method: "waitlist" })
}
