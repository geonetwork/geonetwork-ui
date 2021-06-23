import { Component, ElementRef, Input, OnInit } from '@angular/core'
import Map from 'ol/Map'

@Component({
  selector: 'gn-ui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() map: Map

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    this.map.setTarget(this._element.nativeElement.querySelector('.map'))
  }
}
