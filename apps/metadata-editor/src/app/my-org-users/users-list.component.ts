import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'md-editor-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InteractiveTableComponent,
    InteractiveTableColumnComponent,
    UiInputsModule,
  ],
})
export class UsersListComponent {
  @Input() users: UserModel[]
}
