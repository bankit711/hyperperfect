"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-hp-border shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span
                className={`font-bold text-3xl md:text-4xl transition-colors duration-300 ${
                  isScrolled ? "text-hp-text-primary" : "text-white"
                }`}
              >
                HyperPerfect
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
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
                  className={`text-xl font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-hp-text-secondary hover:text-hp-text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none border-2 px-6 py-3 ${
                  isScrolled
                    ? "border-brand text-brand hover:bg-brand hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-brand"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors duration-300 ${
                isScrolled ? "text-hp-text-primary" : "text-white"
              }`}
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
                href="/pricing"
                className="text-white text-3xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/help"
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
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none border-2 border-white text-white hover:bg-white hover:text-brand py-4 w-full text-center"
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 bg-brand">
        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/resources/ai-excel-challenge"
            className="group inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 transition-all duration-200"
          >
            <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-sm font-extrabold px-3 py-1 rounded-full">See the Proof</span>
            <span className="text-white text-sm md:text-base font-medium">Watch HyperPerfect eliminate Claude&apos;s errors in a heads-up Excel challenge with Claude in Excel.</span>
            <span className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all text-sm font-semibold whitespace-nowrap">&rarr; See Results</span>
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-12 w-full"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            Reliable AI for Excel has Arrived
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Claude Opus 4.6 changed the game. HyperPerfect makes it flawless in Excel.
          </p>
        </motion.div>

        {/* Animation - Hero Centerpiece */}
        <motion.div
          className="w-full max-w-[900px] mb-12"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <div className="rounded-lg overflow-hidden bg-white shadow-hero">
            <video
              src="/images/dcf_apple_demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            href="/help/quick-start"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xl font-bold transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-white text-brand hover:bg-white/90 px-8 py-4"
          >
            Try for Free in Excel
          </Link>
        </motion.div>
      </div>

      {/* Why Section */}
      <div className="relative z-10 bg-surface-secondary py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-hp-text-primary mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Why AI struggles with spreadsheets
          </motion.h2>
          <motion.div
            className="space-y-6 text-lg text-hp-text-secondary"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <p>
              AI models are notoriously bad at spreadsheets. You&apos;ve likely asked it to build one, and received a file back that was riddled with errors and not exactly what you requested.
            </p>
            <p>
              <strong className="text-hp-text-primary">Why?</strong> Claude, ChatGPT and other leading models were built using natural language, not spreadsheet formulas. Sending a firehose of Excel formulas, cell references, and formatting details causes internal chaos, which leads to hallucinations and errors.
            </p>
            <p>
              We fixed this by bringing AI inside of Excel and adding a data translation layer that fundamentally changes how AI communicates with spreadsheets.
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold text-hp-text-primary mb-6 text-center">Here&apos;s how it works:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-brand font-bold text-xl mr-4">1.</span>
                <span className="text-hp-text-secondary">We bring the absolute best AI models into Excel software and workflows</span>
              </div>
              <div className="flex items-start">
                <span className="text-brand font-bold text-xl mr-4">2.</span>
                <span className="text-hp-text-secondary">Our proprietary indexing engine prevents 95% of hallucination errors</span>
              </div>
              <div className="flex items-start">
                <span className="text-brand font-bold text-xl mr-4">3.</span>
                <span className="text-hp-text-secondary">Data transformation and enrichment improves AI comprehension by 10x</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.p
            className="text-xl md:text-2xl font-semibold text-center text-hp-text-primary mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Turn Excel into an AI agent that flawlessly builds models, cleans messy data, finds errors and makes dashboards look professional.
          </motion.p>
          <div className="mb-12"></div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Accurate",
                items: ["Best in class AI for task", "Built in error protection", "Real time task control"],
              },
              {
                title: "Fast",
                items: ["Accurate PDF extractions", "Integrated Web search", "Handles large datasets"],
              },
              {
                title: "Secure",
                items: ["Enterprise security", "Data stays private", "IT Dept approved"],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-surface-secondary rounded-lg p-8 border border-hp-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-150"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              >
                <h3 className="text-xl font-bold text-hp-text-primary mb-4 text-center">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="text-brand font-bold mr-2">&bull;</span>
                      <span className="text-hp-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Second CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-hp-text-primary mb-4">Learn how to use HyperPerfect&apos;s AI in Excel</h3>
            <p className="text-hp-text-secondary mb-6 max-w-xl mx-auto">
              Get free tutorials, prompts, and techniques that turn AI into your most powerful Excel tool.
            </p>
            <Link
              href="/help/sign-up"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xl font-bold transition-all duration-150 focus-visible:outline-none bg-brand text-white hover:bg-brand-hover px-8 py-4"
            >
              Start Learning Free
            </Link>
            <p className="text-sm text-hp-text-tertiary mt-4">
              Excel on lockdown? Use HyperPerfect in minutes with a free{" "}
              <Link
                href="/help/quick-start"
                className="text-brand underline hover:no-underline"
              >
                Excel Online account
              </Link>.
            </p>
          </motion.div>
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

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  )
}
