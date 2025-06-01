# File Requirements and Instructions
This file provides the purpose, key requirements and "do not" instructions for each file in the project.

---

## Engines

### Formula Builders

#### src/engines/formulaBuilders/strategies/abstractFormulaGenerator.js
- **Purpose:** Serves as the abstract base class for formula generation strategies, handling caching, placeholder replacement, and metrics tracking.
- **Key Requirements:**
  - Provide a framework for formula generation.
  - Support a two-phase strategy lifecycle (metadata in Phase 1, generation in Phase 2).
  - Implement common functionality for caching, placeholder replacement, and bulk formula generation.
  - Validate strategy-specific options.
  - Use PerformanceMonitor for timing operations.
  - Initialize worksheet context for formula generation.
  - Support memory-efficient processing and integration with StreamOperations.
  - Provide static metadata methods for the initialization phase.
  - Support early validation without instantiation.
  - Define clear strategy capabilities and requirements.
  - Support template-based formula generation
  - Handle standard placeholder replacements
  - Cache formulas and column letters for performance
  - Support bulk formula generation by column
  - Support row-specific formula adjustments
  - Provide regex-based formula adjustments
  - Enforce consistent error handling
  - Define strategy contract
  - Handle formula caching
- **Do Not:**
  - Implement specific formula templates or row-specific logic.
  - Process style rules or handle progress tracking.
  - Access other components directly or create unnecessary instances.
  - Mix initialization and processing phases, or store metadata between operations.
  - Initialize options (FormulaFactory responsibility)
  - Validate common placeholders (Strategy responsibility)
  - Pre-compile regex patterns (Strategy responsibility)
  - Maintain separate caches (Strategy responsibility)
  - Make direct Excel API calls (StreamOperations responsibility)
  - Handle memory management
  - Handle data streaming (StreamOperations responsibility)
  - Format data for Excel output (StreamOperations responsibility)
  - Cache metadata information

#### src/engines/formulaBuilders/strategies/cleanStrategies.js
- **Purpose:** Implements clean strategies (e.g., LetFormulaStrategy) for data cleaning operations.
- **Key Requirements:**
  - Generate complex LET formulas for data cleaning.
  - Handle unit conversions, partial period adjustments, and threshold applications.
  - Support bulk formula generation for 500,000+ rows using efficient template caching.
  - Validate required options and state values.
  - Provide detailed error logging and tracking.
  - Integrate with WorksheetBuilder's batching system.
  - Handle both template generation and row-specific formulas.
  - Support memory-efficient column processing.
  - Maintain compatibility with Excel's formula syntax.
  - Process formulas in configurable batch sizes.
  - Handle formula generation for entire columns at once.
  - Support asynchronous formula application.
  - Integrate with StateManager for configuration.
  - Follow Excel-specific cell referencing rules.
  - Maintain data integrity during transformations.
  - Support progress tracking and cancellation.
  - Handle unit conversions and transformations
  - Process partial period adjustments
  - Remove doubled values and apply thresholds
  - Use efficient template caching and string operations
- **Do Not:**
  - Handle memory management or process individual rows when bulk operations are possible.
  - Create redundant formula templates or store permanent formula state.
  - Modify worksheet structure or layout.
  - Handle style or formatting concerns.
  - Process cell properties unrelated to formulas.
  - Access Excel API directly.
  - Create intermediate data structures.
  - Bypass batch size limits.
  - Mix formula and style operations.
  - Cache formulas beyond the current operation.
  - Handle worksheet-level operations.
  - Process invalid formula templates.
  - Generate non-LET formulas.
  - Modify source data.
  - Handle cell formatting.
  - Access Node.js specific APIs.
  - Make assumptions about runtime.
  - Store state between operations.
  - Perform redundant validations.

#### src/engines/formulaBuilders/strategies/revenueStrategies.js
- **Purpose:** Implements revenue-related formula strategies for different time periods.
- **Key Requirements:**
  - Do not generate formulas for dimension, month or date columns
  - Generate complex formulas for quarters and years using SUM operations
  - Handle unit conversions, partial period adjustments, and threshold applications.
  - Support bulk formula generation for 500,000+ rows using efficient template caching.
  - Validate required options and state values.
  - Provide detailed error logging and tracking.
  - Integrate with WorksheetBuilder's batching system.
  - Handle both template generation and row-specific formulas.
  - Support memory-efficient column processing.
  - Maintain compatibility with Excel's formula syntax.
  - Process formulas in configurable batch sizes.
  - Handle formula generation for entire columns at once.
  - Support asynchronous formula application.
  - Integrate with StateManager for configuration.
  - Follow Excel-specific cell referencing rules.
  - Maintain data integrity during transformations.
  - Support progress tracking and cancellation.
  - Handle unit conversions and transformations
  - Use efficient template caching and string operations
  - Validate and process options such as column letters and placeholders.
  - Generate formula templates to calculate revenue based on monthly, quarterly, yearly, and since-inception periods.
  - Handle error logging and update metrics during template generation.
- **Do Not:**
  - Handle memory management or process individual rows when bulk operations are possible.
  - Create redundant formula templates or store permanent formula state.
  - Modify worksheet structure or layout.
  - Handle style or formatting concerns.
  - Process cell properties unrelated to formulas.
  - Access Excel API directly.
  - Create intermediate data structures.
  - Bypass batch size limits.
  - Mix formula and style operations.
  - Cache formulas beyond the current operation.
  - Handle worksheet-level operations.
  - Process invalid formula templates.
  - Modify source data.
  - Handle cell formatting.
  - Access Node.js specific APIs.
  - Make assumptions about runtime.
  - Store state between operations.
  - Perform redundant validations.
  - Alter the calculation logic or mapping of column letters and placeholders without explicit requirements.
  - Introduce new revenue strategy classes without review.

