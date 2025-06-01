# Excel LLM Integration Add-in Project Plan

## Phase 1: Project Setup and Architecture

### Tasks:
1. Set up key files (placeholder files created in `src/ai/`) - **Done**
2. Maintain a file directory listing (`project_docs/ai-project/ai-related-file-directory.md`) - **Done**
3. Define core architectural components (via `project_docs/ai-project/aiFileRequirements.md`) - **Done**
4. Set up version control (Assumed)
5. Integrate `src/ai/` directory with build/linting configuration. - **Done**
7. Set up basic test file structure for AI components (if applicable). - **Done**
8. Add placeholders for AI-related environment variables (e.g., API keys, endpoints) in `development.env.*` and `production.env.*` files. - **Done**

### Key Files/Components to Create (in `src/ai/`):
- `ai.html`: Main UI interface for configuration
- `aiController.js`: Controller logic for taskpane functionality
- `aiFunctions.js`: Custom functions implementation
- `aiAuth.js`: Authentication handling logic
- `aiApi.js`: LLM API communication layer
- `aiStorage.js`: Settings and cache storage functionality
- `aiOperationsStateManager.js`: State management for AI operations
- `aiTypes.js`: Type definitions for AI features

### Acceptance Criteria Focus:
- Establish foundation for platform support (Excel Online, Windows, Mac)
- Set up structure for deployment options (centralized and side-loading)

## Phase 2: AI Taskpane UI Implementation

### Tasks:
1. Create basic HTML structure in `src/ai/ai.html` based on requirements (header, main, message box, progress indicator).
2. Add placeholder UI elements for AI configuration (auth selector, API key input, model selector, system prompt input) in `src/ai/ai.html`.
3. Implement the basic `initializeAIUI` function skeleton in `src/ai/aiController.js` (including component registration, error logging setup).
4. Set up basic event listeners for placeholder UI elements in `aiController.js`.
5. Ensure `ai.html` loads correctly within the add-in taskpane context.

### Key Files/Components:
- `src/ai/ai.html`: Structure and elements.
- `src/ai/aiController.js`: Initialization logic and event listener setup.

### Acceptance Criteria Focus:
- A functional, albeit non-interactive, taskpane UI for AI features is visible.
- Basic controller initialization completes without errors.
- UI structure matches the design of other taskpanes (like Analyze).

## Phase 3: Authentication Implementation

### Tasks:
1. Implement API key-based authentication (in `src/ai/aiAuth.js` and `src/ai/aiController.js`)
2. Implement SSO integration (using Microsoft Identity, likely in `src/ai/aiAuth.js`)
3. Create authentication UI components in `src/ai/ai.html` with manual selection between options
4. Implement secure key storage (in `src/ai/aiStorage.js`) with first 3-4 character display for identification

### Key Files/Components:
- Auth provider interfaces within `src/ai/aiAuth.js`
- UI components in `src/ai/ai.html` and logic in `src/ai/aiController.js`
- Integration with Office.context.document.settings via `src/ai/aiStorage.js`

### Acceptance Criteria Focus:
- Support both SSO and API key authentication with manual selection (1.1)
- Create user-friendly task pane interface for configuration (1.2)
- Implement secure storage using Office.context.document.settings API (2.1)
- Display first 3-4 characters of API keys for identification (2.2)

## Phase 4: Core Function Implementation

### Tasks:
1. Define `AI()` custom function signature in `src/ai/aiFunctions.js`.
2. Implement logic to handle parameters (`userPrompt`, `refreshLock`).
3. Implement refresh lock / control logic.
4. Call `aiApi.callLlmApi`.
5. Handle API response (`success`, `response`, `error`).
6. Register function implementation using `CustomFunctions.associate`.
7. **Verify/Implement Manifest Registration:** Ensure the function is declared in `manifest.xml` (likely via a referenced JSON metadata file like `functions.json`). This might involve creating/updating the JSON file or ensuring the build process generates it correctly.

### Key Files/Components:
- `src/ai/aiFunctions.js`
- `src/ai/aiApi.js` (Called by `aiFunctions.js`)
- `src/ai/aiTypes.js` (Constants like control states)
- `manifest.xml` / `functions.json` (Function declaration)
- `src/commands/commands.js` (Loads `aiFunctions.js` to register functions)
- `src/commands/commands.html` (Acts as the Custom Function runtime specified in manifest)

