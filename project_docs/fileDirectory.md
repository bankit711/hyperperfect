# File Directory Overview

This file maps the entire project structure with inline comments for each module/file.

HyperPerfect6/
├── project_docs/
│   ├── fileDirectory.md                // This file (overview of the project structure)
│   ├── fileRequirements.md             // Provides file-specific requirements
│   ├── focusedSummaries.md             // Contains focused summaries on project components
│   └── mini_project_implementation_guidelines.md  // Implementation guidelines and best practices
├── src/
│   ├── commands/
│   │   ├── commands.html               // UI for commands
│   │   └── commands.js                 // Contains command logic (e.g., action(event))
│   ├── engines/
│   │   ├── formulaBuilders/
│   │   │   ├── abstractFormulaGenerator.js // Provides common caching, placeholder replacement, and metrics tracking for formula generation
│   │   │   ├── cleanStrategies.js      // Implements clean strategies (e.g., LetFormulaStrategy) for data cleaning operations
│   │   │   ├── formulaFactory.js       // Maps column types (e.g., DATE, DIMENSION) and sheet contexts (e.g., clean, analyze) to specific formula strategies
│   │   │   ├── formulaUtils.js         // Provides utility functions for formula builders, including conversion between column indexes and Excel column letters
│   │   │   ├── revenueStrategies.js    // Implements revenue formula strategies (monthly, quarterly, yearly, and since inception)
│   │   │   └── utilityStrategies.js    // Implements utility strategies for cohort start month, cancel month, spacer, and dimension data
│   │   ├── orchestration/
│   │   │   ├── formulaAnalyzeController.js // Orchestrates analysis operations, such as revenue analysis and pivot table generation
│   │   │   ├── formulaCleanController.js   // Coordinates the cleaning operation (data ingestion, processing, and transformation)
│   │   │   ├── orchestrateSheetOperation.js // Provides shared orchestration for both clean and analyze operations
│   │   │   └── quartersYears.js         // Generates fiscal quarter and year summary headers
│   │   └── worksheetBuilders/
│   │       ├── chunkProcessor.js        // Processes data in chunks to support efficient batch operations
│   │       ├── dataIngestionStream.js   // Loads and validates Excel data in a memory-efficient, streamed manner
│   │       ├── DimensionsManager.js     // Manages worksheet dimensions, column metadata, and header modifications with methods for range updates and worksheet structure management (Note: Has unused imports and parameters that should be addressed)
│   │       ├── dimensionsColumnProcessors.js     // Provides column processing utilities for organizing, generating, and merging columns in different phases (source, additional, period summaries) that are used by DimensionsManager
│   │       ├── streamOperations.js      // Provides streaming and batching functions
│   │       ├── styleOperations.js       // Manages Excel styling and conditional formatting
│   │       ├── worksheetBuilderFormulaManager.js // Applies formula strategies to worksheet ranges using batching and caching
│   │       └── worksheetBuilderInitialization.js // Sets up the target worksheet, initializes dimensions, and applies conditional formatting
│   ├── services/
│   │   ├── excel/
│   │   │   ├── dateOperations.js        // Handles Excel date conversions and formatting
│   │   │   └── xlsxOperations.js        // Handles XLSX file operations with xlsx-js-style
│   │   └── general/
│   │       ├── errorHandling.js         // Centralized error logging, display, and context management for robust error handling
│   │       ├── performanceMonitor.js    // Tracks performance metrics of operations
│   │       ├── processingConfig.js      // Sets parameters for batch sizes, caching, and operational limits
│   │       ├── progressTracker.js       // Tracks progress and metrics across operations
│   │       ├── types.js                 // Defines data types (e.g., COLUMN_TYPES) for the application
│   │       └── utilities.js             // Provides utility functions for taskpane UI operations
│   ├── taskpane/
│   │   ├── analyze.html                // HTML layout for the analyze taskpane
│   │   ├── clean.html                  // HTML layout for the clean taskpane
│   │   ├── taskpane.css                // Styles for the taskpane
│   │   ├── taskpane.html               // Main HTML for the taskpane
│   │   └── taskpane.js                 // Initializes and manages the taskpane
│   └── ui/
│       ├── analyze.js                 // Handles UI logic for analyze operations
│       ├── analyzeConfig.js           // Configuration for analyze UI components
│       ├── analyzeController.js       // Controller for the analyze UI, handling initialization and component registration
│       ├── cleanConfig.js             // Configuration for clean UI components
│       ├── cleanController.js         // Controller for the clean UI, handling initialization and component registration
│       ├── componentManager.js        // Manages UI component lifecycles
│       ├── eventHandlers.js           // Handles UI events for user interactions
│       ├── headerDetector.js          // Detects and validates header rows in Excel sheets
│       ├── headerUI.js                // Provides UI elements for displaying header information
│       ├── sheetUtils.js              // Utility functions related to worksheet operations
│       └── stateManager.js            // Central store for user selections and application state
├── SECURITY.md                       // Security guidelines and policies
└── webpack.config.js                 // Webpack configuration for bundling the add-in
