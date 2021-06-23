import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapComponent } from './map.component'
import Map from 'ol/Map'

describe('MapComponent', () => {
  let component: MapComponent
  let fixture: ComponentFixture<MapComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent)
    component = fixture.componentInstance
    component.map = new Map()
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })
})
