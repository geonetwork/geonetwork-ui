import { SelectionsApiService } from '@geonetwork-ui/data-access/gn4'
import { SelectionService } from './selection.service'
import { firstValueFrom, of } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

function record(uuid: string): CatalogRecord {
  return {
    uniqueIdentifier: uuid,
  } as CatalogRecord
}

class SelectionsServiceMock {
  private selected = ['001', '002', '003']
  add = jest.fn((bucket, ids) => {
    this.selected.push(...ids)
    return of(undefined)
  })
  clear = jest.fn((bucket, ids) => {
    this.selected = this.selected.filter(
      (id) => !!ids && ids.indexOf(id) === -1
    )
    return of(undefined)
  })
  get = jest.fn(() => of(this.selected))
}

describe('SelectionService', () => {
  let service: SelectionService
  let selectionsService: SelectionsApiService

  beforeEach(async () => {
    selectionsService = new SelectionsServiceMock() as any
    service = new SelectionService(selectionsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#selectRecords', () => {
    let selectedRecords
    beforeEach(async () => {
      service.selectedRecordsIdentifiers$.subscribe((value) => {
        selectedRecords = value
      })
      await firstValueFrom(
        service.selectRecords([record('abcd'), record('efgh'), record('001')])
      )
    })
    it('calls the corresponding API', () => {
      expect(selectionsService.add).toHaveBeenCalledWith('gnui', [
        'abcd',
        'efgh',
        '001',
      ])
    })
    it('emits new records in selectedRecordsIdentifiers$', () => {
      expect(selectedRecords).toEqual(['001', '002', '003', 'abcd', 'efgh'])
    })
  })

  // describe('#deselectRecord', () => {})

  // describe('#clearSelection', () => {})

  // describe('selectedRecordsIdentifiers$', () => {})
})
