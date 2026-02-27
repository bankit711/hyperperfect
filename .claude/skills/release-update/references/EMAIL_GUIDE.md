# User Email Guide

Guidelines for drafting HyperPerfect user update emails.

## Purpose

These emails do two things:
1. Keep active users informed about what's new
2. Re-engage users who haven't logged in recently — make them curious enough to open HyperPerfect

Pick **1–2 features** per email. More than that dilutes the message.
Choose the feature that is most likely to make someone say "oh, I didn't know it could do that."

## Voice

**Avoid AI writing tells** — see `~/.claude/projects/-Users-davidingraham-hyperperfect/memory/WRITING_RULES.md`. No em dashes, no filler adjectives, no gerund-led bullets, no "this enables you to."

**Direct and clear.** Write like a founder talking to a power user, not like a marketing email.
- Short sentences. No filler.
- Lead with the benefit, not the announcement.
- Avoid: "We're excited to announce...", "Introducing...", "We're thrilled..."
- Good: "HyperPerfect now thinks out loud." / "Your conversations no longer have a size limit."

**Concrete.** Give a one-sentence use case: "Use it when you're analyzing a 50-tab workbook."
**Personal.** Speak to *their* work in Excel, not the product roadmap.

## Structure

```
Subject: [Short, specific, benefit-focused — 6-10 words]

Hi [first name],

[1–2 sentence hook: what changed and why it matters to them]

[Feature 1 — bold name]
[2–3 sentences: what it does, when to use it, how to activate it]

[Feature 2 (optional) — bold name]
[2–3 sentences: same format]

[1-sentence CTA — specific action]
[Link]

[Sign-off]
David
```

## Subject Line Options

Always write 2–3 options. Good subject patterns:
- Benefit-led: "Your conversations no longer have a size limit"
- Action-led: "Try Auto Mode — HyperPerfect now picks the right AI for each task"
- Curiosity: "We added something to HyperPerfect you'll notice immediately"

Avoid: clickbait, vague ("big updates!"), version numbers in subject lines.

## CTA

Always link to one of:
- The add-in itself (opens Excel): "Open HyperPerfect →"
- The changelog: "See what's new →" → `https://www.hyperperfect.ai/help/changelog`
- A specific help article if the feature needs explanation

Use one CTA only. Don't stack multiple links.

## Feature Selection Criteria

**Good email features:**
- Immediately noticeable when the user next opens HyperPerfect (Auto Mode, subagents, thinking display)
- Solves a pain point users have expressed (context limits, cancellation, billing visibility)
- Has a clear "try it right now" moment

**Not ideal for email:**
- Internal billing changes (unless user-facing free tier)
- Admin-only features
- Bugfixes
- Infrastructure/model upgrades (can mention briefly but don't lead with them)

## Sending via Brevo

1. Log into Brevo → Campaigns → Create a new campaign
2. Campaign type: Classic campaign
3. Audience: "All HyperPerfect Users" list (or active users segment if available)
4. Paste in the approved email content
5. Send a test to your own email first before broadcasting
6. Subject line: use the approved option from Phase 5

Note: Do NOT send from this skill. Email output is draft + instructions only.

## Example Email (Reference)

```
Subject: HyperPerfect now picks the right AI for each task automatically

Hi [name],

Auto Mode is now the default. Instead of choosing between Fast and Power mode,
HyperPerfect reads your message and routes it to the right model automatically —
quick answers stay fast, complex analysis gets full reasoning.

**Auto Mode**
It works in the background. You don't have to do anything. If you prefer to
override, type @mode to switch manually. Auto Mode tends to feel noticeably
faster for day-to-day tasks because Haiku handles the simple ones.

**Background Agents** (if including a second feature)
For longer analyses, HyperPerfect can now spin up a reasoning agent in the
background while you keep working. You'll see it thinking in real-time,
then get results when it's done.

Open HyperPerfect to try it →
[link]

David
```

## Archive

Approved emails are saved in `references/EMAIL_ARCHIVE.md` with date and subject.
