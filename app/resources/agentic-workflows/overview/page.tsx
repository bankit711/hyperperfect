"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// ── Signal output cards ─────────────────────────────────────────────

const SIGNALS = [
  { id: "leads", label: "High Intent Leads", color: "#10b981", icon: "◎" },
  { id: "activity", label: "Customer Activity", color: "#3b82f6", icon: "◇" },
  { id: "churn", label: "Churn Risk", color: "#ef4444", icon: "⏱" },
  { id: "deals", label: "Deal Overviews", color: "#f59e0b", icon: "▷" },
]

// ── Data source cards ───────────────────────────────────────────────

const DATA_SOURCES = [
  { id: "website", label: "Website", desc: "Customer Interactions", icon: "◆" },
  { id: "crm", label: "CRM", desc: "New Leads", icon: "↕" },
  { id: "email-cal", label: "Email & Calendar", desc: "Communications", icon: "✉" },
]

// ── Page styles ─────────────────────────────────────────────────────

const pageStyles = `
  /* ── Entrance animations ── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(24px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleGlow {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes flowPulse {
    0% { stroke-dashoffset: 16; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes flowPulseVertical {
    0% { stroke-dashoffset: 16; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes heartbeat {
    0%, 100% {
      box-shadow:
        0 0 16px rgba(59, 130, 246, 0.3),
        0 0 32px rgba(59, 130, 246, 0.1),
        inset 0 0 20px rgba(59, 130, 246, 0.05);
    }
    50% {
      box-shadow:
        0 0 28px rgba(59, 130, 246, 0.5),
        0 0 56px rgba(59, 130, 246, 0.15),
        inset 0 0 30px rgba(59, 130, 246, 0.08);
    }
  }

  /* ── Shimmer sweep across AI Agent card ── */
  @keyframes shimmerSweep {
    0% { transform: translateX(-100%) rotate(-15deg); }
    100% { transform: translateX(200%) rotate(-15deg); }
  }

  /* ── Flowing particles ── */
  @keyframes particleFlow {
    0% { transform: translateX(-20px); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateX(calc(100% + 20px)); opacity: 0; }
  }

  @keyframes particleFlow2 {
    0% { transform: translateX(-10px); opacity: 0; }
    25% { opacity: 0.8; }
    75% { opacity: 0.8; }
    100% { transform: translateX(calc(100% + 10px)); opacity: 0; }
  }

  /* ── Border glow rotation ── */
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(59, 130, 246, 0.4); }
    25% { border-color: rgba(99, 102, 241, 0.6); }
    50% { border-color: rgba(59, 130, 246, 0.7); }
    75% { border-color: rgba(37, 99, 235, 0.5); }
  }

  /* ── Pulsing sonar ring ── */
  @keyframes sonarPing {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.35); opacity: 0; }
  }

  /* ── Arrow beckon ── */
  @keyframes arrowBeckon {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(6px); }
  }

  /* ── Portal zoom ── */
  .portal-container {
    position: fixed;
    z-index: 201;
    overflow: hidden;
    border-radius: 16px;
    border: 1px solid rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    transition:
      top 1s cubic-bezier(0.4, 0, 0.2, 1),
      left 1s cubic-bezier(0.4, 0, 0.2, 1),
      width 1s cubic-bezier(0.4, 0, 0.2, 1),
      height 1s cubic-bezier(0.4, 0, 0.2, 1),
      border-radius 1s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 1s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .portal-container.zooming {
    border-radius: 0;
    border-color: transparent;
    box-shadow:
      0 0 60px rgba(59, 130, 246, 0.4),
      0 0 120px rgba(59, 130, 246, 0.2);
  }

  .portal-container.done {
    border-color: transparent;
    box-shadow: none;
  }

  .portal-iframe {
    position: absolute;
    border: none;
    background: #0f1117;
    transform-origin: top left;
  }

  .portal-blackout {
    position: fixed;
    inset: 0;
    background: #0f1117;
    z-index: 199;
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .portal-blackout.active {
    opacity: 1;
  }

  .portal-preload {
    position: fixed;
    top: -200vh;
    left: -200vw;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 0;
  }

  /* ── Flow node cards ── */
  .flow-node {
    position: relative;
    border-radius: 20px;
    padding: 32px 36px;
    transition: transform 0.15s, box-shadow 0.15s;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .flow-node:hover {
    transform: translateY(-2px);
  }

  .flow-node-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .flow-node-desc {
    font-size: 17px;
    color: #a1a1aa;
    line-height: 1.5;
  }

  /* ── Data source cards ── */
  .node-source {
    background: linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(49, 46, 129, 0.4));
    border: 1px solid rgba(99, 102, 241, 0.3);
  }
  .node-source:hover {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 4px 24px rgba(99, 102, 241, 0.15);
  }

  /* ── Skill node (AI Agent) ── */
  .node-skill {
    background: linear-gradient(135deg, rgba(12, 26, 46, 0.85), rgba(23, 37, 84, 0.65));
    border: 2px solid rgba(96, 165, 250, 0.6);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .node-skill:hover {
    border-color: rgba(59, 130, 246, 0.8);
    box-shadow:
      0 4px 32px rgba(59, 130, 246, 0.3),
      0 0 60px rgba(59, 130, 246, 0.1);
    transform: translateY(-3px) scale(1.02);
  }

  .node-skill.animated {
    animation:
      heartbeat 2.5s ease-in-out infinite,
      borderGlow 4s ease-in-out infinite;
  }

  /* Shimmer light sweep */
  .node-skill-shimmer {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    border-radius: 20px;
  }

  .node-skill-shimmer::after {
    content: '';
    position: absolute;
    top: -50%;
    left: 0;
    width: 60%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.08),
      rgba(147, 197, 253, 0.12),
      rgba(59, 130, 246, 0.08),
      transparent
    );
    animation: shimmerSweep 3.5s ease-in-out infinite;
    animation-delay: 1s;
  }

  /* Particle dots */
  .node-skill-particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    border-radius: 20px;
  }

  .node-skill-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.6);
    box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
  }

  /* Sonar ping ring */
  .node-skill-sonar {
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    border: 1px solid rgba(59, 130, 246, 0.4);
    pointer-events: none;
    z-index: 0;
    animation: sonarPing 3s ease-out infinite;
  }

  .node-skill-sonar:nth-child(2) {
    animation-delay: 1.5s;
  }

  /* Beckoning arrow */
  .node-skill-arrow {
    display: inline-block;
    animation: arrowBeckon 1.5s ease-in-out infinite;
  }

  /* ── Signal cards ── */
  .signal-card {
    border-radius: 14px;
    padding: 18px 24px;
    background: rgba(24, 24, 27, 0.8);
    border: 1px solid #27272a;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .signal-card:hover {
    transform: translateY(-1px);
    border-color: #3f3f46;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }

  .signal-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .signal-label {
    font-size: 18px;
    font-weight: 600;
    color: #e4e4e7;
    flex: 1;
  }

  /* ── Human review node ── */
  .node-human {
    background: linear-gradient(135deg, rgba(20, 38, 26, 0.6), rgba(6, 78, 59, 0.4));
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  .node-human:hover {
    border-color: rgba(16, 185, 129, 0.6);
    box-shadow: 0 4px 24px rgba(16, 185, 129, 0.15);
  }

  /* ── Output card ── */
  .node-output {
    background: linear-gradient(135deg, rgba(42, 26, 10, 0.6), rgba(69, 26, 3, 0.4));
    border: 1px solid rgba(217, 119, 6, 0.3);
  }
  .node-output:hover {
    border-color: rgba(217, 119, 6, 0.6);
    box-shadow: 0 4px 24px rgba(217, 119, 6, 0.15);
  }

  /* ── Update data card ── */
  .node-update {
    background: linear-gradient(135deg, rgba(20, 20, 40, 0.6), rgba(30, 27, 60, 0.4));
    border: 1px solid rgba(139, 92, 246, 0.3);
  }
  .node-update:hover {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 4px 24px rgba(139, 92, 246, 0.15);
  }

  /* ── SVG flow paths ── */
  .flow-path {
    fill: none;
    stroke: #27272a;
    stroke-width: 2;
  }

  .flow-path-animated {
    fill: none;
    stroke-width: 2.5;
    stroke-dasharray: 5 5;
    animation: flowPulse 0.6s linear infinite;
  }

  /* ── Column headers ── */
  .col-header {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #52525b;
    margin-bottom: 24px;
    text-align: center;
    flex-shrink: 0;
  }

  /* ── Desktop layout ── */
  .flow-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 56px;
    align-items: stretch;
    justify-content: center;
    position: relative;
    padding: 0;
  }

  .flow-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    z-index: 2;
  }

  .flow-col-center {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    z-index: 2;
    justify-content: center;
    min-height: 100%;
  }

  .flow-svg-layer {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: visible;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .flow-grid {
      grid-template-columns: 1fr;
      gap: 8px;
      min-height: auto;
      padding: 0;
    }

    .flow-svg-layer {
      display: none;
    }

    .col-header {
      margin-top: 24px;
    }

    .flow-col-center {
      min-height: auto;
    }

    .mobile-arrow {
      display: flex !important;
      justify-content: center;
      padding: 4px 0;
      color: #3f3f46;
      font-size: 20px;
    }

  }

  @media (min-width: 901px) {
    .mobile-arrow {
      display: none !important;
    }
  }
`

