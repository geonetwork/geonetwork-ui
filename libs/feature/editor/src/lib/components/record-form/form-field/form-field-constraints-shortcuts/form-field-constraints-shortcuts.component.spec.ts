import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldConstraintsShortcutsComponent } from './form-field-constraints-shortcuts.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import {
  NOT_APPLICABLE_CONSTRAINT,
  NOT_KNOWN_CONSTRAINT,
} from './constraints.utils'

describe('FormFieldConstraintsShortcutsComponent', () => {
  let component: FormFieldConstraintsShortcutsComponent
  let fixture: ComponentFixture<FormFieldConstraintsShortcutsComponent>
  let editorFacade: EditorFacade
  let sampleRecord: CatalogRecord
  let sampleRecord$: BehaviorSubject<CatalogRecord>

  beforeEach(() => MockBuilder(FormFieldConstraintsShortcutsComponent))

  beforeEach(() => {
    sampleRecord = datasetRecordsFixture()[0]
    sampleRecord$ = new BehaviorSubject(sampleRecord)

    TestBed.configureTestingModule({
      providers: [
        MockProvider(EditorFacade, {
          record$: sampleRecord$,
        }),
        importProvidersFrom(TranslateModule.forRoot()),
      ],
    })
    editorFacade = TestBed.inject(EditorFacade)
    fixture = TestBed.createComponent(FormFieldConstraintsShortcutsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('noApplicableConstraints$', () => {
    it('should emit true if "no conditions apply" is present', async () => {
      sampleRecord$.next({
        ...sampleRecord,
        legalConstraints: [{ text: 'no conditions apply' }],
      })
      const result = await firstValueFrom(component.noApplicableConstraint$)
      expect(result).toBe(true)
    })

    it('should emit false if "no conditions apply" is not present', async () => {
      sampleRecord$.next({
        ...sampleRecord,
        legalConstraints: [{ text: 'Any other constraint' }],
      })
      const result = await firstValueFrom(component.noApplicableConstraint$)
      expect(result).toBe(false)
    })
  })

  describe('noKnownConstraints$', () => {
    it('should emit true if "unknown conditions" is present', async () => {
      sampleRecord$.next({
        ...sampleRecord,
        legalConstraints: [{ text: 'conditions unknown' }],
      })
      const result = await firstValueFrom(component.noKnownConstraint$)
      expect(result).toBe(true)
    })

    it('should emit false if "unknown conditions" is not present', async () => {
      sampleRecord$.next({
        ...sampleRecord,
        legalConstraints: [{ text: 'any other constraint' }],
      })
      const result = await firstValueFrom(component.noKnownConstraint$)
      expect(result).toBe(false)
    })
  })

  describe('onToggleChange', () => {
    it('should update legal constraints and hide all sections when noApplicableConstraint toggled on', () => {
      component.onToggleChange('noApplicableConstraint', true)
      expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
        'legalConstraints',
        [NOT_APPLICABLE_CONSTRAINT]
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'legalConstraints' },
        false
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'securityConstraints' },
        false
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'otherConstraints' },
        false
      )
    })
    it('should update legal constraints and hide all sections when noKnownConstraint toggled on', () => {
      jest.spyOn(component, 'hideAllConstraintSections')
      component.onToggleChange('noKnownConstraint', true)
      expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
        'legalConstraints',
        [NOT_KNOWN_CONSTRAINT]
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'legalConstraints' },
        false
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'securityConstraints' },
        false
      )
      expect(editorFacade.setFieldVisibility).toHaveBeenCalledWith(
        { model: 'otherConstraints' },
        false
      )
    })
    it('should remove all legal constraints when toggled off', () => {
      component.onToggleChange('noApplicableConstraint', false)
      expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
        'legalConstraints',
        []
      )
    })
  })

  describe('fields visibility change', () => {
    function getLastCallForField(model: string) {
      const calls = (
        editorFacade.setFieldVisibility as jest.Mock
      ).mock.calls.filter(([field]) => field.model === model)
      return calls[calls.length - 1]
    }

    describe.each([
      'legalConstraints',
      'securityConstraints',
      'otherConstraints',
    ])('for field %s', (fieldName) => {
      it('is visible if not empty at first and no toggles activated', () => {
        sampleRecord$.next({
          ...sampleRecord,
          [fieldName]: [{ text: 'some constraint' }],
        })
        fixture.detectChanges()
        expect(getLastCallForField(fieldName)).toEqual([
          { model: fieldName },
          true,
        ])
      })
      it('is hidden if not empty at first and NOT_APPLICABLE_CONSTRAINT present', () => {
        sampleRecord$.next({
          ...sampleRecord,
          [fieldName]: [{ text: 'some constraint' }],
          legalConstraints: [NOT_APPLICABLE_CONSTRAINT],
        })
        fixture.detectChanges()
        expect(getLastCallForField(fieldName)).toEqual([
          { model: fieldName },
          false,
        ])
      })
      it('is hidden if field is empty', () => {
        sampleRecord$.next({
          ...sampleRecord,
          [fieldName]: [],
        })
        fixture.detectChanges()
        expect(getLastCallForField(fieldName)).toEqual([
          { model: fieldName },
          false,
        ])
      })
    })
  })
})
