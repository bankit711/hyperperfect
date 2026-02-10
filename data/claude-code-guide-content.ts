// ─── Types ───────────────────────────────────────────────────────

export interface CodeBlock {
  language: string
  code: string
  filename?: string
  copyable?: boolean
}

export interface BranchChoice {
  label: string
  description: string
  icon: string
  goTo: string
}

export interface GuideStep {
  id: string
  title: string
  subtitle?: string
  content: string
  bulletPoints?: string[]
  code?: CodeBlock
  secondaryCode?: CodeBlock
  features?: { label: string; description: string; color: string; link?: string }[]
  promptTabs?: { id: string; label: string; items: { category: string; prompt: string }[] }[]
  placements?: { location: string; scope: string; example: string }[]
  servers?: { name: string; description: string; command: string }[]
  commandList?: { command: string; description: string }[]
  terminalMockup?: boolean
  choices?: BranchChoice[]
  nextStepId?: string
  infoPanel?: {
    triggerWord: string
    title: string
    paragraphs: string[]
  }
}

export interface GuideSection {
  id: string
  title: string
  subtitle: string
  color: string
  icon: string
  steps: GuideStep[]
}

export interface ResourceLink {
  title: string
  url: string
  description: string
  category: string
}

// ─── Section 1: Getting Started ──────────────────────────────────

