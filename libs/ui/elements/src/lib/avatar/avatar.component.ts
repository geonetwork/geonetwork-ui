import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AvatarComponent {
  @Input() avatarUrl?: string
  @Input() avatarPlaceholder?: string

  hideImage() {
    this.avatarUrl = this.avatarPlaceholder
  }
}
