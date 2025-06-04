# HyperPerfect Quick Start Guide

**Transform your revenue analysis workflow in 5 minutes.** Our Excel add-in automates customer revenue analysis, letting you instantly clean data and create revenue waterfalls and cohort analyses — all built with auditable formulas directly in Excel.

**What You'll Experience:**

- ⚡ **2-minute cohort analyses** (instead of 2-day manual builds)
- 🎯 **Zero calculation errors** (every formula mathematically perfect)
- 📊 **Automatic quarterly/annual summaries** (fiscal year aware)
- 🔧 **Dynamic filtering by segment** (Product, region, etc.)
- 💡 **Focus on insights, not busywork** (finally analyze instead of calculate)

---

## Get Started

### Step 1: Register for Free

Signup required to get access to the add-in, and you must enter the email that you use to sign into Excel.

<a href="Sign Up.md" class="internal-link" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Sign Up For Instant Access</a>

### Step 2: Install the Excel Add-in (2 minutes)

**For Individual Users:**

1. Open **Excel Desktop**
2. Click **Home** → **Add-ins** → **More Add-ins** → **Store**
3. Search for **"HyperPerfect"** and click **Add**
4. You'll see the HyperPerfect panel appear in Excel

**For IT Administrators:** If admin installation is required, send these instructions to your IT department:

