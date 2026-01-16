# Working with Excel in HyperPerfect

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
- The AI works with large datasets efficiently—just ask, and it will handle it
- You can ask follow-up questions about the same data without re-selecting

### Create & Write Results Back to Excel

Ask the AI to calculate results and write them directly to your spreadsheet. This is useful for creating summaries, calculations, analysis results, or processed data.

**Examples**:
```
"Calculate monthly totals and write them to column F"
"Create a summary of this data in cells A10:C15"
"Add a calculation column that multiplies Quantity × Price"
"Write statistics (mean, median, max, min) for this range"
"Process this raw data and write the cleaned version to column B"
```

**Tips**:
- Be specific about where results should go (e.g., "column F" or "A10:B15")
- The AI will avoid overwriting important data and let you know if adjustments are needed
- Results are written all at once for efficiency

### Format & Style Your Data

Make your data look professional with formatting. You can style text, colors, alignment, borders, and number formats.

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
- **Borders**: Customizable on any edge (top, bottom, left, right) with different styles (thin, thick, dashed, etc.)
- **Alignment**: Left/center/right, top/center/bottom, text wrapping, indentation
- **Number formats**: Currency, percentage, decimals, dates, and custom formats
- **Column and row sizing**: Auto-fit or set custom widths and heights

**Note on Conditional Formatting**: You cannot create new conditional formatting rules through HyperPerfect, but you can copy existing conditional formatting from one range to another if you have it set up in your spreadsheet.

### Organize & Restructure Your Data

Move data around, duplicate ranges, or delete rows and columns to reorganize your workbook.

**Examples**:
```
"Copy this data from column A to column D"
"Move the summary section from A1:C10 to E1:G10"
"Delete rows 5 through 10"
"Delete column D (the old data column)"
"Copy the formatting from this header row to the data rows below"
```

**Capabilities**:
- **Copy ranges**: Duplicate data to another location (formulas adjust automatically)
- **Move ranges**: Relocate data and clear the original location
- **Delete rows or columns**: Remove entire rows/columns from your worksheet
- **Copy formatting only**: Apply the look of one area to another without changing values

### Generate Professional Reports

Create hierarchical, structured reports like P&Ls, budgets, or balance sheets with automatic formatting and styling.

**Examples**:
```
"Create a professional P&L report for this data"
"Build a quarterly budget summary with revenue, expenses, and profit margins"
"Make a balance sheet with assets, liabilities, and equity sections"
"Create a monthly sales report with totals and subtotals by region"
```

**What's Included**:
- Automatic indentation and section organization
- Professional styling for headers, totals, and subtotals
- Formula support—you can tell the AI how rows should relate (e.g., "Profit = Revenue - COGS")
- Column widths automatically adjusted for readability
- Works with data in Excel or data you describe to the AI

### Create Data Tables with Formulas & Grouping

Generate structured data tables with automatic formatting, number types (currency, dates, etc.), and optional grouping with subtotals.

**Examples**:
```
"Create a sales table with Product, Quantity, Price, and Total columns (Total = Qty × Price)"
"Build a customer list with Name, Email, Phone, and Date Created"
"Make a transaction table grouped by month, with a subtotal row for each month"
"Create an inventory table with Item, Quantity, Unit Cost, and Total Value calculated"
```

**What's Included**:
- Professional header row
- Automatic number formatting (currency columns show $, percentage columns show %, etc.)
- Formula columns calculated automatically
- Optional grouping with automatic subtotals
- Column widths automatically adjusted
- All styling applied for a polished look

### Explore Your Workbook

Discover and navigate your workbook structure without manual hunting.

**Examples**:
```
"Show me all the sheets in this workbook"
"What data tables do I have on this sheet?"
"List all the Excel tables in the Sales sheet"
"Read the data from the Summary sheet"
```

**What You Can Do**:
- **List all sheets** - See every worksheet in your workbook
- **Discover Excel tables** - Find and reference existing tables by name
- **Cross-sheet operations** - Read from one sheet and write to another in a single request
- **Understand structure** - Get a complete picture of your workbook layout

### Create New Sheets

Organize your workbook by adding new worksheets as needed.

**Examples**:
```
"Create a new sheet called 'Analysis'"
"Add a sheet named 'Dashboard' at the beginning"
"Create sheets for each quarter (Q1, Q2, Q3, Q4)"
```

### Batch Multiple Operations

When you need several changes at once, the AI can combine them into one efficient operation.

**Examples**:
```
"Read this data, calculate totals, write them to column F, and format as currency"
"Create a summary table with this data and apply professional formatting"
"Clean up this dataset and organize it into a nice table"
```

The AI automatically combines related operations when appropriate for efficiency.

## How the AI Works Behind the Scenes

### Thinking Display

Watch the AI reason through your request in real-time. The AI shows its step-by-step thinking process as it works.

**What you'll see**:
- A collapsible "Thinking" section appears during processing
- Click to expand and see the AI's reasoning step-by-step
- Helps you understand how the AI approached your request
- Useful for validating that the AI understood your request correctly

**Why it helps**:
- Gain confidence in AI recommendations by seeing the reasoning
- Catch misunderstandings early in the process
- Learn from the AI's analytical approach to problems

