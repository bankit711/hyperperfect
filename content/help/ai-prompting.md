---
title: "AI Prompting Tips"
description: "Simple tips to make your Excel analysis requests work better and get dramatically better results."
order: 5
category: "Using HyperPerfect"
---

Working with AI for Excel analysis doesn't have to be complicated. With a few simple techniques, you can get dramatically better results — solutions that are more accurate, easier to understand, and actually solve your business problems.

## The Basics: Better Requests Get Better Results

### 1. Always Ask for Options

Instead of asking for one solution, ask AI to give you multiple approaches and explain the trade-offs.

```
Instead of: "Create a revenue summary"

Try this: "Give me two different ways to create this revenue summary.
Tell me the pros and cons of each approach and which one you'd recommend."
```

**Why it helps:** You'll understand your options and can pick the approach that fits your specific needs.

### 2. Request Step-by-Step Reasoning for Complex Problems

For complex tasks, explicitly ask AI to show its reasoning process.

```
For simple tasks: Just describe what you need clearly
For complex problems: "Show your reasoning step by step as you..."
For multi-step challenges: "Explain your thought process and validate each step before..."
```

### 3. Ask AI to Test Its Own Work

Before implementing the main solution, ask AI to create "check" formulas that verify everything adds up correctly.

```
"After building the revenue summary, create test cells that verify:
- Total revenue in source data equals total in summary table
- All customers are included
- Date ranges are captured properly
If the test verifications don't pass, find the root cause of the problem."
```

### 4. Get the Plan First

Ask AI to explain its approach before diving into implementation.

```
"Create a detailed plan for this Excel transformation.
Don't implement anything yet — I want to review the approach first."
```

### 5. Speak Up If Things Go Wrong

Don't let AI continue down the wrong path. Jump in and redirect whenever needed.

```
"Stop. I see you're creating a pivot table, but I actually need
formulas I can see and modify."

"Hold on — implement just the header row first so I can check
the layout before you continue."
```

---

## Making Your Solutions Business-Ready

### 6. Always Emphasize Flexibility

Make sure your Excel solutions can be easily modified and understood by others.

Include these in your requests:
- **"Fully auditable"** - others can trace your logic
- **"Not hardcoded"** - works with different data
- **"Adjustable"** - easy to modify later

### 7. Clear Your Context Regularly

During long work sessions, use `@clear` to start fresh between major tasks.

### 8. Ask for Double-Checking

```
"Double-check all your logic and explain your verification process,
then create the formulas."
```

### 9. Break Big Projects into Steps

```
"This is a complex dashboard project. Create a detailed checklist
of everything that needs to be done, then we'll work through it
step by step."
```

### 10. Tell the Purpose and Ask for the "How"

Instead of telling HyperPerfect exactly what to do, ask the AI how they would create the solution.

```
"Create a parameter control section where I can toggle different
revenue components on and off, then reference those settings
in your formulas."
```

---

## Real-World Examples

### For a Simple Report
```
"Think about the best approach to create this monthly sales summary.
The purpose of this report is to inform sales reps about the
customer spend and commission-related details."
```

### For a Complex Dashboard
```
"Show your reasoning step by step to create a comprehensive plan
for this financial dashboard that can be used to present company
results to a board of directors that appreciates high level
information. Explain your thinking as you evaluate multiple
approaches with trade-offs, and make everything not hardcoded so
we can easily modify it later. Don't implement yet — let me
review the plan first."
```

### When Something's Not Working
```
"Stop. Create just the basic structure first, then we'll add the
complex features once I confirm this approach is right."
```

---

## Advanced Techniques for Power Users

### Use Role-Based Prompting
```
"Act as an experienced Excel financial analyst. Review this
dashboard design and identify potential issues that might cause
problems in quarterly reporting."
```

### Provide Context Strategically
Don't overload with information — give context that matters:
```
Good: "This report is for executives who need quick insights, not detailed data."
Less helpful: "My company has 500 employees across 12 offices and we use Excel 365..."
```

### Chain Your Requests
```
First: "Create a plan for this dashboard"
Then: "Now implement step 1 from your plan"
Finally: "Test the implementation and identify any issues"
```

---

## What Good Results Look Like

You'll know these techniques are working when you get:

- Excel solutions you can actually understand and modify
- Clear explanations of why AI chose each approach
- Built-in checks that prove your calculations are correct
- Flexible solutions that work with different data
- Backup options when your first choice doesn't work out

---

## Commands Reference

HyperPerfect supports `@` commands you can type in the chat:

| Command | What it does |
|---------|-------------|
| `@mode` | Switch between Fast, Auto, and Smart AI modes |
| `@plan` | Enter planning mode for complex tasks |
| `@execute` | Run your plan |
| `@compact` | Compress conversation history to free up memory |
| `@clear` | Start a fresh conversation |
| `@settings` | Open the settings panel |
| `@prompt-name` | Load a custom prompt by name |

---

## Customizing How the AI Works

HyperPerfect gives you a toolkit for controlling the AI: custom prompts, custom agents, rule sets, plans, and a file library. Each one solves a different problem, and they work together.

You don't have to build any of these yourself. Describe what you need in a conversation and the AI will create prompts, agents, rules, and plans for you. You review and adjust from there.

### Custom Prompts

**The problem they solve**: You find yourself giving the AI the same instructions over and over. Or you need to load specific context for a particular kind of task, but you don't want it cluttering every conversation.

