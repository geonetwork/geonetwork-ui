import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ImportRecordComponent } from './import-record.component'
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { of, throwError } from 'rxjs'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { NgIconComponent } from '@ng-icons/core'

describe('ImportRecordComponent', () => {
  let component: ImportRecordComponent
  let fixture: ComponentFixture<ImportRecordComponent>
  let notificationsService: NotificationsService
  let translateService: TranslateService
  let router: Router
  let recordsRepository: RecordsRepositoryInterface

  beforeEach(() => {
    return MockBuilder(ImportRecordComponent).keep(NgIconComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProviders(
          Router,
          NotificationsService,
          RecordsRepositoryInterface,
          ChangeDetectorRef
        ),
      ],
    })
      .overrideComponent(ImportRecordComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ImportRecordComponent)

    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    notificationsService = TestBed.inject(NotificationsService)
    translateService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)

    component = fixture.componentInstance

    translateService.instant = jest.fn(
      (translationKey: string) => translationKey
    )
    router.navigate = jest.fn().mockReturnValue(Promise.resolve(true))

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should successfully import record and navigate on success', () => {
    const mockUrl = 'https://example.com/file'
    const mockRecordTempId = '12345'
    recordsRepository.duplicateExternalRecord = jest
      .fn()
      .mockReturnValue(of(mockRecordTempId))

    const closeMenuSpy = jest.spyOn(component.closeImportMenu, 'next')

    component.importRecord(mockUrl)

    expect(recordsRepository.duplicateExternalRecord).toHaveBeenCalledWith(
      mockUrl
    )

    expect(notificationsService.showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        title: 'editor.record.importFromExternalFile.success.title',
        text: `editor.record.importFromExternalFile.success.body`,
      }),
      2500
    )

    expect(router.navigate).toHaveBeenCalledWith(['/edit', mockRecordTempId])
    expect(closeMenuSpy).toHaveBeenCalled()
  })

  it('should handle error when importRecord fails', () => {
    const mockUrl = 'https://example.com/file'
    const mockError = 'Import failed'
    recordsRepository.duplicateExternalRecord = jest
      .fn()
      .mockReturnValue(throwError(() => mockError))

    component.importRecord(mockUrl)

    expect(recordsRepository.duplicateExternalRecord).toHaveBeenCalledWith(
      mockUrl
    )

    expect(notificationsService.showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        title: 'editor.record.importFromExternalFile.failure.title',
        text: `editor.record.importFromExternalFile.failure.body `,
      }),
      2500,
      mockError
    )

    expect(component.isRecordImportInProgress).toBe(false)
  })

  it('should emit closeImportMenu when closing the menu', () => {
    const closeMenuSpy = jest.spyOn(component.closeImportMenu, 'next')
    component.closeImportMenu.next()
    expect(closeMenuSpy).toHaveBeenCalled()
  })
})
