import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldAssociatedRecordsComponent } from './form-field-associated-records.component'
import { provideTranslateService } from '@ngx-translate/core'
import { associationTypeValues } from '@geonetwork-ui/common/domain/model/record'

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
      component.value = [
        { uniqueIdentifier: 'abc-123', associationType: 'crossReference' },
      ]
      fixture.detectChanges()
    })

    it('is recognized as having a parent link', () => {
      expect(component.hasParentLink).toBeTruthy()
    })

    it('exposes its identifier and type', () => {
      expect(component.uniqueIdentifier).toEqual('abc-123')
      expect(component.selectedType).toEqual('crossReference')
    })
  })

  describe('when value contains several associations', () => {
    beforeEach(() => {
      component.value = [
        { uniqueIdentifier: 'abc-123', associationType: 'crossReference' },
        { uniqueIdentifier: 'def-456', associationType: 'largerWorkCitation' },
        { uniqueIdentifier: 'ghi-789', associationType: 'stereoMate' },
      ]
      fixture.detectChanges()
    })

    it('shows only the first association', () => {
      expect(component.uniqueIdentifier).toEqual('abc-123')
      expect(component.selectedType).toEqual('crossReference')
    })

    it('preserves the other associations when the first is edited', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onUniqueIdentifierChange('abc-999')
      expect(spy).toHaveBeenCalledWith([
        { uniqueIdentifier: 'abc-999', associationType: 'crossReference' },
        { uniqueIdentifier: 'def-456', associationType: 'largerWorkCitation' },
        { uniqueIdentifier: 'ghi-789', associationType: 'stereoMate' },
      ])
    })

    it('preserves the other associations when the first is removed', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onUniqueIdentifierChange('')
      expect(spy).toHaveBeenCalledWith([
        { uniqueIdentifier: 'def-456', associationType: 'largerWorkCitation' },
        { uniqueIdentifier: 'ghi-789', associationType: 'stereoMate' },
      ])
    })

    it('preserves the other associations when the toggle is switched off', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onToggle(false)
      expect(spy).toHaveBeenCalledWith([
        { uniqueIdentifier: 'def-456', associationType: 'largerWorkCitation' },
        { uniqueIdentifier: 'ghi-789', associationType: 'stereoMate' },
      ])
    })
  })

  describe('toggling on', () => {
    beforeEach(() => {
      component.value = []
      fixture.detectChanges()
    })

    it('emits an association with an empty identifier and the default type', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onToggle(true)
      expect(spy).toHaveBeenCalledWith([
        { uniqueIdentifier: '', associationType: 'crossReference' },
      ])
    })
  })

  describe('dropdown choices', () => {
    it('offers every association type of the codelist', () => {
      expect(component.choices).toEqual(
        associationTypeValues.map((value) => ({
          value,
          label: `domain.record.associationType.${value}`,
        }))
      )
    })
  })
})
