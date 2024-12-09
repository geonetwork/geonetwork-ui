import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationButtonComponent } from './navigation-button.component'

describe('NavigationButtonComponent', () => {
  let component: NavigationButtonComponent
  let fixture: ComponentFixture<NavigationButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationButtonComponent)
    component = fixture.componentInstance
    component.icon = 'navigate_before'
    component.label = 'Retours aux résultats'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
