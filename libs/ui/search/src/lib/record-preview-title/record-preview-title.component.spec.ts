import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('RecordPreviewTextComponent', () => {
  let component: RecordPreviewTitleComponent
  let fixture: ComponentFixture<RecordPreviewTitleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewTitleComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewTitleComponent)
    component = fixture.componentInstance
    component.record = {
      uniqueIdentifier: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: 'Abcd',
      landingPage: new URL('http://localhost/abcd.html'),
      overviews: [{ url: new URL('http://localhost/abcd.jpg') }],
    } as CatalogRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
