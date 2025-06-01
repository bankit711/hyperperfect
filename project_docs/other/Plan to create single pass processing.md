<refactor_instructions>
    <overview>
        This document outlines a step-by-step approach for consolidating custom data processing into a single pass when using chunk-based operations in the following files:
        <file>src/engines/orchestration/orchestrateSheetOperation.js</file>
        <file>src/engines/worksheetBuilders/chunkExcelWriter.js</file>
        <file>src/engines/orchestration/waterfallController.js</file>
    </overview>

    <steps>
        <!-- STEP 1: Integrate custom processing within the chunk loop -->
        <step>
            <title>Integrate Custom Processing Within the Chunk Loop</title>
            <description>
                1. Locate the code where chunks are iterated, such as:
                <code>
for await (const chunk of processedStream) {
    // ...
    await builder.delegateChunk(enrichedChunk);
}
                </code>
                2. Move or call your custom processor before calling <code>builder.delegateChunk</code> so that <code>chunk.data</code> includes dimension columns and formulas beforehand.
                3. Remove any subsequent extra call to the custom processor that happens after this loop. There should now be a single pass.
                4. Update logs to reflect the single-pass approach.
                5. Verify the function still returns the final worksheet object.
            </description>
        </step>

        <!-- STEP 2: Modify the chunk writer to accept fully-processed data -->
        <step>
            <title>Modify Chunk Writer to Accept Fully-Processed Data</title>
            <description>
                1. In <code>chunkExcelWriter.js</code>, remove or bypass any secondary logic that was computing formulas or dimension columns again.
                2. Continue writing data in column groups, but rely on <code>chunk.data</code> being final.
                3. Update logs to show a single pass is happening, instead of multiple passes.
                4. If styles need to be applied, keep that logic but run it once the data is written, not as an extra pass for dimensions or formulas.
            </description>
        </step>

        <!-- STEP 3: Refactor the Waterfall Controller -->
        <step>
            <title>Refactor the Waterfall Controller</title>
            <description>
                1. Remove direct <code>Excel.run</code> calls from <code>waterfallController.js</code>. Instead, update <code>chunk.data</code> in memory for dimension columns and formulas.
                2. Provide a function (or inline logic) that modifies row arrays, then let <code>orchestrateSheetOperation</code> call it within the chunk loop.
                3. Ensure error handling is adapted for in-memory transformations, not multi-pass Excel interactions.
            </description>
        </step>

        <!-- STEP 4: Verify external API remains unchanged -->
        <step>
            <title>Ensure the Public API Remains Unchanged</title>
            <description>
                1. Keep the signature of functions like <code>processAnalyzeOperation</code> or <code>processWaterfallOperation</code> intact.
                2. Confirm these methods still return the final worksheet object post single-pass completion.
                3. Remove any old references to multi-step logging or multi-pass workflows, so the final logic is simpler and clearly a single pass.
            </description>
        </step>

        <!-- STEP 5: Thoroughly Test the Single-Pass Workflow -->
        <step>
            <title>Test the Single-Pass Workflow</title>
            <description>
                1. Try large datasets to confirm chunk-based processing is still efficient in one pass.
                2. Verify that dimension columns, formulas, and styles all appear correctly after one pass.
                3. Check edge cases like empty data, very wide data, or missing dimension columns.
                4. Confirm any tests expecting multi-step logs are updated accordingly.
            </description>
        </step>
    </steps>
</refactor_instructions>