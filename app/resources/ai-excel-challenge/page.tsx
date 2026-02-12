"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  FileSpreadsheet,
  Zap,
  Download,
  ExternalLink,
} from "lucide-react"
import {
  slides,
  contestants,
  successCriteria,
} from "@/data/ai-excel-challenge-content"
import type { Contestant } from "@/data/ai-excel-challenge-content"

// ─── Constants ──────────────────────────────────────────────────

const ACCENT = "#1a7bff"

const rankColors: Record<string, string> = {
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
  dnp: "#6B7280",
}

const bottomLineColors: Record<string, { color: string; bg: string; border: string }> = {
  green: { color: "#22C55E", bg: "rgba(34, 197, 94, 0.08)", border: "rgba(34, 197, 94, 0.3)" },
  yellow: { color: "#EAB308", bg: "rgba(234, 179, 8, 0.08)", border: "rgba(234, 179, 8, 0.3)" },
  red: { color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)", border: "rgba(239, 68, 68, 0.3)" },
}

// ─── Status Badge ────────────────────────────────────────────────

function StatusBadge({ status, text }: { status: "pass" | "warn" | "fail"; text: string }) {
  const config = {
    pass: { icon: <CheckCircle2 size={14} />, color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
    warn: { icon: <AlertTriangle size={14} />, color: "#EAB308", bg: "rgba(234,179,8,0.1)" },
    fail: { icon: <XCircle size={14} />, color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  }
  const c = config[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
      style={{ color: c.color, backgroundColor: c.bg }}
    >
      {c.icon}
      {text}
    </span>
  )
}

// ─── Title Slide ─────────────────────────────────────────────────

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${ACCENT}18` }}>
          <Trophy size={40} style={{ color: ACCENT }} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
          How Good Is AI
          <br />
          <span style={{ color: ACCENT }}>at Excel, Really?</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium mb-6">
          The Three-Statement Model Challenge
        </p>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Claude is the best AI model for Excel. See what happens when you add HyperPerfect&apos;s indexing engine to eliminate its remaining errors.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {["Same Prompt, Same Data", "Claude vs. HyperPerfect", "Watch Both Attempts"].map((tag) => (
          <span
            key={tag}
            className="px-5 py-2.5 rounded-full text-sm font-semibold border"
            style={{
              color: ACCENT,
              borderColor: `${ACCENT}40`,
              backgroundColor: `${ACCENT}08`,
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-600 text-sm mt-12"
      >
        Use arrow keys to navigate. Press Escape to return to resources.
      </motion.p>
    </div>
  )
}

// ─── Challenge Slide ─────────────────────────────────────────────

function ChallengeSlide() {
  const sections = [
    {
      icon: <FileSpreadsheet size={24} />,
      title: "The Data",
      items: [
        { bold: "Company:", text: "Henderson Manufacturing" },
        { bold: "Source:", text: "FMI AFM exam case study" },
        { bold: "Provided:", text: "3 years of historical financials \u2014 Income Statement, Cash Flow Statement, and Balance Sheet" },
        { bold: "Format:", text: "Excel workbook with actuals (FY2022\u2013FY2024)" },
      ],
    },
    {
      icon: <Target size={24} />,
      title: "The Task",
      items: [
        { bold: "", text: "Each tool received the same Excel model and was given one prompt to build a complete five-year forecast." },
        { bold: "", text: "Tools could receive follow-up guidance to fix mistakes \u2014 this was not a strict one-shot test." },
        { bold: "", text: "No hard time limits were imposed on any tool." },
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">The Challenge</h2>
        <p className="text-xl text-gray-400 mb-10">
          Same prompt &bull; Same data &bull; Same criteria &mdash; Claude alone vs. Claude + HyperPerfect
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bg-[#1A1A24] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}>
                {sec.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{sec.title}</h3>
            </div>
            <div className="space-y-3">
              {sec.items.map((item, j) => (
                <p key={j} className="text-lg text-gray-400">
                  {item.bold && <span className="text-white font-semibold">{item.bold} </span>}
                  {item.text}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Criteria */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-[#1A1A24] border border-white/5 rounded-xl p-6 mb-10"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}>
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">Success Criteria</h3>
        </div>
        <div className="space-y-3">
          {successCriteria.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-lg text-gray-300">{c}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-[#12121A] border border-white/5 rounded-xl p-6"
      >
        <p className="text-lg text-gray-400 mb-4">
          Each tool was given a high-level prompt to build a complete forecast from historical data:
        </p>
        <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
          &ldquo;Build a five-year forecast in this model starting from the historic actuals provided. Make reasonable assumptions, build schedules for each area of the model, and follow best practices.&rdquo;
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex justify-center mt-8"
      >
        <a
          href="/files/three-statement-model-blank.xlsx"
          download
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-semibold
                     border border-white/10 text-gray-300 hover:text-white hover:bg-white/5
                     hover:border-white/20 transition-all"
        >
          <Download size={18} />
          Download the Blank Challenge File
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-sm text-gray-600 mt-6 text-center"
      >
        Both tools were tested independently under the same conditions: same Excel file, same prompt, same success criteria.
      </motion.p>
    </div>
  )
}

// ─── Status Dot ──────────────────────────────────────────────────

function StatusDot({ status }: { status: "pass" | "warn" | "fail" }) {
  const colors = { pass: "#22C55E", warn: "#EAB308", fail: "#EF4444" }
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: colors[status] }}
    />
  )
}

// ─── Results Overview Slide ──────────────────────────────────────

function ResultsSlide() {
  const criteria = [
    { label: "Balance Sheet", key: "balanceSheet" as const, statusKey: "balanceSheetStatus" as const },
    { label: "Formulas", key: "formulas" as const, statusKey: "formulasStatus" as const },
    { label: "Time Elapsed", key: "timeElapsed" as const, statusKey: "timeElapsedStatus" as const },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">The Results</h2>
        <p className="text-xl text-gray-400 mb-10">
          Side-by-side: Claude alone vs. Claude + HyperPerfect
        </p>
      </motion.div>

      {/* Comparison Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="overflow-x-auto"
      >
        <table className="w-full border-collapse table-fixed min-w-[720px]">
          <colgroup>
            <col className="w-[170px]" />
            {contestants.map((c) => (
              <col key={c.name} style={{ width: `${(100 - 17) / contestants.length}%` }} />
            ))}
          </colgroup>
          {/* Column headers — tool names with rank badges & website links */}
          <thead>
            <tr className="align-bottom">
              <th />
              {contestants.map((c, i) => (
                <motion.th
                  key={c.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="text-center px-5 pb-6 relative overflow-visible"
                >
                  {/* Gold highlight — full column border including top */}
                  {c.rank === "gold" && (
                    <div className="absolute inset-x-0 inset-y-0 rounded-t-xl bg-[#FFD700]/[0.04] border border-b-0 border-[#FFD700]/20 pointer-events-none" />
                  )}
                  <div className="relative z-10 pt-5">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2.5"
                      style={{
                        backgroundColor: rankColors[c.rank],
                        color: c.rank === "gold" || c.rank === "bronze" ? "#000" : "#fff",
                      }}
                    >
                      {c.rank === "dnp" ? "DNP" : c.label}
                    </span>
                    <div className="text-xl font-bold text-white">{c.name}</div>
                    {c.websiteUrl && (
                      <a
                        href={c.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium mt-2.5 transition-colors hover:text-white"
                        style={{ color: ACCENT }}
                      >
                        <ExternalLink size={10} />
                        Website
                      </a>
                    )}
                    {!c.websiteUrl && <div className="h-5 mt-2.5" />}
                  </div>
                </motion.th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Criteria rows */}
            {criteria.map((cr, rowIdx) => (
              <motion.tr
                key={cr.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + rowIdx * 0.08 }}
                className="border-t border-white/[0.06] group"
              >
                <td className="py-5 pr-6 align-middle">
                  <span className="text-[13px] text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">
                    {cr.label}
                  </span>
                </td>
                {contestants.map((c) => {
                  const status = c[cr.statusKey]
                  const value = c[cr.key]
                  return (
                    <td
                      key={c.name}
                      className="text-left py-5 px-5 relative align-middle"
                    >
                      {c.rank === "gold" && (
                        <div className="absolute inset-x-0 inset-y-0 bg-[#FFD700]/[0.04] border-x border-[#FFD700]/20 pointer-events-none" />
                      )}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <span className="flex-shrink-0"><StatusDot status={status} /></span>
                        <span className={`text-[15px] font-medium leading-snug ${
                          status === "pass" ? "text-green-400" :
                          status === "warn" ? "text-yellow-300/90" :
                          "text-red-400/90"
                        }`}>
                          {value}
                        </span>
                      </div>
                    </td>
                  )
                })}
              </motion.tr>
            ))}

            {/* Bottom line row */}
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t-2 border-white/10 align-top"
            >
              <td className="py-6 pr-6 align-top">
                <span className="text-[13px] text-white uppercase tracking-wider font-bold">
                  Bottom Line
                </span>
              </td>
              {contestants.map((c) => (
                <td
                  key={c.name}
                  className="text-left py-6 px-5 relative align-top"
                >
                  {c.rank === "gold" && (
                    <div className="absolute inset-x-0 inset-y-0 rounded-b-xl bg-[#FFD700]/[0.04] border-x border-b border-[#FFD700]/20 pointer-events-none" />
                  )}
                  <div className="relative z-10">
                    <p className="text-base font-bold leading-tight" style={{ color: bottomLineColors[c.bottomLineColor].color }}>
                      {c.bottomLineTitle}
                    </p>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {c.bottomLineDetail}
                    </p>
                  </div>
                </td>
              ))}
            </motion.tr>
          </tbody>
        </table>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-gray-600 mt-8 text-center"
      >
        Both tools tested independently under the same conditions: same Excel file, same prompt, same success criteria.
      </motion.p>
    </div>
  )
}

// ─── Detail Slide ────────────────────────────────────────────────

function DetailSlide({ contestant }: { contestant: Contestant }) {
  const color = rankColors[contestant.rank]

  const metrics = [
    { label: "Balance Sheet", value: contestant.balanceSheet, status: contestant.balanceSheetStatus },
    { label: "Formulas", value: contestant.formulas, status: contestant.formulasStatus },
    { label: "Time Elapsed", value: contestant.timeElapsed, status: contestant.timeElapsedStatus },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Rank badge */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: color, color: contestant.rank === "gold" ? "#000" : "#fff" }}
          >
            {contestant.label}
          </span>
          {contestant.model && (
            <span className="text-sm text-gray-500">{contestant.model}</span>
          )}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{contestant.name}</h2>
        <p className="text-xl font-medium mb-4" style={{ color: bottomLineColors[contestant.bottomLineColor].color }}>{contestant.bottomLineTitle}</p>
        {contestant.websiteUrl && (
          <a
            href={contestant.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:brightness-125 mb-8"
            style={{ color: ACCENT }}
          >
            Visit website <ExternalLink size={13} />
          </a>
        )}
        {!contestant.websiteUrl && <div className="mb-8" />}
      </motion.div>

      {/* Video embed */}
      {contestant.videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={contestant.videoUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title={`${contestant.name} demo video`}
            ></iframe>
          </div>
          {contestant.downloadUrl && (
            <a
              href={contestant.downloadUrl}
              download
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg text-sm font-semibold
                         border border-white/10 text-gray-300 hover:text-white hover:bg-white/5
                         hover:border-white/20 transition-all"
            >
              <Download size={16} />
              {contestant.downloadLabel || "Download File"}
            </a>
          )}
        </motion.div>
      )}

      {/* Metric cards */}
      <div className="space-y-4 mb-10">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (contestant.videoUrl ? 0.3 : 0.15) + i * 0.1 }}
            className="bg-[#1A1A24] border border-white/5 rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
              <p className="text-xl font-semibold text-white">{m.value}</p>
            </div>
            <StatusBadge status={m.status} text={m.status === "pass" ? "Pass" : m.status === "warn" ? "Warning" : "Fail"} />
          </motion.div>
        ))}
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contestant.videoUrl ? 0.65 : 0.5 }}
        className="rounded-xl p-6 border"
        style={{
          backgroundColor: bottomLineColors[contestant.bottomLineColor].bg,
          borderColor: bottomLineColors[contestant.bottomLineColor].border,
        }}
      >
        <h3 className="text-lg font-bold mb-2" style={{ color: bottomLineColors[contestant.bottomLineColor].color }}>
          Bottom Line
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">{contestant.bottomLineDetail}</p>
      </motion.div>
    </div>
  )
}

// ─── Takeaway Slide ──────────────────────────────────────────────

function TakeawaySlide() {
  const points = [
    {
      icon: <Trophy size={24} />,
      title: "Claude Is the Best AI Model for Excel",
      text: "Claude Opus 4.6 produced a balanced balance sheet with correct formulas and reasonable assumptions \u2014 something most AI tools can\u2019t do at all.",
    },
    {
      icon: <Zap size={24} />,
      title: "HyperPerfect\u2019s Indexing Engine Closes the Gap",
      text: "Claude\u2019s two remaining errors \u2014 negative cash and missing interest expense \u2014 were eliminated by HyperPerfect\u2019s data translation layer, which prevents the hallucinations that trip up even the best models.",
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "The Result: Zero Critical Errors",
      text: "Claude + HyperPerfect is the only combination that produced a fully client-ready three-statement model with zero critical errors, all dynamic formulas, and a balanced balance sheet.",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Key Takeaway</h2>
        <p className="text-xl text-gray-400 mb-10">
          What this means for your financial modeling workflow
        </p>
      </motion.div>

      <div className="space-y-6 mb-12">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bg-[#1A1A24] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">{p.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/help/quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: ACCENT }}
          >
            Try for Free in Excel
            <ChevronRight size={20} />
          </Link>
          <Link
            href="https://calendly.com/di-hyperperfect/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-gray-300
                       border border-white/10 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
          >
            Book a Demo
            <ChevronRight size={20} />
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Get started in 15 minutes, or see a live walkthrough
        </p>
      </motion.div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────

export default function AIExcelChallengePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalSlides = slides.length
  const slide = slides[currentSlide]
  const progress = ((currentSlide + 1) / totalSlides) * 100

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1)
      setCurrentSlide((i) => i + 1)
    }
  }, [currentSlide, totalSlides])

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide((i) => i - 1)
    }
  }, [currentSlide])

  /** Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault()
          goNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          goPrev()
          break
        case "Escape":
          e.preventDefault()
          window.location.href = "/resources"
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  /** Render slide content */
  function renderSlide() {
    switch (slide.type) {
      case "title":
        return <TitleSlide />
      case "challenge":
        return <ChallengeSlide />
      case "results":
        return <ResultsSlide />
      case "detail": {
        const detailMap: Record<string, Contestant> = {
          "detail-claude": contestants[0],
          "detail-hyperperfect": contestants[1],
        }
        return <DetailSlide contestant={detailMap[slide.id]} />
      }
      case "takeaway":
        return <TakeawaySlide />
      default:
        return null
    }
  }

  return (
    <div className="bg-[#0F0F14] text-white min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0">
        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <motion.div
            className="h-full"
            style={{ backgroundColor: ACCENT }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <Link
            href="/resources"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-base"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Resources</span>
          </Link>

          <span className="text-lg font-medium" style={{ color: ACCENT }}>
            AI Excel Challenge
          </span>

          <span className="text-base text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex-shrink-0 border-t border-white/10 bg-[#12121A] px-4 md:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-gray-300
                       border border-white/10 hover:text-white hover:bg-white/5 hover:border-white/20
                       transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} /> Back
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1)
                  setCurrentSlide(i)
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? "w-8 h-2.5" : "w-2.5 h-2.5 hover:opacity-60"
                }`}
                style={{
                  backgroundColor: i === currentSlide ? ACCENT : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {currentSlide < totalSlides - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-white
                         transition-all hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              Next <ArrowRight size={20} />
            </button>
          ) : (
            <Link
              href="/help/quick-start"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-white
                         transition-all hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              Try for Free <ChevronRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
