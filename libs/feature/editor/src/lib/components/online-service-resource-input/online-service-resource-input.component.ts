import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
  AutocompleteComponent,
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
import { createFuzzyFilter, getLayers } from '@geonetwork-ui/util/shared'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs'

@Component({
  selector: 'gn-ui-online-service-resource-input',
  templateUrl: './online-service-resource-input.component.html',
  styleUrls: ['./online-service-resource-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AutocompleteComponent,
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
export class OnlineServiceResourceInputComponent implements OnChanges, OnInit {
  @Input() service: DatasetServiceDistribution
  @Input() protocolHint?: string
  @Input() disabled? = false
  @Input() modifyMode? = false
  @Output() urlChange: EventEmitter<string> = new EventEmitter()
  @Output() identifierSubmit: EventEmitter<{
    url: string
    identifier: string
  }> = new EventEmitter()

  errorMessage = false
  selectedProtocol: ServiceProtocol
  url = ''
  layersSubject = new BehaviorSubject<{ name: string; title: string }[]>([])
  layers$: Observable<{ name: string; title: string }[]> =
    this.layersSubject.asObservable()

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

  constructor(private cdr: ChangeDetectorRef) {}

  get activeLayerSuggestion() {
    return !['wps', 'GPFDL', 'esriRest', 'other'].includes(
      this.service.accessServiceProtocol
    )
  }

  ngOnChanges() {
    this.selectedProtocol =
      this.protocolOptions.find(
        (option) => option.value === this.service.accessServiceProtocol
      )?.value ?? 'other'
  }

  ngOnInit() {
    if (this.service.url) {
      this.url = this.service.url.toString()
    }
  }

  handleUrlValueChange(url: string) {
    this.url = url
    this.service.url = url ? new URL(url) : undefined
    this.resetLayersSuggestion()
    this.urlChange.emit(this.url)
  }

  async handleUploadClick(url: string) {
    this.url = url

    try {
      const layers = await getLayers(url, this.service.accessServiceProtocol)

      if (layers.length === 0) {
        throw new Error('No layers found')
      }

      this.layersSubject.next([...layers])
    } catch (e) {
      this.errorMessage = true
      this.layersSubject.next([])
    }

    this.cdr.detectChanges()
  }

  resetAllFormFields() {
    this.url = ''
    this.service.url = null
    this.resetLayersSuggestion()
  }

  resetLayersSuggestion() {
    this.errorMessage = false
    this.layersSubject.next([])
    this.service.identifierInService = null
  }

  submitIdentifier(identifier: string) {
    if (!identifier) return
    this.identifierSubmit.emit({ url: this.url, identifier })
    this.service.identifierInService = null
  }

  getIdentifierPlaceholder(): string {
    const baseKey =
      'editor.record.form.field.onlineResource.edit.identifier.placeholder'
    return this.service.accessServiceProtocol === 'wps'
      ? `${baseKey}.wps`
      : baseKey
  }

  /**
   * gn-ui-autocomplete
   */
  displayWithFn(item: { name: string; title: string }) {
    return item.title
      ? `${item.title} ${item.name ? `(${item.name})` : ''}`
      : item.name
  }

  /**
   * gn-ui-autocomplete
   */
  autoCompleteAction = (query: string) => {
    const fuzzyFilter = createFuzzyFilter(query)
    return this.layers$.pipe(
      switchMap((layers) => [
        layers.filter((layer) => fuzzyFilter(layer.name)),
      ]),
      debounceTime(100),
      distinctUntilChanged()
    )
  }

  /**
   * gn-ui-autocomplete
   */
  handleSelectValue(val: { name: string; title: string }) {
    this.service.identifierInService = val.name
  }
}
