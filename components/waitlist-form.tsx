"use client"

import { useState } from "react"

// Brevo subscription form serving the "Patricia Waitlist" list (id 20).
// Posts no-cors (opaque response), so success is shown optimistically.
const WAITLIST_ENDPOINT =
  "https://8f7f9936.sibforms.com/serve/MUIFAJRb0_4eFfqEFsG2yug0ncnB3IO6E_XlHgl0xGHTCei7LwQDemvES7gxpmwiuTc-wuBt3yE19FUoGvV7QtZU9xKeEGhHkK3aPDxfJXtxzU7UWsAtUilaoosrzTRzFMmbL_f5lae0_Czt7nhXhLTqwRjKCz-JJ2Hzuu02WuKEFJngyL_CFoS39-Tj-zOUVWqMl0LLxEKeeT6B"

interface WaitlistFormProps {
  variant?: "paper" | "dark"
}

export default function WaitlistForm({ variant = "paper" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const isDark = variant === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Enter a valid email address.")
      return
    }
    setError("")

    if (WAITLIST_ENDPOINT) {
      const formData = new FormData()
      formData.append("EMAIL", trimmed)
      formData.append("email_address_check", "") // Brevo honeypot, must stay empty
      formData.append("locale", "en")
      fetch(WAITLIST_ENDPOINT, { method: "POST", body: formData, mode: "no-cors" }).catch(() => {})
    }

    setSubmitted(true)
  }

  if (submitted) {
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
