import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetadataComponent {
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
