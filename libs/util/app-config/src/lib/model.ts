import { Geometry } from 'geojson'

export interface GlobalConfig {
  GN4_API_URL: string
  DATAHUB_URL?: string
  PROXY_PATH?: string
  METADATA_LANGUAGE?: string
  LOGIN_URL?: string
  LOGOUT_URL?: string
  SETTINGS_URL?: string
  WEB_COMPONENT_EMBEDDER_URL?: string
  LANGUAGES?: string[]
  CONTACT_EMAIL?: string
}

export interface LayerConfig {
  TYPE: 'xyz' | 'wms' | 'wfs' | 'geojson' | 'maplibre-style'
  URL?: string
  NAME?: string
  DATA?: string
  STYLE_URL?: string
  ACCESS_TOKEN?: string
}

export interface MapConfig {
  MAX_ZOOM?: number
  DO_NOT_TILE_WMS: boolean
  MAX_EXTENT?: [number, number, number, number] // Expressed as [minx, miny, maxx, maxy]
  MAX_FEATURE_COUNT?: number
  EXTERNAL_VIEWER_URL_TEMPLATE?: string
  EXTERNAL_VIEWER_OPEN_NEW_TAB?: boolean
  DO_NOT_USE_DEFAULT_BASEMAP: boolean
  MAP_LAYERS: LayerConfig[]
}

export interface ThemeConfig {
  PRIMARY_COLOR: string
  SECONDARY_COLOR: string
  MAIN_COLOR: string
  BACKGROUND_COLOR: string
  HEADER_FOREGROUND_COLOR: string
  HEADER_BACKGROUND: string
  THUMBNAIL_PLACEHOLDER: string
  MAIN_FONT?: string
  TITLE_FONT?: string
  FONTS_STYLESHEET_URL?: string
  FAVICON?: string
}

export interface SearchPreset {
  sort: string
  name: string
  filters: Record<string, string[] | string>
}

export interface SearchConfig {
  RECORD_KIND_QUICK_FILTER?: boolean
  FILTER_GEOMETRY_URL?: string
  FILTER_GEOMETRY_DATA?: string
  SEARCH_PRESET?: SearchPreset[]
  ADVANCED_FILTERS?: []
}

export interface MetadataQualityConfig {
  ENABLED: boolean
}

export type CustomTranslations = { [translationKey: string]: string }
export type CustomTranslationsAllLanguages = {
  [lang: string]: CustomTranslations
}

export interface SearchConfig {
  FILTER_GEOMETRY?: Geometry
}
