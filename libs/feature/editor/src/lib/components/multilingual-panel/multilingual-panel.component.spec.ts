import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MultilingualPanelComponent } from './multilingual-panel.component'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

class RecordsRepositoryMock {
  getApplicationLanguages = jest.fn(() => of(['en', 'fr', 'it', 'es']))
}

describe('MultilingualPanelComponent (logic only)', () => {
  let component: MultilingualPanelComponent
  let fixture: ComponentFixture<MultilingualPanelComponent>
  let facadeMock: jest.Mocked<EditorFacade>
  let recordsRepository: RecordsRepositoryInterface

  const mockRecord = {
    defaultLanguage: 'en',
    otherLanguages: ['fr', 'es'],
  } as any

  beforeEach(async () => {
    facadeMock = {
      updateRecordField: jest.fn(),
    } as any

    TestBed.configureTestingModule({
      imports: [MultilingualPanelComponent, TranslateModule.forRoot()],
      providers: [
        { provide: EditorFacade, useValue: facadeMock },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    }).compileComponents()

    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    fixture = TestBed.createComponent(MultilingualPanelComponent)
    component = fixture.componentInstance
    component.record = mockRecord
    fixture.detectChanges()
  })

  describe('initialisation', () => {
    it('should initialize with correct values from input record', () => {
      expect(component.isMultilingual).toBe(true)
      expect(component.editTranslations).toBe(false)
      expect(component.recordLanguages).toEqual(['fr', 'es', 'en'])
      expect(component.selectedLanguages).toEqual(['fr', 'es', 'en'])
      expect(component.formLanguage).toBe('en')
    })
  })

  describe('edit panel toggle', () => {
    it('should toggle translation panel visibility', () => {
      component.editTranslations = false
      component.toggleLanguageSelection()
      expect(component.editTranslations).toBe(true)

      component.toggleLanguageSelection()
      expect(component.editTranslations).toBe(false)
    })
  })

  describe('language toggling', () => {
    it('should add an remove selectedLanguages', () => {
      component.selectedLanguages = ['en', 'fr']
      component.toggleLanguage('fr')
      expect(component.selectedLanguages).toEqual(['en'])

      component.toggleLanguage('es')
      expect(component.selectedLanguages).toEqual(['en', 'es'])
    })
  })

  describe('validateTranslations', () => {
    it('should add languages', () => {
      const spy = jest.spyOn(component, 'updateTranslations')
      component.selectedLanguages = ['fr', 'es', 'en', 'it']
      component.validateTranslations()
      expect(spy).toHaveBeenCalled()
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'otherLanguages',
        ['fr', 'es', 'it']
      )
    })

    it('should remove languages', () => {
      const spy = jest.spyOn(component, 'confirmDeleteAction')
      component.recordLanguages = ['en', 'fr', 'it']
      component.selectedLanguages = ['en', 'fr']
      component.validateTranslations()
      expect(spy).toHaveBeenCalledWith(['en', 'fr'])
    })
  })

  describe('Default language switching', () => {
    beforeEach(() => {
      component.switchDefaultLang('es')
      fixture.detectChanges()
    })
    it('should set the default language and the otherLanguages accordingly', () => {
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'defaultLanguage',
        'es'
      )
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'otherLanguages',
        ['fr', 'en']
      )
    })
  })

  describe('language utilities', () => {
    it('should sort languages by translated label', () => {
      const sorted = component.sortLanguages(['fr', 'en', 'es'])
      expect(sorted).toEqual(['en', 'es', 'fr'])
    })

    it('should get correct icon class for special and normal cases', () => {
      expect(component.getIconClass('ko')).toContain('fi-kr')
      expect(component.getIconClass('fr')).toContain('fi-fr')
    })
  })
})
