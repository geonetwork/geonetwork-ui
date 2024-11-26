import { Component, Inject, InjectionToken, Optional } from '@angular/core'
import { LANGUAGE_STORAGE_KEY } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

export const LANGUAGES_LIST = new InjectionToken<string[]>('languages-list')

const DEFAULT_LANGUAGES = ['en', 'fr']

@Component({
  selector: 'gn-ui-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
  imports: [DropdownSelectorComponent],
  standalone: true,
})
export class LanguageSwitcherComponent {
  languageChoices = (this.languagesList || DEFAULT_LANGUAGES).map(
    (language) => ({
      label: `${language}`.toUpperCase(),
      value: language,
    })
  )

  constructor(
    @Optional()
    @Inject(LANGUAGES_LIST)
    private languagesList: string[],
    private translate: TranslateService
  ) {}

  get currentLang() {
    return this.translate.currentLang
  }

  changeLanguage(value: unknown) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value as string)
      location.reload()
    } catch (error) {
      console.warn(`Language choice could not be persisted`, error)
    }

    this.translate.use(value as string)
  }
}
