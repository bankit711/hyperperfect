# Working with Excel in HyperPerfect

HyperPerfect's AI assistant can read, write, format, and visualize your Excel data through natural conversation. This guide shows you how to get the most out of Excel integration.

## Getting Started

**Prerequisites**: Have Excel open in your browser with your spreadsheet loaded.

**Basic Workflow**:
1. Select the data you want to work with in Excel
2. Return to HyperPerfect and describe what you want to do
3. The AI handles the rest automatically

## What You Can Do

### Read and Analyze Data

The AI can examine your Excel data and provide insights, summaries, or calculations.

**Examples**:
```
"Analyze the selected data and find patterns"
"What's the average of these sales figures?"
"Summarize this data in bullet points"
"Look at A1:D10 and tell me if there are any outliers"
```

**Tips**:
- Select your data first for automatic detection
- Or specify the range like "A1:D10" or "B2:F20"
- Named ranges work too: "analyze the SalesData range"

### Write Data and Results

The AI can write calculation results, summaries, or processed data directly to your spreadsheet.

**Examples**:
```
"Calculate statistics and write them to A10:B15"
"Put these results in column F"
"Write the summary to B2:D8"
"Fill A1:C5 with the processed data"
```

**Tips**:
- Specify where you want the data written
- The AI will tell you if the target range has existing data
- All data is written at once for best performance

### Format Cells

The AI can apply professional formatting including fonts, colors, borders, and alignment.

**Examples**:
```
"Format A1:F1 as a professional header with bold text and blue background"
"Highlight values above 1000 in green and below 500 in red"
"Make this table look professional with alternating row colors and borders"
"Format column C as currency with right alignment"
"Create a traffic light system - green for >90%, yellow for 70-90%, red for <70%"
```

**Available Formatting**:
- **Text styling**: Font, size, bold, italic, color
- **Cell backgrounds**: Fill colors
- **Borders**: Styles and colors on any side
- **Alignment**: Horizontal, vertical, text wrapping
- **Conditional formatting**: Based on values or conditions

### Create Charts

The AI can generate Excel charts from your data with customized titles and styling.

**Available Chart Types**:
- **Column charts**: Compare categories side-by-side
- **Line charts**: Show trends over time
- **Pie charts**: Display proportions
- **Bar charts**: Like column charts but horizontal

**Examples**:
```
"Create a column chart comparing monthly sales"
"Show the growth trend with a line chart"
"Make a pie chart showing breakdown by category"
"Create a chart with title 'Q1-Q4 Performance' and blue colors"
```

**Tips**:
- Include column headers in your selection
- Make sure numeric data is formatted as numbers, not text
- Keep pie charts to 7-8 categories maximum
- Remove empty rows/columns before creating charts

### Batch Operations

When you need multiple Excel operations, the AI can execute them together for better performance.

**Examples**:
```
"Read this data, calculate averages, write them to column F, and format as currency"
"Analyze this range, create a summary table with formatting, and add a chart"
```

The AI automatically combines related operations when appropriate.

## Common Workflows

### Data Analysis
1. **Select your data** in Excel
2. **Ask for analysis**: "Analyze this sales data and identify trends"
3. **Get insights**: The AI reads, processes, and explains findings

### Report Creation
1. **Select source data**
2. **Request formatted output**: "Create a professional summary table with these statistics"
3. **Review results**: The AI writes data, applies formatting, and optionally creates charts

### Data Transformation
1. **Select data to transform**
2. **Describe the change**: "Clean this data and highlight any errors"
3. **Verify results**: The AI processes, writes cleaned data, and applies visual indicators

## Tips for Best Results

### Working with Selections
- **Select first, ask second**: Selecting data before asking helps the AI understand context
- **Be specific when needed**: If auto-detection isn't working, specify ranges like "A1:D10"
- **Check your selection**: Verify you've selected the right cells in Excel

### Performance
- **Work with manageable ranges**: Large datasets may be slow
- **Break up big operations**: Process large files in chunks
- **Save frequently**: Save your Excel file before major operations

### Avoiding Common Issues
- **Match dimensions**: When writing data, the AI ensures the data fits the range
- **Use clear requests**: "Format this as currency" is clearer than "make it better"
- **Include headers**: When creating charts, include header rows/columns in your selection
- **Verify data types**: Make sure numbers are formatted as numbers in Excel

## Troubleshooting

### "Can't find that range"
- Check your Excel selection
- Verify range syntax (A1:D10, not A1-D10)
- Make sure the range exists in your active sheet

### Operations are slow
- Reduce the size of the data range
- Work with smaller portions of large datasets
- Save and close other Excel files

### Charts aren't creating properly
- Ensure your selection includes numeric data
- Include header rows/columns
- Remove empty rows/columns from the selection
- Check that data is formatted as numbers, not text

### Data isn't writing correctly
- Verify the target range is correct
- Check if the sheet is protected
- Make sure there's enough space for the data

## Getting Help

You can always ask the AI for help with Excel operations:

```
"What's in my current selection?"
"Show me the data in range A1:D10"
"What went wrong with that operation?"
"How do I format this as a table?"
"What chart type should I use for this data?"
```

The AI is designed to be conversational - just describe what you want to accomplish with your Excel data, and it will guide you through the process.
