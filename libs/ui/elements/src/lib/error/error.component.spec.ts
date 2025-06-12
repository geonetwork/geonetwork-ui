import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ErrorComponent, ErrorType } from './error.component'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ErrorComponent', () => {
  let component: ErrorComponent
  let fixture: ComponentFixture<ErrorComponent>
  let compiled: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent)
    component = fixture.componentInstance
    compiled = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ErrorType', () => {
    describe('ErrorType.COULD_NOT_REACH_API', () => {
      beforeEach(() => {
        component.type = ErrorType.COULD_NOT_REACH_API
        fixture.detectChanges()
      })

      it('COULD_NOT_REACH_API block is displayed.', () => {
        const errorBlock = compiled.query(
          By.css('[data-test="could-not-reach-api-error"]')
        )
        expect(errorBlock).toBeTruthy()
      })
    })

    describe('ErrorType.RECEIVED_ERROR', () => {
      beforeEach(() => {
        component.type = ErrorType.RECEIVED_ERROR
        fixture.detectChanges()
      })

      it('RECEIVED_ERROR block is displayed.', () => {
        const errorBlock = compiled.query(
          By.css('[data-test="received-error-error"]')
        )
        expect(errorBlock).toBeTruthy()
      })
    })

    describe('ErrorType.RECORD_NOT_FOUND', () => {
      beforeEach(() => {
        component.type = ErrorType.RECORD_NOT_FOUND
        fixture.detectChanges()
      })

      it('RECORD_NOT_FOUND block is displayed.', () => {
        const errorBlock = compiled.query(
          By.css('[data-test="record-not-found-error"]')
        )
        expect(errorBlock).toBeTruthy()
      })
    })

    describe('ErrorType.NO_LINK', () => {
      beforeEach(() => {
        component.type = ErrorType.DATASET_HAS_NO_LINK
        fixture.detectChanges()
      })

      it('NO_LINK block is displayed.', () => {
        const errorBlock = compiled.query(
          By.css('[data-test="dataset-has-no-link-error"]')
        )
        expect(errorBlock).toBeTruthy()
      })
    })
  })
})