const gettingStartedSteps: GuideStep[] = [
  {
    id: "gs-intro",
    title: "What is Claude Code?",
    subtitle: "The AI coding tool that lives in your terminal",
    content:
      "Claude Code is {Anthropic}'s agentic coding tool that lives on your desktop. Unlike chatbot interfaces, Claude Code is designed to \"do things\".",
    infoPanel: {
      triggerWord: "Anthropic",
      title: "About Anthropic",
      paragraphs: [
        "Anthropic is an AI safety company founded in 2021 by Dario and Daniela Amodei, former OpenAI executives, along with several other OpenAI researchers. The company is headquartered in San Francisco and has raised over $7 billion in funding.",
        "Anthropic's core differentiator is its safety-first approach to AI development. While OpenAI has pursued rapid commercialization, Anthropic has invested heavily in interpretability research \u2014 understanding what's happening inside AI models. Their Constitutional AI methodology trains models to be helpful, harmless, and honest without relying purely on human feedback.",
        "Claude, Anthropic's flagship model family, has become a serious competitor to OpenAI's GPT models. Claude consistently ranks at or near the top of independent benchmarks for coding, reasoning, and analysis tasks. Many enterprise users report that Claude produces more reliable, nuanced outputs \u2014 particularly for complex multi-step work.",
        "In the enterprise market, Anthropic has overtaken OpenAI. As of mid-2025, Claude holds 32% of enterprise LLM market share by usage versus OpenAI's 25% \u2014 a dramatic reversal from 2023 when OpenAI held 50%. In coding specifically, Claude commands 54% of the enterprise market. The company's revenue has surged from $1B in early 2025 to a $9B run rate by year-end, with 85% coming from over 300,000 business customers. Microsoft, Amazon (via AWS Bedrock), and Google Cloud are all major partners or customers.",
        "Anthropic's approach to model development emphasizes longer context windows (up to 200K tokens), stronger instruction following, and more consistent behavior across conversations. Their focus on developer tools like Claude Code reflects a strategy of building AI that integrates deeply into professional workflows rather than just answering questions.",
      ],
    },
    features: [
      { label: "Reads & Writes Files", description: "Originally meant for Python and other kinds of code-based files, but now handles MSFT Office, PDFs, and just about everything else.", color: "#4EC98B", link: "https://www.nytimes.com/2026/01/23/technology/claude-code.html?unlocked_article_code=1.IVA.pCM_.CM3FuHMnqb7n&smid=url-share" },
      { label: "Suddenly Web Savvy", description: "Newly released Chrome extension allows it to interact with Websites for you.", color: "#5B8DEF", link: "https://code.claude.com/docs/en/chrome" },
      { label: "Easy to Use, Hard to Master", description: "Not hard to get started and do some impressive tasks. Steep learning curve to max out performance. See how Claude Code's creator Boris Cherny actually uses it — running 5 parallel sessions, Plan Mode workflows, and custom slash commands.", color: "#9B6EE7", link: "https://twitter-thread.com/t/2007179832300581177" },
      { label: "Some Practical Capabilities", description: "Build a Website, update a PowerPoint Deck, book airlines reservations, send out a team of bots to topical research in parallel \u2013 the lists seems to be constantly growing everyday.", color: "#D47B2A", link: "https://www.youtube.com/watch?v=GepHGs_CZdk" },
    ],
  },
  {
    id: "gs-profile",
    title: "How do you want to use it?",
    subtitle: "Choose your mode",
    content: "Claude Code comes in two flavors. Neither requires any coding experience to get started \u2014 but they feel very different. Read both options and pick the one that sounds right for you.",
    choices: [
      {
        label: "Hardcode Mode",
        description: "Uses the \"terminal\" \u2014 the black screen where you type commands. More powerful, but you'll need to learn a few basics first. Absolutely doable for non-engineers.",
        icon: "terminal",
        goTo: "gs-install-terminal",
      },
      {
        label: "Easy Mode",
        description: "A regular app you download or open in your browser. Feels like any other program on your computer. The fastest way to get started with zero learning curve.",
        icon: "lightbulb",
        goTo: "gs-install-easy",
      },
    ],
  },
  {
    id: "gs-install-terminal",
    title: "Hardcode Mode: Terminal",
    subtitle: "What kind of computer are you on?",
    content: "The install process is slightly different depending on your computer. Pick yours:",
    choices: [
      {
        label: "Mac",
        description: "macOS — MacBook, iMac, Mac Mini, etc.",
        icon: "apple",
        goTo: "gs-install-mac",
      },
      {
        label: "Windows",
        description: "Windows 10 or 11 — most PCs and laptops.",
        icon: "windows",
        goTo: "gs-install-windows",
      },
    ],
  },
  {
    id: "gs-install-mac",
    title: "Install on Mac",
    subtitle: "Two steps and you're done",
    nextStepId: "gs-after-install",
    content: "First, open your terminal. Press Cmd + Space to open Spotlight, type \"Terminal\", and hit Enter. You'll see a window with a blinking cursor — that's where you'll paste the command below.",
    code: {
      language: "bash",
      code: `curl -fsSL https://claude.ai/install.sh | sh`,
      filename: "Paste this into Terminal and hit Enter",
    },
    secondaryCode: {
      language: "text",
      code: `Setting up Claude Code...

✔ Claude Code successfully installed!

  Version:  2.x.x
  Location: ~/.local/bin/claude

  Next: Run claude --help to get started

✅ Installation complete!`,
      filename: "You should see something like this when it's done",
      copyable: false,
    },
    bulletPoints: [
      "Once you see \"Installation complete!\" — you're all set. Click Next below to continue.",
      "If you see a \"command not found\" error, close the terminal window, open a new one, and try again.",
    ],
  },
  {
    id: "gs-install-windows",
    title: "Install on Windows",
    subtitle: "Two steps and you're done",
    nextStepId: "gs-after-install",
    content: "First, open PowerShell. Press the Windows key, type \"PowerShell\", and hit Enter. You'll see a blue window with a blinking cursor — that's where you'll paste the command below.",
    code: {
      language: "bash",
      code: `irm https://claude.ai/install.ps1 | iex`,
      filename: "Paste this into PowerShell and hit Enter",
    },
    secondaryCode: {
      language: "text",
      code: `Setting up Claude Code...

✔ Claude Code successfully installed!

  Version:  2.x.x
  Location: ~/.local/bin/claude

  Next: Run claude --help to get started

✅ Installation complete!`,
      filename: "You should see something like this when it's done",
      copyable: false,
    },
    bulletPoints: [
      "Once you see \"Installation complete!\" — you're all set. Click Next below to continue.",
      "If you see an error about execution policies, try running PowerShell as Administrator (right-click → Run as Administrator).",
    ],
  },
  {
    id: "gs-after-install",
    title: "Finding Your Folder",
    subtitle: "Navigate to where you want to work",
    content: "Claude Code works inside whatever folder you're in. Think of it like opening a document — you need to tell the terminal which folder to look at first. Here are the only commands you'll need:",
    commandList: [
      { command: "pwd", description: "\"Print Working Directory\" — shows you where you currently are. Run this anytime you're lost." },
      { command: "ls", description: "\"List\" — shows all the files and folders inside your current location." },
      { command: "cd Desktop", description: "\"Change Directory\" — moves you into a folder. Replace \"Desktop\" with any folder name you see from ls." },
      { command: "cd ..", description: "Moves you up one level (back to the parent folder)." },
      { command: "cd ~/Desktop/my-project", description: "Jump straight to a folder. The ~ means \"my home folder.\" Replace the path with yours." },
    ],
  },
  {
    id: "gs-launch",
    title: "Launch Claude Code",
    subtitle: "You're ready to go",
    nextStepId: "gs-first-session",
    content: "Once you're in the folder you want to work in, just type \"claude\" and hit Enter. That's it.",
    code: {
      language: "bash",
      code: `claude`,
      filename: "Type this and hit Enter",
    },
    bulletPoints: [
      "First time? Claude will ask you to sign in with your Anthropic account — just follow the link it gives you.",
      "Claude reads all the files in your current folder, so it understands your project right away.",
      "Type your request in plain English. No coding syntax needed — just tell it what you want.",
      "Use Shift+Tab to toggle Plan Mode, which lets Claude think through complex tasks step by step before acting.",
      "Type /help at any time to see available commands.",
    ],
  },
  {
    id: "gs-install-easy",
    title: "Easy Mode: Desktop & Web",
    subtitle: "No terminal required",
    content: "Don't want to touch the command line? Claude Code is also available as a desktop app and directly in your browser. Same AI, friendlier interface.",
    bulletPoints: [
      "Desktop app — Download from claude.com/download for Mac or Windows. Works like any other app on your computer.",
      "Web version — Go to claude.ai and sign in. Claude Code runs right in your browser, no install needed.",
      "Both versions can read and create files, generate code, build documents, and more.",
      "The desktop and web versions are the easiest way to get started if you've never used a terminal before.",
    ],
    code: {
      language: "text",
      code: `Desktop: claude.com/download
Web:     claude.ai`,
    },
  },
  {
    id: "gs-first-session",
    title: "Your First Session",
    subtitle: "Try these prompts to get started",
    terminalMockup: true,
    content: "This is what Claude Code looks like when you launch it. Just type what you want and hit Enter. Try one of these prompts to get started:",
    promptTabs: [
      {
        id: "explore",
        label: "Explore",
        items: [
          { category: "Explore", prompt: "Read the files in this project and give me a summary of the codebase" },
          { category: "Explore", prompt: "What does the main entry point do? Walk me through the logic." },
        ],
      },
      {
        id: "build",
        label: "Build",
        items: [
          { category: "Build", prompt: "Add a /health endpoint that returns the server status and uptime" },
          { category: "Build", prompt: "Write unit tests for the UserService class using Jest" },
        ],
      },
      {
        id: "fix",
        label: "Fix",
        items: [
          { category: "Fix", prompt: "There's a bug where login fails after session timeout — find and fix it" },
          { category: "Fix", prompt: "The API returns 500 on empty input — add proper validation" },
        ],
      },
      {
        id: "data",
        label: "Data",
        items: [
          { category: "Data", prompt: "Read sales_data.csv and summarize columns, types, and data quality issues" },
          { category: "Data", prompt: "Calculate month-over-month revenue growth and flag months with >20% decline" },
        ],
      },
    ],
  },
  {
    id: "gs-modes",
    title: "Modes & Tips",
    subtitle: "Get more out of Claude Code",
    content: "Claude Code has several modes that help you work more effectively. Here are the key ones:",
    bulletPoints: [
      "Plan Mode (Shift+Tab) — Claude thinks through a problem before writing code. Great for multi-file changes.",
      "Extended Thinking — Claude shows its reasoning for complex problems. Activates automatically when needed.",
      "Headless Mode — Run Claude non-interactively from scripts or CI/CD with the -p flag.",
    ],
    code: {
      language: "bash",
      code: `# Headless mode example
claude -p "Analyze sales.csv: compute monthly growth rates, flag anomalies, save results to report.md"`,
    },
  },
]

