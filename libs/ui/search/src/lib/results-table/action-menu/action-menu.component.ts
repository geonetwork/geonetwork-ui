import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matMoreVert } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css'],
  standalone: true,
  imports: [
    ButtonComponent,
    MatMenuModule,
    MatDialogModule,
    ConfirmationDialogComponent,
    TranslateModule,
    NgIconComponent,
  ],
  providers: [provideIcons({ matMoreVert })],
})
export class ActionMenuComponent {
  @Input() canDuplicate: boolean
  @Input() canDelete: boolean
  @Output() duplicate = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  constructor(
    public dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  openMenu() {
    this.trigger.openMenu()
  }

  openDeleteConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translateService.instant(
          'editor.record.delete.confirmation.title'
        ),
        message: this.translateService.instant(
          'editor.record.delete.confirmation.message'
        ),
        confirmText: this.translateService.instant(
          'editor.record.delete.confirmation.confirmText'
        ),
        cancelText: this.translateService.instant(
          'editor.record.delete.confirmation.cancelText'
        ),
      },
      restoreFocus: false,
    })

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((confirmed) => {
      this.trigger.focus()
      if (confirmed) {
        this.delete.emit()
      }
    })
  }
}
