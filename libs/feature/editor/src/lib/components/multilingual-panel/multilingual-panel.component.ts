import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-multilingual-panel',
  standalone: true,
  imports: [
    CommonModule,
    CheckToggleComponent,
    TranslateDirective,
    TranslatePipe,
  ],
  templateUrl: './multilingual-panel.component.html',
  styleUrl: './multilingual-panel.component.css',
})
export class MultilingualPanelComponent {
  translationsEnabled = false
}
