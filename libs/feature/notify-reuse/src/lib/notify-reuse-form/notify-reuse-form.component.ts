import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ConnectedPosition,
  OverlayModule,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  iconoirAppWindow,
  iconoirPlusCircle,
  iconoirXmark,
} from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-notify-reuse-form',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    TextInputComponent,
    ButtonComponent,
    TranslatePipe,
    TranslateDirective,
    NgIcon,
  ],
  templateUrl: './notify-reuse-form.component.html',
  styleUrl: './notify-reuse-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      iconoirAppWindow,
      iconoirPlusCircle,
      iconoirXmark,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class NotifyReuseFormComponent {
  private scrollStrategies = inject(ScrollStrategyOptions)

  @Input() record: ReuseRecord | null = null
  @Output() recordChange = new EventEmitter<ReuseRecord>()

  overlayOpen = false
  scrollStrategy = this.scrollStrategies.reposition()
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ]

  toggleOverlay() {
    this.overlayOpen = !this.overlayOpen
  }

  closeOverlay() {
    this.overlayOpen = false
  }
}
