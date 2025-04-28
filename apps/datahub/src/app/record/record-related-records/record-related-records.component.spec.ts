import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { RecordRelatedRecordsComponent } from './record-related-records.component'
import { MockBuilder } from 'ng-mocks'
import { ChangeDetectionStrategy } from '@angular/core'

class RouterFacadeMock {
  goToMetadata = jest.fn()
}

describe('RelatedRecordsComponent', () => {
  let component: RecordRelatedRecordsComponent
  let fixture: ComponentFixture<RecordRelatedRecordsComponent>

  beforeEach(() => MockBuilder(RecordRelatedRecordsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordRelatedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
