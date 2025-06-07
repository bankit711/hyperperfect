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
                href="https://publish.obsidian.md/hyperperfect/Quick+Start" 
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Quick Start
              </Link>
              <Link 
                href="https://publish.obsidian.md/hyperperfect/Why+HyperPerfect%3F" 
                className="text-white/90 hover:text-white text-xl font-medium transition-colors"
              >
                Benefits
              </Link>
              <Link 
                href="https://publish.obsidian.md/hyperperfect/User+Guide" 
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
                href="https://publish.obsidian.md/hyperperfect/Quick+Start" 
                className="text-white text-3xl font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Quick Start
              </Link>
              <Link 
                href="https://publish.obsidian.md/hyperperfect/Why+HyperPerfect%3F" 
                className="text-white text-3xl font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link 
                href="https://publish.obsidian.md/hyperperfect/User+Guide" 
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
                <p className="text-lg md:text-xl text-white font-semibold">
                  But first: Want to learn to build your own in 90 seconds?
                </p>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
              {/* What is HyperPerfect - Quick Hit */}
              <div className="text-center mb-10 pb-10 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  HyperPerfect is a FREE Excel Add-in That:
                </h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                  <div className="flex items-center">
                    <span className="text-[#1a7bff] mr-3 text-2xl">🧹</span>
                    <span className="text-lg">Cleans messy data with automation</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#1a7bff] mr-3 text-2xl">⚡</span>
                    <span className="text-lg">Instantly build cohort analyses in Excel</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#1a7bff] mr-3 text-2xl">📊</span>
                    <span className="text-lg">Works underneath dashboard overlays</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#1a7bff] mr-3 text-2xl">🔍</span>
                    <span className="text-lg">100% auditable with formulas</span>
                  </div>
                </div>
              </div>

              {/* The Comparison - Simplified */}
              <div className="mb-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">❌ Manual Excel = Time Wasted</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Building & debugging formulas</li>
                      <li>• Hours fixing data</li>
                      <li>• Formula errors are common</li>
                      <li>• Excel struggles with large datasets</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">✅ HyperPerfect = Focus on Results</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Automated formula generation</li>
                      <li>• Instant/adjustable data cleansing</li>
                      <li>• 100% accuracy guaranteed</li>
                      <li>• Makes Excel run faster</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Download Form */}
              <div className="bg-gray-50 rounded-lg p-8">
                <BrevoForm />
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <a href="https://publish.obsidian.md/hyperperfect/Quick+Start" className="text-[#1a7bff] hover:underline" target="_blank" rel="noopener noreferrer">
                    📖 Quick Start Guide
                  </a>
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
                href="https://publish.obsidian.md/hyperperfect/Terms+of+Service" 
                className="text-white/80 hover:text-white text-sm"
              >
                Terms
              </Link>
              <Link 
                href="https://publish.obsidian.md/hyperperfect/Privacy+Policy" 
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