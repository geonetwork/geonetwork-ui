import { TestBed } from '@angular/core/testing'
import { EditRecordResolver } from './edit-record.resolver'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { of, throwError } from 'rxjs'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { EditorService } from '@geonetwork-ui/feature/editor'
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'

class NotificationsServiceMock {
  showNotification = jest.fn()
}
class EditorServiceMock {
  loadRecordByUuid = jest.fn(() => of(DATASET_RECORDS[0]))
}

const activatedRoute = {
  paramMap: convertToParamMap({ id: DATASET_RECORDS[0].uniqueIdentifier }),
} as ActivatedRouteSnapshot

describe('EditRecordResolver', () => {
  let resolver: EditRecordResolver
  let editorService: EditorService
  let notificationsService: NotificationsService
  let record: CatalogRecord

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: NotificationsService, useClass: NotificationsServiceMock },
        { provide: EditorService, useClass: EditorServiceMock },
      ],
    })
    resolver = TestBed.inject(EditRecordResolver)
    editorService = TestBed.inject(EditorService)
    notificationsService = TestBed.inject(NotificationsService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('load record success', () => {
    beforeEach(() => {
      record = undefined
      resolver.resolve(activatedRoute, null).subscribe((r) => (record = r))
    })
    it('should load record by uuid', () => {
      expect(record).toBe(DATASET_RECORDS[0])
    })
  })

  describe('load record failure', () => {
    beforeEach(() => {
      editorService.loadRecordByUuid = () =>
        throwError(() => new Error('oopsie'))
      record = undefined
      resolver.resolve(activatedRoute, null).subscribe((r) => (record = r))
    })
    it('should not emit anything', () => {
      expect(record).toBeUndefined()
    })
    it('should show error notification', () => {
      expect(notificationsService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'editor.record.loadError.title',
        text: 'editor.record.loadError.body oopsie',
        closeMessage: 'editor.record.loadError.closeMessage',
      })
    })
  })
})
