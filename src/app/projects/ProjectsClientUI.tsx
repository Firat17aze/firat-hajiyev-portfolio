"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import { FaFrown } from "react-icons/fa"
import ActiveFilterChips from "@/components/ActiveFilterChips"
import FilterDropdown from "@/components/FilterDropdown"
import PaginationControls from "@/components/PaginationControls"
import ProjectTile from "@/components/ProjectTile"
import SortDropdown from "@/components/SortDropdown"
import { filterProjects, paginateItems, sortProjects } from "@/lib/utils"
import type { ProjectProps } from "@/lib/types"

const PROJECTS_PAGE_SIZE = 6

export default function ProjectsClientUI({ projects }: { projects: ProjectProps[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const uniqueTechStack = useMemo(() => {
    const counts: Record<string, number> = {}
    projects.forEach(project => {
      project.techStack.forEach(tech => {
        counts[tech] = (counts[tech] ?? 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([tech, count]) => ({ tech, count }))
      .sort((a, b) => a.tech.localeCompare(b.tech))
  }, [projects])

  const selectedTechStack = useMemo(() => {
    const selected = searchParams.get("tech")?.split(",").filter(Boolean) ?? []
    const available = new Set(uniqueTechStack.map(item => item.tech))
    return selected.filter(tech => available.has(tech))
  }, [searchParams, uniqueTechStack])

  const sortOrder = searchParams.get("sort") === "oldest" ? "oldest" : "newest"
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1)
  const { filteredProjects, paginatedProjects, currentPage, totalPages } = useMemo(() => {
    const filtered = sortProjects(filterProjects(projects, selectedTechStack), sortOrder)
    const pageCount = Math.max(1, Math.ceil(filtered.length / PROJECTS_PAGE_SIZE))
    const page = Math.min(requestedPage, pageCount)
    const pagination = paginateItems(filtered, page, PROJECTS_PAGE_SIZE)

    return {
      filteredProjects: filtered,
      paginatedProjects: pagination.items,
      currentPage: page,
      totalPages: pagination.totalPages,
    }
  }, [projects, requestedPage, selectedTechStack, sortOrder])

  const [techStackDrafts, setTechStackDrafts] = useState<string[]>(selectedTechStack)
  useEffect(() => {
    setTechStackDrafts(selectedTechStack)
  }, [selectedTechStack])

  const updateQuery = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(query)
    update(params)
    router.push(`/projects${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleToggleTech = (tech: string) => {
    setTechStackDrafts(prev =>
      prev.includes(tech) ? prev.filter(item => item !== tech) : [...prev, tech]
    )
  }

  const applyTechStack = (techStack: string[]) => {
    updateQuery(params => {
      if (techStack.length) params.set("tech", techStack.join(","))
      else params.delete("tech")
      params.delete("page")
    })
  }

  const handleClearFilters = () => {
    setTechStackDrafts([])
    applyTechStack([])
  }

  const handleRemoveTech = (tech: string) => {
    const next = techStackDrafts.filter(item => item !== tech)
    setTechStackDrafts(next)
    applyTechStack(next)
  }

  return (
    <section className="px-4 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between gap-4 mb-8 items-center w-full">
        <div className="relative flex-grow md:flex-grow-0">
          <Suspense fallback={null}>
            <FilterDropdown
              items={uniqueTechStack.map(({ tech, count }) => ({ name: tech, count }))}
              selectedItems={techStackDrafts}
              onToggle={handleToggleTech}
              onApply={() => applyTechStack(techStackDrafts)}
              onClear={handleClearFilters}
              placeholder="Filter by Tech"
              resultCount={filteredProjects.length}
            />
          </Suspense>
        </div>

        <div className="relative flex-grow md:flex-grow-0 z-20">
          <Suspense fallback={null}>
            <SortDropdown
              sortOrder={sortOrder}
              onChange={order =>
                updateQuery(params => {
                  params.set("sort", order)
                  params.delete("page")
                })
              }
              options={[
                { label: "Newest First", value: "newest" },
                { label: "Oldest First", value: "oldest" },
              ]}
            />
          </Suspense>
        </div>
      </div>

      <ActiveFilterChips
        filters={selectedTechStack}
        onRemove={handleRemoveTech}
        onClearAll={selectedTechStack.length > 1 ? handleClearFilters : undefined}
      />

      <AnimatePresence mode="wait">
        {filteredProjects.length ? (
          <motion.div
            key="projects"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {paginatedProjects.map((project, index) => (
              <ProjectTile key={project.slug} {...project} priority={index === 0} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300 mt-12 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FaFrown className="text-4xl md:text-5xl mb-3 text-gray-400 dark:text-gray-500" />
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">No projects found</p>
            <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl">
              The selected technologies didn&apos;t match any projects. Try changing or clearing
              your filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/projects"
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </section>
  )
}
