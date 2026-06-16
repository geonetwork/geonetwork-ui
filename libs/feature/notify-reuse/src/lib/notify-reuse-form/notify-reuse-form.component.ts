import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirPlusCircle, iconoirXmark } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-notify-reuse-form',
  standalone: true,
  imports: [
    CommonModule,
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
      iconoirPlusCircle,
      iconoirXmark,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class NotifyReuseFormComponent {
  @Input() record: ReuseRecord | null = null
  @Output() recordChange = new EventEmitter<ReuseRecord>()
}
