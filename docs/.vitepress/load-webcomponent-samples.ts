import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const baseDir = join(__dirname, '..', '..', 'apps', 'webcomponents')

function removeHyphens(s: string) {
  return s.replace(/-/g, ' ')
}

async function processSampleToItem(samplePath: string) {
  const fullPath = join(baseDir, samplePath)
  const fullSource = await readFile(fullPath, 'utf-8')
  const fileName = basename(samplePath, '.sample.html')
  const [title, variant] = fileName.split('.')

  // extract only the #region source content for display; fall back to full source
  const regionMatch = fullSource.match(
    /<!--\s*#region\s+source\s*-->\n?([\s\S]*?)\n?<!--\s*#endregion\s+source\s*-->/
  )
  const sourceCode = regionMatch ? regionMatch[1] : fullSource

  // script tags removed
  const htmlCode = fullSource.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')

  // only content of first script tag kept
  const jsCode =
    fullSource.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''

  return {
    title,
    variant,
    slug: fileName,
    sourceCode: encodeURIComponent(sourceCode),
    htmlCode,
    jsCode: encodeURIComponent(jsCode),
  }
}

export async function getWebcomponentSamples(): Promise<
  Array<{
    slug: string
    title: string
    sourceCode: string
    htmlCode: string
    jsCode: string
  }>
> {
  const allFiles = await readdir(baseDir, { recursive: true })
  const sampleFiles = allFiles.filter(
    (f) =>
      f.endsWith('.sample.html') &&
      !basename(f).startsWith('gn-standalone-search.')
  )

  return Promise.all(
    sampleFiles.map(async (path) => {
      const item = await processSampleToItem(path)
      const title = item.variant
        ? `<${item.title}> (${removeHyphens(item.variant)})`
        : `<${item.title}>`
      return {
        ...item,
        title,
      }
    })
  )
}

export async function getStandaloneSearchSamples(): Promise<
  Array<{
    slug: string
    title: string
    sourceCode: string
    htmlCode: string
    jsCode: string
  }>
> {
  const baseDir = join(__dirname, '..', '..', 'apps', 'webcomponents')
  const allFiles = await readdir(baseDir, { recursive: true })
  const sampleFiles = allFiles.filter(
    (f) =>
      f.endsWith('.sample.html') &&
      basename(f).startsWith('gn-standalone-search.')
  )
  return Promise.all(
    sampleFiles.map(async (path) => {
      const item = await processSampleToItem(path)
      const title = item.variant
        ? `Standalone Search - ${removeHyphens(item.variant)}`
        : `Standalone Search Example`
      return {
        ...item,
        title,
      }
    })
  )
}
