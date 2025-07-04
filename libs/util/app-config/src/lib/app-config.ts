import * as TOML from '@ltd/j-toml'
import {
  checkMetadataLanguage,
  parseConfigSection,
  parseMultiConfigSection,
  parseTranslationsConfigSection,
} from './parse-utils'
import {
  CustomTranslations,
  CustomTranslationsAllLanguages,
  GlobalConfig,
  LayerConfig,
  MapConfig,
  MetadataQualityConfig,
  SearchConfig,
  ThemeConfig,
} from './model'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { HttpClient } from '@angular/common/http'
import { FileWithOverridesTranslateLoader } from './i18n/file-with-overrides.translate.loader'

const MISSING_CONFIG_ERROR = `Application configuration was not initialized correctly.
This error might show up in case of an invalid/malformed configuration file.

Note: make sure that you have called \`loadAppConfig\` from '@geonetwork-ui/util/app-config' before starting the Angular application.`

let globalConfig: GlobalConfig = null

export function getGlobalConfig(): GlobalConfig {
  if (globalConfig === null) throw new Error(MISSING_CONFIG_ERROR)
  return globalConfig
}

let themeConfig: ThemeConfig = null

export function getThemeConfig(): ThemeConfig {
  if (themeConfig === null) throw new Error(MISSING_CONFIG_ERROR)
  return themeConfig
}

let mapConfig: MapConfig = null

export function getOptionalMapConfig(): MapConfig | null {
  return mapConfig
}

let searchConfig: SearchConfig = null

export function getOptionalSearchConfig(): SearchConfig | null {
  return searchConfig
}

let metadataQualityConfig: MetadataQualityConfig = null
export function getMetadataQualityConfig(): MetadataQualityConfig {
  return (
    metadataQualityConfig ||
    ({
      ENABLED: false,
    } as MetadataQualityConfig)
  )
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

      let parsedGlobalSection = parseConfigSection(
        parsed,
        'global',
        ['geonetwork4_api_url'],
        [
          'datahub_url',
          'proxy_path',
          'metadata_language',
          'login_url',
          'logout_url',
          'settings_url',
          'web_component_embedder_url',
          'languages',
          'contact_email',
        ],
        warnings,
        errors
      )
      if (parsedGlobalSection?.metadata_language) {
        parsedGlobalSection = checkMetadataLanguage(
          parsedGlobalSection,
          warnings
        )
      }
      globalConfig =
        parsedGlobalSection === null
          ? null
          : ({
              GN4_API_URL: parsedGlobalSection.geonetwork4_api_url,
              DATAHUB_URL: parsedGlobalSection.datahub_url,
              PROXY_PATH: parsedGlobalSection.proxy_path,
              METADATA_LANGUAGE: parsedGlobalSection.metadata_language
                ? (
                    parsedGlobalSection.metadata_language as string
                  ).toLowerCase()
                : undefined,
              LOGIN_URL: parsedGlobalSection.login_url,
              LOGOUT_URL: parsedGlobalSection.logout_url,
              SETTINGS_URL: parsedGlobalSection.settings_url,
              WEB_COMPONENT_EMBEDDER_URL:
                parsedGlobalSection.web_component_embedder_url,
              LANGUAGES: parsedGlobalSection.languages,
              CONTACT_EMAIL: parsedGlobalSection.contact_email,
            } as GlobalConfig)

      const parsedLayersSections = parseMultiConfigSection(
        parsed,
        'map_layer',
        ['type'],
        ['name', 'url', 'data', 'styleUrl', 'accessToken'],
        warnings,
        errors
      )
      const parsedMapSection = parseConfigSection(
        parsed,
        'map',
        [],
        [
          'max_zoom',
          'do_not_tile_wms',
          'max_extent',
          'max_feature_count',
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
              DO_NOT_TILE_WMS: parsedMapSection.do_not_tile_wms,
              MAX_EXTENT: parsedMapSection.max_extent,
              MAX_FEATURE_COUNT: parsedMapSection.max_feature_count,
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
                    DATA: map_layer.data,
                    STYLE_URL: map_layer.styleUrl,
                    ACCESS_TOKEN: map_layer.accessToken,
                  }) as LayerConfig
              ),
            } as MapConfig)

      const parsedThemeSection = parseConfigSection(
        parsed,
        'theme',
        ['primary_color', 'secondary_color', 'main_color', 'background_color'],
        [
          'header_foreground_color',
          'main_font',
          'title_font',
          'fonts_stylesheet_url',
          'thumbnail_placeholder',
          'header_background',
          'favicon',
        ],
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
              HEADER_FOREGROUND_COLOR:
                parsedThemeSection.header_foreground_color,
              THUMBNAIL_PLACEHOLDER: parsedThemeSection.thumbnail_placeholder,
              HEADER_BACKGROUND: parsedThemeSection.header_background,
              TITLE_FONT: parsedThemeSection.title_font,
              MAIN_FONT: parsedThemeSection.main_font,
              FONTS_STYLESHEET_URL: parsedThemeSection.fonts_stylesheet_url,
              FAVICON: parsedThemeSection.favicon,
            } as ThemeConfig)

      const parsedSearchSection = parseConfigSection(
        parsed,
        'search',
        [],
        [
          'record_kind_quick_filter',
          'filter_geometry_data',
          'filter_geometry_url',
          'search_preset',
          'advanced_filters',
        ],
        warnings,
        errors
      )
      const parsedSearchParams = parseMultiConfigSection(
        parsed,
        'search_preset',
        ['name'],
        ['sort', 'filters'],
        warnings,
        errors
      )
      searchConfig =
        parsedSearchSection === null
          ? null
          : ({
              RECORD_KIND_QUICK_FILTER:
                parsedSearchSection.record_kind_quick_filter,
              FILTER_GEOMETRY_DATA: parsedSearchSection.filter_geometry_data,
              FILTER_GEOMETRY_URL: parsedSearchSection.filter_geometry_url,
              SEARCH_PRESET: parsedSearchParams.map((param) => ({
                sort: param.sort,
                name: param.name,
                filters: param.filters,
              })),
              ADVANCED_FILTERS: parsedSearchSection.advanced_filters,
            } as SearchConfig)

      const parsedMetadataQualitySection = parseConfigSection(
        parsed,
        'metadata-quality',
        [],
        ['enabled'],
        warnings,
        errors
      )
      metadataQualityConfig =
        parsedMetadataQualitySection === null
          ? null
          : ({
              ENABLED: parsedMetadataQualitySection.enabled,
              SORTABLE: parsedMetadataQualitySection.sortable,
            } as MetadataQualityConfig)

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

export const TRANSLATE_WITH_OVERRIDES_CONFIG = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  loader: {
    provide: TranslateLoader,
    useFactory: function HttpLoaderFactory(http: HttpClient) {
      return new FileWithOverridesTranslateLoader(http, './assets/i18n/')
    },
    deps: [HttpClient],
  },
}
