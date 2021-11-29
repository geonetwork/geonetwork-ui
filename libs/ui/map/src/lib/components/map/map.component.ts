import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'

@Component({
  selector: 'gn-ui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() map: Map
  @ViewChild('map') container: ElementRef

  resizeObserver = new ResizeObserver(() => {
    this.map.updateSize()
    this.resizeObserver.unobserve(this.container.nativeElement)
  })

  constructor(private _element: ElementRef) {}

  ngAfterViewInit() {
    this.map.setTarget(this.container.nativeElement)
    this.resizeObserver.observe(this.container.nativeElement)
  }
}
