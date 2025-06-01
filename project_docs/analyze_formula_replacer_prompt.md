# Prompt: Implement Formula Replacer for Analyze Operation

## Context
The HyperPerfect6 Excel add-in has a "Clean" operation that processes data and can optionally convert formulas to values. This functionality needs to be replicated for the "Analyze" operation (Build Revenue Data) on the analyze.html page.

## Current State
1. **Clean Operation** (WORKING):
   - Located in `src/engines/orchestration/formulaCleanController.js`
   - Uses `monthlyFormulasToValues.convert()` from `src/engines/worksheetBuilders/formulaReplacer.js`
   - Converts formulas to values in month columns after processing
   - Controlled by "Convert formulas to values" checkbox in settings

2. **Analyze Operation** (NEEDS UPDATE):
   - Located in `src/engines/orchestration/formulaAnalyzeController.js`
   - Already has the conversion logic but may need fixes similar to what was done for clean

## Known Issues That Were Fixed in Clean Controller

### Issue 1: Month Column Detection
**Problem**: The controller was looking for `dimensionsData.monthColumnIndices` which doesn't exist.

**Solution**: Extract month columns from headers:
```javascript
// OLD (incorrect)
const monthColumnIndices = dimensionsData?.monthColumnIndices || [];

// NEW (correct)
const monthColumnIndices = dimensionsData?.headers
  ?.filter((header) => header.type === "DATE" && typeof header.columnIndex === "number")
  .map((header) => header.columnIndex)
  .sort((a, b) => a - b) || [];
```

### Issue 2: Import Statement
**Problem**: Incorrect destructuring import.

**Solution**: 
```javascript
// OLD (incorrect)
const { monthlyFormulasToValues } = require("@src/engines/worksheetBuilders/formulaReplacer");

// NEW (correct)
const monthlyFormulasToValues = require("@src/engines/worksheetBuilders/formulaReplacer");
```

### Issue 3: Result Property Names
**Problem**: `orchestrateSheetOperation` returns `destinationSheetName` and `dimensionsData`, but controllers expect `name` and `dimensions`.

**Solution**: Support both naming conventions:
```javascript
const destinationSheetName = result.destinationSheetName || result.name;
const dimensionsData = result.dimensionsData || result.dimensions;
```

## Implementation Steps

### Step 1: Check Current Implementation
1. Open `src/engines/orchestration/formulaAnalyzeController.js`
2. Look for the formula conversion section (search for "monthlyFormulasToValues")
3. Verify if it has the same issues as the clean controller had

### Step 2: Apply Fixes If Needed
1. Fix the import statement if using destructuring
2. Update month column detection to use `headers` array
3. Make result property access flexible to handle both naming conventions

### Step 3: Verify Integration Points
1. Check that the "Convert formulas to values" setting is being read:
   ```javascript
   const convertFormulas = Office.context.document.settings.get("convertMonthlyFormulas");
   ```

2. Ensure the conversion happens after the main operation:
   ```javascript
   if (convertFormulas && result) {
     // Conversion logic here
   }
   ```

3. Verify error handling doesn't stop the main operation:
   ```javascript
   } catch (conversionError) {
     // Log error but don't re-throw
     ErrorService.logError("Warning: Error during optional post-analysis formula conversion...");
     // Do not re-throw
   }
   ```

### Step 4: Test the Implementation
1. Manual Testing:
   - Open Excel with the add-in
   - Go to Analyze page
   - Ensure "Convert formulas to values" is checked in settings
   - Run "Build Revenue Data" operation
   - Verify formulas in month columns are converted to values

2. Check logs for:
   - "Attempting conversion for X month columns"
   - "Successfully converted month formulas to values"
   - Or error messages if conversion fails

### Step 5: Create/Update Tests
1. Check if there are existing tests for analyze controller
2. If the analyze controller already works correctly, ensure tests cover:
   - Month column detection from headers
   - Proper method call to `monthlyFormulasToValues.convert()`
   - Error handling that doesn't break the main operation

## Expected Behavior
When "Convert formulas to values" is checked and user runs "Build Revenue Data":
1. The analyze operation creates formulas for calculations
2. After formulas are calculated, month columns are identified
3. `monthlyFormulasToValues.convert()` is called with:
   - Excel context
   - Target worksheet
   - Array of month column indices
   - Start row index (typically headerRowIndex + 2)
4. Formulas in month columns are replaced with their calculated values
5. Other columns (dimensions, quarters, years) keep their formulas

## Reference Implementation
See `src/engines/orchestration/formulaCleanController.js` lines 70-240 for the working implementation pattern.

## Testing Checklist
- [ ] Import statement is correct (not using destructuring)
- [ ] Month columns are detected from `dimensionsData.headers`
- [ ] Result properties handle both naming conventions
- [ ] Setting is properly read from Office.context.document.settings
- [ ] Conversion only runs when setting is enabled
- [ ] Errors are logged but don't stop the operation
- [ ] Success message appears after operation completes

## Common Pitfalls to Avoid
1. Don't assume `dimensionsData.monthColumnIndices` exists - it doesn't
2. Don't destructure the formulaReplacer import - it exports the class directly
3. Don't assume result properties - check for both possible names
4. Don't let conversion errors stop the main operation
5. Remember to load sheet name before passing to convert method

## Success Criteria
The analyze operation should behave exactly like the clean operation:
- Formulas are converted to values only in month columns
- Conversion only happens when the setting is enabled
- Any conversion errors are logged but don't break the operation
- The operation completes successfully regardless of conversion outcome