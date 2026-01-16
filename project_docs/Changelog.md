# Changelog

All notable changes to HyperPerfect are documented here.

---

## [1.0.26]

### Added

#### Real-Time Thinking Display
See the AI's reasoning process as it works through complex problems.

**What's New:**
- **Thinking Disclosure**: Expandable section shows Claude's step-by-step reasoning
- **Live Streaming**: Watch responses appear in real-time as the AI generates them
- **Transparent Problem-Solving**: Understand how the AI approaches your request

**How It Helps You:**
- Gain confidence in AI recommendations by seeing the reasoning behind them
- Learn from the AI's analytical approach to complex Excel problems
- Identify any misunderstandings early in the AI's thinking process

---

## [1.0.25]

### Added

#### Context Management (@compact)
Keep long conversations running smoothly with intelligent context management.

**What's New:**
- **@compact Command**: Type `@compact` to manually compress your conversation history
- **Smart Summarization**: AI generates a handoff summary preserving workbook state, completed work, and pending tasks
- **Automatic Warnings**: Get notified when your conversation is approaching context limits (70%)
- **Auto-Compaction**: System automatically compacts at 85% capacity to prevent interruptions
- **@clear Command**: Type `@clear` to start fresh—deletes all messages and file attachments

**How It Helps You:**
- Continue complex, multi-step projects without hitting context limits
- Preserve important context even when conversation history is compressed
- Start fresh anytime with a single command

---

## [1.0.24]

### Added

#### Dynamic Model Toggle (@mode)
Switch between Fast and Power modes instantly without losing your conversation context.

**What's New:**
- Type `@mode` or use the mode button to toggle modes mid-conversation
- **Fast Mode**: Faster responses using Claude Haiku, ideal for quick tasks
- **Power Mode**: Advanced reasoning using Claude Sonnet for complex analysis
- Mode preference persists across chats and sessions

**How It Helps You:**
- Use Fast mode for simple questions and quick formatting tasks
- Switch to Power mode when tackling complex formulas or data analysis
- Save time by matching AI capability to task complexity

---

## [1.0.23]

### Added

#### File Attachment System
Share images and documents directly with HyperPerfect AI for visual analysis alongside your Excel workbooks.

**What's New:**
- **Drag-and-Drop Upload**: Simply drag files anywhere in the chat input area, or click the attach button to browse
- **Format Support**: Upload images (JPG, PNG, GIF, WebP) and PDFs
- **Visual Previews**: See thumbnail previews for images and clear file icons for documents before sending
- **Smart File Management**: Attach up to 100 files per conversation with a 32 MB total capacity and real-time size tracking
- **Persistent Attachments**: Files remain available throughout your entire conversation—the AI can reference them across multiple messages without re-uploading
- **Vision Analysis**: Images and PDFs are processed by Claude's vision system for intelligent visual understanding

**How It Helps You:**
- Provide context with screenshots, diagrams, or reference PDFs alongside Excel data
- Share documentation or mockups for the AI to reference while building solutions
- Get visual analysis without switching between tools or copying data manually
- Build on previous file attachments across multiple conversation turns without re-uploading

**File Limits:**
- Images: Up to 5 MB each (PNG, JPEG, GIF, WebP)
- PDFs: Up to 32 MB each, 100 pages max
- Remove individual files anytime with the X button

---

## [1.0.22]

### Added

#### Full Workbook Access
HyperPerfect AI can now see and work with all sheets in your Excel workbook, not just the currently active sheet.

**What's New:**
- **See All Sheets**: AI can list every sheet in your workbook and view their contents
- **Smarter Sheet Selection**: AI understands your workbook structure and automatically selects the right sheet for your task
- **Cross-Sheet Operations**: Read from one sheet and write to another in a single request
- **Clear Operation Tracking**: When AI makes changes, it shows you exactly which sheet it's modifying

**How It Helps You:**
- Consolidate data across multiple sheets without manual coordination
- Ask the AI to find and analyze data scattered across different sheets
- Let the AI intelligently navigate your workbook structure to complete tasks
- See exactly which sheets are being modified as the AI works

---

## [1.0.21]

### Added

#### Request Cancellation
Stop in-progress AI operations when you need to change direction.

**What's New:**
- **Cancel Button**: Click to immediately stop the current AI operation
- **Clean Interruption**: All pending Excel operations are safely cancelled
- **Instant Recovery**: Continue your conversation immediately after cancelling

**How It Helps You:**
- Change your mind mid-request without waiting for completion
- Quickly redirect the AI when you spot a misunderstanding
- Stay in control of long-running operations

---

## [1.0.20]

### Added

#### Intelligent Large Range Handling
Work with large datasets efficiently, no matter how big your data gets.

**What's New:**
- **Smart Sampling**: Large ranges are automatically sampled to keep responses fast and accurate
- **Structure Detection**: AI identifies headers, row labels, data regions, and formula patterns
- **Representative Coverage**: Sampling captures the full picture of your data structure
- **Full Data for Narrow Ranges**: Smaller ranges return complete data automatically

**How It Helps You:**
- Analyze large datasets without manual range selection
- Get accurate insights across thousands of rows
- Maintain fast response times regardless of data size

---

## [1.0.19]

### Added

