import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
import { FieldFocusDirective, FormFieldComponent } from './form-field'
import { MockBuilder } from 'ng-mocks'
import {
  datasetRecordsFixture,
  editorConfigFixture,
} from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, Subject } from 'rxjs'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { EditorSectionWithValues } from '../../+state/editor.models'

class EditorFacadeMock {
  record$ = new BehaviorSubject(datasetRecordsFixture()[0])
  focusedField$ = new Subject<string | null>()
  editorConfig$ = new BehaviorSubject(editorConfigFixture())
  currentSections$ = new BehaviorSubject<EditorSectionWithValues[]>([])
  currentPage$ = new BehaviorSubject(0)
  setCurrentPage = jest.fn()
  updateRecordField = jest.fn()
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>
  let facade: EditorFacadeMock

  beforeEach(() => {
    return MockBuilder(RecordFormComponent)
      .keep(FormFieldComponent)
      .keep(FieldFocusDirective)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n({}, false),
        { provide: EditorFacade, useClass: EditorFacadeMock },
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade) as unknown as EditorFacadeMock
    fixture = TestBed.createComponent(RecordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('handleFieldValueChange', () => {
    it('should call facade.updateRecordField', () => {
      component.handleFieldValueChange('title', 'new title')
      expect(facade.updateRecordField).toHaveBeenCalledWith(
        'title',
        'new title'
      )
    })
  })

  describe('getFieldLocation', () => {
    it('returns the page and section index of a field in the config', async () => {
      expect(await component.getFieldLocation('title')).toEqual({
        page: 0,
        section: 0,
      })
    })

    it('returns null for a field not present in the config', async () => {
      expect(await component.getFieldLocation('organisation' as any)).toBeNull()
    })

    it('counts only non-hidden sections, matching the rendered order', async () => {
      facade.editorConfig$.next({
        pages: [
          {
            sections: [
              { hidden: true, fields: [{ model: 'abstract' }] },
              { hidden: false, fields: [{ model: 'title' }] },
            ],
          },
        ],
      } as any)
      expect(await component.getFieldLocation('title')).toEqual({
        page: 0,
        section: 0,
      })
    })
  })

  describe('focusedField$ subscription', () => {
    beforeEach(() => {
      jest.spyOn(component, 'focusField').mockImplementation()
    })

    describe('when the focused field is on a different page', () => {
      beforeEach(async () => {
        // 'licenses' is on page 2 in editorConfigFixture
        facade.focusedField$.next('licenses')
        await fixture.whenStable()
      })

      it('should navigate to the correct page', () => {
        expect(facade.setCurrentPage).toHaveBeenCalledWith(2)
      })
    })

    describe('when the focused field is on the same page as the current page', () => {
      beforeEach(async () => {
        // 'title' is on page 0 in editorConfigFixture, and currentPage$ defaults to 0
        facade.focusedField$.next('title')
        await fixture.whenStable()
      })

      it('should not navigate to a page', () => {
        expect(facade.setCurrentPage).not.toHaveBeenCalled()
      })
    })

    describe('when the focused field is not found in the config', () => {
      beforeEach(async () => {
        facade.focusedField$.next('organisation' as any)
        await fixture.whenStable()
      })

      it('should not navigate to a page', () => {
        expect(facade.setCurrentPage).not.toHaveBeenCalled()
      })
    })
  })

  describe('focusField', () => {
    const sections: EditorSectionWithValues[] = [
      {
        hidden: false,
        fields: [],
        fieldsWithValues: [
          {
            config: {
              model: 'licenses',
              formFieldConfig: { labelKey: 'editor.record.form.field.license' },
            },
            value: [],
          },
          {
            config: {
              model: 'legalConstraints',
              hidden: true,
              formFieldConfig: {
                labelKey: 'editor.record.form.field.legalConstraints',
              },
            },
            value: [],
          },
        ],
      },
    ]

    beforeEach(() => {
      facade.currentSections$.next(sections)
      fixture.detectChanges()
    })

    it('focuses the form field when it is rendered', () => {
      const field = component.formFields().find((f) => f.model === 'licenses')
      const fieldSpy = jest
        .spyOn(field.fieldFocus, 'focusField')
        .mockImplementation()
      component.focusField('licenses', -1)
      expect(fieldSpy).toHaveBeenCalled()
    })

    it('highlights the whole section when the field is not rendered', () => {
      const sectionSpy = jest
        .spyOn(component.sectionFocusDirectives()[0], 'focusField')
        .mockImplementation()
      component.focusField('legalConstraints', 0)
      expect(sectionSpy).toHaveBeenCalled()
    })
  })

  describe('subscription', () => {
    it('should add 1 subscription on init', () => {
      const addSpy = jest.spyOn(component.subscription, 'add')
      component.ngOnInit()
      expect(addSpy).toHaveBeenCalledTimes(1)
    })

    it('should unsubscribe on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe')
      component.ngOnDestroy()
      expect(unsubscribeSpy).toHaveBeenCalled()
    })
  })
})
