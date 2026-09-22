import { Suspense } from "react"
import { homeIntroConfig } from "@/data/content"
import { getAllWorkItems } from "@/lib/mdx"
import WorkClientUI from "./WorkClientUI"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Work | ${homeIntroConfig.name}`,
  description: "Explore my professional work experience and career journey.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work | ${homeIntroConfig.name}`,
    description: "Explore my professional work experience and career journey.",
    type: "website",
  },
}

export default async function WorkPage() {
  const work = await getAllWorkItems()

  return (
    <Suspense fallback={<section className="px-4 max-w-4xl mx-auto" />}>
      <WorkClientUI work={work} />
    </Suspense>
  )
}
