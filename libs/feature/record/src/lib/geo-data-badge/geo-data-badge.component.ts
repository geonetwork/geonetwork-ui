import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-geo-data-badge',
  templateUrl: './geo-data-badge.component.html',
  styleUrls: ['./geo-data-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BadgeComponent, CommonModule, NgIcon, TranslateModule],
  viewProviders: [
    provideIcons({
      matLocationSearchingOutline,
    }),
  ],
})
export class GeoDataBadgeComponent {
  @Input() record: CatalogRecord

  isGeodata$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(
      ([mapLinks, geoDataLinks]) =>
        this.record.kind !== 'service' &&
        (mapLinks?.length > 0 || geoDataLinks?.length > 0)
    )
  )

  constructor(private mdViewFacade: MdViewFacade) {}
}
