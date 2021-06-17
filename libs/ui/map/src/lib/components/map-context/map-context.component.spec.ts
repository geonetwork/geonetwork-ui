import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapContextService } from '../../services/map-context.service'
import { MAP_CTX_FIXTURE } from '../../fixtures/map-context.fixtures'

import { MapContextComponent } from './map-context.component'

const mapMock = {
  on: jest.fn(),
}
const mapContextServiceMock = {
  createMap: jest.fn(() => mapMock),
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
