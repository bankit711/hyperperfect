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