- Must be a Global Admin or Office Apps Admin
- Go to the [Microsoft 365 Admin Center](https://admin.microsoft.com/)
- Navigate to **Settings** → **Integrated apps** → **Get apps** → Search for "HyperPerfect"
- Assign Users or Groups
- Review choices and click **Finish deployment**

### Step 3: Try the Welcome Demo (30 seconds)

The **Welcome Demo** opens automatically the first few times you use HyperPerfect. Watch as we build a complete cohort analysis instantly using sample data. This 30-second demo shows you exactly what's possible.

_(If it doesn't open automatically, you can start it manually from the **Settings** tab.)_

---

## Understanding the Interface

After sign-in, the add-in's task pane loads with three main sections:

### 🎯 **Clean Dashboard**

**Purpose**: Cleans customer revenue data for normalization prior to analysis  
**Solves**: Messy billing data with refunds, partial periods, and format inconsistencies  
**Time Saved**: Hours of manual data cleaning → Minutes of automated processing

### 📊 **Analyze Dashboard**

**Purpose**: Adds context to revenue data and creates revenue waterfall analyses  
**Solves**: Manual cohort building and quarterly summary errors  
**Time Saved**: Days of manual analysis → 2-minute automated builds

### 🤖 **AI & Settings**

**Purpose**: Future AI features and configuration options  
**Coming Soon**: Smart customer segmentation, intelligent data matching, anomaly detection

---

## Your First Analysis (5 Minutes)

### Quick Demo Video

See how the complete workflow works:

<iframe width="640" height="423" src="https://www.loom.com/embed/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=925b97a6-408b-4fad-8521-014dba1771b4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Sample Data Format

Your data should look like this, starting in cell A1:

|Customer|Product|1/1/25|2/1/25|3/1/25|4/1/25|5/1/25|6/1/25|
|---|---|--:|--:|--:|--:|--:|--:|
|Microsoft|Excel|1,430|1,501|1,504|1,509|1,540|1,539|
|Apple|Numbers|101|102|115|110|109|112|
|Google|Sheets|556|575|599|625|655|689|

**Requirements:**

- Dimensional data columns (customer names, attributes)
- Monthly revenue data with date-formatted headers
- Data table starting in cell A1

---

## Step-by-Step Workflow

### 1. Clean Your Data (Optional but Recommended)

**Why Clean First?** Most revenue analysis gets derailed by messy datasets full of refunds, partial billing periods, and format inconsistencies. Manual cleaning takes hours and is error-prone.

**How to Clean:**

1. Navigate to the **Clean Dashboard**
2. Select your source worksheet from **"Choose Input Sheet"** dropdown
3. Configure cleaning options:
    - **Monthly to Annual Adjustment**: Convert between revenue types
    - **Unit Conversion**: Standardize to thousands/millions
    - **Adjust Partial Periods**: Fix partial month amounts
    - **Plug Revenue Gaps**: Fill missing periods automatically
    - **Remove Overlapping Values**: Eliminate double-counting
4. Click **"Clean Source Data with Formulas"**
5. New worksheet created: `[SourceSheet]_Clean`

**Pro Tip**: Multiple adjustments can be applied simultaneously. All cleaning uses dynamic formulas, so changes flow through automatically.

### 2. Build Revenue Context

**Why This Step Matters:** Raw data doesn't have the context needed for cohort analysis. This step adds fiscal year awareness and quarterly summaries.

**How to Build:**

1. Navigate to the **Analyze Dashboard**
2. Select your worksheet (cleaned data or original) from **"Choose Input Sheet"** dropdown
3. Choose fiscal year-end from dropdown (if other than December)
4. Click **"Build Revenue Data"**
5. New worksheet created: `[SourceSheet]_Revenue`

**What You Get:**

- Cohort details for each customer
- Quarterly and annual summaries (fiscal year aware)
- Start/cancel month context for waterfall analysis

### 3. Create Revenue Waterfall

**Why Waterfalls Are Powerful:** Revenue waterfalls show how your revenue changes over time, breaking down growth into new business, expansion, contraction, and churn components.

**How to Build:**

1. After building revenue data, stay in **Analyze Dashboard**
2. Configure waterfall options:
    - **Metric**: Choose Revenue or Customer Count
    - **Show Cohorts**: Group by Monthly, Quarterly, Annual, or All
    - **Dimension Filter**: Filter by Product, Region, etc. (optional)
    - **Select Values**: Choose specific segments to include
3. Click **"Revenue Waterfall"**
4. New worksheet created: `[SourceSheet]_Waterfall`

**Advanced Feature - Dynamic Filtering:**

- Use dimension columns to compare segments (Enterprise vs. Starter)
- Pick multiple values to compare simultaneously
- Adjust results on the fly using spreadsheet filter columns

---

## Advanced Tips & Features

### Performance Optimization

**For Large Datasets (1000+ rows):**

1. Go to **General Settings**
2. Enable **"Convert output formulas to values"**
3. Eliminates thousands of slow-running formulas
4. Keeps first-row formulas intact for copying/modification

### Quarterly Summary Accuracy

**HyperPerfect automatically handles:**

- Fiscal vs. calendar year differences
- Smart revenue walk logic (first month vs. sum vs. last month)
- Perfect month mapping with zero errors
- Instant quarterly and annual summaries

### Dashboard Integration

**Dynamic Updates:**

- Change cleaning rules → Results flow to dashboards automatically
- Modify fiscal year settings → All summaries update instantly
- Add new data → Append without rebuilding entire analysis

---

## Troubleshooting

### Common Issues

**Installation Problems:**

- **Add-in not appearing**: Use Excel Desktop (not Excel Online)
- **Store access issues**: Check organization's add-in permissions

**Data Issues:**

- **Missing columns error**: Include 'Start Month' and 'Cancel Month' columns for waterfall analysis
- **Inconsistent results**: Ensure consistent formatting and headers
- **Performance slow**: Enable "Convert output formulas to values" in Settings

**Analysis Problems:**

- **Unexpected quarterly results**: Verify fiscal year settings match your business calendar
- **Missing waterfall data**: Use revenue build output as input for waterfall analysis
- **Dimension filter not working**: Ensure dimension columns have consistent values

### Getting Help

**Immediate Support:**

- 📧 **Email**: [help@hyperperfect.ai](mailto:help@hyperperfect.ai) - Direct help from our team
- 📅 **Training Session**: [Schedule a 30-min demo](https://calendly.com/di-hyperperfect/30min) - Personal walkthrough
- 🎥 **Demo Video**: [Watch complete workflow](https://www.loom.com/embed/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=925b97a6-408b-4fad-8521-014dba1771b4)

**Feature Requests:** We want to build what you actually need. Email us with:

- Ideas for features you'd find valuable
- Data challenges we should solve next
- Workflow improvements that would help

---

## What's Next?

### Download Demo Data

Get our comprehensive demo file from the **Resources** section at [HyperPerfect.ai](https://hyperperfect.ai/):

- **50 customers** with 28 months of revenue data
- **Multiple product tiers** (Premium, Legacy, Subscription)
- **Perfect for testing** all features risk-free

### Explore Advanced Features

- **Cohort Analysis**: Monthly, quarterly, and annual groupings
- **Segment Filtering**: Compare performance by any dimension
- **Performance Mode**: Handle enterprise-scale datasets
- **Fiscal Year Support**: Any fiscal calendar configuration

### Future AI Features

We're developing AI features that enhance your workflow without letting mistakes creep into your analyses:

- **Smart Customer Segmentation**: AI categorizes customers automatically
- **Intelligent Data Matching**: Recognizes similar company names
- **Anomaly Detection**: Flags unusual patterns for investigation

---

**Ready to transform your workflow?**

If you're not building cohort analyses in less than 5 minutes, we need to talk! Contact us at [help@hyperperfect.ai](mailto:help@hyperperfect.ai) and let us help you streamline your revenue analysis process.

_Stop rebuilding the same analysis over and over. Focus on what you're really good at: turning data into insights that drive business results._

---

Go back to [HyperPerfect's Home Page](https://www.hyperperfect.ai/)