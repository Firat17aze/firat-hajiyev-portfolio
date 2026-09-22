import { siteMetadata } from "@/data/metadata"
import { getAllProjects, getAllWorkItems } from "@/lib/mdx"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const base = siteMetadata.siteUrl

/**
 * Generates a sitemap for the portfolio's public work and project routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [workItems, projects] = await Promise.all([getAllWorkItems(), getAllProjects()])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: base + "/work",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: base + "/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const workRoutes: MetadataRoute.Sitemap = workItems.map(item => ({
    url: base + "/work/" + item.slug,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map(project => ({
    url: base + "/projects/" + project.slug,
    lastModified: new Date(project.endDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...workRoutes, ...projectRoutes]
}
