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

  private _collapsed = true
  private contentObserver?: ResizeObserver

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.contentDiv) {
      this.contentObserver = new ResizeObserver(() => {
        this.changeDetector.detectChanges()
      })
      this.contentObserver.observe(this.contentDiv.nativeElement)
    }
  }

  @Input() set collapsed(value: boolean) {
    this._collapsed = value
  }

  get collapsed(): boolean {
    return this._collapsed
  }

  toggle(): void {
    this.collapsed = !this.collapsed
  }

  ngOnDestroy() {
    if (this.contentObserver) {
      this.contentObserver.disconnect()
    }
  }
}
