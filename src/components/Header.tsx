"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, contact } from "@/lib/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy/[0.08]">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between h-[72px] px-6">
        <Link href="/" className="font-heading font-bold text-lg text-navy tracking-tight">
          Hammock <span className="text-teal">Property Inspections</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors duration-200 tracking-[0.01em] ${
                  isActive
                    ? "text-navy nav-link-active"
                    : "text-charcoal hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-navy-light hover:shadow-lg hover:-translate-y-px transition-all duration-250 tracking-[0.01em]"
          >
            Request an Inspection
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <a
            href={`tel:${contact.phoneRaw}`}
            className="w-11 h-11 flex items-center justify-center text-navy hover:text-teal transition-colors"
            aria-label="Call us"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <button
            className="relative w-11 h-11 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`absolute left-2.5 w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMenuOpen ? "top-[21px] rotate-45" : "top-[15px]"
              }`}
            />
            <span
              className={`absolute left-2.5 w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "top-[21px] opacity-100"
              }`}
            />
            <span
              className={`absolute left-2.5 w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMenuOpen ? "top-[21px] -rotate-45" : "top-[27px]"
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
