import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OverlayContainer } from '@angular/cdk/overlay'
import { of } from 'rxjs'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'
import { SpatialExtentGeocodingSearchComponent } from './spatial-extent-geocoding-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getOptionalSearchConfig: jest.fn(),
}))

const RESULT_WITH_ALL: GeocodingResult = {
  label: 'Beaufort',
  geom: { type: 'Point', coordinates: [6.771, 45.72] },
  properties: { category: ['poi', 'commune'], citycode: ['73270'] },
}

const RESULT_WITHOUT_GEOM: GeocodingResult = {
  label: 'Eurométropole de Strasbourg',
  geom: null,
  properties: { category: ['poi', 'epci'] },
}

@Component({
  imports: [SpatialExtentGeocodingSearchComponent],
  standalone: true,
  template: `
    <gn-ui-spatial-extent-geocoding-search
      (bboxSelected)="bboxSelected($event)"
    ></gn-ui-spatial-extent-geocoding-search>
  `,
})
class HostComponent {
  bboxSelected = jest.fn()
}

describe('SpatialExtentGeocodingSearchComponent', () => {
  let component: SpatialExtentGeocodingSearchComponent
  let fixture: ComponentFixture<SpatialExtentGeocodingSearchComponent>

  beforeEach(async () => {
    ;(getOptionalSearchConfig as jest.Mock).mockReturnValue({
      SPATIAL_EXTENT_SERVICE: {
        SECONDARY_LABEL_JSONPATH: '$.properties.category[1]',
        TERTIARY_LABEL_JSONPATH: '$.properties.citycode[0]',
      },
    })

    await TestBed.configureTestingModule({
      imports: [SpatialExtentGeocodingSearchComponent, NoopAnimationsModule],
      providers: [
        provideI18n(),
        {
          provide: GeocodingService,
          useValue: { query: jest.fn(() => of([RESULT_WITH_ALL])) },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SpatialExtentGeocodingSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('does not emit when the selected result has no geometry', () => {
    const emitted = jest.fn()
    component.bboxSelected.subscribe(emitted)

    component.handleResultSelected(RESULT_WITHOUT_GEOM)

    expect(emitted).not.toHaveBeenCalled()
  })

  it('emits the bounding box computed from the selected geometry', () => {
    const emitted = jest.fn()
    component.bboxSelected.subscribe(emitted)

    component.handleResultSelected(RESULT_WITH_ALL)

    expect(emitted).toHaveBeenCalledWith([6.771, 45.72, 6.771, 45.72])
  })

  it('resolves the secondary and main labels using the configured JSONPaths', () => {
    expect(component.getSecondaryLabel(RESULT_WITH_ALL)).toEqual('commune')
    expect(component.getMainLabel(RESULT_WITH_ALL)).toEqual('Beaufort, 73270')
  })

  it('resolves an undefined secondary label and the plain main label when no paths are configured', () => {
    ;(getOptionalSearchConfig as jest.Mock).mockReturnValue(null)
    fixture = TestBed.createComponent(SpatialExtentGeocodingSearchComponent)
    component = fixture.componentInstance

    expect(component.getSecondaryLabel(RESULT_WITH_ALL)).toBeUndefined()
    expect(component.getMainLabel(RESULT_WITH_ALL)).toEqual('Beaufort')
  })

  it('renders the item template with secondary, main and tertiary labels', () => {
    jest.useFakeTimers()
    const hostFixture = TestBed.createComponent(HostComponent)
    hostFixture.detectChanges()
    const autocomplete = hostFixture.debugElement.query(
      By.directive(AutocompleteComponent)
    ).componentInstance as AutocompleteComponent
    autocomplete.inputRef.nativeElement.value = 'bea'
    autocomplete.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
    jest.runOnlyPendingTimers()
    hostFixture.detectChanges()

    const overlayContainer =
      TestBed.inject(OverlayContainer).getContainerElement()
    expect(overlayContainer.textContent).toContain('commune')
    expect(overlayContainer.textContent).toContain('Beaufort, 73270')
  })

  it('selecting a result emits the bbox on the host', () => {
    jest.useFakeTimers()
    const hostFixture = TestBed.createComponent(HostComponent)
    hostFixture.detectChanges()
    const autocomplete = hostFixture.debugElement.query(
      By.directive(AutocompleteComponent)
    ).componentInstance as AutocompleteComponent
    autocomplete.inputRef.nativeElement.value = 'bea'
    autocomplete.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
    jest.runOnlyPendingTimers()
    hostFixture.detectChanges()

    autocomplete.handleSelection({
      option: { value: RESULT_WITH_ALL },
    } as never)

    expect(hostFixture.componentInstance.bboxSelected).toHaveBeenCalledWith([
      6.771, 45.72, 6.771, 45.72,
    ])
  })
})