#### src/engines/formulaBuilders/strategies/utilityStrategies.js
- **Purpose:** Implements utility strategies for formula generation, including operations for cohort start month, cancel month, spacer cells, and dimension copying.
- **Key Requirements:**
  - Generate XLOOKUP formulas for date finding.
  - Follow Excel-specific cell referencing rules and maintain data integrity.
  - Maintain compatibility with Excel's formula syntax.
  - Support bulk formula generation for 500,000+ rows using efficient template caching.
  - Support asynchronous formula application and progress tracking.
  - Validate required options and state values.
  - Provide detailed error logging and tracking.
  - Integrate with WorksheetBuilder's batching system.
  - Handle both template generation and row-specific formulas.
  - Support memory-efficient column processing.
  - Process formulas in configurable batch sizes.
  - Handle formula generation for entire columns at once.
  - Integrate with StateManager for configuration.
  - Maintain data integrity during transformations.
  - Support progress tracking and cancellation.
  - Handle unit conversions and transformations
  - Use efficient template caching and string operations
- **Do Not:**
  - Handle memory management or process individual rows when bulk operations are possible.
  - Create redundant formula templates or store permanent formula state.
  - Modify worksheet structure or layout.
  - Handle style or formatting concerns.
  - Process cell properties unrelated to formulas.
  - Access Excel API directly.
  - Create intermediate data structures.
  - Bypass batch size limits.
  - Mix formula and style operations.
  - Cache formulas beyond the current operation.
  - Handle worksheet-level operations.
  - Process invalid formula templates.
  - Modify source data.
  - Handle cell formatting.
  - Access Node.js specific APIs.
  - Make assumptions about runtime.
  - Store state between operations.
  - Perform redundant validations.
  - Alter the calculation logic or mapping of column letters and placeholders without explicit requirements.
  - Introduce new revenue strategy classes without review.

#### src/engines/formulaBuilders/formulaFactory.js
- **Purpose:** Maps column types to specific formula strategies.
- **Key Requirements:**
  - Map column types to specific formula strategies based on the sheet context.
  - Provide metadata (e.g., strategy name, requirements, capabilities) for initializing formula strategies.
  - Support fallback to common strategies if a context-specific strategy isn't found.
  - Provide two-phase formula strategy management.
  - *(Phase 1)* Provide lightweight metadata about strategies, enable early structural decisions, and return strategy requirements without instantiation.
  - *(Phase 2)* Create formula instances based on strategy classes, handle heavy generation operations, and support batch creation.
  - Maintain a clear strategy map, validate and normalize options, support streaming-friendly generation, and cache formula templates.
  - Support multiple sheet contexts (common, clean, by-period, since-inception)
  - Provide reasonable error logging through ErrorService
  - Support template creation with default row values
  - Receive source sheet selection from StateManager
  - Create memory-efficient formula instances
  - Handle 500,000+ rows efficiently through chunking
  - Maintain formula consistency across chunks
- **Do Not:**
  - Modify the core strategy mapping logic or introduce new mappings without explicit approval.
  - Alter the metadata structure or its derivation.
  - Store formula instances permanently.
  - Handle worksheet building or manage formula application timing.
  - Cache formula results, handle style operations, or modify strategy behavior after creation.
  - Store state between formula creations, handle progress tracking, or access other components directly.
  - Implement specific formula logic, create or store strategies permanently, or handle strategy mapping changes at runtime.
  - Store permanent state
  - Handle Excel API calls
  - Manage worksheet state
  - Create complex intermediate objects
  - Handle formula evaluation
  - Store formula history
  - Manage formula dependencies
  - Handle formatting
  - Mix initialization and processing phases
  - Store metadata between operations

#### src/engines/formulaBuilders/formulaUtils.js
- **Purpose:** Provides utility functions for formula builders, including conversion between column indexes and Excel column letters.
- **Key Requirements:**
  - Convert a zero-based column index to its corresponding Excel column letter.
  - Convert an Excel column letter to a zero-based column index.
  - Cache results for improved performance.
- **Do Not:**
  - Modify the core conversion algorithms or caching strategy unless new requirements are provided.
  - Remove or change the interface of these utility functions.

---

### Orchestration

#### src/engines/formulaAnalyzeController.js
- **Purpose:** Orchestrates the analyze operation for revenue data, handling tasks such as revenue analysis, pivot table generation, and lookback analysis.
- **Key Requirements:**
  - Confirm that the provided options are an object.
  - Get the selected analytics source sheet from the UI state (using the proper key, e.g. "selectedAnalyticsSourceSheet").
  - Ensure that a valid sheet is selected, and throw a structured error if not.
  - Determine the source sheet name from the retrieved UI state.
  - Determine the target sheet name – by default appending a suffix ("_Revenue").
  - In addition to the above, verify that required parameters for analysis (eg selected build dimension) are present.
  - Validate that the additional context (e.g. buildDimension and any other analyze-related settings) meet expected criteria
  - Prepare a configuration object with analyze-specific flags. For example:, skipConditionalFormatting: true, insertStartCancelSpacerCols: true,insertPeriodSummaries: true
  - Include the complete sheetContext (merging the UI state and any extra options) so that it contains the validated build dimension and any other necessary context.
  - Call the shared orchestrateSheetOperation function with the correct parameters and extra state, ensuring that the configuration is tailored for an analysis operation.
  - Use the ErrorService to display an initial message indicating that the revenue analysis process is starting
  - Use the ProgressTracker to signal the start, progress, and completion of the operation.
  - Use the ErrorService to log and display any errors, and ensure that errors are properly passed to the ProgressTracker for tracking.
