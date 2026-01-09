import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core'
import {
  ResultsListShowMoreStrategy,
  SearchFacade,
  SearchStateParams,
} from '@geonetwork-ui/feature/search'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { BaseComponent } from '../base.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { first } from 'rxjs/operators'

@Component({
  selector: 'wc-gn-results-list-component',
  templateUrl: './gn-results-list.html',
  styleUrls: ['./gn-results-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: false,
})
export class GnResultsListComponent extends BaseComponent {
  private changeDetector = inject(ChangeDetectorRef)

  @Input() layout = 'CARD'
  @Input() size = '10' // will be converted to number later
  @Input() query: string
  @Input() filter: string
  @Input() catalogUrl: string
  @Input() showMore: ResultsListShowMoreStrategy = 'none'

  ngOnInit() {
    super.ngOnInit()

    this.facade.searchFilters$.subscribe(filters => {
      this.changeDetector.detectChanges()
    })

    this.facade.results$.subscribe(results => {
      this.changeDetector.detectChanges()
    })

    this.facade.isLoading$.subscribe(loading => {
      this.changeDetector.detectChanges()
    })
  }

  private setSearch_() {
    const filter = this.filter
    const query = this.query

    if (filter) {
      const configFilters: FieldFilters = JSON.parse(filter)
      this.facade.setConfigFilters(configFilters)
    }

    this.facade.setPageSize(parseInt(this.size))

    if (query) {
      this.facade.searchFilters$.pipe(
        first()
      ).subscribe(currentFilters => {
        const hasExistingFilters = Object.keys(currentFilters).length > 0 &&
          Object.values(currentFilters).some(value => value !== '' && value !== null && value !== undefined)

        if (!hasExistingFilters) {
          try {
            const filters = JSON.parse(query)
            this.facade.setFilters(filters)
          } catch (e) {
            this.facade.setFilters({ any: query })
          }
        }
      })
    } else if (!query) {
      this.facade.searchFilters$.pipe(
        first()
      ).subscribe(currentFilters => {
        const hasExistingFilters = Object.keys(currentFilters).length > 0
        if (!hasExistingFilters) {
          this.facade.setFilters({})
        }
      })
    }
  }

  init(): void {
    super.init()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      // timeout cause must be the last subscriber to the change
      this.facade.isLoading$.subscribe(() => {
        this.changeDetector.detectChanges()
      })
    })
    this.setSearch_()
  }

  onMdClick(metadata: CatalogRecord) {
    if (this.catalogUrl) {
      const landingPage = this.catalogUrl.replace(
        /{uuid}/,
        metadata.uniqueIdentifier
      )
      const newWindow = window.open(landingPage, '_blank')
      if (newWindow) {
        newWindow.focus()
      }
    }
  }

  changes(): void {
    super.changes()
    if (this.filter) {
      const configFilters: FieldFilters = JSON.parse(this.filter)
      this.facade.setConfigFilters(configFilters)
    }
    this.facade.setPageSize(parseInt(this.size))
  }
}
