import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Renderer2,
  ViewContainerRef,
  EmbeddedViewRef,
  inject,
} from '@angular/core'
import tippy, { Instance } from 'tippy.js'

@Component({
  selector: 'gn-ui-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  standalone: true,
  imports: [],
})
export class PopoverComponent implements AfterViewInit, OnChanges, OnDestroy {
  private viewContainerRef = inject(ViewContainerRef)
  private renderer = inject(Renderer2)

  @ViewChild('popoverContent', { static: false }) popoverContent: ElementRef
  @Input() content: string | TemplateRef<any>
  @Input() theme: 'light' | 'light-border' | 'translucent' | 'material' | ''

  private tippyInstance: Instance
  private view: EmbeddedViewRef<any>

  private getContent(): string | HTMLElement {
    if (this.content instanceof TemplateRef) {
      if (this.view) {
        this.view.destroy()
      }
      this.view = this.viewContainerRef.createEmbeddedView(this.content)
      this.view.detectChanges()
      const wrapper = this.renderer.createElement('div') // Create a wrapper div
      this.view.rootNodes.forEach((node) => {
        this.renderer.appendChild(wrapper, node) // Append each root node to the wrapper
      })
      return wrapper
    }
    return this.content
  }

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.popoverContent.nativeElement as Element, {
      content: this.getContent(),
      allowHTML: true,
      theme: this.theme,
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      this.theme = changes['theme'].currentValue
      if (this.tippyInstance) {
        this.tippyInstance.setProps({ theme: this.theme })
      }
    }
    if (changes['content']) {
      this.content = changes['content'].currentValue
      if (this.tippyInstance) {
        this.tippyInstance.setContent(this.getContent())
      }
    }
  }

  ngOnDestroy(): void {
    if (this.tippyInstance) {
      this.tippyInstance.destroy()
    }
    if (this.view) {
      this.view.destroy()
    }
  }
}
