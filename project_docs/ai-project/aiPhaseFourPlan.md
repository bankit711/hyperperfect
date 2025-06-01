# Phase 4: Custom Function Implementation

## Goal
Implement the core `AI()` custom function *logic* in `src/ai/aiFunctions.js`, set up the dedicated custom function runtime (`src/functions/functions.html`, `src/functions/functions.js`), and register the function with Excel using `CustomFunctions.associate` within the runtime.

## Key Files
- `src/ai/aiFunctions.js` (Implements the function logic)
- `src/functions/functions.html` (Provides the runtime host page)
- `src/functions/functions.js` (Runtime entry point; performs registration)
- `manifest.xml` / `manifest.dev.xml` (Declares the function file and metadata)
- `webpack.config.js` (Configures the `functions` entry point and HTML generation)

## Detailed Tasks

1.  **Implement `AI()` Function Logic (`src/ai/aiFunctions.js`):**
    *   Include necessary `require` statements (e.g., `aiApi`, `ErrorService`, `aiTypes`).
    *   Register the component with `ErrorService` (`const componentId = "AI_Function";`).
    *   Define the `async function AI(...)` signature, accepting parameters like `userPrompt`, `model`, `max_tokens`, etc.
    *   Implement core logic: parse arguments, call `aiApi.callLlmApi`, handle the response (`{ success, response, error }`), format the result for Excel (string or 2D array), and handle errors.
    *   Implement any control logic if needed (e.g., based on a `refreshLock` parameter).
    *   Ensure the function is exported using `module.exports = { AI };`.
    *   *Do not* call `CustomFunctions.associate` here.

2.  **Create Custom Function Runtime Host (`src/functions/functions.html`):**
    *   Create a minimal HTML file.
    *   Include the Office JS library: `<script src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>`.
    *   Ensure Webpack will inject the runtime script (e.g., `<script type="text/javascript" src="functions.js"></script>`).
    *   Keep the body empty or minimal; this page is not visible to the user.

3.  **Implement Custom Function Runtime & Registration (`src/functions/functions.js`):**
    *   Register the component with `ErrorService` (`const componentId = "CustomFunctionsRuntime";`).
    *   Import the function implementation: `const { AI } = require('@src/ai/aiFunctions.js');`.
    *   Implement the `Office.onReady(info => { ... });` handler.
    *   Inside `Office.onReady`, call `CustomFunctions.associate("AI", AI);` within a `try...catch` block.
    *   Log success or failure of registration using `ErrorService`.

4.  **Configure Webpack (`webpack.config.js`):**
    *   Define a new entry point: `functions: './src/functions/functions.js'`. 
    *   Add an `HtmlWebpackPlugin` instance to generate `functions.html` from the template and include the `functions` (and `polyfill`) chunk(s).
    *   Ensure necessary loaders (e.g., babel-loader) apply to this entry point.
    *   Add `functions.html` to `devServer` rewrites if necessary.

5.  **Update Manifest (`manifest.dev.xml` / `manifest.xml`):**
    *   Add the `<FunctionFile resid="Functions.Url" />` tag within the `<Host xsi:type="Workbook">` section.
    *   Add the `<ExtensionPoint xsi:type="CustomFunctions">` section, specifying the `Page`, `Script` (both pointing to `Functions.Url`), `Metadata` (pointing to `Functions.Metadata.Url`), and `Namespace` (e.g., `Functions.Namespace`).
    *   Define the corresponding `<bt:Url>` resources (`Functions.Url`, `Functions.Metadata.Url`) and `<bt:String>` resource (`Functions.Namespace`) in the `<Resources>` section. `Functions.Url` should point to `https://localhost:[port]/functions.html` (dev) or the production URL. `Functions.Metadata.Url` should point to `https://localhost:[port]/functions.json`.

6.  **Generate Metadata (`functions.json`):**
    *   Ensure the build process (likely via `webpack-custom-functions-metadata-plugin` configured in `webpack.config.js`) generates the `functions.json` file based on JSDoc comments in `src/ai/aiFunctions.js`.
    *   Verify the generated JSON contains the correct metadata for the `AI` function.

7.  **Implement a real API call to a single live LLM endpoint in `aiApi.js` and wire it through the `AI()` function logic. Use a simple, hardcoded endpoint and API key (from config or environment) for initial connectivity.**

8.  **Add basic error handling and logging for the API call in `aiApi.js` (using `ErrorService`), including a timeout and input validation.**

9.  **Format the API response for Excel and handle unexpected responses gracefully.**

10. **Allow the API endpoint and key to be configured via environment variable or settings file.**

## Integration Points

*   **`aiApi.js`:** Called by `aiFunctions.js` to perform the core LLM interaction.
*   **`aiTypes.js`:** Potentially used by `aiFunctions.js` for constants or enums.
*   **`ErrorService`:** Used for logging in both `aiFunctions.js` and `functions.js`.
*   **`functions.js`:** Imports (`require`) the `AI` function implementation from `aiFunctions.js` and calls `CustomFunctions.associate` to register it with Excel during the runtime initialization.

## Key Considerations

*   **Asynchronous Handling:** Custom function *logic* (`aiFunctions.js`) interacting with external services must be asynchronous (`async`/`await`).
*   **Return Values:** The function logic in `aiFunctions.js` must return values Excel understands (strings, numbers, booleans, errors, or 2D arrays).
*   **Error Propagation:** Ensure errors from the API call (`result.error`) are appropriately surfaced to the user in the cell from `aiFunctions.js`.
*   **Control Logic Robustness:** Handle various input parameter states gracefully within `aiFunctions.js`.
*   **Manifest/Metadata:** The function *must* be declared in the `manifest.xml` (referencing `functions.html` and `functions.json`). The `CustomFunctions.associate` call in `functions.js` links the code implementation to this manifest declaration.
*   **Separate Runtimes:** Understand that the taskpane (`taskpane.js`) and custom functions (`functions.js`) run in *separate* JavaScript environments.

## Acceptance Criteria

*   The `AI()` function is available (`=HYPERPERFECT.AI(...)`) and callable from an Excel cell (assuming namespace is `HYPERPERFECT`).
*   Providing valid parameters to `=HYPERPERFECT.AI(...)` triggers the logic in `aiFunctions.js`, including a call to the LLM, and returns the response to the cell.
*   The registration logic in `functions.js` executes successfully upon Excel loading the custom function runtime.
*   Errors encountered during the API call are returned as meaningful error values in the cell.
*   Function execution, registration, and errors are logged via `ErrorService` in the respective files.
*   The manifest correctly points to `functions.html` and `functions.json`.
*   The build process correctly generates `functions.html`, `functions.js`, and `functions.json`.
*   The `AI()` function successfully connects to a real LLM API and returns a live response to Excel.
*   Errors from the live API call are surfaced as meaningful Excel cell errors.
*   API errors and timeouts are logged and surfaced as clear Excel errors.
*   Missing or invalid inputs result in user-friendly Excel errors.
*   The API endpoint and key can be configured without code changes.
