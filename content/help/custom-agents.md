---
title: "Custom Agents"
description: "Build a team of customized AI specialists that work in parallel on your Excel tasks."
order: 9
category: "Using HyperPerfect"
---

Build a team of customized specialists. Scouts that find information in your workbook, formula wizards, or domain knowledge experts. They work in parallel, speeding up progress and improving performance by letting each one focus on what it does best.

## Why Custom Agents

Complex tasks need specialized attention, but loading all that context into one conversation fills up the AI's memory fast. In Excel, where every cell and formula takes up space, this limit hits sooner than anywhere else.

Custom agents solve this. Each one works in a separate memory space and reports back only what the main AI needs. This protects the main conversation from information overload while getting better results from specialization.

## How They Work

### Each Agent Has Its Own Context

When the main AI deploys an agent, that agent gets its own memory space. It can read your workbook, run analysis, and build results without filling up the main conversation's memory. When it's done, it reports back a concise summary.

### They Work in Parallel

The main AI can deploy multiple agents at the same time. One exploring sheet A, another analyzing sheet B, another checking formulas. They run simultaneously and report back when they're done.

### You Design Them

Create agents from the settings panel with:

- **Custom instructions**: What the agent specializes in and how it should work
- **Tool access**: Whether the agent can read and write in your workbook
- **Quality and effort settings**: Fine-tune performance and cost per agent
- **Model preferences**: Choose which AI model powers each specialist

## Built-in: Data Scout

The Data Scout is a built-in agent that explores your workbook's structure. Send it to a sheet and it reports back what it finds: headers, data types, ranges, patterns. Send multiple scouts to different sheets at once.

The scout is a good example of why agents matter. Instead of the main AI reading every cell in a 50-tab workbook (filling its memory), scouts explore specific areas and report back only the relevant findings.

## Use Cases

### Workbook Exploration

Send scouts to map out a large workbook before the main AI starts working. Each scout explores a different section and reports back a concise summary.

### Parallel Model Building

Building a three-statement model? Deploy one agent on the Income Statement, another on the Balance Sheet, another on the Cash Flow Statement. They work simultaneously, and the main AI synthesizes the results.

### Specialized Validation

Create a formula checker that reviews calculations, a format validator that checks consistency, or a data quality agent that looks for anomalies.

### Domain Experts

Build agents with domain-specific instructions. A tax expert that knows the rules, a financial reporting specialist that follows GAAP, or an operations analyst that understands your business metrics.

## The AI Builds Them for You

You don't have to configure agents from scratch. Describe what you need in a conversation and the AI creates the agent for you. It sets the instructions, picks the right tool access, and configures the settings. You review and adjust from there.

## How They Fit In

Agents work with the rest of the HyperPerfect toolkit:

- **Plans** can deploy agents as part of a step
- **Rules** apply to agents automatically
- **Prompts** can be loaded by agents for detailed instructions
- **Files** from your library can be linked to agents for reference
