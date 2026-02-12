"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import BrevoForm from "./brevo-form"

export default function CohortDemoPage() {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#1a7bff]"></div>

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
                href="/help/quick-start"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Quick Start
              </Link>
              <Link
                href="/help/why-hyperperfect"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Benefits
              </Link>
              <Link
                href="/help"
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Help
              </Link>
              <Link 
                href="/cohort-demo" 
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
                href="/help/quick-start"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quick Start
              </Link>
              <Link
                href="/help/why-hyperperfect"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="/help"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link 
                href="/cohort-demo" 
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

      {/* Main Content */}
      <div className="relative z-20 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Your Cohort Analysis File is Ready
              </h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-white font-semibold mb-2">
                  But here's something better:
                </p>
                <p className="text-xl md:text-2xl text-white font-bold">
                  What if you could just ask for it in Excel?
                </p>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
              {/* What is HyperPerfect - AI Chat Focused */}
              <div className="text-center mb-10 pb-10 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  HyperPerfect is AI-Powered Chat Inside Excel
                </h2>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Chat naturally to create cohort analyses. AI reads and writes to Excel in real-time. You control what you want, Excel does the work.
                </p>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                  <div className="flex items-start">
                    <span className="text-[#1a7bff] mr-3 text-2xl flex-shrink-0">💬</span>
                    <div>
                      <span className="font-semibold text-gray-900">Chat Naturally</span>
                      <p className="text-gray-600">"Create a cohort analysis from this data" — and it's done</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#1a7bff] mr-3 text-2xl flex-shrink-0">⚡</span>
                    <div>
                      <span className="font-semibold text-gray-900">Instant Execution</span>
                      <p className="text-gray-600">AI writes formulas and builds tables in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#1a7bff] mr-3 text-2xl flex-shrink-0">🧹</span>
                    <div>
                      <span className="font-semibold text-gray-900">Cleans Messy Data</span>
                      <p className="text-gray-600">Automatically fixes formatting and validation issues</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#1a7bff] mr-3 text-2xl flex-shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-gray-900">Checks Your Work</span>
                      <p className="text-gray-600">Verifies formulas and calculations for accuracy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stop Wasting Time Building - Pain Point Comparison */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Spend Less Time Building, More Time Using
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">❌ The Old Way</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Build a new analysis from scratch or hunt for one</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Spend hours checking formulas to make sure they work</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fix mistakes and debug errors constantly</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Tailor everything for what you really need</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">✅ With HyperPerfect</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><strong>Guide the AI</strong> Tell it what you want and iterate in real time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><strong>AI handles the hard work</strong> Figures out complex formulas for you</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><strong>AI audits the work</strong> Verifies formulas and ensures accuracy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><strong>Beautiful results</strong> — professionally-formatted analysis ready to use immediately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How It Works Section */}
              <div className="mb-10 bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  How It Works in 3 Steps
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#1a7bff] text-white rounded-full font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Select Your Data</h4>
                    <p className="text-gray-700">Load raw customer data in Excel</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#1a7bff] text-white rounded-full font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Chat Naturally</h4>
                    <p className="text-gray-700">"Create a cohort analysis by signup month"</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#1a7bff] text-white rounded-full font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Watch It Build</h4>
                    <p className="text-gray-700">AI generates formulas and tables instantly</p>
                  </div>
                </div>
                <p className="text-center text-lg text-gray-800 font-semibold mt-8 italic">
                  "You control the creation of what you want, but Excel does all the work"
                </p>
              </div>

              {/* Try It Yourself Section */}
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Try It Yourself
                </h3>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Download the sample file below to see a finished cohort analysis.
                  Then sign up to get HyperPerfect and create your own with AI chat.
                </p>
              </div>

              {/* Download Form */}
              <div className="bg-gray-50 rounded-lg p-8">
                <BrevoForm />
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/help/quick-start" className="text-[#1a7bff] hover:underline">
                    Quick Start Guide
                  </Link>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.loom.com/share/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=a36dbc55-6efb-4a90-bee8-7a6d3b2d3bba" className="text-[#1a7bff] hover:underline" target="_blank" rel="noopener noreferrer">
                    🎥 3-min Demo
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href="https://calendly.com/di-hyperperfect/30min" className="text-[#1a7bff] hover:underline" target="_blank" rel="noopener noreferrer">
                    📅 Book a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/20 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              © 2024 HyperPerfect. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/help/terms-of-service"
                className="text-white/80 hover:text-white text-sm"
              >
                Terms
              </Link>
              <Link
                href="/help/privacy-policy"
                className="text-white/80 hover:text-white text-sm"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}