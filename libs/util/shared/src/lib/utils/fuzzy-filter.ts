type FuzzyFilter = (input: string) => boolean

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD') // explode composite chars (e.g. é) into multiple chars
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/œ/g, 'oe') // remove accents
    .replace(/[^a-z0-9\s]/g, ' ') // replace special characters with space
}

function asNormalizedParts(input: string): string[] {
  return normalize(input)
    .split(/\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

/**
 * This creates a filter function based on a pattern (typically a user-input
 * search text).
 * @param pattern
 */
export function createFuzzyFilter(pattern: string): FuzzyFilter {
  const patternParts = asNormalizedParts(pattern)
  return (input: string) => {
    const inputParts = asNormalizedParts(input)
    return patternParts.every((patternPart) =>
      inputParts.some((part) => part.includes(patternPart))
    )
  }
}
