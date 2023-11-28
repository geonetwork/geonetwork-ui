import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import { RecordPreviewCardComponent } from './record-preview-card.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('RecordPreviewCardComponent', () => {
  let component: RecordPreviewCardComponent
  let fixture: ComponentFixture<RecordPreviewCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewCardComponent)
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