// ─── Section 2: CLAUDE.md, Skills & MCP ──────────────────────────

const powerFeaturesSteps: GuideStep[] = [
  {
    id: "pf-claudemd",
    title: "CLAUDE.md — Persistent Context",
    subtitle: "Onboarding docs for your AI assistant",
    content:
      "CLAUDE.md is a special file written in [Markdown](https://www.markdownguide.org/getting-started/) that Claude reads automatically at the start of every session. It gives Claude persistent context about your project — coding standards, data schemas, business rules, and conventions.",
    placements: [
      {
        location: "~/.claude/CLAUDE.md",
        scope: "Global — applies to all projects",
        example: "Your preferred coding style, commit conventions, general rules",
      },
      {
        location: "PROJECT_ROOT/CLAUDE.md",
        scope: "Project — applies to this repo",
        example: "Architecture overview, tech stack, deployment process",
      },
      {
        location: "any-subdirectory/CLAUDE.md",
        scope: "Directory — applies to files in that folder",
        example: "Feature-specific patterns, API conventions for a module",
      },
    ],
    code: {
      language: "markdown",
      filename: "CLAUDE.md",
      code: `# My Project

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS for styling
- Postgres with Prisma ORM

## Conventions
- Use async/await, never .then() chains
- All API routes return { data, error } shape
- Tests go next to source files as *.test.ts
- Commits use conventional format: feat(scope): msg

## Data Schema
- users table: id, email, name, created_at
- orders table: id, user_id, amount, status, created_at
- Fiscal year starts April 1
- All currency in USD`,
    },
  },
  {
    id: "pf-customize",
    title: "What do you want to customize?",
    subtitle: "Choose your area of interest",
    content: "Claude Code is deeply customizable. Pick the area you want to explore:",
    choices: [
      {
        label: "Project Rules",
        description: "Set coding standards, conventions, and context with CLAUDE.md",
        icon: "fileText",
        goTo: "pf-claudemd-deep",
      },
      {
        label: "Slash Commands",
        description: "Create reusable custom commands (Skills)",
        icon: "terminal",
        goTo: "pf-skills",
      },
      {
        label: "Plugins",
        description: "Connect databases, APIs, and tools via MCP servers",
        icon: "puzzle",
        goTo: "pf-mcp",
      },
    ],
  },
  {
    id: "pf-claudemd-deep",
    title: "CLAUDE.md Deep Dive",
    subtitle: "Make Claude an expert on your project",
    content:
      "The more context you give Claude in CLAUDE.md, the better it performs. Include your tech stack, naming conventions, architectural patterns, and even business rules. Here's what works well:",
    bulletPoints: [
      "Start with your tech stack and frameworks",
      "List coding conventions (naming, formatting, patterns)",
      "Include data schemas and business rules",
      "Add deployment and testing instructions",
      "Keep it concise — think onboarding cheat sheet, not a novel",
      "Use multiple CLAUDE.md files across subdirectories — Claude has a limited context window (its working memory), so splitting context into folder-level files means it only loads what's relevant to the code it's currently working on. A large project might have a root CLAUDE.md for overall architecture, plus separate ones in /api, /frontend, /database, etc. for domain-specific rules. This scales far better than one massive file.",
    ],
    code: {
      language: "markdown",
      filename: "CLAUDE.md",
      code: `# Revenue Analytics App

## Stack
- Python 3.12, FastAPI, SQLAlchemy
- PostgreSQL 16, Redis for caching
- React 18 with TypeScript frontend

## Rules
- All money values stored as integers (cents)
- Date ranges always inclusive on both ends
- API errors return { error: string, code: number }
- Never delete data — use soft deletes (deleted_at)

## Testing
- pytest with fixtures in conftest.py
- Integration tests use a test database
- Run: pytest --cov=app tests/`,
    },
  },
  {
    id: "pf-skills",
    title: "Skills — Custom Slash Commands",
    subtitle: "Automate repetitive tasks",
    content:
      "Skills are custom slash commands stored as Markdown files. Create them in .claude/commands/ and use them in any session with a / prefix.",
    code: {
      language: "markdown",
      filename: ".claude/commands/data-summary.md",
      code: `# Data Summary

Analyze the data file provided and generate a summary report:

1. Read the file and identify its format (CSV, JSON, Parquet, etc.)
2. Show the first 5 rows and column types
3. Calculate basic statistics (count, mean, median, nulls)
4. Flag any data quality issues
5. Save the summary to \`reports/summary.md\`

Always use pandas for tabular data and include row counts
before and after any filtering steps.`,
    },
    secondaryCode: {
      language: "bash",
      code: `# Use the custom skill in a session
> /data-summary sales_q4.csv`,
    },
  },
  {
    id: "pf-mcp",
    title: "MCP Servers — Plugin Integrations",
    subtitle: "Extend Claude with new capabilities",
    content:
      "MCP (Model Context Protocol) servers extend Claude with specialized capabilities — database access, file system control, API integrations, and more. They're plug-and-play connectors.",
    servers: [
      {
        name: "Filesystem",
        description: "Controlled read/write access to specific directories",
        command: "claude mcp add files npx -- -y @modelcontextprotocol/server-filesystem ~/data",
      },
      {
        name: "PostgreSQL",
        description: "Direct database queries without writing connection code",
        command: "claude mcp add postgres npx -- -y @modelcontextprotocol/server-postgres",
      },
      {
        name: "GitHub",
        description: "Interact with repos, PRs, issues directly from Claude",
        command: "claude mcp add github npx -- -y @modelcontextprotocol/server-github",
      },
      {
        name: "Brave Search",
        description: "Web search from within Claude sessions",
        command: "claude mcp add search npx -- -y @modelcontextprotocol/server-brave-search",
      },
    ],
    code: {
      language: "bash",
      code: `# List configured servers
claude mcp list

# Remove a server
claude mcp remove postgres

# Servers are stored in ~/.claude/settings.json`,
    },
  },
  {
    id: "pf-together",
    title: "Putting It All Together",
    subtitle: "CLAUDE.md + Skills + MCP in action",
    content:
      "The real power comes from combining these features. Your CLAUDE.md sets the context, Skills automate your workflows, and MCP servers give Claude access to your tools. Here's an example workflow:",
    bulletPoints: [
      "CLAUDE.md tells Claude about your database schema and coding conventions",
      "An MCP server gives Claude direct access to your PostgreSQL database",
      "A custom Skill called /weekly-report runs a multi-step analysis pipeline",
      "You type /weekly-report and Claude generates a complete report in seconds",
    ],
    code: {
      language: "text",
      code: `Your setup:
  CLAUDE.md           → "Fiscal year starts April 1, all amounts in USD"
  MCP: PostgreSQL     → Claude can query your revenue tables directly
  Skill: /weekly-report → Runs queries, builds charts, writes summary

You type:
  > /weekly-report

Claude:
  ✓ Queried revenue table for the past 7 days
  ✓ Calculated daily/weekly totals and growth rates
  ✓ Generated bar chart saved to reports/weekly.png
  ✓ Wrote summary to reports/weekly-report.md`,
    },
  },
]

