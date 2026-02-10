"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight, Terminal, Trophy } from "lucide-react"

const resources = [
  {
    title: "AI Excel Challenge",
    description:
      "How good is AI at Excel, really? Watch Claude tackle a three-statement model solo, then see HyperPerfect eliminate its remaining errors.",
    icon: Trophy,
    href: "/resources/ai-excel-challenge/",
    tag: "Comparison",
  },
  {
    title: "Claude Code Guide",
    description:
      "A practical guide to using AI's most powerful coding tool. Learn setup, CLAUDE.md, MCP Servers, and build a Chrome extension from scratch.",
    icon: Terminal,
    href: "/resources/claude-code-guide/",
    tag: "Interactive Guide",
  },
]

export default function ResourcesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" className="flex items-center">
              <span className="text-white font-bold text-3xl md:text-4xl">HyperPerfect</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="https://help.hyperperfect.ai/Quick+Start"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Quick Start
              </Link>
              <Link
                href="https://help.hyperperfect.ai/Why+HyperPerfect%3F"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Benefits
              </Link>
              <Link
                href="https://help.hyperperfect.ai/Quick+Start"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Help
              </Link>
              <Link
                href="/resources"
                className="text-white hover:text-white text-xl font-medium transition-colors border-b-2 border-white pb-1"
              >
                Resources
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-medium transition-colors focus-visible:outline-none border-2 border-white text-white hover:bg-white hover:text-[#1a7bff] px-6 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <Link
                href="https://help.hyperperfect.ai/Quick+Start"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quick Start
              </Link>
              <Link
                href="https://help.hyperperfect.ai/Why+HyperPerfect%3F"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="https://help.hyperperfect.ai/Quick+Start"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link
                href="/resources"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <div className="pt-6 border-t border-white/20" />
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-medium transition-colors border-2 border-white text-white hover:bg-white hover:text-[#1a7bff] py-4 w-full text-center"
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

      {/* Hero - Blue */}
      <div className="relative z-10 bg-[#1a7bff] pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Resources
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Guides, tutorials, and tools to help you get the most out of Claude Code and HyperPerfect.
          </p>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="relative z-10 bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group block bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Card top accent */}
                  <div className="h-1 bg-[#1a7bff]" />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-[#1a7bff]/10 flex items-center justify-center">
                        <Icon size={24} className="text-[#1a7bff]" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#1a7bff] bg-[#1a7bff]/10 px-3 py-1 rounded-full">
                        {resource.tag}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1a7bff] transition-colors">
                      {resource.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {resource.description}
                    </p>

                    <div className="flex items-center text-[#1a7bff] font-medium transition-all duration-300 group-hover:translate-x-1">
                      Explore
                      <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white font-bold text-xl">HyperPerfect</span>
          <div className="flex gap-8">
            <Link
              href="https://help.hyperperfect.ai/Terms+of+Service"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="https://help.hyperperfect.ai/Privacy+Policy"
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
