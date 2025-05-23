import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSpatialToggleComponent } from './form-field-spatial-toggle.component'
import { MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { BehaviorSubject, firstValueFrom, from } from 'rxjs'
import {
  NATIONAL_KEYWORD,
  SAMPLE_PLACE_KEYWORDS,
  SAMPLE_RECORD,
} from '@geonetwork-ui/common/fixtures'
import {
  CatalogRecord,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FormFieldSpatialToggleComponent', () => {
  let component: FormFieldSpatialToggleComponent
  let fixture: ComponentFixture<FormFieldSpatialToggleComponent>
  let editorFacade: EditorFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(EditorFacade, {
          record$: new BehaviorSubject(SAMPLE_RECORD),
          updateRecordField: jest.fn(),
        }),
      ],
    })
    editorFacade = TestBed.inject(EditorFacade)
    fixture = TestBed.createComponent(FormFieldSpatialToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('switch toggle option is based on the keywords present in the record', () => {
    it('should return true if the record has a national keyword', async () => {
      const keywords = [...SAMPLE_PLACE_KEYWORDS, NATIONAL_KEYWORD] as Keyword[]
      editorFacade = TestBed.inject(EditorFacade)
      editorFacade.record$ = from([
        { ...SAMPLE_RECORD, keywords } as CatalogRecord,
      ])
      fixture = TestBed.createComponent(FormFieldSpatialToggleComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      const results = await firstValueFrom(component.switchToggleOptions$)
      const nationalOption = results.filter(
        (result) => result.label === 'National'
      )[0]

      expect(nationalOption.checked).toBe(true)
    })
    it('should return false if the record does not have a national keyword', async () => {
      const keywords2 = [...SAMPLE_PLACE_KEYWORDS] as Keyword[]
      editorFacade = TestBed.inject(EditorFacade)
      editorFacade.record$ = from([
        { ...SAMPLE_RECORD, keywords: keywords2 } as CatalogRecord,
      ])
      fixture = TestBed.createComponent(FormFieldSpatialToggleComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      const results = await firstValueFrom(component.switchToggleOptions$)
      const nationalOption = results.filter(
        (result) => result.label === 'National'
      )[0]

      expect(nationalOption.checked).toBe(false)
    })
  })
  describe('#onSpatialScopeChange', () => {
    it('removes all existing spatial scope keywords and add the selected one', async () => {
      const spatialScopes = [{ label: 'National' }, { label: 'Regional' }]

      const allKeywords = await firstValueFrom(component.allKeywords$)
      const filteredKeywords = allKeywords.filter((keyword) => {
        const spatialScopeLabels = spatialScopes.map((scope) => scope.label)
        return !spatialScopeLabels.includes(keyword.label)
      })

      const selectedOption = {
        label: 'National',
        value: NATIONAL_KEYWORD,
        checked: true,
      }
      await component.onSpatialScopeChange(selectedOption)

      expect(editorFacade.updateRecordField).toHaveBeenCalledWith('keywords', [
        ...filteredKeywords,
        NATIONAL_KEYWORD,
      ])
    })
  })
})
