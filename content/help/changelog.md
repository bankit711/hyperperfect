---
title: "Changelog"
description: "All notable changes to HyperPerfect are documented here. See what's new in each release."
order: 10
category: "Resources"
---

All notable changes to HyperPerfect are documented here.

---

## [1.0.39]

### Full Excel Control
HyperPerfect used to read, write, and format. Now it can do anything in Excel. Tables, charts, pivot tables, conditional formatting -- if Excel supports it, HyperPerfect can build it.

- **Charts and Visualizations**: Ask for a bar chart, line graph, or combo chart and it builds one directly in your workbook
- **Pivot Tables**: Turn raw data into pivot tables with the grouping and aggregation you need
- **Conditional Formatting**: Apply color scales, data bars, icon sets, or custom rules to highlight what matters
- **Data Validation**: Create dropdown lists, input restrictions, and validation rules
- **No Limits**: Named ranges, sparklines, table styles, custom number formats -- the full Excel API is available

---

## [1.0.38]

### Custom Prompts
Save instructions and context you use often, then bring them into any conversation with one command.

- **On-Demand Context**: Type `@prompt-name` to load a prompt's instructions directly into your chat
- **Combine with Files**: Attach reference documents to a prompt so the AI has everything it needs
- **Quality Controls**: Set the AI mode and effort level per prompt to balance speed and cost
- **Reusable Workflows**: Build prompts for recurring tasks like `@monthly-close` or `@variance-analysis`
- **Quick to Create**: Add new prompts from the settings panel. The AI can manage them for you too.

---

## [1.0.37]

### File Library
Upload reference files once and the AI can access them whenever it needs to.

- **Persistent Storage**: Files stay in your library across conversations. Upload once, use anywhere.
- **PDF and Image Support**: Upload PDFs, spreadsheets, and images. The AI reads and extracts data from all of them.
- **Templates and Reference Docs**: Store report templates, policy documents, or prior-quarter outputs. The AI learns your formats and follows them.
- **Organized Access**: Browse and manage your files from the Files tab. Link files to prompts or agents for easy retrieval.

---

## [1.0.36]

### Plan Mode
Map out complex work before the AI starts. Reuse plans for tasks you do every month.

- **@plan Command**: Type `@plan` to enter planning mode. The AI reads your data but won't change anything until you approve the plan.
- **Step-by-Step Plans**: Build a sequence of steps, each with its own instructions. Drag and drop to reorder.
- **@execute to Run**: When the plan looks right, type `@execute`. The AI gets a clean, focused context and works through each step.
- **Recurring Tasks**: Save plans for monthly reports, quarterly models, or any workflow you repeat. Run the same plan next month with fresh data.
- **Works with Everything**: Plans can reference custom prompts, deploy custom agents, and follow your rule sets.

---

## [1.0.35]

### Rule Sets
Teach HyperPerfect your rules once. It follows them every time, in every conversation.

- **Named Rule Sets**: Create sets of instructions for different workflows or standards. Toggle them on and off.
- **Global Preferences**: Set preferences that apply to every conversation automatically.
- **Formatting Standards**: "Always use accounting format. Bold headers. Freeze the top row." Say it once.
- **AI-Managed**: The AI can create, edit, and organize rules for you during a conversation.

---

## [1.0.34]

### Custom Agents
Build your own AI specialists. Each one works in its own context, so the main AI stays focused on your task.

- **Specialized Teammates**: Create agents with their own instructions, tools, and AI settings. A formatting expert, a data validator, a model auditor.
- **Protected Context**: Each agent works in its own memory space. It reports back only what the main AI needs, keeping your conversation clean and focused.
- **Data Scout**: The built-in scout agent explores your workbook's structure and reports back what it finds. Send multiple scouts to different sheets at once.
- **Fine-Tune Performance**: Set quality and effort levels per agent to control speed and cost.

---

## [1.0.33]

### Extended Memory
AI memory fills up faster with Excel than with almost anything else. Every cell, formula, and sheet you work with takes up space — and a complex model can hit limits before you're done. Extended Memory gives you the room to finish.

- **Turn It On in @settings**: Off by default. Enable it when working on large or complex workbooks.
- **No More Mid-Session Compaction**: When you exceed the standard memory limit, the app enters Extended mode instead of compacting. Your full context stays intact.
- **Memory Indicator Updates Automatically**: The indicator shows "Extended" once you're in extended mode, so you always know where you stand.
- **Plan Required**: Your settings panel shows whether it's available on your account.

---

## [1.0.32]

### Agent Teams
HyperPerfect can now coordinate multiple AI specialists working in parallel on different parts of a task.

