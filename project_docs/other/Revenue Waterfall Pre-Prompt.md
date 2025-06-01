
Review the following instructions and create a detailed plan to implement them into the current code base.  

Project Purpose: Create a a new module for our app that runs when the revenue waterfall button is pressed in analyze.html

Requirements:
works exactly like processAnalyzeOperation with the following differences:
1. Reads a source sheet that has a different structure.  The input columns from the sourcesheet will be the same structure as the output for processAnalyzeOperation: Dimension columns, Start Month column, Cancel Month column, Date/Month columns, Quarters (should be ignored), Years (should be ignored)
2. Creates a destination sheet structure that is different.  The output columns will be as follows: "Revenue Type", "Cohort", "Filter", Dates/Months, spacer (same as processAnalyzeOperation ), quarters (same as processAnalyzeOperation), spacer (same as processAnalyzeOperation), years (same as processAnalyzeOperation)
3. The Revenue Type column rows will repeat the same pattern for every distinct cohort.  In order the rows for every cohort will be: Start, New, Reactivated, Upgrade, Downgrade, Deactivated, Canceled, Finish
4. If the Row Detail dropdown in the analyze.html is set to "none", there will only be one value in the cohort column, "All"
5. If the Row Detail dropdown in the analyze.html is set to "Monthly Cohorts", the Cohort Columns will represent every unique cohort as represented by the every unique start month value in the source sheet.
6. If the Row Detail dropdown in the analyze.html is set to "Quarterly Cohorts", the unique start month values will be converted to quarters ("Q1 2024") using the logic in quartersyears.js and then the Cohort Columns will represent every unique quarter
7. If the Row Detail dropdown in the analyze.html is set to "Annual Cohorts", the unique start month values will be converted to years ("2024") using the logic in quartersyears.js and then the Cohort Columns will represent every unique quarter
8. There will be a spacer row between every group of cohorts
9. So, each cohort value will be repeated for each unique Revenue Type, then there will be a spacer row, then the revenuetypes will repeat again for the next cohort, and so on until there are no cohorts left.
10. Each Revenue Type row will use a different formula for the month/date columns.  For now, slightly different just as a placeholder.  
11. The values in the filter column should be the item chosen in the select filters dropdown in analyze.html

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



##Instructions
Your goal is to gather information and get context to create a detailed plan for accomplishing the user's task, which the user will review and approve before they as another devloper to implement the solution.

Before you make any recommendations, make sure to review the project requirements and the relevant current project files that are provided

Depending on the user's request, you may need to do some information gathering (for example reading or searching the provided files) to get more context about the task. You may also ask the user clarifying questions to get a better understanding of the task. Once you've gained more context about the user's request, you should create a detailed plan for how to accomplish the task. (You can write the plan to a markdown file if it seems appropriate.)

Then you might ask the user if they are pleased with this plan, or if they would like to make any changes. Think of this as a brainstorming session where you can discuss the task and plan the best way to accomplish it. Finally once it seems like you've reached a good plan, provide a markdown file that the user can give to a developer who will build the project.  The goal should be to have a concise plan, but detailed enough that the developer will not have to ask any critical follow up questions.