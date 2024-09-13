import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { ButtonComponent, UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { TranslateService } from '@ngx-translate/core'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Router } from '@angular/router'

interface ImportMenuItems {
  label: string
  icon: string
  action: () => any
  dataTest: string
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
    MatIconModule,
    ButtonComponent,
    ThumbnailComponent,
    UrlInputComponent,
  ],
})
export class ImportRecordComponent {
  @Output() closeImportMenu = new EventEmitter<void>()

  importMenuItems: ImportMenuItems[] = [
    {
      label: this.translateService.instant('dashboard.importRecord.useModel'),
      icon: 'highlight',
      action: () => null,
      dataTest: 'useAModelButton',
    },
    {
      label: this.translateService.instant(
        'dashboard.importRecord.importExternal'
      ),
      icon: 'cloud_download',
      action: this.displayImportExternal.bind(this),
      dataTest: 'importFromUrlButton',
    },
  ]

  isRecordImportInProgress = false

  sectionDisplayed: ImportMenuPage = 'mainMenu'

  externalImportBackLabel = this.translateService.instant(
    'dashboard.importRecord.importExternalLabel'
  )

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
      next: (recordTempId) => {
        if (recordTempId) {
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
            .navigate(['/edit', recordTempId])
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
          2500
        )
        this.isRecordImportInProgress = false
        this.cdr.markForCheck()
      },
    })
  }
}