- **Do Not:**
	- Manage data streaming, create formula strategies, or build worksheets directly (all of which are handled by the shared orchestration function, DataIngestionStream, StreamOperations, and WorksheetBuilder).
  - Process or validate individual data chunks, headers, or stream chunk data (this is the responsibility of the respective lower-level modules).
  - Implement its own progress tracking or perform deep validation on the data structure. Instead, it should delegate these responsibilities to the shared orchestration and the underlying services.
  - Manage or update the UI state beyond the initial retrieval of the required sheet and build dimension.
  - Access Excel properties directly or handle style strategies (this is managed elsewhere in the stack).
  - Modify stream chunk structure, manage memory, or store intermediate results.
  - Change the orchestration flow or analysis-specific validations without explicit instruction.
  - Introduce additional analysis operations not defined in the requirements.

#### src/engines/quartersYears.js
- **Purpose:** Generates fiscal quarter and year summary headers from month header data.
- **Key Requirements:**
  - Sort and process month headers to compute fiscal quarters and years.
  - Create summary objects only if complete periods (e.g., 3 months for a quarter) are present.
  - Log relevant processing steps for debugging purposes.
- **Do Not:**
  - Revalidate or perform detailed checks on the outputs of the lower-level operations.
  - Change the calculation logic for fiscal periods or remove logging instructions.
  - Modify the structure of the generated summary objects.

#### src/engines/formulaCleanController.js
**Purpose:**  
Acts as the top-level entry point for a clean operation. It validates the input options and the selected source sheet, prepares operation-specific configuration, and delegates the processing to the shared orchestration function.
**Key Requirements:**  
  - Validate that the provided options are an object.  
  - Retrieve and validate the selected source sheet from the UI state (via StateManager).  
  - Derive the source sheet name and determine the target sheet name (appending `"_Clean"` if not overridden).  
  - Prepare a minimal operation configuration object (e.g., flags for skipping conditional formatting, inserting spacer/summary columns).  
  - Delegate the entire data processing operation by calling the shared `orchestrateSheetOperation` function with the proper parameters (including extra state if needed).  
  - Display an initial info message indicating that the cleaning process has started.  
  - Utilize ErrorService to log and display errors.  
  - Signal operation progress and completion using ProgressTracker.  
- **Do Not:**  
  - Directly manage data streaming, formula strategy creation, or worksheet building (all handled by `orchestrateSheetOperation`).  
  - Directly process data chunks or validate headers.  
  - Implement custom progress tracking or in-depth data validation beyond verifying the presence of a selected source sheet.
  - Process invalid StreamChunk data (StreamOperations responsibility).
  - Detect or validate headers (HeaderDetector responsibility).
  - Process data chunks directly (StreamOperations responsibility).
  - Implement custom progress tracking.
  - Manage UI state.
  - Validate source data (DataIngestionStream responsibility).
  - Build worksheets directly (WorksheetBuilder responsibility).
  - Handle style strategies (StyleOperations responsibility).
  - Access Excel properties directly.
  - Modify the StreamChunk structure.
  - Handle memory management (StreamOperations responsibility).
  - Create data streams (DataIngestionStream responsibility).
  - Validate data structure (StreamOperations responsibility).
  - Revalidate component outputs.
  - Track detailed state for recovery (use component-level recovery instead).
  - Implement idempotency checks.
  - Perform detailed component output validation.
  - Create custom progress tracking mechanisms.
  - Cache or store intermediate results.

#### src/engines/orchestrateSheetOperation.js
- **Purpose:** Provides shared orchestration logic for both clean and analyze operations, including data ingestion, strategy creation, worksheet building, and finalization.
- **Key Requirements:**
  - Validate that the overall options are provided and are of the correct type.
  - Ensure that `sourceSheetName` is provided.
  - Establish and merge the sheet context from operationConfig, extraState, and defaults (e.g., setting the type to "clean", "analyze", or "periodAnalyze").
  - Perform detailed metadata consistency validation during data ingestion.
  - Ingest sheet data using `DataIngestionStream`, ensuring headers are validated.
  - Convert ingested data into a streaming generator via `StreamOperations`.
  - Update progress based on the total number of rows found and processed.
  - For each header in the metadata, determine and attach the appropriate formula strategy using `FormulaFactory.getStrategyName`.
  - Create formula strategies for all headers using `FormulaFactory.createStrategiesForColumns`.
  - Validate that each formula strategy conforms to the required interface (i.e., includes functions like `transform` and `getTemplate`).
  - Initialize the worksheet builder with the correct configuration and operation-specific flags (e.g., clearExisting, skip conditional formatting, insert spacer/summary columns).
  - Directly manage the application of formulas by passing the formula strategies to the worksheet builder.
  - Delegate each data chunk to the worksheet builder for processing, ensuring that formulas are applied as data is written.
  - Finalize the worksheet build by calling the builder’s `finalize` method.
  - Clear any internal caches in formula strategies after finalization.
  - Use ErrorService for detailed error logging, contextual wrapping of errors, and for creating structured Excel errors.
  - Manage overall operation progress using ProgressTracker (start, update, and complete the progress of the operation).
  - Coordinate the full data processing pipeline: data ingestion, metadata validation, formula strategy selection, streaming and chunk processing, worksheet building, formula application, and final cleanup.
  - Ensure that responsibilities such as metadata validation, formula strategy coordination, and direct management of formula application are centralized within this orchestration function, replacing the responsibilities removed from FormulaCleanController.

