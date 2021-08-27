import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gn-ui-content-ghost',
  templateUrl: './content-ghost.component.html',
  styleUrls: ['./content-ghost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentGhostComponent {}
