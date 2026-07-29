import { LocationStrategy } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirEdit, iconoirTrash } from '@ng-icons/iconoir'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { filter, map, take } from 'rxjs/operators'
import { REUSE_FORM_URL } from '../../index'
import { navigateToLightEdit } from '../utils/url'

@Component({
  selector: 'gn-ui-edit-delete-reuse-buttons',
  templateUrl: './edit-delete-reuse-buttons.component.html',
  styleUrl: './edit-delete-reuse-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonComponent, TranslatePipe, TranslateDirective, NgIcon],
  viewProviders: [
    provideIcons({
      iconoirEdit,
      iconoirTrash,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class EditDeleteReuseButtonsComponent {
  metadataViewFacade = inject(MdViewFacade)
  private recordsRepository = inject(RecordsRepositoryInterface)
  private notificationsService = inject(NotificationsService)
  private routerFacade = inject(RouterFacade)
  private translateService = inject(TranslateService)
  private dialog = inject(MatDialog)
  reuseFormUrl = inject(REUSE_FORM_URL, { optional: true })
  private locationStrategy = inject(LocationStrategy)

  metadataUuid$ = this.metadataViewFacade.metadata$.pipe(
    map((record) => record?.uniqueIdentifier),
    filter(Boolean)
  )

  editReuse() {
    this.metadataUuid$.pipe(take(1)).subscribe((uniqueIdentifier) => {
      navigateToLightEdit(
        this.reuseFormUrl,
        this.locationStrategy.getBaseHref(),
        uniqueIdentifier
      )
    })
  }

  deleteReuse() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translateService.instant(
          'record.reuse.delete.confirmation.title'
        ),
        message: this.translateService.instant(
          'record.reuse.delete.confirmation.message'
        ),
        confirmText: this.translateService.instant(
          'record.reuse.delete.confirmation.confirmText'
        ),
        cancelText: this.translateService.instant(
          'record.reuse.delete.confirmation.cancelText'
        ),
        focusCancel: true,
      },
      restoreFocus: true,
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.performReuseDeletion()
      }
    })
  }

  private performReuseDeletion() {
    this.metadataUuid$.pipe(take(1)).subscribe((uuid) =>
      this.recordsRepository.deleteRecord(uuid).subscribe({
        next: () => {
          this.routerFacade.setSearch()
        },
        error: (error) => {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'record.reuse.deleteError.title'
              ),
              text: `${this.translateService.instant(
                'record.reuse.deleteError.body'
              )} ${error}`,
            },
            undefined,
            error
          )
        },
      })
    )
  }
}
