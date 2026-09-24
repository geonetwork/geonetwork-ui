import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import semver from 'semver'

const CURRENT_DIR_PATH = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT_PATH = path.join(CURRENT_DIR_PATH, '..')

/**
 * Root dependencies that are deliberately not part of the published package,
 * because only applications use them. Anything else added to the root
 * `dependencies` has to be declared in `package/package.json`.
 */
const NOT_PUBLISHED = [
  '@angular/elements', // only used to build the webcomponents app
  '@angular/platform-server', // only used for server-side rendering of apps
]

async function readPackageJson(dirPath) {
  return JSON.parse(
    await fs.readFile(path.join(dirPath, 'package.json'), 'utf8')
  )
}

const rootPackageJson = await readPackageJson(PROJECT_ROOT_PATH)
const packagePackageJson = await readPackageJson(CURRENT_DIR_PATH)

const rootDependencies = rootPackageJson.dependencies ?? {}
/** A package peer dependency may well be a dev dependency of the repository. */
const rootRanges = { ...rootPackageJson.devDependencies, ...rootDependencies }

const packageDependencies = packagePackageJson.dependencies ?? {}
const packagePeerDependencies = packagePackageJson.peerDependencies ?? {}
const packageRanges = { ...packagePeerDependencies, ...packageDependencies }

const errors = []

for (const packageName of Object.keys(rootDependencies).sort()) {
  if (packageName in packageRanges || NOT_PUBLISHED.includes(packageName))
    continue
  errors.push(
    `${packageName} is a dependency of the root package.json but is not declared in package/package.json.\n` +
      `    Add it to "peerDependencies" (preferred, for anything the consuming app also owns) or to\n` +
      `    "dependencies" — a new entry in "dependencies" must also be added to\n` +
      `    "allowedNonPeerDependencies" in package/ng-package.json. If applications are its only users,\n` +
      `    add it to NOT_PUBLISHED in this script instead.`
  )
}

// keep NOT_PUBLISHED from going stale
for (const packageName of NOT_PUBLISHED) {
  if (!(packageName in packageRanges)) continue
  errors.push(
    `${packageName} is listed in NOT_PUBLISHED in this script but is declared in package/package.json.\n` +
      `    Remove it from NOT_PUBLISHED.`
  )
}

// a dependency dropped from the root leaves consumers installing something this
// repository no longer builds against
for (const packageName of Object.keys(packageRanges).sort()) {
  if (packageName in rootRanges) continue
  errors.push(
    `${packageName} is declared in package/package.json but is absent from the root package.json.\n` +
      `    Add it to the root, or remove it from package/package.json.`
  )
}

// `dependencies` have to be exactly the ones the repository is built against
for (const [packageName, range] of Object.entries(packageDependencies).sort()) {
  const rootRange = rootRanges[packageName]
  if (rootRange === undefined || rootRange === range) continue
  errors.push(
    `${packageName} is a dependency with range "${range}" in package/package.json, but the root\n` +
      `    package.json has "${rootRange}". Ranges in "dependencies" are published as-is and must match.`
  )
}

// `peerDependencies` are deliberately broader. range offered to consumers needs to
// cover every version this repository may install: once it does not, the code
// is built against a version the package claims not to support.
for (const [packageName, range] of Object.entries(
  packagePeerDependencies
).sort()) {
  const rootRange = rootRanges[packageName]
  if (rootRange === undefined) continue
  let covered
  try {
    covered = semver.subset(rootRange, range, { loose: true })
  } catch {
    // a range semver cannot compare (a tarball URL, a git ref...)
    covered = false
  }
  if (covered) continue
  errors.push(
    `${packageName} is a peer dependency with range "${range}" in package/package.json, which does not\n` +
      `    cover "${rootRange}" as installed by the root package.json. Widen the peer range, otherwise the\n` +
      `    package is built against a version it tells consumers it does not support.`
  )
}

if (errors.length) {
  console.error(
    `\n❌ ${errors.length} problem(s) found between package.json and package/package.json:\n`
  )
  for (const error of errors) {
    console.error(`  - ${error}\n`)
  }
  process.exit(1)
}

console.log(
  `✅ package/package.json is consistent with the root package.json ` +
    `(${Object.keys(packageRanges).length} dependencies checked).`
)
