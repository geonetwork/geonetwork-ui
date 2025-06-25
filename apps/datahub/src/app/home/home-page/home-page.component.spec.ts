import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomePageComponent } from './home-page.component'
import { MockBuilder } from 'ng-mocks'

describe('HomePageComponent', () => {
  let component: HomePageComponent
  let fixture: ComponentFixture<HomePageComponent>

  beforeEach(() => MockBuilder(HomePageComponent))

  beforeEach(async () => {
    await TestBed.compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
