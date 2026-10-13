import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { RecordFlag } from '@geonetwork-ui/common/domain/model'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { toSignal } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { MatTooltip } from '@angular/material/tooltip'
import { map, switchMap } from 'rxjs/operators'
import { matHelpOutline } from '@ng-icons/material-icons/outline'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'

@Component({
  selector: 'gn-ui-form-field-record-flag',
  standalone: true,
  imports: [AsyncPipe, CheckToggleComponent, TranslatePipe, NgIcon, MatTooltip],
  viewProviders: [
    provideIcons({
      matHelpOutline,
    }),
  ],
  templateUrl: './form-field-record-flag-component.html',
  styleUrls: ['./form-field-record-flag-component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRecordFlagComponent {
  flagName = input<RecordFlag>()
  labelKey = input<string>()
  hintKey = input<string>()

  private editorFacade = inject(EditorFacade)
  private repository = inject(RecordsRepositoryInterface)
  private notificationsService = inject(NotificationsService)
  private translateService = inject(TranslateService)

  private record = toSignal(this.editorFacade.record$)

  recordKind = toSignal(
    this.editorFacade.record$.pipe(map((record) => record.kind))
  )
  initialValue$ = this.editorFacade.record$.pipe(
    filter((record) => !!record),
    switchMap((record) =>
      this.repository.getRecordFlag(record.uniqueIdentifier, this.flagName())
    )
  )

  onToggle(enabled: boolean) {
    if (this.record() === null) {
      return
    }
    this.repository
      .setRecordFlag(this.record().uniqueIdentifier, this.flagName(), enabled)
      .subscribe({
        next: () => {
          // do nothing
        },
        error: (error) => {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'editor.record.flag.saveError.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.flag.saveError.body',
                {
                  recordKind: this.recordKind(),
                }
              )} ${error.message}`,
            },
            undefined,
            error
          )
        },
      })
  }
}
