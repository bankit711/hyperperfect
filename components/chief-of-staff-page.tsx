"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import WaitlistForm from "./waitlist-form"

function Eyebrow({ children, color = "slate" }: { children: React.ReactNode; color?: "slate" | "terra" }) {
  const c = color === "slate" ? "text-pat-slate" : "text-pat-terra-600"
  return (
    <div className={`flex items-center gap-4 text-sm font-medium uppercase tracking-[0.18em] ${c}`}>
      {children}
    </div>
  )
}

// PDF "Chief of Staff" framing as the spine, enriched with the weighted scoring
// rubric and before/after detail from the Product Ops Loop case study. Founders
// anonymized to roles; no internal/confidential labeling.
const COMPARE = [
  ["Reports to", "You", "You"],
  ["Average salary", "$62,000", "$114,000"],
  ["Focus", "Daily tasks and logistics", "Cross-department initiatives"],
  ["The work", "Calendar, inbox, errands", "Manage projects, align teams, track goals"],
]

const PRACTICE = [
  [
    "01",
    "Gather the data",
    "I know every customer and synthesize feedback across every touchpoint. Every email read, every meeting reviewed.",
    ["HubSpot", "Gmail", "Granola"],
  ],
  [
    "02",
    "Score the priorities",
    "I rank every request on a weighted rubric tuned to your goals, so what gets built next is a decision, not a guess.",
    ["Scoring rubric"],
  ],
  [
    "03",
    "Draft the spec",
    "I write the requirements and drop them straight into your team's ticketing system, ready to build.",
    ["Linear", "GitHub"],
  ],
]

const ROI: [string, string, boolean][] = [
  ["WhatsApp ROI", "7.8x", true],
  ["Avg ROI", "3.4x", false],
]

const BEFORE_AFTER = [
  ["Decisions", "Gut feel", "Ranked and scored"],
  ["Feedback captured", "Whatever was remembered", "100%, nothing lost"],
  ["Leadership's view", "Secondhand, fragmented", "Full visibility into real needs"],
]

const STEPS = [
  ["Pick", "A process worth handing off."],
  ["Align", "On the goal, and how I'll decide."],
  ["Run", "I own it and report back every week."],
]

