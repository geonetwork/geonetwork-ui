import fs from 'fs/promises'
import { lstatSync } from 'fs'

export async function listDirectoryFiles(path) {
  return await fs.readdir(path).then((names) =>
    Promise.all(
      names.map((name) => {
        const childPath = `${path}/${name}`
        const stats = lstatSync(childPath)
        if (stats.isDirectory()) {
          return listDirectoryFiles(childPath)
        }
        return [childPath]
      })
    ).then((files) => files.flat())
  )
}

/**
 * Will go through all files recursively in a given directory and rewrite
 * their contents as needed
 * @param {string} path Directory path
 * @param {function(filePath: string): boolean} fileFilterCallback Which file to apply the rewrite to
 * @param {function(fileChunk: string): string} rewriteCallback Returns the modified chunk
 * @return {Promise<void>}
 */
export async function rewriteFiles(path, fileFilterCallback, rewriteCallback) {
  console.log(`Rewriting files in the ${path} directory...`)
  const files = await listDirectoryFiles(path).then((files) =>
    files.filter(fileFilterCallback)
  )
  return Promise.all(
    files.map(async (filePath) => {
      const contents = await fs.readFile(filePath, 'utf8')
      return fs.writeFile(filePath, rewriteCallback(contents))
    })
  )
    .then((results) =>
      console.log(`${results.length} files successfully rewritten.`)
    )
    .catch(console.error)
}
