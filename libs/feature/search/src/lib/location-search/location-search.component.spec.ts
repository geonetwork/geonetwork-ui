import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OverlayContainer } from '@angular/cdk/overlay'
import { firstValueFrom, of, throwError } from 'rxjs'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import {
  GEOCODING_PROVIDER_LABELS,
  GeocodingProviderLabels,
  LocationSearchComponent,
} from './location-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

const RESULTS = [{ label: 'Beaufort', geom: null }]

const RESULT_WITH_ALL: GeocodingResult = {
  label: 'Beaufort',
  geom: { type: 'Point', coordinates: [6.771, 45.72] },
  properties: { category: ['poi', 'commune'], citycode: ['73270'] },
}

const LABELS: GeocodingProviderLabels = {
  secondary: '/properties/category/1',
  tertiary: '/properties/citycode/0',
}

const RESULT_WITHOUT_GEOM: GeocodingResult = {
  label: 'Eurométropole de Strasbourg',
  geom: null,
  properties: { category: ['poi', 'epci'] },
}

@Component({
  imports: [LocationSearchComponent],
  standalone: true,
  template: `
    <gn-ui-location-search
      (bboxSelected)="bboxSelected($event)"
    ></gn-ui-location-search>
  `,
})
class LocationSearchDefaultHostComponent {
  bboxSelected = jest.fn()
}

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>
  let geocodingService: GeocodingService

  async function setup(labels?: GeocodingProviderLabels) {
    await TestBed.configureTestingModule({
      imports: [LocationSearchComponent, NoopAnimationsModule],
      providers: [
        provideI18n(),
        {
          provide: GeocodingService,
          useValue: { query: jest.fn(() => of(RESULTS)) },
        },
        labels ? { provide: GEOCODING_PROVIDER_LABELS, useValue: labels } : [],
      ],
    }).compileComponents()

    geocodingService = TestBed.inject(GeocodingService)
    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }

  beforeEach(async () => {
    await setup()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('queries GeocodingService through the autocomplete action', async () => {
    const result = await firstValueFrom(component.searchAction('beaufort'))
    expect(geocodingService.query).toHaveBeenCalledWith('beaufort')
    expect(result).toEqual(RESULTS)
  })

  it('propagates an error from GeocodingService through the autocomplete action', async () => {
    ;(geocodingService.query as jest.Mock).mockReturnValue(
      throwError(() => new Error('boom'))
    )

    await expect(
      firstValueFrom(component.searchAction('beaufort'))
    ).rejects.toThrow('boom')
  })

  it('displays the result label', () => {
    expect(component.displayWithFn(RESULTS[0])).toEqual('Beaufort')
  })

  it('emits resultSelected when an item is selected', () => {
    const selected = jest.fn()
    component.resultSelected.subscribe(selected)
    component.handleItemSelected(RESULTS[0])
    expect(selected).toHaveBeenCalledWith(RESULTS[0])
  })

  it('does not emit bboxSelected when the selected result has no geometry', () => {
    const emitted = jest.fn()
    component.bboxSelected.subscribe(emitted)

    component.handleItemSelected(RESULT_WITHOUT_GEOM)

    expect(emitted).not.toHaveBeenCalled()
  })

  it('emits bboxSelected with the bounding box computed from the selected geometry', () => {
    const emitted = jest.fn()
    component.bboxSelected.subscribe(emitted)

    component.handleItemSelected(RESULT_WITH_ALL)

    expect(emitted).toHaveBeenCalledWith([6.771, 45.72, 6.771, 45.72])
  })

  describe('with a configured main label JSON Pointer', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule()
      await setup({ main: '/properties/name/0' })
    })

    it('resolves the main label using the JSON Pointer', () => {
      expect(
        component.getMainLabel({
          ...RESULT_WITH_ALL,
          properties: { name: ['Beaufort-sur-Doron'] },
        })
      ).toEqual('Beaufort-sur-Doron')
    })

    it('falls back to the result label when the JSON Pointer does not match', () => {
      expect(component.getMainLabel(RESULT_WITH_ALL)).toEqual('Beaufort')
    })
  })

  it('resolves undefined secondary and tertiary labels and the plain main label when no JSON Pointers are configured', () => {
    expect(component.getSecondaryLabel(RESULT_WITH_ALL)).toBeUndefined()
    expect(component.getTertiaryLabel(RESULT_WITH_ALL)).toBeUndefined()
    expect(component.getMainLabel(RESULT_WITH_ALL)).toEqual('Beaufort')
  })

  describe('with configured JSON Pointers', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule()
      await setup(LABELS)
    })

    it('resolves the secondary and tertiary labels using the configured JSON Pointers', () => {
      expect(component.getSecondaryLabel(RESULT_WITH_ALL)).toEqual('commune')
      expect(component.getMainLabel(RESULT_WITH_ALL)).toEqual('Beaufort')
      expect(component.getTertiaryLabel(RESULT_WITH_ALL)).toEqual('73270')
    })

    it('leaves out the tertiary label when its JSON Pointer does not match', () => {
      expect(component.getSecondaryLabel(RESULT_WITHOUT_GEOM)).toEqual('epci')
      expect(component.getMainLabel(RESULT_WITHOUT_GEOM)).toEqual(
        'Eurométropole de Strasbourg'
      )
    })

    it('renders the default item template with secondary/main labels and emits the bbox on selection', () => {
      ;(geocodingService.query as jest.Mock).mockReturnValue(
        of([RESULT_WITH_ALL])
      )
      jest.useFakeTimers()
      const hostFixture = TestBed.createComponent(
        LocationSearchDefaultHostComponent
      )
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

      autocomplete.handleSelection({
        option: { value: RESULT_WITH_ALL },
      } as never)

      expect(hostFixture.componentInstance.bboxSelected).toHaveBeenCalledWith([
        6.771, 45.72, 6.771, 45.72,
      ])
    })
  })
})
