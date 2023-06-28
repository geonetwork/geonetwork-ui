import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewFeedComponent } from './record-preview-feed.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

describe('RecordPreviewFeedComponent', () => {
  let component: RecordPreviewFeedComponent
  let fixture: ComponentFixture<RecordPreviewFeedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewFeedComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordPreviewFeedComponent)
    component = fixture.componentInstance
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('abstract is stripped', () => {
    expect(component.abstract).toBe('abstract')
  })
  it('should not have href if RightClickToken not provided', () => {
    expect(component.getTargetUrl()).toBe(null)
  })
})
