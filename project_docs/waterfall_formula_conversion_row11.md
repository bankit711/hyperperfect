# Waterfall Formula Conversion - Unified Row 11 Start

## Change Summary
Updated the waterfall formula-to-value conversion to use row 11 as the starting point for ALL cohort types, not just MonthlyCohorts.

## Before
- **MonthlyCohorts**: Started conversion at row 11 (Excel row 11)
- **Other cohort types** (None, Quarterly, Annual): Started conversion at row 2 (Excel row 2)

## After
- **All cohort types**: Start conversion at row 11 (Excel row 11)

## Reasoning
1. **Consistency**: All waterfall types now behave the same way
2. **Header preservation**: Waterfall reports often have multiple header/summary rows at the top
3. **Safety**: Prevents accidentally converting formula headers or summary rows
4. **Simplicity**: One rule for all cases is easier to understand and maintain

## Code Changes

### waterfallController.js
```javascript
// Before:
const startRowIndex = 1; // For general waterfall (row 2 in Excel)

// After:
const startRowIndex = 10; // For general waterfall (row 11 in Excel) - same as MonthlyCohorts
```

## Impact
- Rows 1-10 will always keep their formulas, regardless of cohort type
- This provides space for:
  - Multiple header rows
  - Summary formulas
  - Report metadata
  - Subtotals or other calculations

## Testing
Updated test `waterfallFormulaComplete.test.js` to verify:
- All waterfall types use startRowIndex = 10 (row 11 in Excel)
- Formula conversion begins at the same row for all cohort types
- Tests pass with the new unified behavior

## User Impact
- More predictable behavior - users don't need to remember different rules for different cohort types
- Safer - less chance of accidentally converting important header formulas
- No breaking changes - just extends the protected header area for non-MonthlyCohort types