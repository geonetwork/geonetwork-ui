export function isFileExtensionValid(
  fileName: string,
  acceptedExtensions: string[]
): boolean {
  return acceptedExtensions.some((ext) => fileName.toLowerCase().endsWith(ext))
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
