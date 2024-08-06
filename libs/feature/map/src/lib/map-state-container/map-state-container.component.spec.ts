import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapStateContainerComponent } from './map-state-container.component'
import { MapFacade } from '../+state/map.facade'
import { of } from 'rxjs'
import { MAP_CTX_LAYER_XYZ_FIXTURE } from '../map-context/map-context.fixtures'
import { readFirst } from '@nx/angular/testing'
import { DEFAULT_BASELAYER_CONTEXT } from '../map-context/map-context.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class MapFacadeMock {
  layers$ = of([MAP_CTX_LAYER_XYZ_FIXTURE])
}

describe('MapContainerComponent', () => {
  let component: MapStateContainerComponent
  let fixture: ComponentFixture<MapStateContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapStateContainerComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(MapStateContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('context$', () => {
    it('emits a context containing the layers in the map', async () => {
      const context = await readFirst(component.context$)
      expect(context).toStrictEqual({
        layers: [DEFAULT_BASELAYER_CONTEXT, MAP_CTX_LAYER_XYZ_FIXTURE],
        view: {
          center: expect.any(Array),
          zoom: expect.any(Number),
        },
      })
    })
  })
})
