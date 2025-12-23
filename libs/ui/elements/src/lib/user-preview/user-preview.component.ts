import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model.js'
import { AvatarComponent } from '../avatar/avatar.component.js'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'gn-ui-user-preview',
  templateUrl: './user-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, MatTooltipModule],
  standalone: true,
})
export class UserPreviewComponent {
  @Input() user: UserModel
  @Input() avatarPlaceholder?: string

  get userFullName() {
    return (this.user.name + ' ' + this.user.surname).trim()
  }
}
