import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { animationFrameScheduler, fromEvent, Subscription } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

/**
 * This component will make a block that will stay sticky on the top of the page,
 * but will also shrink down to a minimum height when scrolling.
 * The ratio between minimum and nominal height is stored in the shrinkRatio
 * property, and can be used to change e.g. the opacity or size of child elements.
 * This component renders at z-index: 50 by default.
 * The first parent element with an overflow of `scroll` or `overflow` is considered
 * for scroll events.
 */

@Component({
  selector: 'gn-ui-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyHeaderComponent
  implements AfterViewInit, OnDestroy, OnInit, AfterViewChecked
{
  @Input() minHeightPx: number
  @Input() fullHeightPx: number
  @ContentChild(TemplateRef) template: TemplateRef<{ $implicit: number }>
  @ViewChild('outerContainer') outerContainer: ElementRef
  @ViewChild('innerContainer') innerContainer: ElementRef
  placeholderEl: HTMLElement
  scrollableParent: HTMLElement
  expandRatio: number // 1 means height is full, 0 means height is minimum
  scrollSub: Subscription
  parentScroll: number

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Host() private hostEl: ElementRef,
    private zone: NgZone
  ) {}

  ngAfterViewInit() {
    this.scrollSub = fromEvent(this.scrollableParent, 'scroll', {
      passive: true,
    })
      .pipe(
        throttleTime(0, animationFrameScheduler, {
          leading: true,
          trailing: true,
        })
      )
      .subscribe(this.updateSize.bind(this))
  }

  ngOnInit() {
    this.scrollableParent = findScrollableParent(this.hostEl.nativeElement)
    this.placeholderEl = document.createElement('div')
    this.placeholderEl.style.position = 'absolute'
    this.placeholderEl.classList.add('sticky-header-placeholder')
    this.hostEl.nativeElement.insertAdjacentElement(
      'beforebegin',
      this.placeholderEl
    )
  }

  ngAfterViewChecked() {
    this.updateSize()
  }

  ngOnDestroy() {
    this.scrollSub.unsubscribe()
    this.placeholderEl.remove()
  }

  updateSize() {
    this.zone.runOutsideAngular(() => {
      if (this.scrollableParent.scrollTop === this.parentScroll) return
      this.parentScroll = this.scrollableParent.scrollTop

      const offsetTop = Math.max(
        0,
        this.parentScroll - this.placeholderEl.offsetTop
      )
      const newHeightPx = Math.max(
        this.minHeightPx,
        this.fullHeightPx - offsetTop
      )
      this.innerContainer.nativeElement.style.height = newHeightPx + 'px'
      this.expandRatio =
        (newHeightPx - this.minHeightPx) /
        (this.fullHeightPx - this.minHeightPx)
      this.changeDetector.detectChanges()
    })
  }
}

function findScrollableParent(element: HTMLElement): HTMLElement {
  const parent = element.parentElement
  if (!parent) return element
  const style = getComputedStyle(parent)
  if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
    return parent
  }
  return findScrollableParent(parent)
}
