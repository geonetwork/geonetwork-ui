import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MarkdownParserComponent } from './markdown-parser.component'

describe('MarkdownParserComponent', () => {
  let component: MarkdownParserComponent
  let fixture: ComponentFixture<MarkdownParserComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkdownParserComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MarkdownParserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
