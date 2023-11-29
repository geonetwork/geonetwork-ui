import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { GnUiLinkifyDirective } from './linkify.directive'

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
]
@Component({
  template: `<div [gnUiLinkify]>{{ text }}</div>`,
})
class TestComponent {
  text = ''
}

describe('GnUiLinkifyDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let component: TestComponent
  let debugElement: DebugElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GnUiLinkifyDirective, TestComponent],
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
        const href = getAnchorElement().nativeElement.getAttribute('href')
        expect(href).toBe(output)
      }
    )
  })

  it('should have the target attribute set to "_blank"', async () => {
    component.text = 'Click this link https://www.example.com/'
    fixture.detectChanges()
    await fixture.whenStable()
    const target = getAnchorElement().nativeElement.getAttribute('target')
    expect(target).toBe('_blank')
  })
  function getAnchorElement() {
    debugElement = fixture.debugElement.query(
      By.directive(GnUiLinkifyDirective)
    )
    return debugElement.query(By.css('a'))
  }
})
