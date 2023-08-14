import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { propagateToDocumentOnly } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-star-toggle',
  templateUrl: './star-toggle.component.html',
  styleUrls: ['./star-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarToggleComponent {
  @Input() toggled!: boolean
  @Input() disabled = false
  @Output() newValue = new EventEmitter<boolean>()
  @ViewChild('starOverlay') overlay: ElementRef

  toggle(event: Event) {
    if (!this.disabled) {
      this.toggled = !this.toggled
      if (this.toggled) {
        const anim = this.overlay.nativeElement.getAnimations()[0]
        anim.cancel()
        anim.play()
      }
      this.newValue.emit(this.toggled)
    }
    propagateToDocumentOnly(event)
    event.preventDefault()
  }
}
