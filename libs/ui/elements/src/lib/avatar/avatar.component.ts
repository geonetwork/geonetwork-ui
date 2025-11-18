import { ChangeDetectionStrategy, Component, Input } from '@angular/core'


@Component({
  selector: 'gn-ui-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AvatarComponent {
  @Input() avatarUrl?: string
  @Input() avatarPlaceholder?: string

  hideImage() {
    this.avatarUrl = this.avatarPlaceholder
  }
}