- **Parallel Specialists**: The main AI breaks complex work into parts and deploys a team to tackle each one at the same time.
- **They Work in Your Spreadsheet**: Each specialist can read and write directly in your workbook, not just reason about it.
- **Built for Complex Models**: Ask HP to build a three-statement model and it can put one specialist on the Income Statement, another on the Balance Sheet, another checking formulas — all running at once.
- **Clean Cancellation**: Cancel the main request and the whole team stops.

---

## [1.0.31]

### Auto Mode
HyperPerfect now picks the right AI for every request. Fast where it can be, powerful where it needs to be — without you having to think about it.

- **On by Default**: Every new conversation starts in Auto.
- **Right Tool for Every Task**: Simple questions get instant answers. Complex analysis gets full reasoning. You stop paying for power you don't need.
- **Works Across the Whole Session**: Auto Mode applies to your requests and to any specialists deployed during complex tasks.
- **Override Anytime**: Type `@mode` to switch to Fast or Smart manually.

---

## [1.0.30]

### Usage Breakdown in Settings
See exactly how your AI usage is distributed day by day.

- **Daily Spend Table**: View per-day costs as a percentage of your monthly limit
- **Today Highlighted**: Today's usage is called out so you can track active sessions
- **Monthly Overview**: Spend bar shows your total usage against your plan limit at a glance
- **Subscription Management**: Manage or upgrade your plan directly from the settings panel

---

## [1.0.29]

### Free Tier After Trial
Your work doesn't stop when your trial ends.

- **Automatic Free Tier**: Accounts transition to a free tier when their trial expires — no hard cutoff
- **Keep Working**: Continue using HyperPerfect with a modest monthly usage allowance
- **Easy Upgrade**: Upgrade to a paid plan anytime from the settings panel when you need more

---

## [1.0.28]

### Model Upgrades
Both modes now run on newer, more capable Claude models.

- **Fast Mode → Claude Sonnet 4.6**: Faster responses now powered by Sonnet 4.6 with adaptive thinking — a significant upgrade from Haiku
- **Power Mode → Claude Opus 4.6**: Complex analysis now uses Opus 4.6, Anthropic's most capable model
- **Better Results Across the Board**: Both modes deliver higher quality responses on the same tasks

---

## [1.0.27]

### Custom Instructions
Teach HyperPerfect about your workflow and it will remember across every conversation.

- **Persistent Context**: Write instructions once and they're included in every AI request automatically
- **@settings Command**: Type `@settings` or use the settings button to open your preferences panel
- **Improve with AI**: Rough notes? Click "Improve with AI" to have Claude rewrite them into clear, well-structured instructions
- **Undo Support**: Made a change you don't like? Undo restores your previous instructions even after closing the panel
- **Autosave**: Changes save automatically as you type — no save button needed

---

## [1.0.26]

### Real-Time Thinking Display
See the AI's reasoning process as it works through complex problems.

- **Thinking Disclosure**: Expandable section shows Claude's step-by-step reasoning
- **Live Streaming**: Watch responses appear in real-time as the AI generates them
- **Transparent Problem-Solving**: Understand how the AI approaches your request

---

## [1.0.25]

### Context Management (@compact)
Keep long conversations running smoothly with intelligent context management.

- **@compact Command**: Type `@compact` to manually compress your conversation history
- **Smart Summarization**: AI generates a handoff summary preserving workbook state, completed work, and pending tasks
- **Automatic Warnings**: Get notified when your conversation is approaching context limits (70%)
- **Auto-Compaction**: System automatically compacts at 85% capacity to prevent interruptions
- **@clear Command**: Type `@clear` to start fresh — deletes all messages and file attachments

---

## [1.0.24]

### Dynamic Model Toggle (@mode)
Switch between Fast and Power modes instantly without losing your conversation context.

- Type `@mode` or use the mode button to toggle modes mid-conversation
- **Fast Mode**: Faster responses using Claude Haiku, ideal for quick tasks
- **Power Mode**: Advanced reasoning using Claude Sonnet for complex analysis
- Mode preference persists across chats and sessions

---

## [1.0.23]

### File Attachment System
Share images and documents directly with HyperPerfect AI for visual analysis alongside your Excel workbooks.

- **Drag-and-Drop Upload**: Simply drag files anywhere in the chat input area, or click the attach button to browse
- **Format Support**: Upload images (JPG, PNG, GIF, WebP) and PDFs
- **Visual Previews**: See thumbnail previews for images and clear file icons for documents before sending
- **Smart File Management**: Attach up to 100 files per conversation with a 32 MB total capacity and real-time size tracking
- **Persistent Attachments**: Files remain available throughout your entire conversation
- **Vision Analysis**: Images and PDFs are processed by Claude's vision system for intelligent visual understanding

