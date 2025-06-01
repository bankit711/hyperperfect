# AI-Related File Directory

This file provides an overview of files specifically relevant to the AI features being developed.

HyperPerfect6/
├── src/
│   ├── ai/                          // Directory for all AI-related code
│   │   ├── aiController.js          // Controller logic for AI taskpane functionality (New)
│   │   ├── aiApi.js                 // LLM API communication layey
│   │   ├── aiAuth.js                // Authentication handling logic for AI services (New)
│   │   ├── aiConstants.js           // Stores shared constant values specific to AI features, notably the `SETTINGS_KEYS` object used for accessing AI configuration stored in `Office.context.document.settings`. This ensures consistency between modules like `aiController` and `aiApi`.
│   │   ├── aiFunctions.js           // Custom functions *implementation* logic for AI features (e.g., =HYPERPERFECT.AI() logic)
│   │   ├── aiOperationsStateManager.js // Manages state specific to AI operations
│   │   ├── aiStorage.js             // Settings and cache storage functionality for AI (New)
│   │   └── aiTypes.js               // Defines types and constants specific to AI features
│   ├── commands/
│   │   ├── commands.html            // HTML page acting as runtime for ribbon commands (loaded invisibly)
│   │   └── commands.js              // JS logic executed by ribbon commands
│   ├── functions/                 // Directory for custom functions runtime
│   │   ├── functions.html           // HTML page acting as runtime for all custom functions (loaded invisibly by Excel)
│   │   └── functions.js             // JS entry point for custom functions; registers functions (e.g., CustomFunctions.associate)
│   ├── services/
│   │   └── general/
│   │       ├── errorHandling.js       // Centralized error handling and reporting service
│   │       └── utilities.js           // General utility functions used across the application
│   ├── taskpane/
│   │   ├── ai.html                  // HTML structure for the AI feature's taskpane UI (New)
│   │   └── taskpane.css             // Styles for the taskpane, potentially including AI-related UI elements
│   └── ui/
│       ├── componentManager.js      // Manages UI component lifecycles, potentially including AI components
│       ├── eventHandlers.js         // Handles UI events, potentially including AI-triggered events
│       └── stateManager.js          // Central store for user selections and application state, potentially including AI state
├── manifest.xml                     // Production Manifest File
├── manifest.dev.xml                 // Development Manifest File (Focus for changes)
├── package.json
├── webpack.config.js                // Build configuration
├── functions.json                   // Custom Function JSON Metadata file - *Generated* by build process (e.g., `npm run build`), required by Excel.
└── project_docs/
    └── ai-project/
        ├── ai-project.md            // Main documentation for the AI project initiative
        ├── ai-related-file-directory.md // This file (overview of AI-related files)
        ├── aiFileRequirements.md    // Purpose and requirements for each AI file
        ├── aiPhaseTwoPlan.md        // Plan details for Phase 2
        ├── aiPhaseThreePlan.md      // Plan details for Phase 3
        └── aiPhaseFourPlan.md       // Plan details for Phase 4
