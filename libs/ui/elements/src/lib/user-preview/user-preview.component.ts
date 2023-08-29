import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'

@Component({
  selector: 'gn-ui-user-preview',
  templateUrl: './user-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
  @Input() user: UserModel
  @Input() avatarPlaceholder?: string

  get userFullName() {
    return (this.user.name + ' ' + this.user.surname).trim()
  }
}
