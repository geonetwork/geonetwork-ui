import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { builtinModules } from 'module'
import { fileURLToPath } from 'url'
import semver from 'semver'
import ts from 'typescript'
import { listDirectoryFiles } from '../tools/file-utils.js'

const CURRENT_DIR_PATH = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT_PATH = path.join(CURRENT_DIR_PATH, '..')
const LIBS_PATH = path.join(PROJECT_ROOT_PATH, 'libs')
const NODE_MODULES_PATH = path.join(PROJECT_ROOT_PATH, 'node_modules')

/**
 * Packages that are needed at runtime or build time but are never imported by
 * name from the library sources, so they cannot be detected automatically.
 */
const IMPLICIT_DEPENDENCIES = [
  '@angular/compiler',
  '@angular/platform-browser-dynamic',
  'zone.js',
  'tailwindcss',
  'tslib',
  'flag-icons',
  'document-register-element',
]

/** Same set of files as the ones copied by `generate-package.js`. */
function isShippedSourceFile(filePath) {
  return (
    filePath.endsWith('.ts') &&
    !filePath.endsWith('.spec.ts') &&
    !filePath.endsWith('.stories.ts') &&
    !filePath.endsWith('jest.config.ts') &&
    !filePath.endsWith('test-setup.ts')
  )
}

/** `@angular/material/core` -> `@angular/material`, `date-fns/locale` -> `date-fns` */
function toPackageName(specifier) {
  const parts = specifier.split('/')
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}

/**
 * A package shipping only type declarations (resolved through `@types/*`) is a
 * consumer-side devDependency, not a runtime dependency of the package.
 */
function isTypesOnlyPackage(packageName) {
  return (
    !existsSync(path.join(NODE_MODULES_PATH, packageName)) &&
    existsSync(path.join(NODE_MODULES_PATH, '@types', packageName))
  )
}

/** @return {Promise<Map<string, Set<string>>>} package name -> importing files */
async function collectImportedPackages() {
  const files = (await listDirectoryFiles(LIBS_PATH)).filter(
    isShippedSourceFile
  )
  const imported = new Map()
  for (const filePath of files) {
    const contents = await fs.readFile(filePath, 'utf8')
    // let the TypeScript compiler list the imports rather than parsing by hand
    const { importedFiles } = ts.preProcessFile(contents, true, true)
    for (const { fileName: specifier } of importedFiles) {
      if (specifier.startsWith('.') || specifier.startsWith('@geonetwork-ui/'))
        continue
      const packageName = toPackageName(specifier.replace(/^node:/, ''))
      if (builtinModules.includes(packageName)) continue
      if (isTypesOnlyPackage(packageName)) continue
      if (!imported.has(packageName)) imported.set(packageName, new Set())
      imported.get(packageName).add(path.relative(PROJECT_ROOT_PATH, filePath))
    }
  }
  return imported
}

async function readPackageJson(dirPath) {
  return JSON.parse(
    await fs.readFile(path.join(dirPath, 'package.json'), 'utf8')
  )
}

const rootPackageJson = await readPackageJson(PROJECT_ROOT_PATH)
const packagePackageJson = await readPackageJson(CURRENT_DIR_PATH)

const declared = {
  ...packagePackageJson.peerDependencies,
  ...packagePackageJson.dependencies,
}
const imported = await collectImportedPackages()

const missing = [...imported]
  .filter(([packageName]) => !(packageName in declared))
  .sort(([a], [b]) => a.localeCompare(b))

/** The version the repository itself develops against, whether dev or not. */
const rootRanges = {
  ...rootPackageJson.devDependencies,
  ...rootPackageJson.dependencies,
}

const byPackageName = (a, b) => a.packageName.localeCompare(b.packageName)

const driftedDependencies = Object.entries(
  packagePackageJson.dependencies ?? {}
)
  .filter(
    ([packageName, range]) =>
      packageName in rootRanges && rootRanges[packageName] !== range
  )
  .map(([packageName, range]) => ({
    packageName,
    range,
    rootRange: rootRanges[packageName],
  }))
  .sort(byPackageName)

const uncoveredPeerDependencies = Object.entries(
  packagePackageJson.peerDependencies ?? {}
)
  .flatMap(([packageName, range]) => {
    const rootRange = rootRanges[packageName]
    // not installed here at all: nothing to compare it against
    if (!rootRange) return []
    const entry = { packageName, range, rootRange }
    try {
      return semver.subset(rootRange, range, { loose: true }) ? [] : [entry]
    } catch {
      // a range neither side can parse (a tarball URL, a git ref...)
      return [{ ...entry, unparseable: true }]
    }
  })
  .sort(byPackageName)

const unused = Object.keys(declared)
  .filter(
    (packageName) =>
      !imported.has(packageName) && !IMPLICIT_DEPENDENCIES.includes(packageName)
  )
  .sort()

if (missing.length) {
  console.error(
    `\n❌ ${missing.length} package(s) are imported by the shipped libs but missing from package/package.json:\n`
  )
  for (const [packageName, importingFiles] of missing) {
    const rootRange = rootPackageJson.dependencies?.[packageName]
    console.error(
      `  ${packageName}${rootRange ? ` (root package.json: ${rootRange})` : ''}`
    )
    for (const file of [...importingFiles].sort().slice(0, 3)) {
      console.error(`      imported by ${file}`)
    }
    if (importingFiles.size > 3) {
      console.error(`      ...and ${importingFiles.size - 3} more file(s)`)
    }
  }
  console.error(
    `\nAdd each one to "peerDependencies" (preferred, for anything the consuming app also owns\n` +
      `such as an Angular package) or to "dependencies" in package/package.json — a new entry in\n` +
      `"dependencies" must also be added to "allowedNonPeerDependencies" in package/ng-package.json.\n`
  )
}

if (driftedDependencies.length) {
  console.error(
    `\n❌ ${driftedDependencies.length} dependency range(s) differ between package.json and package/package.json:\n`
  )
  for (const { packageName, range, rootRange } of driftedDependencies) {
    console.error(
      `  ${packageName}: root is "${rootRange}", package is "${range}"`
    )
  }
  console.error(
    `\nRanges in "dependencies" are shipped as-is, so they must match the root package.json.\n`
  )
}

if (uncoveredPeerDependencies.length) {
  console.error(
    `\n❌ ${uncoveredPeerDependencies.length} peerDependency range(s) no longer cover the version used in this repository:\n`
  )
  for (const {
    packageName,
    range,
    rootRange,
    unparseable,
  } of uncoveredPeerDependencies) {
    console.error(
      `  ${packageName}: root installs "${rootRange}", which is ${
        unparseable ? 'not a comparable semver range' : 'not covered by'
      } "${range}"`
    )
  }
  console.error(
    `\nWiden the range in "peerDependencies" so it accepts the version this repository builds\n` +
      `against — otherwise the package is developed against a version it tells consumers it\n` +
      `does not support.\n`
  )
}

if (unused.length) {
  console.warn(
    `\n⚠️  ${unused.length} declared package(s) are never imported by the shipped libs; they may be\n` +
      `stale, or used implicitly — in which case list them in IMPLICIT_DEPENDENCIES in this script:\n`
  )
  console.warn(
    unused.map((packageName) => `  ${packageName}`).join('\n') + '\n'
  )
}

if (
  missing.length ||
  driftedDependencies.length ||
  uncoveredPeerDependencies.length
) {
  process.exit(1)
}

console.log('✅ package/package.json declares every imported dependency.')