### Acceptance Criteria Focus:
- Function correctly calls LLM API based on control logic (5.1)

## Phase 5: Data Persistence and Security

### Tasks:
1. Implement persistent caching across sessions to preserve function outputs
2. Implement basic encryption for API keys
3. Set up HTTPS/TLS 1.2+ communication
4. Integrate with basic Office security context

### Key Components:
- Cache serialization/deserialization logic
- Settings encryption/decryption utilities
- API communication security implementation

### Acceptance Criteria Focus:
- Ensure function values persist across Excel sessions (4.3)
- Implement API key encryption when possible (2.2)
- Follow Microsoft's recommended security practices for add-ins (2.2)
- Implement basic integration with Office security contexts (3.2)

## Phase 6: Error Handling and User Experience

### Tasks:
1. Implement comprehensive error handling for API failures
2. Add timeout handling for API calls
3. Create user-friendly error messages
4. Add network connectivity detection

### Key Components:
- Error handling utilities
- Network status detection
- User-friendly notification system

### Acceptance Criteria Focus:
- Gracefully handle API failures with meaningful error messages (5.1)
- Implement timeout handling to prevent indefinite waiting (5.1)
- Detect and report network connectivity issues (5.1)

## Phase 7: Testing and Refinement

### Tasks:
1. Unit testing for all components
2. Integration testing across platforms (Online, Windows, Mac)
3. Performance testing
4. Security review

### Test Cases:
- Authentication flows
- Function calculation behavior with different control cell values
- State persistence across Excel sessions
- Error handling for various failure scenarios

### Acceptance Criteria Focus:
- Verify function across all required platforms (6.1)
- Confirm compatibility with Office 365 and Excel 2019+ (6.1)
- Test security boundaries and Office integration (3.2)

## Phase 8: Deployment Preparation

### Tasks:
1. Package add-in for distribution
2. Prepare for centralized deployment via Microsoft 365 admin center
3. Create side-loading instructions
4. Final testing in production-like environments

### Deliverables:
- Packaged add-in
- Deployment documentation
- User guide

### Acceptance Criteria Focus:
- Support for centralized deployment via Microsoft 365 admin center (6.2)
- Support for side-loading for testing purposes (6.2)

## Technical Architecture Overview

### Key Components:

1. **Task Pane Module**
   - Handles UI for configuration and authentication
   - Manages user interaction with settings

2. **Custom Functions Module**
   - Implements the AI() function
   - Manages calculation control logic
   - Handles function invocation

3. **Storage Module**
   - Manages persistent settings
   - Implements cache for function results
   - Handles state preservation across sessions

4. **Authentication Module**
   - Handles API key management
   - Implements SSO integration
   - Provides authentication state to other modules

5. **API Communication Module**
   - Manages secure communication with LLM endpoints
   - Implements timeout handling
   - Formats requests and processes responses

6. **Manifest & Metadata**
   - `manifest.xml`: Declares the add-in, permissions, UI elements, and points to custom function definitions (runtime page and metadata file).
   - `functions.json` (Potentially): A separate file referenced by the manifest, containing detailed metadata for all custom functions. This is often auto-generated by build tools based on JSDoc comments and `CustomFunctions.associate` calls.

7. **Runtime Environment**
   - `commands.html`: Specified in the manifest as the page to load the custom function JavaScript runtime.
   - `commands.js`: The entry point script for `commands.html`, responsible for loading and registering both ribbon commands (`Office.actions.associate`) and custom functions (`CustomFunctions.associate` via required files like `aiFunctions.js`).

## Technical Decisions

*   **Error Handling**: Utilize a centralized `ErrorService` for logging and displaying errors/messages consistently.
*   **Configuration Storage**: Leverage `Office.context.document.settings` for persisting user-specific AI configurations.
*   **Shared Constants**: Define shared keys and constant values related to AI features (e.g., Office setting keys) in `src/ai/aiConstants.js` to ensure consistency between modules (like `aiController.js` and `aiApi.js`) and improve maintainability.

### Future Enhancements