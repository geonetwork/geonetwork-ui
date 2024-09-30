export function noDuplicateFileName(
  fileName: string,
  fileNameList: string[]
): string {
  if (fileNameList.includes(fileName)) {
    const fileNameParts = fileName.split('.')
    let extension = ''
    let baseName = fileName

    if (fileNameParts.length > 1) {
      extension = fileNameParts.pop() as string
      baseName = fileNameParts.join('.')
    }

    if (extension) {
      fileName = `${baseName}_${Date.now()}.${extension}`
    } else {
      fileName = `${baseName}_${Date.now()}`
    }
  }

  return fileName
}
