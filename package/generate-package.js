import * as ngPackage from 'ng-packagr'
import baseTsConfig from '../tsconfig.base.json' with { type: 'json' }
import fs from 'fs/promises'
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Transform } from 'stream'
import { listDirectoryFiles, rewriteFiles } from '../tools/file-utils.js'

const PATH_ALIASES = baseTsConfig.compilerOptions.paths

const CURRENT_DIR_PATH = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT_PATH = path.join(CURRENT_DIR_PATH, '..')
const PACKAGE_DIST_PATH = path.join(CURRENT_DIR_PATH, './dist')
const LIBS_SOURCE_PATH = path.join(PROJECT_ROOT_PATH, './libs')
const LIBS_DEST_PATH = path.join(CURRENT_DIR_PATH, './libs')
const TRANSLATIONS_SOURCE_PATH = path.join(PROJECT_ROOT_PATH, './translations')
const TRANSLATIONS_DEST_PATH = path.join(CURRENT_DIR_PATH, './translations')

/**
 * @param {number} depth Depth from the `libs` folder (0 means in the libs folder)
 * @return {Transform}
 */
function createPathAliasTransformStream(depth) {
  // order aliases by descending length to get more specific aliases first
  const aliases = Object.keys(PATH_ALIASES).sort((a, b) => b.length - a.length)
  return new Transform({
    transform(chunk, encoding, callback) {
      let chunkString = chunk.toString()
      for (let alias of aliases) {
        const aliasedPath = PATH_ALIASES[alias][0]
          .replace(/\/index\.ts$/, '') // target modules instead of files
          .replace(/\.ts$/, '')
          .replace(/\/\*$/, '')
        alias = alias.replace(/\/\*$/, '')
        if (chunkString.indexOf(alias) === -1) {
          continue
        }
        const prefix = new Array(depth).fill('../').join('')
        chunkString = chunkString.replaceAll(alias, prefix + aliasedPath)
      }
      this.push(chunkString)
      callback()
    },
  })
}

function copyFile(inputPath, outputDirPath, basePath) {
  if (!existsSync(outputDirPath)) {
    mkdirSync(outputDirPath, { recursive: true })
  }
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDirPath, path.basename(inputPath))
    const read = createReadStream(inputPath)
    const write = createWriteStream(outputPath)
    if (path.extname(inputPath) === '.ts') {
      const depth = inputPath.replace(basePath + '/', '').split('/').length
      const transform = createPathAliasTransformStream(depth)
      read.pipe(transform).pipe(write).on('error', reject)
    } else {
      read.pipe(write).on('error', reject)
    }
    write.on('finish', resolve)
  })
}

async function copyDirectory(sourcePath, destPath, fileFilterCallback) {
  const files = await listDirectoryFiles(sourcePath).then((files) =>
    fileFilterCallback ? files.filter(fileFilterCallback) : files
  )
  return await copyFiles(files, sourcePath, destPath)
}

async function copyFiles(files, sourceBasePath, destBasePath) {
  return Promise.all(
    files.map(function (filePath) {
      const destFilePath = filePath.replace(sourceBasePath, destBasePath)
      const destDirPath = path.dirname(destFilePath)
      return copyFile(filePath, destDirPath, sourceBasePath)
    })
  )
    .then((results) =>
      console.log(`${results.length} files successfully copied.`)
    )
    .catch(console.error)
}

async function resetDirectory(path) {
  if (existsSync(path)) {
    await fs.rm(path, { force: true, recursive: true })
  }
  await fs.mkdir(path)
}

async function copySourceDirectories() {
  await resetDirectory(LIBS_DEST_PATH)
  await resetDirectory(TRANSLATIONS_DEST_PATH)

  console.log('Copying libs folder...')
  await copyDirectory(
    LIBS_SOURCE_PATH,
    LIBS_DEST_PATH,
    // filter out useless files
    (filePath) =>
      filePath.endsWith('.html') ||
      filePath.endsWith('.css') ||
      filePath.endsWith('.scss') ||
      filePath.endsWith('.yaml') ||
      (filePath.endsWith('.ts') &&
        !filePath.endsWith('.spec.ts') &&
        !filePath.endsWith('.stories.ts') &&
        !filePath.endsWith('jest.config.ts') &&
        !filePath.endsWith('test-setup.ts'))
  )

  console.log('Copying translations folder...')
  await copyDirectory(TRANSLATIONS_SOURCE_PATH, TRANSLATIONS_DEST_PATH)
}

copySourceDirectories()
  .then(() =>
    ngPackage
      .ngPackagr()
      .forProject(path.join(CURRENT_DIR_PATH, 'ng-package.json'))
      .withTsConfig(path.join(CURRENT_DIR_PATH, 'tsconfig.json'))
      .build()
  )
  .then(async () => {
    console.log('Copying config files and source files to package...')
    await copyFile(
      path.join(PROJECT_ROOT_PATH, 'tailwind.base.css'),
      PACKAGE_DIST_PATH
    )
    await copyFile(
      path.join(PROJECT_ROOT_PATH, 'tailwind.base.config.js'),
      PACKAGE_DIST_PATH
    )
    await copyFile(path.join(CURRENT_DIR_PATH, 'style.css'), PACKAGE_DIST_PATH)
    await copyFile(path.join(CURRENT_DIR_PATH, 'index.ts'), PACKAGE_DIST_PATH)
    await fs.cp(
      path.join(CURRENT_DIR_PATH, 'README.package.md'),
      path.join(PACKAGE_DIST_PATH, 'README.md')
    )
    await fs.cp(LIBS_DEST_PATH, path.join(PACKAGE_DIST_PATH, 'src/libs'), {
      recursive: true,
    })
    await fs.cp(
      TRANSLATIONS_DEST_PATH,
      path.join(PACKAGE_DIST_PATH, 'translations'),
      {
        recursive: true,
      }
    )

    console.log(
      'Fixing .d.ts.map sources path to point to the src/libs folder...'
    )
    await rewriteFiles(
      PACKAGE_DIST_PATH,
      (filePath) => filePath.endsWith('.d.ts.map'),
      (chunk) => chunk.replace('../../libs/', '../src/libs/')
    )

    console.log('Cleaning up...')
    await fs.rm(path.join(CURRENT_DIR_PATH, 'libs'), {
      force: true,
      recursive: true,
    })
    await fs.rm(path.join(CURRENT_DIR_PATH, 'translations'), {
      force: true,
      recursive: true,
    })

    console.log('Package was successfully generated!')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
