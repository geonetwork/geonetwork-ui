import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  iconoirAppleShortcuts,
  iconoirAppleWallet,
  iconoirCode,
  iconoirCreditCard,
} from '@ng-icons/iconoir'
import { TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.kind.dataset')
marker('record.kind.reuse')
marker('record.kind.service')

enum KindConfig {
  all = 'iconoirAppleWallet', // (this one is for filter)
  dataset = 'iconoirAppleShortcuts',
  service = 'iconoirCode',
  reuse = 'iconoirCreditCard',
}

@Component({
  selector: 'gn-ui-kind-badge',
  templateUrl: './kind-badge.component.html',
  styleUrls: ['./kind-badge.component.css'],
  viewProviders: [
    provideIcons({
      iconoirAppleWallet,
      iconoirAppleShortcuts,
      iconoirCode,
      iconoirCreditCard,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIconComponent, CommonModule, TranslatePipe],
})
export class KindBadgeComponent {
  @Input() styling = 'default'
  @Input() contentTemplate: TemplateRef<unknown>
  @Input() kind: string

  hasProjectedContent = false

  get iconKind() {
    return KindConfig[this.kind] || KindConfig.dataset
  }

  get badgeClasses(): string {
    const baseClasses =
      'badge-btn text-white text-xs px-2 font-bold shrink-0 flex items-center h-6 min-h-6'

    switch (this.styling) {
      case 'outline':
        return `${baseClasses} bg-transparent border border-white py-1.5`
      case 'default':
        return `${baseClasses} bg-primary py-0.5`
      default:
        return 'flex items-center'
    }
  }
}
