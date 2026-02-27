# HyperPerfect Product Context

Key product insights for framing features accurately when writing changelog entries, help pages, and emails.

## Why Context Window Size Matters More for Excel Than Anything Else

AI has a finite memory (context window). Excel data fills it fast.

A single spreadsheet can have thousands of rows, dozens of columns, multiple sheets, formulas referencing other formulas. When the AI reads your workbook to help you, that data consumes context. Add a long back-and-forth conversation on top of it and you hit limits that would never come up in a typical chat tool.

**This is why 1M token extended context is a bigger deal for HyperPerfect users than it is for almost any other AI product.** The use case is uniquely demanding. Users working on complex financial models, large datasets, or multi-sheet workbooks are exactly the people who will hit context limits — and they're exactly the people who need the AI to hold everything in mind at once to give good answers.

When writing about extended context: lead with the Excel-specific problem, not the token count.
- Good: "Large workbooks and long sessions no longer run out of room."
- Bad: "Conversations can now hold up to 1M tokens."

## Core Product Positioning

HyperPerfect is AI that lives inside Excel and actually understands your data. The key differentiators:
- Reads and writes real Excel cells, not just talks about spreadsheets
- Works with large real-world datasets (500K+ rows)
- Remembers the full conversation and workbook state while working
- Handles the complexity that general AI assistants can't (formulas, formatting, multi-sheet operations)

## Feature Framing Notes

**Auto Mode**: The benefit isn't "smart routing" — it's that users no longer have to think about modes at all. Simple requests get fast answers without waiting for a heavy model to spin up.

**Agents (Parallel Subagents)**: The main agent is now an orchestrator. It can break a complex task into parts and deploy specialized agents to work each part in parallel, then synthesize the results. This is not a background convenience — it's a fundamentally different way of tackling complex work.

The canonical example: building a financial model. One agent works on the Income Statement, another on the Balance Sheet, another checks formatting. They run simultaneously under the main agent's coordination. Work that would be sequential becomes parallel.

Frame around the team metaphor and what it unlocks for complex spreadsheet work. Do NOT frame it as "background tasks while you wait."

**Extended Context**: See above. Frame around the Excel-specific problem.
