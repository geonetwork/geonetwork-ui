import { CommonModule } from '@angular/common'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import {
  iconoirAppleWallet,
  iconoirAppleShortcuts,
  iconoirCode,
  iconoirCreditCard,
} from '@ng-icons/iconoir'
import { NgIconsModule } from '@ng-icons/core'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

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
  imports: [NgIconsModule, CommonModule, BadgeComponent, TranslateModule],
})
export class KindBadgeComponent {
  @Input() contentTemplate: TemplateRef<unknown>
  @Input() extraClass = ''
  @Input() kind: string
  @Input() mapper = (value: string) => value

  hasProjectedContent = false

  get displayKind() {
    return this.mapper(this.kind)
  }

  get iconKind() {
    return KindConfig[this.displayKind] || KindConfig.dataset
  }
}
