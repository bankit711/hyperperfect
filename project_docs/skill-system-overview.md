# Claude Code System Architecture

A multi-project AI development environment built on Claude Code. Context files define agent behavior. Rules scope instructions to file types. Skills define repeatable workflows. Agents handle specialized subtasks with persistent memory. Hooks automate knowledge capture. Self-improvement loops compound across sessions.

---

## Session Lifecycle

### What loads at startup

Before any interaction, Claude Code auto-loads context from three scopes:

```
SESSION START
═════════════

  ~/.claude/CLAUDE.md                         (global)
  ├── Git commit conventions
  ├── Development workflow (spec-first, TDD)
  ├── Security, performance preferences
  ├── Knowledge management (/retro workflow)
  └── MCP server configuration

  ~/.claude/rules/*.md                        (global, conditional)
  ├── code-quality.md    → paths: **/*.{ts,tsx,js,jsx,py}
  ├── testing.md         → paths: **/*.test.*, **/*.spec.*, **/test_*
  ├── documentation.md   → paths: **/*.md
  └── planning.md        → paths: docs/**

  <project>/CLAUDE.md                         (project)
  ├── What this project is
  ├── Build/test/deploy commands
  ├── Architecture overview
  └── Project-specific conventions

  <project>/.claude/rules/*.md                (project, conditional)
  └── Loaded only when editing files matching paths: patterns

  memory/MEMORY.md                            (auto memory)
  ├── Key files and patterns
  ├── Feature status
  └── Pointers to topic files
```

Rules load conditionally based on which files are being edited. Everything else loads unconditionally.

### Hooks: automated session events

Four hooks fire at lifecycle points:

```
SessionStart (async)
  └── session-start.sh
      ├── Report knowledge asset counts (skills, rules, agents, topics)
      ├── Check MEMORY.md budget (warn >120, alert >150 lines)
      └── Flag stale diary entries (>14 days)

PostToolUse (async, on Write/Edit/NotebookEdit)
  └── post-tool-use.sh
      └── Append modified file path to .dirty-files

PreCompact
  └── pre-compact.sh
      └── Create diary entry from current dirty files before context compression

SessionEnd
  └── session-end.sh
      ├── Read .dirty-files + diary entries
      ├── Spawn Haiku subagent for synthesis
      ├── Write gate: "Would knowing this change future behavior?"
      ├── Route insights to MEMORY.md or topics/
      └── Clear .dirty-files, update .last-hook-sync
```

The PostToolUse → PreCompact → SessionEnd pipeline ensures no knowledge is lost, even when sessions are interrupted or context is compressed mid-conversation.

### Knowledge hierarchy

| Level | Location | Auto-loaded? | Budget | Purpose |
|-------|----------|-------------|--------|---------|
| L0 | `~/.claude/CLAUDE.md` | Yes | <150 lines | Global preferences, workflow rules |
| R0 | `~/.claude/rules/*.md` | Conditional | <40 lines each | File-type-specific rules (loaded by paths: match) |
| P0 | `<project>/CLAUDE.md` | Yes | No limit | How the project works (checked into repo) |
| R1 | `<project>/.claude/rules/*.md` | Conditional | <40 lines each | Project-specific coding rules |
| L1 | `memory/MEMORY.md` | Yes | <150 lines | Project index: summaries + pointers |
| L2 | `memory/topics/<topic>.md` | No | <300 lines | Deep knowledge, read on demand |
| S0 | `.claude/skills/<skill>/SKILL.md` | On trigger | <500 lines | Skill definitions |
| A0 | `.claude/agents/<agent>.md` | On delegation | No limit | Subagent instructions |

---

## Global vs Project Scope

Every configuration type exists at two levels. Project-level overrides global when names match.

```
~/.claude/                              <project>/.claude/
├── CLAUDE.md          (global)         ├── CLAUDE.md          (project, in repo root)
├── rules/             (global)         ├── rules/             (project)
├── skills/            (global)         ├── skills/            (project)
├── agents/            (global)         ├── agents/            (project)
├── settings.json      (global)         └── settings.local.json (project)
└── scripts/hooks/     (global)
```

### Override behavior

