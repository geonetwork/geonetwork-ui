import { Component } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { ColorService } from '@geonetwork-ui/util/shared'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

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
  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#0f4395', '#c2e9dc', '#212029', '#fdfbff')
  }
}
