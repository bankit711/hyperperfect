# Quick Start Instructions

Our Excel add-in automate your Excel workflow for customer revenue analysis.  You can Instantly clean data and create revenue waterfalls and cohort analyses — all built with auditable formulas directly in Excel.

## Core Functionality Testing Steps

### 1. Install and Open the Add-in
- Install and launch the HyperPerfect Add-in by running Excel Desktop and clicking **Home** (in the ribbon) -> **Add-ins** -> **More Add-ins** -> **Store** -> Search for "HyperPerfect" -> **Add**

#### If Admin installation is required, send these instructions to your IT department
- Must be a Global Admin or Office Apps Admin.
- 1. Go to the [Microsoft 365 Admin Center](https://admin.microsoft.com)
- Navigate to **Settings** -> **Integrated apps** -> **Get apps** -> Search for "HyperPerfect" 
- Assign Users or Groups
- Review your choices and click **Finish deployment**

### 2. Overview
- After sign-in, the add-in’s task pane loads.
- The app has three main menu pages accessible via the top menu bar:
  - **Clean**: Cleans customer revenue data for normalization prior to analysis.
  - **Analyze**: Adds context to revenue data ("Build" functionality) and creates revenue waterfall analyses ("Revenue Waterfall" functionality).
- The **AI** section is a placeholder for future feature releases.
- **Settings** section is a placeholder for future feature releases.

Here's a quick look at how the functionality works:

<iframe width="640" height="423" src="https://www.loom.com/embed/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=925b97a6-408b-4fad-8521-014dba1771b4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### 3. Use the Clean Dashboard
- Select an Excel worksheet from the **"Choose Input Sheet" dropdown**, containing dimensional data columns (e.g., customer names, attributes) and monthly revenue data.
- Monthly revenue data headers should be date-formatted
- The data table should start in cell A1

Example source data table:

| Customer  | Product | 1/1/25 | 2/1/25 | 3/1/25 | 4/1/25 | 5/1/25 | 6/1/25 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Microsoft | Excel   |  1,430 |  1,501 |  1,504 |  1,509 |  1,540 |  1,539 |
| Apple     | Numbers |    101 |    102 |    115 |    110 |    109 |    112 |
| Google    | Sheets  |    556 |    575 |    599 |    625 |    655 |    689 |

- Use dropdown menus for various cleaning settings (e.g., convert monthly revenue to annual revenue via **"Monthly -> Annual"** adjustment).
- Multiple adjustments can be applied simultaneously.
- Click **"Clean Source Data with Formulas"** to create a new sheet with cleaned data.

### 4. Use the Analyze Dashboard to Build a Revenue Data Table
- Navigate to the **Analyze Dashboard**.
- Select an Excel worksheet via the **"Choose Input Sheet" dropdown** containing dimensional and monthly revenue data (the cleaned data output from the previous step or a similar data table with dimensions and month revenue).
- Choose fiscal year-end from dropdown if other than December.
- Build a revenue data table that includes cohort details and quarterly/annual summaries, outputting results to a new sheet.

### 5. Use the Analyze Dashboard to Build a Revenue Waterfall
- After building the revenue data table, construct a Revenue or Customer Count Waterfall using the output:
  - Segregate data by Revenue Type (start, new, upgrade, cancel, etc.) and Cohort groupings.
  - Click **"Revenue Waterfall"** to display results in a new sheet.
  - Note: you must use the output from the Revenue Build to be the input sheet for this operation

## Additional Notes
- **Cohorts**: Waterfalls can be grouped by monthly, quarterly, and annual cohorts if desired
- **Filters**: Waterfalls can be filtered by any dimension from the source sheet.  Output results will only include Chosen , which can be helpful when wanting to analyze performance for a parti

Please contact us at help@hyperperfect.ai if further assistance is required. Thank you for using our software!

