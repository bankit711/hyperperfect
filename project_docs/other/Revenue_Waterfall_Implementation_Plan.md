# Revenue Waterfall Implementation Plan

## 1. New Functionality Summary

### Basic Features
We are creating a **Revenue Waterfall** feature that:
- Is triggered by clicking the **Revenue Waterfall** button in `analyze.html`
- Takes a source sheet that includes:
  - Dimension columns
  - A **Start Month** column (labeled "Start Month")
  - A **Cancel Month** column (labeled "Cancel Month")
  - Date/month columns
  - Quarter/year columns
- Creates a destination sheet with a specialized layout in this order:
  1. **Revenue Type** column (with 8 values: Start, New, Reactivated, Upgrade, Downgrade, Deactivated, Canceled, Finish)
  2. **Cohort** column
  3. **Filter** column
  4. Date/month columns (using formulas from waterfallStrategies.js)
  5. Spacer column
  6. Quarter columns (using formulas from revenueStrategies.js)
  7. Spacer column
  8. Year columns (using formulas from revenueStrategies.js)

### Cohort Functionality
- Using **generateWaterfallData()**, the data is grouped by cohorts based on the **Row Detail** dropdown selection:
  - **None:** A single cohort labeled "All"
  - **Monthly Cohorts:** Each unique Start Month value becomes its own cohort
  - **Quarterly Cohorts:** Start Month values are converted to quarters using `quartersYears.js` (e.g., "Q1 2024")
  - **Annual Cohorts:** Start Month values are converted to years using `quartersYears.js` (e.g., "2024")
- The destination sheet is named `<sourceSheetName>_Waterfall`. If the source sheet name ends with "_Revenue", remove that suffix before appending "_Waterfall".

---

## 2. Implementation Details

### 2.1 Identifying Source Sheet Columns
- Identify the **Start Month** and **Cancel Month** columns by matching header text ("Start Month" and "Cancel Month").
- Detect all dimension columns, date/month columns, and the filter dimension column.
- If no Start Month or date columns are found, display an error using the ErrorService.

### 2.2 Generating Dimension Column Values (New)
- **Key Update:**  
  The raw source data does not include values for the generated dimension columns (Revenue Type, Cohort, and Filter).  
  These values must be **explicitly generated**—for example, by reading default values from the **generateWaterfallData()** function or current state (from StateManager) in the case of the filter dimension column, and then written into the destination sheet.
- This step occurs **after** the worksheet is fully initialized (i.e. columns are merged and widths set) but **before** formulas are applied to ensure that the formulas do not overwrite these generated values.

### 2.3 Formula Adaptation
- Each revenue type requires a specialized **SUMPRODUCT** formula as defined in waterfallStrategies.js
- Formulas must be exactly as written in the getFormulaTemplate() function, including dynamic substitutions.
  - `${sourceSheet}` is replaced with `sourceSheetName`.
  - `${sourceSheetStartMonthColumnLetter}` is replaced with the letter of the Start Month column.
  - `${sourceSheetCancelMonthColumnLetter}` is replaced with the letter of the Cancel Month column.
  - `${sourceSheetCurrentMonthColumnLetter}` is replaced with the letter of the current month/date column.
  - `${LastDataRowNumberInSourceSheet}` is replaced with the last data row number from the source sheet.
  - `${CurrentRowNumber}` is used to adjust row references to the current row.
  - `${sourceSheetColLetterOfChosenDimensionForFiltering}` is replaced with the letter of the filter dimension column.
  - `${destinationSheetCohortColumnLetter}` and `${destinationSheetFilterColumnLetter}` are used for cohort and filter columns (defaults "B" and "C").

### 2.4 Layout & Styling
- Consistent styling is applied:
  1. **Revenue Type** and **Filter**columns: are left justified
  2. **Cohort** column: left justified; if Row Detail = *Monthly Cohorts*, format cells as Excel serial dates in the "mmm yyyy" format, otherwise use text format (`"@"`)
  3. **Filter** column: left justified
  4. Date/month columns (from source): right justified; headers use number format `mmm 'yy` and row data use numeric formatting (`#,##0_);(#,##0)`)
  5. Spacer columns/rows: used only for visual separation (no content or formatting applied)
  6. Quarter columns: right justified; headers use text format (`"@"`) and rows use numeric formatting (`#,##0_);(#,##0)`)
  7. Year columns: right justified; headers use text format (`"@"`) and rows use numeric formatting (`#,##0_);(#,##0)`)
  8. Header row will be bold
  9. Use styleOperations.js to apply styles.
  10. Spacer rows are inserted between cohort groups.
  11. Spacer columns are inserted between date/month, quarter, and year sections and do not have any text or formulas

---

## 3. Implementation Approach

