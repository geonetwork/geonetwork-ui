import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { combineLatest, Observable } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCloudUpload } from '@ng-icons/iconoir'
import { matCheckCircleOutline } from '@ng-icons/material-icons/outline'

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
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirCloudUpload, matCheckCircleOutline }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
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

  record$ = this.facade.record$

  constructor(
    private facade: EditorFacade,
    private recordsApiService: RecordsApiService,
    private platformService: PlatformServiceInterface
  ) {}

  saveRecord() {
    this.facade.saveRecord()
    this.facade.saveSuccess$
      .pipe(
        take(1),
        switchMap(() =>
          combineLatest([this.platformService.getMe(), this.record$]).pipe(
            take(1)
          )
        ),
        switchMap(([userId, record]) =>
          this.recordsApiService.setRecordOwnership(
            record.uniqueIdentifier,
            0,
            Number(userId.id)
          )
        )
      )
      .subscribe()
  }
}
