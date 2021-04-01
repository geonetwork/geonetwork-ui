import { Component } from '@angular/core'
import { ColorService, RecordSummary } from '@lib/common'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  selectedMetadata: RecordSummary

  constructor() {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }

  onMetadataSelection(metadata: RecordSummary): void {
    this.selectedMetadata = metadata
  }
}
