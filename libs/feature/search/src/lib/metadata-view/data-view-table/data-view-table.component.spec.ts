import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataViewTableComponent } from './data-view-table.component'

describe('DataViewTableComponent', () => {
  let component: DataViewTableComponent
  let fixture: ComponentFixture<DataViewTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataViewTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
