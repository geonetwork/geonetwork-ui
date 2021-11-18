import { Component, ViewChild } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { ColorService, MetadataRecord } from '@geonetwork-ui/util/shared'
import { combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { MainSearchComponent } from './main-search/main-search.component'

@Component({
  selector: 'datahub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
  constructor(
    private mdViewFacade: MdViewFacade,
    private searchRouter: RouterFacade
  ) {
    ColorService.applyCssVariables('#0f4395', '#c2e9dc', '#212029', '#fdfbff')
  }

  onBCDatahubClick() {
    this.searchRouter.goToSearch()
    this.searchComponent.resetSearch()
  }
}
