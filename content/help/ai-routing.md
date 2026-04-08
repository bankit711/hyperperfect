---
title: "AI Model Routing"
description: "HyperPerfect automatically selects between Claude, Gemini, and ChatGPT to give you the best result for each task."
order: 10
category: "Using HyperPerfect"
---

Every AI model has different strengths, and the best one for any given task changes constantly as providers release updates. HyperPerfect tracks these shifts and routes each request to the model that scores highest for that type of work. You get better quality, faster responses, and lower cost without thinking about it.

## How It Works

HyperPerfect classifies each request by task type, then routes it to the provider with the highest benchmark score for that category. Three providers are available:

**Claude** handles complex reasoning, multi-step analysis, and general Excel operations. When your task requires careful thought, synthesis, or written analysis, Claude leads.

**Gemini** excels at formula generation, data extraction, and high-volume data cleanup. It is the fastest and most cost-efficient model for structured data tasks.

**ChatGPT** leads on financial modeling and structured formatting. For building three-statement models, P&L frameworks, and organized financial deliverables, it consistently scores highest.

Each request goes to whichever provider scores best for that work. A single session might use all three, depending on what you ask.

## Why This Matters

The AI landscape shifts quickly. A model that leads on financial modeling today may fall behind in a few months. Individually, no provider can be the best at everything at the same time.

HyperPerfect benchmarks all three continuously. When rankings shift, the routing updates automatically. You do not need to follow provider news or switch tools. The right model is always selected for you.

## Customizing Routing

The defaults handle most workflows well, but you can adjust them in Settings:

- **See active providers**: Settings shows which models are enabled and what each one handles by default
- **Override by task type**: If you prefer a specific provider for certain work, you can set that preference and it will apply going forward
- **Disable a provider**: If your organization restricts use of a particular AI provider, you can turn it off entirely

## Works With Everything Else

AI routing applies across all of HyperPerfect's features:

- **Plans** route each step to the best model automatically
- **Custom agents** can have their own model preferences, or inherit the default routing
- **Workflows** use routing consistently across every run so results stay high quality over time
