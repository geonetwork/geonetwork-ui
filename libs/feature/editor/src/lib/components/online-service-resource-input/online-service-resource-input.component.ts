import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatTooltipModule } from '@angular/material/tooltip'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DatasetServiceDistribution,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import {
  ButtonComponent,
  TextInputComponent,
  UrlInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCloudUpload } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-online-service-resource-input',
  templateUrl: './online-service-resource-input.component.html',
  styleUrls: ['./online-service-resource-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatRadioModule,
    NgIconComponent,
    TextInputComponent,
    TranslateModule,
    UrlInputComponent,
  ],
  providers: [
    provideIcons({ iconoirCloudUpload }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class OnlineServiceResourceInputComponent implements OnChanges {
  @Input() service: Omit<DatasetServiceDistribution, 'url'>
  @Input() protocolHint?: string
  @Input() disabled? = false
  @Output() urlChange: EventEmitter<string> = new EventEmitter()
  @Output() identifierSubmit: EventEmitter<string> = new EventEmitter()

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

  handleUrlChange(url: string) {
    if (!url) return
    this.urlChange.emit(url)
  }

  submitIdentifier(identifier: string) {
    if (!identifier) return
    this.identifierSubmit.emit(identifier)
    this.service.identifierInService = null
  }

  getIdentifierPlaceholder(): string {
    const baseKey =
      'editor.record.form.field.onlineResource.edit.identifier.placeholder'
    return this.service.accessServiceProtocol === 'wps'
      ? `${baseKey}.wps`
      : baseKey
  }
}
