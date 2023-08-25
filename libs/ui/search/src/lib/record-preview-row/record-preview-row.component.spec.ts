import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util-shared'

import { RecordPreviewRowComponent } from './record-preview-row.component'

describe('RecordPreviewDatahubComponent', () => {
  let component: RecordPreviewRowComponent
  let fixture: ComponentFixture<RecordPreviewRowComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewRowComponent],
      imports: [UtilSharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewRowComponent)
    component = fixture.componentInstance
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
      contact: {
        organisation: 'orga',
        email: 'mail',
      },
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('abstract is stripped', () => {
    expect(component.abstract).toBe('abstract')
  })
})
