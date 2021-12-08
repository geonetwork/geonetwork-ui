import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { NavigationButtonComponent } from './navigation-button.component'

describe('NavigationButtonComponent', () => {
  let component: NavigationButtonComponent
  let fixture: ComponentFixture<NavigationButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationButtonComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
