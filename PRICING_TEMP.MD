# HyperPerfect Pricing Overview

Reference document for building the pricing page. Contains all subscription tiers, limits, billing mechanics, and user-facing flows.

---

## Subscription Tiers

| | Free Trial | Starter | Pro |
|---|---|---|---|
| **Price** | $0 | $20/mo | $50/mo |
| **Monthly spend limit** | $20 API cost | $20 API cost | $50 API cost |
| **Trial period** | 30 days | — | — |
| **Billing** | No card required | Monthly via Stripe | Monthly via Stripe |

### How spend limits work

Limits are based on the actual API cost of the user's LLM usage (input tokens, output tokens, cache writes, and cache reads). Users do not see raw token counts — the system tracks dollar cost internally and enforces a monthly cap. Usage resets on the 1st of each calendar month.

When a user hits their limit, they see a "Monthly usage limit reached" message with a progress bar and either an "Upgrade Plan" or "Manage Subscription" button depending on their current plan.

### Models available (all tiers)

- **Fast mode** — Claude Sonnet 4.5 (faster, cheaper)
- **Smart mode** — Claude Opus 4.6 (most capable reasoning)

Users toggle between modes in the chat interface. Both modes are available on all tiers — the spend limit is the only differentiator.

---

## Plan Lifecycle

### Free Trial
- 30-day trial starts at first login (Microsoft SSO via Excel add-in)
- No credit card required
- $20/month spend cap (same as Starter)
- After 30 days, account status becomes **expired** and the user is blocked from the chat
- Expired users see an upgrade prompt with a link to subscribe

### Paid Plans (Starter / Pro)
- Subscribe via Stripe Checkout (opened from the settings panel or the expired-account prompt)
- Subscription activates immediately upon successful payment
- Access continues through the billing period even if the user cancels
- Cancellation takes effect at the end of the current billing period (no immediate cutoff)
- If payment fails, Stripe retries automatically — access is maintained during the retry window
- If Stripe exhausts retries, the subscription ends and the user is blocked

### Resubscription
- Cancelled or expired users can resubscribe at any time via a Stripe Payment Link
- The payment link pre-fills the user's email address for convenience

---

## What Users Get

### Core Features (all plans)
- AI chat assistant embedded in the Excel add-in sidebar
- Read and modify Excel worksheets through natural language
- Tool execution: read ranges, write data, create reports/tables, format cells, manage sheets, etc.
- File attachments (images and PDFs up to 32 MB)
- Custom instructions (persistent per-account preferences)
- Conversation history with context compaction
- Task tracking (TodoWrite) for multi-step operations
- Fast/Smart mode toggle (Sonnet vs Opus)

### What differs between tiers
- **Only the monthly spend limit** — $20 for Trial and Starter, $50 for Pro
- All features are identical across tiers
- Higher spend limit = more conversations / more complex tasks per month

---

## Self-Service Capabilities

### From the Settings Panel
- **View current plan** — tier name and usage progress bar
- **View usage** — percentage of monthly limit consumed
- **Upgrade** (trial/expired users) — opens Stripe Checkout for plan selection
- **Manage Subscription** (paid users) — opens Stripe Customer Portal where they can:
  - Update payment method
  - View invoice history
  - Cancel subscription

### Not self-service (admin-only in MVP)
- Switching between Starter and Pro tiers (requires admin action)
- Refunds (handled manually in Stripe Dashboard)
- Custom spend limit overrides per account

---

## Pricing Page Messaging Notes

### Value props to highlight
- **No setup friction** — works inside Excel, no separate app to learn
- **AI that actually modifies your spreadsheet** — not just chat, but real tool execution
- **Both speed and intelligence** — toggle between fast and smart models as needed
- **30-day free trial** — full access, no card required

### Key differentiator between tiers
- The only difference is the monthly spend budget
- Position Starter as "for regular users" and Pro as "for power users / heavy daily use"
- All features are available on all plans including the free trial

### Handling the "what counts toward my limit" question
- Usage is based on internal API cost, not a per-message or per-action count
- Simple tasks (quick reads, short answers) cost very little
- Complex tasks (large reports, multi-step analysis, smart mode) cost more
- The settings panel shows a real-time usage bar so users always know where they stand

### Trial-to-paid conversion flow
1. User installs the Excel add-in and signs in with Microsoft account
2. 30-day trial begins automatically with full access
3. As trial approaches expiration or limit, user sees upgrade prompts
4. Clicking upgrade opens Stripe Checkout — enter card, select plan, done
5. Subscription activates immediately, no interruption in service

---

## Technical Details (for pricing page implementation)

### Stripe integration
- Checkout sessions for new subscriptions
- Customer Portal for subscription management
- Payment Links for expired/cancelled user re-subscription
- Webhook-driven state sync (no polling)

### Tier data is database-driven
- Tiers stored in `plan_tier` table with `price_cents`, `display_name`, `monthly_spend_limit_cents`
- The `/billing/tiers` endpoint returns active tiers (can be used by a public pricing page)
- New tiers can be added by inserting database rows + creating Stripe prices (no code changes)

### Current Stripe Price IDs (for reference)
- Starter: `price_1T0iRmDOJmTSL9bogqhm3J69`
- Pro: `price_1T0iSpDOJmTSL9boio6KCdyY`
