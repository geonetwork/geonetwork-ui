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
import { CommonModule } from '@angular/common'
import { CopyTextButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirSettings } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CopyTextButtonComponent,
    TranslateModule,
    MatTooltipModule,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      iconoirSettings,
    }),
  ],
})
export class ApiCardComponent implements OnInit, OnChanges {
  @Input() link: DatasetServiceDistribution
  @Input() currentLink: DatasetServiceDistribution
  @Input() set size(value: 'L' | 'M' | 'S' | 'XS') {
    switch (value) {
      case 'L':
        this.cardClass = 'gn-ui-card-l'
        break
      case 'M':
        this.cardClass = 'gn-ui-card-m'
        break
      case 'S':
        this.cardClass = 'gn-ui-card-s'
        break
      case 'XS':
        this.cardClass = 'gn-ui-card-xs'
        break
    }
  }
  cardClass = ''
  displayApiFormButton: boolean
  currentlyActive = false
  @Output() openRecordApiForm: EventEmitter<DatasetServiceDistribution> =
    new EventEmitter<DatasetServiceDistribution>()

  get generatedText() {
    return this.link.accessServiceProtocol === 'wfs'
      ? 'datahub.search.filter.generatedByWfs'
      : 'datahub.search.filter.generatedByAPI'
  }

  ngOnInit() {
    this.displayApiFormButton =
      this.link.accessServiceProtocol === 'ogcFeatures' ||
      this.link.accessServiceProtocol === 'wfs' ||
      this.link.accessServiceProtocol === 'GPFDL'
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
