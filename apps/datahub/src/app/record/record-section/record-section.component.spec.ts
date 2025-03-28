import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordSectionComponent } from './record-section.component'
import { MockModule } from 'ng-mocks'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

describe('RecordSectionComponent', () => {
  let component: RecordSectionComponent
  let fixture: ComponentFixture<RecordSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordSectionComponent, MockModule(UiLayoutModule)],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSectionComponent)
    component = fixture.componentInstance
    component.id = 'test-section'
    component.title = 'Test Section'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have correct id and title', () => {
    expect(component.id).toBe('test-section')
    expect(component.title).toBe('Test Section')
  })

  it('should have anchor link directive', () => {
    const section = fixture.nativeElement.querySelector('section')
    expect(section.id).toBe('test-section')
  })
})
