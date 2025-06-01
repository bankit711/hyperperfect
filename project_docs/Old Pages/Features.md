# Excel Add-in: Data Cleaning, Analysis, and Transformation

This software is a comprehensive Excel add-in that automates the process of cleaning, analyzing, and transforming data directly in Excel. It’s designed to handle large datasets (even 500,000+ rows) by reading data from a source worksheet, applying complex transformations via dynamically generated Excel formulas, and writing the results into a new, processed worksheet.

## Overview of Main Functions

### Data Ingestion & Validation

- **DataIngestionStream & HeaderDetector**  
  The tool starts by streaming raw data from an Excel worksheet using a memory-efficient approach. It converts Excel ranges into a standardized format and then validates the headers. This ensures that the structure of the data is correct before any transformations begin.

### Formula Generation & Strategy Application

- **Formula Builders & Strategies**  
  A core feature of the add-in is its ability to generate Excel formulas dynamically. The software implements several strategies:

  - **Clean Strategies**  
    - The `LetFormulaStrategy` generates complex formulas using Excel’s `LET` function to clean and transform data (e.g., handling unit conversions or partial period adjustments).

  - **Revenue Strategies**  
    - Different strategies exist for calculating revenue figures by month, quarter, or year. These strategies create formulas that sum or adjust values across columns based on the data type and requirements.

  - **Utility Strategies**  
    - Additional strategies are provided for handling specific tasks such as determining the cohort start month, cancel month, or simply placing spacer cells.

  - **Bulk Formula Generation**  
    - Instead of processing each cell individually, the system generates a single formula template for an entire column (or chunk) and then replaces a placeholder (usually `rowPlaceholder`) with the actual row numbers during processing.  
    - This approach minimizes Excel API calls and maximizes performance.

### Orchestration & Worksheet Building

- **OrchestrateSheetOperation**  
  A shared orchestration module manages the end-to-end data flow. It:
  
  - Retrieves the source sheet name and verifies that a valid sheet is selected.
  - Initiates data ingestion and header validation.
  - Calls on the formula factory to create the appropriate formula strategies based on column types.
  - Sets up a worksheet builder that handles writing data in chunks, applying formulas, and even batching style updates.

- **Worksheet Builders**  
  Components like the `DimensionsManager`, `ChunkProcessor`, and `WorksheetBuilderFinalization` collaborate to:

  - Manage the dimensions (columns and rows) and track metadata.
  - Process data in configurable batches (or “chunks”) to apply formulas and styles efficiently.
  - Finalize the worksheet by writing any remaining data and ensuring that all Excel ranges are properly updated.

### Styling & Performance Optimization

- **StyleOperations & XLSXOperations**  
  - The add-in uses a dedicated style manager to apply formatting rules using `XLSX-js-style`.  
  - It supports matrix-based styling and LRU caching to optimize performance when dealing with thousands of style objects.

- **Progress & Error Tracking**  
  - A centralized `ErrorService` logs errors and warnings with detailed context.  
  - A `ProgressTracker` monitors the operation’s progress—providing feedback on data ingestion, transformation, and worksheet finalization—all while ensuring minimal API calls and efficient processing.

### User Interface & Configuration

- **UI Components & State Management**  
  - The add-in offers a taskpane and other UI components (such as source sheet selectors and build dimension dropdowns) to let users choose the operation mode (e.g., clean vs. analyze).  
  - The `StateManager` keeps track of user selections and operational parameters.

- **Multiple Operation Modes**  
  - There are distinct controllers for:
    - **Clean operations** – where data is simply transformed and cleaned.
    - **Analyze operations** – which focus on revenue analysis, pivot tables, and waterfall reports.
  - Each mode tailors the formula strategies and worksheet-building process accordingly.