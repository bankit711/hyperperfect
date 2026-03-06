"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// ── Example file content for Building Block popovers ─────────────

const BLOCK_EXAMPLES: Record<string, { filename: string; content: string }> = {
  "agent.md": {
    filename: "CLAUDE.md (sales pipeline project)",
    content: `# Sales Pipeline — GTM System

Unified GTM data platform connecting sales activity to product usage.
Orchestrates call recording sync, CRM integration, and Product-Qualified
Lead detection via the product backend database.

## Architecture

PRODUCT DATABASE (source of truth)
│
├── public schema (owned by product app)
│   ├── account        ← product users, plans, billing
│   ├── billing_event  ← payment webhooks
│   └── plan_tier      ← subscription tiers
│
└── gtm schema (owned by sales repo)
    ├── company        ← organizations by domain
    ├── contact ──FK──► public.account
    ├── meeting        ← calls (recording tool, CRM)
    ├── email          ← emails (Gmail)
    └── deal           ← pipeline stages

## GTM Workflow (4 phases)

1. SIGNAL  — Product usage triggers, inbound interest
2. ENGAGE  — Personalized outreach informed by AI analysis
3. CONVERT — Sales call → close deal
4. EXPAND  — Existing users → more seats, higher tier

## Repo Structure

sales/
├── .claude/skills/              # /daily-briefing, /crm-sync, /review
│   └── crm-sync/scripts/       # sync.py, push_to_crm.py, pull_from_crm.py,
│                                # match_accounts.py, sync_gmail.py
├── docs/api-schemas/            # API schemas: crm.md, gmail.md, db-schema.md
├── calls/YYYY-MM-DD-slug/      # Local file cache: summary.md, metadata.json
├── db/migrations/               # GTM schema migrations
├── .credentials/                # Gitignored — db.env, crm.env, gmail_token.json
└── CLAUDE.md

## Skills

- /crm-sync — Sync call recordings + CRM data to local files + database
- /daily-briefing — Daily GTM intelligence briefing (PQLs, follow-ups, stale deals)
- /api-reference — API schemas, DB schema, integration gotchas

## Important Rules

- Database is the source of truth; local files are a convenience cache
- Never commit credentials or API tokens (.credentials/ is gitignored)
- CRM owns human-edited fields (🔓 prefixed) — automated sync skips them
- Run sync before any review session to get latest data
- Owner email excluded from meeting attendees (external contacts only)`,
  },
  "rules/": {
    filename: ".claude/rules/crm-sync.md",
    content: `---
paths:
  - "**/*crm*.py"
  - "docs/api-schemas/crm.md"
---

# CRM Sync Rules

These rules activate whenever Claude edits CRM integration code.

## Field Ownership

The CRM (Notion, HubSpot, etc.) owns human-edited fields. These are
marked with 🔓 in the CRM and skipped on automated push. This prevents
sync scripts from overwriting manual updates to lead scores, next
actions, deal stages, and other fields the sales team edits by hand.

- push_to_crm.py skips 🔓 fields on UPDATE
- pull_from_crm.py reads 🔓 fields back to database — run BEFORE push

## Sync Rules

- Pull order: Companies → Contact Emails → Contacts → Deals
- Contact emails are add-only on pull (never modify or delete existing)
- All cross-database relations require two-way links (one-way silently fails)
- Internal emails (@your-company.com) are excluded from sync
- Database IDs cached in .credentials/crm_config.json`,
  },
  "skills/": {
    filename: ".claude/skills/daily-briefing/SKILL.md",
    content: `---
name: daily-briefing
description: Daily GTM intelligence briefing — surfaces PQLs, overdue follow-ups, stale deals, and calls without follow-up. Use for morning routine or pipeline checks.
---

# /daily-briefing — Daily Pipeline Intelligence

## Trigger

- User types /daily-briefing
- User asks "what needs attention today?" or "sales briefing" or "check pipeline"
- Morning routine — run daily to surface actionable sales intelligence

## What It Does

Queries the product database (gtm schema) and generates a formatted
daily briefing with actionable insights.

## Signals It Checks

### 1. Product-Qualified Leads (PQLs)
Trial users who are actively using the product but haven't had a
sales call yet. These are the highest-priority outreach targets.

### 2. Overdue Follow-ups
Contacts where next_action_date has passed — things you said
you'd do but haven't.

### 3. Stale Deals
Open deals (not closed_won/closed_lost) that haven't been
updated in 14+ days.

### 4. Recent Calls Without Follow-up
Calls from the last 7 days where no next_action has been set
on the contact.

### 5. Account Matching
Automatically links product accounts to GTM contacts by email match.

## Prerequisites

- DB_URL configured in .credentials/db.env
- GTM tables exist in the database (migrations applied)
- psycopg installed (pip install 'psycopg[binary]')

## Usage

/daily-briefing

Or run the script directly:

python3 .claude/skills/daily-briefing/signals.py

## Output Format

# Pipeline Briefing — YYYY-MM-DD

## PQLs to Reach Out To (N)
| Name | Email | Logins | Plan | Last Active |
...

## Overdue Follow-ups (N)
| Name | Email | Action | Due Date |
...

## Stale Deals (N)
| Deal | Contact | Stage | Last Updated |
...

## Recent Calls Without Follow-up (N)
| Contact | Call Title | Date |
...

## Account Matching
Linked N new product accounts to GTM contacts.

## Summary
- N PQLs to reach out to
- N overdue follow-ups
- N stale deals
- N calls need follow-up set

## Architecture

Product Database
├── account (product users)
├── gtm.contact (people, FK → account)
├── gtm.meeting + meeting_attendee (calls)
├── gtm.email (emails)
├── gtm.deal (pipeline)
└── gtm.company (organizations)
         │
    signals.py queries
         │
    Formatted daily briefing`,
  },
  "agents/": {
    filename: ".claude/agents/meeting-prep.md",
    content: `---
name: meeting-prep
model: sonnet
memory: project
---

# Meeting Prep Agent

Prepares a structured briefing before any sales call. Triggered
when the user says "prep for [contact name]" or "meeting brief".

## What It Pulls

1. Recent emails — last 10 messages with this contact
2. Deal stage — current pipeline position, value, next steps
3. Product usage — login frequency, features used, plan tier
4. Last meeting notes — summary and action items from prior call
5. Company background — domain, size, industry, other contacts

## Output Format

# Meeting Brief: [Contact Name]
## Company: [Company Name]

### Deal Status
Stage: [stage] | Value: [value] | Last updated: [date]

### Recent Activity
- [Date]: [Email/call summary]
- [Date]: [Email/call summary]

### Product Usage
Plan: [tier] | Last login: [date] | Key features: [list]

### Suggested Talking Points
- [Based on deal stage and recent activity]
- [Based on product usage patterns]
- [Based on overdue action items]

### Open Action Items
- [ ] [Action item from last meeting]
- [ ] [Overdue follow-up if any]

## Instructions

Query the database for all context, then format the briefing.
Flag any overdue action items for this contact. If product usage
data exists, highlight adoption patterns that suggest expansion
or churn risk.`,
  },
  "hooks/": {
    filename: "settings.json (hooks section)",
    content: `// settings.json — hooks section
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit|MultiEdit",
      "hooks": [{ "type": "command",
        "command": "bash scripts/hooks/post-tool-use.sh",
        "async": true }]
    }],
    "PreCompact": [{
      "hooks": [{ "type": "command",
        "command": "bash scripts/hooks/pre-compact.sh" }]
    }],
    "SessionStart": [{
      "hooks": [{ "type": "command",
        "command": "bash scripts/hooks/session-start.sh",
        "async": true }]
    }],
    "SessionEnd": [{
      "hooks": [{ "type": "command",
        "command": "bash scripts/hooks/session-end.sh" }]
    }]
  }
}

// session-end.sh spawns a subagent with this prompt:

You are a knowledge extraction agent. For each
observation, ask: "Would knowing this change how a
future session handles a similar task?" If NO, discard.

You may only write to:
  - MEMORY.md (append, < 5 lines each)
  - topics/<topic>.md (create or append)

Output a JSON array of operations:
  [{"action": "append", "path": "MEMORY.md",
    "section": "## Key Files", "content": "..."},
   {"action": "discard",
    "observation": "Fixed typo", "reason": "..."}]`,
  },
  "memory.md": {
    filename: ".claude/memory/MEMORY.md",
    content: `# Sales Pipeline — Project Memory

## Architecture
PostgreSQL database with two schemas: public (product) and gtm (sales).
CRM syncs bidirectionally — database is source of truth for automated
data, CRM owns human-edited fields (🔓 prefixed).

## Key Files
- scripts/sync.py: pull call recordings into local files + database
- scripts/push_to_crm.py: database → CRM (skips 🔓 fields on update)
- scripts/pull_from_crm.py: CRM → database (🔓 fields + new records)
- scripts/match_accounts.py: link product accounts to sales contacts
- scripts/sync_gmail.py: pull emails for known contacts (OAuth2)
- db/migrations/: GTM schema migrations (separate from product)

## Patterns
- Enrichment strategy: "fill-if-null" for most fields, "latest wins" for timestamps
- Field ownership: 🔓 prefix = human-edited in CRM, skip on automated push
- Multi-email: contact_email table supports work, personal, SSO per contact
- Account matching joins through contact_email for broader coverage

## Data Quality Rules
- Lowercase all email addresses before insert
- Exclude internal emails (@your-company.com) from sync
- NULL over empty string for missing data
- Deduplicate contacts by email before CRM push

## Topics (deep dives)
→ topics/crm-field-mapping.md
→ topics/sync-architecture.md
→ topics/pql-detection.md`,
  },
  "topics/*.md": {
    filename: "memory/topics/crm-sync.md",
    content: `# CRM Sync Architecture

## Overview
Bidirectional sync between PostgreSQL (source of truth) and the CRM.
Runs on a 15-minute cron. Each direction has its own script so failures
are isolated and retryable.

## Push (database → CRM)
- Script: scripts/push_to_crm.py
- Skips fields prefixed with 🔓 (human-edited in CRM)
- Batches updates in groups of 50 to stay under API rate limits
- Logs every field-level change to sync_audit table

## Pull (CRM → database)
- Script: scripts/pull_from_crm.py
- Only writes 🔓 fields + brand-new records
- Deduplicates contacts by email before insert
- Merges multi-email contacts via contact_email join table

## Failure Handling
- Each sync writes a checkpoint timestamp to sync_state table
- On failure, next run resumes from last checkpoint
- After 3 consecutive failures, posts to #ops-alerts Slack channel
- Manual retry: python scripts/push_to_crm.py --since "2025-01-15"

## Edge Cases
- Lowercase all emails before comparison (case mismatch caused duplicates)
- NULL over empty string: CRM returns "" for blank fields, normalize on pull
- Deleted CRM records: soft-delete locally (deleted_at timestamp), never hard-delete`,
  },
  "sessionend-hook": {
    filename: "scripts/hooks/session-end.sh → knowledge subagent",
    content: `#!/bin/bash
# session-end.sh — fires automatically when a session closes

# Collect what changed this session
MODIFIED=$(git diff --name-only HEAD~1 2>/dev/null || echo "no changes")
DURATION=$(($(date +%s) - SESSION_START))

# Spawn a knowledge extraction subagent
claude --print --model haiku \\
  --system-prompt "$(cat <<'PROMPT'
You are a knowledge extraction agent. Review the session
transcript and modified files. For each observation, ask:

  "Would knowing this change how a future session
   handles a similar task?"

If NO → discard. If YES → route to the right file.

You may write to:
  - MEMORY.md (append, max 5 lines per entry)
  - topics/<topic>.md (create or append)

Cooldown: skip if MEMORY.md was modified < 2 hours ago.

Output a JSON array:
  [{"action": "append", "path": "MEMORY.md",
    "section": "## Patterns",
    "content": "CRM sync: always lowercase emails before compare"},
   {"action": "create", "path": "topics/email-normalization.md",
    "content": "# Email Normalization\\n\\n..."},
   {"action": "discard",
    "observation": "Fixed typo in README",
    "reason": "One-off, not a recurring pattern"}]
PROMPT
)" \\
  "Session lasted \${DURATION}s. Files modified: \${MODIFIED}"`,
  },
  "retro-skill": {
    filename: ".claude/skills/retrospective/SKILL.md",
    content: `---
name: retro
description: End-of-session knowledge extraction and memory maintenance
---

# /retro — Retrospective Skill

## Workflow

1. SCAN the full conversation transcript
2. EXTRACT observations worth preserving:
   - New patterns or conventions discovered
   - Bugs encountered and their root causes
   - Architecture decisions and their rationale
   - Tool or workflow improvements
3. ROUTE each observation to the right file:
   - memory.md ← key facts, short entries (< 5 lines)
   - topics/<area>.md ← deep dives, full context
   - CLAUDE.md ← suggest additions (don't write directly)
   - backlog.md ← deferred items, not urgent now
4. COMPACT oversized files:
   - If memory.md > 150 lines, merge related entries
   - If a topics/ file > 200 lines, split or summarize
5. REPORT what was captured and where it went

## Quality Rules
- Never duplicate what's already in memory
- References over content: point to files, don't copy them
- One fact per line in memory.md
- Verify before writing: check the file first`,
  },
  "skill-feedback": {
    filename: ".claude/skills/release-update/references/guide.md (diff)",
    content: `# How skill feedback works — example

## During a skill run:

User: "The email subject line should never use em dashes"

## The skill writes the correction back immediately:

--- a/skills/release-update/references/guide.md
+++ b/skills/release-update/references/guide.md
@@ -12,6 +12,7 @@
 ## Email Writing Rules
 - Subject lines: 50 chars max, no clickbait
 - Preview text: complement the subject, don't repeat it
+- Never use em dashes in subject lines or preview text
 - Body: one key message per email, clear CTA

## Next time the skill runs:

The updated guide.md loads automatically. The skill
follows the new rule without being told again.

## What makes this different from memory:

Memory = general project knowledge (any agent can use it)
Skill references = domain-specific rules for one workflow
The correction goes where it will have the most impact.`,
  },
  "backlog.md": {
    filename: "memory/backlog.md",
    content: `# Backlog — Deferred Improvements

Items captured during sessions that weren't urgent enough to act on
immediately. Skills check this file each run and surface relevant
items when the context is right.

## CRM Sync
- [ ] Add retry with exponential backoff for transient API failures
- [ ] Investigate webhook-based sync instead of polling (CRM supports it)
- [ ] Add data validation layer between pull and database write

## Infrastructure
- [ ] Move sync scripts to containerized Lambda functions
- [ ] Add structured logging (JSON) for better observability
- [ ] Set up dashboard for sync lag metrics

## Data Quality
- [ ] Audit 🔓 field coverage — some CRM fields may need protection
- [ ] Build reconciliation report: compare CRM vs database counts weekly
- [ ] Handle timezone-aware timestamps (currently mixing UTC and local)

## Documentation
- [ ] Document the full sync flow with sequence diagram
- [ ] Add runbook for "sync stuck" scenarios
- [ ] Write onboarding guide for new team members touching sync code`,
  },
}

