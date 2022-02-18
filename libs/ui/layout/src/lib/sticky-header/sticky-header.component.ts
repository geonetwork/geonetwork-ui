import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyHeaderComponent {
  @Input() minHeight = '200px'
}
