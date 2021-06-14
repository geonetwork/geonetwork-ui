import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewTextComponent } from './record-preview-text.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordPreviewTextComponent', () => {
  let component: RecordPreviewTextComponent
  let fixture: ComponentFixture<RecordPreviewTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewTextComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewTextComponent)
    component = fixture.componentInstance
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: 'Abcd',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
