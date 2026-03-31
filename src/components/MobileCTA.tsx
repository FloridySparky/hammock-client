"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/95 backdrop-blur-md border-t border-navy/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/contact"
        className="flex items-center justify-center w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-light transition-colors text-sm"
      >
        Request an Inspection
      </Link>
    </div>
  );
}
