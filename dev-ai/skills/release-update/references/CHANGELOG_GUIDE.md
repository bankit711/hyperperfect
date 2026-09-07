# Changelog Writing Guide

Reference for writing new changelog entries in `/content/help/changelog.md`.

## Format

```markdown
## [1.0.XX]

### Feature Name (3–6 words, title case)
One sentence about what changed and why users care — written for the user, not the developer.

- **Bullet point label**: What it does, stated as a user benefit
- **Bullet point label**: Another capability, concise
- **Bullet point label**: ...

---
```

## Version Numbering

- Increment the patch version (1.0.X) by 1 for each meaningful user-visible feature group
- If multiple related features ship together, they can share one version entry
- Admin-only features, infrastructure changes, and internal refactors do NOT get changelog entries
- Current latest: check SESSION_LOG.md for last documented version

## Voice & Tone

**Avoid AI writing tells** — see `~/.claude/projects/-Users-davidingraham-hyperperfect/memory/WRITING_RULES.md` for the full list. Key ones: no em dashes, no "seamlessly/powerful/robust", no gerund-led bullets, no parallel structure overkill, no "this enables you to."

**Write for the user, not the engineer:**
- Good: "Your work doesn't stop when your trial ends."
- Bad: "Accounts transition to free tier upon trial expiration."

**Lead with the benefit:**
- Good: "See exactly how your AI usage is distributed day by day."
- Bad: "Daily usage breakdown has been added to Settings."

**Short, direct sentences.** No jargon. No passive voice.

**Section headline = feature name.** Sub-bullets = specific capabilities.
- Each bullet: `**Label**: Short description of what it does`
- 3–5 bullets per entry is typical
- Labels are nouns or noun phrases: "Daily Spend Table", "Auto-Compaction", "Cancel Button"

## What Gets a Changelog Entry

**Include:**
- New features the user can interact with
- Changed behavior users will notice (mode changes, model upgrades)
- New commands or capabilities (e.g., @compact, @mode)
- Significant UX changes

**Exclude:**
- Bug fixes (unless they fix something major and user-facing)
- Infrastructure / CI changes
- Admin dashboard features
- Performance improvements without visible behavior change
- Billing/pricing changes (mention in email if needed, but not changelog)

## Example Entry (Good)

```markdown
## [1.0.27]

### Custom Instructions
Teach HyperPerfect about your workflow and it will remember across every conversation.

- **Persistent Context**: Write instructions once and they're included in every AI request automatically
- **@settings Command**: Type `@settings` or use the settings button to open your preferences panel
- **Improve with AI**: Rough notes? Click "Improve with AI" to have Claude rewrite them into clear, well-structured instructions
- **Autosave**: Changes save automatically as you type — no save button needed

---
```

## File Location

`/Users/davidingraham/hyperperfect/content/help/changelog.md`

New entries go immediately after the opening `---` separator (after the intro line on line 8), before the first existing entry.
