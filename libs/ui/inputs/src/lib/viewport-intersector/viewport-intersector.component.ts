import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'gn-ui-viewport-intersector',
  templateUrl: './viewport-intersector.component.html',
  styleUrls: ['./viewport-intersector.component.css'],
  standalone: true,
})
export class ViewportIntersectorComponent implements OnInit, OnDestroy {
  @Output() isInViewport = new EventEmitter<boolean>()
  @Output() entersViewport: Observable<void> = this.isInViewport.pipe(
    filter((inViewport) => inViewport),
    map(() => undefined)
  )
  @Output() exitsViewport: Observable<void> = this.isInViewport.pipe(
    filter((inViewport) => !inViewport),
    map(() => undefined)
  )
  observer?: IntersectionObserver

  constructor(private vcRef: ViewContainerRef) {}

  ngOnInit() {
    const elToObserve = this.vcRef.element.nativeElement
    this.observeInputElement(elToObserve)
  }

  ngOnDestroy() {
    const elToObserve = this.vcRef.element.nativeElement
    this.unObserveInputElement(elToObserve)
  }

  observeInputElement(elToObserve: HTMLElement) {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isInViewport.emit(entry.isIntersecting)
          })
        },
        { root: null, threshold: 0 }
      )
    }
    this.observer.observe(elToObserve)
  }

  unObserveInputElement(elToObserve: HTMLElement) {
    this.observer?.unobserve(elToObserve)
  }
}
