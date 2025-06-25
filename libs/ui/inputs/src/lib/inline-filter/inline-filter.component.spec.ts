import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InlineFilterComponent } from './inline-filter.component'
import { Choice } from './inline-filter.model'

describe('InlineFilterComponent', () => {
  let component: InlineFilterComponent
  let fixture: ComponentFixture<InlineFilterComponent>

  const mockChoices: Choice[] = [
    { value: 'all', label: 'All' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(InlineFilterComponent)
    component = fixture.componentInstance
    component.choices = mockChoices
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('isSelected()', () => {
    it('should return true when value is in selected array', () => {
      component.selected = ['option1']
      expect(component.isSelected(mockChoices[1])).toBe(true)
    })

    it('should return false when value is not in selected array', () => {
      component.selected = ['option2']
      expect(component.isSelected(mockChoices[1])).toBe(false)
    })

    it('should return true for "all" when selected array is empty', () => {
      component.selected = []
      expect(component.isSelected(mockChoices[0])).toBe(true)
    })
  })

  describe('select()', () => {
    it('should emit selected values with "all" when selecting all', () => {
      const emitSpy = jest.spyOn(component.selectValues, 'emit')
      component.select(mockChoices[0], true)
      expect(emitSpy).toHaveBeenCalledWith(['all'])
    })

    it('should add value to selection when selected', () => {
      const emitSpy = jest.spyOn(component.selectValues, 'emit')
      component.select(mockChoices[1], true)
      expect(emitSpy).toHaveBeenCalledWith(['option1'])
    })

    it('should remove value from selection when unselected', () => {
      component.selected = ['option1']
      const emitSpy = jest.spyOn(component.selectValues, 'emit')
      component.select(mockChoices[1], false)
      expect(emitSpy).toHaveBeenCalledWith([])
    })

    it('should remove "all" when another option is selected', () => {
      component.selected = ['all']
      const emitSpy = jest.spyOn(component.selectValues, 'emit')
      component.select(mockChoices[1], true)
      expect(emitSpy).toHaveBeenCalledWith(['option1'])
    })

    it('should handle multiple selections', () => {
      const emitSpy = jest.spyOn(component.selectValues, 'emit')
      component.select(mockChoices[1], true)
      component.select(mockChoices[2], true)
      expect(emitSpy).toHaveBeenLastCalledWith(['option1', 'option2'])
    })
  })
})
