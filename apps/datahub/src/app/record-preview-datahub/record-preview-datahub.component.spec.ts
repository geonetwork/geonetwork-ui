import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewDatahubComponent } from './record-preview-datahub.component'

describe('RecordPreviewDatahubComponent', () => {
  let component: RecordPreviewDatahubComponent
  let fixture: ComponentFixture<RecordPreviewDatahubComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewDatahubComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewDatahubComponent)
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
