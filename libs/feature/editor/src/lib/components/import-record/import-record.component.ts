import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent, UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Router } from '@angular/router'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirArrowLeft,
  iconoirImport,
  iconoirLightBulbOn,
} from '@ng-icons/iconoir'

interface ImportMenuItems {
  label: string
  icon: string
  action: () => any
  dataTest: string
  disabled?: boolean
}

type ImportMenuPage = 'mainMenu' | 'importExternalFile'

@Component({
  selector: 'gn-ui-import-record',
  templateUrl: './import-record.component.html',
  styleUrls: ['./import-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    UrlInputComponent,
    TranslateDirective,
    TranslatePipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirImport,
      iconoirLightBulbOn,
      iconoirArrowLeft,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class ImportRecordComponent {
  @Output() closeImportMenu = new EventEmitter<void>()

  importMenuItems: ImportMenuItems[] = [
    // {
    //   label: this.translateService.instant('dashboard.importRecord.useModel'),
    //   icon: 'iconoirLightBulbOn',
    //   action: () => null,
    //   dataTest: 'useAModelButton',
    //   disabled: true,
    // },
    {
      label: this.translateService.instant(
        'dashboard.importRecord.importExternal'
      ),
      icon: 'iconoirImport',
      action: this.displayImportExternal.bind(this),
      dataTest: 'importFromUrlButton',
    },
  ]

  isRecordImportInProgress = false

  sectionDisplayed: ImportMenuPage = 'mainMenu'

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private recordsRepository: RecordsRepositoryInterface
  ) {}

  displayMainMenu() {
    this.sectionDisplayed = 'mainMenu'
    this.cdr.markForCheck()
  }

  displayImportExternal() {
    this.sectionDisplayed = 'importExternalFile'
    this.cdr.markForCheck()
  }

  importRecord(url: string) {
    this.isRecordImportInProgress = true

    this.recordsRepository.duplicateExternalRecord(url).subscribe({
      next: (uuid) => {
        if (uuid) {
          this.notificationsService.showNotification(
            {
              type: 'success',
              title: this.translateService.instant(
                'editor.record.importFromExternalFile.success.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.importFromExternalFile.success.body'
              )}`,
            },
            2500
          )

          this.router
            .navigate(['/edit', uuid])
            .catch((err) => console.error(err))
        }
        this.closeImportMenu.next()
      },
      error: (error) => {
        this.notificationsService.showNotification(
          {
            type: 'error',
            title: this.translateService.instant(
              'editor.record.importFromExternalFile.failure.title'
            ),
            text: `${this.translateService.instant(
              'editor.record.importFromExternalFile.failure.body'
            )} ${error.message ?? ''}`,
          },
          2500,
          error
        )
        this.isRecordImportInProgress = false
        this.cdr.markForCheck()
      },
    })
  }
}
