import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { FormFieldRecordFlagComponent } from './form-field-record-flag-component'
import { provideTranslateTestingService } from '@geonetwork-ui/util/i18n/test-translate-loader'
import { MatTooltip } from '@angular/material/tooltip'

class EditorFacadeMock {
  record$ = new BehaviorSubject<any>({ uniqueIdentifier: 'record-123' })
}

class RecordsRepositoryMock {
  getRecordFlag = jest.fn(() => of(true))
  setRecordFlag = jest.fn(() => of(undefined))
}

describe('FormFieldRecordFlagComponent', () => {
  let component: FormFieldRecordFlagComponent
  let fixture: ComponentFixture<FormFieldRecordFlagComponent>
  let repository: RecordsRepositoryMock
  let notificationsService: NotificationsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldRecordFlagComponent],
      providers: [
        provideTranslateTestingService({
          en: { 'some.label': 'Some Label', 'some.hint': 'Some Hint' },
        }),
        { provide: EditorFacade, useClass: EditorFacadeMock },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    }).compileComponents()

    repository = TestBed.inject(
      RecordsRepositoryInterface
    ) as unknown as RecordsRepositoryMock
    notificationsService = TestBed.inject(NotificationsService)

    fixture = TestBed.createComponent(FormFieldRecordFlagComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('flagName', 'IS_REFERENCE_DATASET')
    fixture.componentRef.setInput('labelKey', 'some.label')
    fixture.componentRef.setInput('hintKey', 'some.hint')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('toggle', () => {
    let toggle: CheckToggleComponent

    beforeEach(() => {
      toggle = fixture.debugElement.query(
        By.directive(CheckToggleComponent)
      ).componentInstance
    })

    it('should have the correct label', () => {
      expect(toggle.label).toBe('Some Label')
    })

    it('should load the initial flag value from the repository', () => {
      expect(repository.getRecordFlag).toHaveBeenCalledWith(
        'record-123',
        'IS_REFERENCE_DATASET'
      )
      expect(toggle.value).toBe(true)
    })

    it('should update the flag when toggled', () => {
      toggle.toggled.emit(false)
      expect(repository.setRecordFlag).toHaveBeenCalledWith(
        'record-123',
        'IS_REFERENCE_DATASET',
        false
      )
    })

    describe('an error happens', () => {
      beforeEach(() => {
        repository.setRecordFlag.mockReturnValue(
          throwError(() => new Error('boom'))
        )
        jest.spyOn(notificationsService, 'showNotification')
        toggle.toggled.emit(false)
        fixture.detectChanges()
      })
      it('should show an error notification', () => {
        expect(notificationsService.showNotification).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'error' }),
          undefined,
          expect.any(Error)
        )
      })
    })
  })

  describe('hint', () => {
    it('should show the hint icon', () => {
      expect(fixture.debugElement.query(By.css('ng-icon'))).toBeTruthy()
      const tooltip = fixture.debugElement
        .query(By.directive(MatTooltip))
        .injector.get(MatTooltip)
      expect(tooltip.message).toBe('Some Hint')
    })
  })
})
