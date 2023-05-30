import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LocationSearchComponent } from './location-search.component'

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSearchComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
