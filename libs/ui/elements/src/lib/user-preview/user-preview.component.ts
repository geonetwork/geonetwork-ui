import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'
import { GravatarService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-user-preview',
  templateUrl: './user-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
  @Input() user: UserModel
  @Input() avatarPlaceholder: string

  constructor(private gs: GravatarService) {}

  get userProfileIcon() {
    return this.gs.getUserProfileIconFromHash(
      this.user.hash,
      this.avatarPlaceholder
    )
  }

  get userFullName() {
    return (this.user.name + ' ' + this.user.surname).replace(
      /(^\w|\s\w)/g,
      (m) => m.toUpperCase()
    )
  }
}
