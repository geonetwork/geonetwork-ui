import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandablePanelComponent {
  @Input() title: string
  @Input() collapsed = true

  toggle(): void {
    this.collapsed = !this.collapsed
  }
}
