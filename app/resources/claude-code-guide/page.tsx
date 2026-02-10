"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Copy, Check, ArrowLeft, ArrowRight, ExternalLink,
  Terminal, BookOpen, Wrench, Puzzle, Lightbulb, FileText,
  Home, ChevronRight, ChevronDown, X, Info,
} from "lucide-react"
import {
  guideSections,
  resourceLinks,
  resourceCategories,
} from "@/data/claude-code-guide-content"
import type { GuideStep, GuideSection } from "@/data/claude-code-guide-content"

// ─── Icon mapping ────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  terminal: <Terminal size={24} />,
  wrench: <Wrench size={24} />,
  puzzle: <Puzzle size={24} />,
  bookOpen: <BookOpen size={24} />,
  lightbulb: <Lightbulb size={24} />,
  fileText: <FileText size={24} />,
}

function AppleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function WindowsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.5l8-1.1V12H3zm0 .5h8v6.6l-8-1.1V12.5zM11.5 5.3l9.5-1.3v8h-9.5V5.3zM21 12.5v7.5l-9.5-1.3V12.5H21z" />
    </svg>
  )
}

function getIcon(name: string, size = 24) {
  const icons: Record<string, React.ReactNode> = {
    terminal: <Terminal size={size} />,
    wrench: <Wrench size={size} />,
    puzzle: <Puzzle size={size} />,
    bookOpen: <BookOpen size={size} />,
    lightbulb: <Lightbulb size={size} />,
    fileText: <FileText size={size} />,
    apple: <AppleIcon size={size} />,
    windows: <WindowsIcon size={size} />,
  }
  return icons[name] || <Terminal size={size} />
}

// ─── Utility components ──────────────────────────────────────────

function CodeBlock({ code, language, filename, copyable = true }: { code: string; language?: string; filename?: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className="rounded-lg overflow-hidden bg-[#12121A] border border-white/5 my-4">
      {filename && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <span className="text-base text-gray-400 font-mono">{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-5 overflow-x-auto text-lg leading-relaxed">
          <code className="text-gray-300 font-mono">{code}</code>
        </pre>
        {copyable && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
          </button>
        )}
      </div>
    </div>
  )
}

function TerminalMockup() {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Title bar */}
      <div className="bg-[#2A2A35] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-sm text-gray-400 ml-3 font-mono">Terminal — claude</span>
      </div>
      {/* Terminal body */}
      <div className="bg-[#0A0A12] p-6 font-mono text-base leading-relaxed">
        <div className="text-gray-500 mb-4">~/my-project</div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-500">$</span>
          <span className="text-white">claude</span>
        </div>
        <div className="border-t border-white/5 pt-5 mb-5">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">✻</span>
            <div>
              <span className="text-white text-xl font-semibold">Claude Code</span>
              <span className="text-gray-500 ml-3">v2.1.27</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm ml-10 mb-4">by Anthropic</div>
        </div>
        <div className="bg-[#12121A] rounded-lg border border-white/5 p-4 mb-4">
          <div className="text-gray-400 text-sm mb-2">Tips: Use <span className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">Shift+Tab</span> for Plan Mode · Type <span className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">/help</span> for commands</div>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <span className="text-[#D4A574]">❯</span>
          <span className={`w-2.5 h-5 bg-white inline-block ${cursorVisible ? "opacity-100" : "opacity-0"}`} />
        </div>
        <div className="text-gray-600 text-sm mt-2">Type your request in plain English...</div>
      </div>
    </div>
  )
}

function CommandList({ commands }: { commands: { command: string; description: string }[] }) {
  return (
    <div className="space-y-3 my-6">
      {commands.map((cmd) => (
        <CommandItem key={cmd.command} command={cmd.command} description={cmd.description} />
      ))}
    </div>
  )
}

