import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matCloseOutline,
  matWarningAmberOutline,
} from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-application-banner',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application-banner.component.html',
  styleUrl: './application-banner.component.css',
  providers: [
    provideIcons({
      matWarningAmberOutline,
      matCloseOutline,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class ApplicationBannerComponent {
  @Input() message: string
  @Input() title: string
  @Input() closeEnabled = false
  @Input() extraClass = ''
  @Input() icon = 'matWarningAmberOutline'
  msgClass = ''

  @Input() set type(value: 'primary' | 'secondary' | 'light') {
    switch (value) {
      case 'primary':
        this.msgClass = 'bg-primary-darkest border-primary text-white'
        break
      case 'secondary':
        this.msgClass = 'bg-primary-opacity-50 border-primary-darker text-black'
        break
      case 'light':
        this.msgClass =
          'bg-primary-opacity-10 border-primary-lightest text-black'
        break
      default:
        this.msgClass = 'bg-primary-opacity-50 border-primary-darker text-black'
        break
    }
  }

  get classList() {
    return `${this.msgClass} ${this.extraClass}`
  }

  closeMessage() {
    this.message = ''
  }
}
