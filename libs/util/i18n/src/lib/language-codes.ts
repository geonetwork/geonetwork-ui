export const LANG_3_TO_2_MAPPER = {
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
  roh: 'Rumantsch',
}

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
)
