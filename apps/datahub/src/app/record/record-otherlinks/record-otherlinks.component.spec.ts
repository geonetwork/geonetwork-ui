import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs'
import { RecordOtherlinksComponent } from './record-otherlinks.component'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

class MdViewFacadeMock {
  otherLinks$ = new BehaviorSubject([])
}
describe('RecordOtherlinksComponent', () => {
  let component: RecordOtherlinksComponent
  let fixture: ComponentFixture<RecordOtherlinksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordOtherlinksComponent],
      providers: [{ provide: MdViewFacade, useClass: MdViewFacadeMock }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordOtherlinksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
