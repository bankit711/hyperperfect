Here are the formulas for each Revenue Type:
### Start:
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!F$2:F$16) *
        ( --($B2 = "") + --(Revenue_Data!$D$2:$D$16 = $B2) > 0) *
        ( --($C2 = "") + --(Revenue_Data!$A$2:$A$16 = $C2) > 0)
    ),
    0
)

### New:
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!G$2:G$16) *
        (Revenue_Data!$D$2:$D$16 = Revenue_Data!G$1:G$1) *
        (($B3 = "") + (Revenue_Data!$D$2:$D$16 = $B3) > 0) *
        (($C3 = "") + (Revenue_Data!$A$2:$A$16 = $C3) > 0)
    ),
    0
)

### "Reactivated"
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!G$2:G$16) *
        (Revenue_Data!F$2:F$16 <> "") *
        (Revenue_Data!F$2:F$16 = 0) *
       (Revenue_Data!$D$2:$D$16 <> Revenue_Data!G$1:G$1) *
        (($B4 = "") + (Revenue_Data!$D$2:$D$16 = $B4) > 0) *
        (($C4 = "") + (Revenue_Data!$A$2:$A$16 = $C4) > 0)
    ),
    0
)


### "Upgrade"
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!G$2:G$16 - Revenue_Data!F$2:F$16) *
        ((Revenue_Data!G$2:G$16 - Revenue_Data!F$2:F$16) > 0) *
        (Revenue_Data!F$2:F$16 <> 0) *
        (Revenue_Data!G$2:G$16 <> 0) *
        (($B5 = "") + (Revenue_Data!$D$2:$D$16 = $B5) > 0) *
        (($C5 = "") + (Revenue_Data!$A$2:$A$16 = $C5) > 0)
    ),
    0
)

### "Downgrade"
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!G$2:G$16 - Revenue_Data!F$2:F$16) *
        ((Revenue_Data!G$2:G$16 - Revenue_Data!F$2:F$16) < 0) *
        (Revenue_Data!F$2:F$16 <> 0) *
        (Revenue_Data!G$2:G$16 <> 0) *
        (($B6 = "") + (Revenue_Data!$D$2:$D$16 = $B6) > 0) *
        (($C6 = "") + (Revenue_Data!$A$2:$A$16 = $C6) > 0)
    ),
    0
)

### "Deactivated"
=IFERROR(
    -SUMPRODUCT(
        (Revenue_Data!F$2:F$16) *
        (Revenue_Data!G$2:G$16 = 0) *
       (Revenue_Data!$E$2:$E$16 <> Revenue_Data!G$1:G$1) *
        (($B7 = "") + (Revenue_Data!$D$2:$D$16 = $B7) > 0) *
        (($C7 = "") + (Revenue_Data!$A$2:$A$16 = $C7) > 0)
    ),
    0
)

### "Cancelled"
=IFERROR(
    -SUMPRODUCT(
        (Revenue_Data!F$2:F$16) *
        (Revenue_Data!$E$2:$E$16 = Revenue_Data!G$1:G$1) *
        (($B8 = "") + (Revenue_Data!$D$2:$D$16 = $B8) > 0) *
        (($C8 = "") + (Revenue_Data!$A$2:$A$16 = $C8) > 0)
    ),
    0
)

### "Finish"
=IFERROR(
    SUMPRODUCT(
        (Revenue_Data!G$2:G$16) *
        (($B9 = "") + (Revenue_Data!$D$2:$D$16 = $B9) > 0) *
        (($C9 = "") + (Revenue_Data!$A$2:$A$16 = $C9) > 0)
    ),
    0
)

Each formula should be substituted as follows:
Revenue_Data = sourceSheetName
"D" = the letter of the Start Month column in the source sheet (needs to dynamically adjust based on the number of dimension columns)
"E" = the letter of the Cancel Month column in the source sheet (needs to dynamically adjust based on the number of  dimension columns)
"F" = the letter of the first month/date column in the source sheet (needs to dynamically adjust based on the number of dimension columns)
16 should be the row number for the last data row in the sourceSheet
All letter references without a "$" in front of them should increase sequentially every column (starting with the number in the formulas given)
All the row references for the destinationsheet (no sheet included in the reference) should equal the currentRowNumber
Where the formulas reference, Revenue_Data!$A$2:$A$16, A should be the letter of the column selected in the "Filter" dropdown in analyze.html


1. `sourceSheet` - The name of the source sheet containing the data
2. `columnLetterPrecedingSourceSheetFirstMonthColumn` - The column letter that comes before the first month column in the source sheet (should default to H)
3. `sourceSheetFirstDataRowNumber` - The first row number in the source sheet that contains data (should default to 2)
4. `LastDataRowNumberInSourceSheet` - The last row number in the source sheet that contains data (should not default)
5. `destinationSheetCohortColumnLetter` - The column letter for the cohort column in the destination sheet (should default to B)
6. `CurrentRowLetter` - The current row letter/number being processed (should not default)
7. `sourceSheetStartMonthColumnLetter` - The column letter for the start month column in the source sheet (should not default)
8. `destinationSheetFilterColumnLetter` - The column letter for the filter column in the destination sheet (should default to C)
9. `sourceSheetColLetterOfChosenDimensionForFiltering` - The column letter of the dimension used for filtering (should not default)
10. `sourceSheetCurrentMonthColumnLetter` - The column letter for the current month in the source sheet (should not default)
11. `sourceSheetCancelMonthColumnLetter` - The column letter for the cancel month column in the source sheet (should not default)