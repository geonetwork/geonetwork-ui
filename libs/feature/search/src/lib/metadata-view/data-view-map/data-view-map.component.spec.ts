import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataViewMapComponent } from './data-view-map.component'

describe('DataViewMapComponent', () => {
  let component: DataViewMapComponent
  let fixture: ComponentFixture<DataViewMapComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataViewMapComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
