import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewComponent } from './record-preview.component'

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
    event = component['mdSelect']
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
})
