import {
  Component,
  Inject,
  InjectionToken,
  OnInit,
  Optional,
} from '@angular/core'
import { LANGUAGE_STORAGE_KEY } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'

export const LANGUAGES_LIST = new InjectionToken<string[]>('languages-list')

const DEFAULT_LANGUAGES = ['en', 'fr']

@Component({
  selector: 'gn-ui-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent implements OnInit {
  languageList = this.languagePlaceholder || DEFAULT_LANGUAGES

  constructor(
    @Optional()
    @Inject(LANGUAGES_LIST)
    private languagePlaceholder,
    private translate: TranslateService
  ) {}

  get currentLang() {
    return this.translate.currentLang
  }

  ngOnInit(): void {
    const languages = this.languagePlaceholder || DEFAULT_LANGUAGES
    this.languageList = languages.map((language) => ({
      label: `language.${language}`,
      value: language,
    }))
  }

  changeLanguage(value) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value)
    } catch (error) {
      console.warn(`Language choice could not be persisted`, error)
    }

    this.translate.use(value)
  }
}
