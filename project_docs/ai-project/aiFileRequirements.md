# AI File Requirements and Instructions

This file provides the purpose, key requirements and "do not" instructions for each AI-related file in the project.

## Index

- [AI Taskpane HTML (`ai.html`)](#src/taskpane/ai.html)
- [AI Taskpane Controller (`aiController.js`)](#src/ai/aiController.js)
- [AI API Handler (`aiApi.js`)](#src/ai/aiApi.js)
- [AI Authentication Handler (`aiAuth.js`)](#src/ai/aiAuth.js)
- [AI Storage Handler (`aiStorage.js`)](#src/ai/aiStorage.js)
- [AI Operations State Manager (`aiOperationsStateManager.js`)](#src/ai/aiOperationsStateManager.js)
- [AI Types Definition (`aiTypes.js`)](#src/ai/aiTypes.js)
- [AI Custom Functions Implementation (`aiFunctions.js`)](#src/ai/aiFunctions.js)
- [Custom Functions Runtime HTML (`functions.html`)](#src/functions/functions.html)
- [Custom Functions Runtime JS (`functions.js`)](#src/functions/functions.js)

---

## AI Taskpane UI

### src/taskpane/ai.html
- **Purpose:** Defines the HTML structure for the AI feature's taskpane interface, primarily used for configuration and interaction.
- **Key Requirements:**
  Follow standard page structure conventions (e.g., like analyze.html):
    - Include standard HTML head elements (meta, title, Office JS, CSS links - Fluent UI, Google Fonts, `taskpane.css`).
    - Use `loading`/`ready` body classes for initialization states.
    - Implement the standard header (`<header class="header">`) with navigation (`nav-menu`) if applicable to AI features.
    - Include the main content area (`<main class="ms-font-m ms-welcome">`).
    - Implement the standard message box structure (`<div class="message-box">`) for feedback.
    - Include a page intro section (`<div class="page-intro">`) with title and description.
    - Provide necessary input fields/dropdowns/buttons for AI configuration and actions (e.g., API key input, model selection, prompt input, run button) within the main content area.
    - Include the standard hidden progress indicator (`<div id="progress-container">`).
  Display status messages and feedback from AI operations triggered via the ErrorService.
  Allow configuration of AI settings accessible through the taskpane.
- **Do Not:**
  Contain complex JavaScript logic (delegate to `aiController.js`).
  Make direct API calls.

### src/ai/aiController.js
- **Purpose:** Manages the logic and state for the AI features within the Excel taskpane ('ai.html'). Handles user interactions, coordinates with AI services (`aiApi.js`, `aiAuth.js`, `aiStorage.js`), and updates the taskpane UI.
- **Key Requirements:**
  Implement an `initializeAIUI` function (similar to `analyzeController.js`):
    - Register the component with `ErrorService`.
    - Check if already initialized (using `StateManager` or `aiOperationsStateManager`).
    - Register UI components (inputs, buttons, dropdowns) using a manager or configuration object.
    - Set up event listeners for UI elements (clicks, changes).
    - Coordinate with `aiAuth.js` to determine initial auth state.
    - Coordinate with `aiStorage.js` to load saved settings (API key, model preference).
    - Populate UI elements (e.g., dropdowns) with options.
    - Set initial UI state based on auth status and loaded settings.
    - Use `ErrorService` for logging throughout initialization.
  Handle events from UI elements:
    - Button clicks (e.g., Run AI, Save Settings, Authenticate).
    - Input changes (e.g., API Key, Prompt).
    - Dropdown selections (e.g., Auth Method, Model).
  Coordinate calls to other AI modules:
    - `aiAuth.js` for authentication actions (login, validate key).
    - `aiApi.js` to initiate API calls to the LLM.
    - `aiStorage.js` to save/retrieve settings.
    - `aiOperationsStateManager` to track AI task progress.
  Update `ai.html` based on state changes and responses:
    - Display status/error messages in the message box.
    - Show/hide/update the progress indicator.
    - Enable/disable UI elements based on context (e.g., auth status, task running).
  Use `StateManager` or `aiOperationsStateManager` for managing relevant UI or operation state.
  Use `ErrorService` for all logging, following project guidelines (see `../errorLoggingInstructions.md`).
- **Do Not:**
  Embed HTML structure (should be in `ai.html`).
  Contain core authentication or API communication logic (should be delegated to `aiAuth.js` and `aiApi.js`).
  Directly manipulate worksheet data unless absolutely necessary (prefer coordinating with `aiFunctions.js` or dedicated data modules).

---

## AI Services

### src/ai/aiApi.js
- **Purpose:** Handles all communication with the live LLM API endpoint for AI features.
- **Key Requirements:**
  - Must implement a function to call a live LLM API endpoint using parameters provided by `aiFunctions.js`.
  - Handle all API errors (network, HTTP, invalid response) using try/catch and log via `ErrorService`.
  - Implement a request timeout (e.g., 10 seconds) to avoid hanging.
  - Validate required inputs (endpoint, API key, prompt) before making the request.
  - Read the endpoint and API key from environment variables or a settings file (not hardcoded).
  - Format the API response for Excel (string, number, or 2D array).
  - Gracefully handle and log unexpected API responses.
- **Do Not:**
  - Contain UI logic or Excel-specific formatting logic.
  - Hardcode secrets or endpoints in the source.

### src/ai/aiAuth.js
- **Purpose:** Manages authentication and authorization for accessing AI services. Handles API key storage/retrieval (securely, using `aiStorage.js`), potential SSO integration, and adds necessary auth headers to API calls made by `aiApi.js`.
- **Key Requirements:**
  Implement logic for API key validation/retrieval (potentially interacting with `aiStorage.js`).
  Implement logic for initiating and handling SSO flows (e.g., using MSAL).
  Provide a consistent interface for `aiApi.js` to get necessary auth tokens/headers.
  Securely handle sensitive credentials.
  Use `ErrorService` for logging authentication events and errors (see `../errorLoggingInstructions.md`).
- **Do Not:**
  - Store credentials persistently in plain text (use secure storage like `Office.context.document.settings` via `aiStorage.js`).
  - Make direct API calls to the LLM (should be done by `aiApi.js`).

### src/ai/aiStorage.js
- **Purpose:** Provides mechanisms for securely storing and retrieving AI-related user settings and potentially cached data (e.g., API keys, user preferences, recent prompts).
- **Key Requirements:**
  Use secure storage mechanisms (e.g., `Office.context.document.settings`).
  Provide methods to set, get, and delete specific settings/cache items.
  Handle potential storage limits or errors.
  Mask sensitive data like API keys when retrieving for display purposes.
- **Do Not:**
  - Implement authentication logic (delegate to `aiAuth.js`).
  - Contain UI logic.

### src/ai/aiOperationsStateManager.js
- **Purpose:** Manages transient state related to ongoing AI operations (e.g., progress, status, errors, context), separate from persistent settings or general UI state. Follows the pattern established by `src/services/general/operationStateManager.js`.
- **Key Requirements:**
  Implement using the IIFE pattern (similar to `operationStateManager.js`).
  Register the component with `ErrorService`.
  Define `aiOperationDefaults` for initial AI state values (e.g., `currentOperationStatus: 'idle'`, `currentOperationProgress: 0`, `lastErrorMessage: null`, `currentContextId: null`).
  Maintain a private `state` object initialized with defaults.
  Implement `set(key, value)`: Updates a specific AI state key, validates the key, logs changes, and notifies subscribers.
  Implement `get(key, shouldLog = true)`: Retrieves a specific AI state value, validates the key, and logs errors if invalid (unless `shouldLog` is false).
  Implement `subscribe(key, callback)`: Allows other modules to listen for changes to specific AI state keys, returning an unsubscribe function.
  Implement `reset()`: Resets the AI operation state back to the defined defaults.
  Use `ErrorService` for all internal logging (see `../errorLoggingInstructions.md`).
- **Do Not:**
  - Manage general UI state (use the main `stateManager.js`).
  - Persist user settings (use `aiStorage.js`).

### src/ai/aiTypes.js
- **Purpose:** Defines shared constants, enums, and potentially TypeScript interfaces/types specific to the AI features.
- **Key Requirements:**
  Define constants for API endpoints, model names, etc.
  Define enums for AI operation states, auth types, etc.
  (If using TypeScript) Define interfaces for API request/response structures, configuration objects.
- **Do Not:**
  - Contain executable logic.

---

## AI Custom Functions

### src/ai/aiFunctions.js
- **Purpose:** Implements the Excel custom function logic for AI features (e.g., =HYPERPERFECT.AI()).
- **Key Requirements:**
  - Validate all required parameters before calling `aiApi.js`.
  - Surface API errors and timeouts as clear Excel errors (e.g., `#API_ERROR`).
  - Ensure all outputs are Excel-compatible types.
  - Must implement a function to call `aiApi.js` using parameters provided by the Excel function.
  - Handle all API errors (network, HTTP, invalid response) using try/catch and log via `ErrorService`.
  - Implement a request timeout (e.g., 10 seconds) to avoid hanging.
  - Validate required inputs (endpoint, API key, prompt) before making the request.
  - Read the endpoint and API key from environment variables or a settings file (not hardcoded).
  - Format the API response for Excel (string, number, or 2D array).
  - Gracefully handle and log unexpected API responses.
- **Do Not:**
  - Call external APIs directly (always use `aiApi.js`).
  - Expose raw error details to the user.

### src/functions/functions.html
- **Purpose:** Provides the minimal HTML page required by Excel to host the JavaScript runtime for *all* custom functions.
- **Key Requirements:**
  Include the Office JavaScript API script (`<script src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>`).
  Include the Webpack-generated JavaScript bundle for the functions runtime (e.g., `<script type="text/javascript" src="functions.js"></script>`).
  Contain no visible UI elements; it runs invisibly in the background.
- **Do Not:**
  - Contain any UI content, styles, or logic beyond loading the necessary scripts.

### src/functions/functions.js
- **Purpose:** Serves as the main JavaScript entry point for the custom functions runtime. It imports function implementations and registers them with Excel.
- **Key Requirements:**
  Be the entry point defined in `webpack.config.js` for the `functions` chunk.
  Import necessary function implementations (e.g., `require('@src/ai/aiFunctions.js')`).
  Use `Office.onReady()` to ensure the Office context is loaded.
  Call `CustomFunctions.associate("FUNCTION_NAME", functionImplementation)` for each custom function within `Office.onReady()`.
  The `FUNCTION_NAME` here corresponds to the name used after the namespace in Excel (e.g., `AI` for `=HYPERPERFECT.AI`).
  Implement necessary setup or initialization for the functions runtime environment if required.
  Use `ErrorService` for logging registration process and errors.
- **Do Not:**
  - Contain the actual complex logic of the custom functions (keep that in implementation files like `aiFunctions.js`).
  - Contain UI logic.

---

**Configuration Note:**
- The API endpoint and key must be set via environment variables or a config/settings file, never hardcoded in the codebase.
