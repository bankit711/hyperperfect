---
title: "Troubleshooting"
description: "Resolve common issues with HyperPerfect. Quick fixes and detailed solutions for every problem."
order: 6
category: "Using HyperPerfect"
---

This guide helps you resolve common issues with HyperPerfect. For most problems, the quick fixes at the top will get you back on track.

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

Your 30-day free trial has ended. You'll see a "Trial Expired" message when opening HyperPerfect.

**To continue using HyperPerfect:**
- Contact [help@hyperperfect.ai](mailto:help@hyperperfect.ai) to upgrade your account
- Your conversation history is preserved and will be available after upgrading

### Account Cancelled

If your account has been cancelled, you'll see an "Account Cancelled" message.

**To restore access:**
- Contact [help@hyperperfect.ai](mailto:help@hyperperfect.ai) to reactivate your account

---

## Context and Memory

### Understanding the Context Indicator

| Color | Percentage | What to Do |
|-------|------------|------------|
| Green | 0-70% | No action needed |
| Orange | 70-85% | Consider using @compact |
| Red | 85%+ | System will auto-compact |

### What is @compact?

The `@compact` command summarizes your conversation history to free up memory while preserving important context. Use it when the context indicator turns orange or the AI seems to forget earlier instructions.

### Starting Fresh

Use `@clear` to delete all messages and start a completely new conversation. This is useful when switching to an unrelated task or when the AI seems confused.

---

## File Upload Issues

### Supported Files

| Type | Formats | Size Limit |
|------|---------|------------|
| Images | PNG, JPEG, GIF, WebP | 5 MB each |
| Documents | PDF | 32 MB, 100 pages max |

### Common Upload Errors

**"Unsupported file type"** - Only image and PDF files are supported. Convert other documents to PDF first.

**"File exceeds size limit"** - Compress images or split large PDFs.

**"Upload failed"** - Check your internet connection and try again.

---

## Excel Error Codes

### ITEM_NOT_FOUND
The AI tried to access a sheet or range that doesn't exist. Make sure you're on the correct worksheet and the range exists.

### ACCESS_DENIED
The sheet or range is protected. Go to Review > Unprotect Sheet, enter the password if required, and try again.

### INVALID_OPERATION_IN_CELL_EDIT_MODE
You're currently editing a cell. Press Escape or Enter to exit cell editing mode, then try again.

### MERGED_RANGE_CONFLICT
The AI tried to work with merged cells. Unmerge the cells (Home > Merge & Center > Unmerge Cells) or ask the AI to work with a different range.

### RANGE_EXCEEDS_LIMIT
The selected range is too large (over 5 million cells). Work with smaller sections or ask the AI to process in batches.

---

## Cancelling Requests

- **Click the stop button** (square icon) that appears during processing
- **Press Escape** on your keyboard

Any Excel operations already completed are kept. Pending operations are cancelled. You can continue the conversation immediately.

---

## Performance Tips

### For Best Results
1. **Be specific** - "Add a SUM formula in cell E10" works better than "add some totals"
2. **Select data first** - highlight the cells you want to work with before asking
3. **Work in steps** - break complex tasks into smaller requests
4. **Use @compact** proactively - don't wait until the context is full

### Slow Performance
- Check your internet connection
- Close unnecessary browser tabs and applications
- Restart Excel
- Try during off-peak hours if your organization has many users

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
