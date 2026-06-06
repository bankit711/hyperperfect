"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import WaitlistForm from "./waitlist-form"

const TEAM = [
  { name: "Penny", role: "Bookkeeping", img: "/grace/headshots/penny.png" },
  { name: "Margo", role: "Marketing", img: "/grace/headshots/margo.png" },
  { name: "Hank", role: "HR & Payroll", img: "/grace/headshots/hank.png" },
  { name: "Sam", role: "Purchasing", img: "/grace/headshots/sam.png" },
  { name: "Kit", role: "Customer Support", img: "/grace/headshots/kit.png" },
  { name: "Rex", role: "Data & Reporting", img: "/grace/headshots/rex.png" },
  { name: "Blake", role: "Proposals & Bids", img: "/grace/headshots/blake.png" },
]

const NAV_LINKS = [
  { href: "#what", label: "What she does" },
  { href: "#learns", label: "How she learns" },
  { href: "#day", label: "A day with Patricia" },
  { href: "#founding", label: "Founding access" },
]

function Eyebrow({ children, color = "slate" }: { children: React.ReactNode; color?: "slate" | "terra" }) {
  const c = color === "slate" ? "text-pat-slate" : "text-pat-terra-600"
  return (
    <div className={`flex items-center gap-4 text-sm font-medium uppercase tracking-[0.18em] ${c}`}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative font-dm bg-pat-paper text-pat-ink">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-pat-paper/90 backdrop-blur border-b border-pat-terra-200" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/patricia/patricia-400.png"
                alt="Patricia"
                className="w-10 h-10 rounded-full object-cover object-top ring-1 ring-pat-terra-200"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-2xl text-pat-ink">Patricia</span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-pat-ink-500 mt-0.5">by HyperPerfect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium whitespace-nowrap text-pat-ink-700 hover:text-pat-terra transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex">
              <button
                onClick={scrollToWaitlist}
                className="rounded-xl text-base font-medium px-6 py-2.5 bg-pat-terra text-pat-paper hover:bg-pat-terra-600 transition-colors"
              >
                Join the Waitlist
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-pat-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-pat-paper pt-20">
          <div className="container mx-auto px-6 py-8">
            <nav className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-3xl text-pat-ink"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setTimeout(scrollToWaitlist, 100)
                }}
                className="rounded-xl text-lg font-medium py-4 w-full bg-pat-terra text-pat-paper"
              >
                Join the Waitlist
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Announcement */}
          <motion.button
            onClick={scrollToWaitlist}
            className="group inline-flex items-center gap-3 mb-12 px-5 py-2 rounded-full bg-pat-terra-100 border border-pat-terra-200 hover:bg-pat-terra-200/60 transition-colors"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-pat-terra">
              <span className="w-2 h-2 rounded-full bg-pat-terra-500" />
              Early access
            </span>
            <span className="text-sm text-pat-ink-700">The founding cohort is filling up.</span>
            <span className="text-sm font-semibold text-pat-terra group-hover:translate-x-0.5 transition-transform">Claim your spot &rarr;</span>
          </motion.button>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy + form */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            >
              <Eyebrow color="terra">
                <span className="w-2.5 h-2.5 rounded-full bg-pat-slate" />
                Patricia · Personal Assistant
              </Eyebrow>
              <h1 className="font-serif text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-pat-ink mt-6">
                Meet <span className="italic text-pat-terra-600">Patricia.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-pat-ink-700 leading-snug mt-8 max-w-xl">
                Your inbox, calendar, and follow-ups handled around the clock, and without the headache.
              </p>
              <p className="text-base text-pat-ink-500 tracking-wide mt-5">
                A personal assistant for busy business owners and executives.
              </p>

              <div id="waitlist" className="scroll-mt-28 mt-10">
                <WaitlistForm variant="paper" />
              </div>
            </motion.div>

            {/* Right: hire card */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-sm rounded-[28px] bg-white border border-pat-terra-200 shadow-[0_30px_60px_-20px_rgba(42,26,20,0.18)] p-6">
                <div className="flex justify-between items-center text-xs font-medium uppercase tracking-[0.16em] text-pat-terra-600">
                  <span>Hire #001</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pat-terra-500" />
                    Available soon
                  </span>
                </div>
                <div className="mt-5 rounded-2xl overflow-hidden bg-pat-paper aspect-square">
                  <img
                    src="/patricia/patricia-400.png"
                    alt="Patricia"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-5">
                  <div className="font-serif text-4xl text-pat-ink leading-none">Patricia</div>
                  <div className="text-pat-terra-600 font-medium mt-2">Personal Assistant</div>
                </div>
                <div className="flex justify-between text-sm text-pat-ink-500 mt-5 pt-4 border-t border-pat-terra-100">
                  <span>Reports to · You</span>
                  <span>24 / 7</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-4 py-24 border-t border-pat-terra-100">
        <div className="container mx-auto max-w-5xl">
          <Eyebrow>
            <span>01</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>The Problem</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Are <span className="italic text-pat-terra-600">constant distractions</span> keeping you from focusing on what matters?
          </motion.h2>
          <p className="font-serif text-2xl md:text-3xl text-pat-ink-500 leading-snug mt-8 max-w-3xl">
            Email, scheduling, follow-ups, the loose ends. Half your day disappears before the real work starts.
          </p>
          <div className="mt-10 pt-8 border-t-2 border-pat-slate max-w-3xl">
            <p className="font-serif italic text-2xl md:text-3xl text-pat-ink leading-snug">
              You don&apos;t need another app or employee to manage. You need <span className="text-pat-terra-600">great support</span> so you can focus on what matters.
            </p>
          </div>
        </div>
      </section>

      {/* What she does + why she's different */}
      <section id="what" className="px-4 py-24 bg-pat-paper2/50 border-t border-pat-terra-100 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>02</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>Your Personal Assistant</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            A new hire who is available at a moment&apos;s notice, around the clock, and never quits.
          </motion.h2>

          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 mt-14">
            {/* What she does */}
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-pat-slate mb-7">What she does</div>
              <div className="flex flex-col">
                {[
                  ["i.", "Inbox & calendar", ""],
                  ["ii.", "Online tasks", "reservations, research, errands"],
                  ["iii.", "Todos & follow-through", ""],
                  ["iv.", "Drafts in your voice", ""],
                ].map(([num, title, sub], idx, arr) => (
                  <div
                    key={title}
                    className={`flex gap-5 items-baseline py-4 ${idx < arr.length - 1 ? "border-b border-pat-ink/10" : ""}`}
                  >
                    <span className="font-serif italic text-xl text-pat-terra-600 w-8 shrink-0">{num}</span>
                    <span className="font-serif text-2xl text-pat-ink">
                      {title}
                      {sub && <span className="font-dm text-base not-italic text-pat-ink-500"> — {sub}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why she's different */}
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-pat-slate mb-7">Why she&apos;s different</div>
              <div className="grid sm:grid-cols-2 gap-7">
                {[
                  ["Reliable.", "Juggles an impressive number of tasks without dropping a single ball. Ever."],
                  ["Talented.", "Strong writer, tech fluent, and deeply knowledgeable about your world."],
                  ["Adaptable.", "Tuned to fit your style from day one. She aims to please."],
                  ["Proactive.", "Surfaces what matters and flags issues before you have to ask."],
                ].map(([title, body]) => (
                  <div key={title}>
                    <div className="font-serif text-2xl text-pat-ink leading-tight">{title}</div>
                    <p className="text-pat-ink-700 mt-2 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="font-serif italic text-2xl text-pat-terra-600 mt-14 pt-8 border-t border-pat-ink/10">
            The leverage of a personal assistant, at a fraction of the cost.
          </p>
        </div>
      </section>

      {/* How she learns */}
      <section id="learns" className="px-4 py-24 border-t border-pat-terra-100 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>03</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>How Patricia Learns</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            She becomes invaluable as she gets to know you and your business.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-7 mt-14">
            {[
              ["i.", "She learns from the work itself.", "From every email, call, and meeting, Patricia picks up your customers, suppliers, employees, and the details that matter."],
              ["ii.", "She builds a memory of your business.", "A custom understanding of how you operate, so she makes better decisions and gives you foresight you didn't have before."],
            ].map(([num, title, body]) => (
              <div key={title} className="rounded-2xl bg-pat-paper2/60 border border-pat-terra-100 p-10">
                <div className="font-serif italic text-5xl text-pat-terra-600">{num}</div>
                <h3 className="font-serif text-3xl text-pat-ink mt-6 leading-tight">{title}</h3>
                <p className="text-lg text-pat-ink-700 mt-4 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="font-serif italic text-xl md:text-2xl text-pat-terra-600 text-center mt-12">
            Every conversation teaches her more about your world.
          </p>
        </div>
      </section>

      {/* Control */}
      <section className="px-4 py-24 bg-pat-ink text-pat-paper">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>
              <span className="text-pat-slate-400">04</span>
              <span className="h-px w-14 bg-pat-slate-400" />
              <span className="text-pat-slate-400">Control</span>
            </Eyebrow>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.0] tracking-tight mt-8">
              Patricia follows directions perfectly.
            </h2>
            <p className="text-xl text-pat-terra-200 mt-8 max-w-lg leading-relaxed">
              You keep total control over what she does on her own. She drafts, you decide. Nothing goes out without your say-so.
            </p>
            <p className="font-serif italic text-2xl text-pat-slate-400 mt-6 max-w-lg leading-snug">
              Just like a real hire, you widen the leash as she earns your trust.
            </p>
          </div>

          {/* Permissions panel */}
          <div className="rounded-2xl bg-pat-paper text-pat-ink p-7 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-center pb-5 border-b border-pat-ink/10">
              <div className="font-serif text-2xl">Patricia · Permissions</div>
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-pat-slate">Trust Level · 2</div>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              {[
                ["Sort & clean inbox", "Auto", "bg-pat-paper", "text-pat-terra-600"],
                ["Schedule meetings", "Auto", "bg-pat-paper", "text-pat-terra-600"],
                ["Reply to routine emails", "Draft only", "bg-pat-paper2", "text-pat-ink-500"],
                ["Send to clients", "Approval required", "bg-pat-slate-100", "text-pat-slate"],
                ["Make commitments for you", "Approval required", "bg-pat-slate-100", "text-pat-slate"],
              ].map(([label, status, bg, fg]) => (
                <div key={label} className={`flex justify-between items-center px-5 py-4 rounded-xl ${bg}`}>
                  <span className="text-lg">{label}</span>
                  <span className={`text-xs font-medium uppercase tracking-[0.1em] whitespace-nowrap ${fg}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A day with Patricia */}
      <section id="day" className="px-4 py-24 border-t border-pat-terra-100 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>05</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>A Day with Patricia</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-pat-ink mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Finally, support that works 24/7.
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              ["Morning", "Inbox sorted", "Wake up to a daily briefing: your schedule, the urgent items, and a curated inbox.", "terra"],
              ["Before 10am", "Meeting prep ready", "Briefing packages for your calls, so you walk in knowing exactly what matters.", "terra"],
              ["After calls", "Follow-ups logged", "Next steps tracked, commitments captured, everything prioritized for you.", "terra"],
              ["After work", "Always learning", "Patricia spends the night studying you and your business to become your most knowledgeable hire.", "slate"],
            ].map(([when, title, body, color]) => (
              <div key={String(when)}>
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${color === "slate" ? "bg-pat-slate" : "bg-pat-terra-600"}`} />
                  <span className={`text-sm font-medium uppercase tracking-[0.14em] ${color === "slate" ? "text-pat-slate" : "text-pat-terra-600"}`}>
                    {when}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-pat-ink mt-5 leading-tight">{title}</h3>
                <p className="text-pat-ink-700 mt-3 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The team / future */}
      <section className="px-4 py-24 bg-pat-paper2/50 border-t border-pat-terra-100">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>06</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>The Future</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Patricia is the first hire. A whole team is ready when you are.
          </motion.h2>
          <p className="text-lg text-pat-ink-700 mt-5 max-w-2xl">
            Same model, one role at a time. A full back office, hired one teammate at a time.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 mt-14">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-pat-terra-200 bg-pat-paper">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="font-serif text-xl text-pat-ink mt-3 leading-none">{m.name}</div>
                <div className="text-sm text-pat-ink-500 mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding access / CTA */}
      <section id="founding" className="px-4 py-24 bg-pat-terra text-pat-paper scroll-mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <Eyebrow color="slate">
            <span className="w-2.5 h-2.5 rounded-full bg-pat-slate-400 mx-auto" />
          </Eyebrow>
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-pat-terra-100 mb-8">Founding Access</div>
          <motion.h2
            className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Let&apos;s get <span className="italic text-pat-slate-100">Patricia hired.</span>
          </motion.h2>
          <p className="text-xl md:text-2xl text-pat-terra-100 mt-8 max-w-2xl mx-auto leading-snug">
            We&apos;re onboarding a limited founding group. Get an extended free run, earn credits for everyone you bring along, and a direct line to the team.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-12 text-left max-w-3xl mx-auto">
            {[
              ["Extended free access", "A long free run as a founding member, well beyond the standard trial."],
              ["Referral credits", "Bring others onto the list and earn credits toward your own free time."],
              ["Direct access", "A direct line to the team. Help shape Patricia."],
            ].map(([label, desc]) => (
              <div key={label} className="bg-pat-paper/10 border border-pat-paper/20 rounded-2xl p-6">
                <p className="font-serif text-xl mb-1">{label}</p>
                <p className="text-pat-terra-100 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <WaitlistForm variant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pat-ink text-pat-paper px-4 py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            <img
              src="/patricia/patricia-400.png"
              alt="Patricia"
              className="w-8 h-8 rounded-full object-cover object-top"
            />
            <span className="font-serif text-xl">Patricia</span>
            <span className="text-pat-ink-500 text-sm">by HyperPerfect</span>
          </div>
          <div className="flex gap-8 items-center text-sm">
            <Link href="/excel" className="text-pat-terra-200 hover:text-pat-paper transition-colors">
              Using HyperPerfect for Excel?
            </Link>
            <Link href="/help/terms-of-service" className="text-pat-terra-200 hover:text-pat-paper transition-colors">
              Terms
            </Link>
            <Link href="/help/privacy-policy" className="text-pat-terra-200 hover:text-pat-paper transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
