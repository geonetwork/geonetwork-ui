/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core'

@Directive({
  selector: '[gnUiLinkify]',
  standalone: true,
})
export class GnUiLinkifyDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.processLinks(this.el.nativeElement)
    }, 0)
  }

  private processLinks(container: HTMLElement | ChildNode) {
    const nodes = Array.from(container.childNodes)

    nodes.forEach((node) => {
      if (node instanceof Text) {
        const textNode = node as Text
        const linkified = this.linkifyNode(textNode.nodeValue)
        if (linkified) {
          this.createLinkElements(container, linkified, node)
        }
      } else if (node instanceof HTMLAnchorElement) {
        const url = node.href
        const displayValue = node.innerHTML
        const linkified = this.linkifyNode(displayValue, url)
        if (linkified) {
          this.createLinkElements(container, linkified, node)
        }
      } else {
        this.processLinks(node)
      }
    })
  }

  private linkifyNode(displayValue: string, url?: string): string | undefined {
    if (url) {
      displayValue = this.createLink(displayValue, url)
    } else {
      const urlRegex = /\bhttps?:\/\/(?:\([^\s()]+\)|[^\s()]+)+/g

      const matches = displayValue.match(urlRegex)
      if (matches && matches.length > 0) {
        matches.forEach((match) => {
          url = match

          displayValue = displayValue.replace(match, (match) => {
            return this.createLink(match, url)
          })
        })
      }
    }

    return displayValue
  }

  private createLinkElements(
    container: HTMLElement | ChildNode,
    htmlContent: string,
    node: ChildNode
  ): void {
    const div = this.renderer.createElement('div')
    div.innerHTML = htmlContent

    const fragment = document.createDocumentFragment()
    Array.from(div.childNodes).forEach((childNode: ChildNode) => {
      fragment.appendChild(childNode)
    })

    container.insertBefore(fragment, node)
    container.removeChild(node)
  }

  private createLink(displayValue: string, url: string): string {
    return `<a href="${url}" target="_blank" class="text-primary cursor-pointer hover:underline">${displayValue} <ng-icon class="!w-[12px] !h-[14px] !text-[14px] opacity-75" name="matOpenInNew"></ng-icon></a>`
  }
}