- **Do Not:**
  - Alter the operational flow or add new processing phases without explicit requirements.
  - Modify error handling or progress tracking logic.
  - Retrieve or validate the selected source sheet from the UI or StateManager 
  - Display initial informational or progress messages that are meant for user feedback
  - Determine or override the target sheet name based on UI inputs or user-defined naming conventions
  - Perform comprehensive input validation for operation parameters.
  - Manage or update UI state or dispatch UI-specific error messages.
  - Handle user interactions such as presenting dialogs or configuring operation-specific settings.
  - Initiate any Excel Add-in specific initialization steps or perform tasks related to user authentication/authorization.
  - Process invalid StreamChunk data (this is StreamOperations' responsibility).
  - Detect or validate headers (handled by HeaderDetector).
  - Process data chunks directly (delegated to StreamOperations).
  - Implement custom progress tracking mechanisms (use the provided ProgressTracker).
  - Manage UI state (this is managed by the UI layer or FormulaCleanController).
  - Validate source data (the responsibility of DataIngestionStream).
  - Build worksheets directly (delegated to WorksheetBuilder).
  - Handle style strategies (the responsibility of StyleOperations).
  - Access Excel properties directly (use the appropriate abstraction layers).
  - Modify the StreamChunk structure (the structure must remain consistent).
  - Handle memory management (this is managed by StreamOperations).
  - Create data streams (the responsibility of DataIngestionStream).
  - Validate data structure (handled within StreamOperations).
  - Revalidate component outputs (assume outputs are pre-validated by each component).
  - Track detailed state for recovery (use component-level recovery mechanisms instead).
  - Implement idempotency checks (not required in this orchestration layer).
  - Perform detailed component output validation (avoid duplicating validations).
  - Cache or store intermediate results (do not manage caching at this layer).

---

### Worksheet Builders

#### src/engines/worksheetBuilders/chunkProcessor.js
- **Purpose:** Processes data in batches (chunks) to support efficient writing and style application in vertical slices.
- **Key Requirements:**
  - Process chunks by writing data and applying styles in a single pass.
  - Handle data in memory-efficient vertical slices (2–3 columns).
  - Handle Excel objects properly by storing only worksheet metadata in state, obtaining fresh worksheet references in Excel.run contexts, and releasing references after use.
  - Support large datasets (500k+ rows) with predictable performance.
  - Use optimal batch sizes for Excel operations.
  - Apply styles immediately after data writing.
  - Trust StreamOperations’ chunk validation.
  - Use ProgressTracker for basic progress updates.
  - Coordinate with StyleOperations for style application.
  - Handle error boundaries with proper context.
  - Maintain consistent array structure.
  - Support batch operations for style application.
  - Cache and reuse prepared styles.
  - Support header and data style separation.
  - Handle Excel feature suspension/restoration through XLSXOperations.
  - Support style matrix validation.
  - Track row counts and processing state.
  - Manage initialization state.
  - Coordinate with DimensionsManager for row tracking.
  - Support error recovery and reporting.
  - Manage processing lifecycle.
  - Handle data and style application in vertical slices.
  - Transform values based on strategy operationType.
  - Pass through values for DIMENSION and SPACER operation types.
  - Process headers and data together with distinct styles.
  - Use pre-computed styles from StyleOperations cache.
- **Do Not:**
  - Manage worksheet lifecycle (WorksheetBuilderInitialization responsibility).
  - Perform chunk validation (StreamOperations responsibility).
  - Store permanent style definitions.
  - Make style decisions (StyleOperations responsibility).
  - Modify chunk structure.
  - Handle formula generation.
  - Manage dimensions (DimensionsManager responsibility).
  - Initialize worksheets.
  - Handle header detection.
  - Store global state.
  - Modify processing configuration.
  - Cache worksheet references.
  - Modify Excel features directly (XLSXOperations responsibility).
  - Handle progress UI updates.
  - Manage component initialization.
  - Define style rules.
  - Handle sheet protection.
  - Implement custom progress tracking.
  - Create or modify style definitions.
  - Handle formula processing (FormulaFactory responsibility).
  - Make decisions about batch sizes at runtime.
  - Store permanent data between chunks.
  - Cache Excel ranges or references.
  - Implement custom object lifecycle management.
  - Create unnecessary abstraction layers.
  - Track Excel objects outside Excel.run contexts.

#### src/engines/worksheetBuilders/dataIngestionStream.js
- **Purpose:** Loads and validates Excel data in chunks (streaming). It converts Excel ranges to a normalized SheetJS format for efficient processing of large datasets.
- **Key Requirements:**  
  - Load raw values from Excel sheets.
  - Convert Excel ranges to SheetJS format for internal processing.
  - Use `streamLargeDataset` for ingestion (2D arrays) and `createDataStream` for output (SheetJS format).
  - Handle 500,000 rows of data efficiently using array-based streaming.
  - Stream data with a standardized chunk structure.
  - Process chunks of configurable size (default 5000 rows).
  - Ensure consistent array structure.
  - Validate Excel-specific aspects (sheet structure, cell types).
  - Work seamlessly with StreamOperations.
  - Use ErrorService for error handling and logging.
  - Produce helpful logging for debugging.
  - Integrate header categorizations from HeaderDetector.
  - Support efficient streaming through async iterators.
  - Preserve type information.
  - Use range-based sheet references.
  - Use ProgressTracker for all progress updates.
  - Use browser-compatible APIs and fallback gracefully when system APIs are unavailable.
  - Convert Excel data to a normalized array format.
  - Handle consistent type conversion across Excel versions.
  - Process cell properties necessary for data integrity.
  - Create minimal intermediate structures for validation and streaming.
- **Do Not:**
  - Process invalid chunks.
  - Make API calls to Excel.
  - Create or modify worksheets.
  - Store permanent data.
  - Bypass batch size limits.
  - Mix ingestion and output concerns.
  - Create intermediate objects unrelated to data validation or streaming.
  - Handle formula generation.
  - Access the formula factory directly.
  - Process cell properties unrelated to data values.
  - Handle Excel-specific features during ingestion.
  - Handle formula generation or validation.
  - Modify the core stream structure after creation.
  - Create complex metadata structures.
  - Perform redundant validation.
  - Duplicate StreamOperations validation.
  - Access Node.js–specific APIs (e.g., process, require).
  - Make assumptions about the runtime environment.
  - Monitor memory usage or implement memory thresholds.
  - Implement custom progress tracking.

#### src/engines/worksheetBuilders/dimensionController.js
- **Purpose:** Manages worksheet dimensions, column metadata, and header modifications to support chunk-based data processing.
- **Key Requirements:**
  - Maintain row indexing for processing.
  - Track row counts for StreamChunk processing.
  - Trust and use pre-validated headers.
  - Return dimensions in SheetJS format.
  - Support memory limits from PROCESSING_CONFIG.
  - Update dimensions based on chunk processing.
  - Perform one-time column initialization.
  - Accept only validated inputs.
  - Handle period summary column logic.
  - Manage spacer column insertions.
  - Own business rules for column structure.
  - Support chunk-based processing.
  - Track and update column indices.
  - Handle column grouping for efficient processing.
  - Maintain detailed performance metrics (e.g., operation counts, timing data) for diagnostics and performance tuning.
  - Implement a robust caching mechanism for computed dimensions with a "dirty" flag to trigger recalculation only when necessary.
  - Automatically update the worksheet's reference (e.g., !ref) based on dynamic row and column changes, validating against Excel's maximum limits.
  - Ensure column and row count changes are synchronized with the worksheet metadata.
  - Support asynchronous header modification to integrate external metadata while preserving error handling.
  - Adjust header structure dynamically based on the operation context (e.g., "analyze" vs. "clean") and validate the presence of required context.
  - Dynamically generate and insert period summary columns (quarters/years) based on date headers and fiscal configuration.
  - Ensure proper insertion and ordering of control columns (e.g., Start/Cancel and spacer columns) with appropriate metadata.
  - Log errors with complete contextual information (operation names, component identifiers, and input states) to facilitate debugging.
  - Prevent the propagation of inconsistent state by throwing well-defined errors and logging warnings when assumptions are violated.
  - Maintain a consistent state with a clear single source of truth for dimensions, and provide a reset method for controlled reinitialization.
  - Track comprehensive metadata for each column, including computed Excel column letters, indices, operation types, and business rules.
  - Maintain column relationships such as ordering and grouping to ensure consistent processing.
- **Do Not:**
  - Modify worksheet content (WorksheetBuilder responsibility).
  - Handle data processing (StreamOperations responsibility).
  - Make Excel API calls (WorksheetBuilder responsibility).
  - Store actual cell data.
  - Cache dimension information unnecessarily.
  - Handle merged cells (WorksheetBuilder responsibility).
  - Perform garbage collection (StreamOperations responsibility).
  - Create formula instances (FormulaFactory responsibility).
  - Allow reinitialization after setup.
  - Mix component responsibilities.
  - Validate headers (HeaderDetector responsibility).
  - Revalidate inputs.
  - Apply header changes to worksheet (WorksheetBuilder responsibility).
  - Create or store formula strategies.
  - Handle formula generation or application.
  - Store formula metadata between operations.
  - Make formula-specific decisions beyond structure.
  - Access formula instances directly.
  - Modify formula behavior.
  - Modify Excel properties directly.
  - Store permanent data.
  - Create complex metadata.
  - Cache Excel references.
  - Store worksheet references.
  - Handle style operations.
  - Process data chunks.
  - Validate data values.
  - Handle formula generation.
  - Cache formula information.
  - Implement custom progress tracking.

#### src/engines/worksheetBuilders/streamOperations.js
- **Purpose:** Provides streaming and batching functions for handling large datasets in memory‐efficient chunks and validating array structures.
- **Key Requirements:**
  - Stream data in memory-efficient chunks using native arrays.
  - Process large datasets (500,000 rows) with minimal transformations.
  - Handle Excel objects properly by using Excel.run contexts for all operations.
  - Pass through array chunks with necessary validation.
  - Format chunks for XLSX-style compatibility.
  - Apply styles via StyleOperations.
  - Support formula processing in Phase 2 only.
  - Own complete chunk validation responsibility.
  - Prepare chunk data for WorksheetBuilder Excel conversion.
  - Apply styles incrementally during streaming.
  - Coordinate with StyleOperations for actual style rules.
  - Maintain array structure during style application.
  - Validate array structure.
  - Use ProgressTracker for all progress updates.
  - Support async processing.
  - Use ErrorService for logging.
  - Create async iterators.
  - Create minimal intermediate structures for validation and streaming.
  - Count chunks exactly once when processed.
  - Track chunk processing consistently.
  - Support formula strategy application in chunks.
  - Maintain formula consistency across chunks.
- **Do Not:**
  - Transform data types unnecessarily.
  - Process Excel metadata beyond required validation.
  - Create intermediate objects unrelated to validation or streaming.
  - Make direct Excel API calls or modify worksheets (delegated to WorksheetBuilder).
  - Generate formulas (FormulaFactory responsibility).
  - Cache styles (StyleOperations responsibility).
  - Convert to final Excel format (delegated to WorksheetBuilder).
  - Mix ingestion and output concerns.
  - Duplicate stream validation.
  - Create complex metadata structures.
  - Define style rules or formats.
  - Store style definitions.
  - Make style decisions.
  - Handle Excel-specific style properties.
  - Handle conditional formatting.
  - Monitor memory usage.
  - Define memory thresholds.
  - Implement custom progress tracking.
  - Create complex object tracking systems.
  - Cache worksheet references between operations.
  - Store permanent Excel object references.
  - Implement custom object lifecycle management.
  - Create unnecessary abstraction layers.
  - Track Excel objects outside Excel.run contexts.

#### src/engines/worksheetBuilders/styleOperations.js
- **Purpose:** Manages Excel styling and conditional formatting by creating, validating, and caching style objects and mapping column types to style strategies.
- **Key Requirements:**
  - Create and validate style objects.
  - Maintain efficient LRU style cache.
    - Support style inheritance and merging.
  - Pre-compute commonly used styles.
  - Validate style object structure.
    - Support xlsx-js-style format requirements.
  - Map column types to style strategies.
  - Support header vs data style differentiation.
  - Handle conditional style rules.
  - Generate column format matrices.
  - Cache column style mappings.
  - Create conditional format rule sets.
  - Validate rule configurations.
  - Generate condition-based styles.
  - Support rule priorities.
  - Cache common rule evaluations.
  - Provide default style fallbacks.
  - Use LRU caching for style objects.
  - Pre-compute style combinations.
  - Process styles in vertical slices.
  - Bulk apply styles to column ranges.
- **Do Not:**
  - Apply styles to worksheet (handled by WorksheetBuilder).
  - Make Excel API calls.
  - Process data chunks.
  - Store permanent style data.
  - Handle batch operations.
  - Manage worksheet state.
  - Handle merged cells.
  - Access formula factory directly.
  - Monitor memory usage.
  - Cache raw data.
  - Handle Excel features.
  - Modify worksheet content.
  - Track processing state.
  - Store worksheet references.
  - Apply conditional formats directly.
  - Store condition evaluation results.
  - Track rule application state.
  - Process large rectangular ranges.
  - Cache cell references between batches.
  - Make style decisions.
  - Handle UI updates.
  - Store permanent data.
  - Mix operation concerns.
  - Store Excel context.
  - Cache application state.
  - Hold workbook references.

#### src/engines/worksheetBuilders/worksheetBuilderFormulaManager.js
- **Purpose:** Applies formulas in efficient batches and manages formula strategy initialization, validation, and application during worksheet building.
- **Key Requirements:**
  - Apply formulas in efficient batches.
  - Process formulas in vertical slices for optimal performance.
  - Handle formula strategy initialization and validation.
  - Use ProgressTracker for formula application progress:
    - Track batch processing progress.
    - Track column group progress.
    - Report formula application state changes.
  - Coordinate with FormulaFactory for strategy creation.
  - Handle formula-specific error boundaries.
  - Support cancellation and pausing of formula operations.
  - Validate formula configuration and parameters.
  - Handle formula column identification.
  - Coordinate with Excel for formula sync.
  - Process in small column groups (2–3 columns).
  - Cache and clear formula templates per column group.
- **Do Not:**
  - Handle style application.
  - Manage style operations.
  - Make direct Excel API calls.
  - Handle memory management.
  - Monitor memory usage.
  - Handle data streaming (StreamOperations responsibility).
  - Format data for Excel output (StreamOperations responsibility).
  - Create or modify worksheets directly.
  - Handle data ingestion.
  - Process raw data.
  - Store permanent formula data.
  - Mix style and formula concerns.
  - Handle style-specific operations.
  - Create unnecessary intermediate objects.
  - Handle UI updates directly.
  - Make assumptions about formula types.
  - Cache formulas across groups.
  - Hold formula templates globally.
  - Implement custom progress tracking.

#### src/engines/worksheetBuilders/worksheetBuilderInitialization.js
- **Purpose:** Initializes worksheet metadata and dimensions and prepares the worksheet for data writing.
- **Key Requirements:**
  - Accept pre-validated headers and configure settings.
  - Create a worksheet and prepare its state.
  - Delegate chunk processing to the appropriate processor.
  - Initialize dimensions using DimensionsManager.
  - Create or clear worksheets as needed.
  - Validate worksheet state.
  - Configure batch sizes and thresholds.
  - Use ProgressTracker for initialization progress.
  - Handle worksheet activation and cleanup.
- **Do Not:**
  - Process data chunks directly (delegated to ChunkProcessor).
  - Manage worksheet lifecycle (WorksheetBuilderInitialization responsibility).
  - Perform chunk validation.
  - Store permanent style definitions.
  - Make style decisions (StyleOperations responsibility).
  - Modify the chunk structure.
  - Handle formula generation.
  - Manage dimensions (DimensionsManager responsibility).
  - Initialize worksheets.
  - Handle header detection.
  - Store global state.
  - Modify processing configuration.
  - Cache worksheet references.
  - Modify Excel features directly (XLSXOperations responsibility).
  - Handle progress UI updates.
  - Manage component initialization.
  - Define style rules.
  - Handle sheet protection.
  - Implement custom progress tracking.
  - Create or modify style definitions.
  - Handle formula processing (FormulaFactory responsibility).
  - Make decisions about batch sizes at runtime.
  - Store permanent data between chunks.
  - Cache Excel ranges or references.
  - Mix initialization and processing concerns.
  - Create complex object tracking systems.
  - Cache worksheet references between operations.
  - Store permanent Excel object references.
  - Implement custom object lifecycle management.
  - Create unnecessary abstraction layers.
  - Track Excel objects outside Excel.run contexts.

---

## Services

### Excel Services

#### src/services/excel/dateOperations.js
- **Purpose:** Handles Excel date conversions and formatting.
- **Key Requirements:**
  - Convert Excel serial numbers to dates and vice versa.
  - Validate date arrays and format dates using specified formats.
  - Clear any internal caches as needed.
- **Do Not:**
  - Modify core date conversion logic or remove logging or validation instructions.

#### src/services/excel/xlsxOperations.js
- **Purpose:** Handles XLSX file operations using xlsx-js-style.
- **Key Requirements:**
  - Create new worksheets, clear worksheet contents, and manage sheet lifecycle.
  - Register and apply styles according to the xlsx-js-style format.
  - Handle worksheet creation and modification
  - Process data in memory-efficient chunks
  - Support style registration and application
  - Manage worksheet properties and state
  - Handle Excel context and synchronization
  - Support large dataset operations
  - Provide column and cell utilities
  - Cache style definitions
  - Track worksheet dimensions
  - Handle merged cells
  - Support conditional formatting
  - Manage Excel features:
    * Screen updating
    * Calculation modes
    * Events and formulas
    * Pivot table refresh
  - Optimize memory usage:
    * Clear style cache
    * Release worksheet references
    * Manage chunk processing
  - Support batch operations:
    * Process data in chunks
    * Group style operations
    * Batch formula application
  - Handle worksheet activation
  - Manage worksheet properties:
    * Column widths
    * Row heights
    * Tab colors
    * Sheet visibility
  - Handle sheet lifecycle:
    * Check existence
    * Create/delete sheets
    * Clear contents/formats
    * Manage used ranges
  - Manage Excel context:
    * Application state
    * Calculation modes
    * Context synchronization
    * Error boundaries
  - Control operations:
    * Pause/Resume support
    * Cancellation handling
  - Provide custom error types:
    * Sheet-specific errors
    * Operation errors
    * Context errors
- **Do Not:**
  - Store complete worksheet data.
  - Handle UI concerns or direct Excel API calls.
  - Store complete worksheet data.
  - Hold permanent style references.
  - Cache formula definitions.
  - Mix UI concerns.
  - Handle business logic.
  - Manage component state.
  - Define validation rules.
  - Own column arrangement.
  - Store worksheet content.
  - Cache worksheet state.
  - Handle worksheet updates.
  - Process header metadata.
  - Make header decisions.
  - Own formula generation.
  - Define style rules.
  - Handle UI updates.
  - Store permanent data.
  - Mix operation concerns.
  - Store Excel context.
  - Cache application state.
  - Hold workbook references.

### General Services

#### src/services/general/errorHandling.js
- **Purpose:** Centralized error handling for the project.
- **Key Requirements:**
  - Implement error context creation and display methods.
  - Log errors and wrap asynchronous functions.
  - Provide error code mappings and detailed error context.
- **Do Not:**
  - Modify error display formats.
  - Bypass centralized logging mechanisms.

#### src/services/general/performanceMonitor.js
- **Purpose:** Tracks performance metrics of operations.
- **Key Requirements:**
  - Start and end operations while recording metrics.
  - Generate performance summaries and clear metrics when needed.
  - Track operation timing:
    * Start/end timestamps
    * Duration calculation
    * Nested operation support
  - Manage operation contexts:
    * Create operation contexts
    * Track nested operations
    * Maintain operation stack
  - Track performance metrics:
    * Operation duration
    * Throughput calculation
  - Handle errors:
    * Record operation errors
    * Track error states
    * Capture error snapshots
  - Generate reports:
    * Performance summaries
    * Memory usage reports
    * Operation metrics
  - Support batch operations:
    * Track batch sizes
    * Monitor response times
    * Optimize performance
  - Provide utilities:
    * Format byte values
    * Calculate throughput
    * Generate timestamps
  - Manage resources:
    * Clean up completed operations
    * Release memory
    * Clear metrics
- **Do Not:**
  - Execute operations or monitor memory usage.
  - Handle business logic.
  - Execute operations.
  - Monitor memory usage.
  - Handle business logic.

#### src/services/general/processingConfig.js
- **Purpose:** Defines global processing settings and limits for the application.
- **Key Requirements:**
  - Set batch sizes, cache limits, and chunk sizes.
  - Configure processing constants to support 500,000+ rows.
  - Define global processing constants.
  - Configure batch sizes for optimal performance.
  - Align batch sizes across components.
  - Support processing of 500,000+ rows.
  - Define cache size limits.
  - Set column group processing sizes.
  - Configure formula batch sizes.
  - Define style processing batches.
- **Do Not:**
  - Implement processing logic or dynamic batch adjustments.
  - Implement processing logic.
  - Handle memory management.
  - Define memory thresholds.
  - Monitor memory usage.
  - Manage cache operations.
  - Process data chunks.
  - Track memory usage.
  - Implement batch processing.
  - Handle error conditions.
  - Manage state.
  - Track progress.
  - Monitor performance.
  - Implement validation.
  - Handle data operations.
  - Process formulas.
  - Apply styles.
  - Manage worksheets.

#### src/services/general/progressTracker.js
- **Purpose:** Tracks progress and metrics for various operations.
- **Key Requirements:**
  - Initialize, update, and complete operation progress.
  - Track state changes and report progress through callbacks.
  - Manage centralized progress.
  - Expose complete state.
  - Track component progress.
  - Maintain operation metadata.
  - Handle error propagation.
  - Support progress callbacks.
  - Update progress based on chunk processing.
- **Do Not:**
  - Expose individual internal properties.
  - Manage operation logic beyond progress tracking.
  - Expose individual properties.
  - Store Excel structures.
  - Handle operation logic.
  - Persist state.
  - Provide direct mutation.
  - Access formula factory.

#### src/services/general/types.js
- **Purpose:** Defines data types (e.g., COLUMN_TYPES) for consistent use across the application.
- **Key Requirements:**
  - Define all type enums used in the application.
  - Provide consistent type definitions to support code completion and type safety.
- **Do Not:**
  - Implement type checking logic or convert between types.

#### src/services/general/utilities.js
- **Purpose:** Provides utility functions for taskpane UI operations.
- **Key Requirements:**
  - Offer helper functions for DOM manipulation.
  - Provide functions for option creation, Excel column conversion, and address formatting.
  - Support array truncation and element retrieval.
- **Do Not:**
  - Modify DOM structure directly.
  - Implement complex UI logic.

---

## UI Components

#### src/ui/analyze.js
- **Purpose:** 
- **Key Requirements:** 
- **Do Not:**

#### src/ui/analyzeConfig.js
- **Purpose:** Provides configuration for analyze UI components.
- **Key Requirements:** 
- **Do Not:**

#### src/ui/analyzeController.js
- **Purpose:** Acts as the controller for the analyze UI.
- **Key Requirements:**
  - Initialize the analyze UI.
  - Register components and set up non-component event listeners.
  - Populate the source sheet selector and enable dependent dropdowns.
- **Do Not:**
  - 

#### src/ui/cleanConfig.js
- **Purpose:** Provides configuration for clean UI components.
- **Key Requirements:** 
- **Do Not:**

#### src/ui/cleanController.js
- **Purpose:** Acts as the controller for the clean UI.
- **Key Requirements:**
  - Initialize the clean UI.
  - Register components and set up non-component event listeners.
  - Populate the source sheet selector.
- **Do Not:**
  - 

#### src/ui/componentManager.js
- **Purpose:** Manages UI component lifecycles.
- **Key Requirements:**
  - Register and manage UI components.
  - Handle component dependencies and initialize components based on context.
  - Track component state and provide lifecycle methods.
- **Do Not:**
  - Implement direct DOM manipulation.
  - Mix UI registration with business logic.

#### src/ui/eventHandlers.js
- **Purpose:** Handles UI interaction events.
- **Key Requirements:**
  - Manage events such as dropdown changes, source sheet changes, dimension changes, number input changes, and button clicks.
- **Do Not:**
  - 

#### src/ui/headerDetector.js
- **Purpose:** Detects and validates header rows in Excel worksheets.
- **Key Requirements:**
  - Get headers during data loading.
  - Return fully validated headers matching ValidatedHeaders interface.
  - Handle month and dimension headers per SheetJSData.
  - Perform complete header validation.
  - Process header metadata.
  - Provide unique column values.
  - Handle errors with component context.
  - Use static methods for stateless operation.
  - Return consistent header structure.
  - Validate header types per SheetJSData.
  - Support date format detection.
  - Maintain header type mapping.
  - Ensure headers match processing flow.
  - Provide type-safe validated output.
  - Maintain compatibility with existing systems.
  - Set validated flag on successfully processed headers.
  - Track validation state in header metadata.
- **Do Not:**
  - Make multiple API calls.
  - Handle XLSX formatting.
  - Handle styling (StyleOperations responsibility).
  - Create worksheets (WorksheetBuilder responsibility).
  - Perform data operations outside header scope.
  - Handle merged functionality (WorksheetBuilder responsibility).
  - Store permanent data.
  - Require instantiation.
  - Process data rows (StreamOperations responsibility).
  - Handle formula generation (FormulaGeneration responsibility).
  - Modify header structure after validation.
  - Access formula factory.
  - Initialize other components.
  - Set up component state.
  - Share validation responsibility.
  - Break existing validation interfaces.
  - Modify header structure or arrangement (DimensionsManager responsibility).
  - Add or remove columns (DimensionsManager responsibility).
  - Handle spacer columns (DimensionsManager responsibility).
  - Manage period summaries (DimensionsManager responsibility).

#### src/ui/headerUI.js
- **Purpose:** Provides UI elements for displaying header information.
- **Key Requirements:**
  - Initialize header UI components.
- **Do Not:**
  - 

#### src/ui/sheetUtils.js
- **Purpose:** Provides utility functions related to worksheet operations.
- **Key Requirements:**
  - Retrieve sheet headers.
  - Set up global event listeners and populate the sheet selector.
  - Convert cell addresses and Excel column names.
- **Do Not:**
  - 

#### src/ui/stateManager.js
- **Purpose:** Manages application state and user selections.
- **Key Requirements:**
  - Initialize state storage.
  - Provide methods to set, get, subscribe to, and clear state values.
  - Persist and load state as necessary.
- **Do Not:**
  - 

---

## Taskpane

#### src/taskpane/analyze.html
- **Purpose:** HTML layout for the analyze taskpane.
- **Key Requirements:** 
- **Do Not:**

#### src/taskpane/clean.html
- **Purpose:** HTML layout for the clean taskpane.
- **Key Requirements:** 
- **Do Not:**

#### src/taskpane/taskpane.css
- **Purpose:** Provides styles for the taskpane.
- **Key Requirements:** 
- **Do Not:**

#### src/taskpane/taskpane.html
- **Purpose:** Serves as the main HTML for the taskpane.
- **Key Requirements:** 
- **Do Not:**

#### src/taskpane/taskpane.js
- **Purpose:** Initializes and manages the taskpane.
- **Key Requirements:** 
- **Do Not:**

---

## Additional Files

#### src/commands/commands.html
- **Purpose:** Provides the user interface for command execution.
- **Key Requirements:**
  - Render command-related UI elements.
- **Do Not:**
  - Include business logic; keep presentation separate.

#### src/commands/commands.js
- **Purpose:** Contains the command logic (e.g., handling action events).
- **Key Requirements:**
  - Execute command actions based on events.
  - Invoke appropriate processing functions.
- **Do Not:**
  - Implement UI rendering logic.

#### project_docs/fileDirectory.md
- **Purpose:** Provides an overview of the project structure.
- **Key Requirements:** *(As defined in the document)*
- **Do Not:** *(As defined in the document)*

#### project_docs/fileRequirements.md
- **Purpose:** Details the purpose, key requirements, and instructions for each project file.
- **Key Requirements:** *(As defined in this document)*
- **Do Not:** *(As defined in this document)*

#### project_docs/mini_project_implementation_guidelines.md
- **Purpose:** Offers implementation guidelines for the mini project.
- **Key Requirements:** *(As defined in the document)*
- **Do Not:** *(As defined in the document)*

#### SECURITY.md
- **Purpose:** Outlines security guidelines and policies for the project.
- **Key Requirements:**
  - Define security policies and best practices.
- **Do Not:**
  - 

#### webpack.config.js
- **Purpose:** Configures Webpack for bundling the Office Add-in.
- **Key Requirements:**
  - Define entry points, output paths, and module rules.
  - Configure plugins for circular dependency detection, asset copying, HTML generation, polyfills, and development certificates.
  - Enable node externals where necessary.
- **Do Not:**
  - Modify core build logic without explicit instructions.