import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapContainerComponent } from './map-container.component'
import { MapFacade } from '../+state/map.facade'
import { BehaviorSubject } from 'rxjs'
import {
  MAP_CTX_LAYER_WMS_FIXTURE,
  MAP_CTX_LAYER_XYZ_FIXTURE,
} from '../map-context/map-context.fixtures'
import { readFirst } from '@nrwl/angular/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class MapFacadeMock {
  layers$ = new BehaviorSubject([MAP_CTX_LAYER_XYZ_FIXTURE])
}

describe('MapContainerComponent', () => {
  let component: MapContainerComponent
  let fixture: ComponentFixture<MapContainerComponent>
  let facade: MapFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapContainerComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    facade = TestBed.inject(MapFacade) as any
    fixture = TestBed.createComponent(MapContainerComponent)
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
        layers: [MAP_CTX_LAYER_XYZ_FIXTURE],
        view: {
          center: expect.any(Array),
          zoom: expect.any(Number),
        },
      })
    })
    it('does not emit a new view for each context', async () => {
      const view1 = (await readFirst(component.context$)).view
      facade.layers$.next([MAP_CTX_LAYER_WMS_FIXTURE])
      const view2 = (await readFirst(component.context$)).view
      expect(view1).toBe(view2)
    })
  })
})
