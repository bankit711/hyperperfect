---
title: "Managing Your Credits"
description: "Understand how credits work, what affects usage, and practical tips to get the most from your plan."
order: 5.5
category: "Using HyperPerfect"
---

Your HyperPerfect plan comes with a monthly credit allowance. Credits are the currency that powers every AI interaction — reading your data, generating formulas, running analyses, and more. Here's what you need to know.

## How Credits Work

### Monthly Reset

- Your credits reset on the same day each month (your billing anniversary)
- Unused credits don't roll over — use them or lose them
- You can check your current usage anytime in the billing section of your account settings

### Plan Tiers

Every plan includes the same features — the difference is how many credits you get each month. Credit capacity generally tracks the price of each tier, so a plan that costs twice as much gives you roughly twice the credits. Check the [pricing page](/pricing/) for current plans and prices.

The Free plan includes a small credit allowance for light exploration. New accounts start with a **free trial** that gives you roughly 5x the normal Free allowance for your first month — enough to seriously test the product before deciding on a plan.

If you run out mid-month, you'll need to wait for your reset or upgrade.

### What Uses Credits

- Every AI interaction costs credits — asking questions, generating formulas, analyzing data, formatting
- The amount depends on three things: (1) how much data the AI reads/writes, (2) which model is doing the work, and (3) how much thinking the AI does
- Larger datasets, more complex outputs, and harder problems that require more reasoning = more credits

## Memory and the Context Window

### How Memory Works

Every conversation with HyperPerfect has a **memory** — a running context of everything you've discussed, every piece of data the AI has read, and every response it's generated. Think of it like a whiteboard that both you and the AI are writing on.

Each message you send adds to that memory:
- Your prompt text
- Any spreadsheet data the AI reads
- The AI's response (including any formulas, analysis, or explanations)
- Cell formatting information (colors, borders, fonts)

As you work, the memory gradually fills up. HyperPerfect uses caching to keep costs efficient — older parts of the conversation are cached so you're not paying full price to re-process them every time. But a fuller memory still means more data for the AI to work with, so credit usage does increase gradually as the conversation grows.

### When to Reset

You can see your current memory usage in the HyperPerfect panel. If you're done with one task and starting something unrelated, use `@clear` to empty the memory. Starting fresh keeps things snappy and avoids carrying old context you no longer need.

When memory gets completely full, the AI will automatically compact older parts of the conversation to make room — but some earlier details may be summarized or dropped in the process.

### Subagents and Memory

For certain complex tasks, HyperPerfect uses **subagents** — separate AI processes that handle specific parts of a job (like reading a large table or running a multi-step analysis). Here's what you need to know:

- Subagents **do use credits** — they're doing real AI work
- Subagents **don't affect your memory bar** — they run in their own separate context and don't add to your main conversation's memory
- This means your credit usage for a message might be higher than what the memory bar alone would suggest, especially for complex tasks that spawn subagents

## Smart, Fast, and Auto Modes

### Fast Mode

- Uses our standard AI model (Sonnet)
- Great for everyday tasks: formulas, formatting, quick analysis
- Lower credit cost per interaction

### Smart Mode

- Uses our most capable AI model (Opus)
- Best for complex financial modeling, multi-step analysis, nuanced reasoning
- Uses roughly 1.5–2x more credits than Fast mode for the same task
- The AI also does more "thinking" in Smart mode — deeper reasoning that produces better results but costs more

### Auto Mode (Recommended)

- Automatically routes each request to the right model and effort level
- Simple requests (greetings, basic tasks) get handled cheaply with minimal thinking
- Complex requests get the full power of Smart mode with deep reasoning
- You get the best balance of quality and credit efficiency without thinking about it

### AI Thinking and Credits

The AI doesn't just read your input and spit out an answer — it **thinks**. For complex problems, it reasons through multiple approaches, considers edge cases, and plans its response before writing it. This thinking process uses credits too.

- Fast mode: Less thinking, lower cost
- Smart mode: More thorough thinking, higher cost
- Auto mode: Matches the thinking effort to the complexity of your request

This is why a simple "sum column B" costs much less than "build a financial model comparing three acquisition scenarios" — the second requires significantly more reasoning.

## Extended Memory Capacity

