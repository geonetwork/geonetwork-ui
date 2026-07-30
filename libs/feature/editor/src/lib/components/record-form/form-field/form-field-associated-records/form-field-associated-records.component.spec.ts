import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldAssociatedRecordsComponent } from './form-field-associated-records.component'
import { provideTranslateService } from '@ngx-translate/core'

describe('FormFieldAssociatedRecordsComponent', () => {
  let component: FormFieldAssociatedRecordsComponent
  let fixture: ComponentFixture<FormFieldAssociatedRecordsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideTranslateService()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldAssociatedRecordsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when value is an empty array', () => {
    beforeEach(() => {
      component.value = []
      fixture.detectChanges()
    })

    it('is not recognized as having a parent link', () => {
      expect(component.hasParentLink).toBeFalsy()
    })
  })

  describe('when value is undefined', () => {
    beforeEach(() => {
      component.value = undefined
      fixture.detectChanges()
    })

    it('is not recognized as having a parent link', () => {
      expect(component.hasParentLink).toBeFalsy()
    })
  })

  describe('when value contains one association', () => {
    beforeEach(() => {
      component.value = [{ uuid: 'abc-123', associationType: 'crossReference' }]
      fixture.detectChanges()
    })

    it('is recognized as having a parent link', () => {
      expect(component.hasParentLink).toBeTruthy()
    })

    it('exposes its uuid and type', () => {
      expect(component.uuid).toEqual('abc-123')
      expect(component.selectedType).toEqual('crossReference')
    })
  })

  describe('when value contains several associations', () => {
    beforeEach(() => {
      component.value = [
        { uuid: 'abc-123', associationType: 'crossReference' },
        { uuid: 'def-456', associationType: 'largerWorkCitation' },
        { uuid: 'ghi-789', associationType: 'stereoMate' },
      ]
      fixture.detectChanges()
    })

    it('shows only the first association', () => {
      expect(component.uuid).toEqual('abc-123')
      expect(component.selectedType).toEqual('crossReference')
    })

    it('preserves the other associations when the first is edited', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onUuidChange('abc-999')
      expect(spy).toHaveBeenCalledWith([
        { uuid: 'abc-999', associationType: 'crossReference' },
        { uuid: 'def-456', associationType: 'largerWorkCitation' },
        { uuid: 'ghi-789', associationType: 'stereoMate' },
      ])
    })

    it('preserves the other associations when the first is removed', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onUuidChange('')
      expect(spy).toHaveBeenCalledWith([
        { uuid: 'def-456', associationType: 'largerWorkCitation' },
        { uuid: 'ghi-789', associationType: 'stereoMate' },
      ])
    })

    it('preserves the other associations when the toggle is switched off', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onToggle(false)
      expect(spy).toHaveBeenCalledWith([
        { uuid: 'def-456', associationType: 'largerWorkCitation' },
        { uuid: 'ghi-789', associationType: 'stereoMate' },
      ])
    })
  })

  describe('toggling on', () => {
    beforeEach(() => {
      component.value = []
      fixture.detectChanges()
    })

    it('emits an association with an empty uuid and the default type', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onToggle(true)
      expect(spy).toHaveBeenCalledWith([
        { uuid: '', associationType: 'crossReference' },
      ])
    })
  })

  describe('when the associationType is outside the hardcoded list', () => {
    beforeEach(() => {
      component.value = [
        { uuid: 'abc-123', associationType: 'revisionOf' },
        { uuid: 'def-456', associationType: 'revisionOf' },
      ]
      fixture.detectChanges()
    })

    it('adds it to the dropdown choices instead of leaving it blank', () => {
      expect(component.choices).toContainEqual({
        value: 'revisionOf',
        label: 'revisionOf',
      })
    })
  })
})
