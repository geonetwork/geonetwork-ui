import fetchMock from 'fetch-mock-jest'
import { getMapConfig } from '..'
import {
  _reset,
  getCustomTranslations,
  getGlobalConfig,
  getThemeConfig,
  loadAppConfig,
} from './app-config'
import { CONFIG_WITH_TRANSLATIONS } from './fixtures'

const CONFIG_MALFORMED = `
{
  "I thought": "we were still doing json"
}
`

const CONFIG_MISSING_MANDATORY = `
[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
background_color = "#fdfbff"
main_font = 'sans-serif'
`

const CONFIG_UNRECOGNIZED_KEYS = `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="
another_path = '/whatever'

[map]
max_zoom = 10
max_extent = [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855]

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
main_font = 'sans-serif'
title_font = 'serif'
another_color = 'red'
`

const CONFIG_OK = CONFIG_WITH_TRANSLATIONS

describe('app config utils', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn')
    fetchMock.reset()
    _reset()
  })
  describe('when the configuration file is missing', () => {
    beforeEach(() => {
      fetchMock.get('end:default.toml', () => ({ status: 404 }))
    })
    describe('loadAppConfig', () => {
      it('throws an error', async () => {
        await expect(loadAppConfig()).rejects.toThrowError(
          'could not be loaded'
        )
      })
    })
    describe('getGlobalConfig', () => {
      it('throws an error', async () => {
        await loadAppConfig().catch(() => {}) // eslint-disable-line
        expect(() => getGlobalConfig()).toThrowError('not initialized')
      })
    })
  })
  describe('when the configuration file is malformed', () => {
    beforeEach(() => {
      fetchMock.get('end:default.toml', () => CONFIG_MALFORMED)
    })
    describe('loadAppConfig', () => {
      it('throws an error', async () => {
        await expect(loadAppConfig()).rejects.toThrowError(
          'error occurred when parsing'
        )
      })
    })
    describe('getGlobalConfig', () => {
      it('throws an error', async () => {
        await loadAppConfig().catch(() => {}) // eslint-disable-line
        expect(() => getGlobalConfig()).toThrowError('not initialized')
      })
    })
  })
  describe('when the configuration file misses mandatory keys', () => {
    beforeEach(() => {
      fetchMock.get('end:default.toml', () => CONFIG_MISSING_MANDATORY)
    })
    describe('loadAppConfig', () => {
      it('throws an error', async () => {
        await expect(loadAppConfig()).rejects.toThrow(
          /(?=.*mandatory settings were missing)(?=.*geonetwork4_api_url)(?=.*main_color)/s
        )
      })
    })
    describe('getGlobalConfig', () => {
      it('throws an error', async () => {
        await loadAppConfig().catch(() => {}) // eslint-disable-line
        expect(() => getGlobalConfig()).toThrowError('not initialized')
      })
    })
  })
  describe('when the configuration file contains unrecognized keys', () => {
    beforeEach(async () => {
      fetchMock.get('end:default.toml', () => CONFIG_UNRECOGNIZED_KEYS)
      await loadAppConfig()
    })
    describe('loadAppConfig', () => {
      it('logs a warning', () => {
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringMatching(/(?=.*another_path)(?=.*another_color)/s)
        )
      })
    })
    describe('getGlobalConfig', () => {
      it('returns the global config', () => {
        expect(getGlobalConfig()).toEqual({
          GN4_API_URL: '/geonetwork/srv/api',
          PROXY_PATH: '/proxy/?url=',
        })
      })
    })
  })
  describe('when the configuration file is valid', () => {
    beforeEach(async () => {
      fetchMock.get('end:default.toml', () => CONFIG_OK)
      await loadAppConfig()
    })
    describe('getGlobalConfig', () => {
      it('returns the global config', () => {
        expect(getGlobalConfig()).toEqual({
          GN4_API_URL: '/geonetwork/srv/api',
          PROXY_PATH: '/proxy/?url=',
        })
      })
    })
    describe('getMapConfig', () => {
      it('returns the map config', () => {
        expect(getMapConfig()).toEqual({
          MAX_ZOOM: 10,
          MAX_EXTENT: [
            -418263.418776, 5251529.591305, 961272.067714, 6706890.609855,
          ],
        })
      })
    })
    describe('getThemeConfig', () => {
      it('returns the theme config', () => {
        expect(getThemeConfig()).toEqual({
          BACKGROUND_COLOR: '#fdfbff',
          MAIN_COLOR: '#212029',
          MAIN_FONT: 'sans-serif',
          PRIMARY_COLOR: '#093564',
          SECONDARY_COLOR: '#c2e9dc',
          TITLE_FONT: 'serif',
          FONTS_STYLESHEET_URL:
            'https://fonts.googleapis.com/css2?family=Open+Sans',
        })
      })
    })
    describe('getCustomTranslations', () => {
      it('returns the custom translations for one language', () => {
        expect(getCustomTranslations('en')).toEqual({
          'my.first.key': 'First label.',
          'my.second.key': 'Second label,\non two lines.',
        })
        expect(getCustomTranslations('de')).toEqual({
          'my.first.key': 'Erste Etikett.',
        })
        expect(getCustomTranslations('fr')).toEqual({
          'my.sample.text': 'Un bon exemple de texte.',
          'my.quoted.text': 'du texte entre guillements.',
        })
      })
      it('returns an empty object if no translation defined', () => {
        expect(getCustomTranslations('nl')).toEqual({})
      })
    })
  })
})
