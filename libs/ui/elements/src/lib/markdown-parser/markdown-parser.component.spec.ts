import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MarkdownParserComponent } from './markdown-parser.component'

describe('MarkdownParserComponent', () => {
  let component: MarkdownParserComponent
  let fixture: ComponentFixture<MarkdownParserComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownParserComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MarkdownParserComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render markdown as HTML', () => {
    component.textContent = '**bold markdown**'
    fixture.detectChanges()
    const markdown = fixture.nativeElement.innerHTML
    expect(markdown).toContain('<p><strong>bold markdown</strong></p>')
  })

  it('should render HTML as HTML', () => {
    component.textContent = '<p><strong>simple html</strong></p>'
    fixture.detectChanges()
    const html = fixture.nativeElement.innerHTML
    expect(html).toContain('<p><strong>simple html</strong></p>')
  })

  it('should render text as HTML', () => {
    component.textContent = 'simple text'
    fixture.detectChanges()
    const text = fixture.nativeElement.innerHTML
    expect(text).toContain('<p>simple text</p>')
  })
})
