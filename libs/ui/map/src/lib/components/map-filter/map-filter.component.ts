import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '../map-container/map-container.component'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-filter-map',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MapContainerComponent, CheckToggleComponent, CommonModule],
})
export class MapFilterComponent {
  private WORLD_EXTENT: [number, number, number, number] = [-180, -90, 180, 90]

  @Input() mapContext: MapContext
  @Input() filterLabel: string
  @Input() initialExtent: [number, number, number, number] = this.WORLD_EXTENT
  @Input() isExtentInteractive = true

  // TODO: add extent margin/padding when setting extent on the map

  currentExtent: [number, number, number, number] = this.initialExtent
  areFiltersModified = false
}
