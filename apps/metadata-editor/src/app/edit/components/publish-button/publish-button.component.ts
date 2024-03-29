import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type RecordSaveStatus = 'saving' | 'upToDate' | 'hasChanges'

@Component({
  selector: 'md-editor-publish-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishButtonComponent {
  status$: Observable<RecordSaveStatus> = combineLatest([
    this.facade.changedSinceSave$,
    this.facade.saving$,
  ]).pipe(
    map(([changedSinceSave, saving]) => {
      if (saving) {
        return 'saving'
      }
      if (changedSinceSave) {
        return 'hasChanges'
      }
      return 'upToDate'
    })
  )

  constructor(private facade: EditorFacade) {}

  saveRecord() {
    this.facade.saveRecord()
  }
}
