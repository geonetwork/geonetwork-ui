import { EditableLabelDirective } from './editable-label.directive'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

@Component({
  template: `<span
    [gnUiEditableLabel]="label"
    (editableLabelChanged)="handleEditableLabelChanged($event)"
  ></span>`,
})
class TestWithEditableLabelComponent {
  label = 'This is the text content.'
  handleEditableLabelChanged = jest.fn()
}

describe('EditableLabelDirective', () => {
  let component: TestWithEditableLabelComponent
  let fixture: ComponentFixture<TestWithEditableLabelComponent>
  let spanElement: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWithEditableLabelComponent],
      imports: [EditableLabelDirective],
    }).compileComponents()

    fixture = TestBed.createComponent(TestWithEditableLabelComponent)
    component = fixture.componentInstance
    spanElement = fixture.nativeElement.querySelector('span')
    fixture.detectChanges()
  })

  it('should add an input element to the DOM with the label as value when the directive is added to an element', () => {
    const inputElement = spanElement.querySelector('input')
    expect(inputElement).not.toBeNull()
    expect(inputElement.value).toEqual('This is the text content.')
  })

  it('should call handleEditableLabelChanged when editableLabelChanged is emitted', () => {
    const inputElement = spanElement.querySelector('input')
    inputElement.value = 'New Value'
    inputElement.dispatchEvent(new Event('input'))
    expect(component.handleEditableLabelChanged).toHaveBeenCalledWith(
      'New Value'
    )
  })

  it('should update the input value when the label changes', () => {
    component.label = 'New Value'
    fixture.detectChanges()
    const inputElement = spanElement.querySelector('input')
    expect(inputElement.value).toEqual('New Value')
  })
})
