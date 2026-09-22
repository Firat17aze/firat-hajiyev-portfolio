"use client"

import Link from "next/link"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import ThemeToggleButton from "@/components/ThemeToggleButton"

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
]

/** Compact, anchor-first navigation for the single-page portfolio. */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      id="headerPortfolio"
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75"
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Firat Hajiyev"
          className="group text-sm font-semibold tracking-tight text-slate-950 dark:text-white"
        >
          Firat<span className="text-cyan-600 dark:text-cyan-300">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/firat-hajiyev-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Resume
          </a>
          <Link
            href="https://github.com/Firat17aze"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-500/40 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:border-cyan-500 hover:bg-cyan-500/10 dark:text-cyan-200"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(open => !open)}
            className="grid size-11 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-cyan-500 dark:border-white/15 dark:text-white md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-200/70 bg-white px-5 py-5 dark:border-white/10 dark:bg-slate-950 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-3">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-cyan-500/10 hover:text-cyan-800 dark:text-slate-200 dark:hover:text-cyan-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/firat-hajiyev-resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-cyan-500/10 hover:text-cyan-800 dark:text-slate-200 dark:hover:text-cyan-200"
            >
              Resume
            </a>
            <Link
              href="https://github.com/Firat17aze"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-cyan-700 hover:bg-cyan-500/10 dark:text-cyan-200"
            >
              GitHub
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
