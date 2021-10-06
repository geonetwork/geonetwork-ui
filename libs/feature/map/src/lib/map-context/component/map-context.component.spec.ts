import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, inject, TestBed } from '@angular/core/testing'
import { MapManagerService } from '../../manager/map-manager.service'
import { MAP_CTX_FIXTURE } from '../map-context.fixtures'
import { MapContextService } from '../map-context.service'
import { MapUtilsService } from '../../utils/map-utils.service'

import { MapContextComponent } from './map-context.component'

class MapMock {
  on = jest.fn()
}
class MapContextServiceMock {
  resetMapFromContext = jest.fn()
}

class MapUtilsServiceMock {}

class MapManagerMock {
  map = new MapMock()
}

describe('MapContextComponent', () => {
  let component: MapContextComponent
  let fixture: ComponentFixture<MapContextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapContextComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MapContextService,
          useClass: MapContextServiceMock,
        },
        {
          provide: MapUtilsService,
          useClass: MapUtilsServiceMock,
        },
        {
          provide: MapManagerService,
          useClass: MapManagerMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('with initial value', () => {
    beforeEach(() => {
      component.context = MAP_CTX_FIXTURE
      fixture.detectChanges()
      component.ngOnChanges({})
    })
    it('reset the map from context', inject(
      [MapContextService],
      (mapContextService) => {
        expect(mapContextService.resetMapFromContext).toHaveBeenCalledWith(
          expect.any(MapMock),
          MAP_CTX_FIXTURE
        )
      }
    ))
  })

  describe('no initial value, two values afterwards', () => {
    beforeEach(() => {
      component.context = null
      fixture.detectChanges()
      component.ngOnChanges({})
    })
    it('does not reset the map', inject(
      [MapContextService],
      (mapContextService) => {
        expect(mapContextService.resetMapFromContext).not.toHaveBeenCalled()
      }
    ))
  })

  describe('no initial value, two values afterwards', () => {
    beforeEach(() => {
      component.context = null
      fixture.detectChanges()
      component.ngOnChanges({})
      component.context = { ...MAP_CTX_FIXTURE }
      component.ngOnChanges({})
      component.context = { ...MAP_CTX_FIXTURE }
      component.ngOnChanges({})
    })
    it('reset the map from context twice', inject(
      [MapContextService],
      (mapContextService) => {
        expect(mapContextService.resetMapFromContext).toHaveBeenCalledWith(
          expect.any(MapMock),
          MAP_CTX_FIXTURE
        )
        expect(mapContextService.resetMapFromContext).toHaveBeenCalledTimes(2)
      }
    ))
  })
})
