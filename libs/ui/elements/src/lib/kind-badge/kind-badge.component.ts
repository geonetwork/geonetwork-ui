import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  iconoirDatabase,
  iconoirAppleWallet,
  iconoirCode,
  iconoirAppWindow,
} from '@ng-icons/iconoir'
import { TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.kind.dataset')
marker('record.kind.reuse')
marker('record.kind.service')

enum KindConfig {
  all = 'iconoirAppleWallet', // (this one is for filter)
  dataset = 'iconoirDatabase',
  service = 'iconoirCode',
  reuse = 'iconoirAppWindow',
}

@Component({
  selector: 'gn-ui-kind-badge',
  templateUrl: './kind-badge.component.html',
  styleUrls: ['./kind-badge.component.css'],
  viewProviders: [
    provideIcons({
      iconoirAppleWallet,
      iconoirDatabase,
      iconoirCode,
      iconoirAppWindow,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIconComponent, CommonModule, TranslatePipe],
})
export class KindBadgeComponent {
  @Input() styling = 'primary'
  @Input() contentTemplate: TemplateRef<unknown>
  @Input() kind: string
  @Input() extraClass = 'text-[0.85em]'

  hasProjectedContent = false

  get iconKind() {
    return KindConfig[this.kind] || KindConfig.dataset
  }

  get badgeClasses(): string {
    const baseClasses =
      'badge-btn text-xs px-2 font-bold shrink-0 flex items-center gap-2 h-6 min-h-6'

    switch (this.styling) {
      case 'outline':
        return `${baseClasses} bg-transparent border border-current py-1.5`
      case 'primary':
        return `${baseClasses} bg-primary py-0.5`
      case 'gray':
        return `${baseClasses} bg-gray-100 text-gray-900 py-0.5`
      default:
        return 'flex items-center gap-2'
    }
  }
}
