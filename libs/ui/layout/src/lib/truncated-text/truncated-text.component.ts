import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirExpand, iconoirCollapse } from '@ng-icons/iconoir'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ButtonComponent, TranslateModule],
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
