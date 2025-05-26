import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateDirective } from '@ngx-translate/core'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { startWith, switchMap } from 'rxjs/operators'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import {
  matChatBubbleOutlineOutline,
  matLabelOutline,
} from '@ng-icons/material-icons/outline'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirCalendar,
  iconoirJournal,
  iconoirJournalPage,
  iconoirLightBulbOn,
  iconoirPageEdit,
  iconoirUser,
} from '@ng-icons/iconoir'

@Component({
  selector: 'md-editor-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateDirective,
    BadgeComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      matChatBubbleOutlineOutline,
      iconoirJournal,
      iconoirCalendar,
      iconoirUser,
      matLabelOutline,
      iconoirJournalPage,
      iconoirPageEdit,
      iconoirLightBulbOn,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
})
export class DashboardMenuComponent {
  draftsCount$ = this.recordsRepository.draftsChanged$.pipe(
    startWith(0),
    switchMap(() => this.recordsRepository.getDraftsCount())
  )
  activeLink = false

  constructor(private recordsRepository: RecordsRepositoryInterface) {}
}
