// Render the CV pages of the generated site (.output/public) to PDF.
// Run after `npm run generate`:  npm run cv:pdf
// Output: .output/public/assets/cv/{en,jp}.pdf (linked from the CV page's PDF button)
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { chromium } from 'playwright'

const SITE_URL = 'https://kosuke-ukita.github.io'
const ROOT = join(process.cwd(), '.output/public')
const OUT_DIR = join(ROOT, 'assets/cv')
const TARGETS = [
  { route: '/cv/', file: 'en.pdf' },
  { route: '/jp/cv/', file: 'jp.pdf' },
]
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.pdf': 'application/pdf',
}

// Minimal static server for the generated site (no extra dependency).
const server = createServer(async (req, res) => {
  try {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (path.includes('..')) throw new Error('bad path')
    let file = join(ROOT, path)
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html')
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`

const browser = await chromium.launch()
try {
  await mkdir(OUT_DIR, { recursive: true })
  for (const { route, file } of TARGETS) {
    const page = await browser.newPage({ colorScheme: 'light' })
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    // page.pdf() does not fire `beforeprint`; dispatch it so the CV switches to wrapped lines.
    await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')))
    await page.waitForTimeout(300)
    // Links to the site itself would otherwise point at this temporary local server; use the public URL.
    await page.evaluate(([local, site]) => {
      for (const a of document.querySelectorAll('a[href]')) {
        if (a.href.startsWith(local)) a.setAttribute('href', site + a.href.slice(local.length))
      }
    }, [base, SITE_URL])
    await page.pdf({
      path: join(OUT_DIR, file),
      format: 'A3',
      printBackground: true,
      // The CV column keeps the site's max width (max-w-2xl) and is centred, which leaves wide side margins on A3.
      margin: { top: '25mm', bottom: '25mm', left: '20mm', right: '20mm' },
    })
    console.log(`✔ ${route} -> ${join('.output/public/assets/cv', file)}`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
