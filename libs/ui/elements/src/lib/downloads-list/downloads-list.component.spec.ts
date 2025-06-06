import {
  ChangeDetectionStrategy,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { LinkClassifierService } from '@geonetwork-ui/util/shared'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { DownloadsListComponent } from './downloads-list.component'
import {
  DatasetDownloadDistribution,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import { DownloadItemComponent } from '../download-item/download-item.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DownloadsListComponent', () => {
  let component: DownloadsListComponent
  let fixture: ComponentFixture<DownloadsListComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [LinkClassifierService, provideI18n()],
    })
      .overrideComponent(DownloadsListComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListComponent)
    component = fixture.componentInstance
    component.links = []
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('with a non-empty list of downloads', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().dataPdf(),
        aSetOfLinksFixture().dataJson(),
      ]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('contains three links', () => {
      expect(items.length).toBe(6) // 2 presentation (1 hidden) of 3 links
    })
  })

  describe('with an empty list of downloads', () => {
    let item: DebugElement

    beforeEach(() => {
      component.links = []
      fixture.detectChanges()
      item = de.query(By.directive(DownloadsListComponent))
    })
    it('should not display', () => {
      expect(item).toBeNull()
    })
  })

  describe('when link format is unknown', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [aSetOfLinksFixture().unknownFormat()]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('contains one link in "others" section', () => {
      expect(items.length).toBe(2) // 2 presentation (1 hidden) of 1 link
      expect(component.isLinkOfFormat(component.links[0], 'others')).toBe(true)
    })
  })
  describe('when link mime type is unknown', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [
        {
          ...aSetOfLinksFixture().geodataJsonWithMimeType(),
          mimeType: 'unknown/x-type',
        } as DatasetDownloadDistribution,
      ]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('contains one link and mime type is ignored', () => {
      expect(items.length).toBe(2) // 2 presentation (1 hidden) of 1 link
      expect(component.isLinkOfFormat(component.links[0], 'json')).toBe(true)
    })
  })
  describe('derives color and format from link', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [aSetOfLinksFixture().geodataShpWithMimeType()]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('contains color, isAPI & format', () => {
      expect(items.length).toBe(2) // 2 presentation (1 hidden) of 1 link
      expect(items[0].componentInstance.link).toEqual(
        aSetOfLinksFixture().geodataShpWithMimeType()
      )
      expect(items[0].componentInstance.format).toEqual('shp')
      expect(items[0].componentInstance.color).toEqual(
        expect.stringMatching(/#[0-9a-b]{2,6}/i)
      )
      expect(items[0].componentInstance.isFromApi).toEqual(false)
    })
  })
  describe('displaying download links from WFS', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [aSetOfLinksFixture().geodataWfsDownload()]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('sets isFromApi to true', () => {
      expect(items[0].componentInstance.isFromApi).toEqual(true)
    })
  })
  describe('displaying download links from OGC Features', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [aSetOfLinksFixture().geodataOgcApiDownload()]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponent))
    })
    it('sets isFromApi to true', () => {
      expect(items[0].componentInstance.isFromApi).toEqual(true)
    })
  })
  describe('filtering links', () => {
    beforeEach(() => {
      component.links = [
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().geodataJsonWithMimeType(),
      ]
    })
    describe('no filter', () => {
      beforeEach(() => {
        component.activeFilterFormats = ['all']
        fixture.detectChanges()
      })
      it('shows all links', () => {
        expect(component.filteredLinks).toEqual([
          aSetOfLinksFixture().dataCsv(),
          aSetOfLinksFixture().geodataJsonWithMimeType(),
        ])
      })
    })
    describe('filter on csv', () => {
      beforeEach(() => {
        component.activeFilterFormats = ['csv']
        fixture.detectChanges()
      })
      it('shows only one link', () => {
        expect(component.filteredLinks).toEqual([
          aSetOfLinksFixture().dataCsv(),
        ])
      })
    })
    describe('filter on json and csv', () => {
      beforeEach(() => {
        component.activeFilterFormats = ['csv', 'json']
        fixture.detectChanges()
      })
      it('shows both links including geojson', () => {
        expect(component.filteredLinks).toEqual([
          aSetOfLinksFixture().dataCsv(),
          aSetOfLinksFixture().geodataJsonWithMimeType(),
        ])
      })
    })
    describe('filter on shp', () => {
      beforeEach(() => {
        component.activeFilterFormats = ['shp']
        fixture.detectChanges()
      })
      it('shows no link', () => {
        expect(component.filteredLinks).toEqual([])
      })
    })

    describe('toggling formats', () => {
      it('removes already enabled formats', () => {
        component.activeFilterFormats = ['excel', 'csv', 'shp']
        component.toggleFilterFormat('excel')
        expect(component.activeFilterFormats).toEqual(['csv', 'shp'])
      })
      it('adds disabled formats', () => {
        component.activeFilterFormats = ['excel', 'csv', 'shp']
        component.toggleFilterFormat('json')
        expect(component.activeFilterFormats).toEqual([
          'excel',
          'csv',
          'shp',
          'json',
        ])
      })
      it('sets filter to all if disabling the last format', () => {
        component.activeFilterFormats = ['excel', 'csv']
        component.toggleFilterFormat('excel')
        component.toggleFilterFormat('csv')
        expect(component.activeFilterFormats).toEqual(['all'])
      })
      it('toggling all disables other formats if disabled', () => {
        component.activeFilterFormats = ['excel', 'csv']
        component.toggleFilterFormat('all')
        expect(component.activeFilterFormats).toEqual(['all'])
      })
      it('toggling all does nothing if already enabled', () => {
        component.activeFilterFormats = ['all']
        component.toggleFilterFormat('all')
        expect(component.activeFilterFormats).toEqual(['all'])
      })
    })
  })

  describe('filter buttons visibility', () => {
    let items: DebugElement[]
    describe('csv, json, pdf', () => {
      beforeEach(() => {
        component.links = [
          aSetOfLinksFixture().dataCsv(),
          aSetOfLinksFixture().dataJson(),
          aSetOfLinksFixture().dataPdf(),
        ]
        fixture.detectChanges()
        items = de.queryAll(By.css('.format-filter'))
      })
      it('show only all, csv, json and pdf filters', () => {
        const displayedFormats = items.map(
          (item) => item.attributes['data-format']
        )
        expect(displayedFormats).toEqual(['all', 'csv', 'json', 'others'])
      })
    })
    describe('geojson, shp, excel', () => {
      beforeEach(() => {
        component.links = [
          aSetOfLinksFixture().geodataJsonWithMimeType(),
          aSetOfLinksFixture().geodataShp(),
          aSetOfLinksFixture().dataXls(),
          aSetOfLinksFixture().dataXlsx(),
        ]
        fixture.detectChanges()
        items = de.queryAll(By.css('.format-filter'))
      })
      it('show only all, excel, json and shp  filters', () => {
        const displayedFormats = items.map(
          (item) => item.attributes['data-format']
        )
        expect(displayedFormats).toEqual(['all', 'excel', 'json', 'shp'])
      })
    })
    describe('pdf', () => {
      beforeEach(() => {
        component.links = [aSetOfLinksFixture().dataPdf()]
        fixture.detectChanges()
        items = de.queryAll(By.css('.format-filter'))
      })
      it('show only all and others filters', () => {
        const displayedFormats = items.map(
          (item) => item.attributes['data-format']
        )
        expect(displayedFormats).toEqual(['all', 'others'])
      })
    })
  })
  describe('filtering by protocol', () => {
    it('removes duplicate formats if the lqyernqme is the same', () => {
      const links = [
        aSetOfLinksFixture().dataCsv(),
        { ...aSetOfLinksFixture().dataCsv(), name: 'hello world' },
        {
          ...aSetOfLinksFixture().dataCsv(),
          name: 'chqnged:' + aSetOfLinksFixture().dataCsv().name,
        },
        {
          ...aSetOfLinksFixture().dataCsv(),
          url: new URL('http://my.server/files/different.csv'),
        },
        aSetOfLinksFixture().dataJson(),
      ]

      const result = component['removeDuplicateFormats'](links)

      expect(JSON.stringify(result)).toEqual(
        JSON.stringify([
          aSetOfLinksFixture().dataCsv(),
          { ...aSetOfLinksFixture().dataCsv(), name: 'hello world' },
          aSetOfLinksFixture().dataJson(),
        ])
      )
    })
    it('prioritizes ogcFeatures protocol', () => {
      const links: DatasetDownloadDistribution[] = [
        {
          ...aSetOfLinksFixture().dataCsv(),
          accessServiceProtocol: 'wfs' as ServiceProtocol,
        },
        {
          ...aSetOfLinksFixture().dataCsv(),
          accessServiceProtocol: 'ogcFeatures' as ServiceProtocol,
        },
        aSetOfLinksFixture().dataJson(),
      ]

      const result = component['removeDuplicateFormats'](links)

      expect(
        result.map((link) => ({
          ...link,
          url: link.url.toString(),
        }))
      ).toEqual([
        {
          ...aSetOfLinksFixture().dataCsv(),
          accessServiceProtocol: 'ogcFeatures',
          url: aSetOfLinksFixture().dataCsv().url.toString(),
        },
        {
          ...aSetOfLinksFixture().dataJson(),
          url: aSetOfLinksFixture().dataJson().url.toString(),
        },
      ])
    })
  })
})
