import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordInternalLinksComponent } from './record-internal-links.component'
import { MockBuilder } from 'ng-mocks'

describe('RecordInternalLinksComponent', () => {
  let component: RecordInternalLinksComponent
  let fixture: ComponentFixture<RecordInternalLinksComponent>

  beforeEach(() => MockBuilder(RecordInternalLinksComponent))

  beforeEach(async () => {
    fixture = TestBed.createComponent(RecordInternalLinksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
