import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PublishButtonComponent } from '../publish-button/publish-button.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'md-editor-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    PublishButtonComponent,
    ButtonComponent,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {
  protected SaveStatus = [
    'saved_not_published',
    'saved_published_up_to_date',
    'saved_published_changes_pending',
    // these are not used since the draft is saved locally
    // TODO: use these states when the draft is saved on the server
    // 'saving',
    // 'saving_failed',
  ] as const

  protected saveStatus$: Observable<typeof this.SaveStatus[number]> =
    combineLatest([
      this.editorFacade.alreadySavedOnce$,
      this.editorFacade.changedSinceSave$,
    ]).pipe(
      map(([alreadySavedOnce, changedSinceSave]) => {
        if (!alreadySavedOnce) {
          return 'saved_not_published'
        }
        return changedSinceSave
          ? 'saved_published_changes_pending'
          : 'saved_published_up_to_date'
      })
    )

  constructor(private editorFacade: EditorFacade) {}
}
