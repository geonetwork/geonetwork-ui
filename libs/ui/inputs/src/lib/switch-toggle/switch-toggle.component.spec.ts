import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SwitchToggleComponent } from './switch-toggle.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

describe('SwitchToggleComponent', () => {
  let component: SwitchToggleComponent
  let fixture: ComponentFixture<SwitchToggleComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchToggleComponent],
      imports: [MatButtonToggleModule],
    })
    fixture = TestBed.createComponent(SwitchToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
