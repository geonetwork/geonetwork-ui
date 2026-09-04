import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OverlayContainer } from '@angular/cdk/overlay'
import { firstValueFrom, of, throwError } from 'rxjs'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { LocationSearchComponent } from './location-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

const RESULTS = [{ label: 'Beaufort', geom: null }]

@Component({
  imports: [LocationSearchComponent],
  standalone: true,
  template: `
    <ng-template #itemTpl let-result>
      <span class="custom-item">custom: {{ result.label }}</span>
    </ng-template>
    <gn-ui-location-search
      [displayWithTemplate]="itemTpl"
    ></gn-ui-location-search>
  `,
})
class LocationSearchTemplateHostComponent {}

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>
  let geocodingService: GeocodingService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSearchComponent, NoopAnimationsModule],
      providers: [
        provideI18n(),
        {
          provide: GeocodingService,
          useValue: { query: jest.fn(() => of(RESULTS)) },
        },
      ],
    }).compileComponents()

    geocodingService = TestBed.inject(GeocodingService)
    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
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

  it('forwards displayWithTemplate to the underlying autocomplete', () => {
    jest.useFakeTimers()
    const hostFixture = TestBed.createComponent(
      LocationSearchTemplateHostComponent
    )
    hostFixture.detectChanges()
    const autocomplete = hostFixture.debugElement.query(
      By.directive(AutocompleteComponent)
    ).componentInstance as AutocompleteComponent
    autocomplete.inputRef.nativeElement.value = 'bla'
    autocomplete.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
    jest.runOnlyPendingTimers()
    hostFixture.detectChanges()

    const overlayContainer =
      TestBed.inject(OverlayContainer).getContainerElement()
    expect(overlayContainer.textContent).toContain('custom: Beaufort')
  })
})
