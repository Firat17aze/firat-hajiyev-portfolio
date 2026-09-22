"use client"

import { motion, MotionConfig } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMicrochip,
} from "react-icons/fa6"
import ProjectVisual from "@/components/ProjectVisual"
import { ProjectProps, WorkItemProps } from "@/lib/types"
import { sortProjects, sortWorkItems } from "@/lib/utils"

interface HomeContentProps {
  work: WorkItemProps[]
  projects: ProjectProps[]
}

const initialProjectCount = 6
const projectBatchSize = 6

const skills = [
  "Embedded C",
  "C++",
  "Python",
  "AVR / ATmega328P",
  "STM32",
  "UART & I²C",
  "Real-time systems",
  "Edge AI",
  "Computer vision",
  "Git",
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface SectionScrollLinkProps {
  href: string
  label: string
}

/** A compact visual connector that scrolls visitors to the next home-page section. */
function SectionScrollLink({ href, label }: SectionScrollLinkProps) {
  return (
    <div className="flex justify-center py-5 sm:py-6">
      <a
        href={href}
        aria-label={`Scroll to ${label}`}
        className="group inline-flex size-11 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 dark:border-white/15 dark:bg-white/[0.045] dark:text-slate-300 dark:hover:border-cyan-300 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
      >
        <FaArrowDown
          className="transition-transform duration-200 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  )
}

/** The primary single-page portfolio experience. */
export default function HomeContent({ work, projects }: HomeContentProps) {
  const [visibleProjectCount, setVisibleProjectCount] = useState(initialProjectCount)
  const sortedProjects = sortProjects(projects, "newest")
  const sortedWork = sortWorkItems(work, "newest")
  const visibleProjects = sortedProjects.slice(0, visibleProjectCount)
  const remainingProjects = sortedProjects.length - visibleProjects.length

  return (
    <MotionConfig reducedMotion="user">
      <section className="overflow-hidden">
        <section className="relative isolate mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl items-center px-5 py-20 sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute left-1/2 top-[10%] -z-10 h-[28rem] w-[48rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/15" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-600/20 bg-cyan-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 dark:border-cyan-300/20 dark:bg-cyan-300/8 dark:text-cyan-100">
              <FaMicrochip aria-hidden="true" /> Embedded systems developer
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-8xl dark:text-white">
              Firat Hajiyev
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
              I build firmware and systems software that stays dependable when it is close to the
              hardware.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
              >
                Explore projects <FaArrowDown aria-hidden="true" />
              </a>
              <Link
                href="mailto:fi189352@ucf.edu"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-600 hover:bg-cyan-500/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:border-white/20 dark:text-white dark:hover:border-cyan-300 dark:hover:bg-cyan-300/8"
              >
                <FaEnvelope aria-hidden="true" /> Get in touch
              </Link>
            </div>
            <div className="mt-8 flex justify-center gap-5 text-sm text-slate-500 dark:text-slate-400">
              <Link
                href="https://github.com/Firat17aze"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-cyan-700 dark:hover:text-cyan-200"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/firathajiyev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-cyan-700 dark:hover:text-cyan-200"
              >
                <FaLinkedinIn aria-hidden="true" /> LinkedIn
              </Link>
            </div>
          </motion.div>
        </section>

        <SectionScrollLink href="#about" label="About me" />

        <section
          id="about"
          className="scroll-mt-24 border-y border-slate-200/80 bg-white/55 dark:border-white/8 dark:bg-white/[0.025]"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                About me
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-slate-200 dark:text-white/10">
                01
              </p>
            </div>
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white">
                I like building the part of a system that has to work in the real world.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                <p>
                  I’m a Computer Science student at the University of Central Florida and an
                  embedded systems developer. I enjoy working with sensors, timing, motors, memory
                  limits, and all the practical details that make software feel real.
                </p>
                <p>
                  Most of my projects use C or C++ close to the hardware, with Python when it helps
                  with testing, computer vision, or edge AI. I care about code that is clear,
                  measurable, and built to recover when something goes wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionScrollLink href="#projects" label="Projects" />

        <section
          id="projects"
          className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                Selected work
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl dark:text-white">
                Projects
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Firmware, tooling, and edge AI projects published under my GitHub account.
            </p>
          </div>

          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
            Showing {visibleProjects.length} of {sortedProjects.length} projects
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index, 5) * 0.045 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/75 shadow-[0_10px_30px_rgb(15_23_42/0.05)] transition duration-300 hover:-translate-y-1 hover:border-cyan-500/45 hover:shadow-[0_18px_45px_rgb(8_145_178/0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none dark:hover:border-cyan-300/45 dark:hover:bg-white/[0.07]"
                >
                  <ProjectVisual
                    image={project.image}
                    title={project.title}
                    priority={index < 3}
                    className="aspect-[16/9] w-full"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold tracking-[-0.025em] text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                        {project.title}
                      </h3>
                      <FaArrowUpRightFromSquare
                        className="mt-1 shrink-0 text-sm text-slate-400 transition group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.7rem] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {remainingProjects > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleProjectCount(count =>
                    Math.min(count + projectBatchSize, sortedProjects.length)
                  )
                }
                className="inline-flex items-center gap-2 rounded-full border border-cyan-600/45 bg-white px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:-translate-y-0.5 hover:border-cyan-600 hover:bg-cyan-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:border-cyan-300/45 dark:bg-white/[0.04] dark:text-cyan-100 dark:hover:bg-cyan-300/10"
              >
                Load {Math.min(projectBatchSize, remainingProjects)} more projects{" "}
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        <SectionScrollLink href="#skills" label="Skills" />

        <section
          id="skills"
          className="border-y border-slate-200/80 bg-white/55 py-20 dark:border-white/8 dark:bg-white/[0.025]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Toolkit
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white">
              What I work with
            </h2>
            <div className="mt-8 flex max-w-4xl flex-wrap gap-2.5">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-500/45 hover:text-cyan-800 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200 dark:hover:border-cyan-300/45 dark:hover:text-cyan-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <SectionScrollLink href="#experience" label="Experience" />

        <section
          id="experience"
          className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            Experience
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl dark:text-white">
            Work that informs the build
          </h2>
          <div className="mt-10 grid gap-4">
            {sortedWork.map(item => (
              <article
                key={item.slug}
                className="rounded-2xl border border-slate-200 bg-white/70 p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                      {item.company}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.start} — {item.end}
                  </p>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </MotionConfig>
  )
}
