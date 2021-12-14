import * as TOML from '@ltd/j-toml'

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

interface ThemeConfig {
  PRIMARY_COLOR: string
  SECONDARY_COLOR: string
  MAIN_COLOR: string
  BACKGROUND_COLOR: string
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

function checkKeys(
  input: Record<string, string>,
  mandatory: string[],
  optional: string[]
) {
  const keys = Object.keys(input)
  const missing = mandatory.filter((key) => keys.indexOf(key) === -1)
  const unrecognized = keys.filter(
    (key) => mandatory.indexOf(key) === -1 && optional.indexOf(key) === -1
  )
  return {
    missing,
    unrecognized,
  }
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
        parsed = TOML.parse(conf, { joiner: '\n' }) as any
      } catch (e) {
        throw new Error(
          `An error occurred when parsing the configuration file: ${e.message}`
        )
      }

      const { global, theme, translations: translationsNested } = parsed
      const errors = []
      const warnings = []

      const globalCheck = checkKeys(
        global || {},
        ['geonetwork4_api_url'],
        ['proxy_path']
      )
      if (globalCheck.missing.length) {
        errors.push(`In the [global] section: ${globalCheck.missing.join(', ')}
`)
      } else if (globalCheck.unrecognized.length) {
        warnings.push(
          `In the [global] section: ${globalCheck.unrecognized.join(', ')}`
        )
      }

      const themeCheck = checkKeys(
        theme || {},
        ['primary_color', 'secondary_color', 'main_color', 'background_color'],
        ['main_font', 'title_font', 'fonts_stylesheet_url']
      )
      if (themeCheck.missing.length) {
        errors.push(`In the [theme] section: ${themeCheck.missing.join(', ')}`)
      } else if (themeCheck.unrecognized.length) {
        warnings.push(
          `In the [theme] section: ${themeCheck.unrecognized.join(', ')}`
        )
      }

      if (errors.length)
        throw new Error(`One or more mandatory settings were missing from the configuration file.
${errors.join('\n')}`)
      else if (warnings.length)
        console.warn(`One or more unexpected settings were encountered in the configuration file.
${warnings.join('\n')}`)

      // will flatten nested objects using dotted properties
      const flatten = (base, obj, isFirst) =>
        Object.keys(obj).reduce((prev, curr) => {
          const path = base ? `${base}.${curr}` : curr
          const val = obj[curr]
          if (isFirst) return { ...prev, [path]: flatten('', val, false) }
          else if (typeof val === 'object')
            return { ...prev, ...flatten(path, val, false) }
          else return { ...prev, [path]: val }
        }, {})

      // flatten translations by language
      const translations = translationsNested
        ? flatten('', translationsNested, true)
        : {}

      globalConfig = {
        GN4_API_URL: global.geonetwork4_api_url,
        PROXY_PATH: global.proxy_path,
      }
      themeConfig = {
        PRIMARY_COLOR: theme.primary_color,
        SECONDARY_COLOR: theme.secondary_color,
        MAIN_COLOR: theme.main_color,
        BACKGROUND_COLOR: theme.background_color,
        TITLE_FONT: theme.title_font,
        MAIN_FONT: theme.main_font,
        FONTS_STYLESHEET_URL: theme.fonts_stylesheet_url,
      }
      customTranslations = translations || {}

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