// ── Styles ──────────────────────────────────────────────────────────
// ── Tooltip descriptions for Session Lifecycle cards ─────────────

// Ported from project_docs/skill-workflow-diagram.html with
// HyperPerfect-specific references generalized.

const diagramStyles = `
  .arch-page {
    max-width: 1400px;
    margin: 0 auto;
    color: #e4e4e7;
  }

  .arch-page h2 {
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .arch-subtitle {
    text-align: center;
    font-size: 20px;
    color: #71717a;
    margin-bottom: 48px;
  }

  .section-header {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #71717a;
    margin-bottom: 20px;
    margin-top: 56px;
    padding-bottom: 10px;
    border-bottom: 1px solid #27272a;
  }

  .section-header:first-of-type { margin-top: 0; }

  /* ── Scope column ── */
  .scope-col {
    border: 1px solid #27272a;
    border-radius: 12px;
    padding: 20px;
    background: #18181b;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Cards ── */
  .card {
    border-radius: 8px;
    padding: 12px 16px;
  }

  .card-context {
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    border: 1px solid #4338ca;
  }
  .card-rule {
    background: linear-gradient(135deg, #1a1a2e, #1e1b4b);
    border: 1px solid #6366f1;
  }
  .card-skill {
    background: linear-gradient(135deg, #0c1a2e, #172554);
    border: 1px solid #1e40af;
  }
  .card-agent {
    background: linear-gradient(135deg, #14261a, #064e3b);
    border: 1px solid #10b981;
  }
  .card-hook {
    background: linear-gradient(135deg, #2a1a0a, #451a03);
    border: 1px solid #d97706;
  }
  .card-memory {
    background: linear-gradient(135deg, #1a0a2a, #2e1065);
    border: 1px solid #8b5cf6;
  }

  .card-gate {
    background: linear-gradient(135deg, #2a1a0a, #451a03);
    border: 1px solid #d97706;
  }

  .card-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-desc {
    font-size: 14px;
    color: #a1a1aa;
    line-height: 1.6;
  }

  .card-file {
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: #6366f1;
    margin-top: 6px;
    opacity: 0.8;
  }
  .card-agent .card-file { color: #10b981; }
  .card-hook .card-file { color: #d97706; }
  .card-memory .card-file { color: #8b5cf6; }

  .badge {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .badge-auto { background: #064e3b; color: #10b981; }
  .badge-conditional { background: #1e1b4b; color: #818cf8; }
  .badge-trigger { background: #172554; color: #60a5fa; }
  .badge-manual { background: #27272a; color: #a1a1aa; }
  .badge-override { background: #451a03; color: #fbbf24; }
  .badge-memory { background: #2e1065; color: #c4b5fd; }

  /* ── Session lifecycle ── */
  .lifecycle {
    display: flex;
    gap: 0;
    align-items: stretch;
    position: relative;
  }

  .lifecycle-phase {
    flex: 1;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lifecycle-phase + .lifecycle-phase {
    border-left: 2px solid #27272a;
  }

  .lifecycle-phase-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lifecycle-arrow {
    position: absolute;
    right: -13px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lifecycle-arrow::after {
    content: '';
    width: 10px;
    height: 10px;
    border-right: 2px solid #71717a;
    border-bottom: 2px solid #71717a;
    transform: rotate(-45deg);
  }

  /* ── Override table ── */
  .override-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-top: 8px;
  }

  .override-table th {
    text-align: left;
    padding: 8px 12px;
    border-bottom: 1px solid #3f3f46;
    color: #71717a;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .override-table td {
    padding: 8px 12px;
    border-bottom: 1px solid #1f1f23;
    color: #a1a1aa;
  }

  .override-table code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 11px;
    color: #818cf8;
    background: #1e1b4b;
    padding: 1px 5px;
    border-radius: 3px;
  }

  /* ── Three-path diagram ── */
  .three-path {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-top: 12px;
  }

  .path-col {
    text-align: center;
  }

  .path-arrow {
    width: 2px;
    height: 24px;
    background: #3f3f46;
    margin: 0 auto;
    position: relative;
  }
  .path-arrow::after {
    content: '';
    width: 8px;
    height: 8px;
    border-right: 2px solid #71717a;
    border-bottom: 2px solid #71717a;
    transform: rotate(45deg);
    position: absolute;
    bottom: 0;
    left: -3px;
  }

  /* ── Improvement loop ── */
  .loop-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 24px 0;
    flex-wrap: wrap;
  }

  .loop-node {
    border-radius: 12px;
    padding: 28px 32px;
    text-align: center;
    min-width: 260px;
    max-width: 360px;
  }

  .loop-node .card-title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .loop-node .card-desc {
    font-size: 16px;
  }

  .loop-connector {
    font-size: 28px;
    color: #3f3f46;
  }

  /* ── Memory scopes ── */
  .memory-scopes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 8px;
  }

  /* ── Compact cards ── */
  .card-compact {
    padding: 8px 12px;
    margin-bottom: 6px;
    border-radius: 6px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-compact .card-title {
    font-size: 15px;
    margin-bottom: 0;
  }

  .card-compact .bb-hint {
    font-size: 10px;
    bottom: 4px;
    right: 8px;
  }

  /* ── Lifecycle tooltips ── */

  /* ── Legend ── */
  .legend {
    margin-top: 48px;
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 24px;
    border-top: 1px solid #27272a;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #71717a;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  /* ── Building block card wrapper ── */
  .bb-card-wrap {
    cursor: pointer;
  }

  .bb-card-wrap .card {
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .bb-card-wrap:hover .card-context { border-color: #6366f1; box-shadow: 0 0 12px rgba(99,102,241,0.15); }
  .bb-card-wrap:hover .card-rule { border-color: #818cf8; box-shadow: 0 0 12px rgba(129,140,248,0.15); }
  .bb-card-wrap:hover .card-skill { border-color: #3b82f6; box-shadow: 0 0 12px rgba(59,130,246,0.15); }
  .bb-card-wrap:hover .card-agent { border-color: #34d399; box-shadow: 0 0 12px rgba(52,211,153,0.15); }
  .bb-card-wrap:hover .card-hook { border-color: #fbbf24; box-shadow: 0 0 12px rgba(251,191,36,0.15); }
  .bb-card-wrap:hover .card-memory { border-color: #a78bfa; box-shadow: 0 0 12px rgba(167,139,250,0.15); }

  .bb-hint {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
    position: absolute;
    bottom: 8px;
    right: 12px;
    z-index: 2;
  }
  .bb-card-wrap:hover .bb-hint { opacity: 1; }

  /* ── Full-file modal ── */
  .bb-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.15s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .bb-modal {
    background: #111116;
    border: 1px solid #27272a;
    border-radius: 12px;
    max-width: 640px;
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 16px 64px rgba(0,0,0,0.6);
  }

  .bb-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #1f1f23;
    background: #18181b;
    border-radius: 12px 12px 0 0;
  }

  .bb-modal-title {
    font-size: 13px;
    font-weight: 600;
    color: #e4e4e7;
  }

  .bb-modal-filename {
    font-size: 11px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: #6366f1;
  }

  .bb-modal-close {
    background: none;
    border: 1px solid #3f3f46;
    border-radius: 6px;
    color: #a1a1aa;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 12px;
    font-family: inherit;
  }
  .bb-modal-close:hover { color: #e4e4e7; border-color: #71717a; }

  .bb-modal-body {
    flex: 1;
    overflow: auto;
    padding: 16px;
  }

  .bb-modal-body pre {
    margin: 0;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 12px;
    line-height: 1.6;
    color: #d4d4d8;
    white-space: pre;
  }

  /* ── Animations ── */

  /* Breathing glow for clickable cards */
  @keyframes breatheContext {
    0%, 100% { box-shadow: 0 0 4px rgba(67, 56, 202, 0.1); }
    50% { box-shadow: 0 0 20px rgba(67, 56, 202, 0.5), 0 0 40px rgba(67, 56, 202, 0.2); }
  }
  @keyframes breatheRule {
    0%, 100% { box-shadow: 0 0 4px rgba(99, 102, 241, 0.1); }
    50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.2); }
  }
  @keyframes breatheSkill {
    0%, 100% { box-shadow: 0 0 4px rgba(59, 130, 246, 0.1); }
    50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.2); }
  }
  @keyframes breatheAgent {
    0%, 100% { box-shadow: 0 0 4px rgba(16, 185, 129, 0.1); }
    50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.2); }
  }
  @keyframes breatheHook {
    0%, 100% { box-shadow: 0 0 4px rgba(217, 119, 6, 0.1); }
    50% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.5), 0 0 40px rgba(217, 119, 6, 0.2); }
  }
  @keyframes breatheMemory {
    0%, 100% { box-shadow: 0 0 4px rgba(139, 92, 246, 0.1); }
    50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2); }
  }

  .bb-card-wrap .card-context { animation: breatheContext 3s ease-in-out infinite; }
  .bb-card-wrap .card-rule { animation: breatheRule 3s ease-in-out infinite 0.5s; }
  .bb-card-wrap .card-skill { animation: breatheSkill 3s ease-in-out infinite 1s; }
  .bb-card-wrap .card-agent { animation: breatheAgent 3s ease-in-out infinite 1.5s; }
  .bb-card-wrap .card-hook { animation: breatheHook 3s ease-in-out infinite 2s; }
  .bb-card-wrap .card-memory { animation: breatheMemory 3s ease-in-out infinite 2.5s; }
  .bb-card-wrap .card-gate { animation: breatheHook 3s ease-in-out infinite 0.7s; }

  .bb-card-wrap .card {
    position: relative;
    overflow: hidden;
  }

  /* Shimmer sweep on hover for clickable cards */
  .bb-card-wrap .card {
    position: relative;
    overflow: hidden;
  }

  .bb-card-wrap .card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: 0;
    width: 50%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.03),
      transparent
    );
    transform: translateX(-100%) rotate(-15deg);
    transition: none;
    pointer-events: none;
  }

  @keyframes shimmerCard {
    0% { transform: translateX(-100%) rotate(-15deg); }
    100% { transform: translateX(300%) rotate(-15deg); }
  }

  .bb-card-wrap:hover .card::after {
    animation: shimmerCard 0.8s ease-out;
  }

  /* Flowing lifecycle arrows */
  @keyframes flowArrow {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }

  .lifecycle-arrow::after {
    animation: flowArrow 2s ease-in-out infinite;
  }

  .lifecycle-phase:nth-child(1) .lifecycle-arrow::after { animation-delay: 0s; }
  .lifecycle-phase:nth-child(2) .lifecycle-arrow::after { animation-delay: 0.5s; }
  .lifecycle-phase:nth-child(3) .lifecycle-arrow::after { animation-delay: 1s; }

  /* Pulsing memory hierarchy arrows */
  @keyframes pulseArrow {
    0%, 100% { color: #3f3f46; transform: translateX(0); }
    50% { color: #a78bfa; transform: translateX(3px); }
  }

  .memory-arrow {
    animation: pulseArrow 2s ease-in-out infinite;
    display: inline-block;
  }

  .memory-arrow:nth-child(2) { animation-delay: 0.4s; }

  /* Loop connector animation */
  @keyframes loopPulse {
    0%, 100% { color: #3f3f46; transform: scale(1); }
    50% { color: #71717a; transform: scale(1.3); }
  }

  .loop-connector {
    animation: loopPulse 2.5s ease-in-out infinite;
  }

  .loop-connector:nth-of-type(2) { animation-delay: 0.6s; }


  /* ── Responsive ── */
  @media (max-width: 800px) {
    .three-path { grid-template-columns: 1fr; }
    .memory-scopes { grid-template-columns: 1fr; }
    .lifecycle { flex-direction: column; }
    .lifecycle-phase + .lifecycle-phase { border-left: none; border-top: 2px solid #27272a; }
    .lifecycle-arrow { display: none; }
  }
`

