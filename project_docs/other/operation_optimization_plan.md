# Clean Operation Performance Optimization Plan

## Overview
This document outlines a step-by-step plan to optimize the performance of the clean operation, particularly when dealing with large datasets. The optimizations will be implemented sequentially, with each step building upon the previous one.

## Optimization #1: Increase Batch Sizes for Formula Processing

### Problem Statement
The clean operation is currently slow when processing large datasets (e.g., 3,289 rows and 78 columns) because:
- Formula generation happens in small batches (5 columns at a time)
- Each batch requires Excel API calls and context.sync() operations
- The current column group size is too small for efficient processing

### Implementation Plan

#### Step 1: Update Processing Configuration
Modify the `processingConfig.js` file to increase batch sizes for formula processing:
- Increase `COLUMN_GROUP_THRESHOLDS.DEFAULT_SIZE` from 5 to 15
- Increase `FORMULA_BATCH` and `FORMULA_ROWS` from 10,000 to 20,000
- Adjust `SYNC_GROUPS` to reduce the frequency of context.sync() calls

#### Step 2: Enhance ChunkExcelWriter
Update the ChunkExcelWriter class to:
- Use larger batch sizes for formula processing
- Optimize column group processing
- Reduce context.sync() calls by batching more operations

#### Step 3: Add Performance Monitoring
Implement logging to track performance improvements:
- Log batch processing times
- Track the number of Excel API calls
- Measure overall operation time

### Expected Outcomes
- Reduced processing time for the clean operation
- Fewer Excel API calls and context.sync() operations
- Improved user experience with faster operation completion

## Optimization #2: Enhance Formula Template Creation and Error Handling

### Problem Statement
Waterfall operations and other complex formula generations are failing due to:
- Overly strict property validation in formula template creation
- Missing column references in strategy classes
- Inefficient handling of special strategy types (Dimension, Spacer)
- Insufficient error diagnostics for troubleshooting

### Implementation Plan

#### Step 1: Implement Strategy-Specific Property Validation
Update the `_batchCreateFormulaTemplates` method in ChunkExcelWriter to:
- Add targeted validation for different strategy types:
  - For `QuarterlyByPeriodStrategy` and `YearlyByPeriodStrategy`: Check for `firstColumnLetter` and `lastColumnLetter`
  - For `WaterfallMonthStrategy`: Verify the presence of `sourceColumnLetter`
- Skip formula creation for strategies that don't need it (DIMENSION, SPACER)
- Improve parameter passing to support different strategy implementations

#### Step 2: Enhance Diagnostic Logging
Add comprehensive logging throughout the formula generation process:
- Log column properties before formula creation
- Track successful template creation with template length information
- Capture error stacks when template creation fails
- Log available columns from the dimensions manager when required properties are missing

#### Step 3: Optimize Strategy Classes
Enhance strategy classes with better error handling and diagnostics:
- Add detailed logging in `WaterfallMonthStrategy.createBulkFormulasByColumn`
- Improve error reporting for missing column references
- Ensure consistent parameter handling across all strategy implementations

### Expected Outcomes
- Successful formula template creation for all strategy types
- More informative error messages for troubleshooting
- Reduced processing time by skipping unnecessary formula creation
- Better reliability for waterfall and other complex operations

## Optimization #3: Implement Range Operation Optimization

### Problem Statement
Excel operations on large ranges are inefficient because:
- Large ranges require excessive memory
- Single operations on large ranges can cause Excel to become unresponsive
- Too many context.sync() calls slow down processing

### Implementation Plan

#### Step 1: Create Range Operation Optimization Method
Implement the `_optimizeRangeOperation` method in ChunkExcelWriter to:
- Break large operations into smaller chunks based on configurable parameters
- Process data in 2D arrays for better performance
- Add conditional syncing to minimize API calls

#### Step 2: Add Memory Optimization
Implement memory management techniques:
- Add cache clearing based on size thresholds
- Implement garbage collection hints during long operations
- Use sparse arrays for datasets with many empty cells

#### Step 3: Integrate with Existing Methods
Update key methods to use the optimized range operations:
- Modify `writeFormulasBatch` to use optimized range operations
- Update `applyFormatting` to handle large ranges efficiently
- Enhance `writeValuesToRange` for better performance with large datasets

### Expected Outcomes
- Significantly reduced memory usage during large operations
- Better Excel responsiveness during processing
- Faster overall operation completion times
- Ability to handle much larger datasets without errors

## Optimization #4: Excel Performance Optimization with Event Handling

### Problem Statement
Excel operations performance is suboptimal because:
- Excel recalculates and updates the screen during batch operations
- Events are triggered repeatedly during data processing
- Repeated calls to suspend/resume functions create overhead
- Batch processing parameters are not optimized for different dataset sizes

### Implementation Plan

#### Step 1: Enhance Excel Update Suspension
Improve the `suspendExcelUpdates` and `resumeExcelUpdates` methods in XLSXOperations:
- Add tracking to prevent redundant calls to suspend/resume methods
- Properly store and restore Excel calculation mode and events settings
- Implement adaptive calculation type based on workbook size
- Add comprehensive logging for performance diagnostics

#### Step 2: Optimize Batch Processing Configuration
Update the `processingConfig.js` file to optimize batch processing parameters:
- Adjust column group sizes to avoid Excel API payload limits
- Reduce formula batch sizes to prevent excessive formula processing
- Configure sync frequency for balanced performance
- Add explicit Excel API configuration parameters:
  - MAX_PAYLOAD_SIZE: 4MB limit for Excel API calls
  - MAX_CELLS_PER_BATCH: 50,000 cells per batch
  - AVOID_REPEATED_SUSPENDS: Prevent redundant suspend calls

#### Step 3: Enhance ChunkExcelWriter
Update the ChunkExcelWriter class to better handle Excel performance optimizations:
- Add conditional Excel update suspension based on chunk metadata
- Implement checks to avoid redundant suspend/resume calls
- Ensure proper cleanup of Excel settings even when errors occur
- Add performance tracking metrics

#### Step 4: Optimize Orchestration
Enhance the orchestrateSheetOperation function to ensure consistent Excel performance optimization:
- Add optimizeExcelPerformance flag to chunk metadata
- Ensure proper propagation of performance settings through the processing pipeline
- Update delegateChunk method to handle performance optimization flags

### Expected Outcomes
- Significantly improved performance for large dataset operations
- Reduced Excel API calls and context.sync() operations
- Elimination of screen flickering during batch operations
- More consistent and reliable Excel behavior during intensive operations
- Better error handling and recovery when operations fail

## Future Optimizations
1. **Implement progressive loading** - Load and process data in stages for very large datasets
2. **Add worker thread processing** - Move intensive calculations off the main thread
3. **Implement data compression** - Reduce memory footprint for large datasets

