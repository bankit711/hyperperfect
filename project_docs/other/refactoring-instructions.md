# Developer Instructions: Refactoring extractCohortValuesFromSourceSheet

## Objective
Fix the header value extraction issues in the `extractCohortValuesFromSourceSheet` function by leveraging the HeaderDetector from the orchestration layer instead of manually loading and processing header values.

## Detailed Steps

### 1. Update Imports
At the top of the file, update the HeaderDetector import:
```javascript
// Replace the current import:
const headerDetector = require("@src/ui/headerDetector");

// With this import:
const { HeaderDetector } = require("@src/ui/headerDetector");
```

### 2. Replace Header Extraction Code
Replace the current header extraction code (lines ~885-940) with the following:

```javascript
// Get headers using HeaderDetector instead of manually loading the header range
let headerValues = [];
let processedHeaders = [];
try {
  // Use HeaderDetector to get categorized headers
  processedHeaders = await HeaderDetector.getSheetHeaders(sourceSheetName, {
    state: "waterfall",
  });

  if (!processedHeaders || !Array.isArray(processedHeaders) || processedHeaders.length === 0) {
    ErrorService.logError(
      "No headers found using HeaderDetector",
      {
        operation: "extractCohortValuesFromSourceSheet",
        details: {
          timestamp: Date.now(),
        },
      },
      componentId
    );
    return ["All"];
  }

  // Extract raw header values for logging and fallback
  headerValues = processedHeaders.map(header => header.name);

  ErrorService.logInfo(
    "Successfully extracted headers using HeaderDetector",
    {
      operation: "extractCohortValuesFromSourceSheet",
      details: {
        headerCount: processedHeaders.length,
        firstFewHeaders: processedHeaders.slice(0, 5).map(h => ({ name: h.name, type: h.type })),
        timestamp: Date.now(),
      },
    },
    componentId
  );
} catch (error) {
  ErrorService.logError(
    "Error extracting headers using HeaderDetector",
    {
      operation: "extractCohortValuesFromSourceSheet",
      details: {
        error: error.message,
        stack: error.stack,
        timestamp: Date.now(),
      },
    },
    componentId
  );
  return ["All"];
}
```

### 3. Replace Start Month Column Detection
Replace the current Start Month column detection code (lines ~940-1070) with:

```javascript
let startMonthColumnIndex = -1;
let startMonthHeader = null;

// Find the Start Month column using the processed headers
try {
  // First try to find a header with COHORT_START_MONTHS type
  startMonthHeader = processedHeaders.find(
    header => header.type === COLUMN_TYPES.COHORT_START_MONTHS
  );

  if (startMonthHeader) {
    startMonthColumnIndex = startMonthHeader.columnIndex;
    ErrorService.logInfo(
      "Found Start Month column using HeaderDetector type",
      {
        operation: "extractCohortValuesFromSourceSheet",
        details: {
          columnIndex: startMonthHeader.columnIndex,
          columnName: startMonthHeader.name,
          columnType: startMonthHeader.type,
          timestamp: Date.now(),
        },
      },
      componentId
    );
  } else {
    // Fallback: manual search for keywords in header names
    const startMonthKeywords = ["start month", "startmonth", "cohort start", "start date"];
    
    for (let i = 0; i < processedHeaders.length; i++) {
      const header = processedHeaders[i];
      const headerName = String(header.name || "").trim().toLowerCase();
      
      if (startMonthKeywords.some(keyword => headerName.includes(keyword))) {
        startMonthColumnIndex = header.columnIndex;
        startMonthHeader = header;
        
        ErrorService.logInfo(
          "Found Start Month column using keyword search",
          {
            operation: "extractCohortValuesFromSourceSheet",
            details: {
              columnIndex: header.columnIndex,
              headerName: header.name,
              timestamp: Date.now(),
            },
          },
          componentId
        );
        break;
      }
    }
    
    // Last resort: try hardcoded column indices
    if (startMonthColumnIndex === -1) {
      const hardcodedIndices = [4, 7]; // Corresponds to columns E and H
      
      for (const index of hardcodedIndices) {
        const header = processedHeaders.find(h => h.columnIndex === index);
        
        if (header) {
          startMonthColumnIndex = index;
          startMonthHeader = header;
          
          ErrorService.logInfo(
            "Using hardcoded Start Month column",
            {
              operation: "extractCohortValuesFromSourceSheet",
              details: {
                columnIndex: index,
                headerName: header.name,
                timestamp: Date.now(),
              },
            },
            componentId
          );
          break;
        }
      }
    }
  }

  // If we still don't have a Start Month column, return All
  if (startMonthColumnIndex === -1) {
    ErrorService.logError(
      "Could not find Start Month column",
      {
        operation: "extractCohortValuesFromSourceSheet",
        details: {
          timestamp: Date.now(),
          headerValues: headerValues.slice(0, 10), // Log first 10 headers for debugging
        },
      },
      componentId
    );
    return ["All"];
  }
} catch (error) {
  ErrorService.logError(
    "Error finding Start Month column",
    {
      operation: "extractCohortValuesFromSourceSheet",
      details: {
        error: error.message,
        stack: error.stack,
        timestamp: Date.now(),
      },
    },
    componentId
  );
  return ["All"];
}
```

### 4. Update Column Letter Calculation
Replace the column letter calculation code with:

```javascript
// Get column letter from the header object or calculate it
const startMonthColumnLetter = startMonthHeader.sourceColumnLetter || 
  String.fromCharCode(65 + startMonthColumnIndex); // A = 65, B = 66, etc.
const cohortColumnAddress = `${startMonthColumnLetter}2:${startMonthColumnLetter}${dataRowCount + 1}`;

// Log that we found the Start Month column
ErrorService.logInfo(
  "Using Start Month column for cohort extraction",
  {
    operation: "extractCohortValuesFromSourceSheet",
    details: {
      startMonthColumnIndex,
      startMonthColumnLetter,
      cohortColumnAddress,
      headerValue: headerValues[startMonthColumnIndex],
      timestamp: Date.now(),
    },
  },
  componentId
);
```

### 5. Keep the Rest of the Function
Keep the rest of the function as is, including:
- The code to load the cohort column values
- The date parsing logic
- The cohort value generation based on row detail
- The sorting and returning of unique cohort values

## Testing
After making these changes:
1. Verify that the "Header range values not available" error no longer occurs
2. Confirm that the "Using Start Month column for cohort extraction" log message appears
3. Check that cohort values are correctly extracted from the source sheet

These changes will make the code more robust by leveraging the orchestration layer's header detection capabilities while maintaining the existing cohort extraction logic.

## Benefits
This refactoring aligns with the broader initiative to standardize functionality across the application by:
1. Using the same header detection approach that's used in other parts of the codebase
2. Reducing code duplication by leveraging existing capabilities
3. Enhancing maintainability by removing complex fallback mechanisms
4. Ensuring consistent behavior across different sheets and data formats

It also addresses the specific issues identified in the previous enhancement work:
1. Fixing header row validation to prevent null reference errors
2. Improving Start Month column detection with a more robust approach
3. Maintaining the enhanced fallback mechanisms for finding the Start Month column
4. Preserving the comprehensive logging throughout the extraction process
