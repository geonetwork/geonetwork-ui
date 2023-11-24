import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('RecordPreviewListComponent', () => {
  let component: RecordPreviewListComponent
  let fixture: ComponentFixture<RecordPreviewListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewListComponent)
    component = fixture.componentInstance
    component.record = {
      uniqueIdentifier: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      landingPage: new URL('http://localhost/abcd.html'),
      overviews: [{ url: new URL('http://localhost/abcd.jpg') }],
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
