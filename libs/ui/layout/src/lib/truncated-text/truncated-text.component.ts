import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideIcons } from '@ng-icons/core'
import { iconoirExpand, iconoirCollapse } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { OverlayComponent } from '../overlay/overlay.component'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayComponent],
  providers: [provideIcons({ iconoirExpand, iconoirCollapse })],
  templateUrl: './truncated-text.component.html',
  styles: [],
})
export class TruncatedTextComponent implements AfterViewInit {
  @Input() text = ''
  @ViewChild('textElement') textElement: ElementRef<HTMLElement>
  isTextTruncated = false
  isExpanded = false

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.checkTextTruncation()
  }

  ngOnChange() {
    this.checkTextTruncation()
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }

  private checkTextTruncation() {
    const element = this.textElement.nativeElement
    this.isTextTruncated = element.scrollWidth > element.clientWidth
    this.cd.detectChanges()
  }
}
