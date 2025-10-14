# Troubleshooting Guide

This comprehensive troubleshooting guide helps you quickly identify and resolve common issues with HyperPerfect's chat system, Excel integration, and mathematical operations.

## Quick Diagnosis Guide

### 🚨 Emergency Quick Fixes

**System Not Responding**:
```
1. Press Escape to stop current operation
2. Refresh the Excel add-in (reload task pane)
3. Check authentication status in chat header
4. Restart Excel if issues persist
```

**Excel Operations Failing**:
```
1. Verify you have data selected in Excel
2. Check range syntax (A1:D10, not A1-D10)
3. Ensure Excel sheet is not protected
4. Try smaller data ranges first
```

**Authentication Problems**:
```
1. Sign out and back into Office 365
2. Check network connectivity
3. Clear browser cache if using Excel Online
4. Contact IT for Office permissions issues
```

### Connection Timeout Issues

**Symptom**: Operations timing out or hanging indefinitely
**Causes**: Network latency, server overload, large data processing

**Solutions**:
1. **Reduce Operation Size**:
   - Work with smaller Excel ranges (< 1000 cells)
   - Break complex operations into smaller steps

2. **Network Optimization**:
   - Close unnecessary browser tabs
   - Check for network connectivity issues
   - Try operations during off-peak hours

3. **Operation Recovery**:
   ```
   "Stop current operation and start over"
   "Reset Excel context and try again"
   "Break this into smaller operations"
   ```

## Excel Integration Issues

### Excel Range and Selection Problems

**Problem**: "Range not found" or "Invalid range" errors

**Common Causes**:
- Incorrect range syntax (A1-D10 instead of A1:D10)
- Selecting empty cells or non-contiguous ranges
- Excel sheet protection preventing access
- Named ranges that don't exist

**Solutions**:

1. **Range Syntax Verification**:
   ```
   ✅ Correct: "A1:D10", "B2:F20"
   ❌ Wrong: "A1-D10", "A1 to D10"
   
   ✅ Correct: Select contiguous range in Excel
   ❌ Wrong: Select multiple separate ranges
   ```

2. **Selection Verification**:
   - Verify selection highlights the intended cells
   - Check that selection contains data, not empty cells
   - Ensure you're on the correct worksheet

3. **Sheet Protection Issues**:
   - Unprotect Excel sheet temporarily for operations
   - Check if specific ranges are locked

**Diagnostic Steps**:
```
"Check my current Excel selection"
"What data is in range A1:D10?"
"Show me the available ranges on this sheet"
```

### Data Type and Format Issues

**Problem**: Excel operations fail due to data type mismatches

**Common Scenarios**:
- Numbers stored as text prevent mathematical operations
- Date formatting issues in data processing  
- Mixed data types in ranges cause tool failures
- Special characters or formulas in data cells

**Solutions**:

1. **Data Cleaning**:
   - Convert text numbers to actual numbers in Excel
   - Use consistent date formats throughout ranges
   - Remove special characters from text data
   - Replace formulas with values for processing

2. **Type Validation**:
   ```
   "Check data types in the selected range"
   "Convert text numbers to numeric values"
   "Show me any data formatting issues"
   ```

3. **Preprocessing Steps**:
   - Clean data in Excel before AI processing
   - Use Excel's Data > Text to Columns for formatting
   - Apply Number formatting to numeric columns
   - Remove empty rows/columns from selections

### Chart Creation Problems

**Problem**: Charts not creating or appearing incorrectly

**Causes**:
- Non-numeric data selected for charts
- Missing headers or labels
- Too much data for effective visualization
- Inappropriate chart type for data structure

**Solutions**:

1. **Data Preparation**:
   - Ensure selected data contains numeric values
   - Include headers in first row/column
   - Limit to reasonable data size (< 50 categories for pie charts)
   - Remove empty cells from selection

2. **Chart Type Selection**:
   ```
   Column charts: For comparing categories
   Line charts: For showing trends over time
   Pie charts: For parts of a whole (< 8 categories)
   Bar charts: For long category names
   ```

3. **Troubleshooting Commands**:
   ```
   "Why didn't my chart create properly?"
   "Show me the data structure for chart creation"
   "What chart type works best for this data?"
   ```

### Precision and Rounding Issues

**Problem**: Mathematical results showing unexpected precision or rounding

**Examples**:
```
0.1 + 0.2 = 0.30000000000000004 (floating point precision)
Large calculations showing scientific notation
Rounding differences in repeated calculations
```

**Understanding and Solutions**:

1. **Floating Point Limitations**:
   - Computer math has inherent precision limits
   - Results are automatically rounded to 6 decimal places
   - Very large or very small numbers may use scientific notation

2. **Workarounds**:
   ```
   "Round this result to 2 decimal places"
   "Express this in standard notation instead of scientific"
   "What's the precision limit for calculations?"
   ```

3. **Best Practices**:
   - Use appropriate precision for your context (financial: 2 decimals, scientific: more)
   - Understand that minor precision differences are normal
   - For exact fractional calculations, consider using specialized tools

## Interface and Performance Issues

### Streaming and Display Problems

**Problem**: Text not appearing, choppy streaming, or interface freezing

**Symptoms**:
- Messages not appearing in chat
- Partial text display
- Interface elements missing or overlapping
- Slow response to user interactions

**Solutions**:

