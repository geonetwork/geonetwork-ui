import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog } from '@angular/material/dialog'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { MockBuilder } from 'ng-mocks'
import { BehaviorSubject, of, Subject, throwError } from 'rxjs'
import { REUSE_FORM_URL } from '../notify-reuse-form/notify-reuse-form.component'
import { EditDeleteReuseButtonsComponent } from './edit-delete-reuse-buttons.component'

const SAMPLE_RECORD = {
  ...datasetRecordsFixture()[0],
  extras: {
    catalogUuid: 'catalog-0001',
  },
}

class MdViewFacadeMock {
  metadata$ = new BehaviorSubject(SAMPLE_RECORD)
}

class RecordsRepositoryMock {
  deleteRecord = jest.fn(() => of(undefined))
}

class RouterFacadeMock {
  setSearch = jest.fn()
}

class NotificationsServiceMock {
  showNotification = jest.fn()
}

class MatDialogMock {
  _subject = new Subject<boolean>()
  _closeWithValue = (v: boolean) => this._subject.next(v)
  open = jest.fn(() => ({
    afterClosed: () => this._subject,
  }))
}

describe('EditDeleteReuseButtonsComponent', () => {
  let component: EditDeleteReuseButtonsComponent
  let fixture: ComponentFixture<EditDeleteReuseButtonsComponent>
  let facade

  beforeEach(() => MockBuilder(EditDeleteReuseButtonsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: NotificationsService,
          useClass: NotificationsServiceMock,
        },
        {
          provide: REUSE_FORM_URL,
          useValue: 'https://example.com/reuse',
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteReuseButtonsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Edit and delete reuse buttons', () => {
    let recordsRepository: RecordsRepositoryMock
    let routerFacade: RouterFacadeMock
    let notificationsService: NotificationsServiceMock
    let dialog: MatDialogMock

    beforeEach(() => {
      recordsRepository = TestBed.inject(
        RecordsRepositoryInterface
      ) as unknown as RecordsRepositoryMock
      routerFacade = TestBed.inject(RouterFacade) as unknown as RouterFacadeMock
      notificationsService = TestBed.inject(
        NotificationsService
      ) as unknown as NotificationsServiceMock
      dialog = new MatDialogMock()
      ;(component as unknown as { dialog: MatDialog }).dialog =
        dialog as unknown as MatDialog
      component.reuseFormUrl = 'https://example.com/reuse'
    })

    it('on edit, opens the reuse record in the metadata editor with correct redirect_on_leave param', () => {
      component.reuseFormUrl = 'http://my-metadata-editor/'

      jest
        .spyOn(component['locationStrategy'], 'getBaseHref')
        .mockReturnValue('/')
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

      const expectedRedirect = encodeURIComponent(
        'http://localhost/reuse/my-dataset-001'
      )
      const expectedUrl = `http://my-metadata-editor/light-edit/my-dataset-001?redirect_on_leave=${expectedRedirect}`

      facade.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' })
      component.editReuse()

      expect(openSpy).toHaveBeenCalledWith(expectedUrl, '_self')
    })

    it('on delete, opens a confirmation dialog and does not delete until confirmed', () => {
      facade.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' })
      component.deleteReuse()
      expect(dialog.open).toHaveBeenCalled()
      expect(recordsRepository.deleteRecord).not.toHaveBeenCalled()
    })

    describe('when the deletion is cancelled', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' })
        component.deleteReuse()
        dialog._closeWithValue(false)
      })
      it('does not delete the record', () => {
        expect(recordsRepository.deleteRecord).not.toHaveBeenCalled()
        expect(routerFacade.setSearch).not.toHaveBeenCalled()
      })
    })

    describe('on success', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' })
        component.deleteReuse()
        dialog._closeWithValue(true)
      })
      it('deletes the record and navigates to search', () => {
        expect(recordsRepository.deleteRecord).toHaveBeenCalledWith(
          SAMPLE_RECORD.uniqueIdentifier
        )
        expect(routerFacade.setSearch).toHaveBeenCalled()
        expect(notificationsService.showNotification).not.toHaveBeenCalled()
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        recordsRepository.deleteRecord.mockReturnValue(
          throwError(() => 'delete failed')
        )
        facade.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' })
        component.deleteReuse()
        dialog._closeWithValue(true)
      })
      it('shows an error notification and stays on the page', () => {
        expect(routerFacade.setSearch).not.toHaveBeenCalled()
        expect(notificationsService.showNotification).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'error',
            text: expect.stringContaining('delete failed'),
          }),
          undefined,
          'delete failed'
        )
      })
    })
  })
})
