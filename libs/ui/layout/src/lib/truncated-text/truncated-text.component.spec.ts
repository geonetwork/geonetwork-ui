import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TruncatedTextComponent } from './truncated-text.component'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('TruncatedTextComponent', () => {
  let component: TruncatedTextComponent
  let fixture: ComponentFixture<TruncatedTextComponent>
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn()
      unobserve = jest.fn()
      disconnect = jest.fn()
    }
    global.MutationObserver = class MutationObserver {
      observe = jest.fn()
      disconnect = jest.fn()
      takeRecords = jest.fn().mockReturnValue([])
    }
  })
  const mockTextElement = (scrollWidth: number, clientWidth: number) => {
    component.textElement = {
      nativeElement: { scrollWidth, clientWidth },
    } as any
    component.ngAfterViewInit()
    fixture.detectChanges()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(TruncatedTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create with default values', () => {
    expect(component).toBeTruthy()
    expect(component.text).toBe('')
    expect(component.isTextTruncated).toBe(false)
  })

  describe('text truncation', () => {
    it('should detect truncated text and show expand button', () => {
      mockTextElement(200, 100)
      expect(component.isTextTruncated).toBe(true)
      const button = fixture.debugElement.query(By.directive(ButtonComponent))
      expect(button).toBeTruthy()
    })

    it('should not show expand button for non-truncated text', () => {
      mockTextElement(100, 200)
      expect(component.isTextTruncated).toBe(false)
      const button = fixture.debugElement.query(By.directive(ButtonComponent))
      expect(button).toBeFalsy()
    })
  })
})
