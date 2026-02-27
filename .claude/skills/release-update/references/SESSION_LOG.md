# Release Update Session Log

Tracks every run of the release-update skill. Used by Phase 0 to know where to pick up.

## State

- **Last run date**: 2026-02-27
- **Last version documented in changelog**: 1.0.33
- **Last email sent**: pending (Brevo draft ready, needs `BREVO_CAMPAIGNS_API_KEY` with Marketing permissions)

---

## Session History

### 2026-02-27

**HP7 commits reviewed**: 2026-02-19 through 2026-02-24
**New changelog versions**: v1.0.31 through v1.0.33 (3 entries)
**Help pages updated**: `credit-usage.md` (Extended Memory section, Subagents→Agent Teams, mode descriptions)
**Email drafted**: "HyperPerfect now picks the right AI for every task" | **Sent**: pending
**Notes**: First run. Built the skill from scratch this session. Key process additions: FEATURE_VAULT.md, USER_CONTEXT.md, PRODUCT_CONTEXT.md, full Brevo HTML email workflow. One blocker: `BREVO_CAMPAIGNS_API_KEY` needs to be added to `.env.local` with Marketing permissions before campaign API calls work (current key is CRM-sync only).

---

## Session Format

Each session should be appended here:

```
### YYYY-MM-DD

**HP7 commits reviewed**: [date range]
**New changelog versions**: [v1.0.XX – v1.0.YY] ([N] entries)
**Help pages updated**: [list or "none"]
**Email drafted**: [subject line] | **Sent**: [yes/no/pending]
**Notes**: [anything notable — features skipped and why, process issues, what worked]
```

---

## Pending Features (to document on first run)

These HP7 features shipped after v1.0.30 and need changelog entries:

| Feature | HP7 Commit(s) | Date | Notes |
|---------|--------------|------|-------|
| Auto Mode (Haiku classifier, now default) | feat(classifier), feat(config) | 2026-02-21/22 | Routes messages to Fast/Power/Auto automatically |
| Announcement banner | feat(announcements) | 2026-02-21 | In-app dismissable banners |
| Background reasoning subagents | feat(subagent) | 2026-02-22 | DeploySubAgent tool, runs in background |
| Tool-using subagents | feat(subagent) | 2026-02-24 | Subagent can use Excel tools directly |
| Extended context (1M tokens) | feat(context) | 2026-02-23 | Per-account opt-in, tier gated |
| Long-context cost multipliers | feat(costs) | 2026-02-24 | 1.25x Sonnet, 2x Opus for long contexts |
| Session sliding expiry | feat(auth) | 2026-02-21 | Keeps active users logged in |

**Likely user-facing for changelog**: Auto Mode, subagents (both), extended context
**Likely internal only**: Announcement banner (infrastructure), cost multipliers (billing backend), session expiry
**Confirm with David** during Phase 2.
