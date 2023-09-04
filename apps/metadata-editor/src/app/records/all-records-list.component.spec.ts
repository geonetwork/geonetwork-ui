import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AllRecordsComponent } from './all-records-list.component'

describe('AllRecordsComponent', () => {
  let component: AllRecordsComponent
  let fixture: ComponentFixture<AllRecordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRecordsComponent],
    })
    fixture = TestBed.createComponent(AllRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
