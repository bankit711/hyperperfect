# HyperPerfect Excel Add-in User Guide

**Transform your revenue analysis workflow in minutes, not days.** This guide explains how to use HyperPerfect's core operations to eliminate manual busywork and focus on reaching valuable conclusions with zero errors.

## Quick Start (3 Minutes)

### Step 1: Install the Excel Add-in (2 minutes)

1. Open **Excel Desktop**
2. Click **Home** → **Add-ins** → **More Add-ins** → **Store**
3. Search for **"HyperPerfect"** and click **Add**
4. You'll see the HyperPerfect panel appear in Excel

### Step 2: Try the Welcome Demo (30 seconds)

The **Welcome Demo** opens automatically the first few times you use HyperPerfect. Watch as we build a complete cohort analysis instantly using sample data. (If it doesn't open automatically, you can start it manually from the **Settings** tab.)

### Step 3: Download Demo Data

Get our comprehensive demo file from the **Resources** section at [HyperPerfect.ai](https://hyperperfect.ai/):

- **50 customers** with 28 months of revenue data (2023-2025)
- **Multiple product tiers** (Premium, Legacy, Subscription)
- **Perfect for testing** all HyperPerfect features

---

## Table of Contents

- [Core Operations Overview](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#core-operations-overview)
- [Clean Operation](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#clean-operation)
- [Analyze Operation](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#analyze-operation)
- [Revenue Waterfall Operation](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#revenue-waterfall-operation)
- [Advanced Features](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#advanced-features)
- [Performance Optimization](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#performance-optimization)
- [Tips and Best Practices](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#tips-and-best-practices)
- [Troubleshooting](https://claude.ai/chat/318c3d62-634d-40c1-9276-9bc4b4c7f40b#troubleshooting)

---

## Core Operations Overview

HyperPerfect solves the biggest time-wasters in revenue analysis:

### 🎯 **Clean** - Intelligent Data Cleaning

**Problem**: Messy billing data with refunds, partial periods, and format inconsistencies  
**Solution**: Automated cleaning with smart logic that fixes data issues instantly

### 📊 **Analyze** - Build Revenue Context

**Problem**: Hours spent building cohort analyses and quarterly summaries manually  
**Solution**: Generate complete analyses in under 2 minutes with perfect accuracy

### 💧 **Revenue Waterfall** - Visual Revenue Analysis

**Problem**: Complex waterfall logic that's prone to errors and takes forever to build  
**Solution**: Professional waterfall charts with dynamic filtering by segment

---

## Clean Operation

### Why Data Cleaning Matters

Most revenue analysis gets derailed by messy datasets. You're trying to understand recurring revenue, but your "revenue by month" data is actually billing data full of:

- **Refunds and account adjustments** that distort patterns
- **Partial billing periods** that under-represent churn
- **Missed revenue periods** that create false churn
- **Inconsistent formats** (monthly vs annual data)

**Manual cleaning takes hours.** You're building complicated Excel formulas, manually editing cells, and second-guessing every adjustment. By the time you're done cleaning, there's no time to actually analyze.

### How HyperPerfect Solves This

Set your cleaning rules once, apply them instantly:

- ✅ **Fix double billing periods** automatically
- ✅ **Handle partial billing periods** with smart logic
- ✅ **Convert between time periods** (monthly to annual, etc.)
- ✅ **Dynamic formulas** - change cleaning rules anytime, results flow to dashboards automatically

### Clean Options

#### Data Source

- **Choose Input Sheet**: Select the worksheet containing your source data.

#### Conversion Settings

- **Monthly to Annual Adjustment**: Apply a multiplier to convert between revenue types.
    
    - **None**: No conversion (multiplier = 1)
    - **Monthly → Annual**: Multiply monthly values by 12
    - **Annual → Monthly**: Divide annual values by 12
- **Unit Conversion**: Apply a conversion factor to standardize units.
    
    - **None**: No conversion (multiplier = 1)
    - **÷ 1,000**: Divide values by 1,000 (e.g., $1,000 → $1)
    - **÷ 1,000,000**: Divide values by 1,000,000 (e.g., $1M → $1)
    - **× 1,000**: Multiply values by 1,000
    - **× 1,000,000**: Multiply values by 1,000,000

#### Period Settings

- **Adjust Partial Periods**: Fix partial month amounts at revenue stream start/end
    
    - Partial month values at beginning are grossed up to next month's value
    - Partial month values at end are adjusted to zero
- **Plug Revenue Gaps**: Fill gaps in revenue streams automatically
    
    - **No**: Don't fill gaps
    - **Up to 1 Month**: Fill gaps up to 1 month in length
    - **Up to 2 Months**: Fill gaps up to 2 months in length
- **Remove Overlapping Values**: Eliminate double-counting
    
    - If revenue amount equals sum of prior and next periods, adjust to next period amount

#### Revenue Settings

- **Exclude Small Revenue Amounts**: Set minimum threshold - anything below becomes zero

### How to Use Clean

1. Navigate to the **Clean** tab in the add-in
2. Select your source data worksheet from **Choose Input Sheet** dropdown
3. Configure your desired cleaning options
4. Click **Clean Source Data with Formulas**
5. New worksheet created: `[SourceSheet]_Clean`
6. Contains formulas that transform data according to your options

---

## Analyze Operation

### Why Manual Analysis Is Broken

Analysts constantly rebuild the same analysis over and over. It takes forever, and every time they make mistakes. The endless cycle:

- Clean data → Organize data → Fix data → Build calculations → Create summaries → Present to boss → Find mistake → Start over

**Nothing kills credibility faster than showing up with incorrect calculations.** Your boss spots one error, and suddenly all your insights are questioned.

### How HyperPerfect Changes This

**Focus on insights, not busywork.** We eliminate the manual work so you can:

- ✨ Draw insights from clean, accurate calculations
- ✨ Tell the story your data reveals
- ✨ Make recommendations that drive business decisions
- ✨ Build credibility with bulletproof analysis

### Building Revenue Data

Transform your source data into analysis-ready format with cohort context.

#### Options

- **Choose Input Sheet**: Select worksheet containing source data
- **Fiscal Year End**: Select month representing end of your fiscal year

#### How to Use

1. Navigate to **Analyze** tab
2. Select source data worksheet from **Choose Input Sheet** dropdown
3. Select fiscal year end month from **Fiscal Year End** dropdown
4. Click **Build Revenue Data**
5. New worksheet created: `[SourceSheet]_Revenue`

### Quarterly & Annual Summaries

**The Hidden Quarterly Nightmare**: Quarterly summaries are where most Excel analyses go wrong. Fiscal vs. calendar quarters break Excel formulas, and one misaligned cell reference destroys everything.

**HyperPerfect's Solution**:

- **Fiscal year aware** - set your fiscal start month once, works forever
- **Perfect month mapping** - no more pointing to wrong cells
- **Smart revenue walk logic** - automatically chooses first month, sum, or last month
- **Instant generation** - what takes hours now happens in seconds

### Pivot Tables

Create cohort analyses with perfect quarterly and annual summaries.

#### Options

- **Select Primary Dimension**: Choose primary dimension for pivot table
- **Rows**: Select how to group data
    - **Monthly Cohorts**: Group by month
    - **Quarterly Cohorts**: Group by quarter
    - **Annual Cohorts**: Group by year
- **Select Period**: Choose time period for analysis
    - **Months**: Show monthly data
    - **Quarters**: Show quarterly data
    - **Annual**: Show annual data

#### How to Use

1. After building revenue data, select desired pivot table options
2. Click **Run Pivot Tables**
3. New pivot table created in new worksheet

---

## Revenue Waterfall Operation

### Why Revenue Walks Are Complex

Revenue waterfall quarterly summaries are especially tricky because different metrics need different approaches:

- **🔸 Starting Revenue**: Use first month of the period
- **🔸 New Revenue**: Sum all months in the period
- **🔸 Ending Revenue**: Use last month of the period

**HyperPerfect knows this automatically** and applies the right logic for each metric.

### Waterfall Options

- **Metric**: Choose between Revenue or Customer Count analysis
- **Show Cohorts**: Group data by cohort types:
    - **All**: No cohort grouping
    - **Monthly Cohorts**: Group by month
    - **Quarterly Cohorts**: Group by quarter
    - **Annual Cohorts**: Group by year
- **Dimension Filter**: Filter data by specific dimension (Product, Region, etc.)
- **Select Included Value(s)**: Choose specific values for filtered dimension

### How to Use Waterfall

1. Navigate to **Analyze** tab
2. Select source data worksheet from **Choose Input Sheet** dropdown
3. Select desired metric from **Metric** dropdown
4. Choose cohort grouping from **Show Cohorts** dropdown
5. Optionally select dimension filter and values to include
6. Click **Revenue Waterfall**
7. New worksheet created: `[SourceSheet]_Waterfall`
8. Waterfall analysis shows:
    - Revenue breakdown by time period
    - New business, expansion, contraction, churn components
    - Visual representation of revenue changes

---

## Advanced Features

### Dynamic Filtering by Segment

Compare how different customer segments perform instantly:

- Use customer data with **dimension columns** (e.g., product, region, etc.)
- Build a **Revenue Waterfall** using the **Dimension Filter**
- Pick **multiple values** to compare (Enterprise vs. Starter plans)
- **Adjust on the fly** using your spreadsheet's Filter column

### Example Use Cases

- Compare product performance (Premium vs. Legacy vs. Subscription)
- Analyze regional differences (North America vs. Europe)
- Segment by customer size (Enterprise vs. SMB)
- Filter by acquisition channel or any other dimension

---

## Performance Optimization

### The Excel Performance Problem

Working with thousands of rows? Most Excel users hit a wall when spreadsheets get large:

- Excel becomes sluggish with thousands of formulas recalculating
- Files take forever to open, save, or scroll through
- Simple edits trigger minutes of recalculation time

### HyperPerfect's Smart Solution

**Formula-to-Values Conversion** (in General Settings):

- ✅ **Eliminates thousands of formulas** that slow Excel down
- ✅ **Keeps first-row formulas intact** for each analysis
- ✅ **Copy/paste formulas anytime** you need them back
- ✅ **Values stay accurate** - formulas just aren't recalculating constantly

### How to Enable Performance Mode

1. Run any HyperPerfect analysis (Cohort Builder or Revenue Waterfall)
2. Go to **General Settings** and enable **"Convert output formulas to values"**
3. Run the analysis again and feel the difference in speed
4. Try copying formulas from the first row - they'll paste and work perfectly!

**Real-World Impact**: A customer with 100,000 rows told us this feature transformed their workflow from "unusable" to "instant."

---

## Tips and Best Practices

### Data Preparation

- **Consistent headers**: Ensure your source data has consistent column headers
- **Required columns**: For waterfall analysis, include 'Start Month' and 'Cancel Month' columns
- **Clean first**: Use Clean operation before analysis for best results
- **Table format**: Format your Excel data as a proper table with headers

### Workflow Optimization

1. **Start with Clean**: Always clean your data first to standardize formats
2. **Build Revenue Data**: This is prerequisite for most analysis operations
3. **Test with demo data**: Use our sample data to learn features risk-free
4. **Save cleaning settings**: Your data cleaning rules can be reused for future datasets

### Getting the Most Value

- **Focus on conclusions**: Spend your time analyzing patterns, not building spreadsheets
- **Use dynamic filtering**: Compare segments to find insights hidden in aggregate data
- **Leverage quarterly summaries**: Let HyperPerfect handle fiscal year complexities
- **Build once, use many times**: Set up your analysis template and reuse with new data

### Dashboard Integration

- **Dynamic updates**: Changes to cleaning rules flow through to dashboards automatically
- **Formula preservation**: First-row formulas stay intact for copying/modification
- **Audit trail**: Every calculation is traceable and auditable

---

## Troubleshooting

### Common Issues and Solutions

#### Installation Problems

- **Add-in not appearing**: Ensure you're using Excel Desktop (not Excel Online)
- **Store access issues**: Check your organization's add-in permissions
- **Welcome Demo not starting**: Manually start from Settings tab

#### Data Issues

- **Missing columns error**: Check that data includes required 'Start Month' and 'Cancel Month' columns
- **Inconsistent results**: Ensure source data has consistent formatting and headers
- **Performance issues**: Enable "Convert output formulas to values" in General Settings

#### Analysis Problems

- **Unexpected results**: Verify fiscal year settings match your business calendar
- **Missing data**: Check that all required columns are present and properly formatted
- **Slow performance**: Use Clean operation first, then enable formula-to-values conversion

#### Error Messages

- **Add-in unresponsive**: Check for error messages at bottom of add-in panel
- **Formula errors**: Ensure source data is formatted as proper Excel table
- **Calculation errors**: Verify data types are consistent (numbers vs. text)

### Getting Help

**Need immediate help?**

- 📖 **[Quick Start Guide](https://help.hyperperfect.ai/Quick+Start)** - Comprehensive setup instructions
- 🎥 **[Demo Videos](https://www.loom.com/share/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=a36dbc55-6efb-4a90-bee8-7a6d3b2d3bba)** - See features in action
- 📅 **[Schedule a Demo](https://calendly.com/di-hyperperfect/30min)** - Personal walkthrough
- 💬 **[Email Support](mailto:help@hyperperfect.ai)** - Direct help from our team

**Have feature ideas?** Email us at [help@hyperperfect.ai](mailto:help@hyperperfect.ai) with:

- Your feedback on current features
- Ideas for features you'd find valuable
- Data challenges we should solve next
- Or request a call to discuss your workflow

---

## What's Next: AI Features in Development

We're exploring AI features that enhance your workflow without letting mistakes creep into your analyses:

- **🔍 Smart Customer Segmentation** - AI categorizes customers into meaningful segments
- **🔗 Intelligent Data Matching** - Recognizes "ABC Corp" and "ABC Corporation" as the same customer
- **📊 Anomaly Detection** - Automatically flags unusual patterns that need investigation

Your input directly influences our roadmap. The best product features come from real user challenges, so please share what would make your analysis workflow even better.

---

_Stop rebuilding the same analysis over and over. With HyperPerfect handling the mechanics, you can finally focus on what you're really good at: turning data into insights that drive business results._

**Ready to transform your workflow?** Go back to [HyperPerfect's Home Page](https://www.hyperperfect.ai/)