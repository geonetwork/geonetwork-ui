import { ResultsHitsSearchKindComponent } from './results-hits-search-kind.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'gn-ui-inline-filter',
  template: '',
})
class MockInlineFilterComponent {
  @Input() choices: any[] = []
  @Input() selected: string[] = []
  @Output() selectValues = new EventEmitter<string[]>()
}

describe('ResultsHitsSearchKindComponent', () => {
  let component: ResultsHitsSearchKindComponent
  let fixture: ComponentFixture<ResultsHitsSearchKindComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsHitsSearchKindComponent, MockInlineFilterComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHitsSearchKindComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should build choices with "all" prepended', () => {
    const testChoices = [
      { label: 'dataset', value: 'dataset', count: 10 },
      { label: 'service', value: 'service', count: 5 },
    ]
    const result = component.buildFilterChoices(testChoices)

    expect(result.length).toBe(3)
    expect(result[0].value).toBe('all')
    expect(result[1].value).toBe('dataset')
  })

  it('should emit an empty array when "all" is selected', () => {
    const spy = jest.spyOn(component.selectionChanged, 'emit')
    component.onSelectedValues(['all'])

    expect(spy).toHaveBeenCalledWith([])
  })

  it('should emit the selected values when "all" is not selected', () => {
    const spy = jest.spyOn(component.selectionChanged, 'emit')
    component.onSelectedValues(['dataset', 'service'])

    expect(spy).toHaveBeenCalledWith(['dataset', 'service'])
  })
})
