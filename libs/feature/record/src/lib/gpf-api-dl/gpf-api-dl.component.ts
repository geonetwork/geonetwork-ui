import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { BehaviorSubject, combineLatest, map, mergeMap, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Choice, DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import axios from 'axios'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { GpfApiDlListItemComponent } from '../gpf-api-dl-list-item/gpf-api-dl-list-item.component'

export interface Label {
  label: string
}

export interface FormatProduit {
  title: string
  update: string
  format: Array<TermBucket>
  zone: Array<TermBucket>
}

export interface FormatSortieProduit {
  label: string
  value: string | number
}
export interface ListUrl {
  url: string
}

export interface ListChoice {
  zone: Choice[]
  format: Choice[]
  editionDate: Choice[]
  crs: Choice[]
}

export interface TermBucket {
  term: string
  label: string | number
}

export interface Field {
  entry: Array<any>
  link: any
}

@Component({
  selector: 'gn-ui-gpf-api-dl',
  templateUrl: './gpf-api-dl.component.html',
  styleUrls: ['./gpf-api-dl.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    DropdownSelectorComponent,
    GpfApiDlListItemComponent,
  ],
})
export class GpfApiDlComponent implements OnInit {
  isOpen = false
  collapsed = false
  initialLimit = 50
  apiBaseUrl: string
  editionDate$ = new BehaviorSubject('')
  zone$ = new BehaviorSubject('')
  format$ = new BehaviorSubject('')
  crs$ = new BehaviorSubject('')
  page$ = new BehaviorSubject(1)
  url =
    'https://data.geopf.fr/telechargement/capabilities?outputFormat=application/json'
  choices: any
  bucketPromisesZone: Choice[]
  bucketPromisesFormat: Choice[]
  bucketPromisesCrs: Choice[]

  constructor(protected http: HttpClient) {}

  @Input() set apiLink(value: DatasetServiceDistribution) {
    this.apiBaseUrl = value ? value.url.href : undefined
  }

  ngOnInit(): void {
    this.bucketPromisesZone = [{ value: '', label: 'ZONE' }]
    this.bucketPromisesFormat = [{ value: '', label: 'FORMAT' }]
    this.bucketPromisesCrs = [{ value: '', label: 'CRS' }]
    this.getFields()
  }

  apiQueryUrl$ = combineLatest([
    this.zone$,
    this.format$,
    this.editionDate$,
    this.crs$,
    this.page$,
  ]).pipe(
    map(([zone, format, editionDate, crs, page]) => {
      let outputUrl
      if (this.apiBaseUrl) {
        const url = new URL(this.apiBaseUrl) // initialisation de l'url avec l'url de base
        const params = {
          zone: zone,
          format: format,
          editionDate: editionDate,
          crs: crs,
          page: page,
        } // initialisation des paramètres de filtres
        for (const [key, value] of Object.entries(params)) {
          if (value && value !== 'null') {
            url.searchParams.set(key, String(value))
          } else {
            url.searchParams.delete(key)
          }
        }
        outputUrl = url.toString()
      } else {
        console.error('erreur apibaseUrl null')
      }
      return outputUrl
    })
  )

  listFilteredProduct$ = this.apiQueryUrl$.pipe(
    mergeMap((url) => {
      return this.getFilteredProduct$(url).pipe(
        map((response) => response['entry'])
      )
    })
  )

  pageMax$ = this.apiQueryUrl$.pipe(
    mergeMap((url) => {
      return this.getFilteredProduct$(url).pipe(
        map((response) =>
          Math.ceil(response['totalentries'] / Number(this.initialLimit))
        )
      )
    })
  )

  getFilteredProduct$(url): Observable<any> {
    return this.http.get(url)
  }

  getLinkFormat(produit): string {
    return produit['format'][0]['label']
  }

  setEditionDate(value: string) {
    if (value.match(/[0-9]{4}-[0-1][0-9]-[0-3][0-9]/)) {
      this.editionDate$.next(value)
      this.resetPage()
    }
  }

  setZone(value: string) {
    if (this.bucketPromisesZone.map((choice) => choice.value).includes(value)) {
      this.zone$.next(value)
      this.resetPage()
    }
  }

  setCrs(value: string) {
    if (this.bucketPromisesCrs.map((choice) => choice.value).includes(value)) {
      this.crs$.next(value)
      this.resetPage()
    }
  }

  setFormat(value: string) {
    if (
      this.bucketPromisesFormat.map((choice) => choice.value).includes(value)
    ) {
      this.format$.next(value)
      this.resetPage()
    }
  }

  resetUrl() {
    this.zone$.next('null')
    this.format$.next('null')
    this.crs$.next('null')
    this.page$.next(1)
  }
  moreResult(): void {
    this.page$.next(this.page$.value + 1)
  }

  lessResult(): void {
    this.page$.next(this.page$.value - 1)
  }

  resetPage(): void {
    this.page$.next(1)
  }

  async getCapabilities() {
    let page = 0
    let choicesTest = undefined
    let pageCount = 1

    while (choicesTest === undefined && pageCount > page) {
      const response = await axios.get(
        this.url.concat(`&limit=200&page=${page}`)
      )

      choicesTest = response.data.entry.filter(
        (element) => element['id'] == this.apiBaseUrl
      )[0]
      page += 1
      pageCount = response.data.pagecount
    }

    return choicesTest
  }
  async getFields() {
    this.choices = await this.getCapabilities()

    const tempZone = this.choices.zone.map((bucket) => ({
      value: bucket.term,
      label: bucket.label,
    }))
    tempZone.sort((a, b) => (a.label > b.label ? 1 : -1))
    tempZone.unshift({ value: 'null', label: 'ZONE' })

    this.bucketPromisesZone = tempZone

    const tempFormat = this.choices.format.map((bucket) => ({
      value: bucket.term,
      label: bucket.label,
    }))
    tempFormat.sort((a, b) => (a.label > b.label ? 1 : -1))
    tempFormat.unshift({ value: 'null', label: 'FORMAT' })

    this.bucketPromisesFormat = tempFormat

    const tempCrs = this.choices.category.map((bucket) => ({
      value: bucket.term,
      label: bucket.label,
    }))
    tempCrs.sort((a, b) => (a.label > b.label ? 1 : -1))
    tempCrs.unshift({ value: 'null', label: 'CRS' })

    this.bucketPromisesCrs = tempCrs

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  }
}
