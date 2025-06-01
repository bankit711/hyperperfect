## Overview

This document explains how to correct quarter and year calculations in our Excel-based add-in by tracking month-to-column references using a **single shared “month index → column letter” map**. Instead of trying to update references in multiple places, we unify all logic under one well-defined source of truth.

**Key Goal:** Make sure each quarter or year references the correct set of monthly columns so that errors like “negative months” and mismatched references no longer appear.

---

## Implementation Steps

### 1. Build the Month-Index-to-Column-Letter Map

1. **Locate the Month Headers**  
   We already detect month/year headers in `headerDetector.js` or in a separate step. When you obtain `monthHeaders`, each contains:
   ```js
   {
     name: "Jan 2024",
     month: 1,
     year: 2024,
     columnIndex: 10,  // zero-based
     // ... other properties
   }
```

1. **Generate a Sorted Array**

Sort monthHeaders by (year, month). This ensures we know exactly which months appear first.

1. **Build the Map**

Create an object or array that maps from a sequential **month index** to the final Excel column letter. For example:

```
const monthMap = {};
sortedMonthHeaders.forEach((header, idx) => {
  // Convert zero-based idx to an Excel column letter (A, B, C, etc.)
  monthMap[idx] = header.columnLetter;
});
```

Now, if “March 2024” is at index 2 in the sorted list, monthMap[2] might be "C".

**2. Annotate Quarter & Year Objects Using the Shared Map**

1. **Generate Quarter/Year Objects**

When you create quarter or year “summary” objects, you already know:

• How many months each quarter/year contains (e.g., 3 for Q1, or 12 for a full fiscal year).

• The zero-based index of the first month in the sorted list.

1. **Assign firstColumnLetter and lastColumnLetter**

• For a quarter that starts at quarterStartIndex (e.g., 2) and has quarterLength months (e.g., 3), do:

```
quarter.firstColumnLetter = monthMap[quarterStartIndex];
quarter.lastColumnLetter = monthMap[quarterStartIndex + quarterLength - 1];
```

  

• Similar logic applies for yearly summaries.

  

1. **Store These Letters Directly in the Quarter/Year Objects**

E.g.:

```
// Pseudocode
quarter = {
  name: "Q2 2024",
  firstMonthIndex: 3,
  monthCount: 3,
  firstColumnLetter: monthMap[3],
  lastColumnLetter: monthMap[5]
};
```

**3. Reference the Map Inside Formula Strategies**

1. **In YearlyByPeriodStrategy and QuarterlyByPeriodStrategy**

Eliminate repeated or manual logic to figure out which columns belong to a given year/quarter. Instead, simply rely on each year/quarter object’s firstColumnLetter and lastColumnLetter.

1. **Use the Letters for the SUM Formula**

```
const template = `=SUM($${header.firstColumnLetter}rowPlaceholder:$${header.lastColumnLetter}rowPlaceholder)`;
```

This ensures that all references are accurate and consistent with the single map.

**Verification**

1. **Correct Ranges for Each Quarter/Year**

The newly updated formulas should reference the exact set of columns for each quarter or year—no more incorrect or negative indices.

1. **No More “Invalid year calculation” Messages**

Because everything is keyed off the single source-of-truth map, the random negative month references that used to occur are prevented.

1. **Logs & Debug**

• If logging is enabled, verify that the creation of the monthMap, the assignment of firstColumnLetter/lastColumnLetter, and the final references in the formula strategies all match up as expected.

• Use test data with multiple partial or extended months to confirm correctness.

**Expected Outcome**

  

After applying these steps:

1. All month-based references for quarters/years come from the single shared monthMap.

2. Quarter/year formulas automatically stay in sync with column reordering or insertion.

3. The formula references for each fiscal period remain correct, even if more columns are inserted, because the single map is consistently rebuilt and consumed across the system.

