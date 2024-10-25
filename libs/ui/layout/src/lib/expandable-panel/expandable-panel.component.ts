import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
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
