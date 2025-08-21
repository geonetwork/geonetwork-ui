import { marker } from '@biesbjerg/ngx-translate-extract-marker'

/**
 * Taken from https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 * Note: some languages have multiple 3-char codes, like 'fre' and 'fra'; in that case, the one to be used
 * in priority is the one defined last
 */
const LANG_3_TO_2_MAPPER = {
  eng: 'en',
  nld: 'nl', // duplicate for "dut"
  dut: 'nl',
  fra: 'fr', // duplicate for "fre"
  fre: 'fr',
  deu: 'de', // duplicate for "ger"
  ger: 'de',
  kor: 'ko',
  spa: 'es',
  ces: 'cs', // duplicate for "cze"
  cze: 'cs',
  cat: 'ca',
  fin: 'fi',
  isl: 'is', // duplicate for "ice"
  ice: 'is',
  ita: 'it',
  por: 'pt',
  rus: 'ru',
  zho: 'zh', // duplicate for "chi"
  chi: 'zh',
  slk: 'sk', // duplicate for "slo"
  slo: 'sk',
  roh: 'rm',
  ara: 'ar',
  dan: 'da',
  nor: 'no',
  pol: 'pl',
  swe: 'sv',
  tur: 'tr',
  arm: 'hy',
  aze: 'az',
  kat: 'ka', // duplicate for "geo"
  geo: 'ka',
  ukr: 'uk',
  cym: 'cy', // duplicate for "wel"
  wel: 'cy',
} as const

export const LANGUAGE_NAMES = {
  en: 'English',
  nl: 'Nederlands',
  fr: 'Français',
  de: 'Deutsch',
  ko: '한국어',
  es: 'Español',
  cs: 'Čeština',
  ca: 'Català',
  fi: 'Suomi',
  is: 'Íslenska',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  sk: 'Slovenčina',
  rm: 'Rumantsch',
  ar: 'العربية',
  da: 'Dansk',
  no: 'Norsk',
  pl: 'Polski',
  sv: 'Swedish',
  tr: 'Türkçe',
  hy: 'հայերեն',
  az: 'Azərbaycan dili',
  ka: 'ქართული',
  uk: 'українська',
  wel: 'Cymraeg',
} as const

export type LanguageCode3 = keyof typeof LANG_3_TO_2_MAPPER
export type LanguageCode2 = (typeof LANG_3_TO_2_MAPPER)[LanguageCode3]

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
) as Record<LanguageCode2, LanguageCode3>

/**
 * This can be:
 * - an ISO 639-2 language code in 3 characters (e.g. 'eng', 'fre', 'ger')
 * - an ISO 639-1 language code in 2 characters (e.g. 'en', 'fr', 'de')
 * - a 2-character language code with locale (e.g. 'fr_FR', 'fr_CA')
 */
export type LanguageCodeLike = LanguageCode2 | LanguageCode3 | string

/**
 * Converts a language code in any format to the ISO 639-2 format (3 characters)
 * Returns the given string if the corresponding language code could not be recognized
 */
export function toLang3(lang: LanguageCodeLike): LanguageCode3 | string {
  if (!lang) {
    // also handle falsy values just in case
    return lang
  }
  if (lang.length === 3) {
    return LANG_2_TO_3_MAPPER[LANG_3_TO_2_MAPPER[lang.toLowerCase()]] ?? lang
  }
  const lang2 = lang.toLowerCase().substring(0, 2)
  return LANG_2_TO_3_MAPPER[lang2] ?? lang
}

/**
 * Converts a language code in any format to the ISO 639-1 format (2 characters)
 * Returns the given string if the corresponding language code could not be recognized
 */
export function toLang2(lang: LanguageCodeLike): LanguageCode2 | string {
  if (!lang) {
    // also handle falsy values just in case
    return lang
  }
  if (lang.length === 3) {
    return LANG_3_TO_2_MAPPER[lang.toLowerCase()] ?? lang
  }
  const lang2 = lang.toLowerCase().substring(0, 2)
  if (lang2 in LANG_2_TO_3_MAPPER) {
    return lang2
  }
  if (lang.match(/[a-z]{2}_[A-Z]{2}/)) {
    // remove locale code even if the language code is not known
    return lang2
  }
  return lang
}

marker('language.en')
marker('language.nl')
marker('language.fr')
marker('language.de')
marker('language.ko')
marker('language.es')
marker('language.cs')
marker('language.ca')
marker('language.fi')
marker('language.is')
marker('language.it')
marker('language.pt')
marker('language.ru')
marker('language.zh')
marker('language.sk')
marker('language.rm')
marker('language.ar')
marker('language.da')
marker('language.no')
marker('language.pl')
marker('language.sv')
marker('language.tr')
marker('language.hy')
marker('language.az')
marker('language.ka')
marker('language.uk')
marker('language.cy')
