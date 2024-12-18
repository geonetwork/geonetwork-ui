import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MapLegendComponent } from './map-legend.component'

describe('MapLegendComponent', () => {
  let component: MapLegendComponent
  let fixture: ComponentFixture<MapLegendComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapLegendComponent],
    })
    fixture = TestBed.createComponent(MapLegendComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
