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
  timeElapsed: string
  timeElapsedStatus: "pass" | "warn" | "fail"
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

export interface ChallengeSlide {
  id: string
  type: "title" | "challenge" | "results" | "detail" | "takeaway"
  title: string
  subtitle?: string
}

// ─── Contestant Data ────────────────────────────────────────────
// Ordered narrative: Claude first (impressive but flawed), HyperPerfect second (perfection)

export const contestants: Contestant[] = [
  {
    rank: "silver",
    label: "CLAUDE ALONE",
    name: "Claude in Excel",
    model: "Opus 4.6",
    balanceSheet: "Balanced",
    balanceSheetStatus: "pass",
    formulas: "No calculation errors; one hardcoded",
    formulasStatus: "warn",
    timeElapsed: "15 minutes",
    timeElapsedStatus: "warn",
    criticalErrors: "Negative cash; missing interest expense line",
    criticalErrorsStatus: "fail",
    bottomLineTitle: "2 critical errors in 15 minutes",
    bottomLineDetail:
      "Cash goes negative with no revolver draw; interest expense ignores revolver borrowings. Model forgot to format all numbers.",
    bottomLineColor: "yellow",
    videoUrl: "https://www.loom.com/embed/5d67d4c6e19d4a3dbb9d80f28dce807f",
    downloadUrl: "/files/three-statement-model-claude.xlsx",
    downloadLabel: "Download Completed Model",
    websiteUrl: "https://claude.com/claude-in-excel",
  },
  {
    rank: "gold",
    label: "CLAUDE + HYPERPERFECT",
    name: "HyperPerfect",
    balanceSheet: "Balanced",
    balanceSheetStatus: "pass",
    formulas: "All correct and dynamic",
    formulasStatus: "pass",
    timeElapsed: "9 minutes",
    timeElapsedStatus: "pass",
    criticalErrors: "None",
    criticalErrorsStatus: "pass",
    bottomLineTitle: "0 critical errors in 9 minutes",
    bottomLineDetail:
      "Only two minor issues: forecast headers not labeled or formatted correctly.",
    bottomLineColor: "green",
    videoUrl: "https://www.loom.com/embed/6e094485c53d47b3b4968a2b518e09f9",
    downloadUrl: "/files/three-statement-model-hyperperfect.xlsx",
    downloadLabel: "Download Completed Model",
    websiteUrl: "https://www.hyperperfect.ai",
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
      "Claude is the best AI model for Excel. HyperPerfect\u2019s indexing engine eliminates its remaining errors.",
  },
  {
    id: "challenge",
    type: "challenge",
    title: "The Challenge",
    subtitle:
      "Same prompt \u2022 Same data \u2022 Same criteria \u2014 Claude alone vs. Claude + HyperPerfect",
  },
  {
    id: "results",
    type: "results",
    title: "The Results",
    subtitle: "Side-by-side comparison: Claude alone vs. Claude + HyperPerfect",
  },
  {
    id: "detail-claude",
    type: "detail",
    title: "Claude in Excel",
    subtitle: "Impressive, but 2 critical errors remain",
  },
  {
    id: "detail-hyperperfect",
    type: "detail",
    title: "Claude + HyperPerfect",
    subtitle: "Zero critical errors",
  },
  {
    id: "takeaway",
    type: "takeaway",
    title: "Key Takeaway",
    subtitle: "What this means for your financial modeling workflow",
  },
]
