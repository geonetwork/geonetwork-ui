import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MarkdownEditorComponent } from './markdown-editor.component'

describe('MarkdownEditorComponent', () => {
  let component: MarkdownEditorComponent
  let fixture: ComponentFixture<MarkdownEditorComponent>

  beforeEach(async () => {
    await TestBed.compileComponents()

    fixture = TestBed.createComponent(MarkdownEditorComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
