// Usage: node scripts/referral-tally.mjs   (reads BREVO_API_KEY from .env.local; only works from this machine's authorized IP)

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const LIST_ID = 20
const PAGE_LIMIT = 500

function readApiKey() {
  const envPath = join(ROOT, ".env.local")
  const raw = readFileSync(envPath, "utf8")
  const line = raw.split("\n").find((l) => l.startsWith("BREVO_API_KEY="))
  if (!line) throw new Error("BREVO_API_KEY not found in .env.local")
  return line.slice("BREVO_API_KEY=".length).trim()
}

async function fetchContacts(apiKey) {
  const contacts = []
  let offset = 0
  while (true) {
    const url = `https://api.brevo.com/v3/contacts/lists/${LIST_ID}/contacts?limit=${PAGE_LIMIT}&offset=${offset}`
    const res = await fetch(url, { headers: { accept: "application/json", "api-key": apiKey } })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Brevo API ${res.status} ${res.statusText} (offset=${offset}): ${body}`)
    }
    const data = await res.json()
    const page = data.contacts ?? []
    contacts.push(...page)
    if (page.length < PAGE_LIMIT) break
    offset += PAGE_LIMIT
  }
  return contacts
}

function tally(contacts) {
  const counts = new Map()
  for (const contact of contacts) {
    const referredBy = contact.attributes?.REFERRED_BY
    if (!referredBy) continue
    counts.set(referredBy, (counts.get(referredBy) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

async function main() {
  const apiKey = readApiKey()
  const contacts = await fetchContacts(apiKey)
  const leaderboard = tally(contacts)

  console.log(`Patricia Waitlist referral leaderboard (list ${LIST_ID}, ${contacts.length} contacts)\n`)
  if (leaderboard.length === 0) {
    console.log("No referrals recorded yet.")
    return
  }
  const width = Math.max(...leaderboard.map(([code]) => code.length))
  for (const [code, count] of leaderboard) {
    console.log(`${code.padEnd(width)}  ${count}`)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
