import { LANGUAGE_CODES_ISO_3 } from './constants'

const flatten = (
  base: string,
  obj: Record<string, unknown>,
  keepLevel = false
) =>
  Object.keys(obj).reduce((prev, curr) => {
    const path = base ? `${base}.${curr}` : curr
    const val = obj[curr]
    if (keepLevel) {
      return { ...prev, [path]: flatten('', val as Record<string, unknown>) }
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      return {
        ...prev,
        ...flatten(path, val as Record<string, unknown>),
      }
    } else {
      return { ...prev, [path]: val }
    }
  }, {})

const checkKeys = (
  input: Record<string, string>,
  mandatory: string[],
  optional: string[]
) => {
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

/**
 * Only keeps recognized keys, flatten nested values (to allow having "." in keys),
 * pushes warnings and errors to the given arrays; returns null in case of error
 */
export function parseConfigSection(
  fullConfigObj: Record<string, Record<string, unknown>>,
  sectionName: string,
  mandatoryKeys: string[],
  optionalKeys: string[],
  outWarnings: string[],
  outErrors: string[]
): Record<string, unknown> | null {
  if (typeof fullConfigObj[sectionName] !== 'object') {
    if (mandatoryKeys.length === 0) return null
    outErrors.push(`The [${sectionName}] mandatory section is missing.`)
    return null
  }

  const sectionConf = fullConfigObj[sectionName] as Record<string, string>
  const keysCheck = checkKeys(sectionConf, mandatoryKeys, optionalKeys)

  if (keysCheck.missing.length) {
    // note: this is not thrown to allow merging several Errors down the line
    outErrors.push(
      `In the [${sectionName}] section: ${keysCheck.missing.join(', ')}`
    )
    return null
  } else if (keysCheck.unrecognized.length) {
    outWarnings.push(
      `In the [${sectionName}] section: ${keysCheck.unrecognized.join(', ')}`
    )
    keysCheck.unrecognized.forEach((key) => delete sectionConf[key])
  }

  return sectionConf
}

/**
 * Same as parseConfigSection but keeps all keys, recognized or not
 * Also the first level is the language code (e.g. 'en')
 * This is optional
 */
export function parseTranslationsConfigSection(
  fullConfigObj: Record<string, Record<string, unknown>>,
  sectionName: string
): Record<string, unknown> {
  if (typeof fullConfigObj[sectionName] !== 'object') {
    return {}
  }
  return flatten('', fullConfigObj[sectionName], true)
}

/**
 * Same as parseConfigSection but handles an array of configs; this is
 * considered optional; returns null in case of error in at least one of
 * the sections
 */
export function parseMultiConfigSection(
  fullConfigObj: Record<string, Record<string, unknown>[]>,
  sectionName: string,
  mandatoryKeys: string[],
  optionalKeys: string[],
  outWarnings: string[],
  outErrors: string[]
): Record<string, unknown>[] | null {
  const sections = fullConfigObj[sectionName]
  if (!sections) {
    return []
  }
  if (!Array.isArray(sections)) {
    outErrors.push(`Expected [[${sectionName}]] to be an array of sections.`)
    return null
  }
  const result = sections.map((section) =>
    parseConfigSection(
      { [sectionName]: section },
      sectionName,
      mandatoryKeys,
      optionalKeys,
      outWarnings,
      outErrors
    )
  )
  if (result.some((r) => r === null)) {
    return null
  }
  return result
}

export function checkMetadataLanguage(
  parsedConfigSection: any,
  outWarnings: string[]
) {
  if (
    LANGUAGE_CODES_ISO_3.indexOf(
      parsedConfigSection.metadata_language.toLowerCase()
    ) === -1
  ) {
    outWarnings.push(
      `In the [global] section: metadata_language = "${parsedConfigSection.metadata_language}" is not in ISO 639-2/B format`
    )
  }
  return parsedConfigSection
}
