import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'

@Directive({
  selector: '[gnUiAnchorLink]',
  standalone: true,
})
export class AnchorLinkDirective
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Input('gnUiAnchorLink') targetId: string
  @Input('gnUiAnchorLinkDisabledClass') disabledClass: string
  @Input('gnUiAnchorLinkEnabledClass') enabledClass: string
  @Input('gnUiAnchorLinkInViewClass') inViewClass: string
  @Input('gnUiAnchorLinkOutOfViewClass') outOfViewClass: string

  @HostBinding('class')
  get elementClass(): string {
    if (this.disabled) {
      return this.disabledClass
    }
    if (this.inView) {
      return `${this.inViewClass} ${this.enabledClass}`
    } else {
      return `${this.outOfViewClass} ${this.enabledClass}`
    }
  }

  disabled = false
  observer = new MutationObserver(() => {
    this.refreshDisabledState()
  })
  inView = false
  intersectionObserver: IntersectionObserver
  initialized = false

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
    this.refreshDisabledState()
  }

  ngAfterViewChecked() {
    if (!this.initialized && !this.disabled) {
      const target = document.getElementById(this.targetId)
      if (target) {
        this.initializeIntersectionObserver(target)
        this.initialized = true
      }
    }
  }

  initializeIntersectionObserver(target: HTMLElement) {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.inView = entry.isIntersecting
          this.changeDetector.detectChanges()
        })
      },
      {
        root: null,
        rootMargin: '-30% 0% -60% 0%',
      }
    )
    this.intersectionObserver.observe(target)
  }

  ngOnDestroy() {
    this.observer.disconnect()
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
  }

  refreshDisabledState() {
    const targetNotPresent = !document.getElementById(this.targetId)
    if (targetNotPresent !== this.disabled) {
      this.disabled = targetNotPresent
      this.changeDetector.detectChanges()
    }
  }

  @HostListener('click') scrollToTarget() {
    const target = document.getElementById(this.targetId)
    if (!target) return
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
