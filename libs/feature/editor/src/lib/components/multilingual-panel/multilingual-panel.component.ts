import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-multilingual-panel',
  standalone: true,
  imports: [CommonModule, CheckToggleComponent, TranslateModule],
  templateUrl: './multilingual-panel.component.html',
  styleUrl: './multilingual-panel.component.css',
})
export class MultilingualPanelComponent {
  translationsEnabled = false
}
