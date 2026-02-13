---
title: "Quick Start Guide"
description: "Transform your Excel workflow in 5 minutes. Install the add-in and start chatting with AI inside Excel."
order: 1
category: "Getting Started"
---

**What You'll Experience:**
- Chat naturally - "Add a sum total row" or "Create a summary table"
- Instant results - AI reads and writes to your Excel sheet in real-time
- Smart assistance - Track the AI's thinking process as it works
- Supercharge Excel tasks - Checking analyses, cleaning data, building models, and more
- Iterative refinement - Follow up to adjust and build upon your work in real time

## Get Started

### Step 1: Install the Excel Add-in (2 minutes)

**You can start using HyperPerfect immediately** - no signup required. Just install the add-in and open it in Excel. You'll sign in automatically through your Microsoft account.

**For Individual Users & Home Use:**

#### Microsoft AppSource Store Download (Recommended)

Install directly from the Microsoft AppSource store:

[Get HyperPerfect on AppSource](https://marketplace.microsoft.com/en-us/product/saas/wa200008526)

#### Windows Desktop

1. Open **Excel Desktop**
2. Click **Home** → **Add-ins** (or **File > Get Add-ins** in some versions)
3. Search for **"HyperPerfect"**
4. Click **Add**
5. You'll see the HyperPerfect panel appear in Excel

#### Mac Desktop

1. Open **Excel Desktop**
2. Click **Tools** > **Excel Add-ins**
3. Search for **"HyperPerfect"** in the Office Store
4. Click **Get**
5. Grant any requested permissions
6. You'll see the HyperPerfect panel appear in the sidebar

#### Excel Online (Office 365 Web)

1. Open **Excel Online** in your browser (office.com)
2. Open or create a spreadsheet
3. Click **Home** → **Add-ins**
4. Select the **Store** tab and search for **"HyperPerfect"**
5. Click **Add**
6. HyperPerfect will appear in the task pane on the right

**Note:** Excel Online works on any browser (Chrome, Edge, Safari, Firefox) on any device. Changes sync automatically to your OneDrive or SharePoint.

**For Company/Enterprise Users:**

If you're using Excel at work:

1. **Check if it's already installed** - HyperPerfect might already be deployed by your IT department. Look in the **Add-ins** menu to see if it's there.
2. **If you don't see it** - Contact your IT department and request they install HyperPerfect. You can point them to the IT Admin Instructions below.
3. **Work Microsoft accounts** - Installation happens through your work Microsoft account automatically.
4. **All platforms supported** - Your IT department can deploy to Windows, Mac, and web (Excel Online).

**For IT Administrators:**

Use the [Microsoft 365 Admin Center](https://admin.microsoft.com/) for centralized deployment:

1. Go to **Settings** > **Integrated apps**
2. Click **Deploy Add-in**
3. Search for **"HyperPerfect"** in the Office Store
4. Specify who to deploy to (Everyone, specific users/groups, or just yourself)
5. Complete the deployment

**Important:** Add-ins can take **24-72 hours** to appear on users' ribbons after deployment.

### Step 2: Start Your First Chat (1 minute)

1. **Open HyperPerfect** - the AI chat opens automatically after sign-in
2. **Type a request** like "Analyze this data and create a summary table"
3. **Watch the magic** as the AI reads your data and creates the summary
4. **Use @ commands** to access additional features (see below)

---

## Understanding the Interface

Once you're signed in, the AI chat interface opens with these components:

### Messages Area

- **Your messages** appear with a white background
- **AI responses** appear with no background
- **System messages** appear in gray (mode changes, notifications)
- **Thinking blocks** show the AI's reasoning process (click to expand)
- **Tool cards** show which Excel operations the AI performed with lots of context

### Input Area

- **Send button** to submit messages
- **Stop button** Send button turns red during process and can be used to abort process (also works with Esc key)
- **@ button** opens the command menu (also opens automatically if you type "@" in chat)
- **Attach button** for uploading files
- **Mode button** shows current AI mode (Smart or Fast)
- **Clear button** resets the conversation
- **Help button** opens documentation

### Context Indicator

The context indicator shows how much of the AI's working memory is in use. Think of it like a whiteboard: AI can only hold so much information at once. The longer your conversation, the more of that whiteboard fills up — and when it's full, AI loses access to earlier details and becomes less accurate.

**Keeping context low is one of the most impactful things you can do to improve AI performance.** A fresh conversation with focused instructions will dramatically outperform a long, sprawling one.

| Color | Percentage | What to Do |
|-------|------------|------------|
| **Green** | 0-70% | No action needed |
| **Orange** | 70-85% | Consider using **@compact** or starting fresh with **@clear** |
| **Red** | 85%+ | System will auto-compact to free memory |

When auto-compact triggers, HyperPerfect summarizes your conversation history into a concise handoff and starts a new conversation. The high-level context (what you were working on, what's been done) is preserved, but specific details from earlier messages will be lost.

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Send message | **Enter** |
| New line in message | **Shift + Enter** |
| Cancel AI request | **Escape** |
| Open @ menu | Type **@** |
| Navigate @ menu | **Arrow Up/Down** |
| Select @ command | **Enter** |
| Close @ menu | **Escape** |

---

## @ Commands

Type **@** or click the @ button to access these commands:

| Command | What it does |
|---------|--------------|
| **@clear** | Delete all messages and start fresh |
| **@compact** | Free up memory by summarizing old messages |
| **@mode** | Toggle between Fast (Haiku) and Power (Sonnet) AI models |
| **@attach** | Upload files (images or PDFs) for the AI to analyze |
| **@help** | Open the help documentation |

---

## Your First Conversation

### Example Requests

Try these with any Excel data:

**Data Analysis:**
```
"Add FY columns to this monthly income statement"
```

**Report Creation:**
```
"Create a professional summary table from this data"
```

**Formatting:**
```
"Format this data table with borders and colors"
```

**Calculations:**
```
"Add a row with sum totals at the bottom"
```

---

## How the AI Works with Excel

### 1. Planning is key

**Before asking HyperPerfect to execute on tasks:**

1. AI can't read your mind, and does much better when it has lots of context. Spend a prompt or two telling it what you want and asking it to come up with a plan. Once agreed, then you can ask it to move forward.
2. DO NOT expect AI to magically build huge spreadsheets in one shot. Experts know that AI does best with manageable, discrete tasks. Iteration is your friend.
3. HyperPerfect will naturally focus on your current sheet, but can see others as well. If you want it to focus on certain data, refer to it specifically and/or highlight it before entering your prompt.

### 2. Ask Naturally

**The AI understands requests like:**

- "What patterns do you see in this data?"
- "Create a summary table showing sales by region"
- "Add a yellow background to highlight values over 100"
- "Add a year-over-year growth column using formulas"
- "Create a professional P&L statement from this data"

### 3. Watch the AI Work

**You'll see:**

1. **Thinking blocks** showing the AI's reasoning process
2. **Tool cards** showing Excel operations as they happen
3. **Real-time results** appearing directly in your Excel workbook
4. **Stop button** - click anytime to pause and redirect the AI

### 4. Refine and Iterate

**Continue the conversation:**

- "Now add summary period columns showing quarterly results"
- "Redo the formulas to show average instead of median"
- "Make the formatting better"
- "Double-check all the formulas"

The AI remembers context and builds on previous work until you clear the conversation.

---

## File Attachments

You can upload files for the AI to analyze alongside your Excel data:

**Supported formats:**
- **Images**: PNG, JPEG, GIF, WebP (max 5 MB each)
- **Documents**: PDF (max 32 MB, 100 pages)

**How to attach:**
1. Click the **paperclip icon** or use **@attach**
2. Or drag and drop files onto the chat
3. Attached files appear above the input box
4. Click **X** on any file to remove it from context

---

## Advanced Tips & Features

### Complex Multi-Step Tasks

**Make AI work better:**

- Ask HyperPerfect for the prompt to do the task you want
- Build up AI's context before allowing it to work
- Complete complex work in manageable steps

**Example request:**
```
"What would be a good prompt to have AI build a balance sheet with this data?"
```

### Context Memory

**The AI remembers:**

- Your previous questions in the conversation
- Data you've selected and worked with
- Formatting preferences you've expressed
- Analysis goals you've mentioned

**This enables natural follow-ups:**

- "Now do the same for last quarter"
- "Apply that to the entire dataset"
- "Create a similar chart for revenue"

### Managing Context

Every message you send and every response AI generates adds to the context window. As it fills up, AI performance degrades — it becomes more likely to make mistakes, forget instructions, or produce lower-quality output.

**Best practices:**

- **Start fresh often.** When you finish a task, use **@clear** before starting the next one. A clean slate gives AI the best chance of getting things right.
- **Use @compact** to preserve a summary of your work while freeing up space. This keeps the high-level context but drops the specifics.
- **Break big projects into focused sessions.** Instead of one long conversation that builds a full model, do it in steps: build the structure in one session, refine formulas in another.
- At **85% capacity**, the system will auto-compact automatically to prevent context overflow.

---

## Troubleshooting

### Quick Fixes

**AI not responding?**
- Check your internet connection
- Press Escape and try again
- Refresh the add-in panel

**Excel operations failing?**
- Make sure you've selected cells before asking
- Verify you're on the correct worksheet
- Check if the sheet is protected

**Unexpected results?**
- Be more specific in your request
- Provide additional context
- Break complex requests into smaller steps

For detailed troubleshooting, see the [Troubleshooting Guide](/help/troubleshooting).

### Getting Help

- **Email**: [help@hyperperfect.ai](mailto:help@hyperperfect.ai) - Direct help from our team
- **Training Session**: [Schedule a 30-min demo](https://calendly.com/di-hyperperfect/30min) - Personal walkthrough

**Feature Requests:** We want to build what you actually need. Email us with ideas for features, data challenges, and workflow improvements.

---

## What's Next?

### Practice with Your Own Data

**Start simple:**

1. Open a workbook with data you work with regularly
2. Select a small range to start
3. Ask the AI to analyze or visualize it
4. Build confidence with follow-up requests

### Master Advanced Techniques

**Ask the AI to teach you:**

- "Show me how to create a pivot table"
- "Explain this formula you just created"
- "What's the best way to visualize this data?"
- "How can I automate this task?"

The AI can be both your assistant and your Excel tutor.
