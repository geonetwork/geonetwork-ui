import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'
import { fromEvent, Observable, timer } from 'rxjs'
import { map, startWith, switchMap } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() map: Map
  @ViewChild('map') container: ElementRef
  resizeObserver = new ResizeObserver(() => {
    this.map.updateSize()
    this.resizeObserver.unobserve(this.container.nativeElement)
  })
  displayMessage$: Observable<boolean>

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    // this will show the message when a 'mapmuted' event is received and hide it a few seconds later
    this.displayMessage$ = fromEvent(this.map, 'mapmuted').pipe(
      switchMap(() =>
        timer(2000).pipe(
          map(() => false),
          startWith(true)
        )
      )
    )
  }

  ngAfterViewInit() {
    this.map.setTarget(this.container.nativeElement)
    this.resizeObserver.observe(this.container.nativeElement)
  }
}
