import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GnMapViewerComponent } from './gn-map-viewer.component'

describe('GnMapViewerComponent', () => {
  let component: GnMapViewerComponent
  let fixture: ComponentFixture<GnMapViewerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GnMapViewerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GnMapViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
