import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AutocompleteItem } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { LocationSearchComponent } from './location-search.component'
import { LocationSearchService } from './location-search.service'

@Component({
  selector: 'gn-ui-autocomplete',
  template: ` <div></div>`,
})
class MockAutoCompleteComponent {
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutocompleteItem[]>
  @Input() value?: AutocompleteItem
  @Input() clearOnSelection = false
  @Input() icon = 'search'
  @Input() displayWithFn
  @Output() itemSelected = new EventEmitter<AutocompleteItem>()
  @Output() inputSubmitted = new EventEmitter<string>()
}

const RESULT_FIXTURE = [
  {
    attrs: {
      detail: 'zurigo zh',
      featureId: '261',
      geom_quadindex: '030003',
      geom_st_box2d:
        'BOX(2676224.6939999983 1241584.1049999967,2689665.813000001 1254306.2330000028)',
      label: '<b>Zurigo (ZH)</b>',
      lat: 47.37721252441406,
      lon: 8.527311325073242,
      num: 1,
      objectclass: '',
      origin: 'gg25',
      rank: 2,
      x: 1247945.25,
      y: 2682217,
      zoomlevel: 4294967295,
    },
    id: 153,
    weight: 7,
  },
  {
    attrs: {
      detail: 'zurich zh',
      featureId: '261',
      geom_quadindex: '030003',
      geom_st_box2d:
        'BOX(2676224.6939999983 1241584.1049999967,2689665.813000001 1254306.2330000028)',
      label: '<b>Zurich (ZH)</b>',
      lat: 47.37721252441406,
      lon: 8.527311325073242,
      num: 1,
      objectclass: '',
      origin: 'gg25',
      rank: 2,
      x: 1247945.25,
      y: 2682217,
      zoomlevel: 4294967295,
    },
    id: 154,
    weight: 7,
  },
]

class LocationSearchServiceMock {
  getLocationSearch = jest.fn()
}

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>
  let service: LocationSearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSearchComponent, MockAutoCompleteComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: LocationSearchService, useClass: LocationSearchServiceMock },
      ],
    }).compileComponents()

    service = TestBed.inject(LocationSearchService)

    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#displayWithFn', () => {
    it('returns the label without html', () => {
      const result = component.displayWithFn(RESULT_FIXTURE[0])

      expect(result).toBe('Zurigo (ZH)')
    })
  })
  describe('#autoCompleteAction', () => {
    beforeEach(() => {
      component.autoCompleteAction('test query')
    })

    it('calls the location search service', () => {
      expect(service.getLocationSearch).toHaveBeenCalledWith('test query')
    })
  })
})
