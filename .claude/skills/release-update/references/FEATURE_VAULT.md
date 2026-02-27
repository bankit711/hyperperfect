# Feature Vault

Living document. One entry per shipped feature with confirmed value proposition.
Updated as part of every release-update session — drafted by AI, refined by David before anything gets written.

Entries are the source of truth for changelog entries, help page updates, and email campaigns.

---

## Format

```markdown
### [Version] Feature Name
**Shipped**: YYYY-MM-DD
**Status**: draft | confirmed

**What it does (technical)**:
One sentence, accurate description of the actual implementation.

**Who it's for**:
The specific user scenario where this matters most.

**The real value**:
Why this is actually useful — the pain it removes or the capability it unlocks. This is the hardest part to get right without domain knowledge.

**Best framing angle**:
The single sentence or concept that should lead any mention of this feature.

**Use cases**:
- Concrete example 1
- Concrete example 2

**What it's NOT**:
Common misunderstandings or ways to frame it that miss the point.

**Notes**:
Anything that should inform how we write about it.
```

---

## Features

---

### [1.0.31] Auto Mode
**Shipped**: 2026-02-21/22
**Status**: confirmed

**What it does (technical)**:
A classifier reads each incoming message and routes it to the optimal model and effort level. Also applies when the main agent deploys subagents — each subagent gets the right model for its specific task. Now the default mode. `@mode` cycles fast → auto → smart → fast.

**Who it's for**:
All users. Especially users who just picked one mode and stayed there because choosing felt overwhelming.

**The real value**:
Nobody else is doing this. There are now so many models and settings that users can't keep up — they just pick one and accept the tradeoff. Auto Mode solves this permanently: the right tool for the right job, every single time, for every request and every subagent. Maximizes performance, minimizes spend. Simple questions stay fast. Complex work gets full reasoning. The user never has to think about it.

**Best framing angle**:
HyperPerfect picks the right AI for each request. Fast where it can be, powerful where it needs to be.

**Use cases**:
- Quick formula question: handled fast, answered instantly
- "Build me a three-statement model": gets full reasoning and capability
- Building a complex model with agent teams: each specialist agent also gets the right model for its task
- User who always used Smart mode for everything: now saves credits on the simple stuff automatically

**What it's NOT**:
Don't mention model names (Haiku, Opus, Sonnet) to users — they don't know what those are and don't need to.

**Notes**:
Users who prefer manual control can still override with `@mode`. Auto is the new default for new conversations, not a locked setting.

---

### [1.0.32] Agent Teams
**Shipped**: 2026-02-22/24
**Status**: draft — needs David's review

**What it does (technical)**:
The main LLM agent can spawn parallel subagents via `DeploySubAgent`. Subagents run simultaneously under the main agent's coordination. Two modes: reasoning-only (analysis) and tool-using (can read/write Excel directly).

**Who it's for**:
Users working on complex, multi-part tasks — financial model builders, analysts with large multi-sheet workbooks, anyone asking HP to do something that has multiple independent components.

**The real value**:
*[David to confirm]* — Is the primary value speed (parallel = faster than sequential)? Or is it capability (can now tackle tasks too complex for a single agent)? Or is it about the quality of output (specialized agents do better work than one generalist)?

**Best framing angle**:
The main agent now coordinates a team. Complex tasks get split across specialists working in parallel.

**Use cases**:
- Building a three-statement model: one agent on Income Statement, one on Balance Sheet, one on formatting — all at once
- Analyzing a large dataset: one agent cleans data, another builds pivot summaries
- *[David to add more]*

**What it's NOT**:
Not "background tasks while you wait" — the agents are under the main agent's control, not running independently of it.

**Notes**:
This is the most technically significant feature in this batch. The email should probably lead with this or pair it with Auto Mode.

---

### [1.0.33] Extended Memory Capacity
**Shipped**: 2026-02-23
**Status**: confirmed (with open question — see below)

**What it does (technical)**:
Raises the memory limit to approximately 1M tokens (roughly 5x standard). Off by default, opt-in via `@settings`. Per-account, tier-gated.

**Who it's for**:
Users working on large, complex workbooks — multi-sheet financial models, big datasets, long analytical sessions where hitting the memory limit mid-work is a real interruption.

**The real value**:
Excel fills AI memory faster than almost any other use case. Every cell value, formula, format, and sheet the AI reads goes into memory. Add a back-and-forth conversation on top and standard limits are reached quickly. Extended memory lets users work through complex models without getting interrupted mid-session.

**Best framing angle**:
Lead with the problem: "HyperPerfect's memory fills up faster with Excel data than with almost any other kind of work. Extended Memory gives you room to finish the job."

**Use cases**:
- Multi-sheet financial model where HP needs to hold the full workbook in mind across a long session
- Large dataset analysis that keeps requiring re-reads of source data
- Complex modeling session that would previously have triggered `@compact` mid-stream

**What it's NOT**:
Do NOT say "1M tokens" or "context window" to users. Use "memory" and explain that Excel data fills it fast.

**UI behavior** (important for help page update):
- Memory indicator shows % of standard capacity in use
- When extended memory is on: once the user exceeds the standard limit, the indicator flips to measure against the larger capacity instead — showing they're now in extended mode
- Limited UI real estate; tooltips were planned to explain this to users

**Open question — TOOLTIP STATUS:**
David mentioned tooltips should explain the extended memory indicator behavior in the app.
It is NOT CLEAR whether these tooltips were actually shipped in HP7.
**Before publishing anything about this feature, confirm with David whether the tooltips are live.**
If not, this is a bug/missing feature that should be fixed before we tell users to look for it.

---

## Archive

Features with confirmed value props from previous sessions are moved here once their changelog/email/help content is published.

*(Empty — first session)*
