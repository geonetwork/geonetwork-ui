import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'
import { createLegendFromLayer } from '@geospatial-sdk/legend'
import { NgIf } from '@angular/common'

@Component({
  selector: 'gn-ui-map-legend',
  templateUrl: './map-legend.component.html',
  standalone: true,
  styleUrls: ['./map-legend.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [NgIf],
})
export class MapLegendComponent implements OnChanges {
  @Input() context: MapContext | null
  @Output() legendStatusChange = new EventEmitter<boolean>()
  legendHTML: HTMLElement | false

  async ngOnChanges(changes: SimpleChanges) {
    if ('context' in changes) {
      const mapContext = changes['context'].currentValue
      if (mapContext.layers && mapContext.layers.length > 0) {
        const mapContextLayer = mapContext.layers[0]
        this.legendHTML = await createLegendFromLayer(mapContextLayer)
        if (this.legendHTML) {
          this.legendStatusChange.emit(true)
        }
      } else {
        this.legendHTML = false
        this.legendStatusChange.emit(false)
      }
    }
  }
}
