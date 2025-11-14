import { Renderer2, Directive, ElementRef, Input, OnInit } from '@angular/core'
import { DateService } from './services/date.service'

@Directive({
  selector: '[gnUiHumanizeDate]',
  standalone: true,
})
export class GnUiHumanizeDateDirective implements OnInit {
  @Input() gnUiHumanizeDate: Date | string

  constructor(
    private dateService: DateService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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
