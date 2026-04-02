"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-charcoal-950/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-500 text-charcoal-950 p-2 rounded-xl group-hover:bg-brand-400 transition-colors">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none tracking-tight text-white drop-shadow-md">MSTS</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors drop-shadow-sm">Home</Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors drop-shadow-sm">Services</Link>
            <Link href="/clients" className="text-gray-300 hover:text-white transition-colors drop-shadow-sm">Clients</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors drop-shadow-sm">About</Link>
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-5 py-2.5 glass-panel text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors border border-white/20"
            >
              Client Login
            </Link>
            <a 
              href="https://wa.me/917703976645" 
              className="px-5 py-2.5 bg-brand-500 text-charcoal-950 text-sm font-bold rounded-lg hover:bg-brand-400 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-500">Home</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-500">Services</Link>
          <Link href="/clients" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-500">Clients</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-500">About</Link>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-8 py-4 mt-8 glass-panel text-white font-bold rounded-xl border border-white/20 w-3/4 text-center">
            Client Login
          </Link>
        </div>
      )}
    </>
  );
}
