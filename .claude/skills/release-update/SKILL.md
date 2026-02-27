---
name: release-update
description: Sync HyperPerfect marketing site with new features shipped in HP7 — update changelog, help pages, and draft a user email campaign.
---

# Release Update Workflow

Run this when features have shipped in HP7 and the marketing site needs to catch up.
Covers: changelog entries, help page updates, and a user email campaign draft.

## Phase 0: Session Init

1. Read `references/SESSION_LOG.md` — note the **last run date** and **last version documented**
2. Read all reference files:
   - `references/CHANGELOG_GUIDE.md`
   - `references/HELP_GUIDE.md`
   - `references/EMAIL_GUIDE.md`
   - `references/FEATURE_VAULT.md`
   - `references/PRODUCT_CONTEXT.md`
   - `references/USER_CONTEXT.md`
3. Report to David: "Last run: [date]. Last version documented: [v]. Ready to discover what's shipped since then."
4. Ask: "Any specific features you want to highlight in the email, or should I pull from all new features?"

---

## Phase 1: Discover New Features in HP7

HP7 repo is at `/Users/davidingraham/hyperperfect7`.

1. **Git log**: Run `git -C /Users/davidingraham/hyperperfect7 log --oneline --format="%h %ad %s" --date=short` and filter commits after last run date
2. **Group commits** by feature: ignore refactors, CI fixes, and admin-only features; focus on user-visible changes
3. **Read CLAUDE.md files** for depth on any feature that needs explanation:
   - Root: `/Users/davidingraham/hyperperfect7/CLAUDE.md`
   - Features with their own docs: check `/Users/davidingraham/hyperperfect7/src/CLAUDE.md`
4. **Present the feature list** to David in plain language — one line per feature, noting if it's user-facing vs internal

Ask: "Does this look right? Anything to add or exclude before we proceed?"

Do NOT continue until David confirms the feature list.

---

## Phase 1.5: Build Feature Value Props

Before planning or writing anything, draft a value prop entry in `references/FEATURE_VAULT.md` for each confirmed feature.

1. Write what you know from the code: what it does technically, likely use cases, obvious framing
2. Mark sections you're uncertain about with *[David to confirm]*
3. Present the draft vault entries to David and **ask him to fill in the gaps**:
   - What's the primary value — speed, capability, quality, or simplicity?
   - Who is this most for?
   - Any use cases or framings to add or correct?
4. Update the vault entries with David's answers before moving on

**Do NOT draft changelog, help pages, or email until value props are confirmed.**
All subsequent writing draws from the vault, not from the raw commit description.

---

## Phase 2: Plan the Update

Propose a plan across all three deliverables:

1. **Changelog**: All confirmed user-facing features → new version entries (next version after last documented)
2. **Help pages**: Per `references/HELP_GUIDE.md`, identify which articles need updating
3. **Email**: Pick 1–2 features (preferably the most exciting/engaging ones) as the email focus

Confirm plan with David before writing anything. Specifically agree on:
- Version numbers for new entries
- Which help pages to touch
- The email angle (feature headline + benefit)

---

## Phase 3: Update Changelog

Follow `references/CHANGELOG_GUIDE.md` strictly.

1. Draft all new version entries — newest version first at the top of the file (below frontmatter)
2. Present to David for review before writing to file
3. Once approved, edit `/Users/davidingraham/hyperperfect/content/help/changelog.md`
   - Insert new entries directly below the `---` separator after the intro line
   - Do not modify existing entries
4. Confirm: "Changelog updated — [N] new versions added: [v1] through [v2]"

---

## Phase 4: Update Help Pages

Per `references/HELP_GUIDE.md`:

1. List which pages need changes and why
2. Draft the specific additions/edits for each page — keep changes minimal and surgical
3. Present changes for approval page by page if more than one page is affected
4. Once approved, edit files in `/Users/davidingraham/hyperperfect/content/help/`
5. Confirm: "Help pages updated: [list of files changed]"

If nothing needs changing, say so explicitly and move on.

---

## Phase 5: Email — Draft, Build, and Deploy

Follow `references/EMAIL_GUIDE.md` and `references/USER_CONTEXT.md` for voice and audience.

### Step 1: Draft
1. Write plain-text email draft with subject (2–3 options), hook, feature highlights, CTA
2. Iterate until David approves

### Step 2: Production Files
Once approved, generate both files and save to `assets/marketing_emails/`:
- `customer_update_[slug].md` — source with metadata (subject, list, campaign ID)
- `customer_update_[slug].html` — production HTML matching existing template

HTML template rules (match `customer_update_sonnet_pricing.html` exactly):
- Work Sans font, 560px max-width, white card with border, `border-radius: 12px`
- Greeting: `{{ contact.FIRSTNAME | default: "there" }}`
- Feature sections: bold heading paragraph + body paragraph; use `#f9fafb` cards for examples
- CTA button: `#1a7bff`, `padding: 10px 24px`, `border-radius: 6px`
- Sign-off: "Dave" + "Founder, HyperPerfect" (matches existing emails)
- Footer: "HyperPerfect · AI for Excel" + link only

### Step 3: Brevo Campaign Draft
Credentials in `/Users/davidingraham/hyperperfect/.env.local`:
- `BREVO_CAMPAIGNS_API_KEY` — marketing campaigns key (confirmed working 2026-02-27)
- `BREVO_SENDER_NAME=David Ingraham`, `BREVO_SENDER_EMAIL=di@hyperperfect.ai` — verified sender
- Product update lists: **7** (Current App Subscribers, 59), **10** (Logged Into App, 29), **17** (Internal, 5)

**If `BREVO_CAMPAIGNS_API_KEY` is missing or unauthorized:**
Stop and tell David: "The Brevo campaign API key is missing. Check `.env.local` for `BREVO_CAMPAIGNS_API_KEY`."

**If key is present:**
```bash
curl -X POST "https://api.brevo.com/v3/emailCampaigns" \
  -H "api-key: $BREVO_CAMPAIGNS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Update — [slug] (YYYY-MM-DD)",
    "subject": "[approved subject]",
    "previewText": "[preview text]",
    "sender": { "name": "David Ingraham", "email": "di@hyperperfect.ai" },
    "recipients": { "listIds": [7, 10, 17] },
    "htmlContent": "[full HTML]"
  }'
```
Report the campaign ID from the response. Update the `.md` source file with it.

### Step 4: Archive and Confirm
- Add entry to `references/EMAIL_ARCHIVE.md` with date, subject, campaign ID
- Tell David: "Campaign draft created in Brevo. Log in to review, send a test email, then broadcast. Campaign ID: [id]"

**Do NOT send anything. Output is a draft in Brevo only.**

---

## Session End

Run `references/SESSION_LOG.md` update:
- Set last run date to today
- Set last version documented to the highest version just written
- Add a one-line summary of what was shipped

Then ask: "Anything about this process that felt off or slow? I'll update the reference files."

Apply any feedback to the appropriate reference file immediately.

---

## Self-Improvement Protocol

When David corrects phrasing, changes approach, or gives feedback during a session:
- Writing style issues → `references/CHANGELOG_GUIDE.md` or `references/EMAIL_GUIDE.md`
- Wrong help page targeted → `references/HELP_GUIDE.md`
- Feature discovery issues → update Phase 1 instructions in this file
- Session flow issues → update the relevant Phase section above

**Line budget**: SKILL.md stays under 175 lines. Move detail to reference files.