function CommandItem({ command, description }: { command: string; description: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [command])

  return (
    <div className="rounded-lg overflow-hidden bg-[#12121A] border border-white/5">
      <div className="flex items-center justify-between px-5 py-4">
        <code className="text-lg text-white font-mono font-medium">{command}</code>
        <button
          onClick={handleCopy}
          className="ml-4 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
        </button>
      </div>
      <div className="px-5 pb-4 -mt-1">
        <p className="text-base text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function PromptTabs({ tabs }: { tabs: NonNullable<GuideStep["promptTabs"]> }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const active = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <div className="my-6">
      <div className="flex gap-1 mb-4 bg-white/5 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-md text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#D47B2A] text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {active.items.map((item, i) => (
          <div key={i} className="bg-[#12121A] border border-white/5 rounded-lg p-5">
            <p className="text-gray-300 font-mono text-lg">&gt; {item.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hub Screen ──────────────────────────────────────────────────

function HubScreen({ onSelectSection }: { onSelectSection: (id: string) => void }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 md:px-8">
      {/* Back to resources */}
      <div className="absolute top-6 left-6">
        <Link
          href="/resources"
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Resources</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-1 bg-[#D47B2A] mb-6 mx-auto" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Claude Code Guide
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto">
          A practical guide to using AI&apos;s most powerful coding tool.
          <br className="hidden sm:block" />
          Pick a topic to get started.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        {guideSections.map((section, i) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            onClick={() => onSelectSection(section.id)}
            className="group relative bg-[#1A1A24] border border-white/5 rounded-xl p-7 text-left
                       hover:border-white/15 transition-all duration-300 overflow-hidden"
          >
            {/* Colored left border */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
              style={{ backgroundColor: section.color }}
            />

            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: section.color + "18", color: section.color }}
                >
                  {iconMap[section.icon]}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xl group-hover:text-white transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-lg text-gray-500 mt-1">{section.subtitle}</p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </div>

            {/* Subtle glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 rounded-xl"
              style={{ backgroundColor: section.color }}
            />
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600 text-sm">
          Use arrow keys to navigate within sections. Press Escape to return here.
        </p>
      </motion.div>
    </div>
  )
}

// ─── Step Screen ─────────────────────────────────────────────────

function StepScreen({
  step,
  section,
  stepIndex,
  totalSteps,
  direction,
  onNext,
  onPrev,
  onChoice,
  onBackToHub,
  isResourceSection,
}: {
  step: GuideStep
  section: GuideSection
  stepIndex: number
  totalSteps: number
  direction: number
  onNext: () => void
  onPrev: () => void
  onChoice: (goTo: string) => void
  onBackToHub: () => void
  isResourceSection: boolean
}) {
  const hasChoices = step.choices && step.choices.length > 0
  const progress = ((stepIndex + 1) / totalSteps) * 100
  const [infoPanelOpen, setInfoPanelOpen] = useState(false)

  // Close info panel when step changes
  useEffect(() => {
    setInfoPanelOpen(false)
  }, [step.id])

  /** Parse [text](url) markdown links in a string into React elements */
  const parseLinks = (text: string): React.ReactNode => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 transition-colors"
          style={{ color: section.color, textDecorationColor: section.color + "60" }}
        >
          {match[1]}
        </a>
      )
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts.length > 0 ? <>{parts}</> : text
  }

  /** Render content string, replacing {TriggerWord} with a clickable button and [text](url) with links */
  const renderContent = (text: string) => {
    if (step.infoPanel) {
      const { triggerWord } = step.infoPanel
      const marker = `{${triggerWord}}`
      const idx = text.indexOf(marker)
      if (idx !== -1) {
        const before = text.slice(0, idx)
        const after = text.slice(idx + marker.length)
        return (
          <>
            {parseLinks(before)}
            <button
              onClick={() => setInfoPanelOpen(!infoPanelOpen)}
              className="underline decoration-2 underline-offset-4 transition-colors inline-flex items-center gap-1"
              style={{ color: section.color, textDecorationColor: section.color + "60" }}
            >
              {triggerWord}
            </button>
            {parseLinks(after)}
          </>
        )
      }
    }
    return parseLinks(text)
  }

  return (
    <div className="h-screen flex flex-col bg-[#0F0F14]">
      {/* Top bar */}
      <div className="flex-shrink-0">
        {/* Progress line */}
        <div className="h-0.5 bg-white/5">
          <motion.div
            className="h-full"
            style={{ backgroundColor: section.color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <button
            onClick={onBackToHub}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-base"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Hub</span>
          </button>

          <span className="text-lg font-medium" style={{ color: section.color }}>
            {section.title}
          </span>

          <span className="text-base text-gray-600">
            {stepIndex + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-4xl px-4 md:px-8 py-8 md:py-12"
          >
            {/* Step title */}
            <div className="mb-6">
              {step.subtitle && (
                <p className="text-lg font-medium mb-2" style={{ color: section.color }}>
                  {step.subtitle}
                </p>
              )}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                {step.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                {renderContent(step.content)}
              </p>
            </div>

            {/* Expandable info panel */}
            <AnimatePresence>
              {infoPanelOpen && step.infoPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mb-8"
                >
                  <div className="bg-[#1A1A24] border rounded-xl p-7" style={{ borderColor: section.color + "30" }}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Info size={22} style={{ color: section.color }} />
                        {step.infoPanel.title}
                      </h3>
                      <button
                        onClick={() => setInfoPanelOpen(false)}
                        className="text-gray-500 hover:text-white transition-colors p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {step.infoPanel.paragraphs.map((p, i) => (
                        <p key={i} className="text-lg text-gray-400 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features grid */}
            {step.features && (
              <div className="grid sm:grid-cols-2 gap-4 my-8">
                {step.features.map((f) => {
                  const inner = (
                    <>
                      <div className="w-1 h-6 rounded-full mb-3" style={{ backgroundColor: f.color }} />
                      <h4 className="font-semibold text-white text-xl mb-2 flex items-center gap-2">
                        {f.label}
                        {f.link && <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />}
                      </h4>
                      <p className="text-lg text-gray-400">{f.description}</p>
                      {f.link && (
                        <p className="text-sm mt-3 font-medium transition-colors" style={{ color: f.color }}>
                          Learn more &rarr;
                        </p>
                      )}
                    </>
                  )

                  return f.link ? (
                    <a
                      key={f.label}
                      href={f.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[#1A1A24] border border-white/5 rounded-lg p-6
                                 hover:border-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                      {inner}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-lg"
                        style={{ backgroundColor: f.color }}
                      />
                    </a>
                  ) : (
                    <div key={f.label} className="bg-[#1A1A24] border border-white/5 rounded-lg p-6">
                      {inner}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Bullet points */}
            {step.bulletPoints && (
              <ul className="space-y-4 my-8">
                {step.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span
                      className="w-2 h-2 rounded-full mt-3 flex-shrink-0"
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="text-xl leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Placements */}
            {step.placements && (
              <div className="space-y-4 my-8">
                {step.placements.map((p, i) => (
                  <div key={i} className="bg-[#1A1A24] border border-white/5 rounded-lg p-6">
                    <code className="text-xl font-mono" style={{ color: section.color }}>{p.location}</code>
                    <p className="text-lg text-gray-300 mt-1">{p.scope}</p>
                    <p className="text-lg text-gray-500 mt-1">{p.example}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code block */}
            {step.code && (
              <CodeBlock code={step.code.code} language={step.code.language} filename={step.code.filename} copyable={step.code.copyable !== false} />
            )}

            {/* Command list */}
            {step.commandList && (
              <CommandList commands={step.commandList} />
            )}

            {/* Secondary code block */}
            {step.secondaryCode && (
              <CodeBlock
                code={step.secondaryCode.code}
                language={step.secondaryCode.language}
                filename={step.secondaryCode.filename}
                copyable={step.secondaryCode.copyable !== false}
              />
            )}

            {/* Terminal mockup */}
            {step.terminalMockup && <TerminalMockup />}

            {/* Prompt tabs */}
            {step.promptTabs && <PromptTabs tabs={step.promptTabs} />}

            {/* MCP servers */}
            {step.servers && (
              <div className="space-y-4 my-8">
                {step.servers.map((server) => (
                  <div key={server.name} className="bg-[#1A1A24] border border-white/5 rounded-lg p-6">
                    <h4 className="font-semibold text-white text-xl mb-1">{server.name}</h4>
                    <p className="text-lg text-gray-400 mb-2">{server.description}</p>
                    <code className="text-lg text-[#5B8DEF] font-mono break-all">{server.command}</code>
                  </div>
                ))}
              </div>
            )}

            {/* Branch choices */}
            {hasChoices && (
              <div className={`grid gap-6 my-10 ${step.choices!.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {step.choices!.map((choice) => {
                  const isPlatformChoice = choice.icon === "apple" || choice.icon === "windows"
                  return (
                    <button
                      key={choice.goTo}
                      onClick={() => onChoice(choice.goTo)}
                      className={`group relative bg-[#1A1A24] border border-white/10 rounded-2xl text-left
                                 hover:border-white/30 transition-all duration-300 overflow-hidden
                                 ${isPlatformChoice ? "p-10" : "p-7"}`}
                    >
                      <div
                        className={`rounded-xl flex items-center justify-center mb-5 ${isPlatformChoice ? "w-20 h-20" : "w-12 h-12"}`}
                        style={{ backgroundColor: section.color + "18", color: section.color }}
                      >
                        {getIcon(choice.icon, isPlatformChoice ? 40 : 24)}
                      </div>
                      <h4 className={`font-semibold text-white mb-2 ${isPlatformChoice ? "text-3xl" : "text-2xl"}`}>{choice.label}</h4>
                      <p className={`text-gray-400 ${isPlatformChoice ? "text-xl" : "text-xl"}`}>{choice.description}</p>
                      <ChevronRight
                        size={20}
                        className="absolute top-8 right-6 text-gray-600 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5"
                      />
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl"
                        style={{ backgroundColor: section.color }}
                      />
                    </button>
                  )
                })}
              </div>
            )}

            {/* Resources section — scrollable grid */}
            {isResourceSection && (
              <div className="my-6 space-y-8">
                {resourceCategories.map((cat) => (
                  <div key={cat}>
                    <h3 className="text-2xl font-semibold text-white mb-4">{cat}</h3>
                    <div className="space-y-3">
                      {resourceLinks
                        .filter((r) => r.category === cat)
                        .map((link) => (
                          <a
                            key={link.title}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-[#1A1A24] border border-white/5 rounded-lg p-6 hover:border-[#D47B2A]/30 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-white text-xl group-hover:text-[#D47B2A] transition-colors">
                                  {link.title}
                                </h4>
                                <p className="text-lg text-gray-500 mt-1">{link.description}</p>
                              </div>
                              <ExternalLink
                                size={14}
                                className="text-gray-600 group-hover:text-[#D47B2A] flex-shrink-0 mt-1 ml-3 transition-colors"
                              />
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex-shrink-0 border-t border-white/10 bg-[#12121A] px-4 md:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-gray-300
                       border border-white/10 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
          >
            <ArrowLeft size={20} /> Back
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === stepIndex ? "w-8 h-2.5" : "w-2.5 h-2.5"
                }`}
                style={{
                  backgroundColor: i === stepIndex ? section.color : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {!hasChoices && stepIndex < totalSteps - 1 ? (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-white
                         transition-all hover:brightness-110"
              style={{ backgroundColor: section.color }}
            >
              Next <ArrowRight size={20} />
            </button>
          ) : !hasChoices ? (
            <button
              onClick={onBackToHub}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium text-white
                         transition-all hover:brightness-110"
              style={{ backgroundColor: section.color }}
            >
              Finish <Home size={20} />
            </button>
          ) : (
            <div className="w-[110px]" /> // spacer when choices are shown
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────

export default function ClaudeCodeGuidePage() {
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [history, setHistory] = useState<{ sectionId: string; stepIndex: number }[]>([])
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const currentSection = useMemo(
    () => guideSections.find((s) => s.id === currentSectionId) || null,
    [currentSectionId]
  )

  const currentStep = useMemo(
    () => currentSection?.steps[currentStepIndex] || null,
    [currentSection, currentStepIndex]
  )

  const isResourceSection = currentSectionId === "resources"

  /** Navigate to a section from the hub */
  const selectSection = useCallback((sectionId: string) => {
    setDirection(1)
    setCurrentSectionId(sectionId)
    setCurrentStepIndex(0)
    setHistory([])
  }, [])

  /** Go to next step */
  const goNext = useCallback(() => {
    if (!currentSection || !currentStep) return
    if (currentStep.nextStepId) {
      const targetIndex = currentSection.steps.findIndex((s) => s.id === currentStep.nextStepId)
      if (targetIndex !== -1) {
        setDirection(1)
        setHistory((h) => [...h, { sectionId: currentSection.id, stepIndex: currentStepIndex }])
        setCurrentStepIndex(targetIndex)
        return
      }
    }
    if (currentStepIndex < currentSection.steps.length - 1) {
      setDirection(1)
      setHistory((h) => [...h, { sectionId: currentSection.id, stepIndex: currentStepIndex }])
      setCurrentStepIndex((i) => i + 1)
    }
  }, [currentSection, currentStep, currentStepIndex])

  /** Go to previous step or back to hub */
  const goPrev = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setDirection(-1)
      setHistory((h) => h.slice(0, -1))
      setCurrentSectionId(prev.sectionId)
      setCurrentStepIndex(prev.stepIndex)
    } else if (currentStepIndex > 0) {
      setDirection(-1)
      setCurrentStepIndex((i) => i - 1)
    } else {
      backToHub()
    }
  }, [history, currentStepIndex])

  /** Handle branch choice */
  const handleChoice = useCallback(
    (goToId: string) => {
      if (!currentSection) return
      const targetIndex = currentSection.steps.findIndex((s) => s.id === goToId)
      if (targetIndex === -1) return
      setDirection(1)
      setHistory((h) => [...h, { sectionId: currentSection.id, stepIndex: currentStepIndex }])
      setCurrentStepIndex(targetIndex)
    },
    [currentSection, currentStepIndex]
  )

  /** Back to hub */
  const backToHub = useCallback(() => {
    setDirection(-1)
    setCurrentSectionId(null)
    setCurrentStepIndex(0)
    setHistory([])
  }, [])

  /** Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (currentSectionId === null) return // hub screen, no keyboard nav

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault()
          if (currentStep && !currentStep.choices) goNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          goPrev()
          break
        case "Escape":
          e.preventDefault()
          backToHub()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSectionId, currentStep, goNext, goPrev, backToHub])

  // ─── Render ──────────────────────────────────────────────────

  if (!currentSection || !currentStep) {
    return (
      <div className="bg-[#0F0F14] text-white min-h-screen">
        <HubScreen onSelectSection={selectSection} />
      </div>
    )
  }

  return (
    <div className="bg-[#0F0F14] text-white">
      <StepScreen
        step={currentStep}
        section={currentSection}
        stepIndex={currentStepIndex}
        totalSteps={currentSection.steps.length}
        direction={direction}
        onNext={goNext}
        onPrev={goPrev}
        onChoice={handleChoice}
        onBackToHub={backToHub}
        isResourceSection={isResourceSection}
      />
    </div>
  )
}
