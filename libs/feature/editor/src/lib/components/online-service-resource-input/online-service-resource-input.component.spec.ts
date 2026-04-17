import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OnlineServiceResourceInputComponent } from './online-service-resource-input.component'
import { getLayers } from '@geonetwork-ui/util/shared'
import { provideI18n } from '@geonetwork-ui/util/i18n'

jest.mock('@geonetwork-ui/util/shared', () => ({
  ...jest.requireActual('@geonetwork-ui/util/shared'),
  getLayers: jest.fn(),
}))

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

  describe('handleUploadClick', () => {
    beforeEach(() => {
      component.service = {
        type: 'service',
        url: new URL('https://example.com/wms'),
        accessServiceProtocol: 'wms',
      }
      fixture.detectChanges()
    })

    it('shows the spinner while layers are being fetched', async () => {
      let resolve: (layers: { name: string; title: string }[]) => void
      ;(getLayers as jest.Mock).mockReturnValue(
        new Promise((r) => (resolve = r))
      )

      const promise = component.handleUploadClick('https://example.com/wms')
      fixture.detectChanges()

      expect(component.loading).toBe(true)
      expect(
        fixture.debugElement.query(By.css('gn-ui-spinning-loader'))
      ).toBeTruthy()

      resolve([{ name: 'layer1', title: 'Layer 1' }])
      await promise
      fixture.detectChanges()

      expect(component.loading).toBe(false)
      expect(
        fixture.debugElement.query(By.css('gn-ui-spinning-loader'))
      ).toBeNull()
    })

    it('hides the spinner after layers are loaded', async () => {
      ;(getLayers as jest.Mock).mockResolvedValue([
        { name: 'layer1', title: 'Layer 1' },
      ])
      await component.handleUploadClick('https://example.com/wms')
      fixture.detectChanges()
      expect(component.loading).toBe(false)
    })

    it('hides the spinner when fetching fails', async () => {
      ;(getLayers as jest.Mock).mockRejectedValue(new Error('Network error'))
      await component.handleUploadClick('https://example.com/wms')
      fixture.detectChanges()
      expect(component.loading).toBe(false)
    })
  })
})