| Type | Same name at both levels | Result |
|------|--------------------------|--------|
| Rules | Both load (additive) | Both apply when paths match |
| Skills | Project wins | Global skill with same name is hidden |
| Agents | Project wins | Global agent with same name is hidden |
| Settings | Merged | Project settings.local.json extends global |

This is intentional. Global agents provide generic behavior; project agents override with specialized knowledge. Example: the global `senior-engineer-reviewer` handles any project, but HP7's version knows about Office.js, HTMX, and sqlc.

---

## Agents

Subagents are specialized Claude instances invoked via the Task tool. Each has its own instructions, can use tools, and optionally maintains persistent memory across sessions.

### Global agents (`~/.claude/agents/`)

| Agent | Model | Memory | Purpose |
|-------|-------|--------|---------|
| `senior-engineer-reviewer` | opus | user | Code reviews: architecture, security, performance, CLAUDE.md alignment |
| `documentation-updater` | opus | user | Sync docs with code changes, maintain CLAUDE.md hierarchy |

Both use `memory: user` scope, which stores learnings at `~/.claude/agent-memory/<name>/`. They accumulate patterns across all projects over time.

### HP7 project agents (`hyperperfect7/.claude/agents/`)

| Agent | Model | Memory | Purpose |
|-------|-------|--------|---------|
| `senior-engineer-reviewer` | opus | -- | Override: HP7-specific review (Office.js, HTMX, sqlc) |
| `documentation-updater` | opus | -- | Override: HP7-specific doc hierarchy |
| `python-code-verifier` | -- | -- | Test, typecheck, lint, format gauntlet for Python |
| `python-test-author` | -- | -- | Write/fix Python tests (pytest, Faker, mocking) |
| `javascript-code-verifier` | -- | -- | Verification gauntlet for etool/ JS code |
| `javascript-test-author` | -- | -- | Write/fix JS tests (Bun test patterns) |
| `excel-api-expert` | -- | -- | Office.js features, Excel API debugging |
| `excel-api-expert-haiku` | haiku | -- | Lightweight Excel API questions |
| `prompt-engineer` | -- | -- | System prompt analysis/improvement |
| `prompt-engineer-haiku` | haiku | -- | Lightweight prompt questions |

### Agent memory scopes

| Scope | Location | Use when |
|-------|----------|----------|
| `user` | `~/.claude/agent-memory/<name>/` | Cross-project learning (global agents) |
| `project` | `.claude/agent-memory/<name>/` | Project-specific, shared via git |
| `local` | `.claude/agent-memory-local/<name>/` | Project-specific, gitignored |

When `memory` is set, the agent gets a persistent `MEMORY.md` (first 200 lines injected at startup) plus Read/Write/Edit access to its memory directory.

---

## Skills

### Inventory

**Global skills** (`~/.claude/skills/`):

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `retrospective` | `/retro` | Extract session insights, route to knowledge files, compact |
| `project-setup` | `/project-setup` | Bootstrap or audit project `.claude/` structure |
| `update-docs` | `/update-docs` | Audit and sync all documentation with codebase |
| `update-skills` | `/update-skills` | Audit SKILL.md files for drift from code |
| `writing-agent-skills` | Auto | Quality standard for authoring skills |
| `python-code-review` | Auto | Review Python code against project standards |
| `python-code-verify` | Auto | Python verification gauntlet |
| `linear-project-management` | Auto | Manage Linear issues/projects via MCP |
| `warp-terminal` | Manual only | Warp terminal workflows (disable-model-invocation: true) |

**HyperPerfect marketing site skills** (`hyperperfect/.claude/skills/`):

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `release-update` | Auto | Sync marketing site with HP7 features: changelog, help, email |
| `pre-commit-review` | "review", "pre-commit" | Content quality: frontmatter, writing rules, build, email templates |

**HP7 project skills** (`hyperperfect7/.claude/skills/`):

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `pre-commit-review` | Manual only | 7-phase code review: architecture, quality, docs, tests, CI |
| `excel-online-testing` | Auto | Excel Online sideload and test workflow |

### Skill anatomy

```
.claude/skills/<skill-name>/
├── SKILL.md                   # Frontmatter + instructions (<500 lines)
└── references/                # Optional: deep guidance, loaded on demand
    ├── GUIDE_A.md
    └── GUIDE_B.md
```