#### Copy, Move & Delete Operations
New tools for reorganizing your worksheet structure.

**What's New:**
- **Copy & Paste Range**: Copy data with automatic formula reference adjustment
- **Paste Special Options**: Paste values only, formats only, or formulas only
- **Move Range**: Cut and paste data while maintaining formula integrity
- **Delete Rows/Columns**: Remove single rows/columns, ranges, or non-contiguous selections

**How It Helps You:**
- Reorganize data layouts without breaking formula references
- Clean up worksheets by removing unnecessary rows or columns
- Duplicate data structures for templates or comparisons

---

## [1.0.18]

### Added

#### Financial Report Builder
Create professional hierarchical reports with a single request.

**What's New:**
- **Report Types**: Build P&L statements, budgets, and balance sheets automatically
- **Hierarchical Structure**: Support for nested categories with proper indentation
- **Automatic Formulas**: SUM formulas generated for category totals
- **Professional Styling**: Consistent formatting applied automatically

**How It Helps You:**
- Generate complex financial reports in seconds
- Maintain consistent formatting across all your reports
- Focus on analysis instead of manual report building

---

## [1.0.17]

### Added

#### Data Table Builder with Grouping
Create structured data tables with optional grouping and subtotals.

**What's New:**
- **Structured Tables**: Build organized tables with consistent column formatting
- **Automatic Grouping**: Group rows by any column with subtotal calculations
- **Calculated Columns**: Add columns with formulas that reference other columns
- **Data Consistency**: Column types ensure your data stays clean and uniform

**How It Helps You:**
- Quickly structure raw data into organized tables
- Add subtotals and groupings without complex formulas
- Create consistent table formats across your workbooks

---

## [1.0.16]

### Added

#### Smart Error Recovery
AI automatically retries and corrects when Excel operations fail.

**What's New:**
- **Pre-Flight Checks**: Operations validated before running in Excel
- **Automatic Retry**: AI corrects mistakes and tries again without you asking
- **Clear Feedback**: Helpful explanations when something can't be completed
- **Safe Cancellation**: When one step fails, dependent steps are safely stopped

**How It Helps You:**
- Fewer failed operations interrupting your workflow
- AI learns from errors and adjusts approach automatically
- Clear feedback when something can't be completed

---

## [1.0.15]

### Added

#### Format Without Overwriting
Apply formatting to existing cells without overwriting values.

**What's New:**
- **Rich Formatting**: Apply number formats, fonts, colors, and borders to any range
- **Non-Destructive**: Formatting applies without changing cell values
- **Flexible Targeting**: Format entire rows, columns, or specific cell ranges

**How It Helps You:**
- Style existing data without re-entering values
- Apply consistent formatting across large ranges
- Fine-tune cell appearance after data entry

---

## [1.0.14]

### Added

#### Excel Table Discovery
Ask the AI about existing Excel tables in your workbook.

**What's New:**
- **Find All Tables**: AI can list every Excel table in your worksheet
- **Table Details**: See table names, locations, column headers, and applied styles
- **Smart Table Operations**: AI can reference and work with your existing tables by name

**How It Helps You:**
- Quickly understand the structure of unfamiliar workbooks
- Reference tables by name instead of cell addresses
- Build on existing table structures without recreating them

---

## [1.0.13]

### Added

#### Worksheet Creation
Ask the AI to create new worksheets in your workbook.

**What's New:**
- **Create New Sheets**: AI can add new worksheets with custom names
- **Automatic Naming**: Sheets are named based on their purpose
- **Immediate Access**: New sheets are ready for data entry right away

**How It Helps You:**
- Organize data across multiple sheets without manual setup
- Let AI structure your workbook as it builds solutions
- Keep different data types separated automatically

---

## [1.0.12]

### Added

#### Smart Data Detection
AI automatically finds where your data lives in the worksheet.

**What's New:**
- **Used Range Detection**: AI identifies the boundaries of your data automatically
- **No Manual Selection**: Works without you specifying exact cell ranges
- **Header Recognition**: Distinguishes between headers and data rows

**How It Helps You:**
- Just say "analyze my data" without specifying A1:Z100
- AI understands your worksheet layout automatically
- Works with data of any size or position

---

## [1.0.11]

### Added

#### Core Excel Writing
AI can write values, formulas, and data directly to your worksheet.

**What's New:**
- **Write Values**: Place text, numbers, and dates in any cell or range
- **Write Formulas**: Create Excel formulas that calculate automatically
- **Bulk Operations**: Write entire tables or datasets in one operation
- **Format on Write**: Apply formatting as data is written

**How It Helps You:**
- Build spreadsheets through conversation instead of manual entry
- Create complex formulas without memorizing Excel syntax
- Populate templates with data automatically

---

## [1.0.10]

### Added

#### Core Excel Reading
AI can see and understand the contents of your worksheet.

**What's New:**
- **Read Cell Values**: AI sees text, numbers, dates, and formatted values
- **Read Formulas**: AI understands your calculation logic, not just results
- **Read Formatting**: AI recognizes number formats, colors, and styles
- **Range Flexibility**: Read single cells, rows, columns, or entire regions

**How It Helps You:**
- Ask questions about your data and get accurate answers
- AI understands your existing formulas and can extend them
- No need to copy/paste data—AI reads directly from Excel
