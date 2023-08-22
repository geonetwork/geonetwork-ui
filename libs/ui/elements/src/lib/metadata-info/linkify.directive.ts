/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core'

@Directive({
  selector: '[gnUiLinkify]',
})
export class GnUiLinkifyDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.processLinks()
    }, 0)
  }

  private processLinks() {
    const container = this.el.nativeElement

    const nodes = Array.from(container.childNodes)
    nodes.forEach((node) => {
      if (node instanceof Text) {
        const textNode = node as Text
        const linkified = this.linkifyText(textNode.nodeValue)
        const span = this.renderer.createElement('span')
        span.innerHTML = linkified
        container.insertBefore(span, textNode)
        container.removeChild(textNode)
      }
    })
  }

  private linkifyText(text: string): string {
    return text.replace(/(\bhttps?:\/\/\S+\b)/g, (match) => {
      return `<a href="${match}" target="_blank"
                  class="text-primary cursor-pointer hover:underline">${match} <mat-icon class="mat-icon !w-[12px] !h-[14px] !text-[14px] opacity-75 material-icons">open_in_new</mat-icon></a>`
    })
  }
}
