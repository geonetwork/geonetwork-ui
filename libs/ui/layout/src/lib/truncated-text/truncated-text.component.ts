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
import { iconoirExpand, iconoirReduce } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { MatButtonModule } from '@angular/material/button'
import { OverlayModule } from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent } from '@ng-icons/core'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    OverlayModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirExpand, iconoirReduce })],
  templateUrl: './truncated-text.component.html',
  styles: [],
})
export class TruncatedTextComponent implements AfterViewInit {
  @Input() text = ''
  @ViewChild('textElement') textElement: ElementRef<HTMLElement>
  isTextTruncated = false
  isOpen = false

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.checkTextTruncation()
  }

  ngOnChange() {
    this.checkTextTruncation()
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen
  }

  close() {
    this.isOpen = false
  }

  private checkTextTruncation() {
    const element = this.textElement.nativeElement
    this.isTextTruncated = element.scrollWidth > element.clientWidth
    this.cd.detectChanges()
  }
}