**What they are**: Saved sets of instructions and context you can load into any conversation on demand. Type `@prompt-name` and the prompt's full content loads into the chat, giving the AI everything it needs for that task.

**Why they matter**: Prompts bring context directly into the main AI's conversation. This is the fastest way to give the AI detailed, task-specific instructions without retyping them. Attach files to a prompt so reference documents come along automatically.

**Key features**:
- Invoke with `@prompt-name` from any conversation
- Attach files from your library for reference material
- Set quality and effort levels per prompt to control speed and cost
- The AI can create and update prompts for you during a conversation

**Example**: In the onboarding demo, the AI builds a "Monthly Report" prompt with detailed instructions for categorizing transactions, writing SUMIFS formulas, building a variance table, and analyzing profitability. Every month, Rosa types `@monthly_report` and the AI knows exactly what to do.

### Custom Agents

**The problem they solve**: Complex tasks need specialized attention, but loading all that context into one conversation fills up the AI's memory fast. In Excel, where every cell and formula takes up space, this limit hits sooner than anywhere else.

**What they are**: AI specialists you design, each with its own instructions, tools, model settings, and most importantly, its own memory space. The main AI deploys them during a conversation to handle specific parts of a task.

**Why they matter**: Each agent works in a separate context window and reports back only what the main AI needs. This protects the main conversation from information overload. For Excel work, where workbook data fills memory quickly, this is a fundamental capability. You can also fine-tune each agent's quality and effort settings to control performance and cost.

**Key features**:
- Each agent has its own context window, protecting the main conversation
- Agents can read and write directly in your workbook
- Set custom instructions, tool access, and AI settings per agent
- Send multiple agents to work on different parts of a task simultaneously
- The AI can create agents for you. Describe what you need and it builds the specialist.

**Built-in example -- Data Scout**: The scout agent explores your workbook's structure and reports back a concise summary. Send scouts to different sheets and they each return only the relevant findings. The main AI gets a clear picture of your workbook without reading every cell into its own memory.

### Rule Sets

**The problem they solve**: You want the AI to follow certain standards every time, without having to remind it. Formatting conventions, industry terminology, how you like outputs structured.

**What they are**: Named sets of persistent rules the AI follows automatically. Toggle them on and off depending on the task. Global preferences apply to every conversation.

**Why they matter**: Rules make the AI consistent. Set your standards once and they apply across every conversation, every prompt, every agent. The AI can also update rules on its own when it discovers something new.

**Key features**:
- Named rule sets you can toggle on and off
- Global preferences that apply to every conversation
- The AI can create and update rules during a conversation
- Rules carry through to agents and plan execution

**Example**: In the onboarding demo, the AI creates a "Statement Mapping" rule set that maps Rosa's bank statement descriptions to budget categories. When the AI encounters a transaction starting with "HC," it knows that means Honeycrisp Apples. If a new vendor appears next month, the AI adds it to the rules automatically.

### Plan Mode

**The problem they solve**: Complex tasks go better when you think before you act. You also need a way to repeat multi-step workflows reliably.

**What it is**: A dedicated planning mode where the AI reads your data but won't make changes. You build a step-by-step plan together, reorder steps with drag and drop, then execute when ready. Plans can be saved and reused.

**Why it matters**: Plans give you control and repeatability. Review the AI's approach before it touches your spreadsheet. Run the same plan next month with fresh data and get consistent results. Plans tie everything together: steps can load custom prompts, deploy custom agents, and follow your rule sets.

**Key features**:
- `@plan` enters planning mode with read-only access to your data
- Build step-by-step plans with drag-and-drop reordering
- `@execute` runs the plan with a clean, focused context
- Reuse plans for recurring tasks like monthly reports
- Each step can reference prompts, agents, and rules
- Optional review step after execution to check results

**Example**: In the onboarding demo, the AI builds a two-step plan: (1) run the Monthly Report prompt to build the full variance report, and (2) review the results, update the statement mapping rules if new categories appeared, and present findings to Rosa. Next month, Rosa runs the same plan with new transaction data.

### File Library

**The problem it solves**: You reference the same documents across many conversations. Templates, policy docs, prior reports, reference data. Uploading them every time is tedious.

**What it is**: A persistent file library where you store PDFs, spreadsheets, and images. The AI can access your files from any conversation. Link files to custom prompts or agents so they load automatically.

**Why it matters**: Your file library becomes the AI's reference shelf. Upload report templates and the AI learns your preferred formats. Store policy documents and the AI checks its work against them. Attach prior-quarter reports and the AI matches the structure. The more you build up your library, the more the AI understands how you work.

**Key features**:
- Upload PDFs, XLSX files, and images
- Files persist across all conversations
- Link files to custom prompts or agents
- The AI reads, extracts data from, and reasons about your files
- Browse and manage files from the Files tab

### How They Work Together

The real power is in the combination. Here's how the onboarding demo ties it all together:

1. **Rule set** ("Statement Mapping") teaches the AI how to categorize Rosa's transactions
2. **Custom prompt** ("Monthly Report") contains detailed instructions for building the variance report using those rules
3. **Plan** ("Monthly Variance Report") orchestrates the full workflow: run the prompt, review results, update rules if needed, present findings

Rosa doesn't build any of this manually. She describes what she needs and the AI creates the rules, the prompt, and the plan. Next month, she types `@execute` and gets a consistent, accurate report.
