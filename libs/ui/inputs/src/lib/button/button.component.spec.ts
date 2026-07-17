import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  const buttonClasses = () =>
    (fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement)
      .classList

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('applies the class matching its type', () => {
    fixture.componentRef.setInput('type', 'primary')
    fixture.detectChanges()
    expect(buttonClasses()).toContain('gn-ui-btn-primary')
  })

  it('renders a bare button for the unstyled type', () => {
    fixture.componentRef.setInput('type', 'unstyled')
    fixture.detectChanges()
    expect(buttonClasses()).toContain('gn-ui-btn-unstyled')
  })
})
