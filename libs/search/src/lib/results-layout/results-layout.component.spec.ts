import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '@lib/search'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ResultsLayoutComponent } from './results-layout.component'

@Component({
  selector: 'ui-dropdown-selector',
  template: '',
})
class DropdownSelectorMockComponent {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: {
    value: any
    label: string
  }[]
  @Input() selected: any
  @Output() selectValue = new EventEmitter<any>()
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsLayoutComponent, DropdownSelectorMockComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
    }).compileComponents()
  }))

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
