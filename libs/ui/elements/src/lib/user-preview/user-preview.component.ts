import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UserModel } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-user-preview',
  templateUrl: './user-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
  @Input() user: UserModel
}