Frontmatter:
```yaml
---
name: skill-name
description: When and how to use this skill
disable-model-invocation: true|false   # Manual-only vs auto-trigger
argument-hint: "[optional args]"
---
```

---

## Rules

Rules are conditional instructions loaded only when editing files that match their `paths:` patterns.

### Global rules (`~/.claude/rules/`)

| Rule | Paths | Focus |
|------|-------|-------|
| `code-quality.md` | `**/*.{ts,tsx,js,jsx,py}` | Code style, type safety, error handling |
| `testing.md` | `**/*.test.*`, `**/*.spec.*`, `**/test_*` | TDD workflow, test naming |
| `documentation.md` | `**/*.md` | Doc conventions, update protocol |
| `planning.md` | `docs/**` | Feature specs, temp plans |

### HP7 project rules (`hyperperfect7/.claude/rules/`)

| Rule | Paths | Focus |
|------|-------|-------|
| `code-comments.md` | `**/*.{py,js,ts}` | Never write code comments; self-documenting code only |

Rule file format:
```yaml
---
paths:
  - "pattern/**/*.ext"
---

# Rule Title
- Instruction bullets
```

---

## Knowledge Management

### Three capture paths

```
                          ┌── Manual: /retro (comprehensive, end of session)
Session insights ─────────┤
                          ├── Automatic: SessionEnd hook (lightweight, every session)
                          │
                          └── Within-skill: Loop 1 feedback (immediate, during workflows)
```

### /retro (retrospective skill)

Runs at end of productive sessions. Four phases:

1. **Extract** — scan conversation for multi-attempt solutions, API quirks, user preferences, debugging discoveries, architectural decisions
2. **Route** — decision tree: global preference → suggest CLAUDE.md edit; project insight → auto-edit MEMORY.md or topic file; skill change → suggest SKILL.md edit
3. **Compact** — enforce budgets (MEMORY.md: 120/180 lines, topics: 200/300), deduplicate against CLAUDE.md, prune stale entries
4. **Report** — summary of what was captured, where it went, file sizes before/after

### SessionEnd hook (automatic)

Fires every session. Lighter than /retro:
- Reads `.dirty-files` (accumulated by PostToolUse hook)
- Reads diary entries (created by PreCompact hook)
- Spawns Haiku subagent with write gate: "Would knowing this change future behavior?"
- Routes passing insights to MEMORY.md or topics/
- 30-minute cooldown between syntheses

### Loop 1: within-skill feedback

During gated workflows (like release-update), corrections at approval gates are written back to the skill's reference files immediately. This improves the current run AND all future runs.

---

## Self-Improvement System

### writing-agent-skills (quality standard)

Governs any edit to skill files, whether from /retro, Loop 1, or manual updates:
- Context window is a shared resource; challenge each line
- Progressive disclosure: metadata loads at startup, reference files on demand
- Pointers over copies: reference code by file:line, not embedded snippets
- SKILL.md stays under 500 lines; deep guidance in `references/`

### How the loops connect

```
                    writing-agent-skills
                    (quality standard)
                           │
              governs any edit to skill files
                           │
         ┌─────────────────┼─────────────────┐
         ▼                                   ▼
   Loop 1: Within-session             Loop 2: /retro + hooks
   (gate feedback → fix               (end of session →
    reference files + SKILL.md)        knowledge hierarchy)
         │                                   │
         ▼                                   ▼
   Skill reference files              MEMORY.md, CLAUDE.md,
   improve for next run               topic files, SKILL.md
         │                                   │
         └───────── Session N+1 loads improved context ─┘
```

Loop 1 improves skill reference files (narrow scope).
Loop 2 improves agent knowledge (broad scope).
SessionEnd hook captures lightweight insights automatically.
All three compound over time. Each session is better than the last.

---

## Project Inventory

### HyperPerfect marketing site (`/Users/davidingraham/hyperperfect`)

Next.js static site deployed to www.hyperperfect.ai via GitHub Pages. Marketing and docs for the Excel add-in.

- **Skills**: release-update (feature sync workflow), pre-commit-review (content quality)
- **No project agents** (uses globals)
- **No project rules** (uses globals)

### HyperPerfect7 Excel add-in (`/Users/davidingraham/hyperperfect7`)

