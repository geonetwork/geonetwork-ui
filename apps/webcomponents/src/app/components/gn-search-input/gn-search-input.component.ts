import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {
  SearchFacade,
  SearchService,
  SearchStateParams,
} from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'
import { FuzzySearchComponent } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { map, switchMap, first } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'wc-gn-search-input',
  templateUrl: './gn-search-input.component.html',
  styleUrls: ['./gn-search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
  standalone: false,
})
export class GnSearchInputComponent
  extends BaseComponent
  implements AfterViewInit {
  @Input() forceTrackPosition = ''
  @Input() openOnSearch: string
  @Input() openOnSelect: string
  @Input() placeholder?: string
  @Input() filter: string
  @ViewChild('searchInput') searchInput: FuzzySearchComponent

  private complexFilter: any = null

  autoCompleteAction = (query: string) => {
    if (!this.facade || !this.recordsRepository) {
      console.warn('SearchFacade or RecordsRepository not initialized yet')
      return of([])
    }

    if (this.complexFilter) {
      return this.recordsRepository.fuzzySearch(query, this.complexFilter)
        .pipe(map((result) => result.records))
    }

    return this.facade.configFilters$.pipe(
      first(),
      switchMap((configFilters) => {
        return this.recordsRepository.fuzzySearch(query, configFilters)
      }),
      map((result) => result.records)
    )
  }

  constructor() {
    super()
  }

  init(): void {
    super.init()
    this.setSearch_()
  }

  changes(): void {
    this.setSearch_()
  }

  ngAfterViewInit(): void {
    this.setSearch_()
  }

  private setSearch_() {
    const filter = this.filter

    if (filter) {
      try {
        const parsed = JSON.parse(filter)

        if (parsed.query_string && parsed.query_string.query) {
          this.complexFilter = parsed
        } else {
          const configFilters: FieldFilters = parsed
          this.facade.setConfigFilters(configFilters)
          this.complexFilter = null
        }
      } catch (e) {
        console.error('Invalid filter format:', e)
      }
    }
  }

  search(any: string) {
    if (this.openOnSearch) {
      let landingPage: string

      if (this.filter) {
        try {
          const filterObj = JSON.parse(this.filter)
          const baseUrl = this.openOnSearch.replace(/\$\{search}/, '')
          const searchParams = new URLSearchParams({
            query_string: JSON.stringify(filterObj),
            any: any,
          })

          const separator = baseUrl.includes('?') ? '&' : '?'
          landingPage = `${baseUrl}${separator}${searchParams.toString()}`
        } catch (e) {
          console.error('Error building search URL:', e)
          landingPage = this.openOnSearch.replace(/\$\{search}/, any)
        }
      } else {
        landingPage = this.openOnSearch.replace(/\$\{search}/, any)
      }

      window.open(landingPage, '_self').focus()
    }
  }

  select(record: CatalogRecord) {
    if (this.openOnSelect) {
      const landingPage = this.openOnSelect.replace(
        /\$\{uuid}/,
        record.uniqueIdentifier
      )
      window.open(landingPage, '_self').focus()
    }
  }
}
