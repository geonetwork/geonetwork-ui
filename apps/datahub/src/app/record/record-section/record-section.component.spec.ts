import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordSectionComponent } from './record-section.component'
import { By } from '@angular/platform-browser'
import { AnchorLinkDirective } from '@geonetwork-ui/ui/layout'

describe('RecordSectionComponent', () => {
  let component: RecordSectionComponent
  let fixture: ComponentFixture<RecordSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordSectionComponent],
      declarations: [AnchorLinkDirective],
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
    const section = fixture.debugElement.query(By.css('section'))
    expect(section.attributes['id']).toBe('test-section')
    const title = fixture.debugElement.query(By.css('h1'))
    expect(title.nativeElement.textContent).toContain('Test Section')
  })

  it('should have anchor link directive', () => {
    const section = fixture.debugElement.query(
      By.directive(AnchorLinkDirective)
    )
    expect(section).toBeTruthy()
  })
})
