let currentVersion = 'abc'

jest.mock('../../../../../package.json', () => {
  const packageJson = jest.requireActual('../../../../../package.json')
  return {
    ...packageJson,
    version: currentVersion,
  }
})

describe('GN UI version exports', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('GEONETWORK_UI_VERSION', () => {
    it('returns the full version (dev version)', async () => {
      currentVersion = '4.5.6-dev'
      // eslint-disable-next-line @nx/enforce-module-boundaries
      const module = await import('@geonetwork-ui/util/shared')
      expect(module.GEONETWORK_UI_VERSION).toBe('4.5.6-dev')
    })
    it('returns the full version (stable version)', async () => {
      currentVersion = '4.5.6'
      // eslint-disable-next-line @nx/enforce-module-boundaries
      const module = await import('@geonetwork-ui/util/shared')
      expect(module.GEONETWORK_UI_VERSION).toBe('4.5.6')
    })
  })
  describe('GEONETWORK_UI_TAG_NAME', () => {
    it('returns the tag name (dev version)', async () => {
      currentVersion = '4.5.6-dev'
      // eslint-disable-next-line @nx/enforce-module-boundaries
      const module = await import('@geonetwork-ui/util/shared')
      expect(module.GEONETWORK_UI_TAG_NAME).toBe('main')
    })
    it('returns the full version (stable version)', async () => {
      currentVersion = '4.5.6'
      // eslint-disable-next-line @nx/enforce-module-boundaries
      const module = await import('@geonetwork-ui/util/shared')
      expect(module.GEONETWORK_UI_TAG_NAME).toBe('v4.5.6')
    })
  })
})
