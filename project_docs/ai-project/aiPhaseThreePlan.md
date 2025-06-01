# AI Project - Phase 3 Implementation Plan (Core Logic & Interaction)

## Goal

The goal of this phase is to implement the core functionality for the AI features: enabling other functions within the add-in to send a programmatically generated prompt and the user's configuration settings (including the System Prompt from the UI) to the configured Language Model (LLM) API, and **returning the response** to the calling function. This involves enhancing the AI API layer (`aiApi.js`) to handle API communication triggered externally.

## Acceptance Criteria

Building upon the configuration UI from Phase 2:

1.  **AI API Module Enhancement**: The existing `src/ai/aiApi.js` module is enhanced to handle the logic for communicating with the LLM API based on programmatic calls.
2.  **Configuration Retrieval**: The `aiApi.js` correctly retrieves the saved configuration (API Key, Endpoint, Model, Temp, Max Tokens, System Prompt from UI) using `Office.context.document.settings` when called.
3.  **API Call Logic**: `aiApi.js` contains an exported function that accepts a user prompt string, constructs, and sends a request to the configured LLM API endpoint, including the provided user prompt, the configured system prompt, model parameters, and necessary authentication (API Key).
4.  **Programmatic Integration**: Other parts of the application (e.g., custom functions) can import and call the designated function in `aiApi.js`, passing the user prompt.
5.  **Response Handling**: The LLM response string is successfully received and **returned** by the `aiApi.js` function to the caller.
6.  **Error Handling**: Basic error handling is implemented for API calls (e.g., network errors, invalid API key, API errors). Errors are **returned** to the caller (e.g., by throwing an exception or returning a specific error object) and potentially displayed in the standard message box (`#error-message`) in `ai.html` if the AI taskpane happens to be open.
7.  **Logging**: Interactions and errors are logged via `ErrorService`, respecting configured verbosity settings.

## Affected Files

*   **`src/taskpane/ai.html`**: (No significant changes needed for Phase 3 core logic, retains config UI and standard message box).
*   **`src/ai/aiController.js`**: (No significant changes needed for Phase 3 core logic, retains config saving/loading).
*   **`src/ai/aiApi.js`**: (Modify/Enhance) Implement exported function for API calls, handle configuration retrieval, request formatting, response/error returning, logging.
*   **`src/services/general/errorHandling.js`**: (Use) For logging errors and potentially verbose request/response details.
*   **(Calling Modules e.g., Custom Functions)**: (Modify) Import and call the new function in `aiApi.js`.

## Core Tools/Dependencies

*   **JavaScript**: Core logic.
*   **Office JavaScript API**: For settings retrieval.
*   **Fetch API or similar HTTP client**: For making requests to the LLM API.
*   **Existing Project Structure**: Utilize established patterns for services, controllers, and UI.

## Implementation Steps (High-Level)

1.  **Define `aiApi.js` Interface**: Define the exact signature for the exported function in `aiApi.js` (e.g., `callLLM(userPrompt)`) and how it will return success (response string) or failure (error object/exception).
2.  **Implement Configuration Loading in `aiApi.js`**: Ensure the function reads the latest settings (API Key, Endpoint, System Prompt, etc.) from `Office.context.document.settings` each time it's called.
3.  **Implement API Call Function**: Build the core logic in the exported function to:
    *   Format the API request (headers, body including user prompt, system prompt, parameters).
    *   Use `fetch` (or similar) to send the request.
    *   Handle the asynchronous response.
    *   Parse the successful response to extract the text content.
    *   Implement robust error handling for network issues and API errors.
    *   Add `ErrorService` logging.
4.  **Return Value**: Ensure the function returns the parsed response string on success or throws/returns an error object on failure.
5.  **Integrate Caller**: Modify an example calling module (e.g., a test custom function) to import and call the `aiApi.js` function, passing a prompt and handling the returned result or error.
6.  **Test**: Test the end-to-end flow with valid and invalid configurations/prompts, verifying correct return values and error handling.
