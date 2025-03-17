"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"

export default function LandingPage() {
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
      <div className="absolute inset-0 z-0 bg-[#1a7bff]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-full opacity-30"
            style={{
              backgroundImage:
                "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/symbol-4wAslmHGm1dt9rAkmzziSu5MDcXvB2.svg)",
              backgroundSize: "40%",
              backgroundPosition: "center",
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
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-white font-bold text-xl md:text-2xl">HyperPerfect</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Help
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Download
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Resources
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">Try Free</Button>
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
              <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                Resources
              </Link>
              <div className="pt-6 border-t border-white/20">
                <Link href="#" className="text-white text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </div>
              <Button
                className="bg-white text-black hover:bg-white/90 rounded-full text-lg py-6"
                onClick={() => setIsMenuOpen(false)}
              >
                Try Free
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        <div className="container mx-auto px-4 md:px-6 -mt-16">
          <div className="max-w-2xl md:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Perfect sound for your perfect moments
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl">
              Experience audio like never before with our cutting-edge sound technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-[#1a7bff] hover:bg-white/90 rounded-full text-lg px-8 py-6 font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="container mx-auto flex justify-end gap-6">
          <Link href="/terms" className="text-white/90 hover:text-white flex items-center">
            <span className="mr-1">→</span> Terms
          </Link>
          <Link href="/privacy" className="text-white/90 hover:text-white flex items-center">
            <span className="mr-1">→</span> Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
} 