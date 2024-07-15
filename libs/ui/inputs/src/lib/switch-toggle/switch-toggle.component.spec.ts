import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SwitchToggleComponent } from './switch-toggle.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { CommonModule } from '@angular/common'

describe('SwitchToggleComponent', () => {
  let component: SwitchToggleComponent
  let fixture: ComponentFixture<SwitchToggleComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MatButtonToggleModule, SwitchToggleComponent, CommonModule],
    })
    fixture = TestBed.createComponent(SwitchToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
