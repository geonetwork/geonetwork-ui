import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { map } from 'rxjs/operators'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'md-editor-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
    BadgeComponent,
  ],
})
export class DashboardMenuComponent {
  draftsCount$ = this.recordsRepository
    .getAllDrafts()
    .pipe(map((drafts) => drafts.length))

  constructor(private recordsRepository: RecordsRepositoryInterface) {}
}
