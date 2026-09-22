import { Suspense } from "react"
import { homeIntroConfig } from "@/data/content"
import { getAllProjects } from "@/lib/mdx"
import ProjectsClientUI from "./ProjectsClientUI"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Projects | ${homeIntroConfig.name}`,
  description: "Browse my portfolio of projects, side projects, and technical work.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${homeIntroConfig.name}`,
    description: "Browse my portfolio of projects, side projects, and technical work.",
    type: "website",
  },
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <Suspense fallback={<section className="px-4 max-w-4xl mx-auto" />}>
      <ProjectsClientUI projects={projects} />
    </Suspense>
  )
}
