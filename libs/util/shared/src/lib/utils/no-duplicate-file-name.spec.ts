import { noDuplicateFileName } from './no-duplicate-file-name'

describe('noDuplicateFileName', () => {
  it('should return the original file name if it does not exist in the fileNameList', () => {
    const fileName = 'testfile.txt'
    const fileNameList = ['otherfile.txt', 'anotherfile.txt']

    const result = noDuplicateFileName(fileName, fileNameList)

    expect(result).toBe(fileName)
  })

  it('should return a new file name with a timestamp if the file name exists in the fileNameList', () => {
    const fileName = 'testfile.txt'
    const fileNameList = ['testfile.txt', 'otherfile.txt']

    const result = noDuplicateFileName(fileName, fileNameList)

    // Check if the new file name starts with the base name and contains a timestamp
    const regex = /testfile_\d+\.txt/
    expect(result).toMatch(regex)
  })

  it('should handle file names without an extension', () => {
    const fileName = 'testfile'
    const fileNameList = ['testfile']

    const result = noDuplicateFileName(fileName, fileNameList)

    // Check if the new file name has a timestamp appended with no extension
    const regex = /testfile_\d+/
    expect(result).toMatch(regex)
  })

  it('should handle file names with multiple dots correctly', () => {
    const fileName = 'test.file.name.txt'
    const fileNameList = ['test.file.name.txt']

    const result = noDuplicateFileName(fileName, fileNameList)

    // Check if the new file name with multiple dots contains a timestamp
    const regex = /test\.file\.name_\d+\.txt/
    expect(result).toMatch(regex)
  })
})
