import {
  Renderer2,
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core'
import { DateService } from './services/date.service'

@Directive({
  selector: '[gnUiHumanizeDate]',
  standalone: true,
})
export class GnUiHumanizeDateDirective implements OnInit {
  private dateService = inject(DateService)
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)

  @Input() gnUiHumanizeDate: Date | string

  async ngOnInit() {
    await this.updateElement()
  }

  private async updateElement(): Promise<void> {
    const dateValue = this.gnUiHumanizeDate

    const fullDateTime = this.dateService.formatDateTime(dateValue)
    const relativeDate =
      await this.dateService.formatRelativeDateTime(dateValue)

    this.renderer.setAttribute(this.el.nativeElement, 'title', fullDateTime)
    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      relativeDate
    )
  }
}
