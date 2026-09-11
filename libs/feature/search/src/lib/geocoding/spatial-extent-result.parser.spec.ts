import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { parseSpatialExtentResult } from './spatial-extent-result.parser'

describe('parseSpatialExtentResult', () => {
  const paths = {
    mainLabel: '$.properties.name[0]',
    geometry: '$.geom',
  }

  function buildResult(properties: Record<string, unknown>): GeocodingResult {
    return {
      label: 'Beaufort',
      geom: { type: 'Point', coordinates: [6.0, 45.7] },
      properties,
    }
  }

  it('overrides the label and geom using the configured JSONPaths, resolved against properties', () => {
    const result = buildResult({
      name: ['Beaufort-sur-Doron'],
    })

    const parsed = parseSpatialExtentResult(result, paths)

    expect(parsed.label).toBe('Beaufort-sur-Doron')
    expect(parsed.geom).toEqual(result.geom)
    expect(parsed.properties).toBe(result.properties)
  })

  it('falls back to the original label when the label path does not match', () => {
    const result = buildResult({})

    const parsed = parseSpatialExtentResult(result, paths)

    expect(parsed.label).toBe('Beaufort')
  })

  it('leaves label and geom untouched when no paths are configured', () => {
    const result = buildResult({ name: ['Beaufort-sur-Doron'] })

    const parsed = parseSpatialExtentResult(result, {})

    expect(parsed.label).toBe('Beaufort')
    expect(parsed.geom).toEqual(result.geom)
  })

  it('resolves secondary and tertiary labels using the configured JSONPaths', () => {
    const result = buildResult({
      citycode: ['38150'],
      category: ['poi', 'commune'],
    })

    const parsed = parseSpatialExtentResult(result, {
      secondaryLabel: '$.properties.citycode[0]',
      tertiaryLabel: '$.properties.category[1]',
    })

    expect(parsed.secondaryLabel).toBe('38150')
    expect(parsed.tertiaryLabel).toBe('commune')
  })

  it('leaves secondary and tertiary labels undefined when not configured or not matching', () => {
    const result = buildResult({})

    const parsed = parseSpatialExtentResult(result, {})

    expect(parsed.secondaryLabel).toBeUndefined()
    expect(parsed.tertiaryLabel).toBeUndefined()
  })
})
