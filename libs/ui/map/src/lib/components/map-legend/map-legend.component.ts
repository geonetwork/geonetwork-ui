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
    if ('context' in changes && !changes['context'].isFirstChange()) {
      const mapContectLayer = changes['context'].currentValue.layers[0]
      console.log(mapContectLayer)
      this.legendHTML = await createLegendFromLayer(mapContectLayer)
      console.log(this.legendHTML)
      this.legendStatusChange.emit(!!this.legendHTML)
    }
  }
}
