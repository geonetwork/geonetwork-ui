import * as TOML from '@ltd/j-toml'
import {
  parseConfigSection,
  parseMultiConfigSection,
  parseTranslationsConfigSection,
} from './parse-utils'

const MISSING_CONFIG_ERROR = `Application configuration was not initialized correctly.
This error might show up in case of an invalid/malformed configuration file. 

Note: make sure that you have called \`loadAppConfig\` from '@geonetwork-ui/util/app-config' before starting the Angular application.`

interface GlobalConfig {
  GN4_API_URL: string
  PROXY_PATH?: string
}
let globalConfig: GlobalConfig = null

export function getGlobalConfig(): GlobalConfig {
  if (globalConfig === null) throw new Error(MISSING_CONFIG_ERROR)
  return globalConfig
}

export interface LayerConfig {
  TYPE: 'xyz' | 'wms' | 'wfs'
  URL: string
  NAME?: string
}
export interface MapConfig {
  MAX_ZOOM?: number
  MAX_EXTENT?: [number, number, number, number] // Expressed as [minx, miny, maxx, maxy]
  EXTERNAL_VIEWER_URL_TEMPLATE?: string
  EXTERNAL_VIEWER_OPEN_NEW_TAB?: string
  DO_NOT_USE_DEFAULT_BASEMAP: boolean
  MAP_LAYERS: LayerConfig[]
}
let mapConfig: MapConfig = null

export function getMapConfig(): MapConfig {
  if (mapConfig === null) throw new Error(MISSING_CONFIG_ERROR)
  return mapConfig
}

interface ThemeConfig {
  PRIMARY_COLOR: string
  SECONDARY_COLOR: string
  MAIN_COLOR: string
  BACKGROUND_COLOR: string
  HEADER_BACKGROUND: string
  THUMBNAIL_PLACEHOLDER: string
  MAIN_FONT?: string
  TITLE_FONT?: string
  FONTS_STYLESHEET_URL?: string
}
let themeConfig: ThemeConfig = null

export function getThemeConfig(): ThemeConfig {
  if (themeConfig === null) throw new Error(MISSING_CONFIG_ERROR)
  return themeConfig
}

type CustomTranslations = { [translationKey: string]: string }
type CustomTranslationsAllLanguages = {
  [lang: string]: CustomTranslations
}
let customTranslations: CustomTranslationsAllLanguages = null

export function getCustomTranslations(langCode: string): CustomTranslations {
  if (customTranslations === null) throw new Error(MISSING_CONFIG_ERROR)
  return langCode in customTranslations ? customTranslations[langCode] : {}
}

let appConfigLoaded = false

export function loadAppConfig() {
  return fetch('assets/configuration/default.toml')
    .then((resp) => {
      if (!resp.ok) throw new Error('Configuration file could not be loaded')
      return resp.text()
    })
    .then((conf) => {
      let parsed
      try {
        parsed = TOML.parse(conf, { joiner: '\n', bigint: false }) as any
      } catch (e: any) {
        throw new Error(
          `An error occurred when parsing the configuration file: ${e.message}`
        )
      }
      const errors = []
      const warnings = []

      const parsedGlobalSection = parseConfigSection(
        parsed,
        'global',
        ['geonetwork4_api_url'],
        ['proxy_path'],
        warnings,
        errors
      )
      globalConfig =
        parsedGlobalSection === null
          ? null
          : ({
              GN4_API_URL: parsedGlobalSection.geonetwork4_api_url,
              PROXY_PATH: parsedGlobalSection.proxy_path,
            } as GlobalConfig)

      const parsedLayersSections = parseMultiConfigSection(
        parsed,
        'map_layer',
        ['type', 'url'],
        ['name'],
        warnings,
        errors
      )
      const parsedMapSection = parseConfigSection(
        parsed,
        'map',
        [],
        [
          'max_zoom',
          'max_extent',
          'baselayer',
          'do_not_use_default_basemap',
          'external_viewer_url_template',
          'external_viewer_open_new_tab',
        ],
        warnings,
        errors
      )
      mapConfig =
        parsedMapSection === null || parsedLayersSections === null
          ? null
          : ({
              MAX_ZOOM: parsedMapSection.max_zoom,
              MAX_EXTENT: parsedMapSection.max_extent,
              EXTERNAL_VIEWER_URL_TEMPLATE:
                parsedMapSection.external_viewer_url_template,
              EXTERNAL_VIEWER_OPEN_NEW_TAB:
                parsedMapSection.external_viewer_open_new_tab,
              DO_NOT_USE_DEFAULT_BASEMAP:
                !!parsedMapSection.do_not_use_default_basemap,
              MAP_LAYERS: parsedLayersSections.map(
                (map_layer) =>
                  ({
                    TYPE: map_layer.type,
                    URL: map_layer.url,
                    NAME: map_layer.name,
                  } as LayerConfig)
              ),
            } as MapConfig)

      const parsedThemeSection = parseConfigSection(
        parsed,
        'theme',
        [
          'primary_color',
          'secondary_color',
          'main_color',
          'background_color',
          'header_background',
          'thumbnail_placeholder',
        ],
        ['main_font', 'title_font', 'fonts_stylesheet_url'],
        warnings,
        errors
      )
      themeConfig =
        parsedThemeSection === null
          ? null
          : ({
              PRIMARY_COLOR: parsedThemeSection.primary_color,
              SECONDARY_COLOR: parsedThemeSection.secondary_color,
              MAIN_COLOR: parsedThemeSection.main_color,
              BACKGROUND_COLOR: parsedThemeSection.background_color,
              THUMBNAIL_PLACEHOLDER: parsedThemeSection.thumbnail_placeholder,
              HEADER_BACKGROUND: parsedThemeSection.header_background,
              TITLE_FONT: parsedThemeSection.title_font,
              MAIN_FONT: parsedThemeSection.main_font,
              FONTS_STYLESHEET_URL: parsedThemeSection.fonts_stylesheet_url,
            } as ThemeConfig)

      customTranslations = parseTranslationsConfigSection(
        parsed,
        'translations'
      ) as CustomTranslationsAllLanguages

      if (errors.length) {
        throw new Error(`One or more mandatory settings were missing from the configuration file.
${errors.join('\n')}`)
      } else if (warnings.length) {
        console.warn(`One or more unexpected settings were encountered in the configuration file.
${warnings.join('\n')}`)
      }

      appConfigLoaded = true
    })
}

export function isConfigLoaded() {
  return appConfigLoaded
}

export function _reset() {
  globalConfig = null
  themeConfig = null
  customTranslations = null
}
