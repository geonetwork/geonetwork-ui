import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { combineLatest, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import {
  GroupsApiService,
  RecordsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'

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

  record$ = this.facade.record$
  activeUser$: Observable<UserModel>

  constructor(
    private facade: EditorFacade,
    private recordsApiService: RecordsApiService,
    private platformService: PlatformServiceInterface,
    private groupApiService: GroupsApiService
  ) {
    this.activeUser$ = this.platformService.getMe()
  }

  saveRecord() {
    combineLatest([this.activeUser$, this.record$])
      .pipe(take(1))
      .subscribe(([userId, record]) => {
        this.groupApiService.getGroups().subscribe((groups) => {
          const groupId = groups.find(
            (grp) => grp.name === record.ownerOrganization.name
          )
          // setting to 0 by default because the API expects a number and not null & most records don't have a group
          this.recordsApiService
            .setRecordOwnership(
              record.uniqueIdentifier,
              groupId ? groupId.id : 0,
              Number(userId.id)
            )
            .subscribe(
              () => {
                this.facade.saveRecord()
              },
              (error) => {
                console.log('Error setting ownership :', error)
              }
            )
        })
      })
  }
}
