// ─── Types ───────────────────────────────────────────────────────

export interface Contestant {
  rank: "gold" | "silver" | "bronze" | "dnp"
  label: string
  name: string
  model?: string
  balanceSheet: string
  balanceSheetStatus: "pass" | "warn" | "fail"
  formulas: string
  formulasStatus: "pass" | "warn" | "fail"
  criticalErrors: string
  criticalErrorsStatus: "pass" | "warn" | "fail"
  bottomLineTitle: string
  bottomLineDetail: string
  bottomLineColor: "green" | "yellow" | "red"
  videoUrl?: string
  downloadUrl?: string
  downloadLabel?: string
  websiteUrl?: string
}

export interface FieldEntry {
  tool: string
  rank: "gold" | "silver" | "bronze" | "dnp"
  forecastComplete: string
  dynamicFormulas: string
  balanceSheet: string
  keyIssues: string
  videoUrl?: string
}

export interface ChallengeSlide {
  id: string
  type: "title" | "challenge" | "results" | "detail" | "field" | "takeaway"
  title: string
  subtitle?: string
}

// ─── Podium Data ─────────────────────────────────────────────────

export const contestants: Contestant[] = [
  {
    rank: "gold",
    label: "GOLD",
    name: "HyperPerfect",
    balanceSheet: "Balanced",
    balanceSheetStatus: "pass",
    formulas: "All correct and dynamic",
    formulasStatus: "pass",
    criticalErrors: "None",
    criticalErrorsStatus: "pass",
    bottomLineTitle: "0 critical errors",
    bottomLineDetail:
      "Only two minor issues: forecast headers not labeled or formatted correctly.",
    bottomLineColor: "green",
    videoUrl: "https://www.loom.com/embed/6e094485c53d47b3b4968a2b518e09f9",
    downloadUrl: "/files/three-statement-model-hyperperfect.xlsx",
    downloadLabel: "Download Completed Model",
    websiteUrl: "https://www.hyperperfect.ai",
  },
  {
    rank: "silver",
    label: "SILVER",
    name: "Claude in Excel",
    model: "Opus 4.6",
    balanceSheet: "Balanced",
    balanceSheetStatus: "pass",
    formulas: "All correct; one hardcoded",
    formulasStatus: "warn",
    criticalErrors: "Negative cash; missing interest expense line",
    criticalErrorsStatus: "fail",
    bottomLineTitle: "Only 2 critical errors",
    bottomLineDetail:
      "Cash goes negative with no revolver draw; interest expense ignores revolver borrowings. Model forgot to format all numbers.",
    bottomLineColor: "yellow",
    videoUrl: "https://www.loom.com/embed/5d67d4c6e19d4a3dbb9d80f28dce807f",
    downloadUrl: "/files/three-statement-model-claude.xlsx",
    downloadLabel: "Download Completed Model",
    websiteUrl: "https://claude.com/claude-in-excel",
  },
  {
    rank: "bronze",
    label: "BRONZE",
    name: "Copilot Agent",
    balanceSheet: "Not balanced",
    balanceSheetStatus: "fail",
    formulas: "Uncaught #REF errors",
    formulasStatus: "fail",
    criticalErrors: "Model breaks in year 5",
    criticalErrorsStatus: "fail",
    bottomLineTitle: "Broken model",
    bottomLineDetail:
      "Balance sheet wasn\u2019t balanced; Ref errors due to reference problems caused major issues.",
    bottomLineColor: "red",
    videoUrl: "https://www.youtube.com/embed/vBTb7uTigAA?list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP",
    websiteUrl: "https://www.microsoft.com/en-us/microsoft-365/excel",
  },
  {
    rank: "dnp",
    label: "DID NOT PLACE",
    name: "Shortcut",
    balanceSheet: "Off by ~$1.3M",
    balanceSheetStatus: "fail",
    formulas: "Multiple mistakes; hardcoded formulas",
    formulasStatus: "fail",
    criticalErrors: "Inverted working capital",
    criticalErrorsStatus: "fail",
    bottomLineTitle: "Significant issues",
    bottomLineDetail:
      'Balance off ~$1.3M, which AI called \u201cclose enough.\u201d Some assumptions were built but then abandoned and not linked to formulas.',
    bottomLineColor: "red",
    videoUrl: "https://www.youtube.com/embed/78D6y_QMz8E?start=1417",
    websiteUrl: "https://shortcut.ai",
  },
]

