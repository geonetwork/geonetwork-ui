import { ISO_TOPICS } from './fields.config'

describe('ISO_TOPICS', () => {
  // Values are written verbatim as ISO gmd:MD_TopicCategoryCode codes, which
  // are lower-camelCase with no whitespace. This guards against the casing /
  // spacing regression fixed in issue #1615 (e.g. "Society", "geoscientific
  // information").
  it('uses valid ISO topic codes as values', () => {
    for (const { value } of ISO_TOPICS) {
      expect(value).toMatch(/^[a-z][a-zA-Z]*$/)
    }
  })

  it('keeps the label key suffix in sync with the value', () => {
    for (const { value, label } of ISO_TOPICS) {
      expect(label).toBe(`editor.record.form.topics.iso.${value}`)
    }
  })
})
