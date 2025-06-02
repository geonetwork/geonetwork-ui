import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ValueListComponent } from './value-list.component'
import { ViewportRuler, OverlayContainer } from '@angular/cdk/overlay'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

class MockViewportRuler {
  change() {
    return of()
  }
  getViewportSize() {
    return { width: 1024, height: 768 }
  }
}

describe('ValueListComponent', () => {
  let component: ValueListComponent
  let fixture: ComponentFixture<ValueListComponent>
  let overlayContainer: OverlayContainer

  const stubIcon = () =>
    (component.iconElement = {
      nativeElement: {
        getBoundingClientRect: () => ({ left: 100 }) as any,
      },
    } as any)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueListComponent],
      providers: [{ provide: ViewportRuler, useClass: MockViewportRuler }],
    }).compileComponents()

    fixture = TestBed.createComponent(ValueListComponent)
    component = fixture.componentInstance
    overlayContainer = TestBed.inject(OverlayContainer)

    component.values = [{ label: 'Item A' }, { code: 'ITEM_B' }]

    fixture.detectChanges()
  })

  it('should create with default state', () => {
    expect(component).toBeTruthy()
    expect(component.isOpen).toBe(false)
  })

  it('should render the list-icon button', () => {
    const btn = fixture.debugElement.query(By.directive(ButtonComponent))
    expect(btn).toBeTruthy()
  })

  it('should toggle overlay open and closed', () => {
    stubIcon()
    component.toggleOverlay()
    expect(component.isOpen).toBe(true)

    component.toggleOverlay()
    expect(component.isOpen).toBe(false)
  })

  it('should display list items in overlay when open', () => {
    stubIcon()
    component.toggleOverlay()
    fixture.detectChanges()

    const listItems = overlayContainer
      .getContainerElement()
      .querySelectorAll('li')

    expect(listItems.length).toBe(2)
    expect(listItems[0].textContent?.trim()).toBe('Item A')
    expect(listItems[1].textContent?.trim()).toBe('ITEM_B')
  })
})
