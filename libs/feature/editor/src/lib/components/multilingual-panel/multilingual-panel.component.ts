import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
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
import { map, Subscription } from 'rxjs'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { ActionMenuComponent } from '@geonetwork-ui/ui/search'

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
    TranslateDirective,
    TranslatePipe,
    ButtonComponent,
    NgIconComponent,
    ActionMenuComponent,
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
export class MultilingualPanelComponent implements OnDestroy {
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
  @ViewChildren('actionMenuButton', { read: ElementRef })
  actionMenuButtons!: QueryList<ElementRef>
  private overlayRef!: OverlayRef

  isActionMenuOpen = false
  subscription = new Subscription()

  supportedLanguages$ = this.recordsRepository
    .getApplicationLanguages()
    .pipe(map((languages) => this.sortLanguages(languages)))

  constructor(
    public facade: EditorFacade,
    public dialog: MatDialog,
    private translateService: TranslateService,
    private recordsRepository: RecordsRepositoryInterface,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  sortLanguages(languages: string[]) {
    return languages
      .map((lang) => {
        const label = this.translateService.instant('language.' + lang)
        const isTranslated = label !== 'language.' + lang

        return {
          lang,
          label,
          isTranslated,
        }
      })
      .sort((a, b) => {
        if (a.isTranslated && !b.isTranslated) return -1
        if (!a.isTranslated && b.isTranslated) return 1

        return a.label.localeCompare(b.label)
      })
      .map((item) => item.lang)
  }

  toggleLanguageSelection() {
    this.editTranslations = !this.editTranslations
  }

  getIconClass(lang: string) {
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

  getExtraClass(lang: string) {
    const baseClass = 'h-[34px] w-full font-bold justify-start hover:bg-white'
    if (this.selectedLanguages.includes(lang)) {
      return `${baseClass} bg-white border border-black`
    }
    return baseClass
  }

  toggleLanguage(lang: string) {
    if (this.selectedLanguages.includes(lang)) {
      this.removeSelectedLanguage(lang)
    } else {
      this.selectedLanguages.push(lang)
    }
  }

  removeSelectedLanguage(lang: string) {
    this.selectedLanguages = this.selectedLanguages.filter(
      (language) => language !== lang
    )
  }

  validateTranslations() {
    const equalLength =
      this.selectedLanguages.length === this.recordLanguages.length
    if (
      this.selectedLanguages.length < this.recordLanguages.length ||
      (equalLength && this.selectedLanguages !== this.recordLanguages)
    ) {
      this.confirmDeleteAction(this.selectedLanguages)
    } else {
      this.updateTranslations()
    }
  }

  updateTranslations() {
    const newLanguageSelection = this.selectedLanguages.filter(
      (lang) => lang !== this.formLanguage
    )
    this.facade.updateRecordLanguages(this.formLanguage, newLanguageSelection)
    this.recordLanguages = newLanguageSelection
    this.editTranslations = false
  }

  switchFormLang(lang) {
    // TO IMPLEMENT FURTHER
  }

  switchDefaultLang(lang: string) {
    this.formLanguage = lang
    this.facade.updateRecordLanguages(
      lang,
      this.selectedLanguages.filter((lang) => lang !== this.formLanguage)
    )
    this.closeActionMenu()
  }

  confirmDeleteAction(lang?: string[] | string) {
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
        focusCancel: true,
      },
      restoreFocus: true,
    })
    this.subscription.add(
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          if (lang) {
            if (!Array.isArray(lang)) {
              this.removeSelectedLanguage(lang)
              this.closeActionMenu()
            }
            this.updateTranslations()
          } else {
            this.facade.updateRecordLanguages(this.formLanguage, [])
            this.isMultilingual = false
            this.selectedLanguages = []
          }
        } else {
          this.isMultilingual = true
          this.selectedLanguages = this.recordLanguages
        }
        this.editTranslations = false
      })
    )
  }

  isFirstUnsupported(index: number): boolean {
    const langs = this.sortLanguages(this.recordLanguages)
    return (
      langs[index].length === 3 &&
      langs.slice(0, index).every((lang) => lang.length !== 3)
    )
  }

  isLangSupported(lang: string) {
    return lang.length === 2
  }

  getToggleTitle(lang: string) {
    if (lang === this._record.defaultLanguage) {
      return this.translateService.instant(
        'editor.record.form.multilingual.forbidden'
      )
    }
    return ''
  }

  openActionMenu(item: string, template) {
    this.isActionMenuOpen = true
    const index = this.sortLanguages(this.selectedLanguages).indexOf(item)
    const buttonElement = this.actionMenuButtons.toArray()[index]

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(buttonElement)
      .withFlexibleDimensions(true)
      .withPush(true)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ])

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })

    const portal = new TemplatePortal(template, this.viewContainerRef)

    this.overlayRef.attach(portal)
    this.subscription.add(
      this.overlayRef.backdropClick().subscribe(() => {
        this.closeActionMenu()
      })
    )
  }

  closeActionMenu() {
    if (this.overlayRef) {
      this.isActionMenuOpen = false
      this.overlayRef.dispose()
      this.cdr.markForCheck()
    }
  }
}
