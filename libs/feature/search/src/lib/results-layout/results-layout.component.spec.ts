import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from '@geonetwork-ui/ui/search'
import { SearchFacade } from '../state/search.facade'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ResultsLayoutComponent } from './results-layout.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

@Component({
  selector: 'gn-ui-dropdown-selector',
  template: '',
})
class DropdownSelectorMockComponent {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: {
    value: unknown
    label: string
  }[]
  @Input() selected: unknown
  @Output() selectValue = new EventEmitter<unknown>()
}

const searchFacadeMock = {
  layout$: of('CARD'),
  setResultsLayout: jest.fn(),
}

describe('ResultsLayoutComponent', () => {
  let component: ResultsLayoutComponent
  let fixture: ComponentFixture<ResultsLayoutComponent>
  let de: DebugElement
  let items: DebugElement[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsLayoutComponent, DropdownSelectorMockComponent],
      imports: [TranslateDirective, TranslatePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideI18n(),
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: RESULTS_LAYOUT_CONFIG,
          useValue: DEFAULT_RESULTS_LAYOUT_CONFIG,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsLayoutComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    items = de.queryAll(By.directive(DropdownSelectorMockComponent))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('init list from state', () => {
    const uiComponent = items[0]
    expect(uiComponent).toBeTruthy()
    expect(uiComponent.componentInstance.selected).toBe('CARD')
    expect(uiComponent.componentInstance.choices).toEqual([
      {
        label: 'CARD',
        value: 'CARD',
      },
      {
        label: 'ROW',
        value: 'ROW',
      },
      {
        label: 'FEED',
        value: 'FEED',
      },
      { label: 'LIST', value: 'LIST' },
      {
        label: 'TEXT',
        value: 'TEXT',
      },
      { label: 'TITLE', value: 'TITLE' },
    ])
  })

  it('dispatch action on change', () => {
    const uiComponent = items[0]
    uiComponent.componentInstance.selectValue.emit('TITLE')
    expect(searchFacadeMock.setResultsLayout).toHaveBeenCalledWith('TITLE')
  })
})
