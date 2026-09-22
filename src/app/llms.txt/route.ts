import { NextResponse } from "next/server"
import { siteMetadata } from "@/data/metadata"
import { getAllProjects, getAllWorkItems } from "@/lib/mdx"
import { formatDateRange } from "@/lib/utils"

export const dynamic = "force-static"

/**
 * Generates a compact map of the portfolio's public content for language-model crawlers.
 */
export async function GET() {
  const base = siteMetadata.siteUrl
  const [projects, work] = await Promise.all([getAllProjects(), getAllWorkItems()])

  const projectsSection = projects
    .map(project => {
      const period = formatDateRange(project.startDate, project.endDate)
      const tech = project.techStack.join(", ")
      return (
        "- [" +
        project.title +
        "](" +
        base +
        "/projects/" +
        project.slug +
        ") (" +
        period +
        ", " +
        tech +
        "): " +
        project.description
      )
    })
    .join("\n")

  const workSection = work
    .map(item => {
      const period = formatDateRange(item.start, item.end)
      return (
        "- [" +
        item.company +
        "](" +
        base +
        "/work/" +
        item.slug +
        "): " +
        item.title +
        ", " +
        period +
        ". " +
        item.description
      )
    })
    .join("\n")

  const content = [
    "# " + siteMetadata.title,
    "",
    "> " + siteMetadata.description,
    "",
    "## Projects",
    "",
    projectsSection,
    "",
    "## Work Experience",
    "",
    workSection,
    "",
    "## Site",
    "",
    "- [Home](" + base + "): Introduction and selected work.",
    "- [Projects](" + base + "/projects): All projects.",
    "- [Work](" + base + "/work): Work experience.",
    "",
  ].join("\n")

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
