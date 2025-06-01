# HyperPerfect Excel Add-in User Guide

This guide explains how to use the HyperPerfect Excel add-in's core operations: Clean, Analyze, and Revenue Waterfall.

## Table of Contents

- [Clean Operation](#clean-operation)
  - [Overview](#clean-overview)
  - [Options](#clean-options)
  - [How to Use](#how-to-use-clean)
- [Analyze Operation](#analyze-operation)
  - [Overview](#analyze-overview)
  - [Building Revenue Data](#building-revenue-data)
  - [Pivot Tables](#pivot-tables)
  - [Revenue Waterfall](#revenue-waterfall)
  - [Lookback Analysis](#lookback-analysis)
- [Revenue Waterfall Operation](#revenue-waterfall-operation)
  - [Overview](#waterfall-overview)
  - [Options](#waterfall-options)
  - [How to Use](#how-to-use-waterfall)
- [Tips and Best Practices](#tips-and-best-practices)

## Clean Operation <a name="clean-operation"></a>

### Overview <a name="clean-overview"></a>

The Clean operation helps you prepare and standardize your revenue data with formula-based transformations. It creates a new worksheet with formulas that clean and transform your source data according to your selected options.

### Options <a name="clean-options"></a>

#### Data Source
- **Choose Input Sheet**: Select the worksheet containing your source data.

#### Conversion Settings
- **Monthly to Annual Adjustment**: Apply a multiplier to convert between revenue types.
  - **None**: No conversion (multiplier = 1)
  - **Monthly → Annual**: Multiply monthly values by 12
  - **Annual → Monthly**: Divide annual values by 12

- **Unit Conversion**: Apply a conversion factor to standardize units.
  - **None**: No conversion (multiplier = 1)
  - **÷ 1,000**: Divide values by 1,000
  - **÷ 1,000,000**: Divide values by 1,000,000
  - **× 1,000**: Multiply values by 1,000
  - **× 1,000,000**: Multiply values by 1,000,000

#### Period Settings
- **Adjust Partial Periods**: Adjust partial period amounts at the start or end of revenue streams.
  - When enabled, partial month values at the beginning of a revenue stream are grossed up to the next month's value, and partial month values at the end of a revenue stream are adjusted to zero.

- **Plug Revenue Gaps**: Fill gaps in revenue streams with the revenue amount from the period following the gap.
  - **No**: Don't fill gaps
  - **Up to 1 Month**: Fill gaps up to 1 month in length
  - **Up to 2 Months**: Fill gaps up to 2 months in length

- **Remove Overlapping Values**: Remove overlapping revenue.
  - When enabled, if a revenue amount is exactly equal to the sum of the prior and next periods, the current period value will be adjusted to the amount in the next period.

#### Revenue Settings
- **Exclude Small Revenue Amounts**: Set a minimum value threshold - anything below will be set to zero.

### How to Use <a name="how-to-use-clean"></a>

1. Navigate to the **Clean** tab in the add-in.
2. Select your source data worksheet from the **Choose Input Sheet** dropdown.
3. Configure your desired cleaning options.
4. Click the **Clean Source Data with Formulas** button.
5. A new worksheet will be created with the naming convention `[SourceSheet]_Clean`.
6. The new worksheet will contain formulas that transform your data according to your selected options.

## Analyze Operation <a name="analyze-operation"></a>

### Overview <a name="analyze-overview"></a>

The Analyze operation helps you build context and create waterfalls and pivot tables with your revenue data. It provides tools for building revenue data, generating revenue waterfalls, and running pivot table analyses.

### Building Revenue Data <a name="building-revenue-data"></a>

The first step in the analyze operation is to build revenue data from your source data.

#### Options
- **Choose Input Sheet**: Select the worksheet containing your source data.
- **Fiscal Year End**: Select the month that represents the end of your fiscal year.

#### How to Use
1. Navigate to the **Analyze** tab in the add-in.
2. Select your source data worksheet from the **Choose Input Sheet** dropdown.
3. Select your fiscal year end month from the **Fiscal Year End** dropdown.
4. Click the **Build Revenue Data** button.
5. A new worksheet will be created with the naming convention `[SourceSheet]_Revenue`.

### Pivot Tables <a name="pivot-tables"></a>

The Pivot Tables feature allows you to create pivot table analyses of your revenue data.

#### Options
- **Select Primary Dimension**: Choose the primary dimension for your pivot table.
- **Rows**: Select how to group your data in rows.
  - **Monthly Cohorts**: Group by month
  - **Quarterly Cohorts**: Group by quarter
  - **Annual Cohorts**: Group by year
- **Select Period**: Choose the time period for your analysis.
  - **Months**: Show monthly data
  - **Quarters**: Show quarterly data
  - **Annual**: Show annual data
  - **Since Customer Inception**: Show data since the beginning of each customer relationship

#### How to Use
1. After building your revenue data, select your desired options for the pivot table.
2. Click the **Run Pivot Tables** button.
3. A new pivot table will be created in a new worksheet.

### Revenue Waterfall <a name="revenue-waterfall"></a>

The Revenue Waterfall feature creates a waterfall analysis of your revenue data, showing how revenue changes over time.

#### Options
- **Metric**: Select the metric to analyze.
  - **Revenue**: Analyze revenue amounts
  - **Customer Count**: Analyze customer counts
- **Show Cohorts**: Choose how to group your data.
  - **All**: Don't group by cohorts
  - **Monthly Cohorts**: Group by monthly cohorts
  - **Quarterly Cohorts**: Group by quarterly cohorts
  - **Annual Cohorts**: Group by annual cohorts
- **Dimension Filter**: Optionally filter your data by a specific dimension.
- **Select Included Value(s)**: If using a dimension filter, select which values to include.

#### How to Use
1. After building your revenue data, select your desired options for the waterfall.
2. Click the **Revenue Waterfall** button.
3. A new waterfall analysis will be created in a new worksheet with the naming convention `[SourceSheet]_Waterfall`.

### Lookback Analysis <a name="lookback-analysis"></a>

The Lookback Analysis feature allows you to analyze how revenue changes over time for specific cohorts.

#### Options
- **Lookback Detail**: Choose how to group your data.
  - **None**: Don't group by cohorts
  - **Monthly Cohorts**: Group by monthly cohorts
  - **Quarterly Cohorts**: Group by quarterly cohorts
  - **Annual Cohorts**: Group by annual cohorts
- **Lookback Duration**: Choose how far back to look.
  - **Since Initial Month**: Look back to the initial month
  - **X Months**: Look back X months
- **Initial Cohort Month**: Select which month to start from.

#### How to Use
1. After building your revenue data, select your desired options for the lookback analysis.
2. Click the **Lookback** button.
3. A new lookback analysis will be created in a new worksheet.

## Revenue Waterfall Operation <a name="revenue-waterfall-operation"></a>

### Overview <a name="waterfall-overview"></a>

The Revenue Waterfall operation creates a detailed analysis of how your revenue changes over time, breaking down revenue into components such as new business, expansion, contraction, and churn. This helps you understand the drivers of your revenue growth or decline.

### Options <a name="waterfall-options"></a>

- **Metric**: Choose between Revenue or Customer Count analysis.
- **Show Cohorts**: Group your data by different cohort types:
  - **All**: No cohort grouping
  - **Monthly Cohorts**: Group by month
  - **Quarterly Cohorts**: Group by quarter
  - **Annual Cohorts**: Group by year
- **Dimension Filter**: Filter your data by a specific dimension (e.g., Product, Region, etc.).
- **Select Included Value(s)**: Choose specific values to include in your filtered dimension.

### How to Use <a name="how-to-use-waterfall"></a>

1. Navigate to the **Analyze** tab in the add-in.
2. Select your source data worksheet from the **Choose Input Sheet** dropdown.
3. Select your desired metric from the **Metric** dropdown.
4. Choose your cohort grouping from the **Show Cohorts** dropdown.
5. Optionally, select a dimension to filter by and choose which values to include.
6. Click the **Revenue Waterfall** button.
7. A new worksheet will be created with the naming convention `[SourceSheet]_Waterfall`.
8. The waterfall analysis will show:
   - Revenue broken down by time period
   - New business, expansion, contraction, and churn components
   - Visual representation of revenue changes

## Tips and Best Practices <a name="tips-and-best-practices"></a>

### Data Preparation
- Ensure your source data has consistent column headers.
- For waterfall analysis, your data should include 'Start Month' and 'Cancel Month' columns.
- Clean your data before running analyses to ensure accurate results.

### Performance
- For large datasets, consider using the Clean operation first to standardize your data.
- Building revenue data is a prerequisite for most analysis operations.

### Troubleshooting
- If you encounter errors in the waterfall analysis about missing columns, check that your data includes the required 'Start Month' and 'Cancel Month' columns.
- If the add-in seems unresponsive, check for error messages at the bottom of the add-in panel.
- For best results, ensure your Excel data is formatted as a proper table with headers.