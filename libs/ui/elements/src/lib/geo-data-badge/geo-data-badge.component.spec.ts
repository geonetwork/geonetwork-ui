import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GeoDataBadgeComponent } from './geo-data-badge.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const mockRecord = {
  kind: 'dataset',
  ownerOrganization: {
    name: 'Worldcorp',
    website: new URL('https://john.world.co'),
  },
  contactsForResource: [
    {
      name: 'john',
      organization: 'Worldcorp',
      email: 'john@world.co',
      website: 'https://john.world.co',
    },
    {
      name: 'billy',
      organization: 'small corp',
      email: 'billy@small.co',
      website: 'https://billy.small.co',
    },
  ],
} as unknown as CatalogRecord

describe('ExternalLinkCardComponent', () => {
  let component: GeoDataBadgeComponent
  let fixture: ComponentFixture<GeoDataBadgeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoDataBadgeComponent)
    component = fixture.componentInstance
    component.record = mockRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#isGeodata', () => {
    it('should return true when there are GEODATA links', () => {
      component.record = {
        ...mockRecord,
        onlineResources: [aSetOfLinksFixture().geodataWfs()],
      }

      expect(component.isGeodata()).toBe(true)
    })
    it('should return false when there are no GEODATA links', () => {
      component.record = {
        ...mockRecord,
        onlineResources: [aSetOfLinksFixture().dataCsv()],
      }

      expect(component.isGeodata()).toBe(false)
    })
  })
})
