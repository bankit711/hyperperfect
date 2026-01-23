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

      {/* Hero Content - Centered Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-4 bg-[#1a7bff]">
        {/* Headline */}
        <div className="text-center mb-8 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            Newsflash: ChatGPT is bad at Excel
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Chatbots weren't built for spreadsheets. This one is.
          </p>
        </div>

        {/* Animation - Hero Centerpiece */}
        <div className="w-full max-w-[900px] mb-8">
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
          href="https://help.hyperperfect.ai/Sign+Up"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-white text-[#1a7bff] hover:bg-white/90 px-8 py-4"
        >
          Try for Free in Excel
        </a>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            You control the outcome
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Use AI to enhance your workflow in real-time.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Accurate */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Accurate</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Best-in-class AI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Built-in error checks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Real-time control</span>
                </li>
              </ul>
            </div>

            {/* Fast */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Fast</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">PDF extractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Web search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Large datasets</span>
                </li>
              </ul>
            </div>

            {/* Secure */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Secure</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">Enterprise security</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1a7bff] font-bold mr-2">•</span>
                  <span className="text-gray-700">No training on data</span>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start building today</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              HyperPerfect is a certified Microsoft add-in that integrates directly into Excel.
            </p>
            <a
              href="https://help.hyperperfect.ai/Sign+Up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold transition-colors focus-visible:outline-none bg-[#1a7bff] text-white hover:bg-[#1565d8] px-8 py-4"
            >
              Try for Free in Excel
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
