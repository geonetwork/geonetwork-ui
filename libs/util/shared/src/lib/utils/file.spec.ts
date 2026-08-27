import { isFileExtensionValid, readFileAsText } from './file'

describe('isFileExtensionValid', () => {
  it('accepts a file name matching one of the accepted extensions', () => {
    expect(isFileExtensionValid('area.geojson', ['.json', '.geojson'])).toBe(
      true
    )
  })

  it('is case sensitive on the extension', () => {
    expect(isFileExtensionValid('area.GEOJSON', ['.geojson'])).toBe(true)
  })

  it('rejects a file name not matching any accepted extension', () => {
    expect(isFileExtensionValid('area.txt', ['.json', '.geojson'])).toBe(false)
  })
})

describe('readFileAsText', () => {
  it('resolves with the text content of the file', async () => {
    const file = new File(['hello world'], 'test.txt', {
      type: 'text/plain',
    })

    await expect(readFileAsText(file)).resolves.toBe('hello world')
  })
})
