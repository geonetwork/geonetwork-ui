import { TestBed } from '@angular/core/testing'
import { MapUtilsService } from '../utils/map-utils.service'

import { MapManagerService } from './map-manager.service'

const mapUtilsServiceMock = {
  createEmptyMap: jest.fn(),
}
describe('MapManagerService', () => {
  let service: MapManagerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MapUtilsService,
          useValue: mapUtilsServiceMock,
        },
      ],
    })
    service = TestBed.inject(MapManagerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('instanciate an empty map', () => {
    expect(mapUtilsServiceMock.createEmptyMap).toHaveBeenCalled()
  })
})