// ─── Section 3: Build a Chrome Extension ─────────────────────────

const chromeExtensionSteps: GuideStep[] = [
  {
    id: "ce-start",
    title: "Create the Project",
    subtitle: "Step 1 of 5",
    content: "Start with an empty folder. Claude will generate everything from scratch — manifest, popup, content script, and icons. No APIs or accounts needed.",
    code: {
      language: "bash",
      code: `mkdir page-painter && cd page-painter
claude`,
    },
  },
  {
    id: "ce-describe",
    title: "Describe What You Want",
    subtitle: "Step 2 of 5",
    content:
      "Give Claude a clear description of the extension. Be specific about features, UI, and behavior. The prompt below builds a \"Page Painter\" — click a theme and the entire website transforms instantly.",
    code: {
      language: "text",
      code: `> Build a Chrome extension called "Page Painter" that instantly
  re-themes any website. Requirements:
  - A popup with 4 theme buttons: "Midnight" (dark mode),
    "Sunset" (warm sepia tones), "Ocean" (cool blues),
    and "Neon" (cyberpunk — bright green/pink accents on black)
  - Each button shows a small color preview swatch
  - Clicking a theme injects CSS into the current page that
    overrides backgrounds, text colors, links, and fonts
  - Include a "Reset" button that restores the original page
  - The popup itself should look polished and modern
  - Use manifest v3 with activeTab permission only`,
    },
  },
  {
    id: "ce-generate",
    title: "Claude Generates the Files",
    subtitle: "Step 3 of 5",
    content:
      "Claude creates the complete project structure — manifest, popup, content script, and styling. No background service worker needed for this one, which keeps things simple. It explains each file as it goes.",
    code: {
      language: "text",
      code: `Claude creates:
  manifest.json      — Extension config with activeTab permission
  popup.html         — Theme selector with color preview swatches
  popup.css          — Clean, modern popup styling
  popup.js           — Sends your theme choice to the content script
  content.js         — Injects / removes theme CSS on the page
  icons/             — Generated extension icons`,
    },
  },
  {
    id: "ce-test",
    title: "Load and Test It",
    subtitle: "Step 4 of 5",
    content:
      "Load your new extension into Chrome and try it on any website. You should see the entire page transform when you click a theme.",
    code: {
      language: "text",
      code: `1. Open Chrome → chrome://extensions
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the page-painter folder
5. Navigate to any website (try a news site — lots of text)
6. Click the Page Painter icon in your toolbar
7. Hit "Neon" and watch the page transform`,
    },
    bulletPoints: [
      "If the extension doesn't appear in your toolbar, click the puzzle piece icon and pin it.",
      "Something not working? Right-click the extension icon → \"Inspect Popup\" to see errors, then paste the error back into Claude.",
    ],
  },
  {
    id: "ce-iterate",
    title: "Iterate with Claude",
    subtitle: "Step 5 of 5",
    content:
      "Want to tweak it? Just tell Claude. It remembers the full project and can modify any file. Try these:",
    code: {
      language: "text",
      code: `> Add a smooth crossfade transition when switching themes.
> Remember my last theme choice for each website.
> Add a keyboard shortcut (Ctrl+Shift+T) to cycle through themes.
> Create a "Custom" theme with color pickers so I can design my own.`,
    },
  },
]

