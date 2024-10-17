import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatTooltipModule } from '@angular/material/tooltip'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DatasetServiceDistribution,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-online-service-resource-input',
  templateUrl: './online-service-resource-input.component.html',
  styleUrls: ['./online-service-resource-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
    TextInputComponent,
    TranslateModule,
  ],
})
export class OnlineServiceResourceInputComponent implements OnChanges {
  @Input() service: Omit<DatasetServiceDistribution, 'url'>
  @Input() protocolHint?: string

  selectedProtocol: ServiceProtocol

  protocolOptions: {
    label: string
    value: ServiceProtocol
  }[] = [
    {
      label: 'OGC API',
      value: 'ogcFeatures',
    },
    {
      label: 'WFS',
      value: 'wfs',
    },
    {
      label: 'WMS',
      value: 'wms',
    },
    {
      label: 'WMTS',
      value: 'wmts',
    },
    {
      label: 'WPS',
      value: 'wps',
    },
    {
      label: 'ESRI REST',
      value: 'esriRest',
    },
    {
      label: marker('editor.record.onlineResource.protocol.other'),
      value: 'other',
    },
  ]

  ngOnChanges() {
    this.selectedProtocol =
      this.protocolOptions.find(
        (option) => option.value === this.service.accessServiceProtocol
      )?.value ?? 'other'
  }
}
