import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-content-ghost',
  templateUrl: './content-ghost.component.html',
  styleUrls: ['./content-ghost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ContentGhostComponent {
  @Input() showContent: boolean
  @Input() ghostClass = ''
}
