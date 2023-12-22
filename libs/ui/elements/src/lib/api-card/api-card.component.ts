import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'gn-ui-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCardComponent implements OnInit, OnChanges {
  @Input() link: DatasetServiceDistribution
  @Input() currentLink: DatasetServiceDistribution
  displayApiFormButton: boolean
  currentlyActive = false
  @Output() openRecordApiForm: EventEmitter<DatasetServiceDistribution> =
    new EventEmitter<DatasetServiceDistribution>()

  ngOnInit() {
    this.displayApiFormButton =
      this.link.accessServiceProtocol === 'ogcFeatures' ? true : false
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentlyActive =
      changes.currentLink.currentValue === this.link ? true : false
  }

  openRecordApiFormPanel() {
    if (this.displayApiFormButton) {
      this.currentlyActive = !this.currentlyActive
      this.openRecordApiForm.emit(this.currentlyActive ? this.link : undefined)
    }
  }
}
