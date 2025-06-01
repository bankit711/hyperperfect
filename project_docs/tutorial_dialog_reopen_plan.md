# Tutorial Dialog Reopen Implementation Plan

## Objective
During the tutorial session only, reopen the dialog window after the "Clean source data" button is pressed to display an informational message about how HyperPerfect handles output sheets and formulas.

## Requirements
1. Only show this dialog during the tutorial session
2. Display after "Clean source data" operation completes
3. Show specific message about:
   - New sheets being created
   - Formula-to-value conversion behavior
   - Settings option to change this behavior

## Implementation Strategy

### 1. Tutorial State Flag - FOUND ✓
- Tutorial state is tracked using `sessionStorage.getItem("isInTutorialCleanFlow")`
- Set to "true" when tutorial navigates to clean page
- Already checked in `handleFormulaClean()` in `eventHandlers.js`
- Flag is removed after setting up the next tutorial step

### 2. Clean Operation Flow - FOUND ✓
- Clean button handled by `handleFormulaClean()` in `eventHandlers.js`
- Calls `processCleanOperation()` from `formulaCleanController.js`
- Tutorial flow already has a hook after clean completes (line ~582 in eventHandlers.js)
- Perfect injection point exists where tutorial sets up next step

### 3. Create New Dialog Content
- Create HTML for the new dialog message
- Style to match existing tutorial dialog
- Include "Important Note" header
- Add "OK" button that closes the dialog window

### 4. Implementation Steps

#### Step 1: Research Current Implementation
Files to examine:
- `/src/ui/quickTutorial.js` - Tutorial logic
- `/src/ui/cleanController.js` - Clean operation handling
- `/src/ui/eventHandlers.js` - Button click handlers
- `/src/ui/stateManager.js` - State management
- `/src/taskpane/tutorialDialog.html` - Existing dialog structure

#### Step 2: Modify Existing Tutorial Hook
Location: `/src/ui/eventHandlers.js` around line 582

```javascript
// Replace the existing tutorial flow section with:
if (isInTutorialCleanFlow === "true") {
  ErrorService.logInfo(
    "Tutorial flow: Clean operation successful. Showing important note.",
    { operation: "tutorialCleanComplete", details: { newSheetName } },
    COMPONENT_ID
  );

  // Show the important note dialog
  await showTutorialImportantNote();
  
  // After dialog closes, continue with existing flow
  StateManager.set("selectedAnalyticsSourceSheet", actualNewSheetName);
  sessionStorage.setItem(
    "tutorialStep3Text",
    'Press "Build Revenue Data" to set up a "_Build" sheet for a "Revenue Waterfall".'
  );
  sessionStorage.setItem("isInTutorialBuildFlow", "true");
  sessionStorage.removeItem("isInTutorialCleanFlow");
  
  window.location.href = "/analyze.html";
  return;
}
```

#### Step 3: Create Dialog Display Function (Simplified - Reuses Existing Dialog)
Add to `/src/ui/eventHandlers.js` before handleFormulaClean:

```javascript
/**
 * Shows the tutorial important note dialog after clean operation
 * @returns {Promise<void>} Resolves when dialog is closed
 */
async function showTutorialImportantNote() {
  return new Promise((resolve) => {
    const dialogUrl = window.location.origin + "/tutorialDialog.html?mode=importantNote&v=" + new Date().getTime();
    
    Office.context.ui.displayDialogAsync(
      dialogUrl,
      { height: 35, width: 30, displayInIframe: false },
      (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          ErrorService.logError(
            "Failed to display tutorial important note dialog",
            { error: asyncResult.error },
            COMPONENT_ID
          );
          resolve(); // Don't block tutorial flow
          return;
        }
        
        const dialog = asyncResult.value;
        
        dialog.addEventHandler(
          Office.EventType.DialogMessageReceived,
          (arg) => {
            if (arg.message === "continueFromImportantNote") {
              dialog.close();
              resolve();
            }
          }
        );
        
        dialog.addEventHandler(
          Office.EventType.DialogEventReceived,
          (arg) => {
            if (arg.error === 12006) { // User closed dialog
              resolve();
            }
          }
        );
      }
    );
  });
}
```

#### Step 4: Modify Existing Dialog HTML (Much Simpler!)
Add new mode handling to `/src/taskpane/tutorialDialog.html` around line 124:

```javascript
} else if (mode === "importantNote") {
    console.log("[TutorialDialog] Mode is 'importantNote'. Updating content.");
    titleElement.textContent = "Important Note";
    mainContentElement.innerHTML = `
        <p>Note that all results are written to new sheets created by the system. We can build off these as we further our analysis.</p>
        <p>For better performance, HyperPerfect leaves output formulas in the first row of the output sheet, but converts all monthly numbers to values. This behavior can be changed in the settings tab so all outputs are left as formulas.</p>
    `;
    actionButton.textContent = "Continue";
    actionButton.replaceWith(actionButton.cloneNode(true));
    document.getElementById("tutorialDialogActionButton").addEventListener("click", function () {
        console.log("[TutorialDialog] 'Continue' button clicked, sending 'continueFromImportantNote'.");
        Office.context.ui.messageParent("continueFromImportantNote");
    });
} else { // Default to step1 or if no mode is specified
```

No new HTML file needed! No webpack changes needed!

### 5. Simplified Implementation Summary

The implementation is straightforward because:
1. Tutorial state flag already exists (`isInTutorialCleanFlow`)
2. Hook point already exists in `handleFormulaClean()` 
3. Dialog pattern is established in the codebase

### 6. Files to Modify (Simplified!)

1. **Modify**: `/src/taskpane/tutorialDialog.html`
   - Add new `importantNote` mode to existing JavaScript
   - Reuses all existing styling and structure
   - No new files needed!

2. **Modify**: `/src/ui/eventHandlers.js`
   - Add `showTutorialImportantNote()` function
   - Update tutorial flow section to call the function
   - Maintains existing flow after dialog closes

### 7. Testing Plan
1. Start tutorial from settings
2. Create sample data
3. Navigate to clean page
4. Press "Clean source data"
5. Verify important note dialog appears
6. Click Continue
7. Verify navigation to analyze page continues
8. Test outside tutorial - dialog should NOT appear

### 8. Edge Cases
- Dialog fails to open: Log error but continue tutorial
- User closes dialog with X: Handle DialogEventReceived
- Multiple clicks: Dialog is modal, prevents this
- Slow clean operation: Dialog shows after completion

### 9. Benefits of This Approach
- Minimal code changes
- Uses existing tutorial flow infrastructure
- Non-intrusive to regular clean operations
- Easy to maintain and extend
- Consistent with existing dialog patterns