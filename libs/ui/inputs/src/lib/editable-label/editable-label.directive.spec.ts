import { EditableLabelDirective } from './editable-label.directive'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

@Component({
  template: `<span [gnUiEditableLabel]="false"></span>`,
})
class TestWithEditableLabelFalseComponent {}

@Component({
  template: `<span
    gnUiEditableLabel
    (editableLabelChanged)="handleEditableLabelChanged($event)"
  >
    This is the text content.
  </span>`,
})
class TestWithEditableLabelComponent {
  handleEditableLabelChanged = jest.fn()
}

describe('EditableLabelDirective', () => {
  describe('Deactivated', () => {
    let fixture: ComponentFixture<TestWithEditableLabelFalseComponent>
    let spanElement: HTMLElement

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestWithEditableLabelFalseComponent],
        imports: [EditableLabelDirective],
      }).compileComponents()

      fixture = TestBed.createComponent(TestWithEditableLabelFalseComponent)
      spanElement = fixture.nativeElement.querySelector('span')
    })

    it('should not add an input element to the DOM when the directive is added to an element with the "false" value', () => {
      fixture.detectChanges()
      const inputElement = spanElement.querySelector('input')
      expect(inputElement).toBeNull()
    })
  })

  describe('Activated', () => {
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
    })

    it('should add an input element to the DOM with the host text content as value when the directive is added to an element', () => {
      fixture.detectChanges()
      const inputElement = spanElement.querySelector('input')
      expect(inputElement).not.toBeNull()
      expect(inputElement.value).toEqual('This is the text content.')
    })

    it('should call handleEditableLabelChanged when editableLabelChanged is emitted', () => {
      fixture.detectChanges()
      const inputElement = spanElement.querySelector('input')
      inputElement.value = 'New Value'
      inputElement.dispatchEvent(new Event('input'))
      expect(component.handleEditableLabelChanged).toHaveBeenCalledWith(
        'New Value'
      )
    })
  })
})
