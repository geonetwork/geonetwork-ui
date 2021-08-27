import { Component } from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  $isRecordOpened = this.mdViewFacade.isPresent$

  $breadcrumb = this.mdViewFacade.isPresent$.pipe(
    switchMap((present) =>
      present
        ? this.mdViewFacade.metadata$.pipe(
            map((md) => `Jeu de donnée > ${md.title}`)
          )
        : of('Recherche')
    )
  )

  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }

  backToSearch(event: Event) {
    this.mdViewFacade.close()
    event.preventDefault()
  }
}
