import { TestBed } from '@angular/core/testing'
import { DateService } from './date.service'
import { TranslateService } from '@ngx-translate/core'

describe('DateService', () => {
  let service: DateService
  let translateService: TranslateService

  beforeEach(() => {
    // Create a simple stub for TranslateService with currentLang set to 'en-US'
    const translateServiceStub = { currentLang: 'en-US' }

    TestBed.configureTestingModule({
      providers: [
        DateService,
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    })
    service = TestBed.inject(DateService)
    translateService = TestBed.inject(TranslateService)
  })

  describe('formatDate', () => {
    it('should format a valid Date object with default options', () => {
      const date = new Date('2020-01-01T00:00:00Z')
      const expected = date.toLocaleDateString('en-US')
      const result = service.formatDate(date)
      expect(result).toEqual(expected)
    })

    it('should format a valid Date object with provided options', () => {
      const date = new Date('2020-01-01T00:00:00Z')
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      const expected = date.toLocaleDateString('en-US', options)
      const result = service.formatDate(date, options)
      expect(result).toEqual(expected)
    })

    it('should format a valid date string with default options', () => {
      const dateString = '2020-01-01T00:00:00Z'
      const date = new Date(dateString)
      const expected = date.toLocaleDateString('en-US')
      const result = service.formatDate(dateString)
      expect(result).toEqual(expected)
    })

    it('should throw an error for an invalid date string', () => {
      const invalidDate = 'invalid-date'
      expect(() => service.formatDate(invalidDate)).toThrowError(
        'Invalid date string'
      )
    })
  })

  describe('formatDateTime', () => {
    it('should format a valid Date object with default options', () => {
      const date = new Date('2020-01-01T12:34:56Z')
      const expected = date.toLocaleString('en-US')
      const result = service.formatDateTime(date)
      expect(result).toEqual(expected)
    })

    it('should format a valid Date object with provided options', () => {
      const date = new Date('2020-01-01T12:34:56Z')
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }
      const expected = date.toLocaleString('en-US', options)
      const result = service.formatDateTime(date, options)
      expect(result).toEqual(expected)
    })

    it('should format a valid date string with default options', () => {
      const dateString = '2020-01-01T12:34:56Z'
      const date = new Date(dateString)
      const expected = date.toLocaleString('en-US')
      const result = service.formatDateTime(dateString)
      expect(result).toEqual(expected)
    })

    it('should throw an error for an invalid date string', () => {
      const invalidDate = 'invalid-date'
      expect(() => service.formatDateTime(invalidDate)).toThrowError(
        'Invalid date string'
      )
    })
  })
})
