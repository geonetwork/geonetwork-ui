import { Component, OnInit } from '@angular/core'
import { ColorService, RecordSummary } from '@lib/common'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  selectedMetadata: RecordSummary
  subscription: Subscription

  constructor() {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.selectedMetadata = null
  }

  onMetadataSelection(metadata: RecordSummary): void {
    this.selectedMetadata = metadata
  }
}
