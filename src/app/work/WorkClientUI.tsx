"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import { FaFrown } from "react-icons/fa"
import ActiveFilterChips from "@/components/ActiveFilterChips"
import FilterDropdown from "@/components/FilterDropdown"
import PaginationControls from "@/components/PaginationControls"
import SortDropdown from "@/components/SortDropdown"
import WorkItem from "@/components/WorkItem"
import { filterWorkItems, paginateItems, sortWorkItems } from "@/lib/utils"
import type { WorkItemProps } from "@/lib/types"

const WORK_PAGE_SIZE = 6

export default function WorkClientUI({ work }: { work: WorkItemProps[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const uniqueCompanies = useMemo(() => {
    const counts: Record<string, number> = {}
    work.forEach(item => {
      counts[item.company] = (counts[item.company] ?? 0) + 1
    })
    return Object.entries(counts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => a.company.localeCompare(b.company))
  }, [work])

  const selectedCompanies = useMemo(() => {
    const selected = searchParams.get("company")?.split(",").filter(Boolean) ?? []
    const available = new Set(uniqueCompanies.map(item => item.company))
    return selected.filter(company => available.has(company))
  }, [searchParams, uniqueCompanies])

  const sortOrder = searchParams.get("sort") === "oldest" ? "oldest" : "newest"
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1)
  const { filteredWorkItems, paginatedWorkItems, currentPage, totalPages } = useMemo(() => {
    const filtered = sortWorkItems(filterWorkItems(work, selectedCompanies), sortOrder)
    const pageCount = Math.max(1, Math.ceil(filtered.length / WORK_PAGE_SIZE))
    const page = Math.min(requestedPage, pageCount)
    const pagination = paginateItems(filtered, page, WORK_PAGE_SIZE)

    return {
      filteredWorkItems: filtered,
      paginatedWorkItems: pagination.items,
      currentPage: page,
      totalPages: pagination.totalPages,
    }
  }, [requestedPage, selectedCompanies, sortOrder, work])

  const [companyDrafts, setCompanyDrafts] = useState<string[]>(selectedCompanies)
  useEffect(() => {
    setCompanyDrafts(selectedCompanies)
  }, [selectedCompanies])

  const updateQuery = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(query)
    update(params)
    router.push(`/work${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleToggleCompany = (company: string) => {
    setCompanyDrafts(prev =>
      prev.includes(company) ? prev.filter(item => item !== company) : [...prev, company]
    )
  }

  const applyCompanies = (companies: string[]) => {
    updateQuery(params => {
      if (companies.length) params.set("company", companies.join(","))
      else params.delete("company")
      params.delete("page")
    })
  }

  const handleClearFilters = () => {
    setCompanyDrafts([])
    applyCompanies([])
  }

  const handleRemoveCompany = (company: string) => {
    const next = companyDrafts.filter(item => item !== company)
    setCompanyDrafts(next)
    applyCompanies(next)
  }

  return (
    <section className="px-4 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between gap-4 mb-8 items-center w-full">
        <div className="relative grow md:grow-0">
          <Suspense fallback={null}>
            <FilterDropdown
              items={uniqueCompanies.map(({ company, count }) => ({ name: company, count }))}
              selectedItems={companyDrafts}
              onToggle={handleToggleCompany}
              onApply={() => applyCompanies(companyDrafts)}
              onClear={handleClearFilters}
              placeholder="Filter by Company"
              resultCount={filteredWorkItems.length}
            />
          </Suspense>
        </div>

        <div className="relative grow md:grow-0 z-20">
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
        filters={selectedCompanies}
        onRemove={handleRemoveCompany}
        onClearAll={selectedCompanies.length > 1 ? handleClearFilters : undefined}
      />

      <AnimatePresence mode="wait">
        {filteredWorkItems.length ? (
          <motion.div
            key="work-items"
            className="space-y-6 grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {paginatedWorkItems.map(item => (
              <WorkItem key={item.slug} {...item} />
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
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">No work items found</p>
            <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl">
              The selected companies didn&apos;t match any work items. Try changing or clearing your
              filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/work"
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </section>
  )
}
