import { Component } from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { map, switchMap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'

@Component({
  selector: 'gn-ui-root',
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
          map((md) => `Jeu de donnée > ${md.title}`)
        )
      if (loading) return of('Chargement...')
      return of('Recherche')
    })
  )

  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }
}
