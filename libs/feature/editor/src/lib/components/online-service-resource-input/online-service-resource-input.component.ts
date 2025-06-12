import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
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
import { createFuzzyFilter, getLayers } from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirRefresh } from '@ng-icons/iconoir'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs'

marker('editor.record.form.field.onlineResource.edit.identifier.placeholder')
marker(
  'editor.record.form.field.onlineResource.edit.identifier.placeholder.wps'
)

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
    TranslateDirective,
    TranslatePipe,
    UrlInputComponent,
  ],
  providers: [
    provideIcons({ iconoirRefresh }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class OnlineServiceResourceInputComponent {
  _service: DatasetServiceDistribution
  @Input() set service(service: DatasetServiceDistribution) {
    this._service = { ...service }
  }
  @Input() protocolHint?: string
  @Input() disabled? = false
  @Input() modifyMode? = false
  @Output() serviceChange: EventEmitter<DatasetServiceDistribution> =
    new EventEmitter()

  errorMessage = false
  resetUrlOnChange = Math.random()

  layersSubject = new BehaviorSubject<{ name?: string; title?: string }[]>([])
  layers$: Observable<{ name?: string; title?: string }[]> =
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
      this._service.accessServiceProtocol
    )
  }

  handleUrlValueChange(url: string) {
    this._service.url = url ? new URL(url) : undefined
    this.resetLayersSuggestion()
  }

  async handleUploadClick(url: string) {
    try {
      const layers = await getLayers(url, this._service.accessServiceProtocol)

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
    this.resetUrlOnChange = Math.random()
    this._service.url = null
    this.resetLayersSuggestion()
  }

  resetLayersSuggestion() {
    this.errorMessage = false
    this.layersSubject.next([])
    this._service.identifierInService = null
  }

  submit() {
    this.serviceChange.emit({
      ...this._service,
      name: this._service.identifierInService, // should we keep the identifierInService? read-write duplicate with name
    })
    this._service.accessServiceProtocol = 'ogcFeatures'
    this.resetAllFormFields()
  }

  getIdentifierPlaceholder(): string {
    const baseKey =
      'editor.record.form.field.onlineResource.edit.identifier.placeholder'
    return this._service.accessServiceProtocol === 'wps'
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
    this._service.identifierInService = val.name // should we keep the identifierInService? read-write duplicate with name
    this._service.description = val.title
  }
}