// SVG path definition type
interface SvgPath {
  from: string
  to: string
  d: string
  color: string
  delay: string
}

export default function DailyBriefingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [svgPaths, setSvgPaths] = useState<SvgPath[]>([])

  // Portal zoom state
  const [portalActive, setPortalActive] = useState(false)
  const [portalZooming, setPortalZooming] = useState(false)
  const [portalDone, setPortalDone] = useState(false)
  const [portalStart, setPortalStart] = useState({ top: 0, left: 0, width: 0, height: 0 })

  const gridRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const skillNodeRef = useRef<HTMLDivElement | null>(null)

  const setNodeRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    nodeRefs.current[id] = el
    if (id === "skill") skillNodeRef.current = el
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Calculate SVG paths from actual DOM positions
  const calcPaths = useCallback(() => {
    const grid = gridRef.current
    if (!grid) return

    const gridRect = grid.getBoundingClientRect()
    const getPoint = (id: string, side: "right" | "left" | "bottom" | "top") => {
      const el = nodeRefs.current[id]
      if (!el) return null
      const r = el.getBoundingClientRect()
      switch (side) {
        case "right":
          return { x: r.right - gridRect.left, y: r.top + r.height / 2 - gridRect.top }
        case "left":
          return { x: r.left - gridRect.left, y: r.top + r.height / 2 - gridRect.top }
        case "bottom":
          return { x: r.left + r.width / 2 - gridRect.left, y: r.bottom - gridRect.top }
        case "top":
          return { x: r.left + r.width / 2 - gridRect.left, y: r.top - gridRect.top }
      }
    }

    const paths: SvgPath[] = []

    // Horizontal paths
    const hDefs: { from: string; to: string; color: string; delay: string }[] = [
      { from: "website", to: "skill", color: "#6366f1", delay: "0s" },
      { from: "crm", to: "skill", color: "#6366f1", delay: "0.1s" },
      { from: "email-cal", to: "skill", color: "#6366f1", delay: "0.2s" },
      { from: "skill", to: "human", color: "#10b981", delay: "0.3s" },
    ]

    for (const def of hDefs) {
      const start = getPoint(def.from, "right")
      const end = getPoint(def.to, "left")
      if (!start || !end) continue

      const dx = end.x - start.x
      const cp1x = start.x + dx * 0.4
      const cp2x = end.x - dx * 0.4
      const d = `M ${start.x} ${start.y} C ${cp1x} ${start.y}, ${cp2x} ${end.y}, ${end.x} ${end.y}`

      paths.push({ from: def.from, to: def.to, d, color: def.color, delay: def.delay })
    }

    // Vertical path: Approval → Daily Briefing
    const vStart = getPoint("human", "bottom")
    const vEnd = getPoint("briefing", "top")
    if (vStart && vEnd) {
      const dy = vEnd.y - vStart.y
      const d = `M ${vStart.x} ${vStart.y} C ${vStart.x} ${vStart.y + dy * 0.4}, ${vEnd.x} ${vEnd.y - dy * 0.4}, ${vEnd.x} ${vEnd.y}`
      paths.push({ from: "human", to: "briefing", d, color: "#d97706", delay: "0.4s" })
    }

    // Vertical path: Daily Briefing → Update Data
    const v2Start = getPoint("briefing", "bottom")
    const v2End = getPoint("update", "top")
    if (v2Start && v2End) {
      const dy = v2End.y - v2Start.y
      const d = `M ${v2Start.x} ${v2Start.y} C ${v2Start.x} ${v2Start.y + dy * 0.4}, ${v2End.x} ${v2End.y - dy * 0.4}, ${v2End.x} ${v2End.y}`
      paths.push({ from: "briefing", to: "update", d, color: "#8b5cf6", delay: "0.5s" })
    }

    setSvgPaths(paths)
  }, [])

  // Recalculate paths after animation and on resize
  useEffect(() => {
    if (!animated) return
    const timer = setTimeout(calcPaths, 1500)
    window.addEventListener("resize", calcPaths)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calcPaths)
    }
  }, [animated, calcPaths])

  // Connection path highlights
  const connections: Record<string, string[]> = {
    "website": ["skill"],
    "crm": ["skill"],
    "email-cal": ["skill"],
    "skill": ["website", "crm", "email-cal", "human"],
    "human": ["skill", "briefing"],
    "briefing": ["human", "update"],
    "update": ["briefing"],
  }

  const pathOpacity = (from: string, to: string) => {
    if (!hoveredNode) return 1
    const conns = connections[hoveredNode]
    if (!conns) return 0.4
    if (hoveredNode === from || hoveredNode === to) return 1
    if (conns.includes(from) || conns.includes(to)) return 1
    return 0.4
  }

  // Portal zoom: expand from AI Agent node into architecture page
  const triggerPortalZoom = useCallback(() => {
    const el = skillNodeRef.current
    if (!el || portalActive) return

    const rect = el.getBoundingClientRect()
    setPortalStart({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
    setPortalActive(true)

    // Start the zoom after the portal renders at node position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPortalZooming(true)
      })
    })

    // After zoom completes, let the iframe take over as the page
    setTimeout(() => {
      setPortalDone(true)
      history.pushState(null, "", "/resources/agentic-workflows/architecture/")
    }, 1100)
  }, [portalActive])

  return (
    <div className="relative min-h-screen bg-[#09090b]">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      {/* Preload architecture page in hidden iframe */}
      <iframe
        src="/resources/agentic-workflows/architecture/"
        className="portal-preload"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Portal zoom overlay */}
      {portalActive && (
        <>
          {!portalDone && <div className={`portal-blackout ${portalZooming ? "active" : ""}`} />}
          <div
            className={`portal-container ${portalZooming ? "zooming" : ""} ${portalDone ? "done" : ""}`}
            style={
              portalDone
                ? { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }
                : portalZooming
                  ? { top: 0, left: 0, width: "100vw", height: "100vh" }
                  : { top: portalStart.top, left: portalStart.left, width: portalStart.width, height: portalStart.height }
            }
          >
            <iframe
              src="/resources/agentic-workflows/architecture/"
              className="portal-iframe"
              tabIndex={-1}
              style={
                portalDone
                  ? {
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      transform: "scale(1)",
                    }
                  : portalZooming
                    ? {
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        transform: "scale(1)",
                        transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                      }
                    : {
                        top: 0,
                        left: 0,
                        width: `${typeof window !== "undefined" ? window.innerWidth : 1440}px`,
                        height: `${typeof window !== "undefined" ? window.innerHeight : 900}px`,
                        transform: `scale(${portalStart.width / (typeof window !== "undefined" ? window.innerWidth : 1440)})`,
                        transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                      }
              }
            />
          </div>
        </>
      )}

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090b]/95 backdrop-blur border-b border-[#27272a] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-3xl md:text-4xl text-white">
                HyperPerfect
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "/help/quick-start", label: "Quick Start" },
                { href: "/help/why-hyperperfect", label: "Benefits" },
                { href: "/pricing", label: "Pricing" },
                { href: "/help", label: "Help" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/resources"
                className="text-xl font-medium text-white border-b-2 border-white pb-1 transition-colors duration-300"
              >
                Resources
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 border-2 border-white text-white hover:bg-white hover:text-[#09090b] px-6 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-16">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              {[
                { href: "/help/quick-start", label: "Quick Start" },
                { href: "/help/why-hyperperfect", label: "Benefits" },
                { href: "/pricing", label: "Pricing" },
                { href: "/help", label: "Help" },
                { href: "/resources", label: "Resources" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-3xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/20" />
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 border-2 border-white text-white hover:bg-white hover:text-brand py-4 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="pt-36 pb-12 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-nowrap"
            style={{ letterSpacing: "-0.5px" }}
          >
            Daily AI-Generated Sales Report
          </h1>
          <p className="text-2xl md:text-3xl text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed">
            Build in hours, not days with AI
          </p>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="px-4 md:px-6 pb-40">
        <div className="max-w-[1400px] mx-auto" style={{ position: "relative" }} ref={gridRef}>
          <div className="flow-grid">

            {/* SVG connection layer (desktop only) */}
            <svg
              className="flow-svg-layer"
              style={{ width: "100%", height: "100%" }}
            >
              {svgPaths.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  className={animated ? "flow-path-animated" : "flow-path"}
                  style={{
                    stroke: p.color,
                    animationDelay: p.delay,
                    opacity: pathOpacity(p.from, p.to),
                    transition: "opacity 0.2s",
                  }}
                />
              ))}
            </svg>

            {/* Column 1: Data Sources */}
            <div className="flow-col">
              <div className="col-header">Sources</div>
              {DATA_SOURCES.map((source, i) => (
                <div
                  key={source.id}
                  ref={setNodeRef(source.id)}
                  className="flow-node node-source"
                  onMouseEnter={() => setHoveredNode(source.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    opacity: animated ? 1 : 0,
                    animation: animated ? "fadeInUp 0.4s ease-out forwards" : "none",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flow-node-title" style={{ color: "#818cf8" }}>
                    <span style={{ fontSize: 24 }}>{source.icon}</span> {source.label}
                  </div>
                  <div className="flow-node-desc">{source.desc}</div>
                </div>
              ))}
            </div>

            <div className="mobile-arrow">↓</div>

            {/* Column 2: AI Intelligence (Skill + Signals) */}
            <div className="flow-col">
              <div className="col-header">AI Intelligence</div>
              <div
                ref={setNodeRef("skill")}
                className={`flow-node node-skill ${animated ? "animated" : ""}`}
                onClick={triggerPortalZoom}
                onMouseEnter={() => setHoveredNode("skill")}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  opacity: animated ? 1 : 0,
                  animation: animated ? "scaleGlow 0.4s ease-out forwards" : "none",
                  animationDelay: "500ms",
                }}
              >
                {/* Sonar ping rings */}
                {animated && <>
                  <div className="node-skill-sonar" />
                  <div className="node-skill-sonar" />
                </>}

                {/* Shimmer sweep */}
                <div className="node-skill-shimmer" />

                {/* Flowing particle dots */}
                {animated && (
                  <div className="node-skill-particles">
                    {[
                      { top: "25%", delay: "0s", dur: "2.8s" },
                      { top: "50%", delay: "0.9s", dur: "3.2s" },
                      { top: "70%", delay: "1.8s", dur: "2.5s" },
                      { top: "35%", delay: "2.4s", dur: "3s" },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="node-skill-particle"
                        style={{
                          top: p.top,
                          animation: `${i % 2 === 0 ? "particleFlow" : "particleFlow2"} ${p.dur} ease-in-out infinite`,
                          animationDelay: p.delay,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div style={{ color: "#60a5fa", position: "relative", zIndex: 2, fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px" }}>
                  Agentic AI
                </div>
                <div style={{ position: "relative", zIndex: 2, fontSize: 19, fontWeight: 600, color: "rgba(147, 197, 253, 0.8)", marginTop: 6 }}>
                  See how it works <span className="node-skill-arrow">&rarr;</span>
                </div>
              </div>

              {/* Signal output cards */}
              <div
                onMouseEnter={() => setHoveredNode("skill")}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {SIGNALS.map((signal, i) => (
                  <div
                    key={signal.id}
                    className="signal-card"
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: signal.color,
                      opacity: animated ? 1 : 0,
                      animation: animated ? "fadeInUp 0.3s ease-out forwards" : "none",
                      animationDelay: `${600 + i * 80}ms`,
                    }}
                  >
                    <div
                      className="signal-icon"
                      style={{ background: `${signal.color}15`, color: signal.color }}
                    >
                      {signal.icon}
                    </div>
                    <div className="signal-label">{signal.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-arrow">↓</div>

            {/* Column 3: Output */}
            <div className="flow-col" style={{ justifyContent: "space-between", minHeight: "100%" }}>
              <div className="col-header">Output</div>
              <div
                ref={setNodeRef("human")}
                className="flow-node node-human"
                onMouseEnter={() => setHoveredNode("human")}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  opacity: animated ? 1 : 0,
                  animation: animated ? "fadeInUp 0.4s ease-out forwards" : "none",
                  animationDelay: "1100ms",
                }}
              >
                <div className="flow-node-title" style={{ color: "#34d399" }}>
                  Approval
                </div>
                <div className="flow-node-desc">Review and refine through conversation with AI</div>
              </div>

              <div
                ref={setNodeRef("briefing")}
                className="flow-node node-output"
                onMouseEnter={() => setHoveredNode("briefing")}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  opacity: animated ? 1 : 0,
                  animation: animated ? "fadeInUp 0.4s ease-out forwards" : "none",
                  animationDelay: "1300ms",
                }}
              >
                <div className="flow-node-title" style={{ color: "#fbbf24" }}>
                  Daily Briefing
                </div>
                <div className="flow-node-desc">Your morning report, ready to act on</div>
              </div>

              <div
                ref={setNodeRef("update")}
                className="flow-node node-update"
                onMouseEnter={() => setHoveredNode("update")}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  opacity: animated ? 1 : 0,
                  animation: animated ? "fadeInUp 0.4s ease-out forwards" : "none",
                  animationDelay: "1500ms",
                }}
              >
                <div className="flow-node-title" style={{ color: "#a78bfa" }}>
                  Enrich Data
                </div>
                <div className="flow-node-desc">AI improves its own process and updates data at the source of truth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white font-bold text-xl">HyperPerfect</span>
          <div className="flex gap-8">
            <Link
              href="/help/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/help/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
