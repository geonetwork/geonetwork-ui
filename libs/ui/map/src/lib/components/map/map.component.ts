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
import { fromEvent, merge, Observable, of, timer } from 'rxjs'
import { delay, map, startWith, switchMap } from 'rxjs/operators'

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
  mapMuted$: Observable<boolean>
  cancelMapmuted$: Observable<boolean>
  displayMessage$: Observable<boolean>

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    // this will show the message when a 'mapmuted' event is received and hide it a few seconds later
    // 'movestart' and 'singleclick' will cancel displaying the message in particular for two finger interactions on mobile
    this.displayMessage$ = merge(
      fromEvent(this.map, 'mapmuted').pipe(map(() => true)),
      fromEvent(this.map, 'movestart').pipe(map(() => false)),
      fromEvent(this.map, 'singleclick').pipe(map(() => false))
    ).pipe(
      switchMap((muted) =>
        muted
          ? timer(2000).pipe(
              map(() => false),
              startWith(true),
              delay(400)
            )
          : of(false)
      )
    )
  }

  ngAfterViewInit() {
    this.map.setTarget(this.container.nativeElement)
    this.resizeObserver.observe(this.container.nativeElement)
  }
}