## Testing Strategy
1. Test with a small dataset to verify functionality
2. Test with a medium dataset to measure performance improvement
3. Test with a large dataset (3,000+ rows) to validate scalability
4. Test edge cases with missing or invalid column references
5. Benchmark performance improvements against baseline metrics

//javascript

code:

"use strict";

const { ErrorService } = require("@src/services/general/errorHandling");
const { PROCESSING_CONFIG } = require("@src/services/general/processingConfig");
const { StyleOperations } = require("@src/engines/worksheetBuilders/styleOperations");
const { OPERATION_TYPES, COLUMN_TYPES } = require("@src/services/general/types");
const { getExcelColumnLetterZeroBased } = require("@src/services/general/utilities");

// Register component logging (set verbose to false by default)
const componentId = "ChunkExcelWriter";
ErrorService.registerLogging(componentId, {
  enabled: true,
  verbose: false,
});

/**
 * ChunkExcelWriter encapsulates Excel-specific operations such as writing chunk data,
 * applying styles, and performing formula transformations.
 */
class ChunkExcelWriter {
  static componentId = componentId;

  constructor(options) {
    this.worksheet = options.worksheet;
    this.worksheetName = options.worksheetName;
    this.dimensions = options.dimensions;
    this.options = options.options;
    this.sheetContext = options.sheetContext;
    this.formulaCache = options.formulaCache;
    this.rowCounter = options.rowCounter || 0;
    this.processedChunks = options.processedChunks || 0;
    this.config = {
      batchSizes: {
        default: PROCESSING_CONFIG.CHUNK_SIZES.DEFAULT,
        columnGroup: PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP,
        style: PROCESSING_CONFIG.STYLE_CACHE.SIZE_LIMIT,
      },
      features: {
        applyStyles: true,
      },
    };
    this._formulaTemplateTracker = [];
    this.styledRanges = new Map();
    this._originalCalculationMode = null;
  }

  // Helper methods to reduce redundant logging calls
  _logInfo(message, details, verbose = false) {
    ErrorService.logInfo(message, details, componentId, verbose);
  }

  _logError(message, details, verbose = false) {
    ErrorService.logError(message, details, componentId, verbose);
  }

  /**
   * Ensures a formula is properly formatted with an equals sign
   * @param {string} formula - The formula to validate
   * @returns {string} - The validated formula
   */
  _validateFormula(formula) {
    if (formula == null) return "";

    // Ensure formula is a string
    const stringFormula = String(formula);

    // Ensure formula starts with "=" if it has content
    if (stringFormula && stringFormula.length > 0 && !stringFormula.startsWith("=")) {
      return "=" + stringFormula;
    }

    return stringFormula;
  }

  /**
   * Validates and normalizes a column header object
   * @param {Object} header - The header object to validate
   * @param {number} globalColIndex - The global column index
   * @returns {Object} - The validated header object
   */
  _validateHeader(header, globalColIndex) {
    if (!header) return {};

    const validatedHeader = { ...header };

    // Detect and correct any numeric sourceColumnLetter values
    // This prevents date serials (like 44531) from being used as column letters
    if (typeof validatedHeader.sourceColumnLetter === "number" || /^\d+$/.test(validatedHeader.sourceColumnLetter)) {
      validatedHeader.sourceColumnLetter =
        validatedHeader.columnLetter || getExcelColumnLetterZeroBased(globalColIndex);
    }

    // Ensure sourceColumnLetter is set if missing
    if (!validatedHeader.sourceColumnLetter) {
      validatedHeader.sourceColumnLetter =
        validatedHeader.columnLetter || getExcelColumnLetterZeroBased(globalColIndex);
    }

    return validatedHeader;
  }

  /**
   * Gets or creates a formula template for bulk operations
   * @param {string} cacheKey - Key for template caching
   * @param {Object} strategy - Formula strategy
   * @param {Object} header - Column header
   * @param {number} columnIndex - Column index
   * @returns {string|null} Formula template or null if creation failed
   * @private
   */
  _getOrCreateFormulaTemplate(cacheKey, strategy, header, columnIndex) {
    try {
      // Check if we already have this template cached
      if (this.formulaCache.has(cacheKey)) {
        return this.formulaCache.get(cacheKey);
      }

      // Create a new template
      const templateOptions = {
        columnLetter: header?.columnLetter,
        columnIndex,
        rowPlaceholder: "rowPlaceholder", // Will be replaced with actual row number
        sheetName: this.worksheetName,
        sheetContext: this.sheetContext,
      };

      // Track template creation for logging
      const templateTracker = {
        strategy: strategy.strategyName,
        columnLetter: header?.columnLetter,
        columnIndex,
        isIntensive: strategy.isIntensive === true,
        success: false,
        timestamp: Date.now(),
      };

      this._formulaTemplateTracker.push(templateTracker);

      // Create the template
      const template = strategy.createBulkFormulasByColumn(templateOptions);

      if (template) {
        this.formulaCache.set(cacheKey, template);
        templateTracker.success = true;
        return template;
      }

      return null;
    } catch (error) {
      this._logError("Formula template creation failed", {
        operation: "_getOrCreateFormulaTemplate",
        cacheKey,
        columnIndex,
        strategy: strategy?.strategyName,
        error: error.message,
      });
      return null;
    }
  }