- By default, HyperPerfect works with a standard context window
- You can enable **Extended Memory Capacity** in your settings to give the AI roughly **5x the memory** of standard mode
- Great for very large datasets where you need the AI to see more of your data at once
- Uses approximately **2x more credits** than standard mode because the AI is processing more data per interaction
- Only enable it when you actually need to work with large datasets — turn it off for routine tasks to save credits

## Tips to Get More From Your Credits

### 1. Use Auto mode

Auto mode routes simple requests to cheaper models automatically. Tasks like generating a SUM formula, formatting a column, or sorting data rarely need a premium model. Save Smart mode for complex analysis, multi-step reasoning, or tasks where the AI keeps getting it wrong. If you're in Smart mode for everything, you're spending premium credits on tasks that don't need them.

### 2. Give the AI less data to read

The AI processes whatever you point it at — so give it only what it needs.

**Specify columns, not entire ranges:**

```
Instead of: "Analyze A1:Z500 and find revenue trends"

Try: "Analyze columns B (Revenue) and D (Region) in rows 1–500 — ignore the rest"
```

**Pre-filter large datasets in Excel first:**

Before sending a large dataset to the AI, use Excel's built-in tools to cut it down. Filter to the relevant date range, trim to the rows that matter, or copy the relevant subset to a new sheet.

```
Instead of asking the AI to analyze 50,000 rows of transactions to find
Q4 anomalies, filter to Q4 first, then ask the AI to analyze the filtered view.
```

### 3. Reference tables instead of raw ranges

```
Instead of: "Look at A1:F10000 and summarize sales by region"

Try: "Summarize the Region and Revenue columns in the SalesData table"
```

If your data is in an Excel Table (Insert > Table), reference the table name and specific columns. Tables give the AI clean, labeled, structured data instead of a raw grid of cells — less data to process, fewer credits consumed.

### 4. Skip formatting when you don't need it

```
Try: "Read the values in A1:D100 — skip cell formatting"
```

Every cell carries invisible baggage: fonts, colors, borders, conditional formatting rules. The AI reads all of it by default. If your task is about the numbers, not the appearance, telling it to skip formatting can meaningfully reduce the data the AI processes.

### 5. Be specific about what you want

```
Instead of: "Summarize the sales data"

Try: "Compare Q4 vs Q3 revenue by region in the Sales table and flag any region
      that dropped more than 10%"
```

The more precise your prompt, the less exploratory work the AI has to do, and the fewer credits it burns figuring out what you meant.

### 6. Tell the AI what format you want back

```
Try: "List the top 5 regions by revenue in a simple table — no charts, no explanations"
```

If you don't specify, the AI may produce a long narrative explanation, a formatted table, and follow-up suggestions — all of which cost credits to generate. Tell it exactly what output you want and what to skip.

### 7. Ask for formulas, not repeated AI work

If you need the same calculation across many rows, ask the AI to create a formula you can drag down — don't ask it to compute each row individually.

```
Try: "Write a formula for column E that calculates the year-over-year growth rate
      using columns C and D"
```

Then drag the formula down yourself. One AI request instead of one per row.

### 8. Break big tasks into focused steps

One massive prompt that tries to do everything at once forces the AI to hold more context (= more credits). Break it into smaller, focused requests — the total often costs less and produces better results.

```
Instead of:
"Clean the data in Sheet1, remove duplicates, standardize the date formats,
 then create a pivot summary by region and quarter, and add a chart"

Try breaking it up:
  1. "Remove duplicate rows in the Sales table"
  2. "Standardize column C to YYYY-MM-DD date format"
  3. "Create a pivot summary of revenue by Region and Quarter"
```

### 9. Reuse previous results

If the AI already summarized your data, reference that summary in follow-ups rather than pointing it back at the raw data. "Based on the summary you just created, which region grew fastest?" reuses what's already in context. Re-reading 50,000 rows from the sheet costs credits every time.

### 10. Clear your context between unrelated tasks

Use `@clear` to reset the conversation when switching to a completely different task. The AI carries forward everything from your conversation, and old context from a previous task inflates the cost of every subsequent message.

Don't clear mid-task, though — if you're still iterating on the same analysis, that context is working for you.
