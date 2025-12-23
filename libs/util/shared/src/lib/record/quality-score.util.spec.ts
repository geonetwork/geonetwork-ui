import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'

import {
  ValidatorMapperKeys,
  getAllKeysValidator,
  getQualityValidators,
} from './quality-score.util.js'

describe('Metadata Validators', () => {
  const mockRecord: Partial<CatalogRecord> = {
    kind: 'dataset',
    title: 'Test title',
    abstract: 'Test abstract',
    keywords: ['keyword1', 'keyword2'],
    legalConstraints: [{ type: 'license', text: 'MIT' }],
    contacts: [
      {
        email: 'test@example.com',
        organization: { name: 'Test Org' },
      },
    ],
    updateFrequency: 'daily',
    topics: ['environment'],
    onlineResources: [
      {
        url: { href: 'http://example.com/capabilities' },
      },
    ],
    extras: {
      sourcesIdentifiers: '12345',
    },
  }

  const mockRecordInvalid: Partial<CatalogRecord> = {
    kind: 'dataset',
    title: '',
    abstract: '',
    keywords: [],
    legalConstraints: [],
    contacts: [],
    updateFrequency: undefined,
    topics: [],
    onlineResources: [],
    extras: {},
  }

  describe('getAllKeysValidator', () => {
    it('should return all validator keys', () => {
      const result = getAllKeysValidator()
      expect(result).toEqual([
        'title',
        'abstract',
        'keywords',
        'legalConstraints',
        'contacts',
        'updateFrequency',
        'topics',
        'organisation',
        'source',
      ])
      expect(result.every((key) => typeof key === 'string')).toBe(true)
    })
  })

  describe('getQualityValidators', () => {
    const propsToValidate: ValidatorMapperKeys[] = [
      'title',
      'abstract',
      'keywords',
      'legalConstraints',
      'contacts',
      'updateFrequency',
      'topics',
      'organisation',
      'source',
    ]

    it('should filter and return only validators applicable to record kind "dataset" with correct validation results', () => {
      const result = getQualityValidators(
        { ...mockRecord, kind: 'dataset' },
        propsToValidate
      )

      expect(result.length).toBe(8)
      expect(result[0].name).toBe('title')
      expect(result[1].name).toBe('abstract')
      expect(result[2].name).toBe('keywords')
      expect(result[3].name).toBe('legalConstraints')
      expect(result[4].name).toBe('contacts')
      expect(result[5].name).toBe('updateFrequency')
      expect(result[6].name).toBe('topics')
      expect(result[7].name).toBe('organisation')
      expect(result[0].validator()).toBe(true)
      expect(result[1].validator()).toBe(true)
      expect(result[2].validator()).toBe(true)
      expect(result[3].validator()).toBe(true)
      expect(result[4].validator()).toBe(true)
      expect(result[5].validator()).toBe(true)
      expect(result[6].validator()).toBe(true)
      expect(result[7].validator()).toBe(true)

      const resultFailedValidation = getQualityValidators(
        { ...mockRecordInvalid, kind: 'dataset' },
        propsToValidate
      )

      expect(resultFailedValidation.length).toBe(8)
      expect(resultFailedValidation[0].name).toBe('title')
      expect(resultFailedValidation[1].name).toBe('abstract')
      expect(resultFailedValidation[2].name).toBe('keywords')
      expect(resultFailedValidation[3].name).toBe('legalConstraints')
      expect(resultFailedValidation[4].name).toBe('contacts')
      expect(resultFailedValidation[5].name).toBe('updateFrequency')
      expect(resultFailedValidation[6].name).toBe('topics')
      expect(resultFailedValidation[7].name).toBe('organisation')
      expect(resultFailedValidation[0].validator()).toBe(false)
      expect(resultFailedValidation[1].validator()).toBe(false)
      expect(resultFailedValidation[2].validator()).toBe(false)
      expect(resultFailedValidation[3].validator()).toBe(false)
      expect(resultFailedValidation[4].validator()).toBe(false)
      expect(resultFailedValidation[5].validator()).toBe(false)
      expect(resultFailedValidation[6].validator()).toBe(false)
      expect(resultFailedValidation[7].validator()).toBe(false)
    })

    it('should filter and return only validators applicable to record kind "reuse" with correct validation results', () => {
      const result = getQualityValidators(
        { ...mockRecord, kind: 'reuse' },
        propsToValidate
      )

      expect(result.length).toBe(8)
      expect(result[0].name).toBe('title')
      expect(result[1].name).toBe('abstract')
      expect(result[2].name).toBe('keywords')
      expect(result[3].name).toBe('legalConstraints')
      expect(result[4].name).toBe('contacts')
      expect(result[5].name).toBe('topics')
      expect(result[6].name).toBe('organisation')
      expect(result[7].name).toBe('source')
      expect(result[0].validator()).toBe(true)
      expect(result[1].validator()).toBe(true)
      expect(result[2].validator()).toBe(true)
      expect(result[3].validator()).toBe(true)
      expect(result[4].validator()).toBe(true)
      expect(result[5].validator()).toBe(true)
      expect(result[6].validator()).toBe(true)
      expect(result[7].validator()).toBe(true)

      const resultFailedValidation = getQualityValidators(
        { ...mockRecordInvalid, kind: 'reuse' },
        propsToValidate
      )

      expect(resultFailedValidation.length).toBe(8)
      expect(resultFailedValidation[0].name).toBe('title')
      expect(resultFailedValidation[1].name).toBe('abstract')
      expect(resultFailedValidation[2].name).toBe('keywords')
      expect(resultFailedValidation[3].name).toBe('legalConstraints')
      expect(resultFailedValidation[4].name).toBe('contacts')
      expect(resultFailedValidation[5].name).toBe('topics')
      expect(resultFailedValidation[6].name).toBe('organisation')
      expect(resultFailedValidation[7].name).toBe('source')
      expect(resultFailedValidation[0].validator()).toBe(false)
      expect(resultFailedValidation[1].validator()).toBe(false)
      expect(resultFailedValidation[2].validator()).toBe(false)
      expect(resultFailedValidation[3].validator()).toBe(false)
      expect(resultFailedValidation[4].validator()).toBe(false)
      expect(resultFailedValidation[5].validator()).toBe(false)
      expect(resultFailedValidation[6].validator()).toBe(false)
      expect(resultFailedValidation[7].validator()).toBe(false)
    })

    it('should filter and return only validators applicable to record kind "service" with correct validation results', () => {
      const result = getQualityValidators(
        { ...mockRecord, kind: 'service' },
        propsToValidate
      )

      expect(result.length).toBe(5)
      expect(result[0].name).toBe('title')
      expect(result[1].name).toBe('abstract')
      expect(result[2].name).toBe('keywords')
      expect(result[3].name).toBe('legalConstraints')
      expect(result[4].name).toBe('contacts')
      expect(result[0].validator()).toBe(true)
      expect(result[1].validator()).toBe(true)
      expect(result[2].validator()).toBe(true)
      expect(result[3].validator()).toBe(true)
      expect(result[4].validator()).toBe(true)

      const resultFailedValidation = getQualityValidators(
        { ...mockRecordInvalid, kind: 'service' },
        propsToValidate
      )

      expect(resultFailedValidation.length).toBe(5)
      expect(resultFailedValidation[0].name).toBe('title')
      expect(resultFailedValidation[1].name).toBe('abstract')
      expect(resultFailedValidation[2].name).toBe('keywords')
      expect(resultFailedValidation[3].name).toBe('legalConstraints')
      expect(resultFailedValidation[4].name).toBe('contacts')
      expect(resultFailedValidation[0].validator()).toBe(false)
      expect(resultFailedValidation[1].validator()).toBe(false)
      expect(resultFailedValidation[2].validator()).toBe(false)
      expect(resultFailedValidation[3].validator()).toBe(false)
      expect(resultFailedValidation[4].validator()).toBe(false)
    })
  })
})