Python server + JavaScript Excel add-in (Office.js). HTMX frontend, SSE tool orchestration, sqlc database layer.

- **Agents**: 10 project-level (2 override globals, 8 project-specific)
- **Skills**: pre-commit-review (7-phase code review), excel-online-testing
- **Rules**: code-comments.md (no inline comments)

### Other projects

LinkedIn, Sales, Typefully each have their own `.claude/` configurations with project-specific skills and CLAUDE.md files. Global rules, agents, and skills apply to all.

---

## Project Setup (`/project-setup`)

Global skill for bootstrapping or auditing any project's `.claude/` directory.

### Init mode

Creates in order: CLAUDE.md, rules/, skills/, settings.local.json, agents/. Asks about project context before generating. References global config to avoid duplication.

### Audit mode

Checks structure (CLAUDE.md exists, rules use `paths:` not `globs:`, agents have frontmatter), content (commands documented, rules under 40 lines, agent overrides are intentional), and drift (globs match real files, commands still work, no stale references).

### Docs-first approach

Always fetches latest Claude Code documentation before making recommendations:
- code.claude.com/docs/en/memory
- code.claude.com/docs/en/skills
- code.claude.com/docs/en/settings
- code.claude.com/docs/en/hooks (if relevant)
- code.claude.com/docs/en/sub-agents (if relevant)

---

## Release-Update Skill (HyperPerfect-specific)

Syncs the marketing site with features shipped in HP7. One skill, three outputs: changelog entries, help page updates, customer email campaign.

### Reference files

| File | Phase | Role |
|------|-------|------|
| `SESSION_LOG.md` | Phase 0 | State: last run date, last version, email status |
| `PRODUCT_CONTEXT.md` | Phase 1 | Excel-specific framing guidance |
| `USER_CONTEXT.md` | Phase 1.5 | Language rules: no model names, no jargon |
| `FEATURE_VAULT.md` | Phases 3-5 | Single source of truth for all outputs |
| `CHANGELOG_GUIDE.md` | Phase 3 | Changelog style, format, voice |
| `HELP_GUIDE.md` | Phase 4 | Feature-to-help-article mapping |
| `EMAIL_GUIDE.md` | Phase 5 | Email tone, HTML template, Brevo setup |

### Workflow

```
Phase 0: Init → read state, report status
    ↓
Phase 1: Discover → HP7 git log → group by feature
    ↓ [GATE]
Phase 1.5: Value Props → draft per feature → FEATURE_VAULT
    ↓ [GATE]
Phase 3: Changelog → CHANGELOG_GUIDE → changelog.md
    ↓ [GATE]
Phase 4: Help Pages → HELP_GUIDE → content/help/*.md
    ↓ [GATE]
Phase 5: Email → EMAIL_GUIDE → .md/.html → Brevo draft
    ↓ [GATE]
Phase 6: Pre-commit review (content quality validation)
    ↓ [GATE]
Final: Deploy to GitHub Pages, update SESSION_LOG
```

Human gates between every phase. Nothing ships without approval.

### Data flow

```
HP7 git log → FEATURE_VAULT → ┬── CHANGELOG_GUIDE → changelog.md
                               ├── HELP_GUIDE     → help/*.md
                               └── EMAIL_GUIDE     → email .md/.html → Brevo
```

---

## Meta Skills (Global)

### update-docs

Audits all documentation for drift, gaps, and staleness. Discovers docs dynamically (globs for CLAUDE.md, SKILL.md, docs/, project_docs/, content/). Updates flow top-down: Schema/API (Tier 1) > CLAUDE.md (Tier 2) > SKILL.md (Tier 3) > MEMORY.md (Tier 4).

### update-skills

Audits SKILL.md files against actual code. Three parallel tracks: Code Drift (documented vs actual), Best Practices (writing-agent-skills compliance), Completeness (undocumented capabilities). Findings prioritized: DRIFT > STALE > GAP > PRACTICE.

---

## Enabled Plugins

| Plugin | Source | Purpose |
|--------|--------|---------|
| `code-simplifier` | claude-plugins-official | Review changed code for reuse, quality, efficiency |
| `frontend-design` | claude-plugins-official | Production-grade frontend interfaces |
| `context7` | claude-plugins-official | Additional context capabilities |
