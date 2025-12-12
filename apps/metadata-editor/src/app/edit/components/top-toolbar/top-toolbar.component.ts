import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatTooltipModule } from '@angular/material/tooltip'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { LetDirective } from '@ngrx/component'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PublishButtonComponent } from '../publish-button/publish-button.component'
import { MetadataQualityComponent } from '../metadata-quality/metadata-quality.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirBadgeCheck,
  iconoirCheckCircle,
  iconoirDownload,
  iconoirLightBulb,
  iconoirSidebarCollapse,
  iconoirTranslate,
  iconoirUndoAction,
} from '@ng-icons/iconoir'
import {
  matHelpOutlineOutline,
  matPendingOutline,
} from '@ng-icons/material-icons/outline'
import { matCircle } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'md-editor-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    PublishButtonComponent,
    ButtonComponent,
    LetDirective,
    MatTooltipModule,
    MatDialogModule,
    MetadataQualityComponent,
    TranslateDirective,
    TranslatePipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirCheckCircle,
      matPendingOutline,
      iconoirSidebarCollapse,
      iconoirLightBulb,
      iconoirDownload,
      iconoirUndoAction,
      iconoirBadgeCheck,
      matHelpOutlineOutline,
      iconoirTranslate,
      matCircle,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {
  dialog = inject(MatDialog)
  private translateService = inject(TranslateService)
  private editorFacade = inject(EditorFacade)

  @Output() openSidePanel = new EventEmitter<
    null | 'multilingual' | 'metadataQuality'
  >()
  sidePanelOpen: 'multilingual' | 'metadataQuality' | null = null
  protected SaveStatus = [
    'record_not_published', // => when the record is not published yet but saved
    'record_up_to_date', // => when the record was just published (ie saved on the server)
    'draft_changes_pending', // => when the record was modified and not yet published
    // these are not used since the draft is saved locally in a synchronous way
    // TODO: use these states when the draft is saved on the server
    // 'draft_saving',
    // 'draft_saving_failed',
  ] as const

  protected saveStatus$: Observable<(typeof this.SaveStatus)[number]> =
    combineLatest([
      this.editorFacade.changedSinceSave$,
      this.editorFacade.isPublished$,
    ]).pipe(
      map(([changedSinceSave, isPublished]) => {
        if (changedSinceSave) {
          return 'draft_changes_pending'
        }
        return !isPublished ? 'record_not_published' : 'record_up_to_date'
      })
    )
  isRecordMultilingual$ = this.editorFacade.record$.pipe(
    map((record) => record.otherLanguages.length)
  )
  record$ = this.editorFacade.record$

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

  toggleSidePanel(sidePanel: 'multilingual' | 'metadataQuality') {
    this.sidePanelOpen = this.sidePanelOpen === sidePanel ? null : sidePanel
    this.openSidePanel.emit(this.sidePanelOpen)
  }
}
