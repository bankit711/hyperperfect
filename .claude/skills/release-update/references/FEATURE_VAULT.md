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
**Status**: confirmed

**What it does (technical)**:
The main LLM agent can spawn parallel subagents via `DeploySubAgent`. Subagents run simultaneously under the main agent's coordination. Two modes: reasoning-only (analysis) and tool-using (can read/write Excel directly).

**Who it's for**:
Users working on complex, multi-part tasks — financial model builders, analysts with large multi-sheet workbooks, anyone asking HP to do something that has multiple independent components.

**The real value**:
Specialized agents protect the main agent's context window. Each agent works in its own context, reports back only what's relevant. This is critical for Excel, where workbook data fills context fast. Agents also enable parallel work and specialization.

**Best framing angle**:
The main agent coordinates a team of specialists. Each one works in its own context, protecting the main conversation from information overload.

**Use cases**:
- Building a three-statement model: one agent on Income Statement, one on Balance Sheet, one on formatting
- Data scouts: send agents to explore different parts of a workbook, each reports back only what matters
- Analyzing a large dataset: one agent cleans data, another builds pivot summaries

**What it's NOT**:
Not "background tasks while you wait" — the agents are under the main agent's control, not running independently of it.

**Notes**:
Context window protection is the key differentiator for Excel users. Lead with that, not with "parallel speed."

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

### [1.0.34] Custom Agents
**Shipped**: 2026-03-13
**Status**: confirmed

**What it does (technical)**:
Users create their own agent specializations with custom names, system prompts, tool access, model preferences, and effort settings. Built-in Data Scout agent explores sheet structure and reports back concisely.

**Who it's for**:
Power users who want specialized AI teammates. Anyone working with large, complex workbooks where context window management matters.

**The real value**:
Custom agents work in their own context window. They bring specialized capability into a conversation without clouding the main agent's memory. In Excel, where data fills context fast, this is a game-changer. You can send out scouts to explore different parts of a workbook, and they report back only what the main agent needs.

**Best framing angle**:
Build your own AI specialists. Each one works in its own context, so the main AI stays focused on your task.

**Use cases**:
- Data Scout: sends agents to map out a workbook's structure before the main agent starts working
- Multiple scouts exploring different sheets simultaneously, each reporting back only relevant findings
- A formatting specialist, a data validator, a model auditor -- each with its own instructions
- Fine-tune quality and effort settings per agent for cost control

**What it's NOT**:
Not just "saved prompts with a name." Custom agents have their own context window, tools, and model settings. That's the key difference from custom prompts.

**Notes**:
Data Scout is the best example of why agents matter. Use it as the lead example. Quality/effort controls are part of this feature.

---

### [1.0.35] Rule Sets & Global Preferences
**Shipped**: 2026-03-19
**Status**: confirmed

**What it does (technical)**:
Named rule sets with customizable preferences that persist across conversations. LLM manages them via ManageRules tool. Inline rename support. Global preferences apply to every conversation.

**Who it's for**:
Users who want consistent AI behavior -- formatting standards, industry terminology, output preferences, analytical frameworks.

**The real value**:
Teach the AI your rules once. It follows them every time, in every conversation. No more repeating instructions.

**Best framing angle**:
"Teach HyperPerfect your rules once. It follows them every time."

**Use cases**:
- Formatting standards: "Always use accounting number format, bold headers, freeze top row"
- Industry terminology: "When I say 'LBO' I mean leveraged buyout. Use standard PE terminology."
- Output preferences: "Always show formulas in a separate column. Include source references."

**What it's NOT**:
Not the same as custom prompts (which are on-demand context). Rules are always active.

---

### [1.0.36] Plan Mode
**Shipped**: 2026-03-19/25
**Status**: confirmed

**What it does (technical)**:
`@plan` enters a planning mode with read-only tools. Users build step-by-step plans, drag-and-drop to reorder, then `@execute` runs the plan with a compacted context. Plans can reference custom prompts, custom agents, and rules. Optional retrospective step reviews efficiency after execution.

**Who it's for**:
Users tackling complex, multi-step projects. Anyone who does recurring analytical work (monthly reports, quarterly models, regular data processing).

