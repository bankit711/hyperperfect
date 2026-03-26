---
title: "Full Excel Control"
description: "HyperPerfect now controls any programmable action in Excel, from charts to PivotTables to conditional formatting."
order: 10
category: "Using HyperPerfect"
---

HyperPerfect now controls any programmable action in Excel: charts, PivotTables, conditional formatting, data validation, named ranges, tables, and even sparklines.

## What Changed

Previously, HyperPerfect could read, write, and format cells. That covered a lot of ground, but there were things users asked for that weren't possible: building a chart, creating a PivotTable, adding conditional formatting rules.

Now the ceiling is gone. If Excel can do it programmatically, HyperPerfect can do it.

## What You Can Now Ask For

### Charts and Visualizations

```
"Create a bar chart from this sales data"
"Build a line chart showing monthly revenue trends"
"Add a combo chart with bars for revenue and a line for margin"
```

### PivotTables

```
"Build a PivotTable grouped by region and quarter"
"Create a PivotTable summarizing sales by product category"
"Add a PivotTable with customer name rows and monthly columns"
```

### Conditional Formatting

```
"Highlight values over budget in red"
"Add a color scale from green to red across this range"
"Apply data bars to show relative values"
"Add icon sets to flag high, medium, and low performance"
```

### Data Validation

```
"Create a dropdown list in column A with these options: Q1, Q2, Q3, Q4"
"Add validation to prevent negative numbers in the Amount column"
"Restrict this column to dates within the current fiscal year"
```

### Tables and Named Ranges

```
"Convert this range to an Excel table with filters"
"Create a named range called 'RevenueData' for A1:D100"
"Apply a table style with banded rows"
```

### And More

Named ranges, sparklines, custom number formats, worksheet protection, cell comments, hyperlinks. Anything the Excel API supports.

## How It Works

HyperPerfect uses a translation layer between the AI and Excel that maximizes AI performance. Instead of sending raw Excel API calls (which can overwhelm the AI with unnecessary detail), HyperPerfect translates your request into the right operations and handles the technical execution.

You describe what you want in plain English. HyperPerfect figures out the implementation.

## Tips

- **Be specific about data ranges**: "Create a chart from A1:D20" works better than "make a chart"
- **Describe the outcome**: "Show me a trend over time" lets the AI pick the right chart type
- **Iterate**: Ask for a chart, then refine it. "Make the bars blue" or "Add data labels"
- **Combine with agents**: Deploy a formatting agent to apply conditional formatting across your entire workbook while you keep working
