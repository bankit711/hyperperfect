"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import SignupModal from "./signup-modal"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-white font-bold text-3xl md:text-4xl">HyperPerfect</span>
            </Link>

            {/* Desktop Navigation */}
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
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Resources
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none border-2 border-white text-white hover:bg-white hover:text-[#1a7bff] px-6 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
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
              <div className="pt-6 border-t border-white/20">
              </div>
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none border-2 border-white text-white hover:bg-white hover:text-[#1a7bff] py-4 w-full text-center"
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

      {/* Hero Content - Centered Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 bg-[#1a7bff]">
        {/* Announcement Banner */}
        <Link
          href="/resources/ai-excel-challenge"
          className="group inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 transition-all duration-200"
        >
          <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-sm font-extrabold px-3 py-1 rounded-full">✅ See the Proof</span>
          <span className="text-white text-sm md:text-base font-medium">Watch HyperPerfect eliminate Claude's errors in a heads-up Excel challenge.</span>
          <span className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all text-sm font-semibold whitespace-nowrap">→ See Results</span>
        </Link>

        {/* Headline */}
        <div className="text-center mb-12 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            Give Claude superpowers in Excel
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Now powered by Claude Opus 4.6, the world's leading model for Excel performance
          </p>
        </div>

        {/* Animation - Hero Centerpiece */}
        <div className="w-full max-w-[900px] mb-12">
          <div className="rounded-2xl overflow-hidden bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)]">
            <img
              src="/images/dcf_apple_demo.gif"
              alt="HyperPerfect AI automating Excel DCF analysis"
              className="w-full"
            />
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://help.hyperperfect.ai/Quick+Start"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-white text-[#1a7bff] hover:bg-white/90 px-8 py-4"
        >
          Try for Free in Excel
        </a>
      </div>

      {/* Why Section */}
      <div className="relative z-10 bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Why AI struggles with spreadsheets
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              AI models are notoriously bad at spreadsheets. You've likely asked it to build one, and received a file back that was riddled with errors and not exactly what you requested.
            </p>
            <p>
              <strong className="text-gray-900">Why?</strong> Claude, ChatGPT and other leading models were built using natural language, not spreadsheet formulas. Sending a firehose of Excel formulas, cell references, and formatting details causes internal chaos, which leads to hallucinations and errors.
            </p>
            <p>
              We fixed this by bringing AI inside of Excel and adding a data translation layer that fundamentally changes how AI communicates with spreadsheets.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Here's how it works:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-[#1a7bff] font-bold text-xl mr-4">1.</span>
                <span className="text-gray-700">We bring the absolute best AI models into Excel software and workflows</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#1a7bff] font-bold text-xl mr-4">2.</span>
                <span className="text-gray-700">Our proprietary indexing engine prevents 95% of hallucination errors</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#1a7bff] font-bold text-xl mr-4">3.</span>
                <span className="text-gray-700">Data transformation and enrichment improves AI comprehension by 10x</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xl md:text-2xl font-semibold text-center text-gray-900 mb-4 max-w-3xl mx-auto">
            Turn Excel into an AI agent that flawlessly builds models, cleans messy data, finds errors and makes dashboards look professional.
          </p>
          <div className="mb-12"></div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Accurate */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Accurate</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Best in class AI for task</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Built in error protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Real time task control</span>
                </li>
              </ul>
            </div>

            {/* Fast */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Fast</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Accurate PDF extractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Integrated Web search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Handles large datasets</span>
                </li>
              </ul>
            </div>

            {/* Secure */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Secure</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Enterprise security</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Data stays private</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">IT Dept approved</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Second CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn how to use Claude with Excel</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Get free tutorials, prompts, and techniques that turn Claude into your most powerful Excel tool.
            </p>
            <a
              href="https://help.hyperperfect.ai/Sign+Up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold transition-colors focus-visible:outline-none bg-[#1a7bff] text-white hover:bg-[#1565d8] px-8 py-4"
            >
              Start Learning Free
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Excel on lockdown? Use HyperPerfect in minutes with a free{" "}
              <a
                href="https://help.hyperperfect.ai/Quick+Start"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a7bff] underline hover:no-underline"
              >
                Excel Online account
              </a>.
            </p>
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

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  )
}
