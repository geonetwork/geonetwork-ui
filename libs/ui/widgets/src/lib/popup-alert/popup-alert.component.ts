import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matErrorOutlineOutline } from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ matErrorOutlineOutline })],
})
export class PopupAlertComponent implements OnInit {
  @Input() icon: string
  @Input() type: 'danger' | 'warning' | 'info' = 'info'
  @Input() position: 'top' | 'bottom' = 'top'
  @ViewChild('content') content: ElementRef
  expanded = false
  timeout = null

  constructor(private changeDetector: ChangeDetectorRef) {}

  get showDuration() {
    const chars = this.content.nativeElement.innerHTML.length
    return Math.max(3000, chars * 20)
  }

  ngOnInit() {
    this.expandAndClose()
  }

  expand() {
    this.expanded = true
    this.changeDetector.detectChanges()
    clearTimeout(this.timeout)
  }

  expandAndClose() {
    this.expanded = true
    this.changeDetector.detectChanges()
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.expanded = false
      this.changeDetector.detectChanges()
    }, this.showDuration)
  }
}