**The real value**:
Control and repeatability. Plan the work before the AI touches your spreadsheet. Reuse plans for recurring tasks. Plans work with custom prompts, agents, and rules to create a full workflow engine.

**Best framing angle**:
"Map out complex work before the AI starts. Reuse plans for recurring tasks like monthly reports."

**Use cases**:
- Monthly financial report: plan the steps once, reuse every month
- Three-statement model build: plan structure, assign agents to each statement, execute
- Large data restructuring: plan the moves, review the approach, then let the AI execute in order
- Combine with custom prompts for step-specific instructions and custom agents for specialized work

**What it's NOT**:
Not just a to-do list. Plans integrate with the full AI control suite (prompts, agents, rules) and execute with a fresh, focused context.

**Notes**:
Part of the broader "AI Control" theme. Plans are the orchestration layer that ties everything together.

---

### [1.0.37] File Library
**Shipped**: 2026-03-12/25
**Status**: confirmed

**What it does (technical)**:
Persistent file storage with PDF extraction, XLSX sheet insertion, and image vision. Files persist across conversations. AI agent can access files on demand.

**Who it's for**:
Users who want to build an organized reference library -- templates, policy docs, reference data, prior reports.

**The real value**:
Build a brain for your AI. Upload templates, reference documents, and prior work. The AI can read through them, understand how you like to work, and follow your patterns. Fill out forms, follow templates, reference prior analyses.

**Best framing angle**:
"Upload your reference files once. The AI learns your templates, your formats, your way of working."

**Use cases**:
- Upload a report template, then ask the AI to fill it out with new data
- Store policy documents the AI references when building compliance-related analyses
- Keep prior quarter reports so the AI can match formatting and structure
- Upload images or PDFs the AI can read and extract data from

**What it's NOT**:
Not just file storage. The AI reads and understands the files, then uses them to improve its work.

---

### [1.0.38] Custom Prompts
**Shipped**: 2026-03-25
**Status**: confirmed

**What it does (technical)**:
Reusable prompts created by users, invoked with `@prompt_name`. Content pre-loads inline into the conversation. Can combine with files and agent settings. Quality/effort overrides per prompt.

**Who it's for**:
Users who do recurring analyses or want quick access to specific context and instructions on demand.

**The real value**:
A quick way to bring context into the chat, on demand. Unlike rules (always active) or agents (separate context window), prompts inject specific instructions and context directly into the main agent's conversation when you need them.

**Best framing angle**:
"Bring the right context into any conversation with one command."

**Use cases**:
- `@monthly-close`: loads instructions for your month-end reconciliation process
- `@variance-analysis`: loads your preferred variance analysis framework and formatting
- Combine with files: a prompt that references specific templates or reference documents
- Fine-tune quality/effort settings per prompt for cost control

**What it's NOT**:
Not the same as custom agents (which have their own context window). Prompts bring context into the main conversation.

**Notes**:
Position as the lightweight, on-demand counterpart to agents (own context) and rules (always on).

---

### [1.0.39] Full Excel Control
**Shipped**: 2026-03-25
**Status**: confirmed

**What it does (technical)**:
The AI can now execute arbitrary Office.js code, unlocking any Excel operation that the API supports. Previously limited to read/write/format operations.

**Who it's for**:
Everyone. Any user who has ever asked HyperPerfect to do something and been told it couldn't.

**The real value**:
The ceiling is gone. Tables, pivot tables, charts, conditional formatting, named ranges, data validation, sparklines -- anything Excel can do programmatically, HyperPerfect can now do. This is a fundamental expansion of what's possible.

**Best framing angle**:
"HyperPerfect can now do anything in Excel. Tables, charts, pivot tables, conditional formatting -- the sky's the limit."

**Use cases**:
- Create pivot tables from raw data
- Build charts and visualizations
- Apply conditional formatting rules
- Create data validation dropdowns
- Build named ranges and dynamic formulas
- Any Excel operation users have been asking for

**What it's NOT**:
Don't call it "execute_office_js" or reference the technical implementation. Users just see that more things work now.

**Notes**:
This is one of two headline features for the email. Frame as a capability explosion, not a technical change.

---

## Archive

Features with confirmed value props from previous sessions are moved here once their changelog/email/help content is published.

*(Empty — first session)*
