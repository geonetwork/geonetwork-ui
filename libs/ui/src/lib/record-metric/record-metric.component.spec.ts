import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { RecordMetricComponent } from './record-metric.component'

describe('RecordMetricComponent', () => {
  let component: RecordMetricComponent
  let fixture: ComponentFixture<RecordMetricComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [RecordMetricComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetricComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('record metric', () => {
    it('shows the metric label', () => {})
    it('shows the metric count', () => {})
    it('sends the metric icon', () => {})
    it('generates a random color', () => {})
  })
})
