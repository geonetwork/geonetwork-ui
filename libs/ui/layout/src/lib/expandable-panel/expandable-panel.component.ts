import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
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
export class ExpandablePanelComponent implements AfterViewChecked {
  @Input() title?: string
  @ContentChild('titleTemplate') titleTemplate?: TemplateRef<HTMLElement>
  @ViewChild('contentDiv') contentDiv: ElementRef
  maxHeight = '0px'
  showContent = false
  private readonly ANIMATION_DURATION = 300

  private _collapsed = true

  constructor(private changeDetector: ChangeDetectorRef) {}

  @Input() set collapsed(value: boolean) {
    if (value !== this._collapsed) {
      if (value) {
        this._collapsed = value
        setTimeout(() => {
          // Closing: wait for animation before hiding content
          this.showContent = false
          this.changeDetector.detectChanges()
        }, this.ANIMATION_DURATION)
      } else {
        // Opening: show content immediately then animate
        this.showContent = true
        this._collapsed = value
      }
      setTimeout(() => {
        this.updateMaxHeight()
        this.changeDetector.detectChanges()
      })
    }
  }
  get collapsed(): boolean {
    return this._collapsed
  }

  toggle(): void {
    this.collapsed = !this.collapsed
  }

  ngAfterViewChecked() {
    if (!this.collapsed && this.contentDiv) {
      this.updateMaxHeight()
      this.changeDetector.detectChanges()
    }
  }

  private updateMaxHeight() {
    if (!this.contentDiv) return
    this.maxHeight = this.collapsed
      ? '0px'
      : `${this.contentDiv.nativeElement.scrollHeight}px`
  }
}
