import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OverlayComponent } from './overlay.component'
import { By } from '@angular/platform-browser'

describe('OverlayComponent', () => {
  let component: OverlayComponent
  let fixture: ComponentFixture<OverlayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OverlayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle overlay', () => {
    expect(component.isOpen).toBeFalsy()
    component.toggleOverlay()
    expect(component.isOpen).toBeTruthy()
  })

  it('should close overlay', () => {
    component.isOpen = true
    component.close()
    expect(component.isOpen).toBeFalsy()
  })
})
