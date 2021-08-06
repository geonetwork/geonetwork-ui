import { TestBed } from '@angular/core/testing'
import { MapManagerService } from '../manager/map-manager.service'
import { MapUtilsService } from '../utils/map-utils.service'

import { FeatureInfoService } from './feature-info.service'

const utils = {
  createEmptyMap: jest.fn,
}
const manager = {}
describe('FeatureInfoService', () => {
  let service: FeatureInfoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MapUtilsService,
          useValue: utils,
        },
        {
          provide: MapManagerService,
          useValue: manager,
        },
      ],
    })
    service = TestBed.inject(FeatureInfoService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
