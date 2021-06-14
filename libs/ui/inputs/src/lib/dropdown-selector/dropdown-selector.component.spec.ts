import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'

import { DropdownSelectorComponent } from './dropdown-selector.component'

describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectorComponent
  let fixture: ComponentFixture<DropdownSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DropdownSelectorComponent, ButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectorComponent)
    component = fixture.componentInstance
    component.title = 'Title'
    component.choices = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
    ]
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('items array', () => {
    let choicesEl
    let selectEl
    beforeEach(() => {
      component.selected = 'b'
      fixture.detectChanges()
      choicesEl = fixture.nativeElement.querySelectorAll('option')
      selectEl = fixture.nativeElement.querySelector('select')
    })
    it('shows one element per item in the dropdown', () => {
      expect(choicesEl.length).toBe(component.choices.length)
    })
    it('displays the active element as such', () => {
      expect(selectEl.value).toBe('b')
      expect(choicesEl[0].selected).toBeFalsy()
      expect(choicesEl[1].selected).toBeTruthy()
      expect(choicesEl[2].selected).toBeFalsy()
    })
    it('emits the value of the clicked item', () => {
      let emitted
      component.selectValue.subscribe((v) => (emitted = v))
      selectEl.value = component.choices[0].value
      selectEl.dispatchEvent(new Event('change'))
      expect(emitted).toBe(component.choices[0].value)
    })
  })
})