export default function AgenticWorkflowsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [modalBlock, setModalBlock] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  // Close modal on Escape
  useEffect(() => {
    if (!modalBlock) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalBlock(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [modalBlock])

  return (
    <div className="relative min-h-screen bg-[#0f1117]">
      <style dangerouslySetInnerHTML={{ __html: diagramStyles }} />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f1117]/95 backdrop-blur border-b border-[#27272a] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-3xl md:text-4xl text-white">
                HyperPerfect
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "/help/quick-start", label: "Quick Start" },
                { href: "/help/why-hyperperfect", label: "Benefits" },
                { href: "/pricing", label: "Pricing" },
                { href: "/help", label: "Help" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/resources"
                className="text-xl font-medium text-white border-b-2 border-white pb-1 transition-colors duration-300"
              >
                Resources
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 border-2 border-white text-white hover:bg-white hover:text-[#0f1117] px-6 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-16">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              {[
                { href: "/help/quick-start", label: "Quick Start" },
                { href: "/help/why-hyperperfect", label: "Benefits" },
                { href: "/pricing", label: "Pricing" },
                { href: "/help", label: "Help" },
                { href: "/resources", label: "Resources" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-3xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/20" />
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 border-2 border-white text-white hover:bg-white hover:text-brand py-4 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="arch-page">

          <h2>Agentic Workflow Architecture</h2>
          <p className="arch-subtitle">
            How context files, rules, skills, agents, hooks, and memory work together across projects
          </p>

          {/* ── Session Lifecycle ── */}
          <div className="section-header">Session Lifecycle</div>

          <div className="lifecycle" style={{ background: "#18181b", borderRadius: 12, border: "1px solid #27272a" }}>
            <div className="lifecycle-phase">
              <div className="lifecycle-phase-title" style={{ color: "#4338ca" }}>
                <span>01</span> Startup
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("agent.md")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-context">
                  <div className="card-title">agent.md <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("rules/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-rule">
                  <div className="card-title">rules/*.md <span className="badge badge-conditional">conditional</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("memory.md")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-memory">
                  <div className="card-title">memory.md <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("hooks/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-hook">
                  <div className="card-title">SessionStart hook <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="lifecycle-arrow" />
            </div>

            <div className="lifecycle-phase">
              <div className="lifecycle-phase-title" style={{ color: "#1e40af" }}>
                <span>02</span> Session Work
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("skills/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-skill">
                  <div className="card-title">Skills <span className="badge badge-trigger">on trigger</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("agents/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-agent">
                  <div className="card-title">Agents <span className="badge badge-trigger">on delegate</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("hooks/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-hook">
                  <div className="card-title">PostToolUse hook <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="lifecycle-arrow" />
            </div>

            <div className="lifecycle-phase">
              <div className="lifecycle-phase-title" style={{ color: "#d97706" }}>
                <span>03</span> Context Pressure
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("hooks/")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-hook">
                  <div className="card-title">PreCompact hook <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="lifecycle-arrow" />
            </div>

            <div className="lifecycle-phase">
              <div className="lifecycle-phase-title" style={{ color: "#10b981" }}>
                <span>04</span> Session End
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("sessionend-hook")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-hook">
                  <div className="card-title">SessionEnd hook <span className="badge badge-auto">auto</span></div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("sessionend-hook")} style={{ cursor: "pointer" }}>
                <div className="card card-compact card-memory">
                  <div className="card-title">Knowledge synthesis</div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Building Blocks ── */}
          <div className="section-header">Building Blocks</div>

          <div style={{ fontSize: 16, color: "#a1a1aa", marginBottom: 20, lineHeight: 1.6 }}>
            Every element below can live at the <code style={{ fontFamily: "'SF Mono', monospace", fontSize: 14, color: "#6366f1", background: "#1e1b4b", padding: "2px 6px", borderRadius: 3 }}>~/.global/</code> (global) level, the <code style={{ fontFamily: "'SF Mono', monospace", fontSize: 14, color: "#6366f1", background: "#1e1b4b", padding: "2px 6px", borderRadius: 3 }}>project/.project/</code> (project) level, or both. Global applies to all projects. Project-level config adds to or overrides global for that repo.
          </div>

          <div className="scope-col" style={{ marginBottom: 16 }}>
            <div className="bb-card-wrap" onClick={() => setModalBlock("agent.md")}>
              <div className="card card-context">

                <div className="card-title">agent.md</div>
                <div className="card-desc">
                  The primary context file. Global: workflow preferences, git conventions, security rules. Project: architecture, commands, conventions. Both load at startup and combine.
                </div>
                <div className="card-file">~/.global/agent.md + project/agent.md</div>
                <div className="bb-hint">Click to view</div>
              </div>
            </div>

            <div className="bb-card-wrap" onClick={() => setModalBlock("rules/")}>
              <div className="card card-rule">
                <div className="card-title">rules/ <span className="badge badge-conditional">paths: match</span></div>
                <div className="card-desc">
                  Conditional rules that apply based on file type. Global and project rules are additive: both load when paths match.<br />
                  Example: code-quality.md &rarr; *.{'{'}ts,tsx,js,jsx,py{'}'} &middot; testing.md &rarr; *.test.*, *.spec.* &middot; documentation.md &rarr; *.md
                </div>
                <div className="card-file">~/.global/rules/ + .project/rules/</div>
                <div className="bb-hint">Click to view</div>
              </div>
            </div>

            <div className="bb-card-wrap" onClick={() => setModalBlock("skills/")}>
              <div className="card card-skill">
                <div className="card-title">skills/ <span className="badge badge-trigger">on trigger</span></div>
                <div className="card-desc">
                  Reusable workflows triggered by slash commands (e.g. /retro, /review, /deploy). Define globally for cross-project use, or per-project for repo-specific workflows. A project skill with the same name overrides its global counterpart.
                </div>
                <div className="card-file">~/.global/skills/ + .project/skills/</div>
                <div className="bb-hint">Click to view</div>
              </div>
            </div>

            <div className="bb-card-wrap" onClick={() => setModalBlock("agents/")}>
              <div className="card card-agent">
                <div className="card-title">agents/ <span className="badge badge-trigger">on delegate</span></div>
                <div className="card-desc">
                  Persistent subagents with their own instructions and optional memory. Global agents work across all projects. Project agents can override globals with domain-specific knowledge.
                </div>
                <div className="card-file">~/.global/agents/ + .project/agents/</div>
                <div className="bb-hint">Click to view</div>
              </div>
            </div>

            <div className="bb-card-wrap" onClick={() => setModalBlock("hooks/")}>
              <div className="card card-hook">
                <div className="card-title">hooks/ <span className="badge badge-auto">auto</span></div>
                <div className="card-desc">
                  Custom actions that fire automatically at key moments: when a session starts, after each tool use, before context compression, and when a session ends. Use for file tracking, knowledge capture, linting, or other automation.
                </div>
                <div className="card-file">~/.global/scripts/hooks/</div>
                <div className="bb-hint">Click to view</div>
              </div>
            </div>

          </div>

          {/* ── Self-Assembling Memory ── */}
          <div className="section-header">Self-Assembling Memory</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Row 1: The memory hierarchy */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 8, alignItems: "center" }}>
              <div className="bb-card-wrap" onClick={() => setModalBlock("memory.md")} style={{ cursor: "pointer" }}>
                <div className="card card-memory" style={{ textAlign: "center", padding: "12px 8px" }}>
  
                  <div className="card-title" style={{ justifyContent: "center", fontSize: 17 }}>memory.md</div>
                  <div className="card-desc" style={{ fontSize: 14 }}>The index. Loads automatically every session (first 200 lines). Key facts, patterns, and pointers.</div>
                  <div style={{ marginTop: 6 }}>
                    <span className="badge badge-auto">auto-loaded</span>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="memory-arrow" style={{ color: "#71717a", fontSize: 18 }}>&rarr;</div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("topics/*.md")} style={{ cursor: "pointer" }}>
                <div className="card card-memory" style={{ textAlign: "center", padding: "12px 8px" }}>
                  <div className="card-title" style={{ justifyContent: "center", fontSize: 17 }}>topics/*.md</div>
                  <div className="card-desc" style={{ fontSize: 14 }}>Deep dives. One file per area (CRM sync, infrastructure, API gotchas). Read on demand when the agent needs detail.</div>
                  <div style={{ marginTop: 6 }}>
                    <span className="badge badge-manual">on demand</span>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
              <div className="memory-arrow" style={{ color: "#71717a", fontSize: 18 }}>&rarr;</div>
              <div className="bb-card-wrap" onClick={() => setModalBlock("backlog.md")} style={{ cursor: "pointer" }}>
                <div className="card card-memory" style={{ textAlign: "center", padding: "12px 8px" }}>
                  <div className="card-title" style={{ justifyContent: "center", fontSize: 17 }}>backlog.md</div>
                  <div className="card-desc" style={{ fontSize: 14 }}>Deferred improvements. Skills check this each run and surface relevant items when the time is right.</div>
                  <div style={{ marginTop: 6 }}>
                    <span className="badge badge-manual">on demand</span>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
              </div>
            </div>

            {/* Annotation */}
            <div style={{ textAlign: "center", fontSize: 15, color: "#71717a", lineHeight: 1.7, padding: "0 20px" }}>
              Each hierarchy exists at two scopes: <span style={{ color: "#a1a1aa" }}>user</span> (cross-project, used by global agents) and <span style={{ color: "#a1a1aa" }}>project</span> (repo-specific, used by project agents).
              <br />
              memory.md points to topics/ with <code style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: "#a78bfa" }}>&gt; Details → see topics/crm-sync.md</code>
              &nbsp;&mdash;&nbsp;the agent follows these links when it needs the full picture.
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #27272a", margin: "4px 0" }} />

            {/* Row 2: What writes to memory */}
            <div style={{ fontSize: 16, fontWeight: 600, color: "#a1a1aa", textAlign: "center", letterSpacing: "0.05em", textTransform: "uppercase" }}>What writes to memory</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="bb-card-wrap" onClick={() => setModalBlock("sessionend-hook")} style={{ cursor: "pointer", width: "100%" }}>
                  <div className="card card-hook" style={{ padding: "10px 8px", marginBottom: 6 }}>
                    <div className="card-title" style={{ justifyContent: "center", fontSize: 15 }}>SessionEnd Hook</div>
                    <div className="card-desc" style={{ fontSize: 14 }}>Fires automatically. Spawns a subagent that asks: &ldquo;Would knowing this change how a future session handles a similar task?&rdquo;</div>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
                <div className="path-arrow" />
                <div style={{ fontSize: 13, color: "#a78bfa", marginTop: 8 }}>memory.md + topics/</div>
              </div>

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="bb-card-wrap" onClick={() => setModalBlock("retro-skill")} style={{ cursor: "pointer", width: "100%" }}>
                  <div className="card card-skill" style={{ padding: "10px 8px", marginBottom: 6 }}>
                    <div className="card-title" style={{ justifyContent: "center", fontSize: 15 }}>/retro Skill</div>
                    <div className="card-desc" style={{ fontSize: 14 }}>Run manually at end of productive sessions. Full extraction: scan conversation, route insights, compact oversized files.</div>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
                <div className="path-arrow" />
                <div style={{ fontSize: 13, color: "#a78bfa", marginTop: 8 }}>memory.md + topics/ + CLAUDE.md (suggest)</div>
              </div>

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="bb-card-wrap" onClick={() => setModalBlock("skill-feedback")} style={{ cursor: "pointer", width: "100%" }}>
                  <div className="card card-gate" style={{ padding: "10px 8px", marginBottom: 6 }}>
                    <div className="card-title" style={{ justifyContent: "center", fontSize: 15 }}>Skill Feedback</div>
                    <div className="card-desc" style={{ fontSize: 14 }}>When a skill gets corrected mid-run, it writes the fix back to its own reference files. Next run starts smarter.</div>
                  </div>
                  <div className="bb-hint">Click to view</div>
                </div>
                <div className="path-arrow" />
                <div style={{ fontSize: 13, color: "#a78bfa", marginTop: 8 }}>skill reference files</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #27272a", margin: "4px 0" }} />

            {/* Row 3: The result */}
            <div className="loop-diagram">
              <div className="loop-node card card-memory" style={{ flex: 1 }}>
                <div className="card-title" style={{ justifyContent: "center" }}>Session N ends</div>
                <div className="card-desc">Observations routed to memory.md, topics/, or skill references</div>
              </div>
              <div className="loop-connector">&rarr;</div>
              <div className="loop-node card card-hook" style={{ flex: 1 }}>
                <div className="card-title" style={{ justifyContent: "center" }}>Session N+1 starts</div>
                <div className="card-desc">memory.md loads automatically. Agent reads topics/ when relevant. Skills start with updated references.</div>
              </div>
              <div className="loop-connector">&rarr;</div>
              <div className="loop-node card card-agent" style={{ flex: 1 }}>
                <div className="card-title" style={{ justifyContent: "center" }}>Each session is better</div>
                <div className="card-desc">The agent accumulates project knowledge, avoids past mistakes, and follows established patterns without being told.</div>
              </div>
            </div>

          </div>

          {/* ── Legend ── */}
          <div className="legend">
            {[
              { color: "#4338ca", label: "Context (agent.md)" },
              { color: "#6366f1", label: "Rules (conditional)" },
              { color: "#1e40af", label: "Skills (on trigger)" },
              { color: "#10b981", label: "Agents (on delegate)" },
              { color: "#d97706", label: "Hooks / Gates" },
              { color: "#8b5cf6", label: "Memory / Knowledge" },
            ].map((item) => (
              <div key={item.label} className="legend-item">
                <div className="legend-dot" style={{ background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Full-file modal */}
      {modalBlock && BLOCK_EXAMPLES[modalBlock] && (
        <div className="bb-modal-overlay" onClick={() => setModalBlock(null)}>
          <div className="bb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bb-modal-header">
              <div>
                <div className="bb-modal-title">{modalBlock}</div>
                <div className="bb-modal-filename">{BLOCK_EXAMPLES[modalBlock].filename}</div>
              </div>
              <button className="bb-modal-close" onClick={() => setModalBlock(null)}>Close</button>
            </div>
            <div className="bb-modal-body">
              <pre>{BLOCK_EXAMPLES[modalBlock].content}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white font-bold text-xl">HyperPerfect</span>
          <div className="flex gap-8">
            <Link
              href="/help/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/help/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
