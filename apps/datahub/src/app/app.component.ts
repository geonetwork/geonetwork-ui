import { Component } from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // FIXME: replace this with an actual router
  $isRecordOpened = this.mdViewFacade.uuid$.pipe(map((uuid) => !!uuid))

  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }
}
