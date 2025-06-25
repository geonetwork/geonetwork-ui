import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MultilingualPanelComponent } from './multilingual-panel.component'
import { of } from 'rxjs'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class RecordsRepositoryMock {
  getApplicationLanguages = jest.fn(() => of(['en', 'fr', 'it', 'es']))
}

describe('MultilingualPanelComponent', () => {
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
      updateRecordLanguages: jest.fn(),
    } as any

    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
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
      expect(facadeMock.updateRecordLanguages).toHaveBeenCalledWith('en', [
        'fr',
        'es',
        'it',
      ])
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
      expect(facadeMock.updateRecordLanguages).toHaveBeenCalledWith('es', [
        'fr',
        'en',
      ])
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
