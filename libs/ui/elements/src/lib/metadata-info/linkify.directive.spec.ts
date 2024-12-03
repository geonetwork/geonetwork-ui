import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { GnUiLinkifyDirective } from './linkify.directive'
import { CommonModule } from '@angular/common'

const testingUrls = [
  ['First link http://bla.org no slash', 'http://bla.org'],

  ['Second link http://bla.org/ with slash', 'http://bla.org/'],
  [
    'Third link https://www.bla.org/hello no slash',
    'https://www.bla.org/hello',
  ],
  [
    'Forth link https://www.bla.org/hello/ with slash',
    'https://www.bla.org/hello/',
  ],
  [
    'Fifth link https://www.bla.org/hello/file.png file with extension',
    'https://www.bla.org/hello/file.png',
  ],
  [
    'Sixth link https://www.bla.org/hello/file.png?aa=bb query parameters',
    'https://www.bla.org/hello/file.png?aa=bb',
  ],
  [
    'Seventh link https://www.bla.org/hello/file.png?aa=%20/bb&cc=d query parameters',
    'https://www.bla.org/hello/file.png?aa=%20/bb&cc=d',
  ],
  [
    'Eighth link https://www.bla.org/hello/file.png?aa= empty query parameter',
    'https://www.bla.org/hello/file.png?aa=',
  ],
  [
    'Nineth link http://foo.com/more_(than)_one_(parens) with parentheses',
    'http://foo.com/more_(than)_one_(parens)',
  ],
  [
    'Tenth link http://foo.com/blah_(wikipedia)#cite-1 with anchor',
    'http://foo.com/blah_(wikipedia)#cite-1',
  ],
  [
    'Eleventh link http://foo.com/blah_(wikipedia)_blah#cite-1 with anchor',
    'http://foo.com/blah_(wikipedia)_blah#cite-1',
  ],
  [
    'Twelveth link http://foo.com/unicode_(✪)_in_parens unicode',
    'http://foo.com/unicode_(✪)_in_parens',
  ],
  [
    'Thirteenth link http://foo.com/(something)?after=parens query params',
    'http://foo.com/(something)?after=parens',
  ],
  [
    'Fourteenth link (http://foo.com/blah) in parenthesis',
    'http://foo.com/blah',
  ],
]

const testWithMultipleUrls = {
  input:
    'Fourteenth links http://foo.com/(something)?after=parens with multiple links http://foo.com/(something)?before=multiple',
  output: [
    'http://foo.com/(something)?after=parens',
    'http://foo.com/(something)?before=multiple',
  ],
}

const testWithHTML = {
  input:
    '<p>Fourteenth link with html input <a href="http://foo.com/(something)?after=before">This is the display text</a> query params</p>',
  output: 'http://foo.com/(something)?after=before',
}

@Component({
  template: `<div
      *ngIf="customInnerHTML"
      [innerHTML]="customInnerHTML"
      [gnUiLinkify]
    ></div>
    <div *ngIf="!customInnerHTML" [gnUiLinkify]>
      {{ text }}
    </div>`,
  standalone: true,
  imports: [CommonModule, GnUiLinkifyDirective],
})
class TestComponent {
  text = ''
  customInnerHTML = null
}

describe('GnUiLinkifyDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let component: TestComponent
  let debugElement: DebugElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GnUiLinkifyDirective, TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
  }))

  describe('should create an anchor element with the correct href', () => {
    test.each(testingUrls)(
      'for %p it should create href %p',
      async (input, output) => {
        component.text = input
        fixture.detectChanges()
        await fixture.whenStable()
        const href = getAnchorElement()[0].nativeElement.getAttribute('href')
        expect(href).toBe(output)
      }
    )

    it('should create multiple anchor elements with the correct href', async () => {
      component.text = testWithMultipleUrls.input
      const output = testWithMultipleUrls.output
      fixture.detectChanges()
      await fixture.whenStable()
      const amountOfAnchors = getAnchorElement().length
      const firstHref = getAnchorElement()[0].nativeElement.getAttribute('href')
      const secondHref =
        getAnchorElement()[1].nativeElement.getAttribute('href')
      expect(amountOfAnchors).toBe(2)
      expect(firstHref).toBe(output[0])
      expect(secondHref).toBe(output[1])
    })
  })

  it('should have the target attribute set to "_blank"', async () => {
    component.text = 'Click this link https://www.example.com/'
    fixture.detectChanges()
    await fixture.whenStable()
    const target = getAnchorElement()[0].nativeElement.getAttribute('target')
    expect(target).toBe('_blank')
  })
  function getAnchorElement() {
    debugElement = fixture.debugElement.query(
      By.directive(GnUiLinkifyDirective)
    )
    return debugElement.queryAll(By.css('a'))
  }

  describe('HTML input', () => {
    it('should create an anchor element with the correct href', async () => {
      component.customInnerHTML = testWithHTML.input
      fixture.detectChanges()
      await fixture.whenStable()
      const href = getAnchorElement()[0].nativeElement.getAttribute('href')
      const ngIcon = getAnchorElement()[0].nativeElement.childNodes[1]
      expect(href).toBe(testWithHTML.output)
      expect(ngIcon.nodeName).toContain('NG-ICON')
    })
  })
})
