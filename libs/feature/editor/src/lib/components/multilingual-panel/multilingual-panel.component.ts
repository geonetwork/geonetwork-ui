import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirCheckCircle,
  iconoirCircle,
  iconoirSettings,
} from '@ng-icons/iconoir'
import { matMoreHorizOutline } from '@ng-icons/material-icons/outline'
import { EditorFacade } from '../../+state/editor.facade'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { MatDialog } from '@angular/material/dialog'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { map } from 'rxjs'

const extraFlagMap: { [key: string]: string } = {
  ar: 'arab',
  en: 'gb',
  ko: 'kr',
  cs: 'cz',
  zh: 'cn',
  ca: 'es-ct',
  rm: 'ch',
  da: 'dk',
  sv: 'se',
  cy: 'gb-wls',
  hy: 'am',
  ka: 'ge',
  uk: 'ua',
}

@Component({
  selector: 'gn-ui-multilingual-panel',
  standalone: true,
  imports: [
    CommonModule,
    CheckToggleComponent,
    TranslateModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirSettings,
      matMoreHorizOutline,
      iconoirCheckCircle,
      iconoirCircle,
    }),
    provideNgIconsConfig({
      size: '1.25em',
    }),
  ],
  templateUrl: './multilingual-panel.component.html',
  styleUrl: './multilingual-panel.component.css',
})
export class MultilingualPanelComponent {
  isMultilingual: boolean
  _record: CatalogRecord
  editTranslations: boolean
  selectedLanguages = []
  recordLanguages = []
  formLanguage = ''
  @Input() set record(value: CatalogRecord) {
    this._record = value
    this.isMultilingual = value.otherLanguages.length > 0
    this.editTranslations = false
    this.recordLanguages = [...value.otherLanguages, value.defaultLanguage]
    this.selectedLanguages = this.recordLanguages
    this.formLanguage = value.defaultLanguage
  }

  supportedLanguages$ = this.recordsRepository
    .getApplicationLanguages()
    .pipe(map((languages) => this.sortLanguages(languages)))

  constructor(
    public facade: EditorFacade,
    public dialog: MatDialog,
    private translateService: TranslateService,
    private recordsRepository: RecordsRepositoryInterface
  ) {}

  sortLanguages(languages) {
    return languages
      .map((lang) => ({
        lang,
        label: this.translateService.instant('language.' + lang),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((item) => item.lang)
  }

  toggleLanguageSelection() {
    this.editTranslations = !this.editTranslations
  }

  getIconClass(lang) {
    return extraFlagMap[lang]
      ? `fi fi-${extraFlagMap[lang]} w-4 h-3`
      : `fi fi-${lang} w-4 h-3`
  }

  switchMultilingual() {
    if (this.isMultilingual && this.selectedLanguages.length > 1) {
      this.confirmDeleteAction()
    } else {
      this.isMultilingual = true
      this.editTranslations = true
    }
  }

  getExtraClass(lang) {
    const baseClass = 'h-[34px] w-full font-bold justify-start hover:bg-white'
    if (this.selectedLanguages.includes(lang)) {
      return `${baseClass} bg-white border border-black`
    }
    return baseClass
  }

  toggleLanguage(lang) {
    if (this.selectedLanguages.includes(lang)) {
      this.selectedLanguages = this.selectedLanguages.filter(
        (language) => language !== lang
      )
    } else {
      this.selectedLanguages.push(lang)
    }
  }

  validateTranslations() {
    if (
      this.selectedLanguages.length < this.recordLanguages.length ||
      this.selectedLanguages !== this.recordLanguages
    ) {
      this.confirmDeleteAction(this.selectedLanguages)
    } else {
      this.updateTranslations()
    }
  }

  updateTranslations() {
    this.facade.updateRecordField(
      'otherLanguages',
      this.selectedLanguages.filter(
        (lang) => lang !== this._record.defaultLanguage
      )
    )
    this.recordLanguages = this.selectedLanguages
    this.editTranslations = false
  }

  switchFormLang(lang) {
    this.formLanguage = lang
    // TO IMPLEMENT FURTHER
  }
  toggleLangOptions(lang) {
    // TO IMPLEMENT
  }

  confirmDeleteAction(lang?) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translateService.instant(
          'editor.record.multilingual.confirmation.title'
        ),
        message: this.translateService.instant(
          'editor.record.multilingual.confirmation.message'
        ),
        confirmText: this.translateService.instant(
          'editor.record.multilingual.confirmation.confirmText'
        ),
        cancelText: this.translateService.instant(
          'editor.record.multilingual.confirmation.cancelText'
        ),
      },
      restoreFocus: true,
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        if (lang) {
          this.updateTranslations()
        } else {
          this.facade.updateRecordField('otherLanguages', [])
          this.isMultilingual = false
          this.selectedLanguages = []
        }
      } else {
        this.isMultilingual = true
        this.selectedLanguages = this.recordLanguages
      }
      this.editTranslations = false
    })
  }

  getToggleTitle(lang) {
    if (lang === this._record.defaultLanguage) {
      return this.translateService.instant(
        'editor.record.form.multilingual.forbidden'
      )
    }
    return ''
  }
}
