import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CheckToggleComponent } from './check-toggle.component'

describe('CheckToggleComponent', () => {
  let component: CheckToggleComponent
  let fixture: ComponentFixture<CheckToggleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckToggleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CheckToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
