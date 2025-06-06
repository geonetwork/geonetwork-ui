import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirExpand } from '@ng-icons/iconoir'
import { MatButtonModule } from '@angular/material/button'
import { CdkScrollable, OverlayModule } from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CellPopinComponent } from '../cell-popin/cell-popin.component'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    ButtonComponent,
    CellPopinComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirExpand })],
  templateUrl: './truncated-text.component.html',
  styles: [],
})
export class TruncatedTextComponent implements AfterViewInit, OnDestroy {
  @Input() text = ''
  @Input() extraClass = ''
  @Input() scrollContainer!: ElementRef
  @Input() cdkScrollContainer!: CdkScrollable

  @ViewChild('textElement') textElement: ElementRef<HTMLElement>

  isTextTruncated = false

  private readonly resizeObserver: ResizeObserver
  private readonly mutationObserver: MutationObserver

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => this.checkTextTruncation())
    })

    this.mutationObserver = new MutationObserver(() => {
      this.ngZone.run(() => {
        this.checkTextTruncation()
      })
    })
  }

  ngAfterViewInit() {
    const element = this.textElement.nativeElement
    this.resizeObserver?.observe(element)
    this.mutationObserver?.observe(element.parentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    this.checkTextTruncation()
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect()
    this.mutationObserver?.disconnect()
  }

  private checkTextTruncation() {
    const element = this.textElement.nativeElement

    this.isTextTruncated = element.scrollWidth > element.clientWidth
    this.cd.detectChanges()
  }
}
