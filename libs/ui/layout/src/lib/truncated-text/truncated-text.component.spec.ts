import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TruncatedTextComponent } from './truncated-text.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

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
      imports: [TruncatedTextComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(TruncatedTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create with default values', () => {
    expect(component).toBeTruthy()
    expect(component.text).toBe('')
    expect(component.isTextTruncated).toBe(false)
    expect(component.isOpen).toBe(false)
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

  describe('overlay behavior', () => {
    it('should toggle and close overlay correctly', () => {
      expect(component.isOpen).toBe(false)
      component.toggleOverlay()
      expect(component.isOpen).toBe(true)
      component.close()
      expect(component.isOpen).toBe(false)
    })
  })
})
