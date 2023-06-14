import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewComponent } from './record-preview.component'
import { ROUTER_ROUTE_DATASET } from 'libs/feature/router/src/lib/default/constants'

describe('RecordResultsComponent', () => {
  let component: RecordPreviewComponent
  let fixture: ComponentFixture<RecordPreviewComponent>
  let event

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewComponent)
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
    event = component['mdSelect']
    component.metadataRecordTargetUrl = `/${ROUTER_ROUTE_DATASET}/${component.record.uuid}`
    jest.resetAllMocks()
    jest.spyOn(event, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('emits event on click', () => {
    component['elementRef'].nativeElement.click()
    expect(event.emit).toHaveBeenCalled()
  })

  it('should TargetUrl be correct', () => {
    expect(component.metadataRecordTargetUrl).toBe(
      `/dataset/d2f30aa4-867e-40b9-9c37-3cb21f541008`
    )
  })
})
