import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { RecordMetricComponent } from './record-metric.component'
import { By } from '@angular/platform-browser'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('RecordMetricComponent', () => {
  let component: RecordMetricComponent
  let fixture: ComponentFixture<RecordMetricComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateDirective, TranslatePipe],
      providers: [provideI18n()],
      declarations: [RecordMetricComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetricComponent)
    component = fixture.componentInstance
    component.label = 'My Metric label'
    component.count = 32
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('record metric', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('shows the metric label', () => {
      const el = fixture.debugElement.query(By.css('.label')).nativeElement
      expect(el.textContent).toEqual(component.label)
    })
    it('shows the metric count', () => {
      const el = fixture.debugElement.query(By.css('.count')).nativeElement
      expect(parseInt(el.textContent)).toEqual(component.count)
    })
  })
})
