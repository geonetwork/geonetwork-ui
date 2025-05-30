import { TestBed } from '@angular/core/testing'
import { DuplicateRecordResolver } from './duplicate-record.resolver'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { of, throwError } from 'rxjs'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class NotificationsServiceMock {
  showNotification = jest.fn()
}
class RecordsRepositoryMock {
  openRecordForDuplication = jest.fn(() =>
    of([datasetRecordsFixture()[0], '<xml>blabla</xml>', false])
  )
}

const activatedRoute = {
  paramMap: convertToParamMap({
    id: datasetRecordsFixture()[0].uniqueIdentifier,
  }),
} as ActivatedRouteSnapshot

describe('DuplicateRecordResolver', () => {
  let resolver: DuplicateRecordResolver
  let recordsRepository: RecordsRepositoryInterface
  let notificationsService: NotificationsService
  let resolvedData: [CatalogRecord, string, boolean]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        { provide: NotificationsService, useClass: NotificationsServiceMock },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    })
    resolver = TestBed.inject(DuplicateRecordResolver)
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    notificationsService = TestBed.inject(NotificationsService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('load record success', () => {
    beforeEach(() => {
      resolvedData = undefined
      resolver.resolve(activatedRoute).subscribe((r) => (resolvedData = r))
    })
    it('should load record by uuid', () => {
      expect(resolvedData).toEqual([
        datasetRecordsFixture()[0],
        '<xml>blabla</xml>',
        false,
      ])
    })
  })

  describe('load record failure', () => {
    beforeEach(() => {
      recordsRepository.openRecordForDuplication = () =>
        throwError(() => new Error('oopsie'))
      resolvedData = undefined
      resolver.resolve(activatedRoute).subscribe((r) => (resolvedData = r))
    })
    it('should not emit anything', () => {
      expect(resolvedData).toBeUndefined()
    })
    it('should show error notification', () => {
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'error',
          title: 'editor.record.loadError.title',
          text: 'editor.record.loadError.body oopsie',
          closeMessage: 'editor.record.loadError.closeMessage',
        },
        undefined,
        expect.any(Error)
      )
    })
  })
})
