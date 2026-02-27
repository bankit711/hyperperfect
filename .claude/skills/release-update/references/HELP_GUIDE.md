# Help Page Update Guide

Maps feature types to which help articles need updating.
All files are in `/Users/davidingraham/hyperperfect/content/help/`.

## Article Index

| File | Title | Category | Update Trigger |
|------|-------|----------|----------------|
| `quick-start.md` | Quick Start | Getting Started | New onboarding commands or first-session workflow changes |
| `why-hyperperfect.md` | Why HyperPerfect | Getting Started | Major new capabilities that change the value prop |
| `sign-up.md` | Sign Up | Getting Started | Changes to signup/trial/free tier |
| `excel-functionality.md` | Excel Functionality | Using HP | New Excel tools or operations (read, write, format, copy, etc.) |
| `ai-prompting.md` | AI Prompting | Using HP | New chat commands (@mode, @compact, @settings, etc.) |
| `credit-usage.md` | Credit Usage | Using HP | Billing changes, plan changes, free tier, usage visibility |
| `troubleshooting.md` | Troubleshooting | Using HP | New known issues or solutions |
| `data-security.md` | Data Security | Enterprise | Nothing typically |
| `enterprise-access.md` | Enterprise Access | Enterprise | Enterprise billing or auth changes |
| `changelog.md` | Changelog | Resources | Every release (handled in Phase 3) |

## Feature → Help Page Mapping

**New chat commands** (e.g., @compact, @mode, @settings, @clear):
→ Update `ai-prompting.md` — add the command to the commands reference section

**New Excel operations** (copy, move, delete, format, table, worksheet):
→ Update `excel-functionality.md` — add to the relevant capabilities list

**Model changes / Auto mode / Mode switching**:
→ Update `ai-prompting.md` — mode section

**Context management / compaction**:
→ Update `ai-prompting.md` — context section

**Billing / trial / free tier / pricing**:
→ Update `credit-usage.md` — plans and limits section

**Usage tracking / settings panel changes**:
→ Update `credit-usage.md`

**Subagents / background reasoning**:
→ Update `ai-prompting.md` — advanced features section (if user-visible)

**Extended context (1M tokens)**:
→ Update `ai-prompting.md` — mention as opt-in; update `credit-usage.md` if it affects costs

**Cancellation / abort**:
→ Update `troubleshooting.md` — mention cancel button behavior

**File attachments / vision**:
→ Update `ai-prompting.md` — file section

## Update Principles

1. **Minimal and surgical**: Add or update only what's affected. Don't rewrite working content.
2. **User-benefit framing**: Same voice as the changelog — feature name + what it does for the user.
3. **Commands in backticks**: `@settings`, `@compact`, `@mode`
4. **Don't duplicate changelog**: Help pages explain HOW to use features; changelog explains WHAT changed.
5. **If in doubt, skip**: Better to leave a help page as-is than add confusing half-documented content.

## Articles That Rarely Change

- `data-security.md` — Almost never, unless new data handling is introduced
- `enterprise-access.md` — Only for enterprise auth or provisioning changes
- `sign-up.md` — Only if trial length or free tier changes
- `why-hyperperfect.md` — Reserve for major capability milestones (e.g., subagents, extended context)

## What a Good Help Update Looks Like

Adding a new command to `ai-prompting.md`:
```markdown
### @compact
Compresses your conversation history when it gets long. Preserves workbook state and pending tasks.
Type `@compact` at any time, or wait for the automatic warning at 70% capacity.
```

Avoid: long paragraphs, repetition of changelog bullets, developer jargon.
