import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

import { RecordPageComponent } from './record-page.component'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('RecordPageComponent', () => {
  let component: RecordPageComponent
  let fixture: ComponentFixture<RecordPageComponent>

  beforeEach(() => MockBuilder(RecordPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(MdViewFacade)],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('has id="record-page" at root for related records scroll', () => {
    expect(fixture.nativeElement.children[0].id).toBe('record-page')
  })
})
