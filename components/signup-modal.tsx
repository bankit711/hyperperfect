"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-card-hover w-full max-w-2xl h-[550px] overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface-elevated hover:bg-surface-secondary transition-all duration-150"
          aria-label="Close modal"
        >
          <X size={20} className="text-hp-text-secondary" />
        </button>
        
        <iframe 
          className="airtable-embed" 
          src="https://airtable.com/embed/appqbBPLB46bgiFlK/pagZ9dHXhl0jBwfaf/form" 
          frameBorder="0" 
          width="100%" 
          height="700" 
          title="Sign Up Form"
          style={{ background: "transparent", border: "1px solid #ccc", marginTop: "0px" }}
        />
      </div>
    </div>
  )
}