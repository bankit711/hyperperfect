---
title: "Plan Mode"
description: "Start a strategic planning session with your AI to map out complex tasks before execution."
order: 6
category: "Using HyperPerfect"
---

Plan Mode lets you start a strategic planning session with your AI partner to map out a task before anything gets changed in your spreadsheet. The AI teaches you how to build agentic workflows by proactively figuring out the best tools for what you're trying to accomplish. It builds the plan, selects the right combination of prompts, agents, and rules, and organizes everything right in Excel.

## Why Plan Mode

Complex Excel work goes better when you think before you act. Without a plan, the AI might take an approach you don't agree with, or miss steps that matter. Plan Mode gives you accountability and predictability for your AI workflows.

It also solves a problem for recurring work. If you build a monthly financial report, you shouldn't have to explain the process every time. Plan Mode lets you save that workflow and reuse it.

## How It Works

### Enter Planning Mode

Type `@plan` in the chat. The AI switches to a read-only mode where it can look at your data but won't change anything. This is your space to discuss the approach.

### Build the Plan Together

Describe what you need and the AI creates a step-by-step plan. It analyzes your task and proactively recommends the right tools: which prompts to load, which agents to deploy, which rules to follow. Each step has its own instructions. You can:

- Drag and drop steps to reorder them
- Edit step details
- Add or remove steps
- Assign custom prompts or agents to specific steps
- Parallelize steps that can run at the same time for faster execution

### Execute

When the plan looks right, type `@execute`. The AI gets a clean, focused context and works through each step. Steps that can run in parallel execute simultaneously, speeding up complex workflows.

### Retrospective: Plans That Improve Themselves

Turn on the optional retrospective step and the plan automatically reviews its own performance after every run. It looks at what worked, what took too long, and what could be done differently. Then it suggests improvements for next time.

This is AI that gets smarter on its own. Each run teaches the plan something new, and over time your workflows adapt and improve without you having to think about it.

### Reuse Next Month

Plans are saved. Next month, open the same plan with fresh data and run it again. The AI follows the same steps, applies the same rules, and delivers consistent results. And if retrospective is on, each run is a little better than the last.

## Plans Work with Everything

Plans are the orchestration layer that ties all of HyperPerfect's tools together:

- **Custom Prompts**: A plan step can load a prompt with detailed instructions for that part of the work
- **Custom Agents**: A step can deploy a specialist agent for a specific task, or multiple agents in parallel
- **Rule Sets**: Plans follow your active rules automatically
- **File Library**: Steps can reference files from your library for context

## Example: Monthly Variance Report

In the onboarding demo, the AI builds a plan called "Monthly Variance Report" with two steps:

1. **Build the variance report**: Loads the Monthly Report prompt, categorizes transactions using the Statement Mapping rules, writes SUMIFS formulas, and builds the full variance table
2. **Review and present**: Checks for new transaction categories, updates rules if needed, verifies the numbers, and presents a summary with recommendations

Next month, Rosa runs the same plan with new July data. Same process, consistent results, no re-explaining. With retrospective turned on, the plan flags any new transaction patterns it discovered and suggests rule updates for next month.

## Getting Started

Type `@plan` in any conversation to try it. Or open HyperPerfect and run the guided walkthrough to see a complete plan built and executed.
