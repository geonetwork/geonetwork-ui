import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAP_CTX_FIXTURE } from '../map-context.fixtures'
import { MapContextService } from '../map-context.service'
import { MapUtilsService } from '../../utils/map-utils.service'

import { MapContextComponent } from './map-context.component'

const mapMock = {
  on: jest.fn(),
}
const mapContextServiceMock = {
  createMap: jest.fn(() => mapMock),
}

const mapUtilsServiceMock = {
  createLayer: jest.fn(),
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

  it('create the map', () => {
    expect(mapContextServiceMock.createMap).toHaveBeenCalledWith(
      MAP_CTX_FIXTURE
    )
  })
})
