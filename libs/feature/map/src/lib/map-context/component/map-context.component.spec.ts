import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapManagerService } from '../../manager/map-manager.service'
import { MAP_CTX_FIXTURE } from '../map-context.fixtures'
import { MapContextService } from '../map-context.service'
import { MapUtilsService } from '../../utils/map-utils.service'

import { MapContextComponent } from './map-context.component'

const mapMock = {
  on: jest.fn(),
}
const mapContextServiceMock = {
  resetMapFromContext: jest.fn(),
}

const mapUtilsServiceMock = {}

const mapManagerMock = {
  map: mapMock,
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
          useValue: mapContextServiceMock,
        },
        {
          provide: MapUtilsService,
          useValue: mapUtilsServiceMock,
        },
        {
          provide: MapManagerService,
          useValue: mapManagerMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContextComponent)
    component = fixture.componentInstance
    component.context = MAP_CTX_FIXTURE
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('reset the map from context', () => {
    expect(mapContextServiceMock.resetMapFromContext).toHaveBeenCalledWith(
      mapMock,
      MAP_CTX_FIXTURE
    )
  })
})