// ─── Section 4: Resources & Further Reading ──────────────────────

const resourcesSteps: GuideStep[] = [
  {
    id: "res-all",
    title: "Resources & Further Reading",
    subtitle: "Curated links to learn more",
    content: "A collection of the best resources for learning Claude Code — from official docs to community tutorials and press coverage.",
  },
]

// ─── Sections ────────────────────────────────────────────────────

export const guideSections: GuideSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    subtitle: "Install, launch, and run your first session",
    color: "#4EC98B",
    icon: "terminal",
    steps: gettingStartedSteps,
  },
  {
    id: "power-features",
    title: "CLAUDE.md, Skills & MCP",
    subtitle: "Power-user features for customization",
    color: "#9B6EE7",
    icon: "wrench",
    steps: powerFeaturesSteps,
  },
  {
    id: "chrome-extension",
    title: "Build a Chrome Extension",
    subtitle: "Hands-on project from scratch",
    color: "#5B8DEF",
    icon: "puzzle",
    steps: chromeExtensionSteps,
  },
  {
    id: "resources",
    title: "Resources & Reading",
    subtitle: "Curated links and further learning",
    color: "#D47B2A",
    icon: "bookOpen",
    steps: resourcesSteps,
  },
]

// ─── Resource links (used by resources section) ──────────────────

