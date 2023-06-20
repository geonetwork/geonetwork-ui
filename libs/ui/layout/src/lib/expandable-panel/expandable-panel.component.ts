import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core'

@Component({
  selector: 'gn-ui-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandablePanelComponent {
  @Input() title: string
  @Input() collapsed = true
  @ViewChild('contentDiv') contentDiv: ElementRef
  maxHeight = this.setMaxHeight()

  toggle(): void {
    this.collapsed = !this.collapsed
    this.maxHeight = this.setMaxHeight()
  }

  setMaxHeight() {
    return `${
      this.collapsed ? '0' : this.contentDiv.nativeElement.scrollHeight
    }px`
  }
}
