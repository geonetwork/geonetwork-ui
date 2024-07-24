import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { fromEvent, merge, Observable, of, timer } from 'rxjs'
import { delay, map, startWith, switchMap } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { computeMapContextDiff, MapContext } from '@geospatial-sdk/core'
import OlMap from 'ol/Map'
import {
  applyContextDiffToMap,
  createMapFromContext,
} from '@geospatial-sdk/openlayers'
import Feature from 'ol/Feature'

@Component({
  selector: 'gn-ui-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
})
export class MapContainerComponent implements AfterViewInit, OnChanges {
  @Input() context: MapContext
  @Output() featuresClicked = new EventEmitter<Feature[]>() // TODO

  @ViewChild('map') container: ElementRef
  displayMessage$: Observable<boolean>
  olMap: OlMap

  public get openlayersMap(): OlMap {
    return this.olMap
  }

  ngAfterViewInit() {
    this.olMap = createMapFromContext(
      this.context,
      this.container.nativeElement
    )
    this.displayMessage$ = merge(
      fromEvent(this.olMap, 'mapmuted').pipe(map(() => true)),
      fromEvent(this.olMap, 'movestart').pipe(map(() => false)),
      fromEvent(this.olMap, 'singleclick').pipe(map(() => false))
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

  ngOnChanges(changes: SimpleChanges) {
    if ('context' in changes && !changes['context'].isFirstChange()) {
      const diff = computeMapContextDiff(
        changes['context'].currentValue,
        changes['context'].previousValue
      )
      applyContextDiffToMap(this.olMap, diff)
    }
  }
}
