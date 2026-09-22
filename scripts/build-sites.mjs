import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const projectDir = process.cwd()
const exportDir = resolve(projectDir, "out")
const distDir = resolve(projectDir, "dist")
const workerSource = resolve(projectDir, "scripts", "site-worker.mjs")

if (!existsSync(exportDir)) {
  throw new Error("Missing static Next.js export. Run next build before packaging the site.")
}

rmSync(distDir, { recursive: true, force: true })
mkdirSync(resolve(distDir, "server"), { recursive: true })
cpSync(exportDir, distDir, { recursive: true })
cpSync(workerSource, resolve(distDir, "server", "index.js"))
