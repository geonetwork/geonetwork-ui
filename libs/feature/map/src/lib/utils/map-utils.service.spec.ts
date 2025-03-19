import { MapUtilsService } from './map-utils.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('MapUtilsService', () => {
  let service: MapUtilsService

  beforeEach(() => {
    service = new MapUtilsService()
  })

  describe('#getRecordExtent', () => {
    it('should return null if spatialExtents is not present or is an empty array', () => {
      const record1: Partial<CatalogRecord> = {}
      const record2: Partial<CatalogRecord> = { spatialExtents: [] }

      expect(service.getRecordExtent(record1)).toBeNull()
      expect(service.getRecordExtent(record2)).toBeNull()
    })

    it('should return the extent of included extents', () => {
      const record: Partial<CatalogRecord> = {
        spatialExtents: [
          {
            bbox: [1, 5, 3, 7],
          },
          {
            bbox: [2, 3, 5, 6],
          },
          {
            bbox: [6, 3, 8, 5],
          },
          {
            geometry: {
              coordinates: [
                [
                  [4, 4],
                  [7, 4],
                  [7, 8],
                  [4, 8],
                  [4, 4],
                ],
              ],
              type: 'Polygon',
            },
          },
        ],
      }
      expect(service.getRecordExtent(record)).toEqual([...[1, 3], ...[8, 8]])
    })
  })
})
