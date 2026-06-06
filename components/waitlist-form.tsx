"use client"

import { useEffect, useState } from "react"

// Brevo subscription form serving the "Patricia Waitlist" list (id 20).
// Posts no-cors (opaque response), so success is shown optimistically.
const WAITLIST_ENDPOINT =
  "https://8f7f9936.sibforms.com/serve/MUIFAJRb0_4eFfqEFsG2yug0ncnB3IO6E_XlHgl0xGHTCei7LwQDemvES7gxpmwiuTc-wuBt3yE19FUoGvV7QtZU9xKeEGhHkK3aPDxfJXtxzU7UWsAtUilaoosrzTRzFMmbL_f5lae0_Czt7nhXhLTqwRjKCz-JJ2Hzuu02WuKEFJngyL_CFoS39-Tj-zOUVWqMl0LLxEKeeT6B"

// Referral code alphabet: uppercase letters + digits, ambiguous chars removed
// (0, O, 1, I, L). 31 symbols.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
const CODE_LENGTH = 6

// Generate a PAT-XXXXXX code from crypto.getRandomValues. Uniqueness is
// probabilistic; there is no server check.
function generateReferralCode(): string {
  const max = Math.floor(256 / CODE_ALPHABET.length) * CODE_ALPHABET.length
  let code = ""
  const buffer = new Uint8Array(1)
  while (code.length < CODE_LENGTH) {
    crypto.getRandomValues(buffer)
    // Reject the high tail to keep the modulo unbiased.
    if (buffer[0] >= max) continue
    code += CODE_ALPHABET[buffer[0] % CODE_ALPHABET.length]
  }
  return `PAT-${code}`
}

// Sanitize a referrer code from the URL: keep [A-Z0-9-], uppercase, cap at 16.
function sanitizeReferredBy(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 16)
}

interface WaitlistFormProps {
  variant?: "paper" | "dark"
}

export default function WaitlistForm({ variant = "paper" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [referredBy, setReferredBy] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)

  const isDark = variant === "dark"

  // Capture ?ref= on mount (client-only; static export has no request context).
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref")
    if (ref) setReferredBy(sanitizeReferredBy(ref))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Enter a valid email address.")
      return
    }
    setError("")

    const code = generateReferralCode()
    setReferralCode(code)

    if (WAITLIST_ENDPOINT) {
      const formData = new FormData()
      formData.append("EMAIL", trimmed)
      formData.append("email_address_check", "") // Brevo honeypot, must stay empty
      formData.append("locale", "en")
      formData.append("REFERRAL_CODE", code)
      formData.append("REFERRED_BY", referredBy)
      fetch(WAITLIST_ENDPOINT, { method: "POST", body: formData, mode: "no-cors" }).catch(() => {})
    }

    setSubmitted(true)
  }

  if (submitted) {
    const shareLink = `https://www.hyperperfect.ai/?ref=${referralCode}`
    const handleCopy = () => {
      navigator.clipboard?.writeText(shareLink).then(
        () => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        },
        () => {},
      )
    }
    return (
      <div
        className={`rounded-2xl px-8 py-7 text-center ${
          isDark ? "bg-pat-paper/10 border border-pat-paper/25" : "bg-white border border-pat-terra-200"
        }`}
      >
        <p className={`font-serif text-2xl mb-1 ${isDark ? "text-pat-paper" : "text-pat-ink"}`}>
          You&apos;re on the list.
        </p>
        <p className={isDark ? "text-pat-terra-100" : "text-pat-ink-500"}>
          We&apos;ll be in touch when your founding spot opens.
        </p>
        <div
          className={`mt-5 pt-5 border-t ${isDark ? "border-pat-paper/20" : "border-pat-terra-200"}`}
        >
          <p className={`mb-3 ${isDark ? "text-pat-terra-100" : "text-pat-ink-500"}`}>
            Share to move up. Top referrers get in first and earn credit.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-2 p-2 rounded-2xl ${
              isDark ? "bg-pat-paper/10 border border-pat-paper/25" : "bg-pat-paper border border-pat-terra-200"
            }`}
          >
            <span
              className={`flex-1 truncate px-3 py-2 text-sm text-left ${
                isDark ? "text-pat-terra-100" : "text-pat-ink-500"
              }`}
            >
              {shareLink}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="whitespace-nowrap rounded-xl text-sm font-medium px-5 py-2 bg-pat-terra text-pat-paper hover:bg-pat-terra-600 transition-colors duration-150"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div
        className={`flex flex-col sm:flex-row gap-2 p-2 rounded-2xl ${
          isDark ? "bg-pat-paper/10 border border-pat-paper/25" : "bg-white border border-pat-terra-200 shadow-sm"
        }`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className={`flex-1 bg-transparent rounded-xl px-4 py-3 text-lg outline-none ${
            isDark
              ? "text-pat-paper placeholder:text-pat-terra-100/60"
              : "text-pat-ink placeholder:text-pat-ink-500/60"
          }`}
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-xl text-lg font-medium px-7 py-3 bg-pat-terra text-pat-paper hover:bg-pat-terra-600 transition-colors duration-150"
        >
          Join the Waitlist
        </button>
      </div>
      {error && (
        <p className={`mt-2 text-sm ${isDark ? "text-pat-terra-200" : "text-pat-terra"}`}>{error}</p>
      )}
      <p className={`mt-3 text-sm ${isDark ? "text-pat-terra-100/80" : "text-pat-ink-500"}`}>
        Founding cohort access. No credit card. We&apos;ll only email you about early access.
      </p>
    </form>
  )
}