---

## [1.0.22]

### Full Workbook Access
HyperPerfect AI can now see and work with all sheets in your Excel workbook.

- **See All Sheets**: AI can list every sheet in your workbook and view their contents
- **Smarter Sheet Selection**: AI understands your workbook structure and automatically selects the right sheet
- **Cross-Sheet Operations**: Read from one sheet and write to another in a single request
- **Clear Operation Tracking**: When AI makes changes, it shows you exactly which sheet it's modifying

---

## [1.0.21]

### Request Cancellation
Stop in-progress AI operations when you need to change direction.

- **Cancel Button**: Click to immediately stop the current AI operation
- **Clean Interruption**: All pending Excel operations are safely cancelled
- **Instant Recovery**: Continue your conversation immediately after cancelling

---

## [1.0.20]

### Intelligent Large Range Handling
Work with large datasets efficiently, no matter how big your data gets.

- **Smart Sampling**: Large ranges are automatically sampled to keep responses fast and accurate
- **Structure Detection**: AI identifies headers, row labels, data regions, and formula patterns
- **Full Data for Narrow Ranges**: Smaller ranges return complete data automatically

---

## [1.0.19]

### Copy, Move & Delete Operations
New tools for reorganizing your worksheet structure.

- **Copy & Paste Range**: Copy data with automatic formula reference adjustment
- **Paste Special Options**: Paste values only, formats only, or formulas only
- **Move Range**: Cut and paste data while maintaining formula integrity
- **Delete Rows/Columns**: Remove single rows/columns, ranges, or non-contiguous selections

---

## [1.0.18]

### Financial Report Builder
Create professional hierarchical reports with a single request.

- **Report Types**: Build P&L statements, budgets, and balance sheets automatically
- **Hierarchical Structure**: Support for nested categories with proper indentation
- **Automatic Formulas**: SUM formulas generated for category totals
- **Professional Styling**: Consistent formatting applied automatically

---

## [1.0.17]

### Data Table Builder with Grouping
Create structured data tables with optional grouping and subtotals.

- **Structured Tables**: Build organized tables with consistent column formatting
- **Automatic Grouping**: Group rows by any column with subtotal calculations
- **Calculated Columns**: Add columns with formulas that reference other columns

---

## [1.0.16]

### Smart Error Recovery
AI automatically retries and corrects when Excel operations fail.

- **Pre-Flight Checks**: Operations validated before running in Excel
- **Automatic Retry**: AI corrects mistakes and tries again without you asking
- **Clear Feedback**: Helpful explanations when something can't be completed

---

## [1.0.15]

### Format Without Overwriting
Apply formatting to existing cells without overwriting values.

- **Rich Formatting**: Apply number formats, fonts, colors, and borders to any range
- **Non-Destructive**: Formatting applies without changing cell values
- **Flexible Targeting**: Format entire rows, columns, or specific cell ranges

---

## [1.0.14]

### Excel Table Discovery
Ask the AI about existing Excel tables in your workbook.

- **Find All Tables**: AI can list every Excel table in your worksheet
- **Table Details**: See table names, locations, column headers, and applied styles
- **Smart Table Operations**: AI can reference and work with your existing tables by name

---

## [1.0.13]

### Worksheet Creation
Ask the AI to create new worksheets in your workbook.

- **Create New Sheets**: AI can add new worksheets with custom names
- **Automatic Naming**: Sheets are named based on their purpose
- **Immediate Access**: New sheets are ready for data entry right away

---

## [1.0.12]

### Smart Data Detection
AI automatically finds where your data lives in the worksheet.

- **Used Range Detection**: AI identifies the boundaries of your data automatically
- **No Manual Selection**: Works without you specifying exact cell ranges
- **Header Recognition**: Distinguishes between headers and data rows

---

## [1.0.11]

### Core Excel Writing
AI can write values, formulas, and data directly to your worksheet.

- **Write Values**: Place text, numbers, and dates in any cell or range
- **Write Formulas**: Create Excel formulas that calculate automatically
- **Bulk Operations**: Write entire tables or datasets in one operation
- **Format on Write**: Apply formatting as data is written

---

## [1.0.10]

### Core Excel Reading
AI can see and understand the contents of your worksheet.

- **Read Cell Values**: AI sees text, numbers, dates, and formatted values
- **Read Formulas**: AI understands your calculation logic, not just results
- **Read Formatting**: AI recognizes number formats, colors, and styles
- **Range Flexibility**: Read single cells, rows, columns, or entire regions
