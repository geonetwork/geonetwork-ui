import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matContentCopy } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-copy-text-button',
  templateUrl: './copy-text-button.component.html',
  styleUrls: ['./copy-text-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgIcon],
  viewProviders: [provideIcons({ matContentCopy })],
})
export class CopyTextButtonComponent {
  @Input() text: string
  @Input() tooltipText: string
  @Input() displayText = true
  @Input() rows = 1

  copyText(event: MouseEvent) {
    navigator.clipboard.writeText(this.text)
    ;(event.target as HTMLElement).blur()
  }
}
