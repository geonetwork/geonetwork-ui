import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import { TestBed } from '@angular/core/testing'
import { elasticLinkFixture } from '@geonetwork-ui/common/fixtures'
import { Gn4FieldMapper } from './gn4.field.mapper'
import { MetadataUrlService } from './metadata-url.service'
import { TranslateService } from '@ngx-translate/core'

setupZoneTestEnv()

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = () => 'url'
}

const translateServiceMock = {
  currentLang: 'de',
}

describe('Gn4FieldMapper', () => {
  let service: Gn4FieldMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
    service = TestBed.inject(Gn4FieldMapper)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(Gn4FieldMapper)
    })
    describe('#getLinkType', () => {
      it('correctly detects the fixtures types', () => {
        const allLinks = Object.keys(elasticLinkFixture()).map(
          (key) => elasticLinkFixture()[key]
        )
        const linkTypes = allLinks.map((fixture) =>
          service.getLinkType(fixture.url, fixture.protocol)
        )
        expect(linkTypes).toStrictEqual([
          'link',
          'link',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'service',
          'service',
          'service',
          'service',
          'service',
          'service',
          'service',
          'link',
          'link',
          'download',
          'service',
        ])
      })
    })

    describe('#getMappingFn', () => {
      it('should return a function when given a valid field name', () => {
        const fieldName = 'id'
        const mappingFn = service.getMappingFn(fieldName)
        expect(typeof mappingFn).toBe('function')
      })
      it('should return a generic field when given an invalid field name', () => {
        const fieldName = 'invalidField'
        const mappingFn = service.getMappingFn(fieldName)
        expect(mappingFn).toBe(service.genericField)
      })
      it('should return a function that maps the correct field even if the source object has additional unknown properties', () => {
        const fieldName = 'id'
        const mappingFn = service.getMappingFn(fieldName)
        const output = {}
        const source = { id: '12345', unknownProp: 'value' }
        const result = mappingFn(output, source)
        expect(result).toEqual({ extras: { id: '12345' } })
      })
      describe('field mappings', () => {
        it('id - should return a function that correctly maps the field', () => {
          const fieldName = 'id'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = { id: '12345' }
          const result = mappingFn(output, source)
          expect(result).toEqual({ extras: { id: '12345' } })
        })
        it('uuid - should return a function that correctly maps the field', () => {
          const fieldName = 'uuid'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = { uuid: '12345' }
          const result = mappingFn(output, source)
          expect(result).toEqual({
            landingPage: new URL('http://localhost/url'),
            uniqueIdentifier: '12345',
          })
        })
        it('resourceTitleObject - should return a function that correctly maps the field to default lang', () => {
          service.lang3 = 'langeng'
          const fieldName = 'resourceTitleObject'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = {
            resourceTitleObject: {
              default: 'Default title',
              langfre: 'French title',
            },
          }
          const result = mappingFn(output, source)
          expect(result).toEqual({
            title: 'Default title',
          })
        })
        it('resourceAbstractObject - should return a function that correctly maps the field to fre lang', () => {
          service.lang3 = 'langfre'
          const fieldName = 'resourceAbstractObject'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = {
            resourceAbstractObject: {
              default: 'Default abstract',
              langfre: 'French abstract',
            },
          }
          const result = mappingFn(output, source)
          expect(result).toEqual({
            abstract: 'French abstract',
          })
        })
        it('overview - should return a function that correctly maps the field', () => {
          service.lang3 = 'langfre'
          const fieldName = 'overview'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = {
            overview: [
              {
                url: 'https://mygeodata/map.png',
                text: {
                  default: 'Default overview description',
                  langfre: 'French overview description',
                },
              },
            ],
          }
          const result = mappingFn(output, source)
          expect(result).toEqual({
            overviews: [
              {
                url: new URL('https://mygeodata/map.png'),
                description: 'French overview description',
              },
            ],
          })
        })
        it('cl_status - should return a function that correctly maps the field', () => {
          const fieldName = 'cl_status'
          const mappingFn = service.getMappingFn(fieldName)
          const output = {}
          const source = {
            cl_status: {
              key: 'completed',
              default: 'Finalisé',
              langfre: 'Finalisé',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode',
            },
          }
          const result = mappingFn(output, source)
          expect(result).toEqual({ status: 'completed' })
        })
      })
    })
  })
})
