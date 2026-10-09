import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { TranslatePipe } from '@ngx-translate/core'
import { RecordFlag } from '@geonetwork-ui/common/domain/model'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { toSignal } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { MatTooltip } from '@angular/material/tooltip'
import { switchMap } from 'rxjs/operators'
import { matHelpOutline } from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-form-field-record-flags',
  standalone: true,
  imports: [AsyncPipe, CheckToggleComponent, TranslatePipe, NgIcon, MatTooltip],
  viewProviders: [
    provideIcons({
      matHelpOutline,
    }),
  ],
  templateUrl: './form-field-record-flags-component.html',
  styleUrls: ['./form-field-record-flags-component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRecordFlagsComponent {
  flagName = input<RecordFlag>()
  labelKey = input<string>()
  hintKey = input<string>()

  private editorFacade = inject(EditorFacade)
  private repository = inject(RecordsRepositoryInterface)

  private record = toSignal(this.editorFacade.record$)
  isInitialEnabled = this.editorFacade.record$.pipe(
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
      .subscribe()
  }
}
