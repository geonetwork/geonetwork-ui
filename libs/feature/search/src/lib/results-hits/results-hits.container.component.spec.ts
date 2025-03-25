import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ResultsHitsContainerComponent } from './results-hits.container.component'
import { of } from 'rxjs'
import { CommonModule } from '@angular/common'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { TranslateModule } from '@ngx-translate/core'
import { ResultsHitsNumberComponent } from '@geonetwork-ui/ui/search'
import { InlineFilterComponent } from '@geonetwork-ui/ui/inputs'
import { KindBadgeComponent } from '@geonetwork-ui/ui/elements'
import { NgIconsModule, provideIcons } from '@ng-icons/core'
import { iconoirAppleWallet, iconoirAppleShortcuts } from '@ng-icons/iconoir'

describe('ResultsHitsContainerComponent', () => {
  let component: ResultsHitsContainerComponent
  let fixture: ComponentFixture<ResultsHitsContainerComponent>

  const searchFacadeMock = {
    resultsHits$: of(10),
    isLoading$: of(false),
    searchFilters$: of({ type: ['dataset'] }),
  }

  const fieldsServiceMock = {
    getAvailableValues: jest.fn().mockReturnValue(
      of([
        { value: 'dataset', label: 'Dataset', count: 5 },
        { value: 'service', label: 'Service', count: 3 },
      ])
    ),
    readFieldValuesFromFilters: jest
      .fn()
      .mockReturnValue(of({ resourceType: ['dataset'] })),
  }

  const searchServiceMock = {
    updateFilters: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultsHitsContainerComponent,
        ResultsHitsNumberComponent,
        InlineFilterComponent,
      ],
      providers: [
        { provide: SearchFacade, useValue: searchFacadeMock },
        { provide: SearchService, useValue: searchServiceMock },
        { provide: FieldsService, useValue: fieldsServiceMock },
        provideIcons({ iconoirAppleWallet, iconoirAppleShortcuts }),
      ],
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        KindBadgeComponent,
        NgIconsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHitsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize filterChoices$ observable correctly', () => {
    component.filterChoices$.subscribe((choices) => {
      expect(choices).toBeDefined()
      expect(choices.length).toBe(4) // (3 + with 'all')
    })
  })

  it('should display the count for the filter choice', () => {
    const filterChoices = component.filterChoices$
    filterChoices.subscribe((choices) => {
      const count = choices.find((choice) => choice.value === 'dataset')?.count
      expect(count).toBe(5)
    })
  })
})
