import { TestBed } from '@angular/core/testing'
import { MultilingualPanelComponent } from './multilingual-panel.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatDialog } from '@angular/material/dialog'
import { of } from 'rxjs'
import { EditorFacade } from '../../+state/editor.facade'

describe('MultilingualPanelComponent (logic only)', () => {
  let component: MultilingualPanelComponent
  let dialogMock: jest.Mocked<MatDialog>
  let facadeMock: jest.Mocked<EditorFacade>

  const mockRecord = {
    defaultLanguage: 'en',
    otherLanguages: ['fr', 'es'],
  } as any

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true), // simulate confirmed
      }),
    } as any

    facadeMock = {
      updateRecordField: jest.fn(),
    } as any

    await TestBed.configureTestingModule({
      imports: [MultilingualPanelComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: EditorFacade, useValue: facadeMock },
      ],
    }).compileComponents()

    const fixture = TestBed.createComponent(MultilingualPanelComponent)
    component = fixture.componentInstance

    component.record = mockRecord
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

  describe('multilingual toggle', () => {
    it('should open confirmation dialog when disabling multilingual', () => {
      component.switchMultilingual()
      expect(dialogMock.open).toHaveBeenCalled()
    })
    it('should only keep the default language and remove the rest if user disables multilingual', async () => {
      dialogMock.open.mockReturnValueOnce({
        afterClosed: () => of(true),
      } as any)

      component.isMultilingual = true
      component.recordLanguages = ['en', 'fr']
      component.selectedLanguages = ['en', 'fr']
      component.editTranslations = true

      component.switchMultilingual()

      expect(component.isMultilingual).toBe(false)
      expect(component.selectedLanguages).toEqual([])
      expect(component.editTranslations).toBe(false)
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'otherLanguages',
        []
      )
    })
  })

  describe('edit panel toggle', () => {
    it('should toggle translation panel visibility', () => {
      component.editTranslations = false
      component.activateLanguageSelection()
      expect(component.editTranslations).toBe(true)

      component.activateLanguageSelection()
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
      component.selectedLanguages = ['fr', 'es', 'en']
      component.validateTranslations()
      expect(spy).toHaveBeenCalled()
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'otherLanguages',
        ['fr', 'es']
      )
    })

    it('should remove languages', () => {
      const spy = jest.spyOn(component, 'confirmDeleteAction')
      component.recordLanguages = ['en', 'fr', 'it']
      component.selectedLanguages = ['en', 'fr']
      component.validateTranslations()
      expect(spy).toHaveBeenCalledWith(['en', 'fr'])
      expect(facadeMock.updateRecordField).toHaveBeenCalledWith(
        'otherLanguages',
        ['fr']
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
