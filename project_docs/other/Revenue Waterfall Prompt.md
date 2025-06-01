Below is a proposed **Detailed Plan** for adding a new feature that generates the **Revenue Waterfall** on a new sheet. The plan references existing patterns in the codebase, highlights new steps, and indicates where code changes and additions should occur. The plan is organized by file (both existing ones that need modifications and a new one).

# Detailed Implementation Plan for the Revenue Waterfall Feature

This plan integrates the additional **answers** and **new formula instructions** provided, addressing developer follow-up questions. Below is the final, consolidated approach to building the **Revenue Waterfall** feature in this project.

---

## Table of Contents
1. [New Functionality Summary](#1-new-functionality-summary)
2. [Answers Incorporated](#2-answers-incorporated)
3. [Overview of Process](#3-overview-of-process)
4. [New/Modified Files](#4-newmodified-files)
   - 4.1. [\`formulaAnalyzeController.js\`](#41-formulaanalyzecontrollerjs)
   - 4.2. [New File: \`waterfallController.js\`](#42-new-file-waterfallcontrollerjs)
   - 4.3. [\`eventHandlers.js\`](#43-eventhandlersjs)
   - 4.4. [\`analyzeController.js\`](#44-analyzecontrollerjs)
   - 4.5. [\`stateManager.js\`](#45-statemanagerjs)
   - 4.6. [\`quartersYears.js\`](#46-quartersyearsjs)
5. [Implementation Steps](#5-implementation-steps)
   - 5.1. [Reading the Source Sheet](#51-reading-the-source-sheet)
   - 5.2. [Determining Cohort Groups](#52-determining-cohort-groups)
   - 5.3. [Building the Destination Columns](#53-building-the-destination-columns)
   - 5.4. [Building the Output Rows](#54-building-the-output-rows)
   - 5.5. [Applying Formulas](#55-applying-formulas)
   - 5.6. [Creating the Output Worksheet](#56-creating-the-output-worksheet)
   - 5.7. [Inserting Spacer Rows](#57-inserting-spacer-rows)
6. [Formula Adaptation Details](#6-formula-adaptation-details)
7. [Edge Cases & Validation](#7-edge-cases--validation)
8. [Next Steps](#8-next-steps)

---

## 1. New Functionality Summary

We are creating a **“Revenue Waterfall”** feature with the following behavior:
- Triggered by **“Revenue Waterfall”** button in `analyze.html`.
- Similar to `processAnalyzeOperation` but with a specialized output layout:
  - Source sheet has columns:
    - One or more dimension columns,
    - A **Start Month** column (header = “Start Month”),
    - A **Cancel Month** column (header = “Cancel Month”),
    - Date/month columns,
    - Quarter/year columns (ignored for reading, but used in final layout).
  - Output sheet has columns in this order:
    1. **Revenue Type** (Start, New, Reactivated, Upgrade, Downgrade, Deactivated, Canceled, Finish),
    2. **Cohort**,
    3. **Filter**, 
    4. **All date/month columns**,
    5. **Spacer**,
    6. **Quarters** (always included),
    7. **Spacer**,
    8. **Years** (always included).
  - We replicate styling from the analyze operation:
    - Headers in **bold**,
    - “Revenue Type,” “Cohort,” and “Filter” columns **left-justified**,
    - Date/month/quarter/year columns **right-justified** with the same numeric formatting as analyze.
- Cohorts come from the “Row Detail” dropdown:
  - **none**: single cohort = “All”,
  - **monthly**: each unique Start Month,
  - **quarterly** or **annual**: uses the existing logic in `quartersYears.js` (respecting `fiscalYearStartMonth`).
- For each cohort, we insert 8 consecutive rows (one per “Revenue Type”), then a spacer row.
- Each row’s date columns use specialized **SUMPRODUCT** formulas referencing the source sheet’s Start/Cancel/Filter columns.
- The new sheet is named `<sourceSheetName>_Waterfall`.

---

## 2. Answers Incorporated

Below are clarifications and constraints provided, now reflected in the final design:

1. **Start/Cancel headers**: The Start Month column has the header “Start Month,” and the Cancel Month column has the header “Cancel Month.”
2. **New formula guidance**: See Section 6 on formula adaptation.
3. **Quarter & year logic**: Must reuse the existing approach from `quartersYears.js`, which depends on `fiscalYearStartMonth`.
4. **Always include quarters & years** columns in the final output.
5. **Spacer rows** after every set of 8 revenue-type rows should be fully **empty** (no data).
6. **Performance** for ~100 columns and ~600 rows: We can reuse chunk-based streaming or keep it simpler if performance is still acceptable. (At 600 rows x 100 columns = 60k cells, chunking is likely not mandatory, but reuse existing patterns if easy.)
7. **Styling**:
   - Use the same style approach as analyze operations:
     - Bold headers, left-justified for first three columns, numeric/ right-justified for date/quarter/year columns.
8. **Destination sheet column order** is always the same (Revenue Type, Cohort, Filter, Months, Spacer, Quarters, Spacer, Years).
9. **Last row** in the formula references is determined dynamically from the source ingestion (like existing logic).
10. **Filter logic**: The “Filter” column and references in the formula should be the dimension column chosen in the filter dropdown. If the user picks a filter dimension + selected filter values, those appear in the formula references (see Section 6).
11. **No Start Month**: Show an error message with `ErrorService` if “Start Month” column is missing.
12. **New sheet** name: append `_Waterfall` to the source sheet name. If it exists, presumably overwrite or handle with existing policy from the orchestration pattern.
13. **No additional localization** is needed.

---

## 3. Overview of Process

1. **UI Gather**: The user picks the source sheet, row detail type, filters, etc. in `analyze.html`.
2. **Data Ingestion**: Read source sheet with `DataIngestionStream`. Identify dimension columns, Start Month col, Cancel Month col, date/month columns, and skip reading quarter/year columns for ingestion (though we still display them in output).
3. **Cohort Logic**: Based on row detail:
   - **none**: single “All,” 
   - **monthly**: each distinct Start Month,
   - **quarterly** or **annual**: pass the distinct Start Months to `quartersYears.js` and convert them accordingly.
4. **Output**:  
   - Create new sheet `<sourceSheetName>_Waterfall` with the required 8 columns in the correct order plus all date columns, a spacer, quarters, spacer, years.
   - For each unique cohort, insert 8 revenue-type rows.  
   - Insert a spacer row after each block of 8.  
   - Each date cell references the formula variant for that revenue type and references the user’s selected filter dimension if any.
5. **Finalization**: Name columns, style them, unify numeric formatting, finalize sheet.
   

---

## 4. New/Modified Files

### 4.1. `src/engines/orchestration/formulaAnalyzeController.js`
- **Goal**: We’ll add an exported function, e.g. `async function generateRevenueWaterfall(options)`, which calls the new `waterfallController.processWaterfallOperation(options)`.
- **Implementation**:
  ```js
  const { processWaterfallOperation } = require("@src/engines/orchestration/waterfallController");

  async function generateRevenueWaterfall(options = {}) {
    console.clear();
    ErrorService.display("Creating Revenue Waterfall...", "", null, ErrorType.INFO, false, "blue");

    try {
      return await processWaterfallOperation(options);
    } catch (error) {
      ErrorService.logError("Revenue Waterfall operation failed", { error }, "FormulaAnalyzeController");
      ProgressTracker.complete("error", error);
      throw error;
    }
  }

  module.exports = {
    ...
    generateRevenueWaterfall,
  };

```

**4.2. New File: src/engines/orchestration/waterfallController.js**

• **Purpose**: Houses processWaterfallOperation(options).

• **Structure**:

1. async function processWaterfallOperation(options = {})

• Ingest source via DataIngestionStream.

• Identify columns:

• Start Month (header = “Start Month”),

• Cancel Month (header = “Cancel Month”),

• Date/month columns,

• Quarter/year columns (just for final output but not read row-by-row).

• If no Start Month found, show user a message w/ ErrorService and abort.

• Build unique cohorts by row detail (none, monthly, quarterly, annual).

• Create new sheet with the specified columns in order.

• Force “Revenue Type,” “Cohort,” “Filter,” then all date columns, plus spacer, quarters, spacer, years.

• Use existing dimension column processing logic for quarter/year expansions if needed.

• For each cohort, add 8 “Revenue Type” rows + 1 spacer row.

• Insert formulas for each date/quarter/year cell, referencing the source columns.

• Finalize, apply styles, etc.

1. Helper utilities:

• _getUniqueCohorts(sourceData, rowCohort) { ... }

• _insertRevenueTypeRows(...)

• _applyWaterfallFormulas(...)

  

**4.3. src/ui/eventHandlers.js**

• **We** add a new event handler handleRunRevenueWaterfall().

async function handleRunRevenueWaterfall() {
  try {
    const sheet = StateManager.get("selectedAnalyticsSourceSheet");
    if (!sheet) {
      ErrorService.displayError("Please select a source sheet before running the Waterfall.");
      return;
    }

    const options = {
      sourceSheetName: sheet,
      targetSheetName: sheet + "_Waterfall",
      operationConfig: {
        // Flags if needed, e.g. "waterfallOperation: true"
      },
    };

    // Call our new function in formulaAnalyzeController
    await formulaAnalyzeController.generateRevenueWaterfall(options);
  } catch (err) {
    ErrorService.displayError("Waterfall generation failed.", "", err);
  }
}

**4.4. src/ui/analyzeController.js**

• **Register** “Revenue Waterfall” button:

• In function registerAllComponents(), we attach the click event to handleRunRevenueWaterfall().

• **Ensure** the “Row Detail” dropdown is stored in selectedRevenueWaterfallrowCohort or a similar state key.

  

**4.5. src/ui/stateManager.js**

• **We** confirm we have a property, e.g. selectedRevenueWaterfallrowCohort, to store the user’s selection from “Row Detail” dropdown.

• **We** persist it in localStorage and restore it on page load.

  

**4.6. src/engines/orchestration/quartersYears.js**

• **No** major structural changes. We already have generatePeriodSummaryHeaders() that does month→quarter/year logic respecting fiscalYearStartMonth.

• We can either:

• Reuse generatePeriodSummaryHeaders() to convert Start Month → Quarter/Year for the cohorts,

• Or add a helper that just returns a quarter/year string from a single month/year pair.

**5. Implementation Steps**

  

**5.1. Reading the Source Sheet**

1. Within processWaterfallOperation, call DataIngestionStream like in processAnalyzeOperation.

2. Identify columns by header:

• **Dimension columns**: used for filter references or ignoring otherwise.

• **Start Month**: “Start Month” (throw error if missing).

• **Cancel Month**: “Cancel Month”.

• **Date/month**: the typical monthly columns.

1. Store the first date column letter + last row number to form references in the new formulas.

  

**5.2. Determining Cohort Groups**

1. Retrieve rowCohort = StateManager.get("selectedRevenueWaterfallrowCohort") (or equivalent).

2. If “none”: cohorts = ["All"].

3. If “monthly”: gather unique start months.

4. If “quarterly” or “annual”: pass each unique start month into quartersYears.js, produce e.g. “Q1 2024” or “2024.”

5. Sort cohorts in ascending order.

  

**5.3. Building the Destination Columns**

1. Create a new array of column definitions:

• [RevenueType, Cohort, Filter, …all date columns…, Spacer, Quarter(s), Spacer, Year(s)].

1. Use the same approach as dimensionsColumnProcessors for naming them:

• “Revenue Type” → COLUMN_TYPES.DIMENSION or a new placeholder type,

• “Cohort” → also a dimension-like column,

• “Filter” → again dimension-like,

• For date columns, we keep them as COLUMN_TYPES.MONTH or COLUMN_TYPES.DATE,

• Quarter, year columns if present in the source, or always included as stated. We do the same expansions from quartersYears.js.

1. Mark them for left-justify vs. right-justify with the style logic used in “analyze” flows.

  

**5.4. Building the Output Rows**

1. For each cohort in cohorts:

• Insert 8 consecutive rows for the revenue types:

• “Start”, “New”, “Reactivated”, “Upgrade”, “Downgrade”, “Deactivated”, “Canceled”, “Finish”.

• After those 8, insert a blank spacer row.

1. The “Cohort” column cell = the cohort name (or “All”).

2. The “Filter” column cell = the user’s chosen filter if they have a filter dimension + selected filter item. If multiple filters, we might replicate or handle them similarly to how the pivot filter is handled. (The new instructions say “Where the formulas reference Revenue_Data!$A$2:$A$16, A should be the filter dimension column letter, and the value should come from the user’s chosen filter.”)

  

**5.5. Applying Formulas**

1. Each revenue-type row’s date columns get a specialized formula. **New formula set**:

• [See instructions in the question; each formula is a SUMPRODUCT referencing the Start/Cancel/Filter columns, with the last row reference replaced by the actual last row from ingestion (16 → e.g. 500 if 500 rows?).]

1. Substitutions:

• Revenue_Data!F$2:F$16 becomes sourceSheetName + "!" + <firstDateColumnLetter> + "$2:" + <firstDateColumnLetter> + lastRow.

• $B2 or $C2 in the formula’s example must map to:

• $B2 → The “Cohort” column in the destination at the current row. If “Revenue Type” is col A, “Cohort” is col B, “Filter” is col C, then $B2 is correct if the row is 2.

• $C2 → The “Filter” column.

• The letter references (“D” for Start Month, “E” for Cancel Month, “F” for first date col, etc.) are replaced with the actual letters determined from the ingestion.

• The filter dimension letter (e.g. $A$2:$A$16) is replaced with whichever dimension column in the source is chosen as a filter. The user’s selected filter value is inserted into the formula in the destination row if needed (or a blank if none).

1. We can offset the references for each subsequent date column. For instance, if the formula example used G$2:G$16, that means the second date column. We do this by incrementing the column letter by +1 for each subsequent date column.

  

**5.6. Creating the Output Worksheet**

1. After building all rows, finalize with the same pattern used in processAnalyzeOperation:

• Set !ref, apply column widths, style each column accordingly, etc.

1. Name the sheet <sourceSheetName>_Waterfall.

2. If a sheet with that name exists, either overwrite or handle it as the existing orchestration logic does.

  

**5.7. Inserting Spacer Rows**

1. Each block of 8 “Revenue Type” rows is followed by 1 empty row.

2. “Empty” means no data in any column.