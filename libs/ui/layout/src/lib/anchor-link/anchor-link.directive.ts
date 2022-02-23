import {
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
})
export class AnchorLinkDirective implements OnInit, OnDestroy {
  @Input('gnUiAnchorLink') targetId: string
  @Input('gnUiAnchorLinkDisabledClass') disabledClass: string
  @Input('gnUiAnchorLinkEnabledClass') enabledClass: string

  @HostBinding('class')
  get elementClass(): string {
    return this.disabled ? this.disabledClass : this.enabledClass
  }

  disabled = false
  observer = new MutationObserver(() => {
    this.refreshDisabledState()
  })

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
    this.refreshDisabledState()
  }

  ngOnDestroy() {
    this.observer.disconnect()
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
