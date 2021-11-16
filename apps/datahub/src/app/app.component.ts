import { Component, ViewChild } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { ColorService, MetadataRecord } from '@geonetwork-ui/util/shared'
import { combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { MainSearchComponent } from './main-search/main-search.component'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MainSearchComponent) searchComponent: MainSearchComponent

  isPresentOrLoading$ = combineLatest([
    this.mdViewFacade.isPresent$,
    this.mdViewFacade.isLoading$,
  ])
  isRecordOpened$ = this.isPresentOrLoading$.pipe(
    map(([present, loading]) => present || loading)
  )

  breadcrumb$ = this.isPresentOrLoading$.pipe(
    switchMap(([present, loading]) => {
      if (present)
        return this.mdViewFacade.metadata$.pipe(
          map((md) => `Dataset > ${md.title}`)
        )
      if (loading) return of('Loading...')
      return of('Search')
    })
  )
  autocompleteDisplayWithFn = () => ''

  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }

  resetSearch() {
    this.searchComponent.resetSearch()
  }

  onFuzzySearchSelection(record: MetadataRecord) {
    this.searchComponent.onMetadataSelection(record)
  }
}
