import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { FormFieldRecordFlagsComponent } from './form-field-record-flags-component'
import { provideTranslateTestingService } from '@geonetwork-ui/util/i18n/test-translate-loader'
import { MatTooltip } from '@angular/material/tooltip'

class EditorFacadeMock {
  record$ = new BehaviorSubject<any>({ uniqueIdentifier: 'record-123' })
}

class RecordsRepositoryMock {
  getRecordFlag = jest.fn(() => of(true))
  setRecordFlag = jest.fn(() => of(undefined))
}

describe('FormFieldRecordFlagsComponent', () => {
  let component: FormFieldRecordFlagsComponent
  let fixture: ComponentFixture<FormFieldRecordFlagsComponent>
  let repository: RecordsRepositoryMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldRecordFlagsComponent],
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

    fixture = TestBed.createComponent(FormFieldRecordFlagsComponent)
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
