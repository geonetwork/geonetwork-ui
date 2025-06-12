import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'md-editor-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    InteractiveTableComponent,
    InteractiveTableColumnComponent,
  ],
})
export class UsersListComponent {
  @Input() users: UserModel[]
}