export default function ChiefOfStaffPage() {
  return (
    <div className="relative font-dm bg-pat-paper text-pat-ink">
      {/* Header */}
      <header className="border-b border-pat-terra-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
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
            <Link
              href="#start"
              className="rounded-xl text-base font-medium px-6 py-2.5 bg-pat-terra text-pat-paper hover:bg-pat-terra-600 transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-20 pb-16 md:pt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-1 ring-pat-terra-200 bg-pat-paper2">
                <img src="/patricia/patricia-400.png" alt="Patricia" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            >
              <Eyebrow color="terra">
                <span className="w-2.5 h-2.5 rounded-full bg-pat-slate" />
                Patricia · Chief of Staff
              </Eyebrow>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.97] tracking-tight text-pat-ink mt-6">
                Hire your new <span className="italic text-pat-terra-600">Chief of Staff.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-pat-ink-700 leading-snug mt-7">
                I&apos;m ready and available.
              </p>
              <p className="text-base text-pat-ink-500 tracking-wide mt-5 max-w-xl">
                You already trust me with your schedule, your inbox, and your follow-ups. Here is what I do when you let me run.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The difference */}
      <section className="px-4 py-24 bg-pat-paper2/50 border-t border-pat-terra-100">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>01</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>The Difference</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Promote me, and my value <span className="italic text-pat-terra-600">doubles.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-14">
            {/* Personal assistant */}
            <div className="rounded-2xl border border-pat-terra-100 bg-pat-paper p-7">
              <div className="text-sm font-medium uppercase tracking-[0.16em] text-pat-slate pb-5 border-b border-pat-ink/10">
                Personal Assistant
              </div>
              <div className="flex flex-col">
                {COMPARE.map(([label, pa]) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 py-4 border-b border-pat-ink/5 last:border-0">
                    <span className="text-sm uppercase tracking-[0.12em] text-pat-ink-500">{label}</span>
                    <span className="text-lg text-pat-ink text-right">{pa}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chief of staff */}
            <div className="rounded-2xl overflow-hidden border border-pat-terra-200 bg-pat-terra-100/40 shadow-[0_30px_60px_-30px_rgba(42,26,20,0.25)]">
              <div className="text-sm font-medium uppercase tracking-[0.16em] text-pat-paper bg-pat-terra px-7 py-4">
                Chief of Staff
              </div>
              <div className="flex flex-col p-7 pt-2">
                {COMPARE.map(([label, , cos]) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 py-4 border-b border-pat-terra-600/10 last:border-0">
                    <span className="text-sm uppercase tracking-[0.12em] text-pat-terra-600/70">{label}</span>
                    <span className="text-lg text-pat-terra-600 font-medium text-right">{cos}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="font-serif italic text-2xl text-pat-terra-600 mt-14 pt-8 border-t border-pat-ink/10">
            The senior job, at the assistant price.
          </p>
        </div>
      </section>

      {/* In practice */}
      <section className="px-4 py-24 border-t border-pat-terra-100">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>02</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>In Practice</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            I turn customer feedback into <span className="italic text-pat-terra-600">smart product decisions.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-7 mt-14">
            {PRACTICE.map(([num, title, body, tags]) => (
              <div key={num as string} className="rounded-2xl bg-pat-paper2/60 border border-pat-terra-100 p-8 flex flex-col">
                <div className="font-serif italic text-4xl text-pat-terra-600">{num}</div>
                <h3 className="font-serif text-2xl text-pat-ink mt-5 leading-tight">{title}</h3>
                <p className="text-pat-ink-700 mt-3 leading-relaxed flex-1">{body}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {(tags as string[]).map((t) => (
                    <span key={t} className="text-sm font-dm text-pat-ink/60 border border-pat-ink/15 rounded-full px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-xl md:text-2xl text-pat-terra-600 text-center mt-14">
            Casual comments in sales meetings become build-ready specs in your team&apos;s inbox.
          </p>
        </div>
      </section>

      {/* Worked example */}
      <section className="px-4 py-24 bg-pat-paper2/50 border-t border-pat-terra-100">
        <div className="container mx-auto max-w-6xl">
          <Eyebrow>
            <span>03</span>
            <span className="h-px w-14 bg-pat-slate" />
            <span>A Worked Example</span>
          </Eyebrow>
          <motion.h2
            className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-pat-ink mt-8 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            One blocked deal, from objection to <span className="italic text-pat-terra-600">build decision.</span>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-7 mt-14">
            {/* Step 1: the objection */}
            <div className="rounded-2xl bg-pat-paper border border-pat-terra-100 p-7">
              <div className="text-sm font-medium uppercase tracking-[0.14em] text-pat-terra-600">
                01 · A prospect stalls
              </div>
              <p className="text-pat-ink-700 mt-4 leading-relaxed">
                A prospect can&apos;t move forward without a WhatsApp integration we haven&apos;t built yet.
              </p>
              <div className="mt-5 rounded-xl bg-pat-paper2/70 border border-pat-ink/10 p-5">
                <p className="font-serif italic text-lg text-pat-ink leading-snug">
                  &ldquo;WhatsApp is our primary communication channel.&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span className="text-pat-ink-500">A prospect</span>
                  <span className="rounded-full bg-pat-slate-100 text-pat-slate px-3 py-0.5 text-xs uppercase tracking-[0.1em]">
                    Deal blocker
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: the ROI calculation */}
            <div className="rounded-2xl bg-pat-paper border border-pat-terra-100 p-7">
              <div className="text-sm font-medium uppercase tracking-[0.14em] text-pat-terra-600">
                02 · I calculate ROI
              </div>
              <p className="text-pat-ink-700 mt-4 leading-relaxed">
                I screen it against every other request, drop anything shipped or off-roadmap, and calculate which opportunities return the most.
              </p>
              <div className="mt-5 rounded-xl bg-pat-paper2/70 border border-pat-ink/10 p-5 flex flex-col gap-3">
                {ROI.map(([label, value, highlight]) => (
                  <div key={label} className="flex justify-between items-baseline">
                    <span className={`text-sm ${highlight ? "text-pat-ink" : "text-pat-ink-500"}`}>{label}</span>
                    <span
                      className={`font-serif tabular-nums ${highlight ? "text-3xl text-pat-terra-600" : "text-xl text-pat-ink-500"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: update the ticket */}
            <div className="rounded-2xl bg-pat-paper border border-pat-terra-100 p-7">
              <div className="text-sm font-medium uppercase tracking-[0.14em] text-pat-terra-600">
                03 · Update the ticket
              </div>
              <p className="text-pat-ink-700 mt-4 leading-relaxed">
                It clears the build bar, so I raise its priority, adjust the requirements, and draft the spec for your team.
              </p>
              <div className="mt-5 rounded-xl bg-pat-paper2/70 border border-pat-ink/10 p-5">
                <div className="flex justify-between items-center gap-3">
                  <span className="font-serif text-lg text-pat-ink">WhatsApp Integration</span>
                  <span className="rounded-full bg-pat-terra-100 text-pat-terra-600 px-3 py-0.5 text-xs uppercase tracking-[0.1em] font-medium whitespace-nowrap">
                    High Priority
                  </span>
                </div>
                <p className="mt-3 pt-3 border-t border-pat-ink/10 text-sm text-pat-ink-700 leading-relaxed">
                  User must be able to request bulk message search actions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-pat-paper border border-pat-terra-100 px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.14em] text-pat-slate whitespace-nowrap">
              Every other week
            </span>
            <span className="font-serif text-xl text-pat-ink leading-snug">
              You and I review the process itself and the decisions it drives, and tune it when something is off.
            </span>
          </div>
        </div>
      </section>

      {/* Payoff */}
      <section className="px-4 py-24 bg-pat-ink text-pat-paper">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm font-medium uppercase tracking-[0.16em] text-pat-slate-400">
            Weekly product roadmap discussion
          </div>
          <motion.div
            className="font-serif text-6xl md:text-8xl leading-none tracking-tight mt-6 flex items-baseline gap-5 flex-wrap"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="text-pat-slate-400">4 hrs</span>
            <span className="text-pat-terra-200">&rarr;</span>
            <span className="text-pat-terra-200">30 mins</span>
          </motion.div>

          <div className="mt-14 grid sm:grid-cols-2 gap-6 lg:gap-10">
            <div className="rounded-2xl bg-pat-paper/5 border border-pat-paper/15 p-7">
              <div className="text-sm font-medium uppercase tracking-[0.16em] text-pat-slate-400 pb-5 border-b border-pat-paper/15">
                Before Patricia
              </div>
              <div className="flex flex-col">
                {BEFORE_AFTER.map(([label, before]) => (
                  <div key={label} className="py-4 border-b border-pat-paper/10 last:border-0">
                    <div className="text-xs uppercase tracking-[0.12em] text-pat-slate-400">{label}</div>
                    <div className="text-lg text-pat-paper mt-1">{before}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-pat-terra/20 border border-pat-terra-200/30 p-7">
              <div className="text-sm font-medium uppercase tracking-[0.16em] text-pat-terra-200 pb-5 border-b border-pat-terra-200/25">
                With Patricia
              </div>
              <div className="flex flex-col">
                {BEFORE_AFTER.map(([label, , after]) => (
                  <div key={label} className="py-4 border-b border-pat-terra-200/15 last:border-0">
                    <div className="text-xs uppercase tracking-[0.12em] text-pat-terra-200">{label}</div>
                    <div className="text-lg text-pat-paper mt-1 font-medium">{after}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="font-serif italic text-2xl text-pat-slate-400 mt-12 max-w-3xl leading-snug">
            We now do in thirty minutes what used to take four hours a week, and build with real confidence in what customers need.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="px-4 py-24 bg-pat-terra text-pat-paper scroll-mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-pat-terra-100 mb-8">Your Turn</div>
          <motion.h2
            className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Ready to make me your <span className="italic text-pat-slate-100">Chief of Staff?</span>
          </motion.h2>
          <p className="text-xl md:text-2xl text-pat-terra-100 mt-8 max-w-2xl mx-auto leading-snug">
            Name one process you&apos;d like to hand off. Join the founding cohort and I&apos;ll take it from there.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-12 text-left max-w-3xl mx-auto">
            {STEPS.map(([label, desc]) => (
              <div key={label} className="bg-pat-paper/10 border border-pat-paper/20 rounded-2xl p-6">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-pat-slate-100 mb-2">{label}</p>
                <p className="font-serif text-xl leading-snug">{desc}</p>
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
            <Link href="/" className="text-pat-terra-200 hover:text-pat-paper transition-colors">
              Back to Patricia
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