  /**
   * Batch creates formula templates for multiple columns
   * @param {Array} strategies - Array of formula strategies
   * @param {Array} headers - Array of column headers
   * @param {number} startColIndex - Starting column index
   * @param {number} endColIndex - Ending column index
   * @returns {Map} Map of column index to formula template
   * @private
   */
  _batchCreateFormulaTemplates(strategies, headers, startColIndex, endColIndex) {
    const templateMap = new Map();
    const validStrategies = strategies.filter(Boolean);

    // Enhanced diagnostic logging for batch formula creation
    this._logInfo(`Starting batch formula template creation`, {
      startColIndex,
      endColIndex,
      headerCount: headers ? headers.length : 0,
      strategyCount: validStrategies ? validStrategies.length : 0,
      sheetContext: this.sheetContext ? this.sheetContext.type : "unknown",
    });

    // Validate inputs
    if (!validStrategies.length || !headers || !headers.length) {
      this._logInfo(`No valid strategies or headers for formula templates`, {
        hasStrategies: !!validStrategies.length,
        hasHeaders: !!(headers && headers.length),
      });
      return templateMap;
    }

    // Process each column in the range
    for (let colIndex = startColIndex; colIndex < endColIndex; colIndex++) {
      const headerIndex = colIndex - startColIndex;
      const header = headers[headerIndex];
      const strategy = validStrategies[headerIndex];

      // Skip if no strategy or header
      if (!strategy || !header) {
        this._logInfo(`Skipping column due to missing strategy or header`, {
          colIndex,
          hasStrategy: !!strategy,
          hasHeader: !!header,
        });
        continue;
      }

      // Enhanced diagnostic logging for column properties
      this._logInfo(`Column properties for formula creation`, {
        colIndex,
        headerProperties: {
          name: header.name,
          columnLetter: header.columnLetter,
          sourceColumnLetter: header.sourceColumnLetter,
          firstColumnLetter: header.firstColumnLetter,
          lastColumnLetter: header.lastColumnLetter,
          type: header.type,
        },
        strategyName: strategy.strategyName,
        strategyType: strategy.constructor ? strategy.constructor.name : "unknown",
      });

      // Skip special strategy types that don't need formula templates
      if (strategy.operationType === OPERATION_TYPES.DIMENSION || strategy.operationType === OPERATION_TYPES.SPACER) {
        this._logInfo(`Skipping formula creation for special strategy type`, {
          colIndex,
          strategyName: strategy.strategyName,
          operationType: strategy.operationType,
        });
        continue;
      }

      // Skip if strategy doesn't have createBulkFormulasByColumn method
      if (!strategy.createBulkFormulasByColumn) {
        this._logInfo(`Strategy doesn't support bulk formula creation`, {
          colIndex,
          strategyName: strategy.strategyName,
          operationType: strategy.operationType,
        });
        continue;
      }

      // Strategy-specific property validation
      let missingRequiredProperties = false;

      // For QuarterlyByPeriodStrategy and YearlyByPeriodStrategy, check for firstColumnLetter and lastColumnLetter
      if (
        (strategy.strategyName === "QuarterlyByPeriodStrategy" || strategy.strategyName === "YearlyByPeriodStrategy") &&
        (!header.firstColumnLetter || !header.lastColumnLetter)
      ) {
        this._logInfo(`Missing required properties for ${strategy.strategyName}`, {
          colIndex,
          headerInfo: {
            name: header.name,
            firstColumnLetter: header.firstColumnLetter,
            lastColumnLetter: header.lastColumnLetter,
          },
          strategyName: strategy.strategyName,
        });
        missingRequiredProperties = true;
      }

      // For WaterfallMonthStrategy, check for sourceColumnLetter
      else if (strategy.strategyName === "WaterfallMonthStrategy" && !header.sourceColumnLetter) {
        this._logInfo(`Missing sourceColumnLetter for WaterfallMonthStrategy`, {
          colIndex,
          headerInfo: {
            name: header.name,
            sourceColumnLetter: header.sourceColumnLetter,
          },
          strategyName: strategy.strategyName,
        });
        missingRequiredProperties = true;
      }

      // Skip this column if required properties are missing
      if (missingRequiredProperties) {
        // Try to get more information about the column from the dimensions manager
        if (this.sheetContext && this.sheetContext.dimensionsManager) {
          try {
            const columns = this.sheetContext.dimensionsManager.getCurrentColumns();
            this._logInfo(`Available columns in dimensions manager`, {
              totalColumns: columns ? columns.length : 0,
              colIndex,
              columnName: header.name,
            });
          } catch (e) {
            this._logInfo(`Error accessing dimensions manager`, {
              error: e.message,
            });
          }
        }
        continue;
      }

      const templateOptions = {
        columnLetter: header?.columnLetter,
        columnIndex: colIndex,
        rowPlaceholder: "rowPlaceholder",
        sheetName: this.worksheetName,
        sheetContext: this.sheetContext,
      };

      // Track template creation for logging
      const templateTracker = {
        strategy: strategy.strategyName,
        columnLetter: header?.columnLetter,
        columnIndex: colIndex,
        isIntensive: strategy.isIntensive === true,
        success: false,
        timestamp: Date.now(),
      };

      this._formulaTemplateTracker.push(templateTracker);

      try {
        // Create the template - pass the header and templateOptions to support both parameter styles
        const template = strategy.createBulkFormulasByColumn(header, colIndex, templateOptions);

        if (template) {
          this.formulaCache.set(`bulk_${strategy.strategyName}_${colIndex}`, template);
          templateMap.set(colIndex, template);
          templateTracker.success = true;

          this._logInfo(`Successfully created formula template`, {
            colIndex,
            strategyName: strategy.strategyName,
            templateLength: template.length,
          });
        } else {
          this._logInfo(`Strategy returned null template`, {
            colIndex,
            strategyName: strategy.strategyName,
          });
        }
      } catch (error) {
        this._logError(`Error creating formula template`, {
          colIndex,
          strategyName: strategy.strategyName,
          error: error.message,
          stack: error.stack,
        });
      }
    }

    return templateMap;
  }

  /**
   * Optimizes range operations by breaking large ranges into smaller chunks
   * @param {Excel.Range} range - The Excel range to operate on
   * @param {Array<Array>} values - 2D array of values to write
   * @param {Object} options - Options for the operation
   * @returns {Promise} Promise that resolves when the operation is complete
   * @private
   */
  async _optimizeRangeOperation(range, values, options = {}) {
    const defaults = {
      maxCellsPerOperation: 10000,
      maxRowsPer2DArray: 500,
      maxColumnsPer2DArray: 200,
      optimizeThreshold: 500,
      operation: "write", // 'write' or 'format'
      formatOptions: null,
    };

    const config = { ...defaults, ...options };
    const rowCount = values.length;
    const colCount = values[0]?.length || 0;
    const totalCells = rowCount * colCount;

    // Skip optimization for small ranges
    if (totalCells < config.optimizeThreshold) {
      if (config.operation === "write") {
        range.values = values;
      } else if (config.operation === "format" && config.formatOptions) {
        range.format.load(config.formatOptions);
      }
      return;
    }

    // Calculate optimal chunk sizes
    const rowChunkSize = Math.min(config.maxRowsPer2DArray, rowCount);
    const colChunkSize = Math.min(config.maxColumnsPer2DArray, colCount);

    // Process in chunks
    for (let rowStart = 0; rowStart < rowCount; rowStart += rowChunkSize) {
      const rowEnd = Math.min(rowStart + rowChunkSize, rowCount);
      const rowChunkCount = rowEnd - rowStart;

      for (let colStart = 0; colStart < colCount; colStart += colChunkSize) {
        const colEnd = Math.min(colStart + colChunkSize, colCount);
        const colChunkCount = colEnd - colStart;

        // Extract chunk values
        const chunkValues = [];
        for (let r = 0; r < rowChunkCount; r++) {
          const row = [];
          for (let c = 0; c < colChunkCount; c++) {
            row.push(values[rowStart + r][colStart + c]);
          }
          chunkValues.push(row);
        }

        // Get the chunk range
        const chunkRange = range
          .getOffsetRange(rowStart, colStart)
          .getResizedRange(rowChunkCount - 1, colChunkCount - 1);

        // Apply operation to the chunk
        if (config.operation === "write") {
          chunkRange.values = chunkValues;
        } else if (config.operation === "format" && config.formatOptions) {
          chunkRange.format.load(config.formatOptions);
        }

        // Check if we need to sync (based on cell count)
        const chunkCellCount = rowChunkCount * colChunkCount;
        if (chunkCellCount >= config.maxCellsPerOperation) {
          await range.context.sync();
          this._logInfo("Intermediate sync during range operation", {
            operation: config.operation,
            rowChunk: `${rowStart}-${rowEnd}`,
            colChunk: `${colStart}-${colEnd}`,
            cellCount: chunkCellCount,
          });
        }
      }
    }
  }

