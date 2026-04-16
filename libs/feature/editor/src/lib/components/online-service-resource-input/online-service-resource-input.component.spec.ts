import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OnlineServiceResourceInputComponent } from './online-service-resource-input.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('OnlineServiceResourceInputComponent', () => {
  let component: OnlineServiceResourceInputComponent
  let fixture: ComponentFixture<OnlineServiceResourceInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(OnlineServiceResourceInputComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('availableProtocolOptions', () => {
    it('returns all protocol options when no protocolOptions input is provided', () => {
      expect(component.availableProtocolOptions).toEqual(
        component.allProtocolOptions
      )
    })

    it('returns only the specified protocols when protocolOptions input is provided', () => {
      component.protocolOptions = ['ogcFeatures', 'wfs']
      expect(component.availableProtocolOptions.map((o) => o.value)).toEqual([
        'ogcFeatures',
        'wfs',
      ])
    })

    it('filters allProtocolOptions preserving their original order', () => {
      component.protocolOptions = ['wms', 'wmts', 'esriRest']
      expect(component.availableProtocolOptions.map((o) => o.value)).toEqual([
        'wms',
        'wmts',
        'esriRest',
      ])
    })
  })
})
