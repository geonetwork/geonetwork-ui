import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import { matExpandLess, matExpandMore } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-expandable-panel-button',
  templateUrl: './expandable-panel-button.component.html',
  styleUrls: ['./expandable-panel-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ matExpandMore, matExpandLess })],
  standalone: true,
})
export class ExpandablePanelButtonComponent {
  @Input() titleTemplate: TemplateRef<any>
  @Input() collapsed = true

  toggle(): void {
    this.collapsed = !this.collapsed
  }
}