  /**
   * Determines if a range operation should be optimized based on size
   * @param {number} rowCount - Number of rows
   * @param {number} colCount - Number of columns
   * @returns {boolean} True if the operation should be optimized
   * @private
   */
  _shouldOptimizeRangeOperation(rowCount, colCount) {
    const totalCells = rowCount * colCount;
    return totalCells >= 500 || rowCount >= 100 || colCount >= 50;
  }

  /**
   * Clears cache if memory optimization is enabled and threshold is reached
   * @private
   */
  _performMemoryOptimization() {
    if (
      PROCESSING_CONFIG.PERFORMANCE.MEMORY_OPTIMIZATION.ENABLE &&
      this.formulaCache.size > PROCESSING_CONFIG.PERFORMANCE.MEMORY_OPTIMIZATION.CLEAR_CACHE_THRESHOLD
    ) {
      this._logInfo("Clearing formula cache for memory optimization", {
        operation: "memoryOptimization",
        previousCacheSize: this.formulaCache.size,
      });
      this.formulaCache.clear();
    }
  }

  /**
   * Process chunk data and write to Excel
   * Supports two calling conventions:
   * 1. processChunkData(chunkData, options)
   * 2. processChunkData(options) - for configuration only
   * @param {Array<Array<any>>|Object} chunkDataOrOptions - The chunk data or options
   * @param {Object} [optionsOrUndefined] - Processing options if first param is chunk data
   * @returns {Promise<void>}
   */
  async processChunkData(chunkDataOrOptions, optionsOrUndefined = {}) {
    const startTime = Date.now();
    // Move batchedRanges declaration outside try block so it's available in catch block
    const batchedRanges = [];
    const batchedValues = [];
    const batchedFormulas = [];
    let syncCounter = 0;
    let formulaCounter = 0;
    let templateCreationTime = 0;
    let formulaApplicationTime = 0;
    let rangeOptimizationTime = 0;

    try {
      // Determine if first parameter is chunk data or options
      let chunkData;
      let options;

      if (Array.isArray(chunkDataOrOptions)) {
        // First parameter is chunk data
        chunkData = chunkDataOrOptions;
        options = optionsOrUndefined;
      } else {
        // First parameter is options
        chunkData = null;
        options = chunkDataOrOptions;

        // If this is just a configuration call, return early
        if (!chunkData) {
          this._logInfo("Configuration-only call to processChunkData", {
            operation: "processChunkData",
            options: Object.keys(options),
          });
          return;
        }
      }

      // Check if chunkData is provided when needed
      if (!chunkData) {
        this._logError("Invalid chunk data provided", {
          operation: "processChunkData",
          validation: {
            hasChunkData: !!chunkData,
            isArray: Array.isArray(chunkData),
            options: Object.keys(options),
          },
        });
        return;
      }

      this._logInfo("Starting Excel operation", {
        rowCount: chunkData.length,
        colCount: chunkData[0]?.length || 0,
        sheetContext: this.sheetContext?.type,
      });

      // Enhanced logging to show sample data from the chunk
      if (chunkData.length > 0) {
        const sampleRow = chunkData[0];
        this._logInfo(
          "Chunk data sample",
          {
            sampleRowLength: sampleRow?.length || 0,
            sampleRowHasValues: sampleRow?.some((val) => val !== undefined && val !== null && val !== "") || false,
            totalRows: chunkData.length,
          },
          true
        );
      }

      const currentDims = await this.dimensions.getCurrentDimensions();
      const totalColumns = currentDims.dimensions.columns;

      // Determine if the dataset is large
      const isLargeDataset =
        chunkData.length >= PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.ROWS_LARGE ||
        totalColumns >= PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.COLS_LARGE;

      const effectiveColumnGroupSize = isLargeDataset
        ? PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.REDUCED_SIZE
        : PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.DEFAULT_SIZE;

      // Check if this is a waterfall context with pre-processed formulas
      const isWaterfallContext = this.sheetContext?.type === "waterfall";
      const hasPreProcessedFormulas = isWaterfallContext && options?.hasPreProcessedFormulas === true;

      // Prepare deferred processing for formula-intensive columns
      let isProcessingComplete = false;

      // Log basic column configuration
      this._logInfo("Column configuration", {
        totalColumns,
        effectiveGroupSize: effectiveColumnGroupSize,
        isWaterfallContext,
        hasPreProcessedFormulas,
        operationType: this.sheetContext?.type || "unknown",
      });

      return await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getItem(this.worksheetName);

        if (this.config.features.applyStyles && Array.isArray(this.options?.styles)) {
          await this._validateStyles(this.options.styles);
        }

        // Suspend Excel updates
        await this._suspendExcelUpdates(context);

        // Process each column group
        for (let colStart = 0; colStart < totalColumns; colStart += effectiveColumnGroupSize) {
          const colEnd = Math.min(colStart + effectiveColumnGroupSize, totalColumns);
          const columnGroup = { start: colStart, end: colEnd, size: colEnd - colStart };

          const paddedChunk = chunkData.map((row) =>
            row.length < totalColumns ? [...row, ...new Array(totalColumns - row.length).fill(null)] : row
          );
          const columnSlice = paddedChunk.map((row) => row.slice(colStart, colEnd));

          try {
            const batchSize = this.config.batchSizes.default;
            const totalBatches = Math.ceil(columnSlice.length / batchSize);

            for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
              const batchStart = batchIndex * batchSize;
              const batchEnd = Math.min(batchStart + batchSize, columnSlice.length);
              const batchSlice = columnSlice.slice(batchStart, batchEnd);
              const rowCount = batchEnd - batchStart;
              const targetRange = worksheet.getRangeByIndexes(
                options.rowOffset + batchStart,
                columnGroup.start,
                rowCount,
                colEnd - columnGroup.start
              );

              // Check if this column group contains only month columns
              const hasOnlyMonthColumns = options.headers
                .slice(columnGroup.start, columnGroup.end)
                .every((h) => h.type === COLUMN_TYPES.DATE || h.type === COLUMN_TYPES.MONTH);

              // For waterfall context with pre-processed formulas, we need special handling for month columns
              if (hasPreProcessedFormulas && hasOnlyMonthColumns) {
                // We still need to write the header row for these columns
                if (options.rowOffset === 0) {
                  const headerRowValues = [];
                  for (let colIndex = 0; colIndex < columnGroup.size; colIndex++) {
                    const globalColIndex = columnGroup.start + colIndex;
                    const header = this._validateHeader(options.headers[globalColIndex], globalColIndex);
                    headerRowValues.push(header?.name || "");
                  }

                  // Only write the header row
                  const headerRange = worksheet.getRangeByIndexes(
                    options.rowOffset,
                    columnGroup.start,
                    1,
                    colEnd - columnGroup.start
                  );

                  this._logInfo(
                    "Writing headers for month columns in waterfall context",
                    {
                      group: `${columnGroup.start}-${columnGroup.end}`,
                      action: "headers_only",
                    },
                    true
                  );

                  batchedRanges.push(headerRange);
                  batchedValues.push([headerRowValues]);
                  // Track sync operations
                  syncCounter++;
                } else {
                  this._logInfo(
                    "Skipping data rows for month columns in waterfall context",
                    {
                      group: `${columnGroup.start}-${columnGroup.end}`,
                      rowCount,
                      action: "skipped",
                    },
                    true
                  );
                }

                // Skip writing data rows for these columns - they'll be handled by applyWaterfallFormulas
                continue;
              }

              // Use existing formula processing logic for all other cases
              const rawBatchSlice = this._extractRawValues(batchSlice);

              if (Array.isArray(options.formulaStrategies) && options.formulaStrategies.length) {
                // Identify regular and intensive strategies
                const columnsWithStrategies = new Set();
                options.formulaStrategies.forEach((strategy, globalIndex) => {
                  if (
                    strategy &&
                    strategy.operationType !== OPERATION_TYPES.DIMENSION &&
                    strategy.operationType !== OPERATION_TYPES.SPACER
                  ) {
                    columnsWithStrategies.add(globalIndex);
                  }
                });

                const hasRegularStrategiesInGroup = Array.from(columnsWithStrategies).some(
                  (col) => col >= columnGroup.start && col < columnGroup.end
                );

                this._logInfo("Processing column group", {
                  range: `${columnGroup.start}-${columnGroup.end}`,
                  hasRegular: hasRegularStrategiesInGroup,
                });

                // Handle header row assignment
                if (options.rowOffset === 0) {
                  for (let colIndex = 0; colIndex < columnGroup.size; colIndex++) {
                    const globalColIndex = columnGroup.start + colIndex;
                    const header = this._validateHeader(options.headers[globalColIndex], globalColIndex);
                    if (
                      header &&
                      (header.type === "spacer" ||
                        header.operationType === "SPACER" ||
                        header.metadata?.columnGroup === "spacer")
                    ) {
                      rawBatchSlice[0][colIndex] = "";
                    } else if (header && header.name) {
                      rawBatchSlice[0][colIndex] = header.name;
                    }
                  }
                }

                let columnLogDetails = {};
                const transformedValues = rawBatchSlice.map((row) => [...row]);

                // Clear values in spacer columns for all rows
                for (let colIndex = 0; colIndex < columnGroup.size; colIndex++) {
                  const globalColIndex = columnGroup.start + colIndex;
                  const header = this._validateHeader(options.headers[globalColIndex], globalColIndex);
                  if (
                    header &&
                    (header.type === "spacer" ||
                      header.operationType === "SPACER" ||
                      header.metadata?.columnGroup === "spacer")
                  ) {
                    for (let rowIndex = 0; rowIndex < transformedValues.length; rowIndex++) {
                      transformedValues[rowIndex][colIndex] = "";
                    }
                  }
                }

                // Batch create formula templates for this column group
                const templateStartTime = Date.now();
                const templateMap = this._batchCreateFormulaTemplates(
                  options.formulaStrategies,
                  options.headers,
                  columnGroup.start,
                  columnGroup.end
                );
                templateCreationTime += Date.now() - templateStartTime;

                // Process each column with a strategy
                const formulaStartTime = Date.now();
                for (let colIndex = 0; colIndex < columnGroup.size; colIndex++) {
                  const globalColIndex = columnGroup.start + colIndex;
                  const hasStrategy = columnsWithStrategies.has(globalColIndex);
                  if (!hasStrategy) continue;

                  const strategy = options.formulaStrategies[globalColIndex];
                  const header = this._validateHeader(options.headers[globalColIndex], globalColIndex);

                  // Log that we're processing a month column in waterfall context
                  if (
                    hasPreProcessedFormulas &&
                    (header.type === COLUMN_TYPES.DATE || header.type === COLUMN_TYPES.MONTH)
                  ) {
                    this._logInfo(
                      "Skipping formula for individual month column in mixed column group",
                      {
                        column: header.columnLetter,
                        type: header.type,
                        strategy: strategy?.strategyName || "Unknown",
                      },
                      true
                    );

                    // Skip applying formulas to month columns in waterfall context
                    continue;
                  }

                  // Process all columns using the standard approach
                  if (!columnLogDetails[globalColIndex]) {
                    columnLogDetails[globalColIndex] = {
                      columnIndex: colIndex,
                      globalColumnIndex: globalColIndex,
                      columnLetter: header?.columnLetter,
                      columnName: header?.name,
                      count: 0,
                      sampleValue: null,
                    };
                  }

                  // Get formula template from the batch-created map
                  const bulkTemplate = templateMap.get(globalColIndex);
                  if (!bulkTemplate) {
                    continue;
                  }

                  for (let rowOffsetIndex = 0; rowOffsetIndex < transformedValues.length; rowOffsetIndex++) {
                    if (options.rowOffset === 0 && rowOffsetIndex === 0) continue;
                    const rowNumber = options.rowOffset + batchStart + rowOffsetIndex + 1;
                    let formula = String(bulkTemplate).replace(/rowPlaceholder/g, rowNumber.toString());

                    transformedValues[rowOffsetIndex][colIndex] = formula;
                    columnLogDetails[globalColIndex].count++;
                    formulaCounter++; // Track formula count
                    if (columnLogDetails[globalColIndex].sampleValue === null) {
                      columnLogDetails[globalColIndex].sampleValue = formula;
                    }
                  }
                }
                formulaApplicationTime += Date.now() - formulaStartTime;
              } else {
                batchedRanges.push(targetRange);
                batchedValues.push(rawBatchSlice);
                // Track sync operations
                syncCounter++;
              }

              // Only sync after processing a certain number of batches or if we've processed a lot of formulas
              const needsSync =
                syncCounter >= PROCESSING_CONFIG.BATCH_SIZES.SYNC_GROUPS ||
                formulaCounter >= PROCESSING_CONFIG.FORMULA.TEMPLATE_BATCH;

              if (needsSync) {
                // Apply all values processed so far
                for (let i = 0; i < batchedRanges.length; i++) {
                  if (this._shouldOptimizeRangeOperation(batchedValues[i].length, batchedValues[i][0].length)) {
                    const rangeOptStart = Date.now();
                    await this._optimizeRangeOperation(batchedRanges[i], batchedValues[i], {
                      operation: "write",
                    });
                    rangeOptimizationTime += Date.now() - rangeOptStart;
                  } else {
                    batchedRanges[i].values = batchedValues[i];
                  }
                }

                await context.sync();

                this._logInfo("Intermediate sync completed", {
                  syncCounter,
                  formulaCounter,
                  batchesProcessed: batchedRanges.length,
                });

                // Reset counters and arrays after sync
                syncCounter = 0;
                formulaCounter = 0;
                batchedRanges.length = 0;
                batchedValues.length = 0;
              }
            }
          } catch (groupError) {
            this._logError("Error processing column group", {
              operation: "processChunkData",
              group: `${columnGroup.start}-${columnGroup.end}`,
              error: groupError?.message || groupError,
            });
            throw groupError;
          }

          if (isLargeDataset) {
            await context.sync();
            if (colEnd >= totalColumns) {
              isProcessingComplete = true;
            }
            this._logInfo("Intermediate sync completed", {
              progress: `${colEnd}/${totalColumns}`,
            });
          }
        }

        if (!isProcessingComplete && totalColumns > 0) {
          isProcessingComplete = true;
        }

        // Apply styles similarly in batches
        if (this.config.features.applyStyles && Array.isArray(this.options?.styles)) {
          try {
            // Skip style application since styles are now applied during initialization in WorksheetBuilderInitialization
            this._logInfo("Skipping style application - styles are now applied during initialization", {
              operation: "processChunkData",
              styleCount: this.options?.styles?.length || 0,
              sheetContext: this.sheetContext?.type,
            });

            // No need for commented code since styles are now properly handled during initialization
          } catch (error) {
            this._logError("Style application check failed", {
              error: error.message,
            });
          }
        }

        // Apply column widths if this is the first chunk
        if (options.rowOffset === 0) {
          try {
            // Column widths are now set during worksheet initialization in WorksheetBuilderInitialization
            this._logInfo("Skipping column width application - handled by WorksheetBuilderInitialization");
          } catch (widthError) {
            this._logError("Column width application check failed", {
              operation: "processChunkData",
              error: widthError.message,
            });
            // Continue processing even if width setting fails
          }
        }

        // Apply any remaining values
        if (batchedRanges.length > 0) {
          // Apply all values at once
          for (let i = 0; i < batchedRanges.length; i++) {
            if (this._shouldOptimizeRangeOperation(batchedValues[i].length, batchedValues[i][0].length)) {
              const rangeOptStart = Date.now();
              await this._optimizeRangeOperation(batchedRanges[i], batchedValues[i], {
                operation: "write",
              });
              rangeOptimizationTime += Date.now() - rangeOptStart;
            } else {
              batchedRanges[i].values = batchedValues[i];
            }
          }

          // Then sync only once
          await context.sync();
        }

        // Perform memory optimization if needed
        this._performMemoryOptimization();

        // Resume Excel updates
        await this._resumeExcelUpdates(context);

        // Track performance metrics
        this._trackPerformance("processChunkData", {
          rowsProcessed: batchedRanges.length,
          totalRowsProcessed: this.rowCounter,
          formulasApplied: formulaCounter,
          syncOperations: syncCounter,
          templateCreationTime,
          formulaApplicationTime,
          rangeOptimizationTime,
          totalElapsed: Date.now() - startTime,
        });

        return {
          success: true,
          rowsProcessed: batchedRanges.length,
          totalRowsProcessed: this.rowCounter,
          elapsed: Date.now() - startTime,
        };
      });
    } catch (error) {
      this._logError("Excel chunk processing failed", {
        operation: "processChunkData",
        validation: {
          state: { initialized: !!this.worksheet, validated: !!batchedRanges },
          error: error?.message || error,
          errorType: error?.constructor?.name,
          phase: batchedRanges?.phase || "unknown",
          rowCount: batchedRanges ? batchedRanges.length : 0,
          colCount: batchedRanges && batchedRanges[0] ? batchedRanges[0].columnCount : 0,
        },
      });
      throw ErrorService.createExcelError(
        "GENERAL_EXCEPTION",
        "Chunk processing failed: " + (error && error.message ? error.message : ""),
        {
          operation: "processChunkData",
          validation: {
            state: { initialized: !!this.worksheet, validated: !!batchedRanges },
            error: error?.message,
            errorType: error?.constructor?.name,
            phase: batchedRanges?.phase || "unknown",
          },
        }
      );
    }
  }

  _isFormulaIntensiveStrategy(strategy) {
    // Always return false to use the standard formula processing approach for all columns
    return false;
  }

  /**
   * Applies a formula template to a range of cells
   * @param {string} template - The formula template
   * @param {number} startRow - The starting row index
   * @param {number} rowCount - The number of rows
   * @param {boolean} skipHeaderRow - Whether to skip the header row
   * @returns {Array<Array<string>>} - The array of formulas
   */
  _applyFormulaToRange(template, startRow, rowCount, skipHeaderRow = false) {
    const formulas = [];

    if (skipHeaderRow && rowCount > 0) {
      // Add header as first row if needed
      formulas.push([""]);

      // Add formulas for remaining rows
      for (let i = 1; i < rowCount; i++) {
        const rowNumber = startRow + i + 1; // +1 for 1-based Excel rows
        const formula = template.replace(/rowPlaceholder/g, rowNumber.toString());
        formulas.push([formula]);
      }
    } else {
      // Add formulas for all rows
      for (let i = 0; i < rowCount; i++) {
        const rowNumber = startRow + i + 1; // +1 for 1-based Excel rows
        const formula = template.replace(/rowPlaceholder/g, rowNumber.toString());
        formulas.push([formula]);
      }
    }

    return formulas;
  }

  _extractRawValues(data) {
    try {
      return data.map((row) =>
        row.map((cell) => {
          if (cell && typeof cell === "object" && "v" in cell) {
            return cell.v;
          }
          return cell;
        })
      );
    } catch (error) {
      this._logError("Failed to extract raw values", {
        operation: "extractRawValues",
        validation: {
          state: { initialized: !!data, validated: Array.isArray(data) },
          error: error?.message,
          errorType: error?.constructor?.name,
          phase: "value_extraction",
        },
      });
      throw ErrorService.createExcelError("VALUE_EXTRACTION_FAILED", "Failed to extract raw values", {
        operation: "extractRawValues",
        validation: {
          state: { initialized: !!data, validated: Array.isArray(data) },
          error: error?.message,
          errorType: error?.constructor?.name,
          phase: "value_extraction",
        },
      });
    }
  }

  async _applyStylesWithoutSync(context, targetRange, styleContext) {
    let syncNeeded = false;
    try {
      const { rowCount, colCount, columnGroup, rowOffset, batchStart, metadata } = styleContext;
      const isLargeDataset =
        rowCount >= PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.ROWS_LARGE ||
        metadata?.headers?.length >= PROCESSING_CONFIG.BATCH_SIZES.COLUMN_GROUP_THRESHOLDS.COLS_LARGE;

      // Ensure we have loaded the necessary properties
      if (!columnGroup || typeof columnGroup.start === "undefined" || typeof columnGroup.end === "undefined") {
        this._logInfo("Missing column group information", { columnGroup });
        return { needsSync: false };
      }

      // Ensure targetRange has necessary properties loaded
      if (targetRange) {
        try {
          // Load essential properties before accessing them
          targetRange.load(["columnCount", "rowCount"]);
          await context.sync();

          this._logInfo(
            "Range properties loaded",
            {
              columnCount: targetRange.columnCount,
              rowCount: targetRange.rowCount,
            },
            true
          );
        } catch (loadError) {
          this._logError("Failed to load range properties", {
            error: loadError.message,
          });
          // Continue with the provided colCount from styleContext
        }
      }

      if (columnGroup.start < 0 || columnGroup.end > 1000) {
        this._logInfo("Skipping styles (invalid range)", { columnGroup, rowCount, colCount });
        return { needsSync: false };
      }

      this._logInfo(
        "Applying styles",
        {
          rowCount,
          colCount,
          columnGroup,
          isHeader: rowOffset === 0 && batchStart === 0,
          isLarge: isLargeDataset,
        },
        true
      ); // Set verbose to true for debugging

      const styles = this.options.styles || [];
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        if (columnGroup.start + colIndex >= styles.length) break;
        const styleDef = styles[columnGroup.start + colIndex];
        if (!styleDef) continue;

        // Use strategyName from the style definition if available, otherwise fall back to metadata
        const strategyName =
          styleDef.strategyName ||
          metadata.formulaStrategies?.[columnGroup.start + colIndex]?.strategyName ||
          "default";

        this._logInfo(
          "Applying style for column",
          {
            column: columnGroup.start + colIndex,
            strategyName,
            styleDef,
          },
          true
        );

        const strategy = StyleOperations.formatConfig.strategies[strategyName] || {};
        const headerStyle = strategy.header || {};
        const dataStyle = strategy.data || {};
        try {
          if (rowOffset === 0 && batchStart === 0) {
            const headerRow = targetRange.getColumn(colIndex).getRow(0);
            const headerNeedsSync = this._applyOfficeStyle(headerRow, headerStyle);
            syncNeeded = syncNeeded || headerNeedsSync;
            if (isLargeDataset) {
              await context.sync();
              syncNeeded = true;
            }
            if (rowCount > 1) {
              const dataRange = targetRange
                .getColumn(colIndex)
                .getCell(1, 0)
                .getResizedRange(rowCount - 1, 0);
              const dataNeedsSync = this._applyOfficeStyle(dataRange, dataStyle);
              syncNeeded = syncNeeded || dataNeedsSync;
              if (isLargeDataset) {
                await context.sync();
                syncNeeded = true;
              }
            }
          } else {
            const column = targetRange.getColumn(colIndex);
            const columnNeedsSync = this._applyOfficeStyle(column, dataStyle);
            syncNeeded = syncNeeded || columnNeedsSync;
            if (isLargeDataset) {
              await context.sync();
              syncNeeded = true;
            }
          }
        } catch (styleError) {
          this._logError("Style application failed for column", {
            column: columnGroup.start + colIndex,
            error: styleError.message,
          });
        }
      }
    } catch (error) {
      this._logError("_applyStylesWithoutSync failed", {
        error: error?.message || error,
      });
      return { needsSync: syncNeeded };
    }
    return { needsSync: syncNeeded };
  }

  async _applyDataStyles(targetRange, columnGroup, metadata, startRow, rowCount) {
    return Excel.run(async (context) => {
      try {
        // Load the columnCount property before accessing it
        targetRange.load("columnCount");
        await context.sync();

        let needsSync = false;
        const dataStyleGroups = {};

        // Now we can safely access the columnCount property
        for (let colIndex = 0; colIndex < targetRange.columnCount; colIndex++) {
          const globalColIndex = columnGroup.start + colIndex;
          if (!metadata.formulaStrategies || globalColIndex >= metadata.formulaStrategies.length) {
            continue;
          }
          const strategyName = metadata.formulaStrategies[globalColIndex]?.strategyName || "default";
          const strategy = StyleOperations.formatConfig.strategies[strategyName];
          if (!strategy || !strategy.data) {
            continue;
          }
          if (!dataStyleGroups[strategyName]) {
            dataStyleGroups[strategyName] = { columns: [], style: strategy.data };
          }
          dataStyleGroups[strategyName].columns.push(colIndex);
        }

        this._logInfo(
          "Applying data styles",
          {
            strategyCount: Object.keys(dataStyleGroups).length,
          },
          true
        );

        for (const strategyName in dataStyleGroups) {
          const group = dataStyleGroups[strategyName];
          if (group.columns.length > 0) {
            const groupNeedsSync = this._applyStylesToColumnGroup(
              targetRange,
              group.columns,
              startRow,
              rowCount,
              group.style
            );
            needsSync = needsSync || groupNeedsSync;
          }
        }

        return needsSync;
      } catch (error) {
        this._logError("Error applying data styles", {
          operation: "applyDataStyles",
          validation: {
            state: { initialized: !!targetRange, validated: !!metadata },
            error: error?.message,
            phase: "style_application",
          },
        });
        return false;
      }
    });
  }

  async _validateStyles(styles) {
    for (const style of styles) {
      if (!style || typeof style !== "object") {
        this._logError("Invalid style object", {
          operation: "validateStyles",
          validation: {
            state: { initialized: true, validated: false },
            error: "Invalid style object in styles array",
            phase: "validation",
          },
        });
        throw ErrorService.createExcelError("INVALID_STYLE", "Invalid style object in styles array", {
          operation: "validateStyles",
          validation: {
            state: { initialized: true, validated: false },
            error: "Invalid style object in styles array",
            phase: "validation",
          },
        });
      }
    }
    return true;
  }

  _applyStylesToColumnGroup(targetRange, columns, startRow, rowCount, style) {
    let needsSync = false;
    try {
      if (!columns || columns.length === 0) {
        this._logInfo("No columns to style", {
          operation: "applyStylesToColumnGroup",
          validation: {
            state: { initialized: true, validated: false },
            error: "Empty columns array",
            phase: "validation",
          },
        });
        return;
      }
      this._logInfo(
        "Applying styles to column group",
        {
          columnCount: columns.length,
          startRow,
          rowCount,
        },
        true
      );
      columns.sort((a, b) => a - b);
      let rangeStart = columns[0];
      let currentCol = columns[0];
      for (let i = 1; i <= columns.length; i++) {
        if (i === columns.length || columns[i] !== currentCol + 1) {
          try {
            let colSpan = currentCol - rangeStart;
            if (colSpan < 0) {
              this._logInfo("Invalid column span", { colSpan, rangeStart, currentCol });
              colSpan = 0;
            }
            if (colSpan === 0) {
              const singleColRange = targetRange.getCell(startRow, rangeStart).getResizedRange(rowCount, 0);
              const styleNeedsSync = this._applyOfficeStyle(singleColRange, style);
              needsSync = needsSync || styleNeedsSync;
            } else {
              const multiColRange = targetRange.getCell(startRow, rangeStart).getResizedRange(rowCount, colSpan);
              const styleNeedsSync = this._applyOfficeStyle(multiColRange, style);
              needsSync = needsSync || styleNeedsSync;
            }
          } catch (rangeError) {
            this._logError("Error applying style to range", {
              operation: "applyStylesToColumnGroup",
              error: rangeError?.message || String(rangeError),
            });
          }
          if (i < columns.length) {
            rangeStart = columns[i];
            currentCol = columns[i];
          }
        } else {
          currentCol = columns[i];
        }
      }
    } catch (error) {
      this._logError("Error in column group styling", {
        error: error?.message || String(error),
      });
    }
    return needsSync;
  }

  /**
   * Apply Office style to a range
   * @param {Excel.Range} officeRange - The range to apply styles to
   * @param {Object} style - The style to apply
   * @returns {boolean} Whether a sync is needed
   * @private
   */
  _applyOfficeStyle(officeRange, style) {
    // Skip if we're in a context where styles are already applied by WorksheetBuilderInitialization
    if (this.options && this.options.skipStyleApplication) {
      this._logInfo("Skipping style application - styles already applied during initialization", {
        range: officeRange.address || "unknown",
        sheetContext: this.sheetContext?.type,
      });
      return false;
    }

    // Use the range address as a key to track styled ranges
    const rangeKey =
      officeRange.address ||
      `${officeRange.rowIndex},${officeRange.columnIndex},${officeRange.rowCount},${officeRange.columnCount}`;

    // Check if this range has already been styled
    if (this.styledRanges.has(rangeKey)) {
      this._logInfo("Skipping style application - already styled", {
        range: rangeKey,
      });
      return false;
    }

    // Mark this range as styled to prevent duplicate styling
    this.styledRanges.set(rangeKey, true);

    // Apply the styles
    const validatedStyle = StyleOperations.validateStyle(style) ? style : {};
    const formatUpdate = {};
    let needsSync = false;

    if (validatedStyle.numFmt) {
      officeRange.numberFormat = [[validatedStyle.numFmt]];
      needsSync = true;
    }
    if (validatedStyle.font) {
      formatUpdate.font = {};
      if (validatedStyle.font.name !== undefined) formatUpdate.font.name = validatedStyle.font.name;
      if (validatedStyle.font.size !== undefined) formatUpdate.font.size = validatedStyle.font.size;
      if (validatedStyle.font.bold !== undefined) formatUpdate.font.bold = validatedStyle.font.bold;
      needsSync = true;
    }
    if (validatedStyle.alignment) {
      if (validatedStyle.alignment.horizontal !== undefined)
        formatUpdate.horizontalAlignment = validatedStyle.alignment.horizontal;
      if (validatedStyle.alignment.vertical !== undefined)
        formatUpdate.verticalAlignment = validatedStyle.alignment.vertical;
      needsSync = true;
    }
    if (Object.keys(formatUpdate).length > 0) {
      officeRange.format.set(formatUpdate);
      needsSync = true;
    }

    return needsSync;
  }

  /**
   * Suspends Excel calculations and screen updates during operations
   * @param {Excel.RequestContext} context - The Excel request context
   * @private
   */
  async _suspendExcelUpdates(context) {
    try {
      // Store original calculation mode
      const application = context.workbook.application;
      application.load("calculationMode");
      await context.sync();

      this._originalCalculationMode = application.calculationMode;

      // Disable calculations, screen updates, and events
      application.calculationMode = Excel.CalculationMode.manual;
      application.suspendScreenUpdatingUntilNextSync();
      application.suspendApiCalculationUntilNextSync();

      this._logInfo("Excel updates suspended", {
        operation: "suspendExcelUpdates",
        originalMode: this._originalCalculationMode,
        timestamp: Date.now(),
      });
    } catch (error) {
      this._logError("Failed to suspend Excel updates", {
        operation: "suspendExcelUpdates",
        error: error.message,
        timestamp: Date.now(),
      });
      // Continue processing even if this fails
    }
  }

  /**
   * Resumes Excel calculations and screen updates after operations
   * @param {Excel.RequestContext} context - The Excel request context
   * @private
   */
  async _resumeExcelUpdates(context) {
    try {
      if (this._originalCalculationMode) {
        const application = context.workbook.application;
        application.calculationMode = this._originalCalculationMode;

        // Force a full calculation to ensure formulas are evaluated
        application.calculate(Excel.CalculationType.full);

        this._logInfo("Excel updates resumed", {
          operation: "resumeExcelUpdates",
          restoredMode: this._originalCalculationMode,
          timestamp: Date.now(),
        });

        this._originalCalculationMode = null;
      }
    } catch (error) {
      this._logError("Failed to resume Excel updates", {
        operation: "resumeExcelUpdates",
        error: error.message,
        timestamp: Date.now(),
      });
      // Continue processing even if this fails
    }
  }

  /**
   * Tracks performance metrics for the operation
   * @param {string} operation - The operation being tracked
   * @param {Object} metrics - The metrics to track
   * @private
   */
  _trackPerformance(operation, metrics) {
    this._logInfo(`Performance metrics for ${operation}`, {
      operation: "performanceTracking",
      metrics: {
        ...metrics,
        timestamp: Date.now(),
      },
    });
  }
}

module.exports = ChunkExcelWriter;
