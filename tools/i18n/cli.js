import { readFile, writeFile } from 'fs/promises'
import { program } from 'commander'

program
  .command('merge <sourcePath> <destPath>')
  .description('Merge translations from one file into another')
  .action((sourcePath, destPath) => {
    mergeTranslationFiles(sourcePath, destPath).catch((e) =>
      console.error('An error occurred when merging the files:\n', e)
    )
  })

program.parse(process.argv)

/**
 * Runs JSON.stringify with special parameters to ensure a consistent output
 * Keys are ordered alphabetically; note that this does not supports nested objects
 * @param {Object} object
 * @return {string}
 */
function toStableJson(object) {
  const keys = Object.keys(object).sort()
  return JSON.stringify(object, keys, 2)
}

/**
 * Note: translations in the dest will be overridden by the ones in the source
 * @param {string} sourcePath
 * @param {string} destPath
 * @return {Promise<void>}
 */
async function mergeTranslationFiles(sourcePath, destPath) {
  const [source, dest] = await Promise.all([
    readFile(sourcePath, 'utf8').then(JSON.parse),
    readFile(destPath, 'utf8').then(JSON.parse),
  ])

  // warn for conflicts beforehand
  Object.keys(dest)
    .filter((key) => !!dest[key] && !!source[key] && dest[key] !== source[key])
    .forEach((key) =>
      console.warn(
        ` The following key is present in both files, only the value in the source file will be kept:
    > key: ${key}
    > current value: "${dest[key]}"
    > replaced by: "${source[key]}"`
      )
    )

  // remove empty keys from the source
  const sourceWithoutEmpty = Object.keys(source).reduce(
    (prev, curr) => (!!source[curr] ? { ...prev, [curr]: source[curr] } : prev),
    {}
  )

  const merged = Object.assign(dest, sourceWithoutEmpty)
  await writeFile(destPath, toStableJson(merged))
  console.log('Destination file was modified successfully!')
}
