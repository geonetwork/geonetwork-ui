import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import { matAdd, matRemove } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ matAdd, matRemove })],
})
export class ExpandablePanelComponent implements AfterViewInit, OnDestroy {
  @Input() title?: string
  @Input() iconColor? = ''
  @ContentChild('titleTemplate') titleTemplate?: TemplateRef<HTMLElement>
  @ViewChild('contentDiv') contentDiv?: ElementRef

  maxHeight = '0px'
  private _collapsed = true
  private contentObserver?: ResizeObserver

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.contentObserver = new ResizeObserver(() => {
      this.computeMaxHeight()
      this.changeDetector.detectChanges()
    })
    if (this.contentDiv) {
      this.contentObserver.observe(this.contentDiv.nativeElement)
    }
  }

  @Input() set collapsed(value: boolean) {
    if (value !== this._collapsed) {
      this._collapsed = value
      this.computeMaxHeight()
    }
  }

  get collapsed(): boolean {
    return this._collapsed
  }

  get showContent(): boolean {
    return !this.collapsed
  }

  toggle(): void {
    this.collapsed = !this.collapsed
  }

  computeMaxHeight(): void {
    if (!this.contentDiv) return
    const height = this.contentDiv.nativeElement.scrollHeight
    this.maxHeight = this.collapsed ? '0px' : `${height}px`
  }

  ngOnDestroy() {
    this.contentObserver?.disconnect()
  }
}
