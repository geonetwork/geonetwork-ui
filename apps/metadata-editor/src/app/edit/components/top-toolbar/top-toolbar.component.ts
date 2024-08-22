import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PublishButtonComponent } from '../publish-button/publish-button.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'md-editor-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    PublishButtonComponent,
    ButtonComponent,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {
  protected SaveStatus = [
    'draft_only', // => when creating a record
    'record_up_to_date', // => when the record was just published (ie saved on the server)
    'draft_changes_pending', // => when the record was modified and not yet published
    // these are not used since the draft is saved locally in a synchronous way
    // TODO: use these states when the draft is saved on the server
    // 'draft_saving',
    // 'draft_saving_failed',
  ] as const

  protected saveStatus$: Observable<typeof this.SaveStatus[number]> =
    combineLatest([
      this.editorFacade.alreadySavedOnce$,
      this.editorFacade.changedSinceSave$,
    ]).pipe(
      map(([alreadySavedOnce, changedSinceSave]) => {
        if (!alreadySavedOnce) {
          return 'draft_only'
        }
        return changedSinceSave ? 'draft_changes_pending' : 'record_up_to_date'
      })
    )

  constructor(
    public dialog: MatDialog,
    private translateService: TranslateService,
    private editorFacade: EditorFacade
  ) {}

  confirmUndo() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translateService.instant(
          'editor.record.undo.confirmation.title'
        ),
        message: this.translateService.instant(
          'editor.record.undo.confirmation.message'
        ),
        confirmText: this.translateService.instant(
          'editor.record.undo.confirmation.confirmText'
        ),
        cancelText: this.translateService.instant(
          'editor.record.undo.confirmation.cancelText'
        ),
      },
      restoreFocus: true,
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.editorFacade.undoRecordDraft()
      }
    })
  }
}
