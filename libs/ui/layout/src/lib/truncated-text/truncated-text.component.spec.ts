import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TruncatedTextComponent } from './truncated-text.component'
import { TranslateModule } from '@ngx-translate/core'
describe('TruncatedTextComponent', () => {
  let component: TruncatedTextComponent
  let fixture: ComponentFixture<TruncatedTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruncatedTextComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(TruncatedTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with default values', () => {
    expect(component.text).toBe('')
    expect(component.isTextTruncated).toBe(false)
    expect(component.isExpanded).toBe(false)
  })

  it('should toggle expanded state', () => {
    expect(component.isExpanded).toBe(false)
    component.toggleExpand()
    expect(component.isExpanded).toBe(true)
    component.toggleExpand()
    expect(component.isExpanded).toBe(false)
  })

  it('should check text truncation on init', () => {
    const mockElement = {
      nativeElement: {
        scrollWidth: 200,
        clientWidth: 100,
      },
    }
    component.textElement = mockElement as any
    component.ngAfterViewInit()
    expect(component.isTextTruncated).toBe(true)
  })

  it('should detect non-truncated text', () => {
    const mockElement = {
      nativeElement: {
        scrollWidth: 100,
        clientWidth: 200,
      },
    }
    component.textElement = mockElement as any
    component.ngAfterViewInit()
    expect(component.isTextTruncated).toBe(false)
  })
})
