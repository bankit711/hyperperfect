---
title: "Excel Functionality"
description: "Learn how to read, analyze, and modify your Excel data through natural conversation with HyperPerfect."
order: 4
category: "Using HyperPerfect"
---

HyperPerfect's AI assistant can read, analyze, and modify your Excel data through natural conversation. This guide shows you how to get the most out of Excel integration.

## Getting Started

**Prerequisites**: Have Excel open with your spreadsheet loaded and the HyperPerfect add-in panel visible.

**Basic Workflow**:
1. Select the data you want to work with in Excel
2. Return to HyperPerfect and describe what you want to do
3. The AI handles the rest automatically

## What You Can Do

### Read and Analyze Your Data

Ask the AI to examine your Excel data and provide insights, summaries, calculations, or answers about what you have.

**Examples**:
```
"Analyze the selected data and find patterns"
"What's the average of these sales figures?"
"Look at A1:D10 and tell me if there are any outliers"
"What's the total revenue by product?"
```

**Tips**:
- Select a range of cells and the AI detects it automatically (multi-cell selections)
- Or specify the range like "A1:D10" or "B2:F20"
- The AI works with large datasets efficiently
- You can ask follow-up questions about the same data without re-selecting

### Write and Calculate

Ask the AI to calculate results and write them directly to your spreadsheet.

**Examples**:
```
"Calculate monthly totals and write them to column F"
"Add a calculation column that multiplies Quantity x Price"
"Write statistics (mean, median, max, min) for this range"
"Process this raw data and write the cleaned version to column B"
```

### Format and Style

Make your data look professional with formatting.

**Examples**:
```
"Format A1:F1 as a professional header with bold text and blue background"
"Format column C as currency with right alignment"
"Make this table look professional with alternating row colors and borders"
```

**Available Formatting Options**:
- **Text styling**: Font name, size, bold, italic, underline, text color
- **Cell backgrounds**: Any color fill
- **Borders**: Customizable on any edge with different styles
- **Alignment**: Left/center/right, top/center/bottom, text wrapping, indentation
- **Number formats**: Currency, percentage, decimals, dates, and custom formats
- **Column and row sizing**: Auto-fit or set custom widths and heights

### Organize and Restructure

Move data around, duplicate ranges, or delete rows and columns.

**Examples**:
```
"Copy this data from column A to column D"
"Move the summary section from A1:C10 to E1:G10"
"Delete rows 5 through 10"
"Copy the formatting from this header row to the data rows below"
```

### Generate Professional Reports

Create hierarchical, structured reports like P&Ls, budgets, or balance sheets.

**Examples**:
```
"Create a professional P&L report for this data"
"Build a quarterly budget summary with revenue, expenses, and profit margins"
"Make a balance sheet with assets, liabilities, and equity sections"
```

### Search Your Data

Find values, locate errors, and replace text across your worksheet.

**Examples**:
```
"Find all cells containing 'Revenue' in this sheet"
"Replace all instances of 2025 with 2026"
"Find all formula errors in this sheet"
"Locate all blank cells in column B"
```

### Recall Past Conversations

Search your conversation history and pull context from previous sessions.

**Examples**:
```
"What did we build last Tuesday?"
"Remember the model we worked on last week? Update it with March data."
"Find my previous analysis of the Q1 numbers"
```

---

## AI Tools Reference

The AI has specialized tools for different types of Excel work. You don't need to know these names. Just describe what you want and the AI picks the right tool. This reference is for users who want to understand what's happening behind the scenes.

### Core Tools

| Tool | What it does |
|------|-------------|
| **Read Range** | Read cell values, formulas, and formatting from any range |
| **Write Range** | Write data and formulas to cells, with optional formatting |
| **Format Range** | Apply formatting to existing cells without changing values |
| **Copy and Paste** | Copy a range to another location with formula adjustment |
| **Move Range** | Cut and paste with formula reference adjustment |
| **Insert Rows/Columns** | Insert new rows or columns into a worksheet |
| **Delete Rows/Columns** | Remove rows or columns from a worksheet |
| **Create Sheet** | Add a new worksheet to the workbook |

### Discovery Tools

| Tool | What it does |
|------|-------------|
| **List Sheets** | Show all worksheets in the workbook |
| **Map Sheet** | Map a sheet's structure: headers, sections, tables, and data regions |
| **Get Tables** | List Excel tables on a worksheet with their details |
| **Get Used Range** | Find the boundaries of populated cells |
| **Find in Sheet** | Search for values, find and replace, or locate special cells (formulas, errors, blanks) |
| **Snapshot Range** | Capture a visual image of a cell range |

