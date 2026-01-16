# Troubleshooting Guide

This guide helps you resolve common issues with HyperPerfect. For most problems, the quick fixes at the top will get you back on track.

---

## Quick Fixes

### AI Not Responding

1. **Press Escape** to cancel the current request
2. **Check your internet connection**
3. **Reload the add-in** - right-click the task pane and select "Reload"
4. If issues persist, restart Excel

### Excel Operations Failing

1. **Select cells first** - the AI needs to know what data to work with
2. **Check you're on the right worksheet** - the AI works on the active sheet
3. **Unprotect the sheet** if it's protected (Review > Unprotect Sheet)
4. **Try a smaller range** - very large selections can cause issues

### Can't Sign In

1. **Sign out of Office 365** and sign back in
2. **Check your internet connection**
3. **Clear browser cache** if using Excel Online
4. Contact your IT department if your organization restricts add-ins

---

## Account Issues

### Trial Expired

Your 30-day free trial has ended. You'll see an "Trial Expired" message when opening HyperPerfect.

**To continue using HyperPerfect:**
- Contact [help@hyperperfect.ai](mailto:help@hyperperfect.ai) to upgrade your account
- Your conversation history is preserved and will be available after upgrading

### Account Cancelled

If your account has been cancelled, you'll see an "Account Cancelled" message.

**To restore access:**
- Contact [help@hyperperfect.ai](mailto:help@hyperperfect.ai) to reactivate your account

---

## Context and Memory

The context indicator shows how much of the AI's memory is being used. When it gets too full, the AI may lose track of earlier parts of your conversation.

### Understanding the Context Indicator

| Color | Percentage | What to Do |
|-------|------------|------------|
| Green | 0-70% | No action needed |
| Orange | 70-85% | Consider using @compact |
| Red | 85%+ | System will auto-compact |

### What is @compact?

The `@compact` command summarizes your conversation history to free up memory while preserving important context. Use it when:
- The context indicator turns orange
- The AI seems to forget earlier instructions
- You want to continue a long conversation

### Automatic Compaction

When context reaches 85%, HyperPerfect automatically compacts your conversation. You'll see a message like "Auto-compacted 15 messages (12,000 tokens)." This is normal and preserves your work.

### Starting Fresh

Use `@clear` to delete all messages and start a completely new conversation. This is useful when:
- Switching to an unrelated task
- The AI seems confused about what you're working on
- You want a clean slate

---

## File Upload Issues

### Supported Files

| Type | Formats | Size Limit |
|------|---------|------------|
| Images | PNG, JPEG, GIF, WebP | 5 MB each |
| Documents | PDF | 32 MB, 100 pages max |

### Common Upload Errors

**"Unsupported file type"**
- Only image and PDF files are supported
- Convert other documents to PDF first

**"File exceeds size limit"**
- Compress images or split large PDFs
- For PDFs over 100 pages, upload sections separately

**"Upload failed"**
- Check your internet connection
- Try uploading the file again
- If the problem persists, try a smaller file

---

## Excel Error Codes

When an Excel operation fails, you may see an error code. Here's what they mean and how to fix them:

### ITEM_NOT_FOUND

**What it means:** The AI tried to access a sheet or range that doesn't exist.

**How to fix:**
- Make sure you're on the correct worksheet
- Check that the range the AI mentioned actually exists
- If a sheet was renamed or deleted, let the AI know

### ACCESS_DENIED

**What it means:** The sheet or range is protected.

**How to fix:**
- Go to Review > Unprotect Sheet
- Enter the password if required
- Try the operation again

### INVALID_OPERATION_IN_CELL_EDIT_MODE

**What it means:** You're currently editing a cell (cursor is in the formula bar).

**How to fix:**
- Press Escape or Enter to exit cell editing mode
- Try the operation again

### MERGED_RANGE_CONFLICT

**What it means:** The AI tried to work with merged cells, which have restrictions.

**How to fix:**
- Unmerge the cells (Home > Merge & Center > Unmerge Cells)
- Or ask the AI to work with a different range

### FILTERED_RANGE_CONFLICT

**What it means:** The range has filters applied that prevent the operation.

**How to fix:**
- Clear filters (Data > Clear)
- Try the operation again
- Reapply filters afterward if needed

### RANGE_EXCEEDS_LIMIT

**What it means:** The selected range is too large (over 5 million cells).

**How to fix:**
- Work with smaller sections of data
- Ask the AI to process the data in batches

### MEMORY_LIMIT_REACHED

**What it means:** Excel ran out of memory for this operation.

**How to fix:**
- Close other Excel workbooks
- Close other applications
- Work with smaller data ranges
- Restart Excel if the problem persists

### INACTIVE_WORKBOOK

**What it means:** The workbook isn't active or has been closed.

**How to fix:**
- Click on the workbook to make it active
- Reopen the workbook if it was closed
- Make sure you're working in the correct Excel window

---

## Cancelling Requests

### How to Cancel

- **Click the stop button** (square icon) that appears during processing
- **Press Escape** on your keyboard

### What Happens When You Cancel

- The AI stops immediately
- Any Excel operations already completed are kept
- Pending operations are cancelled
- You can continue the conversation or start a new request

---

## Performance Tips

### For Best Results

1. **Be specific** - "Add a SUM formula in cell E10" works better than "add some totals"
2. **Select data first** - highlight the cells you want to work with before asking
3. **Work in steps** - break complex tasks into smaller requests
4. **Use @compact** proactively - don't wait until the context is full

### Large Data Sets

When working with large amounts of data:
- Select only the rows/columns you need
- Ask the AI to work with specific ranges rather than entire columns
- The AI automatically samples very large ranges to stay within limits

### Slow Performance

If HyperPerfect feels slow:
- Check your internet connection
- Close unnecessary browser tabs and applications
- Restart Excel
- Try during off-peak hours if your organization has many users

---

## Getting Help

### Before Contacting Support

1. Try the quick fixes at the top of this guide
2. Note any error messages you see
3. Take a screenshot if possible

### Contact Support

**Email:** [help@hyperperfect.ai](mailto:help@hyperperfect.ai)

**Include in your message:**
- What you were trying to do
- What error message you saw (exact text or screenshot)
- Your Excel version (File > Account > About Excel)
- Whether the issue happens every time or occasionally

### Schedule a Demo

Need hands-on help? [Schedule a 30-minute session](https://calendly.com/di-hyperperfect/30min) with our team.

---

## Quick Reference

| Problem | Solution |
|---------|----------|
| AI not responding | Press Escape, check internet, reload add-in |
| Can't edit cells | Exit cell edit mode (press Escape), unprotect sheet |
| Context full | Use @compact or @clear |
| Upload failing | Check file type and size limits |
| Slow performance | Close other apps, restart Excel |
| Trial expired | Contact help@hyperperfect.ai |

---

**Still stuck?** Email [help@hyperperfect.ai](mailto:help@hyperperfect.ai) - we're happy to help.
