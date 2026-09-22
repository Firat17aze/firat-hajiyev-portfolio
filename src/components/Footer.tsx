import Link from "next/link"
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer
      id="footerPortfolio"
      className="border-t border-slate-200 px-5 py-8 dark:border-white/10"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center dark:text-slate-400">
        <p>© {new Date().getFullYear()} Firat Hajiyev.</p>
        <div className="flex items-center gap-4" aria-label="Contact links">
          <Link
            href="https://github.com/Firat17aze"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-cyan-700 dark:hover:text-cyan-200"
          >
            <FaGithub aria-hidden="true" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/firathajiyev/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-cyan-700 dark:hover:text-cyan-200"
          >
            <FaLinkedinIn aria-hidden="true" />
          </Link>
          <Link
            href="mailto:fi189352@ucf.edu"
            aria-label="Email"
            className="transition hover:text-cyan-700 dark:hover:text-cyan-200"
          >
            <FaEnvelope aria-hidden="true" />
          </Link>
        </div>
        <p>Built for reliable systems, from the board up.</p>
      </div>
    </footer>
  )
}
