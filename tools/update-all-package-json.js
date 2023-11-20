import packageJson from '../package.json' assert { type: 'json' }
import { rewriteFiles } from './file-utils.js'
import path from 'path'
import { fileURLToPath } from 'url'

const NEW_VERSION = packageJson.version

console.log(`Modifying versions of nested package.json files to ${NEW_VERSION}`)

const fileFilter = (filePath) =>
  filePath.endsWith('package.json') && !filePath.includes('node_modules')

// rewrite package.json in package directory
rewriteFiles(
  path.join(fileURLToPath(import.meta.url), '../../package'),
  fileFilter,
  (chunk) =>
    chunk.replace(/"version"\s*:\s*".*"/, `"version": "${NEW_VERSION}"`)
)
