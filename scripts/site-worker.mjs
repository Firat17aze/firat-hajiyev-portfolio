const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; frame-ancestors 'none'; upgrade-insecure-requests",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}

function getStaticHtmlPath(pathname) {
  if (pathname === "/") return "/index.html"
  if (pathname.endsWith("/")) return `${pathname.slice(0, -1)}.html`
  return `${pathname}.html`
}

const worker = {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request)
    const url = new URL(request.url)

    if (
      response.status === 404 &&
      request.method === "GET" &&
      !url.pathname.split("/").pop().includes(".")
    ) {
      const htmlUrl = new URL(request.url)
      htmlUrl.pathname = getStaticHtmlPath(url.pathname)
      response = await env.ASSETS.fetch(new Request(htmlUrl, request))
    }

    const headers = new Headers(response.headers)
    Object.entries(securityHeaders).forEach(([name, value]) => headers.set(name, value))

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}

export default worker
