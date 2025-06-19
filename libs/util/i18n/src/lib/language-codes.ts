import { marker } from '@biesbjerg/ngx-translate-extract-marker'

const LANG_3_TO_2_MAPPER = {
  eng: 'en',
  dut: 'nl',
  fre: 'fr',
  ger: 'de',
  kor: 'ko',
  spa: 'es',
  cze: 'cs',
  cat: 'ca',
  fin: 'fi',
  ice: 'is',
  ita: 'it',
  por: 'pt',
  rus: 'ru',
  chi: 'zh',
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
  geo: 'ka',
  ukr: 'uk',
  wel: 'cy',
}

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
}

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
)

export function getLang3FromLang2(lang2: string): string {
  return LANG_2_TO_3_MAPPER[lang2] ?? lang2
}

export function getLang2FromLang3(lang3: string): string {
  return LANG_3_TO_2_MAPPER[lang3] ?? lang3
}

export function getLocalizedIndexKey(lang2: string): string {
  const lang3 = getLang3FromLang2(lang2)
  return lang3 ? `lang${lang3}` : null
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
