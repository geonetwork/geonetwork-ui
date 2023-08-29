import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatarUrl?: string

  hideImage() {
    this.avatarUrl = 'https://www.gravatar.com/avatar/?d=mp'
  }
}
