# Getting the Most from AI in HyperPerfect

*Simple tips to make your Excel analysis requests work better*

Working with AI for Excel analysis doesn't have to be complicated. With a few simple techniques, you can get dramatically better results—solutions that are more accurate, easier to understand, and actually solve your business problems.

Whether you're creating your first dashboard or building complex financial models, these friendly hints will help you communicate more effectively with HyperPerfect's AI and get the Excel solutions you really need.

## Understanding How Claude Works Best

Claude responds to clear, explicit instructions about reasoning and validation. The more specific you are about *how* you want it to approach the problem, the better your results.

**Effective instructions:**
- "Show your reasoning step by step"
- "Explain your thought process as you work"
- "Validate each step before moving forward"
- "Double-check your logic and explain how"

These phrases tell Claude exactly *how* to process your request, leading to more thorough and reliable solutions.

## The Basics: Better Requests Get Better Results

### 1. Always Ask for Options

**What it is:** Instead of asking for one solution, ask AI to give you multiple approaches and explain the trade-offs.

```
❌ Instead of: "Create a revenue summary"

✅ Try this: "Give me two different ways to create this revenue summary. Tell me the pros and cons of each approach and which one you'd recommend."
```

**Why it helps:** You'll understand your options and can pick the approach that fits your specific needs. Plus, if the first option doesn't work out, you already have a backup plan.

### 2. Request Step-by-Step Reasoning for Complex Problems

**What it is:** For complex tasks, explicitly ask AI to show its reasoning process rather than relying on magic keywords.

```
For simple tasks: Just describe what you need clearly
For complex problems: "Show your reasoning step by step as you..."
For multi-step challenges: "Explain your thought process and validate each step before..."
```

**Real example:**
- Simple: "Create a summary table for monthly sales by region"
- Complex: "Show your reasoning step by step as you design a revenue analysis system. Explain why you chose each approach and validate the logic before implementing."

**Why it helps:** Claude 4.5 responds to clear instructions about *how* to think, not magic words. Asking for explicit reasoning gets you more thorough, validated solutions.

### 3. Ask AI to Test Its Own Work

**What it is:** Before implementing the main solution, ask AI to create "check" formulas that verify everything adds up correctly.

```
✅ Try this: "After building the revenue summary, create test cells that verify:
• Total revenue in source data equals total in summary table
• All customers are included  
• Date ranges are captured properly
If the test verifications don't pass, find the root cause of the problem."
```

**Why it helps:** Catches calculation errors before they become problems. You'll have built-in proof that your Excel solution is working correctly.

### 4. Get the Plan First

**What it is:** Ask AI to explain its approach before diving into implementation.

```
✅ Try this: "Create a detailed plan for this Excel transformation. Don't implement anything yet—I want to review the approach first."
```

**Why it helps:** You can catch misunderstandings early, adjust the scope, and make sure you're both on the same page before any actual work begins.

### 5. Speak Up If Things Go Wrong

**What it is:** Don't let AI continue down the wrong path. Jump in and redirect whenever needed.

```
✅ Examples:
"Stop. I see you're creating a pivot table, but I actually need formulas I can see and modify."

"Hold on—implement just the header row first so I can check the layout before you continue."
```

**Why it helps:** Course corrections early in the process save time and prevent frustration later. AI actually works better with your guidance.

## Making Your Solutions Business-Ready

### 6. Always Emphasize Flexibility

**What it is:** Make sure your Excel solutions can be easily modified and understood by others.

```
✅ Include these magic words in your requests:
• "Fully auditable" (others can trace your logic)
• "Not hardcoded" (works with different data)  
• "Adjustable" (easy to modify later)
```

**Real example:** "Create a fully auditable, not hardcoded, adjustable solution for monthly sales analysis."

### 7. Clear Your Context Regularly

**What it is:** During long work sessions, tell AI to "forget" previous conversations to stay focused.

```
✅ Type: @clear

Then start fresh: "Now let's work on the cost analysis dashboard. I want to start with a clean slate for this new component."
```

**When to do this:** Between major tasks, when AI responses seem less focused, or when starting a completely different type of analysis.

### 8. Ask for Double-Checking

**What it is:** Request that AI verify its work before implementing.

```
✅ Try this: "Double-check all your logic and explain your verification process, then create the formulas."
```

**Why it helps:** Gets you higher-quality solutions with fewer errors and better attention to detail.

### 9. Break Big Projects into Steps

**What it is:** For complex Excel projects, ask AI to create a checklist and work through it systematically.

```
✅ Try this: "This is a complex dashboard project. Create a detailed checklist of everything that needs to be done, then we'll work through it step by step."
```

**Why it helps:** Nothing gets forgotten, you can track progress, and large projects feel much more manageable.

### 10. Tell the purpose and ask for the "How"

**What it is:** Instead of telling HyperPerfect exactly what to do, ask the AI how they would create the solution.  

```
❌ Instead of: Hardcoded criteria mixed into formulas

✅ Try this: "Create a parameter control section where I can toggle different revenue components on and off, then reference those settings in your formulas."
```

**Why it helps:** Not only does this help load context very efficiently but it usually starts causing the AI to fill in context that you can leverage or redirect.  Often times you will be pleasantly surprised with an approach to the problem that you hadn't considered.

## Real-World Examples

### For a Simple Report
```
"Think about the best approach to create this monthly sales summary. The purposed of this report is to inform sales reps about the customer spend and commission-related details."
```

### For a Complex Dashboard
```
"Show your reasoning step by step to create a comprehensive plan for this financial dashboard that can be used to present company results to a board of directors that appreciates high level information. Explain your thinking as you evaluate multiple approaches with trade-offs, and make everything not hardcoded so we can easily modify it later. Don't implement yet—let me review the plan first."
```

### When Something's Not Working
```
"Stop. Create just the basic structure first, then we'll add the complex features once I confirm this approach is right."
```

## What Good Results Look Like

You'll know these techniques are working when you get:

✅ Excel solutions you can actually understand and modify  
✅ Clear explanations of why AI chose each approach  
✅ Built-in checks that prove your calculations are correct  
✅ Flexible solutions that work with different data  
✅ Backup options when your first choice doesn't work out

## Advanced Techniques for Power Users

### Use Role-Based Prompting
Tell Claude what perspective to take:
```
"Act as an experienced Excel financial analyst. Review this dashboard design and identify potential issues that might cause problems in quarterly reporting."
```

### Provide Context Strategically
Don't overload with information—give context that matters:
```
✅ Good: "This report is for executives who need quick insights, not detailed data."
❌ Less helpful: "My company has 500 employees across 12 offices and we use Excel 365..."
```

### Request Structured Outputs
Ask for specific formats when you need them:
```
"Provide your analysis as:
1. Summary (2-3 sentences)
2. Recommended approach
3. Alternative options
4. Implementation steps"
```

### Chain Your Requests
For complex projects, build on previous responses:
```
First: "Create a plan for this dashboard"
Then: "Now implement step 1 from your plan"
Finally: "Test the implementation and identify any issues"
```

## Remember: You're in Charge

The best AI collaborations happen when you stay actively involved. Don't hesitate to:
- Ask questions when something isn't clear
- Request changes if the approach isn't quite right
- Get explanations for complex formulas
- Test solutions with your real data before trusting them
- Be specific about reasoning processes you want to see
- Use clear, direct instructions about how to approach problems

AI is incredibly powerful, but it works best when you guide it toward solutions that fit your specific needs and business context. Claude particularly excels when you give it clear instructions about *how* to think through problems, not just *what* to create.

*Happy analyzing!* 📊