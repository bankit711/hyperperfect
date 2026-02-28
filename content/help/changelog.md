---
title: "Changelog"
description: "All notable changes to HyperPerfect are documented here. See what's new in each release."
order: 10
category: "Resources"
---

All notable changes to HyperPerfect are documented here.

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