### 3.1 New File: `waterfallController.js`
Create a dedicated controller for the Revenue Waterfall feature that:
- Accepts input parameters: sourceSheetName, rowCohort, filterValues, metricSelector, fiscalYearStartMonth from stateManager.js.
- Reads the source sheet using `DataIngestionStream`.
- Identifies necessary columns by header text.
- Builds cohort groups based on the selected row detail setting.
- Creates the destination worksheet with the required layout and applies default column widths (using the updated logic in `WorksheetBuilderInitialization.js`).
- **Explicitly writes dimension values:**  
  After the worksheet is initialized (with merged headers and proper column widths), generate and inject the dimension values for the **Revenue Type**, **Cohort**, and **Filter** columns using defaults or computed values, and/or inputs from StateManager.
- Applies specialized **SUMPRODUCT** formulas to each date/month, quarter, and year cell via waterfallStrategies.js.
- Handles styling and formatting of the destination worksheet via wor

### 3.2 Updated Files

#### 3.2.1 `formulaAnalyzeController.js`
- Modify the `generateRevenueWaterfall` function to invoke the new `waterfallController.js` and pass the required parameters.
- Ensure proper error handling and progress tracking.
- Validate that required inputs (source sheet name, row detail setting, etc.) are provided.

#### 3.2.2 `eventHandlers.js`
- Verify that `handleRunRevenueWaterfall` correctly gathers state—including the default dimension values—and calls the new controller.
- Provide proper error handling and user feedback.

#### 3.2.3 `analyzeController.js`
- Ensure the Revenue Waterfall button is registered correctly.
- Confirm the Row Detail dropdown is properly connected to the StateManager.

#### 3.2.4 `stateManager.js`
- Ensure that properties such as `selectedCohort`, `selectedFilter`, and `selectedRevenueWaterfallrowCohort` exist and are managed correctly.

#### 3.2.5 `orchestrateSheetOperations.js`
- Accept a waterfall-specific sheet context and column order.
- Enrich the metadata with waterfall-relevant column mappings.
- Pass these details to the WorksheetBuilder so that downstream processes (like formula application and styling) work correctly in the waterfall scenario.

---

## 4. Implementation Steps

### 4.1 Reading the Source Sheet
- Use `DataIngestionStream` to load the source sheet.
- Identify columns by header text ("Start Month", "Cancel Month", dimension columns, date/month columns).
- Store the first date column letter and the last data row number.

### 4.2 Determining Cohort Groups
- Retrieve `selectedRevenueWaterfallrowCohort` from the StateManager.
- For **None**: Set cohorts to `["All"]`.
- For **Monthly Cohorts**: Gather unique Start Month values.
- For **Quarterly/Annual Cohorts**: Use `quartersYears.js` logic to convert Start Month values to quarters or years.
- Sort the cohort values in ascending order.

### 4.3 Building the Destination Sheet
- Create a new worksheet named `<sourceSheetName>_Waterfall`.
- Set up columns in the required order.
- Apply default column widths (using the updated logic in `WorksheetBuilderInitialization.js`).

### 4.4 Generating the Output Structure
- For each cohort:
  - Insert 8 consecutive rows for the revenue types (Start, New, Reactivated, Upgrade, Downgrade, Deactivated, Canceled, Finish)
  - Follow these 8 rows with an empty spacer row
  - Repeat this process until all 8 rows plus a spacer row have been inserted for each cohort
- Each revenue row will have its corresponding specialized **SUMPRODUCT** formula applied (per `project_docs/Revenue_Waterfall_Formula_Instructions.md`)
  - **Explicitly write dimension column values** (Revenue Type, Cohort, and Filter) using defaults or computed values from StateManager.
  - Apply the specialized SUMPRODUCT formulas to each date/month, quarter, and year cell.
  - Insert an empty spacer row after the 8 revenue rows.

---

## 5. Edge Cases & Validation

- **Missing Columns:**
  - If no "Start Month" column is found, display an error and abort the operation.
  - If no date columns are found, display an error or produce minimal output.
- **Filter Dimension:**
  - If no filter dimension is selected, leave the Filter column blank and adjust formulas accordingly.
- **Large Datasets:**
  - Ensure performance remains acceptable with large datasets (600+ rows, 100+ columns) via chunk-based processing and batch operations.
- **State Consistency:**
  - Validate that the dimension values are correctly obtained (or computed) from StateManager before writing.
- **Integration:**
  - Ensure proper integration with existing UI components and state management.

---

## 6. Testing Strategy

- Test with different **Row Detail** settings: None, Monthly, Quarterly, Annual.
- Test with various filter dimension selections.
- Verify that the formulas produce correct results compared to expected calculations.
- Test with large datasets to ensure performance.
- Test edge cases such as missing columns or an empty source sheet.
- Confirm that the dimension column values (Revenue Type, Cohort, Filter) are correctly written into the destination sheet.

