import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapManagerService } from '../../manager/map-manager.service'
import { MAP_CTX_FIXTURE } from '../map-context.fixtures'
import { MapContextService } from '../map-context.service'
import { MapUtilsService } from '../../utils/map-utils.service'

import { MapContextComponent } from './map-context.component'

class MapContextServiceMock {
  resetMapFromContext = jest.fn()
}

const COMPUTED_VIEW = {
  center: [3, 4],
  zoom: 10,
}
class MapUtilsServiceMock {
  getViewFromExtent = () => COMPUTED_VIEW
}
let resizeCallBack
class OpenLayersMapMock {
  _size = undefined
  once(type, callback) {
    if (type === 'change:size') {
      resizeCallBack = callback
    }
  }
  updateSize() {
    this._size = [100, 100]
  }
  getSize() {
    return this._size
  }
}
class MapManagerMock {
  map = new OpenLayersMapMock()
}

describe('MapContextComponent', () => {
  let component: MapContextComponent
  let fixture: ComponentFixture<MapContextComponent>
  let mapContextService

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
    mapContextService = TestBed.inject(MapContextService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContextComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('with initial value', () => {
    beforeEach(() => {
      component.context = MAP_CTX_FIXTURE
      component.mapConfig = MAP_CONFIG_FIXTURE
      fixture.detectChanges()
      component.ngOnChanges({})
    })
    it('reset the map from context', () => {
      expect(mapContextService.resetMapFromContext).toHaveBeenCalledWith(
        expect.any(OpenLayersMapMock),
        MAP_CTX_FIXTURE,
        MAP_CONFIG_FIXTURE
      )
    })
  })

  describe('no initial value', () => {
    beforeEach(() => {
      component.context = null
      fixture.detectChanges()
      component.ngOnChanges({})
    })
    it('does not reset the map', () => {
      expect(mapContextService.resetMapFromContext).not.toHaveBeenCalled()
    })
  })

  describe('no initial value, two values afterwards', () => {
    beforeEach(() => {
      component.context = null
      component.mapConfig = MAP_CONFIG_FIXTURE
      fixture.detectChanges()
      component.ngOnChanges({})
      component.context = { ...MAP_CTX_FIXTURE }
      component.ngOnChanges({})
      component.context = { ...MAP_CTX_FIXTURE }
      component.ngOnChanges({})
    })
    it('reset the map from context twice', () => {
      expect(mapContextService.resetMapFromContext).toHaveBeenCalledWith(
        expect.any(OpenLayersMapMock),
        MAP_CTX_FIXTURE,
        MAP_CONFIG_FIXTURE
      )
      expect(mapContextService.resetMapFromContext).toHaveBeenCalledTimes(2)
    })
  })
  describe('mapContext with extent', () => {
    const MAP_CTX_EXTENT = {
      ...MAP_CTX_FIXTURE,
      view: undefined,
      extent: [-100, -200, 300, 400],
    }

    describe('initial context is provided', () => {
      describe('before change detection and when map has no size', () => {
        beforeEach(() => {
          component.context = MAP_CTX_EXTENT
        })
        it('does not reset the map', () => {
          expect(mapContextService.resetMapFromContext).not.toHaveBeenCalled()
        })
      })
      describe('after change detection and when map has no size', () => {
        beforeEach(() => {
          component.context = MAP_CTX_EXTENT
          component.ngOnChanges({ context: MAP_CTX_EXTENT })
        })
        it('does not reset the map', () => {
          expect(mapContextService.resetMapFromContext).not.toHaveBeenCalled()
        })
      })
      describe('after change detection and when map has a size', () => {
        beforeEach(() => {
          component.context = MAP_CTX_EXTENT
          component.mapConfig = MAP_CONFIG_FIXTURE
          component.ngOnChanges({ context: MAP_CTX_EXTENT })
          resizeCallBack()
        })
        it('resets the map with a view computed from extent', () => {
          expect(mapContextService.resetMapFromContext).toHaveBeenCalledWith(
            expect.any(OpenLayersMapMock),
            {
              ...MAP_CTX_EXTENT,
              view: COMPUTED_VIEW,
            }
          )
        })
      })
    })
  })
})
