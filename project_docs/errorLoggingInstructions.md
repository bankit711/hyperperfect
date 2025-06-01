# Enhanced ErrorService Guide

## Quick Migration Steps

### 1. Register your component
```javascript
// Define component identifier for consistent logging
const componentId = "YourComponentName";

// Register logging configuration
ErrorService.registerLogging(componentId, {
  enabled: true,
  verbose: false // Change to true when debugging
});
```

### 2. Update log statements
```javascript

// After - standard logs
ErrorService.logInfo("Processing data", { itemCount: items.length }, componentId);

// After - verbose logs (only shown when verbose=true)
ErrorService.logInfo("Processing details", { items }, componentId, true);
```

## File-Level Registration Pattern

### Important: One Registration Per File

Register your component identifier **once** at the top of each file:

```javascript
// For regular modules
const componentId = "ModuleName";
ErrorService.registerLogging(componentId, { enabled: true, verbose: false });

// For class-based modules
class MyClass {
  static componentId = "MyClass";
  static { ErrorService.registerLogging(MyClass.componentId, { enabled: true, verbose: false }); }
}

// For files with multiple classes
const COMPONENT_IDS = { Class1: "Class1", Class2: "Class2" };
Object.values(COMPONENT_IDS).forEach(id => ErrorService.registerLogging(id, { enabled: true }));

class Class1 { static componentId = COMPONENT_IDS.Class1; }
class Class2 { static componentId = COMPONENT_IDS.Class2; }
```

Benefits:
- Consistent logging throughout the file
- Better performance (avoids redundant registrations)
- Easier to update logging settings

## Module Patterns

### IIFE Pattern (for modules like StateManager)
```javascript
const MyModule = (() => {
  // Define inside the closure for proper scope
  const componentId = "MyModule";
  ErrorService.registerLogging(componentId, { enabled: true, verbose: false });

  function someFunction() {
    ErrorService.logInfo("Function called", {}, componentId);
  }

  return { someFunction, componentId };
})();
```

### Class Pattern
```javascript
class DataProcessor {
  constructor() {
    this.componentId = "DataProcessor";
    ErrorService.registerLogging(this.componentId, { enabled: true });
  }

  process(data) {
    ErrorService.logInfo("Processing", { size: data.length }, this.componentId);
  }
}
```

## Best Practices

### 1. Error Context Structure
```javascript
// Good: Structured context with nested objects
ErrorService.logError("Operation failed", {
  operation: "dataImport",
  details: { inputSize: data.length, errors }
}, componentId);
```

### 2. Standard Error Context Pattern

All error logging must follow this structure:

```javascript
ErrorService.logError(
  "Clear message",
  {
    operation: "operation_name",  // e.g. initialization, data_processing
    details: {
      validation: {
        state: { initialized: false, validated: false },
        error: error?.message,
        errorType: error?.constructor?.name,
        phase: "specific_phase",  // e.g. validation, processing
        timestamp: Date.now(),
        // Operation-specific context
        field: "fieldName",
        received: value,
      },
    },
  },
  componentId
);
```

Required fields:
- `operation`: Consistent name across component
- `validation.state`: Current operation state
- `validation.phase`: Specific stage that failed
- `validation.timestamp`: Always include
- `validation.error/errorType`: For error tracking

This applies to `logError`, `logInfo`, and `createExcelError`.

### 4. Verbose vs. Non-Verbose Strategy
- **Non-verbose (always visible)**: Operation boundaries, key state changes
  ```javascript
  ErrorService.logInfo("Starting import", { source, count }, componentId);
  ```

- **Verbose (debugging only)**: Implementation details, intermediate steps
  ```javascript
  ErrorService.logInfo("Validating schema", { record }, componentId, true);
  ```

### 3. Preventing Log Deduplication
```javascript
// Add unique identifiers to prevent deduplication in loops
ErrorService.logInfo("Processing item", { 
  index, itemId: item.id, timestamp: Date.now() 
}, componentId);
```

### 4. Dynamic Logging Control
```javascript
// Store the config to modify settings at runtime
const LOGGING = ErrorService.registerLogging(componentId, {
  enabled: true, verbose: false
});

function enableDebugMode() {
  LOGGING.verbose = true;
}
```

## Common Patterns

### Display Messages
```javascript
ErrorService.displayError("An error occurred", "Operation", error);
ErrorService.displayInfo("Operation complete", "Main process");
```

### Error Handling
```javascript
throw ErrorService.createExcelError("INVALID_DATA", "Invalid format", { 
  dataType, expected: "array" 
});

ErrorService.handleException(error, componentId, { context }, true);
```

### Debugging with Verbose Logs
```javascript
// Update registration to enable verbose logging during debugging
ErrorService.registerLogging(componentId, {
  enabled: true,
  verbose: true,  // Show all verbose logs
  flattenConfig: {
    enabled: true, // Flatten objects for better visibility
    maxDepth: 4    // Show deeper object nesting
  }
});
```

## Key Principles

1. **Component Registration**: Place componentId in the appropriate scope and register once per file
2. **Log Levels**: Operational logs as non-verbose, details as verbose
3. **Context Structure**: Use nested objects for better organization
4. **Deduplication**: Add unique identifiers in loops when needed
5. **Performance**: Avoid expensive operations in log context objects

## Replace All Console Methods

**Required**: Replace all `console.log` and `console.error` calls with ErrorService methods:

```javascript
// After
ErrorService.logInfo("Processing data", { data }, componentId);
ErrorService.logError("Operation failed", { error }, componentId);
```

Benefits:
- Consistent logging format
- Centralized error handling
- Better debugging with context
- Ability to enable/disable logs by component
