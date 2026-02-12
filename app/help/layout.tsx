"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Rocket,
  BookOpen,
  Building2,
  FolderOpen,
  Scale,
  Menu,
  X,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"

/** Navigation structure matching content/help frontmatter */
const NAV_SECTIONS = [
  {
    category: "Getting Started",
    icon: Rocket,
    items: [
      { slug: "quick-start", title: "Quick Start" },
      { slug: "why-hyperperfect", title: "Why HyperPerfect?" },
      { slug: "sign-up", title: "Sign Up" },
    ],
  },
  {
    category: "Using HyperPerfect",
    icon: BookOpen,
    items: [
      { slug: "excel-functionality", title: "Excel Functionality" },
      { slug: "ai-prompting", title: "AI Prompting Tips" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
  {
    category: "Enterprise",
    icon: Building2,
    items: [
      { slug: "data-security", title: "Data Security" },
      { slug: "enterprise-access", title: "Enterprise Access" },
    ],
  },
  {
    category: "Resources",
    icon: FolderOpen,
    items: [
      { slug: "contact", title: "Contact Us" },
      { slug: "changelog", title: "Changelog" },
    ],
  },
  {
    category: "Legal",
    icon: Scale,
    items: [
      { slug: "terms-of-service", title: "Terms of Service" },
      { slug: "privacy-policy", title: "Privacy Policy" },
    ],
  },
]

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const currentSlug = pathname.split("/").pop()

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-[var(--font-work-sans)]">
      {/* Top header bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e2e5eb]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo + Help Center */}
            <div className="flex items-center gap-3">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 -ml-1.5 rounded-md text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <ArrowLeft size={16} className="text-[#9ca3af] group-hover:text-[#1a7bff] transition-colors" />
                <span className="font-bold text-[#374151] text-base">HyperPerfect</span>
              </Link>

              <span className="text-[#d1d5db] text-sm">/</span>

              <Link
                href="/help/quick-start"
                className="text-sm font-medium text-[#1a7bff] hover:text-[#1562cc] transition-colors"
              >
                Help Center
              </Link>
            </div>

            {/* Right: Back to main site */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#374151] transition-colors"
            >
              Back to site
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-[272px] shrink-0
            bg-white border-r border-[#e2e5eb] overflow-y-auto
            transition-transform duration-200 ease-out
            ${mounted && sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <nav className="py-6 px-4">
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.category} className="mb-6">
                  {/* Category header */}
                  <div className="flex items-center gap-2 px-3 mb-1.5">
                    <Icon size={14} className="text-[#9ca3af]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#9ca3af]">
                      {section.category}
                    </span>
                  </div>

                  {/* Items */}
                  <ul>
                    {section.items.map((item) => {
                      const isActive = currentSlug === item.slug
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/help/${item.slug}`}
                            className={`
                              block px-3 py-1.5 rounded-md text-[13px] transition-all duration-150
                              ${isActive
                                ? "bg-[#eff6ff] text-[#1a7bff] font-medium"
                                : "text-[#374151] hover:bg-[#f3f4f6] hover:text-[#111827]"
                              }
                            `}
                          >
                            {item.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}

            {/* Support footer */}
            <div className="mt-8 mx-3 p-4 rounded-lg bg-[#f8f9fb] border border-[#e2e5eb]">
              <p className="text-[11px] font-medium text-[#6b7280] mb-2">Need help?</p>
              <a
                href="mailto:help@hyperperfect.ai"
                className="text-[12px] text-[#1a7bff] hover:text-[#1562cc] font-medium transition-colors"
              >
                help@hyperperfect.ai
              </a>
              <div className="mt-2">
                <a
                  href="https://calendly.com/di-hyperperfect/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#6b7280] hover:text-[#374151] transition-colors"
                >
                  Book a demo call
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-16 py-10">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
