import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataViewChartComponent } from './data-view-chart.component'

describe('DataViewChartComponent', () => {
  let component: DataViewChartComponent
  let fixture: ComponentFixture<DataViewChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataViewChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DataViewChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
