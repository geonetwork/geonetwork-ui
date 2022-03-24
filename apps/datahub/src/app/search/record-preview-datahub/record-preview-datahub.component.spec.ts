import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'

import { RecordPreviewDatahubComponent } from './record-preview-datahub.component'

/* eslint-disable */
@Component({
  selector: 'gn-ui-source-label',
  template: '',
})
class SourceLabelComponentMock {
  @Input() catalogUuid: string
}
/* eslint-enable */

describe('RecordPreviewDatahubComponent', () => {
  let component: RecordPreviewDatahubComponent
  let fixture: ComponentFixture<RecordPreviewDatahubComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewDatahubComponent, SourceLabelComponentMock],
      imports: [UtilSharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewDatahubComponent)
    component = fixture.componentInstance
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
      catalogUuid: 'x5g40aa4-867e-40b9-9c37-3cb735465935',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('abstract is stripped', () => {
    expect(component.abstract).toBe('abstract')
  })
  it('binds source label component with correct catalog uuid', () => {
    const sourceLabelComponent = fixture.debugElement.query(
      By.directive(SourceLabelComponentMock)
    ).componentInstance
    expect(sourceLabelComponent.catalogUuid).toEqual(
      'x5g40aa4-867e-40b9-9c37-3cb735465935'
    )
  })
})
