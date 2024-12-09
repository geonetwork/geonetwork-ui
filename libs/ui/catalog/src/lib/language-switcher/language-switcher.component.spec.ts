import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LANGUAGE_STORAGE_KEY } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'
import { LanguageSwitcherComponent } from './language-switcher.component'
import { MockBuilder } from 'ng-mocks'

class TranslateServiceMock {
  use = jest.fn()
  currentLang = 'en'
  get = jest.fn()
}

window.console.warn = jest.fn()

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent
  let fixture: ComponentFixture<LanguageSwitcherComponent>
  let service: TranslateService

  beforeEach(() => MockBuilder(LanguageSwitcherComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    }).compileComponents()
    service = TestBed.inject(TranslateService)
    fixture = TestBed.createComponent(LanguageSwitcherComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('show current language as selected', () => {
    beforeEach(() => {
      service.currentLang = 'sk'
      fixture.detectChanges()
    })
    it('selects the current language', () => {
      expect(component.currentLang).toBe('sk')
    })
  })

  describe('language selection', () => {
    describe('local storage succeeds', () => {
      beforeEach(() => {
        component.changeLanguage('de')
      })
      it('uses the new language', () => {
        expect(service.use).toHaveBeenCalledWith('de')
      })
      it('persists the language in local storage', () => {
        expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de')
      })
    })

    describe('local storage fails', () => {
      beforeEach(() => {
        window.localStorage.setItem = () => {
          throw new Error('blarg')
        }
        component.changeLanguage('de')
      })
      it('uses the new language', () => {
        expect(service.use).toHaveBeenCalledWith('de')
      })
      it('prints a warning', () => {
        expect(window.console.warn).toHaveBeenCalledWith(
          expect.stringContaining('could not be persisted'),
          expect.any(Error)
        )
      })
    })
  })
})