export const resourceLinks: ResourceLink[] = [
  {
    title: "Claude Code Overview",
    url: "https://docs.anthropic.com/en/docs/claude-code/overview",
    description: "Official documentation — features, setup, and CLI reference",
    category: "Official Docs",
  },
  {
    title: "Claude Code Best Practices",
    url: "https://www.anthropic.com/engineering/claude-code-best-practices",
    description: "Anthropic's engineering team on getting the best results",
    category: "Official Docs",
  },
  {
    title: "Claude Code Interactive Tutorial",
    url: "https://docs.anthropic.com/en/docs/claude-code/tutorials",
    description: "Official hands-on tutorial from Anthropic's docs",
    category: "Official Docs",
  },
  {
    title: "Claude Code: Build Your First App",
    url: "https://www.youtube.com/watch?v=3JGIhEBVSqM",
    description: "Step-by-step video walkthrough building a complete app with Claude Code",
    category: "Beginner Tutorials",
  },
  {
    title: "Code with Mukesh — Claude Code Walkthrough",
    url: "https://www.youtube.com/watch?v=CzfRxCCmW4c",
    description: "Popular YouTube tutorial covering setup through advanced usage",
    category: "Beginner Tutorials",
  },
  {
    title: "Getting Started with Claude Code (Beginner Guide)",
    url: "https://www.youtube.com/watch?v=eHCTh0aq4DI",
    description: "Beginner-friendly video covering installation and first projects",
    category: "Beginner Tutorials",
  },
  {
    title: "Claude Code in a Trenchcoat — Every",
    url: "https://every.to/context-window/claude-code-in-a-trenchcoat",
    description: "How Claude Code is reshaping what it means to build software",
    category: "Power User",
  },
  {
    title: "Reddit: r/ClaudeAI Tips & Tricks",
    url: "https://www.reddit.com/r/ClaudeAI/",
    description: "Community-shared prompts, workflows, and power-user techniques",
    category: "Power User",
  },
  {
    title: "New York Times: Claude Code",
    url: "https://www.nytimes.com/2026/01/23/technology/claude-code.html",
    description: "Feature coverage on how Claude Code is changing software development",
    category: "Press & Impact",
  },
  {
    title: "Fortune: Claude Code Gives Anthropic Its Viral Moment",
    url: "https://fortune.com/2026/01/24/anthropic-boris-cherny-claude-code-non-coders-software-engineers/",
    description: "How Claude Code is reaching beyond engineers to non-technical users",
    category: "Press & Impact",
  },
  {
    title: "Built In: How Far AI Coding Tools Have Come",
    url: "https://builtin.com/articles/anthropic-claude-code-tool",
    description: "Technical review of Claude Code's capabilities and real-world usage",
    category: "Press & Impact",
  },
]

export const resourceCategories = ["Official Docs", "Beginner Tutorials", "Power User", "Press & Impact"]
