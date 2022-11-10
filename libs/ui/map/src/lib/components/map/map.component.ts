import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'
import { BehaviorSubject, merge } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @Input() map: Map
  @ViewChild('map') container: ElementRef
  show$ = new BehaviorSubject(false)
  showMessage$ = this.show$.pipe(map((bool) => bool))
  hideMessage$ = this.show$.pipe(
    debounceTime(2000),
    map(() => false)
  )
  displayMessage$ = merge(this.showMessage$, this.hideMessage$)

  resizeObserver = new ResizeObserver(() => {
    this.map.updateSize()
    this.resizeObserver.unobserve(this.container.nativeElement)
  })

  constructor(private _element: ElementRef) {}

  ngAfterViewInit() {
    this.map.setTarget(this.container.nativeElement)
    this.map.on('mapmuted' as any, () => this.show$.next(true))
    this.resizeObserver.observe(this.container.nativeElement)
  }
}
