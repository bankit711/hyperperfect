"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import RotatingContent from "./rotating-content"
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#1a7bff]">
        <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex items-center justify-end">
          <div
            className="w-[49%] h-full opacity-40"
            style={{
              backgroundImage: "url(/images/symbol.svg)",
              backgroundSize: "80%",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>

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
              {/* Sign In link temporarily disabled
              <Link href="#" className="text-white/90 hover:text-white text-base font-medium">
                Sign In
              </Link>
              */}
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
                {/* Sign In link temporarily disabled
                <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                */}
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

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        <div className="container mx-auto px-4 md:px-6 -mt-16">
          <div className="max-w-2xl md:max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-16">
              Automate your <br />
              <span className="inline-block h-[1.2em] overflow-hidden">
                <RotatingContent
                  imageSrc=""
                  phrases={[
                    "Excel workflow",
                    "data cleaning",
                    "manual tasks",
                    "fiscal periods",
                    "research",
                    "cohort analyses",
                    "SaaS metrics"
                  ]}
                  displayDuration={3000} // 3 seconds
                  transitionDuration={500} // 0.5 seconds fade
                />
              </span> <br />
              with AI.
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-xl">
              Built to make you extraordinarily productive in Excel, without the mistakes.
            </p>
            <a
              href="https://publish.obsidian.md/hyperperfect/Sign+Up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-white text-[#1a7bff] hover:bg-white/90 px-8 py-4"
            >
              Sign Up for Instant Access
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="container mx-auto flex justify-end gap-8">
          <Link 
            href="https://publish.obsidian.md/hyperperfect/Terms+of+Service" 
            className="text-white/90 hover:text-white flex items-center text-xl"
          >
            <span className="mr-2 text-2xl">→</span> Terms
          </Link>
          <Link 
            href="https://publish.obsidian.md/hyperperfect/Privacy+Policy" 
            className="text-white/90 hover:text-white flex items-center text-xl"
          >
            <span className="mr-2 text-2xl">→</span> Privacy
          </Link>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  )
}
