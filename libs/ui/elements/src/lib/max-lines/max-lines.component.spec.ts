import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MaxLinesComponent } from './max-lines.component'
import { Component } from '@angular/core'

@Component({
  template: `
    <gn-ui-max-lines [maxLines]="maxLines">
      <div class="test-content" style="height: 70px;">
        <p style="height: 40px;">Lorem ipsum dolor sit amet</p>
      </div>
    </gn-ui-max-lines>
  `,
})
class TestHostComponent {
  maxLines: number
}
describe('MaxLinesComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent
  let maxLinesComponent: MaxLinesComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxLinesComponent, TestHostComponent],
    })
    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    maxLinesComponent = fixture.debugElement.children[0].componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(maxLinesComponent).toBeTruthy()
  })

  it('should render content correctly', () => {
    hostComponent.maxLines = 10
    fixture.detectChanges()

    const contentElement: HTMLElement =
      fixture.nativeElement.querySelector('.test-content')
    expect(contentElement.childNodes[0].textContent).toBe(
      'Lorem ipsum dolor sit amet'
    )
  })

  it('should adjust maxHeight based on content height', () => {
    let contentElement: HTMLElement =
      fixture.nativeElement.querySelector('.test-content')

    contentElement = fixture.nativeElement.querySelector('.test-content')

    const expectedHeight = `${
      maxLinesComponent.getLineHeight(contentElement) *
      maxLinesComponent.maxLines
    }px`

    expect(maxLinesComponent.maxHeight).toBe(expectedHeight)
  })

  it('should show "Show More" button for long content', () => {
    expect(maxLinesComponent.showToggleButton).toBeTruthy()
  })

  it('should toggle display when "Show More" button is clicked', () => {
    maxLinesComponent.toggleDisplay()

    expect(maxLinesComponent.isExpanded).toBeTruthy()
    expect(maxLinesComponent.maxHeight).toBe('')
  })

  afterEach(() => {
    fixture.destroy()
  })
})
