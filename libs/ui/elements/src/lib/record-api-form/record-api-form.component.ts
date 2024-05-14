import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { OgcApiEndpoint, WfsEndpoint } from '@camptocamp/ogc-client'
import {
  DatasetServiceDistribution,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import { mimeTypeToFormat } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs'

const DEFAULT_PARAMS = {
  OFFSET: '',
  LIMIT: '-1',
  FORMAT: 'json',
}
@Component({
  selector: 'gn-ui-record-api-form',
  templateUrl: './record-api-form.component.html',
  styleUrls: ['./record-api-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordApiFormComponent {
  @Input() set apiLink(value: DatasetServiceDistribution) {
    this.apiBaseUrl = value ? value.url.href : undefined
    this.outputFormats = [{ value: 'json', label: 'JSON' }]
    this.accessServiceProtocol = value ? value.accessServiceProtocol : undefined
    this.apiFeatureType = value ? value.name : undefined
    if (this.apiBaseUrl) {
      this.parseOutputFormats()
    }
    this.resetUrl()
  }
  offset$ = new BehaviorSubject('')
  limit$ = new BehaviorSubject('')
  format$ = new BehaviorSubject('')
  apiBaseUrl: string
  apiFeatureType: string
  supportOffset = true
  accessServiceProtocol: ServiceProtocol | undefined
  outputFormats = [{ value: 'json', label: 'JSON' }]

  apiQueryUrl$ = combineLatest([this.offset$, this.limit$, this.format$]).pipe(
    switchMap(async ([offset, limit, format]) => {
      let outputUrl
      if (this.apiBaseUrl) {
        const url = new URL(this.apiBaseUrl)
        const params = { offset: offset, limit: limit, f: format }
        for (const [key, value] of Object.entries(params)) {
          if (value && value !== '0') {
            url.searchParams.set(key, value)
          } else {
            url.searchParams.delete(key)
          }
        }
        outputUrl = url.toString()
      }

      if (this.accessServiceProtocol === 'wfs') {
        const wfsEndpoint = new WfsEndpoint(this.apiBaseUrl)
        if (await wfsEndpoint.isReady()) {
          const options = {
            outputFormat: format,
            startIndex: Number(offset),
          }
          if (limit !== '-1') {
            options['maxFeatures'] = Number(limit)
          }
          outputUrl = wfsEndpoint.getFeatureUrl(this.apiFeatureType, options)
        }
      }
      return outputUrl
    })
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
    const newLimit = value === '' ? '-1' : value
    this.limit$.next(newLimit)
  }

  setFormat(value: string | unknown) {
    this.format$.next(String(value))
  }

  resetUrl() {
    this.offset$.next(DEFAULT_PARAMS.OFFSET)
    this.limit$.next(DEFAULT_PARAMS.LIMIT)
    this.format$.next(DEFAULT_PARAMS.FORMAT)
  }

  parseOutputFormats() {
    const apiUrl =
      this.apiBaseUrl.slice(-1) === '?'
        ? this.apiBaseUrl.slice(0, -1)
        : this.apiBaseUrl

    this.getOutputFormats(apiUrl, this.accessServiceProtocol).then(
      (outputFormats) => {
        let formatsList = []
        if ('itemFormats' in outputFormats) {
          formatsList = this.mapFormats(outputFormats.itemFormats)
        } else if ('outputFormats' in outputFormats) {
          formatsList = this.mapFormats(outputFormats.outputFormats)
        }
        this.outputFormats = this.outputFormats.concat(
          formatsList.filter(Boolean)
        )
        this.outputFormats = this.outputFormats
          .filter(
            (format, index, self) =>
              index === self.findIndex((t) => t.value === format.value)
          )
          .sort((a, b) => a.label.localeCompare(b.label))
      }
    )
  }

  mapFormats(formats: any[]) {
    return formats.map((format) => {
      const normalizedFormat = mimeTypeToFormat(format)
      if (normalizedFormat) {
        return {
          label: normalizedFormat.toUpperCase(),
          value: normalizedFormat,
        }
      }
      return null
    })
  }

  async getOutputFormats(url: string, accessServiceProtocol: string) {
    if (accessServiceProtocol === 'wfs') {
      const endpoint = await new WfsEndpoint(url).isReady()
      this.supportOffset = endpoint.supportsStartIndex()
      return endpoint.getServiceInfo()
    } else {
      const endpoint = await new OgcApiEndpoint(url)
      const firstCollection = (await endpoint.featureCollections)[0]
      return endpoint.getCollectionInfo(firstCollection)
    }
  }
}
