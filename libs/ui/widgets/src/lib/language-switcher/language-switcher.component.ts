import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Optional,
} from '@angular/core'
import { LANGUAGE_STORAGE_KEY } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'

export const LANGUAGE_PLACEHOLDER = new InjectionToken<string[]>(
  'language-placeholder'
)

const DEFAULT_LANGUAGES = ['en', 'fr']

@Component({
  selector: 'gn-ui-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() languageList = this.languagePlaceholder || DEFAULT_LANGUAGES

  constructor(
    @Optional()
    @Inject(LANGUAGE_PLACEHOLDER)
    private languagePlaceholder,
    private translate: TranslateService
  ) {}

  get currentLang() {
    return this.translate.currentLang
  }

  ngOnInit(): void {
    this.languageList.forEach((language, index) => {
      this.languageList[index] = {
        label: `language.${language}`,
        value: language,
      }
    })
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
