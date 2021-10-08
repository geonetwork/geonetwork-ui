import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordViewComponent {
  displayMap$ = this.facade.mapApiLinks$.pipe(
    map((links) => !!links && links.length > 0)
  )

  constructor(
    public facade: MdViewFacade,
    private mapManager: MapManagerService
  ) {}

  onTabIndexChange(index: number): void {
    if (index === 2) {
      setTimeout(() => this.mapManager.map.updateSize(), 0)
    }
  }
}