### Automatic Error Recovery

If something goes wrong, the AI automatically retries with corrections.

**How it works**:
- The AI validates all operations before executing them in Excel
- If validation fails, the AI explains the issue and automatically adjusts
- Fixes are applied and retried without you needing to ask again
- You see clear feedback about what was wrong and how it was fixed

**Why it helps**:
- Fewer failed operations interrupting your workflow
- AI learns from errors and adjusts automatically
- Clear explanations when something can't be completed

### File Attachments for Context

Upload images, PDFs, or other reference materials to give the AI additional context alongside your Excel work.

**Supported formats**:
- **Images**: PNG, JPEG, GIF, WebP (up to 5 MB each)
- **Documents**: PDF (up to 32 MB, 100 pages)

**How to use**:
1. Click the paperclip icon or use `@attach` command
2. Or drag and drop files directly onto the chat
3. Files remain available throughout your entire conversation
4. Click the X on any file to remove it

**Why it helps**:
- Provide screenshots, diagrams, or reference material without switching tools
- Share documentation for the AI to reference while building solutions
- Get visual analysis without manual copying or pasting
- Build on previous attachments across multiple messages

**Example**:
Upload a screenshot of a report template, then say "Create a similar report using this data" and the AI will reference both the template and your Excel data.

## Common Workflows

### Quick Analysis
1. **Select your data** in Excel
2. **Ask a question**: "What are the top 3 products by revenue?" or "Is there a trend in this data?"
3. **Get instant insights**: The AI examines your data and provides the answer

### Building a Report
1. **Have your data ready** (either selected in Excel or described)
2. **Request the report**: "Create a P&L report" or "Build a quarterly summary with totals"
3. **Done**: Professional, formatted report appears in your spreadsheet with all calculations

### Cleaning & Processing Data
1. **Select the raw data**
2. **Ask for processing**: "Remove duplicates and sort by date" or "Extract the month and year from these dates"
3. **Get the results**: Cleaned data written to a new location or column, ready to use

## Tips for Best Results

### Getting Accurate Results
- **Select data before asking**: Selecting the data in Excel before your request helps the AI understand exactly what you want to work with
- **Be specific about locations**: When requesting results be written, specify where (e.g., "write to column F" or "put the summary starting at A10")
- **Use natural language**: You don't need technical terminology—just describe what you want in plain English

### Large Datasets
- **The AI handles large files**: HyperPerfect automatically works efficiently with large datasets, sampling them smartly to stay fast
- **Still be reasonable**: Extremely large ranges (many thousands of rows) may take longer to process
- **Break up complex requests**: If you're doing multiple unrelated tasks, it's fine to ask in separate requests

### Getting the Look You Want
- **Be specific about formatting**: Instead of "make it look nice," try "format the header with bold text and a blue background"
- **The AI learns context**: If you show an example of formatting you like, the AI can apply similar styling to other data
- **Colors work**: You can ask for specific colors (e.g., "green background," "red text") and the AI will use them

### Data Preparation
- **Numbers as numbers**: Make sure numeric columns are formatted as numbers in Excel (not text) for best analysis
- **Consistent formatting**: Data is easier to work with when similar items are formatted consistently
- **Clear headers**: Include headers in your data so the AI knows what each column represents

### Managing Long Conversations
- **Watch the context indicator**: Shows memory usage as a percentage (green 0-70%, orange 70-85%, red 85%+)
- **Use @compact when orange**: Summarize old messages to free up space while keeping important context
- **Use @clear to start fresh**: When switching to a completely different task, start with a clean conversation
- **System auto-compacts at 85%**: The AI automatically compacts when getting close to limits to prevent interruptions

## Troubleshooting

### "Can't find that range"
- Make sure the range exists in your active Excel sheet
- Check the syntax: Excel ranges are written as "A1:D10" (not "A1-D10" or "A1 to D10")
- If selecting, make sure you've selected in the correct sheet

### Data isn't appearing where I expected
- Verify you specified the correct starting location (e.g., "A1" not "row 1")
- Check that the sheet isn't write-protected
- Confirm there's enough empty space for the data being written

### Formulas aren't calculating
- Make sure any formula columns reference the correct cells or labels
- Check that you're using Excel-compatible formula syntax
- If copying formulas to a new location, they should adjust automatically

### Operations taking too long
- Very large ranges (100,000+ cells) may take longer to process
- Close other tabs or files to free up system resources
- For massive datasets, consider breaking the work into smaller chunks

### Results look different than expected
- Ask the AI to "show me what you wrote" by having it read back the range
- Formatting can be adjusted in a follow-up request—just describe the changes
- Number formats can be changed; let the AI know if a currency column should display differently

## Getting Help

The AI is designed to be conversational. You can ask questions about your work at any time:

```
"What's in my current selection?"
"Show me the data in range A1:D10"
"What went wrong with that operation?"
"Can you explain what those numbers represent?"
"How should I organize this data for analysis?"
"What calculations make sense for this dataset?"
```

Just describe what you want to accomplish with your Excel data, and the AI will guide you through the process. If something doesn't work as expected, let the AI know—it will help troubleshoot and suggest alternatives.
