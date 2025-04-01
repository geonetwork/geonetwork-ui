import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirExpand } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslateModule, NgIconComponent],
  providers: [provideIcons({ iconoirExpand })],
  templateUrl: './truncated-text.component.html',
  styles: [],
})
export class TruncatedTextComponent implements AfterViewInit {
  @Input() text = ''
  @ViewChild('textElement') textElement: ElementRef<HTMLElement>
  isTextTruncated = false

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.checkTextTruncation()
  }

  private checkTextTruncation() {
    const element = this.textElement.nativeElement
    this.isTextTruncated = element.scrollWidth > element.clientWidth
    this.cd.detectChanges()
  }
}
