import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockBuilder } from 'ng-mocks'
import { DashboardPageComponent } from './dashboard-page.component'

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent
  let fixture: ComponentFixture<DashboardPageComponent>

  beforeEach(() => {
    return MockBuilder(DashboardPageComponent)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
