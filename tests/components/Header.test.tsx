import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AccentThemeProvider } from "@/components/AccentThemeProvider"
import Header from "@/components/Header"
import { PageHeaderProvider } from "@/components/PageHeaderProvider"

// Header renders ThemeToggleButton, which reads accent theme state via `useAccentTheme()`.
function renderHeader() {
  return render(
    <AccentThemeProvider>
      <PageHeaderProvider>
        <Header />
      </PageHeaderProvider>
    </AccentThemeProvider>
  )
}

describe("Header", () => {
  it("renders the header element with the correct id", () => {
    renderHeader()
    const header = document.getElementById("headerPortfolio")
    expect(header).not.toBeNull()
    expect(header?.tagName).toBe("HEADER")
  })

  it("renders Firat's personal brand link", () => {
    renderHeader()
    expect(screen.getByLabelText("Firat Hajiyev")).toBeDefined()
  })

  it("renders the portfolio navigation without a blog link", () => {
    renderHeader()
    expect(screen.getByText("About")).toBeDefined()
    expect(screen.getByText("Projects")).toBeDefined()
    expect(screen.getByText("Experience")).toBeDefined()
    expect(screen.getByText("Resume")).toBeDefined()
    expect(screen.queryByText("Blog")).toBeNull()
  })

  it("renders navigation links with correct hrefs", () => {
    renderHeader()
    const aboutLink = screen.getByText("About").closest("a")
    const projectsLink = screen.getByText("Projects").closest("a")

    expect(aboutLink?.getAttribute("href")).toBe("/#about")
    expect(projectsLink?.getAttribute("href")).toBe("/#projects")
  })

  it("links to the downloadable resume", () => {
    renderHeader()
    const resumeLink = screen.getByText("Resume").closest("a")

    expect(resumeLink?.getAttribute("href")).toBe("/firat-hajiyev-resume.pdf")
    expect(resumeLink?.getAttribute("target")).toBe("_blank")
  })

  it("renders the theme toggle button", () => {
    renderHeader()
    const themeButton = screen.getByLabelText(/switch to dark mode/i)
    expect(themeButton).toBeDefined()
  })

  it("renders the mobile menu toggle button", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")
    expect(menuButton).toBeDefined()
  })

  it("toggles the mobile menu toggle aria-label on click", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")

    fireEvent.click(menuButton)

    // After toggle, the aria-label should change
    expect(screen.getByLabelText("Close menu")).toBeDefined()
  })

  it("does not mark any navigation item as active on the home page", () => {
    renderHeader()
    // With pathname mocked to "/", no desktop nav item should be active since "Home" isn't
    // one of them
    const links = screen.getAllByRole("link")
    const currentPageLinks = links.filter(link => link.getAttribute("aria-current") === "page")
    expect(currentPageLinks.length).toBe(0)
  })
})
