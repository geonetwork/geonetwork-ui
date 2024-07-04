/**
 * Parts are [firstName, lastName]
 * Second part will be null if no separation could be done
 * @param fullName
 */
export function fullNameToParts(fullName: string): [string, string | null] {
  const parts = fullName.trim().split(/\s+/)
  const first = parts.shift()
  return [first, parts.join(' ').trim() || null]
}

export function namePartsToFull(
  firstName: string | null,
  lastName: string | null
): string | null {
  const first = firstName?.trim()
  const last = lastName?.trim()
  if (!first && !last) return null
  return last && first ? `${first} ${last}` : last || first
}
