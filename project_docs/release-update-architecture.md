# Release-Update Skill: Full Architecture

## What It Is

A 6-phase, human-in-the-loop workflow that syncs new features shipped in the HP7 Excel add-in codebase into the HyperPerfect marketing site (changelog, help pages, and customer email campaigns).

## The Phases

```
Phase 0: Session Init     → Read state + reference files, report status
Phase 1: Discover          → Git log HP7 repo, group commits into features
Phase 1.5: Value Props     → Draft FEATURE_VAULT.md entries, get David's confirmation
Phase 2: Plan              → Propose what goes in changelog / help / email
Phase 3: Changelog         → Draft + write entries to content/help/changelog.md
Phase 4: Help Pages        → Surgical edits to relevant help articles
Phase 5: Email             → Draft → HTML build → Brevo campaign API → archive
Session End: Update logs   → SESSION_LOG.md + self-improve reference files
```

Every phase gates on David's approval before proceeding. Nothing gets written or sent without explicit confirmation.

---

## Control Points

1. **Phase 1** — Approve/reject the feature list discovered from HP7 commits
2. **Phase 1.5** — Confirm or correct value propositions (who it's for, real value, framing angle)
3. **Phase 2** — Decide what goes into changelog vs. help vs. email, version numbers, email angle
4. **Phase 3** — Review changelog draft before it's written
5. **Phase 4** — Approve help page edits page-by-page
6. **Phase 5** — Iterate on email copy, approve subject lines, review HTML output
7. **Brevo** — The skill creates a *draft* campaign only. Log in to Brevo to send test/broadcast. It never sends.

---

## The Reference File System (Self-Improving)

Seven files in `.claude/skills/release-update/references/` serve as the skill's institutional memory:

| File | Purpose | Updated When |
|---|---|---|
| `SESSION_LOG.md` | Tracks last run date, last version, pending items | Every session end |
| `CHANGELOG_GUIDE.md` | Writing rules for changelog entries | When writing feedback is given |
| `EMAIL_GUIDE.md` | Voice, structure, subject patterns for emails | When email copy is corrected |
| `HELP_GUIDE.md` | Maps features to help articles | When targeting changes |
| `FEATURE_VAULT.md` | Confirmed value props per feature (source of truth) | Phase 1.5 of each run |
| `PRODUCT_CONTEXT.md` | Positioning, framing rules (e.g. "memory" not "tokens") | When product framing evolves |
| `USER_CONTEXT.md` | User vocabulary, what they care/don't care about | When user understanding deepens |

The **self-improvement protocol** at session end applies feedback directly to the relevant reference file, so the next run benefits from corrections made in the current run.

---

## Connected Systems

```
┌─────────────────────┐
│  HP7 Git Repo        │  ← Source: git log for feature discovery
│  ~/hyperperfect7     │
└────────┬────────────┘
         │ Phase 1: read commits
         ▼
┌─────────────────────┐
│  release-update      │  ← Orchestrator: SKILL.md defines the workflow
│  .claude/skills/     │
│  release-update/     │
└──┬──────┬────────┬──┘
   │      │        │
   ▼      ▼        ▼
┌──────┐┌───────┐┌──────────────┐
│Change││Help   ││Email         │
│log   ││Pages  ││Pipeline      │
│      ││       ││              │
│content││content││assets/       │
│/help/ ││/help/ ││marketing_   │
│change ││*.md   ││emails/       │
│log.md ││       ││ .md + .html  │
└──────┘└───────┘│              │
                  │ Brevo API    │
                  │ (campaign    │
                  │  draft only) │
                  └──────────────┘

┌─────────────────────┐
│  pre-commit-review   │  ← QA gate: validates content before commit
│  .claude/skills/     │     (frontmatter, writing rules, build, email HTML)
│  pre-commit-review/  │
└─────────────────────┘

┌─────────────────────┐
│  MEMORY.md +         │  ← Persistent context: writing rules, feature status,
│  WRITING_RULES.md    │     product insights carry across all conversations
└─────────────────────┘
```

---

## How Claude Code Components Apply

### Skills System
The skill is auto-discovered from `.claude/skills/release-update/SKILL.md`. No config needed in settings. Invoked by saying "release update" or similar, and the Skill tool loads the full SKILL.md as instructions.

### Memory System
`MEMORY.md` carries forward writing rules, feature status, and product insights. The skill's reference files are a parallel memory system scoped to this workflow. Both persist across conversations.

### Settings
`.claude/settings.local.json` grants permissions for `git push`, `npm run build/deploy`, and `cp` commands the workflow needs. WebFetch is restricted to `help.brevo.com` only.

### Pre-Commit Skill
Acts as a quality gate. After release-update writes content, run pre-commit review to validate frontmatter, check writing rules compliance, verify the build passes, and audit email HTML templates before committing.

---

## Current State (as of last run: 2026-02-27)

- Changelog at **v1.0.33** (Auto Mode, Agent Teams, Extended Memory added)
- Help page `credit-usage.md` updated
- Email drafted in Brevo (campaign ID 33) but **pending send** (blocked on BREVO_CAMPAIGNS_API_KEY needing Marketing permissions)
- Feature Vault has 3 entries: Auto Mode (confirmed), Agent Teams (draft, needs review), Extended Memory (confirmed)
