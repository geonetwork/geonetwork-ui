import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterSpatialdataComponent } from './filter-spatialdata.component'

describe('FilterSpatialdataComponent', () => {
  let component: FilterSpatialdataComponent
  let fixture: ComponentFixture<FilterSpatialdataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSpatialdataComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FilterSpatialdataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
