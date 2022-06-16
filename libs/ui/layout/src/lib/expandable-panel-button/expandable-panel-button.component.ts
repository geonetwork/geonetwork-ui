import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'gn-ui-expandable-panel-button',
  templateUrl: './expandable-panel-button.component.html',
  styleUrls: ['./expandable-panel-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandablePanelButtonComponent {
  @Input() titleTemplate: TemplateRef<any>
  @Input() collapsed = true

  toggle(): void {
    this.collapsed = !this.collapsed
  }
}
