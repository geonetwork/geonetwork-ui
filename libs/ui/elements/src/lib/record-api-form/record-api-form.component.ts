import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MimeType, OgcApiEndpoint, WfsEndpoint } from '@camptocamp/ogc-client'
import {
  DatasetServiceDistribution,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import { mimeTypeToFormat } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs'
import {
  CopyTextButtonComponent,
  DropdownChoice,
  DropdownSelectorComponent,
  TextInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { MatTooltipModule } from '@angular/material/tooltip'

const DEFAULT_PARAMS = {
  OFFSET: '',
  LIMIT: '-1',
  FORMAT: 'application/json',
}

@Component({
  selector: 'gn-ui-record-api-form',
  templateUrl: './record-api-form.component.html',
  styleUrls: ['./record-api-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    DropdownSelectorComponent,
    CopyTextButtonComponent,
    TranslateDirective,
    MatTooltipModule,
  ],
})
export class RecordApiFormComponent {
  @Input() set apiLink(value: DatasetServiceDistribution) {
    this.outputFormats = [{ value: 'application/json', label: 'JSON' }]
    this.accessServiceProtocol = value ? value.accessServiceProtocol : undefined
    this.apiFeatureType = value ? value.name : undefined
    if (value) {
      this.apiBaseUrl = value.url.href
      this.createEndpoint().then(() => this.parseOutputFormats())
    }
    this.resetUrl()
  }

  offset$ = new BehaviorSubject(DEFAULT_PARAMS.OFFSET)
  limit$ = new BehaviorSubject(DEFAULT_PARAMS.LIMIT)
  format$ = new BehaviorSubject(DEFAULT_PARAMS.FORMAT)
  endpoint$ = new BehaviorSubject<WfsEndpoint | OgcApiEndpoint | undefined>(
    undefined
  )
  apiBaseUrl: string
  apiFeatureType: string
  supportOffset = true
  accessServiceProtocol: ServiceProtocol | undefined
  outputFormats: DropdownChoice[] = [
    { value: 'application/json', label: 'JSON' },
  ]
  endpoint: WfsEndpoint | OgcApiEndpoint | undefined

  apiQueryUrl$ = combineLatest([
    this.offset$,
    this.limit$,
    this.format$,
    // only compute the url if the endpoint was created
    this.endpoint$.pipe(filter((endpoint) => !!endpoint)),
  ]).pipe(
    switchMap(([offset, limit, format]) =>
      this.generateApiQueryUrl(offset, limit, format)
    )
  )

  noLimitChecked$ = this.limit$.pipe(
    map((limit) => limit === '-1' || limit === '')
  )
  displayLimit$ = this.limit$.pipe(
    map((limit) => (limit !== '-1' ? limit : ''))
  )

  setOffset(value: string) {
    this.offset$.next(value)
  }

  setLimit(value: string) {
    this.limit$.next(value === '' ? '-1' : value)
  }

  setFormat(value: string | unknown) {
    this.format$.next(String(value))
  }

  resetUrl() {
    this.offset$.next(DEFAULT_PARAMS.OFFSET)
    this.limit$.next(DEFAULT_PARAMS.LIMIT)
    this.format$.next(DEFAULT_PARAMS.FORMAT)
  }

  async parseOutputFormats() {
    if (!this.endpoint) return
    const outputFormats = (await this.getOutputFormats()).map(
      this.mimeTypeToFormatName
    )

    this.outputFormats = this.outputFormats
      .concat(outputFormats.filter(Boolean))
      .filter(
        (format, index, self) =>
          index === self.findIndex((t) => t.value === format.value)
      )
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  mimeTypeToFormatName(mimeType: MimeType): DropdownChoice | null {
    const formatName = mimeTypeToFormat(mimeType)
    return formatName
      ? { label: formatName.toUpperCase(), value: mimeType }
      : null
  }

  async getOutputFormats(): Promise<MimeType[]> {
    if (!this.endpoint) return []
    if (this.endpoint instanceof WfsEndpoint) {
      this.supportOffset = this.endpoint.supportsStartIndex()
      return this.endpoint.getServiceInfo().outputFormats
    } else {
      return (await this.endpoint.getCollectionInfo(this.apiFeatureType))
        .itemFormats
    }
  }

  async createEndpoint() {
    if (!this.apiBaseUrl || !this.accessServiceProtocol) return
    if (this.accessServiceProtocol === 'wfs') {
      this.endpoint = new WfsEndpoint(this.apiBaseUrl)
      await (this.endpoint as WfsEndpoint).isReady()
    } else {
      this.endpoint = new OgcApiEndpoint(this.apiBaseUrl)
      const collections = await this.endpoint.allCollections
      // if there's only one collection, use this instead of the name given in the link.
      if (collections.length === 1) {
        this.apiFeatureType = collections[0].name
      }
    }
    this.endpoint$.next(this.endpoint)
  }

  async generateApiQueryUrl(
    offset: string,
    limit: string,
    format: string
  ): Promise<string> {
    if (!this.apiBaseUrl || !this.endpoint || !this.apiFeatureType) return ''

    const options = {
      outputFormat: format,
      startIndex: offset ? Number(offset) : undefined,
      maxFeatures: limit !== '-1' ? Number(limit) : undefined,
      limit: limit !== '-1' ? Number(limit) : -1,
      offset: offset !== '' ? Number(offset) : undefined,
      outputCrs:
        format.toLowerCase().indexOf('json') > -1 ? 'EPSG:4326' : undefined,
    }

    if (this.endpoint instanceof WfsEndpoint) {
      delete options.limit
      options.maxFeatures = limit !== '-1' ? Number(limit) : undefined
      return this.endpoint.getFeatureUrl(this.apiFeatureType, options)
    } else {
      delete options.outputCrs
      return await this.endpoint.getCollectionItemsUrl(
        this.apiFeatureType,
        options
      )
    }
  }
}
