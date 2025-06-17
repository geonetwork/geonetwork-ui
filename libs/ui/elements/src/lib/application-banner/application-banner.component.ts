import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matCloseOutline,
  matInfoOutline,
  matWarningAmberOutline,
} from '@ng-icons/material-icons/outline'
import { matWarning } from '@ng-icons/material-icons/baseline'

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
      matInfoOutline,
      matCloseOutline,
      matWarning,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class ApplicationBannerComponent {
  @Input() message: string
  @Input() title: string
  @Input() closeEnabled = false
  @Input() extraClass = ''
  @Input() icon = ''
  msgClass = ''
  bannerOpen = true

  @Input() set type(value: 'primary' | 'secondary' | 'light') {
    switch (value) {
      case 'primary':
        this.msgClass = 'bg-primary-darkest border-primary text-white'
        this.icon = 'matWarning'
        break
      case 'light':
        this.msgClass =
          'bg-primary-opacity-10 border-primary-lightest text-black'
        this.icon = 'matInfoOutline'
        break
      case 'secondary':
      default:
        this.msgClass = 'bg-primary-opacity-50 border-primary-darker text-black'
        this.icon = 'matWarningAmberOutline'
        break
    }
  }

  get classList() {
    if (this.message.length > 200 && !this.closeEnabled) {
      return `${this.msgClass} ${this.extraClass} overflow-y-scroll items-start max-h-16`
    }
    return `${this.msgClass} ${this.extraClass} items-center`
  }

  closeMessage() {
    this.bannerOpen = false
  }
}
