import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MaxLinesComponent } from './max-lines.component'
import { Component } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'

// Mock implementation of ResizeObserver
class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

@Component({
  template: `
    <gn-ui-max-lines [maxLines]="maxLines">
      <div class="test-content" style="height: 70px; max-height:80px;">
        <p style="height: 40px;">Lorem ipsum dolor sit amet</p>
      </div>
    </gn-ui-max-lines>
  `,
  standalone: true,
  imports: [MaxLinesComponent],
})
class TestHostComponent {
  maxLines: number
}
describe('MaxLinesComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent
  let maxLinesComponent: MaxLinesComponent

  beforeEach(() => {
    ;(window as any).ResizeObserver = ResizeObserverMock

    TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    maxLinesComponent = fixture.debugElement.children[0].componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(maxLinesComponent).toBeTruthy()
  })

  it('should render content correctly', () => {
    hostComponent.maxLines = 10
    fixture.detectChanges()

    const maxLinesElement: HTMLElement =
      fixture.nativeElement.querySelector('.max-lines')
    expect(maxLinesElement.childNodes[0].textContent).toBe(
      'Lorem ipsum dolor sit amet'
    )
  })

  describe('should adjust maxHeight based on content height', () => {
    const contentHeight = 120
    beforeEach(() => {
      jest
        .spyOn(
          fixture.nativeElement.querySelector('.test-content'),
          'getBoundingClientRect'
        )
        .mockReturnValueOnce({
          left: 100,
          top: 50,
          right: 20,
          bottom: 10,
          x: 30,
          y: 40,
          widht: 150,
          height: contentHeight,
        })
    })
    it('use content height if content height is smaller than max space', () => {
      hostComponent.maxLines = 10

      fixture.detectChanges()

      expect(maxLinesComponent.maxHeight).toBe(`${contentHeight}px`)
    })

    it('use max space height if content height is bigger than max space', () => {
      hostComponent.maxLines = 2

      const contentElement =
        fixture.nativeElement.querySelector('.test-content')
      fixture.detectChanges()

      const maxSpace =
        maxLinesComponent.getLineHeight(contentElement) *
        maxLinesComponent.maxLines

      expect(maxLinesComponent.maxHeight).toBe(`${maxSpace}px`)
    })

    it('should show "Show More" button for long content', () => {
      hostComponent.maxLines = 2

      fixture.detectChanges()

      expect(maxLinesComponent.showToggleButton).toBeTruthy()
    })

    it('should toggle display when "Show More" button is clicked', () => {
      hostComponent.maxLines = 2

      const contentElement =
        fixture.nativeElement.querySelector('.test-content')
      fixture.detectChanges()

      maxLinesComponent.toggleDisplay()

      expect(maxLinesComponent.isExpanded).toBeTruthy()
      expect(maxLinesComponent.maxHeight).toBe(
        `${
          maxLinesComponent.maxLines *
          maxLinesComponent.getLineHeight(contentElement)
        }px`
      )
    })
  })

  afterEach(() => {
    fixture.destroy()
  })
})