### Report and Table Builders

| Tool | What it does |
|------|-------------|
| **Create Report** | Build hierarchical financial reports (P&Ls, balance sheets, budgets) with sections, subtotals, and formulas |
| **Create Table** | Build structured data tables with column types, grouping, and subtotals |

### AI Control Tools

| Tool | What it does |
|------|-------------|
| **Deploy Agent** | Send a specialist agent to work on a specific part of your task |
| **Recall Conversation** | Search and pull context from past conversations |
| **Manage Prompts** | Create and update your custom prompts |
| **Manage Agents** | Create and update your custom agent definitions |
| **Manage Rules** | Create and update your rule sets and global preferences |
| **Manage Plans** | Create, update, and organize saved plans |
| **Run Plan** | Execute a saved plan as a tracked checklist |
| **Manage Files** | Access your file library, read files, and link files to prompts or agents |

### Advanced Excel (Full Office.js Access)

Beyond the core tools, HyperPerfect can execute any operation the Excel JavaScript API supports. This is what makes "anything Excel can do" possible. Here is what's available:

**Charts and Visualizations**
- Bar, column, line, pie, doughnut, scatter, area, combo, waterfall, and funnel charts
- Customize axes, labels, legends, data series, colors, and trendlines
- Position and resize charts on any sheet

**Pivot Tables**
- Create pivot tables from raw data
- Configure row fields, column fields, value fields, and filters
- Sort, filter, and reorder pivot fields
- Change aggregation methods and layout styles

**Conditional Formatting**
- Color scales (two-color and three-color gradients)
- Data bars with customizable fill
- Icon sets (arrows, traffic lights, flags, ratings)
- Formula-based rules for custom logic
- Cell value rules (greater than, between, top 10, etc.)
- Highlight duplicates, blanks, or errors

**Data Validation**
- Dropdown lists from a fixed set or cell range
- Number constraints (whole number, decimal, between, greater than)
- Date and time constraints
- Text length limits
- Custom formula validation
- Input messages and error alerts

**Named Ranges and References**
- Create, update, and delete named ranges
- Use names in formulas across sheets
- Dynamic named ranges

**Sorting and Filtering**
- Multi-level sorting by any column
- AutoFilter setup and management
- Custom filter criteria

**Row and Column Grouping**
- Outline grouping with collapsible controls
- Nested group levels
- Summary rows above or below groups

**Print and Page Layout**
- Define print areas
- Page breaks (horizontal and vertical)
- Headers and footers with page numbers
- Margins, orientation, and paper size

**Cell Operations**
- Merge and unmerge cells
- Freeze panes (rows, columns, or both)
- Comments and notes on cells
- Sparklines (line, column, win/loss)
- Data series auto-fill
- Custom number formats

**Performance**
- Bulk operations with suspended calculation for speed
- Batch updates across multiple ranges
- Formula verification after writes

---

## How the AI Works Behind the Scenes

### Thinking Display

Watch the AI reason through your request in real-time. The AI shows its step-by-step thinking process as it works.

- A collapsible "Thinking" section appears during processing
- Click to expand and see the AI's reasoning step-by-step
- Helps you understand how the AI approached your request

### Automatic Error Recovery

If something goes wrong, the AI automatically retries with corrections.

- The AI validates all operations before executing them in Excel
- If validation fails, the AI explains the issue and automatically adjusts
- Fixes are applied and retried without you needing to ask again

### File Library

Upload reference files to your library and the AI can access them across all your conversations.

- **Persistent Storage**: Files stay in your library. Upload once, use anywhere.
- **Supported formats**: Images (PNG, JPEG, GIF, WebP), PDFs, and spreadsheets (XLSX)
- **Link to Prompts and Agents**: Attach files to custom prompts or agents for easy access
- **In-Chat Uploads**: You can also drag and drop files directly into a conversation for one-time use

---

## Tips for Best Results

### Getting Accurate Results
- **Select data before asking** - helps the AI understand what you want to work with
- **Be specific about locations** - specify where results should go
- **Use natural language** - just describe what you want in plain English

### Large Datasets
- HyperPerfect automatically works efficiently with large datasets
- Break up complex requests if doing multiple unrelated tasks

### Getting the Look You Want
- Be specific about formatting instead of "make it look nice"
- You can ask for specific colors and the AI will use them
- The AI learns context from your conversation

### Managing Long Conversations
- Watch the context indicator (green 0-70%, orange 70-85%, red 85%+)
- Use **@compact** when orange to summarize old messages
- Use **@clear** to start fresh when switching tasks
- System auto-compacts at 85% to prevent interruptions
