import type { Metadata } from "next"
import ExcelLandingPage from "../../components/excel-landing-page"

export const metadata: Metadata = {
  title: "HyperPerfect for Excel — Agentic AI Workflows",
  description: "The most powerful agentic AI workflows for Excel. Custom agents, prompts, and plans, with intelligent AI routing across Claude, Gemini, and ChatGPT.",
}

export default function ExcelPage() {
  return <ExcelLandingPage />
}
