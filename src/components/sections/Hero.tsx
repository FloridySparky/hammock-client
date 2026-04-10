"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { hero } from "@/lib/content";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setReducedMotion(true);
      setIsLoaded(true);
      return;
    }
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  const fadeStyle = (delay: number): React.CSSProperties =>
    reducedMotion
      ? {}
      : {
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        };

  return (
    <section id="hero" className="bg-white py-20 lg:py-[80px] px-6">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h1
            className="font-heading font-black text-navy text-[clamp(2rem,1.5rem+2.2vw,2.75rem)] leading-[1.3] tracking-tight mb-5"
            style={fadeStyle(0)}
          >
            {hero.headline}
          </h1>
          <p
            className="text-base text-gray-600 leading-relaxed max-w-[520px] mb-8"
            style={fadeStyle(120)}
          >
            {hero.subheadline}
          </p>

          <div className="flex flex-wrap gap-3 mb-10" style={fadeStyle(240)}>
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center justify-center bg-navy text-white text-[15px] font-semibold px-7 py-3.5 rounded-lg shadow-sm hover:bg-navy-light hover:shadow-lg hover:-translate-y-px transition-all duration-250 tracking-[0.01em]"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center justify-center text-navy text-sm font-semibold px-5 py-2.5 rounded-lg border border-navy/70 hover:bg-navy hover:text-white transition-all duration-250 tracking-[0.01em]"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            style={fadeStyle(360)}
          >
            {hero.trustBullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-center gap-2.5 text-[15px] font-medium text-charcoal"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-teal"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {bullet}
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-xl aspect-[4/3] overflow-hidden max-h-[240px] lg:max-h-none">
          {hero.heroImage.type === "image" ? (
            <Image
              src={hero.heroImage.imagePath}
              alt={hero.headline}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="bg-gradient-to-br from-[#e8edf3] to-[#dde5ed] w-full h-full flex items-center justify-center border-2 border-dashed border-[#c5d0de] rounded-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-navy/[0.03]" />
              <div className="text-center relative z-10">
                <svg
                  className="mx-auto mb-2 opacity-50 text-[#8a9bb5]"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <p className="text-[#8a9bb5] text-sm font-medium">
                  Hero Image Placeholder
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
