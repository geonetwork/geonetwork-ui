import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-copy-text-button',
  templateUrl: './copy-text-button.component.html',
  styleUrls: ['./copy-text-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyTextButtonComponent {
  @Input() text: string
  @Input() tooltipText: string
  @Input() displayText = true

  copyText(event: MouseEvent) {
    navigator.clipboard.writeText(this.text)
    ;(event.target as HTMLElement).blur()
  }
}
