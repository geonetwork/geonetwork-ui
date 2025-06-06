import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewRowComponent } from './record-preview-row.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('RecordPreviewDatahubComponent', () => {
  let component: RecordPreviewRowComponent
  let fixture: ComponentFixture<RecordPreviewRowComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewRowComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewRowComponent)
    component = fixture.componentInstance
    component.record = {
      uniqueIdentifier: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      landingPage: new URL('http://localhost/abcd.html'),
      overviews: [{ url: new URL('http://localhost/abcd.jpg') }],
      contacts: [
        {
          organization: { name: 'orga' },
          email: 'mail',
          role: 'author',
        },
      ],
    } as CatalogRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('abstract is stripped', () => {
    expect(component.abstract).toBe('abstract')
  })
})