1. **Excel Add-in Refresh**:
   - Reload the HyperPerfect task pane
   - Close and reopen the task pane
   - Restart Excel application
   - Check Excel add-in is enabled

2. **Network and Performance**:
   - Check internet connectivity stability
   - Reduce browser zoom level if display issues occur
   - Close other applications using memory/CPU
   - Try operations during off-peak hours

**Recovery Commands**:
```
"Reset the chat interface"
"Clear conversation and start fresh"
"Test basic functionality"
```

### Memory and Context Issues

**Problem**: Context utilization reaching 90-100% or memory-related errors

**Symptoms**:
- Context indicator showing red (90-100%)
- "Memory limit exceeded" error messages
- Slow performance with complex requests
- AI responses becoming less relevant

**Solutions**:

1. **Immediate Actions**:
   ```
   "Clear conversation history and start fresh"
   "Reset Excel context cache"
   "Start a new conversation session"
   ```

2. **Prevention Strategies**:
   - Monitor context utilization regularly
   - Use concise, specific requests
   - Avoid unnecessary conversation history
   - Clear context proactively before major operations

3. **Optimization Techniques**:
   - Ask focused questions rather than broad explorations
   - Use batch operations to minimize context usage
   - Start fresh conversations for unrelated tasks
   - Combine related requests into single messages

## Error Messages and Resolution

### Common Error Messages

**"Authentication failed" or "Token expired"**:
- **Solution**: Sign out and back into Office 365, clear browser cache
- **Prevention**: Keep Office session active, avoid long idle periods

**"Range not found" or "Invalid Excel range"**:
- **Solution**: Verify Excel selection, check range syntax (A1:D10)
- **Prevention**: Always select ranges in Excel before operations

**"Division by zero" or "Invalid mathematical expression"**:
- **Solution**: Check mathematical expressions for zero denominators
- **Prevention**: Validate expressions before complex calculations

**"Insufficient balance" or "Account limit exceeded"**:
- **Solution**: Contact help@hyperactive.ai for account management
- **Prevention**: Monitor usage, purchase additional credits as needed

**"Tool execution failed" or "Operation timeout"**:
- **Solution**: Reduce operation complexity, try smaller data ranges
- **Prevention**: Work with manageable data sizes, use batch operations

### Best Practices for Optimal Performance

**Excel Operations**:
1. **Select specific ranges** rather than entire columns/sheets
2. **Disable formatting** for read operations on large datasets
3. **Work with manageable data sizes** (< 1000 cells optimal)

**Mathematical Operations**:
1. **Break complex expressions** into smaller, manageable parts
2. **Validate data types** before statistical analysis
3. **Use appropriate precision** for your specific needs
4. **Cache intermediate results** for reuse in related calculations

**Interface Usage**:
1. **Monitor context utilization** and clear when needed
2. **Use specific, focused requests** rather than broad questions
3. **Allow operations to complete** before starting new ones
4. **Close unused browser tabs** for better performance

### System Resource Management

**Memory Optimization**:
- Start fresh conversations for unrelated tasks
- Clear Excel context cache after major data changes
- Monitor context indicator and stay below 80%
- Use batch operations to reduce context overhead

**Network Optimization**:
- Ensure stable internet connection
- Work during off-peak hours for better response times
- Reduce operation complexity if experiencing timeouts
- Use wired connection instead of Wi-Fi when possible

**Excel Application Optimization**:
- Close unnecessary Excel workbooks
- Disable unnecessary Excel add-ins temporarily
- Save work frequently to prevent data loss
- Restart Excel periodically during long sessions

## Getting Additional Help

### Self-Service Diagnostics

**Information Gathering Commands**:
```
"Show me system information and current status"
"What capabilities are currently available?"
"Test basic functionality and report results"
"Show me recent error history"
```

**Documentation Resources**:
- **Getting Started**: [getting-started.md](getting-started.md) for basic setup
- **Excel Integration**: [excel-integration.md](excel-integration.md) for detailed Excel help

### Technical Support Escalation

**When to Contact Support**:
- Authentication issues persist after standard troubleshooting
- Consistent errors with specific Excel operations
- Performance problems that don't resolve with optimization
- Account or billing questions

**Information to Provide**:
1. **Error Description**: Specific error messages and when they occur
2. **Environment Details**: Excel version, browser, operating system
3. **Reproduction Steps**: Exact steps to reproduce the issue
4. **Recent Changes**: Any recent system or configuration changes
5. **Frequency**: How often the issue occurs

**Support Contact**:
- **Email**: help@hyperactive.ai
- **Include**: Screenshots of error messages when possible
- **Priority**: Clearly indicate if issue blocks critical work

### Community and Documentation

**Internal Resources**:
- **System Documentation**: `/src/docs/core/` for technical details
- **Implementation Guides**: `/src/docs/processes/` for setup help
- **Architecture Information**: `/src/docs/architecture/` for advanced topics

**Best Practice Sharing**:
- Document successful workflows for team sharing
- Create templates for common operations
- Share optimization techniques with colleagues
- Report bugs and enhancement suggestions

---

**Quick Reference Card**: 
- **Emergency Stop**: Escape key
- **Fresh Start**: "Clear conversation and start over"
- **Excel Issues**: Check selection, verify range syntax
- **Auth Problems**: Sign out/in to Office 365
- **Performance**: Monitor context, use batch operations
- **Support**: help@hyperactive.ai with detailed error information