import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matWarningAmberOutline } from '@ng-icons/material-icons/outline'

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
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class ApplicationBannerComponent {
  @Input() message: string
}
