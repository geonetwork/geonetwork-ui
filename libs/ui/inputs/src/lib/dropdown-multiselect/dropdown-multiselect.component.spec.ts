import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DropdownMultiselectComponent } from './dropdown-multiselect.component'

describe('DropdownMultiselectComponent', () => {
  let component: DropdownMultiselectComponent
  let fixture: ComponentFixture<DropdownMultiselectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMultiselectComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DropdownMultiselectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
