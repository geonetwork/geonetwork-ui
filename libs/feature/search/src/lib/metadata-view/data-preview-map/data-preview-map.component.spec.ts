import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataPreviewMapComponent } from './data-preview-map.component'
import { Observable } from 'rxjs'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { By } from '@angular/platform-browser'
import { Component, Input } from '@angular/core'
import { MapContextModel } from '@geonetwork-ui/feature/map'

class MdViewFacadeMock {
  metadata$ = new Observable((observer) =>
    this._metadataValues.forEach((v) => observer.next(v))
  )
  _metadataValues = [RECORDS_SUMMARY_FIXTURE[0]]
}

@Component({
  selector: 'gn-ui-map-context',
  template: '<div></div>',
})
export class MockMapContextComponent {
  @Input() context: MapContextModel
}

describe('DataPreviewMapComponent', () => {
  let component: DataPreviewMapComponent
  let fixture: ComponentFixture<DataPreviewMapComponent>
  let mdViewFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPreviewMapComponent, MockMapContextComponent],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPreviewMapComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('map context', () => {
    let mapComponent: MockMapContextComponent

    beforeEach(() => {
      mapComponent = fixture.debugElement.query(
        By.directive(MockMapContextComponent)
      ).componentInstance
    })

    describe('with no link compatible with MAP usage', () => {
      beforeEach(() => {
        mdViewFacade._metadataValues = [
          {
            ...RECORDS_SUMMARY_FIXTURE[0],
            links: [
              {
                url: 'http://abcd.com/',
                name: 'just a web page',
                protocol: 'WWW:LINK',
              },
            ],
          },
        ]
        fixture.detectChanges()
      })
      it('emits a context with only the base layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [component.getBackgroundLayer()],
          view: expect.any(Object),
        })
      })
    })

    describe('with several links compatible with MAP usage', () => {
      beforeEach(() => {
        mdViewFacade._metadataValues = [
          {
            ...RECORDS_SUMMARY_FIXTURE[0],
            links: [
              {
                url: 'http://abcd.com/',
                name: 'layer1',
                protocol: 'OGC:WMS',
              },
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                protocol: 'OGC:WMS',
              },
            ],
          },
        ]
        fixture.detectChanges()
      })
      it('emits a context with the base layer and the first compatible link', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer1',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
    })

    describe('when receiving several metadata records', () => {
      beforeEach(() => {
        mdViewFacade._metadataValues = [
          RECORDS_SUMMARY_FIXTURE[0],
          RECORDS_SUMMARY_FIXTURE[1],
          {
            ...RECORDS_SUMMARY_FIXTURE[0],
            links: [
              {
                url: 'http://abcd.com/',
                name: 'layer',
                protocol: 'OGC:WMS',
              },
            ],
          },
        ]
        fixture.detectChanges()
      })
      it('emits a context with the link from the last record', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
    })
  })
})
