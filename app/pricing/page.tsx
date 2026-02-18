"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Check, Brain, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Script from "next/script"

const features = [
  "AI chat assistant inside Excel",
  "Read & modify worksheets with natural language",
  "File attachments (images & PDFs up to 32 MB)",
  "Custom instructions per account",
  "Conversation history with context compaction",
  "Multi-step task tracking",
  "Fast mode (Claude Sonnet 4.5)",
  "Smart mode (Claude Opus 4.6)",
]

const faqs = [
  {
    q: "How does usage work across plans?",
    a: "Each plan includes a monthly usage allowance based on your AI interactions. Simple tasks like quick lookups use very little. Complex tasks like building financial models or using Smart mode use more. Your settings panel shows a real-time usage bar so you always know where you stand.",
  },
  {
    q: "What's the difference between Fast and Smart mode?",
    a: "Fast mode uses Claude Sonnet 4.5 — great for quick tasks, formatting, and simple analysis. Smart mode uses Claude Opus 4.6 — the most capable reasoning model, ideal for complex financial modeling and multi-step analysis. Both are available on every plan.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade at any time from your settings panel. If you cancel, you'll retain access through the end of your billing period — no immediate cutoff.",
  },
  {
    q: "How does the free plan work?",
    a: "The Free plan gives you ongoing access with a base usage allowance. During your first 30 days, you get 5x normal free usage to explore everything. After that, you stay on Free unless you upgrade — no data is lost either way.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. HyperPerfect uses enterprise-grade security. Your spreadsheet data stays private and is never used to train AI models.",
  },
]

export default function PricingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
            <Link href="/" className="flex items-center">
              <span
                className={`font-bold text-3xl md:text-4xl transition-colors duration-300 ${
                  isScrolled ? "text-hp-text-primary" : "text-white"
                }`}
              >
                HyperPerfect
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "/help/quick-start", label: "Quick Start" },
                { href: "/help/why-hyperperfect", label: "Benefits" },
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
              <Link
                href="/pricing"
                className={`text-xl font-medium transition-colors duration-300 border-b-2 pb-1 ${
                  isScrolled
                    ? "text-hp-text-primary border-hp-text-primary"
                    : "text-white border-white"
                }`}
              >
                Pricing
              </Link>
              {[
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

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://calendly.com/di-hyperperfect/30min"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-150 focus-visible:outline-none border-2 px-6 py-3 ${
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
      <div className="relative z-10 bg-brand pt-32 pb-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            Every feature on every plan. Choose the usage level that fits your workflow.
          </motion.p>
        </div>
      </div>

      {/* Stripe Pricing Table */}
      <div className="relative z-10 bg-surface-secondary px-4 py-16">
        <div className="mx-auto max-w-[1400px]">
          <Script async src="https://js.stripe.com/v3/pricing-table.js" />
          {/* @ts-expect-error Stripe pricing table is a custom element */}
          <stripe-pricing-table
            pricing-table-id="prctbl_1T21rxDOJmTSL9boHIbfoDEW"
            publishable-key="pk_live_51RYDdyDOJmTSL9bo2I6ROKMgt8gXYnRAq8XIkIgxpsfk9q5lUQjKb8xH5rdtjYYZXfi3gMcrLjtEqIQaYb7jedgV00l4ZM43yO"
          />
        </div>
      </div>

      {/* All Features */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-hp-text-primary mb-4">
              Everything included on every plan
            </h2>
            <p className="text-lg text-hp-text-secondary">
              No feature gates. No surprises.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 py-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center mt-0.5">
                  <Check size={12} className="text-brand" strokeWidth={3} />
                </div>
                <span className="text-hp-text-primary">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Mode Comparison */}
          <motion.div
            className="mt-16 grid sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <div className="rounded-lg border border-hp-border bg-surface-secondary p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Zap size={16} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-hp-text-primary">Fast Mode</h3>
              </div>
              <p className="text-sm text-hp-text-secondary">
                Claude Sonnet 4.5 — optimized for speed. Great for quick lookups, formatting, and simple tasks. Lower cost per interaction.
              </p>
            </div>
            <div className="rounded-lg border border-hp-border bg-surface-secondary p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <Brain size={16} className="text-violet-600" />
                </div>
                <h3 className="font-bold text-hp-text-primary">Smart Mode</h3>
              </div>
              <p className="text-sm text-hp-text-secondary">
                Claude Opus 4.6 — the most capable reasoning model. Ideal for financial modeling, complex analysis, and multi-step operations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 bg-surface-secondary py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-hp-text-primary mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Frequently asked questions
          </motion.h2>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-hp-border overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-hp-text-primary pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`text-hp-text-tertiary flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === i ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-hp-text-secondary">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 bg-brand py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Start using AI in Excel today
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            Free forever. No credit card. 5x usage for your first 30 days.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <Link
              href="/help/quick-start"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xl font-bold transition-all duration-150 focus-visible:outline-none bg-white text-brand hover:bg-white/90 px-8 py-4"
            >
              Try for Free in Excel
            </Link>
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
    </div>
  )
}