// ─── Rest of Field Data ──────────────────────────────────────────

export const fieldEntries: FieldEntry[] = [
  {
    tool: "Truffle Pig",
    rank: "gold",
    forecastComplete: "Yes",
    dynamicFormulas: "Mix",
    balanceSheet: "No",
    keyIssues: "Off by ~$50M on working capital",
    videoUrl: "https://www.youtube.com/watch?v=pF2R6Fao-64&list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP&index=4",
  },
  {
    tool: "Elcar",
    rank: "silver",
    forecastComplete: "Partial",
    dynamicFormulas: "Yes",
    balanceSheet: "No",
    keyIssues: "7\u20138 critical mistakes; needed human fixes",
    videoUrl: "https://www.youtube.com/watch?v=9gRrP1r8yh8&list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP&index=5",
  },
  {
    tool: "Tab AI",
    rank: "bronze",
    forecastComplete: "Yes",
    dynamicFormulas: "Mix",
    balanceSheet: "No",
    keyIssues: "Column reference errors; incomplete model",
    videoUrl: "https://www.youtube.com/watch?v=MKvX_oP2HJE&list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP&index=7",
  },
  {
    tool: "Trace Light",
    rank: "dnp",
    forecastComplete: "Partial",
    dynamicFormulas: "Mix",
    balanceSheet: "No",
    keyIssues: "Confident but wrong diagnoses; working capital issues",
    videoUrl: "https://www.youtube.com/watch?v=CEYBJMOV_kc&list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP&index=10",
  },
  {
    tool: "Rosie AI",
    rank: "dnp",
    forecastComplete: "Incomplete",
    dynamicFormulas: "Attempted",
    balanceSheet: "N/A",
    keyIssues: "Struggled significantly; incomplete output",
    videoUrl: "https://www.youtube.com/watch?v=Pkid79RjT1U&list=PLUCwZykrxUtM6kb4EZcFajpfeVp6ZUqJP&index=9",
  },
]

// ─── Success Criteria ────────────────────────────────────────────

export const successCriteria = [
  "Balance sheet must balance (zero tolerance)",
  "Correct, dynamic formulas (not hardcoded)",
  "Reasonable assumptions and schedules",
  "Proper model structure (IS \u2192 CF \u2192 BS)",
  "Client-ready quality",
]

// ─── Slide Definitions ──────────────────────────────────────────

export const slides: ChallengeSlide[] = [
  {
    id: "title",
    type: "title",
    title: "How Good Is AI at Excel, Really?",
    subtitle:
      "The Three-Statement Model Challenge \u2014 9 tools, same prompt, same data, watch every attempt",
  },
  {
    id: "challenge",
    type: "challenge",
    title: "The Challenge",
    subtitle:
      "Same prompt \u2022 Same data \u2022 Same criteria \u2014 9 AI-for-Excel tools put to the test",
  },
  {
    id: "results",
    type: "results",
    title: "The Results",
    subtitle: "Head-to-head comparison of the top 4 tools",
  },
  {
    id: "detail-gold",
    type: "detail",
    title: "Gold: HyperPerfect",
    subtitle: "Zero critical errors",
  },
  {
    id: "detail-silver",
    type: "detail",
    title: "Silver: Claude in Excel",
    subtitle: "Strong but flawed",
  },
  {
    id: "detail-bronze",
    type: "detail",
    title: "Bronze: Copilot Agent",
    subtitle: "Model integrity breakdown",
  },
  {
    id: "detail-dnp",
    type: "detail",
    title: "Did Not Place: Shortcut",
    subtitle: "Significant structural issues",
  },
  {
    id: "field",
    type: "field",
    title: "The Rest of the Field",
    subtitle:
      "Every other AI-for-Excel tool tested failed to balance the balance sheet",
  },
  {
    id: "takeaway",
    type: "takeaway",
    title: "Key Takeaway",
    subtitle: "What this means for your financial modeling workflow",
  },
]
