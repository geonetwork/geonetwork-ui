export function dropEmptyTranslations(translations) {
  // filter out empty keys: this should let us fallback on the default lang or
  // untranslated key, instead of having a blank space
  return Object.keys(translations).reduce(
    (prev, curr) =>
      translations[curr].trim().length
        ? { ...prev, [curr]: translations[curr] }
        : prev,
    {}
  )
}
