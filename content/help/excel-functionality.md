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

### Read & Analyze Your Data

Ask the AI to examine your Excel data and provide insights, summaries, calculations, or answers about what you have.

**Examples**:
```
"Analyze the selected data and find patterns"
"What's the average of these sales figures?"
"Summarize this data in bullet points"
"Look at A1:D10 and tell me if there are any outliers"
"What's the total revenue by product?"
```

**Tips**:
- Select your data first for automatic detection
- Or specify the range like "A1:D10" or "B2:F20"
- The AI works with large datasets efficiently — just ask, and it will handle it
- You can ask follow-up questions about the same data without re-selecting

### Create & Write Results Back to Excel

Ask the AI to calculate results and write them directly to your spreadsheet.

**Examples**:
```
"Calculate monthly totals and write them to column F"
"Create a summary of this data in cells A10:C15"
"Add a calculation column that multiplies Quantity x Price"
"Write statistics (mean, median, max, min) for this range"
"Process this raw data and write the cleaned version to column B"
```

**Tips**:
- Be specific about where results should go (e.g., "column F" or "A10:B15")
- The AI will avoid overwriting important data and let you know if adjustments are needed
- Results are written all at once for efficiency

### Format & Style Your Data

Make your data look professional with formatting.

**Examples**:
```
"Format A1:F1 as a professional header with bold text and blue background"
"Format column C as currency with right alignment"
"Make this table look professional with alternating row colors and borders"
"Bold the header row and add borders to the entire table"
"Highlight all values over 1000 in green"
```

**Available Formatting Options**:
- **Text styling**: Font name, size, bold, italic, underline, text color
- **Cell backgrounds**: Any color fill
- **Borders**: Customizable on any edge with different styles
- **Alignment**: Left/center/right, top/center/bottom, text wrapping, indentation
- **Number formats**: Currency, percentage, decimals, dates, and custom formats
- **Column and row sizing**: Auto-fit or set custom widths and heights

### Organize & Restructure Your Data

Move data around, duplicate ranges, or delete rows and columns.

**Examples**:
```
"Copy this data from column A to column D"
"Move the summary section from A1:C10 to E1:G10"
"Delete rows 5 through 10"
"Delete column D (the old data column)"
"Copy the formatting from this header row to the data rows below"
```

### Generate Professional Reports

Create hierarchical, structured reports like P&Ls, budgets, or balance sheets.

**Examples**:
```
"Create a professional P&L report for this data"
"Build a quarterly budget summary with revenue, expenses, and profit margins"
"Make a balance sheet with assets, liabilities, and equity sections"
"Create a monthly sales report with totals and subtotals by region"
```

### Create Data Tables with Formulas & Grouping

Generate structured data tables with automatic formatting and optional grouping with subtotals.

**Examples**:
```
"Create a sales table with Product, Quantity, Price, and Total columns (Total = Qty x Price)"
"Build a customer list with Name, Email, Phone, and Date Created"
"Make a transaction table grouped by month, with a subtotal row for each month"
```

### Explore Your Workbook

Discover and navigate your workbook structure without manual hunting.

**Examples**:
```
"Show me all the sheets in this workbook"
"What data tables do I have on this sheet?"
"List all the Excel tables in the Sales sheet"
"Read the data from the Summary sheet"
```

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

### File Attachments for Context

Upload images, PDFs, or other reference materials to give the AI additional context alongside your Excel work.

**Supported formats**:
- **Images**: PNG, JPEG, GIF, WebP (up to 5 MB each)
- **Documents**: PDF (up to 32 MB, 100 pages)

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
