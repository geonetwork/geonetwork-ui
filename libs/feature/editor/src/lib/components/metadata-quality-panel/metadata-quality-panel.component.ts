import { Component } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-metadata-quality-panel',
  standalone: true,
  imports: [TranslateDirective],
  templateUrl: './metadata-quality-panel.component.html',
  styleUrl: './metadata-quality-panel.component.css',
})
export class MetadataQualityPanelComponent {}
